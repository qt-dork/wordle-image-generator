const Inputer = ({value, handleTextChange}) => {
  const onChange = e => handleTextChange(e.target.value);

  return (
    // <div id="input-container">
    //   <label for="input">Your Wordle result:</label>
    //  autoComplete='false' autoCorrect='false' cols="15" id="input" placeholder='Paste your game result here.' rows="8" spellCheck='false'
      <textarea value={value} onChange={e => handleTextChange(e.target.value)} />
    // </div>
  );
}

export default Inputer;