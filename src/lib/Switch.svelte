<script lang="ts">
  export let value: boolean;

  const toggle = () => {
    value = !value;
  }
</script>

<div class="toggles">
  <button
    class="toggle"
    type="button"
    aria-pressed="{value}"
    on:click={toggle}
  >
    <slot />
    <span class="toggle-display" hidden></span>
  </button>
</div>


  <style>
    .toggles {
      width: 100%;
    }
  
    .toggle {
      display: flex;
      width: 100%;
      flex-wrap: wrap;
      align-items: center;
      position: relative;
      gap: 1em;
      margin-bottom: 1em;
      cursor: pointer;
    }
  
    button.toggle {
      border: 0;
      padding: 0;
      background-color: transparent;
      font: inherit;
    }
  
    .toggle-display {
      --offset: 2px;
      --diameter: 1em;
  
      display: inline-flex;
      align-items: center;
      justify-content: space-around;
      box-sizing: content-box;
      width: calc(var(--diameter) * 2 + var(--offset) * 2);
      height: calc(var(--diameter) + var(--offset) * 2);
      position: relative;
      border-radius: 100vw;
      background-color: var(--icon-color);
      transition: 250ms;
    }
  
    .toggle-display::before {
      content: "";
      z-index: 2;
      position: absolute;
      top: 50%;
      left: var(--offset);
      box-sizing: border-box;
      width: var(--diameter);
      height: var(--diameter);
      border-radius: 50%;
      background-color: white;
      transform: translate(0, -50%);
      will-change: transform;
      transition: inherit;
    }
  
    .toggle:focus .toggle-display {
      outline: 1px dotted #212121;
      outline: 1px auto -webkit-focus-ring-color;
      outline-offset: 2px;
    }
  
    .toggle:focus,
    .toggle:focus:not(:focus-visible) .toggle-display {
      outline: 0;
    }
  
    .toggle[aria-pressed="true"] .toggle-display {
      background-color: var(--border-perfect);
    }
  
    .toggle[aria-pressed="true"] .toggle-display::before {
      transform: translate(100%, -50%);
    }
    
  </style>