import styled from "styled-components";
import WordleGraph from "./WordleGraph";

const LetterBox = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 4px;
  box-sizing: border-box;
  overflow: auto;

  /* sub-classes */
  &.green {
    border: 2px solid #15C285;
    background: linear-gradient(180deg, #DAEFAA 0%, #15C285 100%);
  }

  &.yellow {
    border: 2px solid #FBBF54;
    background: linear-gradient(180deg, #FFF7D0 0%, #FBBF54 100%);
  }

  &.white {
    border: 2px solid #C2C3C7;
    background: linear-gradient(180deg, #F0F0F0 0%, #C2C3C7 100%)
  }
`

const WordleLetter = ({item, index}) => {
  return (
    <LetterBox className={item} key={index}></LetterBox>
  );
}

export default WordleLetter;