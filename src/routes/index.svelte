<script lang="ts">
  import ImageWrapper from "$lib/ImageWrapper.svelte";
  import Settings from "$lib/Settings.svelte";
  import Modal from "$lib/Modal.svelte"
  import * as wally from '$lib/utils'
  import Header from "$lib/Header.svelte";
  
  const maxGenLength = 1000;

  let input = '';
  let output = '';
  let indexes = [];
  let firstLine = {
    day: '',
    score: ''
  }

  let showSettings = false;

  $: {
    output = '';
    indexes = [];
    const lines = input.split('\n');
    const emojiLines = [];
    let middleOutput = '';
    firstLine = wally.firstLine(lines[0]);

    lines.forEach((line) => {
      if (wally.isGameLine(line)) {
        emojiLines.push(line);
      }
      else output += `${line}\n`;
    });

    const descriptiveLines = [];
    const gridLines = []
    let chopAggression = 0

    while (
      chopAggression === 0 ||
      descriptiveLines.join('\n').length + output.length > maxGenLength
    ) {
      descriptiveLines.splice(0, descriptiveLines.length);
      gridLines.splice(0, gridLines.length);
      emojiLines.forEach((line) => {
        descriptiveLines.push(
          wally.describeLine(line, descriptiveLines.length + 1, chopAggression)
        );
        gridLines.push(wally.blockTypes(line));
      });
      if (chopAggression++ > 20) break;
    }

    descriptiveLines.forEach((line) => {
      output += line;
    });
    gridLines.forEach((line) => {
      indexes = [...indexes, line];
    });

    output = output.trim();
  }

  $: imageProps = {
    indexes: indexes,
    output: output,
    firstLine: firstLine,
  }
</script>

<svelte:head>
  <title>Wordle Image Generator: Now Featuring Alt-Text!</title>
</svelte:head>
<div class="content">
  <Header on:settings={() => {showSettings = true}} />
  <div class="app">
    <div class="input-wrapper">
      <label for="input">Your Wordle Result: </label>
      <textarea
        autocomplete="false"
        autocorrect="false"
        cols="15"
        id="input"
        placeholder="Paste your game result here."
        rows="8"
        spellcheck="false"
        bind:value={input}
      ></textarea>
    </div>
    <ImageWrapper {...imageProps} />
  </div>
  <footer id="credit">
    <p>
      <a href="https://www.powerlanguage.co.uk/wordle/">Wordle</a> &copy; <a href="https://www.powerlanguage.co.uk/">Josh Wardle</a> (<a href="https://twitter.com/powerlanguish">@powerlanguish</a>). Alt-text (and most other) code heavily borrowed from <a href="https://wa11y.co/">wa11y.co</a> by <a href="https://cariad.earth/">Cariad Eccleston</a> (<a href="https://twitter.com/antagonistapp/">@antagonistapp</a>). Wordle Image Generator by Evie Finch (<a href="https://twitter.com/qt_dork/">@qt_dork</a>) Source and bug reports: <a href="https://github.com/qt-dork/wordle-image-generator">qt-dork/wordle-image-generator</a>.
    </p>
  </footer>

  <Modal fullscreen={true} bind:visible={showSettings}>
    <Settings />
  </Modal>
</div>

<style>
  .content {
    align-content: center;
    align-items: center;
    width: 60rem;
    margin-inline: auto;
    max-width: 90vw;
    display: flex;
    flex-flow: column nowrap;
    gap: 1rem;
  }

  .app {
    display: flex;
    gap: 10px;
    margin-top: var(--vertical-spacing, 1rem);
    margin-bottom: var(--vertical-spacing, 1rem);
    margin-inline: auto;
    max-width: 36rem;
    width: 100%;
  }

  .input-wrapper {
    display: flex;
    flex-flow: column nowrap;
  }

  #input {
    font-size: inherit;
    resize: none;
    background-color: inherit;
    color: inherit;
  }
  
  @media (orientation: landscape) {
    .app {
      flex-flow: row wrap;
    }

    #input {
      width: 15rem;
      height: 100%
    }
  }

  @media (orientation: portrait) {
    .app {
      flex-flow: column nowrap;
    }

    #input {
      height: 11em;
    }
  }
</style>