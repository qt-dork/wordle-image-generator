import styled from 'styled-components';

const GrayLetter = ({ key }: { key: number }) => {
  return <StyledGrayLetter key={key}></StyledGrayLetter>;
};

const YellowLetter = ({ key }: { key: number }) => {
  return <StyledYellowLetter key={key}></StyledYellowLetter>;
};

const GreenLetter = ({ key }: { key: number }) => {
  return <StyledGreenLetter key={key}></StyledGreenLetter>;
};

export default function WordleLetter({
  color,
  key,
}: {
  color: string;
  key: number;
}) {
  if (color === 'green') {
    return <GreenLetter key={key} />;
  } else if (color === 'yellow') {
    return <YellowLetter key={key} />;
  } else {
    return <GrayLetter key={key} />;
  }
}

const StyledGreenLetter = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 4px;
  box-sizing: border-box;
  overflow: auto;
  border: 2px solid #15c285;
  background: linear-gradient(180deg, #daefaa 0%, #15c285 100%);
`;

const StyledYellowLetter = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 4px;
  box-sizing: border-box;
  overflow: auto;
  border: 2px solid #fbbf54;
  background: linear-gradient(180deg, #fff7d0 0%, #fbbf54 100%);
`;

const StyledGrayLetter = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 4px;
  box-sizing: border-box;
  overflow: auto;
  border: 2px solid #c2c3c7;
  background: linear-gradient(180deg, #f0f0f0 0%, #c2c3c7 100%);
`;
