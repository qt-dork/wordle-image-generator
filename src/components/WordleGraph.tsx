import { forwardRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import WordleLetter from './WordleLetter';

const LetterLine = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 8px;
`;

const LetterGrid = styled.div`
  display: grid;
  grid-template-rows: repeat(1fr);
  grid-gap: 8px;
  padding: 24px;
`;

const LetterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  overflow: hidden;
`;

const WordleText = styled.div`
  font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  width: 100%;
  height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 8;
`;

const TextLeft = styled.p`
  flex-grow: 1;
`;

const TextRight = styled.p`
  flex-shrink: 0;
`;

interface WordleGraphProps {
  indexes: {
    misplacedIndexes: number[];
    perfectIndexes: number[];
  }[];
  firstLine: {
    day: string;
    score: string;
  };
  ref: React.ComponentPropsWithoutRef<'div'>;
}

const WordleGraph = forwardRef<HTMLDivElement, WordleGraphProps>(
  ({ indexes, firstLine }, ref) => {
    const [gridColorIndexes, setGridColorIndexes] = useState<string[][]>([]);
    useEffect(() => {
      const emojiGrid: string[][] = [];

      indexes.forEach(
        (line: { misplacedIndexes: number[]; perfectIndexes: number[] }) => {
          const emojiLine: string[] = [];
          for (let index = 0; index < 5; index++) {
            if (matchesIndex(line.perfectIndexes, index + 1)) {
              emojiLine.push('green');
            } else if (matchesIndex(line.misplacedIndexes, index + 1)) {
              emojiLine.push('yellow');
            } else {
              emojiLine.push('gray');
            }
          }
          emojiGrid.push(emojiLine);
        }
      );

      setGridColorIndexes(emojiGrid);
    }, [indexes]);

    function matchesIndex(line: number[], index: number) {
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
        <LetterGrid ref={ref}>
          {gridColorIndexes.map((line, index) => (
            <LetterLine key={index}>
              {line.map((item, index) => (
                <WordleLetter color={item} key={index} />
              ))}
            </LetterLine>
          ))}
          <WordleText>
            <TextLeft>{firstLine.day}</TextLeft>
            <TextRight>{firstLine.score}</TextRight>
          </WordleText>
        </LetterGrid>
      </LetterContainer>
    );
  }
);

WordleGraph.displayName = 'MyComponent';
export default WordleGraph;
