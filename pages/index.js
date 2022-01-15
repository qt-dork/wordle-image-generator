import Head from 'next/head'
import Image from 'next/image'
import dynamic from 'next/dynamic';
import styled from 'styled-components'
import * as htmlToImage from 'html-to-image';
import { useEffect, useRef, useState } from 'react';

import Inputer from '../components/Inputer';
import WordleGraph from '../components/WordleGraph';
import ImageWrapper from '../components/ImageWrapper'

// import WordleGraph from '../components/WordleGraph';

import styles from '../styles/Home.module.css';



// const saveAs = (blob, fileName) =>{
//   var elem = window.document.createElement('a');
//   elem.href = blob
//   elem.download = fileName;
//   elem.style = 'display:none;';
//   (document.body || document.documentElement).appendChild(elem);
//   if (typeof elem.click === 'function') {
//     elem.click();
//   } else {
//     elem.target = '_blank';
//     elem.dispatchEvent(new MouseEvent('click', {
//       view: window,
//       bubbles: true,
//       cancelable: true
//     }));
//   }
//   URL.revokeObjectURL(elem.href);
//   elem.remove()
// }

// const exportAsPicture = () => {

//   var data = document.getElementsByClassName('wordle')

//   for (var i = 0; i < data.length; ++i){
//       htmlToImage.toPng(data[i]).then((dataUrl) => {
//         saveAs(dataUrl, 'my-node.png');
//     });
//   }
// }
// const WordleGrapher = dynamic(
//   () => import('../components/WordleGraph'),
//   { ssr: false }
// );

// Logic heavily borrowed from wa11y.co
// Thanks!
const maxGenLength = 196;

export default function Home() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("butts");
  console.log(output);

  useEffect(() => {
    // setOutput("");
    
    const lines = input.split('\n');
    const emojiLines = [];

    lines.forEach((line) => {
      if (isGameLine(line))
        emojiLines.push(line);
      else
        setOutput(output + `${line}\n`);
    });

    const descriptiveLines = [];
    let chopAggression = 0;

    while (chopAggression === 0 || descriptiveLines.join('\n').length > maxGenLength) {
      descriptiveLines.splice(0, descriptiveLines.length);
      emojiLines.forEach((line) => {
        descriptiveLines.push(describeLine(line, descriptiveLines.length + 1, chopAggression));
      });
      if (chopAggression++> 20) break;
    }

    descriptiveLines.forEach((line) => {
      setOutput(output + line);
    });

    setOutput(output + '\n');

    emojiLines.forEach((line) => {
      setOutput(output + `${line}\n`);
    });

    setOutput(output.trim());
    console.log(output);
  }, [input]);

  // The maximum length of generated text before it + emoji won't fit in a tweet.
const maxGenLength = 196;

// const tweet = document.getElementById('tweet');
// tweet.addEventListener('click', () => {
//   const encoded = encodeURI(output.value).replaceAll('&', '%26');
//   window.open(`https://twitter.com/intent/tweet?text=${encoded}`);
// });

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

// I don't actually understand how this function works but I feel like Cariad's emoji handling code is gonna be much better than my code lol
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

  const splitLines = str => str.split(/\r?\n/);
  const splitEmojis = str => /[\u{1F7E9}\u{1F7E7}\u{1F7E8}\u{1F7E6}\u2B1C\u2B1B]{5}/ug.test(str) ? [...str] : str;
  const deepEmoji = (arr) => {
    let arrLetter = [];
    arr.forEach((element => {
      if (Array.isArray(element)) {
        arrLetter.push(deepEmoji(element));
      }
      else {
        /[\u{1F7E8}\u{1F7E6}]/ug.test(element) ? arrLetter.push("yellow") : /[\u{1F7E7}\u{1F7E9}]/ug.test(element) ? arrLetter.push("green") : arrLetter.push("white");
      }
    }))
    return arrLetter;
  }



  // const newInput = splitLines(wordleInput).map((line) => splitEmojis(line));
  // console.log(newInput);

  // const emojiGrid = newInput.slice(2);
  // const wordleDay = newInput.slice(0,1);
  // const letterGrid = deepEmoji(emojiGrid);
  const current = new Date();
  const date = `${current.getMonth()+1}/${current.getDate()}/${current.getFullYear()}`;

  const letterGrid = [["yellow", "yellow", "green", "white", "white"],
  ["white", "white", "white", "yellow", "yellow"],
  ["white", "white", "white", "yellow", "yellow"],
  ["white", "white", "white", "yellow", "yellow"],
  ["green", "green", "green", "yellow", "yellow"],
  ["green", "green", "green", "green", "green"],];

  const wordleDay = "Wordle 205 6/6";


  // var node = document.getElementById('wordle');

  // htmlToImage.toPng(node)
  //   .then(function (dataUrl) {
  //     var img = new Image();
  //     img.src = dataUrl;
  //     document.body.appendChild(img);
  // })
  // .catch(function (error) {
  //   console.error('oops, something went wrong!', error);
  // });

  return (
    <div className='body'>
    {/* <Inputer handleTextChange={setInput} /> */}
    {/* <div id="output-container">
      <label for="output">Sharable:</label>
      <textarea id="output" readOnly="true" value={output}></textarea>
      <button id="copy">Copy</button>
    </div> */}
    <ImageWrapper grid={letterGrid} firstLine={wordleDay} date={date} output={output}/>
    <p>{output}</p>
    {/* <WordleGraph grid={letterGrid} day={wordleDay} date={date} /> */}
    </div>
  )
}
