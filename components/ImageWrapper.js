import { useCallback, useRef, useState, useEffect } from "react";
import { useClipboard } from "use-clipboard-copy";
import { toPng } from "html-to-image";

import WordleGraph from "./WordleGraph";



const ImageWrapper = ({grid, firstLine, date, output}) => {
  const wordleRef = useRef(null);
  const clipboard = useClipboard();
  const onButtonClick = useCallback(() => {
    if (wordleRef.current === null) {
      return;
    }
    toPng(wordleRef.current, { cacheBust: true, backgroundColor: "#ffffff" })
      .then((dataUrl) => {
        const link = document.createElement('a')
        link.download = 'my-image-name.png'
        link.href = dataUrl
        link.click()
      })
      .catch((err) => {
        console.log(err)
      })
  }, [wordleRef]);

  return (
    <>
      <div>
        <WordleGraph grid={grid} day={firstLine} date={date} childRef={wordleRef} />
      </div>
      <button onClick={() => {clipboard.copy(output); onButtonClick()}}>Click me</button>
    </>
  );
}

export default ImageWrapper