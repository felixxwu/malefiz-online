import { useEffect, useState } from 'preact/hooks'

export function WaitingForServer() {
  const [opacity, setOpacity] = useState(0)

  useEffect(() => {
    setTimeout(() => {
      setOpacity(1)
    }, 200)
  }, [])
  return <div style={{ opacity }}>Waiting for server...</div>
}
