import { useEffect, useState } from 'react'
import styled from 'styled-components'
import WordleLetter from './WordleLetter'

const LetterLine = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 8px;
`

const LetterGrid = styled.div`
  display: grid;
  grid-template-rows: repeat(1fr);
  grid-gap: 8px;
  padding: 24px;
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

const WordleGraph = ({grid, firstLine, childRef }) => {
  const [gridColorIndexes, setGridColorIndexes] = useState([]);
  useEffect(() => {
    const emojiGrid = [];

    grid.forEach((line) => {
      const emojiLine = [];
      for (let index = 0; index < 5; index++) {
        console.log(matchesIndex(line.perfectIndexes, index + 1));
        if (matchesIndex(line.perfectIndexes, index + 1)) {
          emojiLine.push('green');
        }
        else if (matchesIndex(line.misplacedIndexes, index + 1)) {
          emojiLine.push('yellow');
        }
        else {
          emojiLine.push('gray');
        }
      }
      emojiGrid.push(emojiLine);
    });
    
    setGridColorIndexes(emojiGrid);
  }, [grid])

  function matchesIndex(line, index) {
    let b = false;
    line.forEach((item) => {
      if (index === item) {
        b = true;
      }
    });
    return b;
  }

  return (
    <LetterContainer>
      <LetterGrid ref={childRef}>
        {gridColorIndexes.map((line, index) =>
          <LetterLine key={index}>
            {line.map((item, index) => 
              <WordleLetter color={item} key={index} />
            )}
          </LetterLine>
        )}
      <WordleText><p>{firstLine[0]}</p><p>{firstLine[1]}</p></WordleText>
      </LetterGrid>
    </LetterContainer>
  );
}

export default WordleGraph