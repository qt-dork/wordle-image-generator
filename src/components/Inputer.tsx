import styled from 'styled-components';
import * as React from 'react';

const InputContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
`;

const Input = styled.textarea`
  font-size: 20px;
  resize: none;

  @media (orientation: landscape) {
    width: 15em;
    height: 100%;
  }

  @media (orientation: portrait) {
    height: 11em;
  }
`;

interface InputerProps {
  value: string;
  handleTextChange: React.Dispatch<React.SetStateAction<string>>;
}

const Inputer = ({ value, handleTextChange }: InputerProps) => {
  const onChange = (e: any) => handleTextChange(e.target.value);

  return (
    <InputContainer>
      <label htmlFor="input">Your Wordle result:</label>
      <textarea
        autoComplete="false"
        autoCorrect="false"
        cols={15}
        id="input"
        placeholder="Paste your game result here."
        rows={8}
        spellCheck="false"
        value={value}
        onChange={(e) => handleTextChange(e.target.value)}
      ></textarea>
    </InputContainer>
  );
};

export default Inputer;
