<script lang="ts">
  export let value: boolean;
  export let disabled = false;

  const toggle = () => {
    if (!disabled) {
      value = !value;
    }
  }
</script>

<div class="setting">
  <div>
    <div class="title"><slot name="title" /></div>
    <div class="desc"><slot name="desc" /></div>
  </div>
  <div class="toggles">
    <!-- <button
      class="toggle"
      type="button"
      aria-pressed="{value}"
      on:click={toggle}
    >
      <slot />
      <span class="toggle-display" hidden></span>
    </button> -->
    <div class="toggle" on:click={toggle} class:checked={value} {disabled} />
  </div>
</div>

  <style>
    .setting {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .title {
      font-size: var(--fs-medium);
      font-weight: 500;
    }

    .desc {
      font-size: var(--fs-tiny);
      color: var(--icon-color)
    }
    /* .toggles {
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
    } */

    .toggle[disabled="true"] {
      opacity: 0.5;
      cursor: unset;
    }

    .toggle {
      width: 32px;
      height: 20px;
      border-radius: 10px;
      background: var(--icon-color);
      position: relative;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    .toggle::before {
      content: "";
      position: absolute;
      width: 1rem;
      aspect-ratio: 1;
      background: white;
      border-radius: 50%;
      margin: 2px;
      left: 0;
      transition: left 0.3s ease;
    }

    .checked {
      background: var(--perfect-border);
    }

    .checked::before {
      left: 12px;
    }
    
  </style>