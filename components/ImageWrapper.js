import { useCallback, useRef, useState, useEffect } from "react";
import { useClipboard } from "use-clipboard-copy";
import { toPng, toBlob } from "html-to-image";
import styled from "styled-components";

import { useIsMobileOrTablet } from "../hooks/isMobileOrTablet";
import WordleGraph from "./WordleGraph";

const OutputContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  flex-grow: 1;
`

const StyledButton = styled.button`
  height: 3rem;
  margin-top: 0.3rem;
`

const Output = styled.div`
  @media (orientation: portrait) {
    height: 33vh;
  }
`

const Wrapper = styled.div`
  height: 100%;
`

const ImageWrapper = ({grid, firstLine, output}) => {
  const istMobOrTab = useIsMobileOrTablet();
  const wordleRef = useRef(null);
  const clipboard = useClipboard();  

  const onButtonClick = useCallback(() => {
    if (wordleRef.current === null) {
      return
    }

    if (navigator.canShare && istMobOrTab) {
      toBlob(wordleRef.current, {cacheBust:true, backgroundColor: "#ffffff"})
      .then((blob) => {
        const filesArray = [
          new File(
            [blob],
            'wordle-image.png',
            {
              type: "image/png",
              lastModified: new Date().getTime()
            }
          )
        ];
        const shareData = {
          files: filesArray,
        };

        navigator.share(shareData);
      })
      .catch((err) => {
        console.error('oops, something went wrong!', err);
      });
    }
    else {
      toPng(wordleRef.current, { cacheBust: true, backgroundColor: "#ffffff" })
      .then((dataUrl) => {
        const link = document.createElement('a')
        link.download = `wordle-image.png`
        link.href = dataUrl
        link.click()
      })
      .catch((err) => {
        console.log(err)
      })
    }
  }, [wordleRef]);

  return (
    <>
      <OutputContainer>
        <Wrapper>
          <label htmlFor="output">Shareable:</label>
          <Output><WordleGraph grid={grid} firstLine={firstLine} childRef={wordleRef} /></Output>
        </Wrapper>
        <StyledButton onClick={() => {clipboard.copy(output); onButtonClick()}}>Save Image and Copy Alt-Text</StyledButton>
      </OutputContainer>
    </>
  );
}

export default ImageWrapper;