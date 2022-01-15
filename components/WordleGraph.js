import { useEffect } from 'react'
import styled from 'styled-components'
import WordleLetter from './WordleLetter'

const LetterLine = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 8px;
`

const LetterGrid = styled.div`
  display: grid;
  grid-template-rows: repeat(7, 1fr);
  grid-gap: 8px;
  padding: 24px;

  &.true {
    background-color: white;
  }
`

const LetterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  overflow: hidden;
`

const WordleText = styled.div`
  font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  width: 100%;
  height: 12px;
  display: flex;
  justify-content: space-between;
  align-content: end;
  font-size: 8;
`

const WordleGraph = ({grid, firstLine, date, childRef }) => {
  return (
    <LetterContainer>
      <LetterGrid ref={childRef}>
        {grid.map((line, index) =>
          <LetterLine key={index}>
            {line.map((item, index) => 
              <WordleLetter item={item} index={index} />
            )}
          </LetterLine>
        )}
      <WordleText><p>{firstLine}</p><p>{date}</p></WordleText>
      </LetterGrid>
    </LetterContainer>
  );
}

export default WordleGraph