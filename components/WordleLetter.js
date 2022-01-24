import styled from "styled-components";

const GrayLetter = ({index}) => {
  return (
    <StyledGrayLetter key={index}></StyledGrayLetter>
  );
}

const YellowLetter = ({index}) => {
  return (
    <StyledYellowLetter key={index}></StyledYellowLetter>
  );
}

const GreenLetter = ({index}) => {
  return (
    <StyledGreenLetter key={index}></StyledGreenLetter>
  );
}

export default function WordleLetter({color, index}) {
  if (color === 'green') {
    return (
      <GreenLetter index={index} />
    );
  }
  else if (color === 'yellow') {
    return (
      <YellowLetter index={index} />
    );
  }
  else {
    return (
      <GrayLetter index={index} />
    );
  }
}

const StyledGreenLetter = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 4px;
  box-sizing: border-box;
  overflow: auto;
  border: 2px solid #15C285;
  background: linear-gradient(180deg, #DAEFAA 0%, #15C285 100%);
`

const StyledYellowLetter = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 4px;
  box-sizing: border-box;
  overflow: auto;
  border: 2px solid #FBBF54;
  background: linear-gradient(180deg, #FFF7D0 0%, #FBBF54 100%);
`

const StyledGrayLetter = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 4px;
  box-sizing: border-box;
  overflow: auto;
  border: 2px solid #C2C3C7;
  background: linear-gradient(180deg, #F0F0F0 0%, #C2C3C7 100%);
`