import styled from "styled-components";

const InputContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
`

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
`

const Inputer = ({value, handleTextChange}) => {
  const onChange = e => handleTextChange(e.target.value);

  return (
    <InputContainer>
      <label for="input">Your Wordle result:</label>
      <textarea
        autoComplete="false"
        autoCorrect="false"
        cols={15}
        id="input"
        placeholder="Paste your game result here."
        rows={8}
        spellCheck="false"
        value={value}
        onChange={e => handleTextChange(e.target.value)}
        ></textarea>
    </InputContainer>
  );
}

export default Inputer;