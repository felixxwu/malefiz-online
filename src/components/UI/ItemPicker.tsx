import { styled } from 'goober'
import { colours } from '../../config/colours'
import { consts } from '../../config/consts'
import { arcadeEventSelection, arcadeItemSelection, pickArcadeItems } from '../../signals/signals'
import { objectToArray } from '../../utils/objectToArray'
import { itemDefs } from '../../items'
import { ItemSvg } from '../MapRenderer/ItemGroup/ItemSvg'
import { events } from '../../events'

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
        <Header>ITEMS</Header>
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
                  <ItemSvg colour={value.colour} Icon={value.icon} />
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

        <Header>EVENTS</Header>
        {events.map(event => {
          function handleClick(e: MouseEvent) {
            e.stopPropagation()

            if (arcadeEventSelection.value.includes(event.name)) {
              arcadeEventSelection.value = arcadeEventSelection.value.filter(
                item => item !== event.name
              )
            } else {
              arcadeEventSelection.value = [...arcadeEventSelection.value, event.name]
            }
          }

          return (
            <Row onClick={handleClick}>
              {event.name}
              <ToggleContainer
                style={{
                  opacity: arcadeEventSelection.value.includes(event.name) ? 1 : 0.5,
                }}
              >
                <Toggle
                  style={{
                    transform: `translate(${
                      arcadeEventSelection.value.includes(event.name) ? '17' : '2'
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

const Header = styled('div')`
  padding: 10px 20px;
  font-weight: bold;
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
  width: 35px;
  height: 30px;
  transform: scale(0.8) translate(15px, 15px);
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
