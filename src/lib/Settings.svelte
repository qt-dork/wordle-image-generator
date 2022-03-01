<script lang="ts">
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import wStorage from "./stores";

  import Switch from "./Switch.svelte";

  interface ThemeObject {
    dark: boolean;
    colorblind: boolean;
  }

  type ThemeClasses = {
    dark: boolean,
    colorblind: boolean,
    class: 'light-no-colorblind' | 'light-with-colorblind' | 'dark-no-colorblind' | 'dark-with-colorblind',
  };

  let theme = wStorage<ThemeObject>('theme', {
    dark: false,
    colorblind: false
  });

  const classes: ThemeClasses[] = [
    { dark: false, colorblind: false, class: 'light-no-colorblind'},
    { dark: false, colorblind: true, class: 'light-with-colorblind' },
    { dark: true, colorblind: false, class: 'dark-no-colorblind' },
    { dark: true, colorblind: true, class: 'dark-with-colorblind' }
  ];

  const getClassName = (dark: boolean, colorblind: boolean) => classes.find(s => s.dark === dark && s.colorblind === colorblind).class;

  let root: HTMLElement;

  onMount(() => {
    root = document.documentElement;
    theme = writable<ThemeObject>(JSON.parse(localStorage.getItem("theme")) || {
      dark: false,
      colorblind: false
    })

    theme.subscribe((value) => localStorage.theme = JSON.stringify(value));

  });

  $: {
    if (root) {
      classes.forEach((element) => {
        root.classList.remove(element.class);
      })
      root.classList.add(getClassName($theme.dark, $theme.colorblind))
    }
  }
</script>

<div class="outer">
  <div class="settings-top">
    <h3>Settings</h3>
    <Switch bind:value={$theme.dark}>
      <span slot="title">Dark Theme</span>
    </Switch>
    <Switch bind:value={$theme.colorblind}>
      <span slot="title">Color Blind Mode</span>
      <span slot="desc">High contrast colors</span>
    </Switch>
    <!-- <Switch bind:value={$theme.dark}>Dark Mode</Switch>
    <Switch bind:value={$theme.colorblind}>Color Blind Mode</Switch> -->
  </div>
</div>

<style>
	.outer {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	:global(.settings-top > div) {
		padding: 16px 0;
		border-bottom: 1px solid var(--perfect-border);
	}
</style>