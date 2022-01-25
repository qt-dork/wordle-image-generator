import styled from "styled-components";
import { useCallback } from "react";
import { useClipboard } from "use-clipboard-copy";
import { toPng, toBlob } from "html-to-image";

import { useIsMobileOrTablet } from "../hooks/isMobileOrTablet";

const StyledButton = styled.button`
  height: 3rem;
  margin-top: 0.3rem;
`

const MobileShareButton = ({children, output, wordleRef}) => {
  console.log("i'm a mobile device!");
  const clipboard = useClipboard();
  const onButtonClick = useCallback(() => {
    if (wordleRef.current === null) {
      return
    }

    if (navigator.canShare) {
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
  }, [wordleRef]);

  return (
    <StyledButton onClick={() => {clipboard.copy(output); onButtonClick()}}>{children}</StyledButton>
  )
}

const DesktopShareButton = ({children, output, wordleRef}) => {
  console.log("I'm a desktop computer!");
  const clipboard = useClipboard();
  const onButtonClick = useCallback(() => {
    if (wordleRef.current === null) {
      return
    }

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
  }, [wordleRef]);

  return (
    <StyledButton onClick={() => {clipboard.copy(output); onButtonClick()}}>{children}</StyledButton>
  )
}


const ShareButton = ({ children, output, wordleRef }) => {
  const istMobOrTab = useIsMobileOrTablet();
  if (istMobOrTab) {
    return <MobileShareButton output={output} wordleRef={wordleRef}>{children}</MobileShareButton>
  }
  else {
    return <DesktopShareButton output={output} wordleRef={wordleRef}>{children}</DesktopShareButton>
  }
}

export default ShareButton;