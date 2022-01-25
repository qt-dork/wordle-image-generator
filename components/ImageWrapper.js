import { useRef } from "react";
import styled from "styled-components";

import WordleGraph from "./WordleGraph";
import ShareButton from "./ShareButton"

const OutputContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  flex-grow: 1;
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
  const wordleRef = useRef(null);

  return (
    <>
      <OutputContainer>
        <Wrapper>
          <label htmlFor="output">Shareable:</label>
          <Output><WordleGraph grid={grid} firstLine={firstLine} childRef={wordleRef} /></Output>
        </Wrapper>
        <ShareButton output={output} wordleRef={wordleRef}>Save Image and Copy Alt-Text</ShareButton>
      </OutputContainer>
    </>
  );
}

export default ImageWrapper;