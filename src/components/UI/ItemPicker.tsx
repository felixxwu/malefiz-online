import { styled } from 'goober'
import { colours } from '../../config/colours'
import { consts } from '../../config/consts'
import { arcadeItemSelection, pickArcadeItems } from '../../signals/signals'
import { objectToArray } from '../../utils/objectToArray'
import { items } from '../../items'

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
        {objectToArray(items).map(({ key }) => {
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
              <input type='checkbox' checked={arcadeItemSelection.value.includes(key)} />
              {key}
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
