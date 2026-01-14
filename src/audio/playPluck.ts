import * as Tone from 'tone'

// Create delay and reverb once and reuse them
export const delay = new Tone.PingPongDelay({
  delayTime: 0.4,
  feedback: 0.5,
  wet: 0.2,
}).toDestination()

export const reverb = new Tone.Reverb(30)
reverb.wet.value = 0.3

// Initialize reverb once
let reverbInitialized = false
export async function initializeReverb() {
  if (!reverbInitialized) {
    await reverb.generate()
    reverbInitialized = true
  }
}

export async function playPluck({
  note,
  type,
  amp,
  lowpass,
}: {
  note: Tone.Unit.Frequency
  type: Tone.ToneOscillatorType
  amp: { attack: number; decay: number; sustain: number; gain: number }
  lowpass: { attack: number; decay: number; sustain: number; gain: number; q: number }
}) {
  // Initialize reverb if needed
  await initializeReverb()

  // Create amplitude gain control
  const amplitudeGain = new Tone.Gain(1)
  const amplitudeSignal = new Tone.Signal(0)
  amplitudeSignal.connect(amplitudeGain.gain)

  const amplitudeEnvelope = new Tone.Envelope({
    attack: amp.attack,
    decay: amp.decay,
    sustain: amp.sustain,
    release: amp.decay,
  })

  // Scale envelope output (0-1) to amplitude range (0 to high)
  const ampScale = new Tone.Multiply(amp.gain)
  amplitudeEnvelope.connect(ampScale)
  ampScale.connect(amplitudeSignal)

  // Create amplitude envelope for the final output
  const outputEnvelope = new Tone.AmplitudeEnvelope({
    attack: amp.attack,
    decay: amp.decay,
    sustain: amp.sustain,
    release: amp.decay,
  })

  const filterFrequency = new Tone.Signal(0)
  const filter = new Tone.Filter({
    type: 'lowpass',
    Q: lowpass.q,
  })
  filterFrequency.connect(filter.frequency)

  const filterEnvelope = new Tone.Envelope({
    attack: lowpass.attack,
    decay: lowpass.decay,
    sustain: lowpass.sustain,
    release: lowpass.decay,
  })

  // Scale envelope output (0-1) to frequency range (0 to high)
  const filterScale = new Tone.Multiply(lowpass.gain)
  filterEnvelope.connect(filterScale)
  filterScale.connect(filterFrequency)

  // Create a new oscillator for each note
  const oscillator = new Tone.FatOscillator(note, type, 30)
  oscillator.count = 2

  // Connect: Oscillator → Filter → AmplitudeGain → OutputEnvelope → (split to multiple paths)
  // Path 1: Direct to Destination (original signal with both filter and amplitude envelope)
  // Path 2: Reverb → Delay → Destination (reverbed and delayed signal, with both envelopes already applied, can ring out)
  oscillator.connect(filter)
  filter.connect(amplitudeGain)
  amplitudeGain.connect(outputEnvelope)
  outputEnvelope.toDestination()
  outputEnvelope.connect(reverb)
  reverb.connect(delay)

  oscillator.start()
  oscillator.stop('+' + amp.decay)
  amplitudeEnvelope.triggerAttackRelease(0.1)
  outputEnvelope.triggerAttackRelease(0.1)
  filterEnvelope.triggerAttackRelease(0.1)

  // Clean up nodes after they stop
  setTimeout(() => {
    oscillator.dispose()
    amplitudeEnvelope.dispose()
    amplitudeGain.dispose()
    amplitudeSignal.dispose()
    ampScale.dispose()
    outputEnvelope.dispose()
    filter.dispose()
    filterFrequency.dispose()
    filterEnvelope.dispose()
    filterScale.dispose()
  }, amp.decay * 200)
}
