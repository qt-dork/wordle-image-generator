<script lang="ts">
  import { each, listen, onMount } from 'svelte/internal';
  import { toBlob } from 'html-to-image';
  import pkg from 'file-saver';
  const { saveAs } = pkg;
  import { deviceIsMobile } from './utils';

  import Letter from './Letter.svelte';
  import { theme } from '$lib/stores'

  export let indexes;
  export let firstLine;

  let input;
  let isMobileDevice;
  let dark = false;
  let color = '#ffffff'

  $: color = $theme.dark ? '#121213' : '#ffffff'

  export function saveImage () {
    console.log(deviceIsMobile() ? "Mobile device!" : "Desktop device")

    console.log(toBlob(input))
    toBlob(input, { cacheBust: true, backgroundColor: color})
      .then((blob) => {
        console.log("in toblob")
        const file = [
          new File([blob], 'wordle-image.png', {
            type: 'image/png',
            lastModified: new Date().getTime(),
          })
        ]
        const shareData = {
          title: "Your Wordle Image",
          files: file,
        }
        if (isMobileDevice) {
          console.log("inside mobile");
          if (navigator.canShare && navigator.canShare({ files: shareData.files })) {
            console.log("can share file")
            navigator.share(shareData)
          } else {
            saveAs(blob, 'wordle-image.png')
          }
        } else {
          saveAs(blob, 'wordle-image.png')
        }
      })
  }

  let grid = [];

  $: {
    let emojiGrid = [];
    indexes.forEach(line => {
      let emojiLine = [];
      for (let i = 0; i < 5; i++) {
        if (matchesIndex(line.perfectIndexes, i + 1)) {
          emojiLine = [...emojiLine, 'perfect'];
        } else if (matchesIndex(line.misplacedIndexes, i + 1)) {
          emojiLine = [...emojiLine, 'misplaced'];
        } else {
          emojiLine = [...emojiLine, 'wrong'];
        }
      }

      emojiGrid = [...emojiGrid, emojiLine]; 
    });

    grid = emojiGrid;
  }

  function matchesIndex(line: number[], index: number) {
    let matches = false;
    line.forEach(element => {
      if (index === element) {
        matches = true;
      }
    });
    return matches;
  }

  onMount(() => {
    isMobileDevice = deviceIsMobile();
  })
</script>

<div class="grid" bind:this={input}>
  {#each grid as line}
    <div class="letter-line">
      {#each line as item}
        <Letter status={item}/>
      {/each}
    </div>
  {/each}
  <div class="text">
    <p class="text-left">{firstLine.day}</p>
    <p class="text-right">{firstLine.score}</p>
  </div>
</div>

<style>
  .grid {
    display: grid;
    grid-template-rows: repeat(1fr);
    gap: 0.5rem;
    padding: 24px;
  }

  .letter-line {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 0.5rem;
  }

  .text {
    font-family: var(--body-font);
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1rem;
  }

  .text-left {
    flex-grow: 1;
  }

  .text-right {
    flex-grow: 0;
  }
</style>