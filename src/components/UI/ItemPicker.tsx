import { styled } from 'goober'
import { colours } from '../../config/colours'
import { consts } from '../../config/consts'
import { arcadeItemSelection, pickArcadeItems } from '../../signals/signals'
import { objectToArray } from '../../utils/objectToArray'
import { itemDefs } from '../../items'
import { polygonToXY } from '../../utils/polygonToXY'

export function ItemPicker() {
  return (
    <Div
      onClick={() => (pickArcadeItems.value = false)}
      style={
        pickArcadeItems.value
          ? {
              backdropFilter: 'blur(20px)',
              backgroundColor: 'rgba(0,0,0,0.5)',
              pointerEvents: 'all',
              opacity: 1,
            }
          : {
              pointerEvents: 'none',
              opacity: 0,
            }
      }
    >
      <Content>
        {objectToArray(itemDefs).map(({ value, key }) => {
          function handleClick(e: MouseEvent) {
            e.stopPropagation()

            if (arcadeItemSelection.value.includes(key)) {
              arcadeItemSelection.value = arcadeItemSelection.value.filter(item => item !== key)
            } else {
              arcadeItemSelection.value = [...arcadeItemSelection.value, key]
            }
          }

          return (
            <Row onClick={handleClick}>
              <Name>
                <Svg>
                  <polygon
                    style={{
                      filter: 'drop-shadow(0 0 3px rgba(0,0,0,0.3))',
                      willChange: 'transform',
                      transition: '300ms',
                      fill: value.colour,
                      strokeLinejoin: 'round',
                    }}
                    points={[0, 1, 2, 3, 4]
                      .map(i => polygonToXY(i, 5, 20))
                      .map(({ x, y }) => `${x},${y}`)
                      .join(' ')}
                  />
                  <value.icon />
                </Svg>
                {key}
              </Name>
              <ToggleContainer
                style={{
                  opacity: arcadeItemSelection.value.includes(key) ? 1 : 0.5,
                }}
              >
                <Toggle
                  style={{
                    transform: `translate(${
                      arcadeItemSelection.value.includes(key) ? '17' : '2'
                    }px, 2px)`,
                  }}
                />
              </ToggleContainer>
            </Row>
          )
        })}
      </Content>
    </Div>
  )
}

const Div = styled('div')`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.2s;
`

const Content = styled('div')`
  width: 300px;
  padding: 10px 0px;
  background-color: ${colours.background};
  border-radius: ${consts.borderRadius};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  flex-wrap: wrap;
`

const Row = styled('div')`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 10px 20px;
  cursor: pointer;
  gap: 10px;

  & input {
    accent-color: black;
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`

const Name = styled('div')`
  display: flex;
  align-items: center;
  gap: 10px;
`

const Svg = styled('svg')`
  overflow: visible;
  width: 30px;
  height: 30px;
  transform: scale(0.8) translate(10px, 15px);
`

const ToggleContainer = styled('div')`
  width: 35px;
  height: 20px;
  border-radius: 20px;
  background-color: ${colours.highlight};
`

const Toggle = styled('div')`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: ${colours.background};
  transition: 0.2s;
`
