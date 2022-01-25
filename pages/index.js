import { useEffect, useState } from "react";
import styled from "styled-components";
import Head from "next/head";

import Footer from "../components/Footer";
import Header from "../components/Header";
import Inputer from '../components/Inputer';
import ImageWrapper from '../components/ImageWrapper';

// Alt text has a much larger maximum length than a tweet does
let maxGenLength = 1000;

const Content = styled.div`
  align-content: center;
  align-items: center;
  width: 60rem;
  margin-inline: auto;
  max-width: 90vw;
  display: flex;
  flex-flow: column nowrap;
  gap: 1rem;
`

const App = styled.div`
  display: flex;
  gap: 10px;
  margin-top: var(--vertical-spacing);
  margin-bottom: var(--vertical-spacing);
  margin-inline: auto;
  max-width: 36rem;
  width: 100%;

  @media (orientation: landscape) {
    flex-flow: row wrap;
  }
  @media (orientation: portrait) {
    flex-flow: column nowrap;
  }
`

export default function Home() {
  const [input, setInput] = useState("");
  const [grid, setGrid] = useState([]);
  const [output, setOutput] = useState("");
  const [firstLine, setFirstLine] = useState([]);

  useEffect(() => {
    const lines = input.split('\n');
    const emojiLines = [];
    let middleOutput = '';
    let middleLine = firstLineTester(lines[0]);
    console.log(middleLine);

    lines.forEach((line) => {
      if (isGameLine(line))
        emojiLines.push(line);
      else
        middleOutput += `${line}\n`;
    })

    const descriptiveLines = [];
    const gridLines = [];
    let chopAggression = 0;

    while (chopAggression === 0 || descriptiveLines.join('\n').length + output.length > maxGenLength) {
      descriptiveLines.splice(0, descriptiveLines.length);
      emojiLines.forEach((line) => {
        descriptiveLines.push(describeLine(line, descriptiveLines.length + 1, chopAggression));
        gridLines.push(blockTypes(line));
      });
      if (chopAggression++>20) break;
    }

    const middleGrid = [];
    descriptiveLines.forEach((line) => {
      middleOutput += line;
    });
    middleOutput = middleOutput.trim();
    gridLines.forEach((line) => {
      middleGrid.push(line);
    })

    setFirstLine(middleLine);
    setOutput(middleOutput);
    setGrid(middleGrid);
  }, [input]);
  
  const firstLineTester = (line) => {
    const regexDay = /[Ww]ordle \d+/g;
    const regexCount = /[1-6Xx]\/6\*?/g;
    const arr = [];
    arr.push(line.match(regexDay));
    arr.push(line.match(regexCount));
    return arr;
  }

  // Functions are based off of cariad's wonderful wa11y website
  
  const describe = (indexes) => {
    if (indexes.length === 0) return null;

    const ords = indexes.map((i) => ord(i));

    if (ords.length === 1) return ords[0];

    return ords.reduce(
      (text, value, i, array) => {
        return text + (i < array.length - 1 ? ', ' : ' and ') + value;
      })
  };

  const describeLine = (line, num, chopAggression) => {
    const decoded = blockTypes(line);

    const hasPerfect = decoded.perfectIndexes.length > 0;
    const hasMisplaced = decoded.misplacedIndexes.length > 0;

    const perfectWord = chopAggression >= 8 ? 'yes' : 'perfect';
    const perfect = hasPerfect ? `${describe(decoded.perfectIndexes)} ${perfectWord}` : null;

    const misplacedList = describe(decoded.misplacedIndexes);

    const wrongPlace = chopAggression >= 6 ? chopAggression >= 7 ? 'no' : 'wrong' : 'in the wrong place';
    const correctBut = chopAggression >= 3 ? `${misplacedList} ${wrongPlace}` : `${misplacedList} correct but ${wrongPlace}`;
    const perfectBut = chopAggression >= 2 ? `. ${misplacedList} ${wrongPlace}` : `, but ${misplacedList} ${wrongPlace}`

    const misplaced = hasPerfect ? perfectBut : correctBut;

    let explanation = '';

    if (!hasPerfect && !hasMisplaced)
      explanation = 'Nothing.';
    else if (decoded.perfectIndexes.length === 5)
      explanation = 'Won!';
    else if (decoded.misplacedIndexes.length === 5)
      explanation = chopAggression >= 1 ? 'all in the wrong order.' : 'all the correct letters but in the wrong order.';
    else if (hasPerfect && hasMisplaced)
      explanation = `${perfect}${misplaced}.`
    else if (hasMisplaced)
      explanation = `${misplaced}.`
    else
      explanation = `${perfect}.`

    const prefix = chopAggression >= 5 ? `${num}.` : `Line ${num}:`;

    const result = `${prefix} ${explanation}\n`

    if (chopAggression >= 4)
      return result.replaceAll(' and ', ' & ');

    return result;
  }

  const ord = (i) => {
    switch (i) {
      case 1: return '1st';
      case 2: return '2nd';
      case 3: return '3rd';
      default: return `${i}th`
    }
  }

  const blockTypes = (line) => {
    let actualIndex = 0;
    let visualIndex = 1;

    const misplacedIndexes = [];
    const perfectIndexes = [];

    while (actualIndex < line.length) {
      switch (line.charCodeAt(actualIndex)) {
        // Dark mode:
        case 11035:
        // Light mode:
        case 11036:
          actualIndex += 1;
          visualIndex += 1;
          break;
        case 55357:
          switch (line.charCodeAt(actualIndex + 1)) {
            // High contrast:
            case 57318:
            // Regular contrast:
            case 57320:
              misplacedIndexes.push(visualIndex++);
              break;
            // High contrast:
            case 57319:
            // Regular contrast:
            case 57321:
              perfectIndexes.push(visualIndex++);
              break;
            default:
              return undefined;
          }
          actualIndex += 2;
          break;
        default:
          return undefined;
      }
    }

    return {
      misplacedIndexes: misplacedIndexes,
      perfectIndexes: perfectIndexes,
    };
  }

  const isGameLine = (line) => {
    return line && line.length > 0 && blockTypes(line) !== undefined;
  }

  return (
    <Content>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
        <title>Wordle Image Generator: Featuring Alt-Text!</title>
        <meta name="author" content="Evie Finch" />
        <meta name="description" content="Generates an image and alt-text for Wordle endgames" />
      </Head>
      <Header />
      <App>
        <Inputer value={input} handleTextChange={setInput} />
        <ImageWrapper grid={grid} firstLine={firstLine} output={output}/>
      </App>
      <Footer />
    </Content>
  );
}