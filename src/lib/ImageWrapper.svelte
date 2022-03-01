<script lang="ts">
  import Grid from './Grid.svelte'

  export let indexes;
  export let firstLine;
  export let output = "";

  let grid;
</script>

<div class="output-container">
  <div class="wrapper">
    <label for="output">Sharable: </label>
    <div class="output-wrapper">
      <div id="output">
        <Grid indexes={indexes} firstLine={firstLine} bind:this={grid}/>
      </div>
    </div>
  </div>
  <button
    class="share-button"
    on:click|preventDefault="{() => { 
      // console.log(output);
      if (grid !== undefined) {
        grid.saveImage();
      }
      if (output !== undefined) {
        navigator.clipboard.writeText(output)
          // .then(() => {
          //   console.log("inside write text")
          // })
      }
    }
  }">Save Image and Copy Alt-Text</button>
</div>

<style>
  .output-container {
    display: flex;
    flex-flow: column nowrap;
    flex-grow: 1;
  }

  .wrapper {
    height: 100%;
  }

  #output {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    overflow: hidden;
  }

  .share-button {
    height: 3rem;
    margin-top: 0.3rem;
  }

  @media (orientation: portrait) {
    .output-wrapper {
      min-height: 33vh;
    }
  }
</style>