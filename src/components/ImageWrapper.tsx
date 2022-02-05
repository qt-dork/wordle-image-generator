import { useState, useRef, useEffect, SyntheticEvent, useCallback } from 'react';
import styled from 'styled-components';
import { toBlob } from 'html-to-image';
import WordleGraph from './WordleGraph';
import { useIsMobileOrTablet } from '../hooks/isMobileOrTablet';
import useShare from '../hooks/useShare';
import { saveAs } from 'file-saver';
import { useClipboard } from 'use-clipboard-copy';

const OutputContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  flex-grow: 1;
`;

const Output = styled.div`
  @media (orientation: portrait) {
    height: 33vh;
  }
`;

const Wrapper = styled.div`
  height: 100%;
`;

const StyledButton = styled.button`
  height: 3rem;
  margin-top: 0.3rem;
`;

interface ImageWrapperProps {
  indexes: {
    misplacedIndexes: number[];
    perfectIndexes: number[];
  }[];
  firstLine: {
    day: string;
    score: string;
  };
  output: string;
  isMobileOrTablet: boolean;
}


const ImageWrapper = ({ indexes, firstLine, output, isMobileOrTablet }: ImageWrapperProps) => {
  const clipboard = useClipboard();
  const ref = useRef<HTMLDivElement | null>(null);
  const [ file, setFile ] = useState<File[]>();
  const {share } = useShare({ title: 'Your Wordle Image', files: file })
  
  async function generateImage(e: SyntheticEvent) {
    e.preventDefault();
    if (!ref.current) {
      return;
    }
    try {
      const imgBlob = await toBlob(ref.current, {cacheBust:true, backgroundColor: "#ffffff"})
      setFile([
        new File(
          [imgBlob as BlobPart], 'wordle-image.png',
          {
            type: 'image/png',
            lastModified: new Date().getTime(),
          }
        )
      ]);
      if (isMobileOrTablet) {
        share();
        clipboard.copy(output);
      } else {
        if (file !== undefined) {
          saveAs(file[0]);
          clipboard.copy(output);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
  

  return (
    <>
      <OutputContainer>
        <Wrapper>
          <label htmlFor="output">Shareable:</label>
          <Output>
            <WordleGraph indexes={indexes} firstLine={firstLine} ref={ref} />
          </Output>
        </Wrapper>
        <StyledButton onClick={generateImage}>
          Save Image and Copy Alt-Text
        </StyledButton>
      </OutputContainer>
    </>
  );
};

export default ImageWrapper;
