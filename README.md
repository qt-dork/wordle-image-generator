# img.wa11y.co (Wordle Image Generator)

A little [Svelte](https://svelte.dev) web app for making [Wordle](https://www.nytimes.com/games/wordle/index.html) results accessible. It does this by saving your Wordle results into an image, and copying the alt text for the image into your clipboard, for easy sharing to Twitter and other websites.

This used to be made in [NextJS](https://nextjs.org), but I hate css in js too much and made the switch.

Inspired by [wa11y](https://wa11y.co) and made with assistance from [@cariad](https://twitter.com/cariadeccleston).

## Changelog

- **2022-03-01**: Added dark mode, colorblind mode, better fallbacks, and rewrote it in Svelte for better speed. Why did I rewrite it in Svelte? [I hate css in js](https://twitter.com/qt_dork/status/1493149448280576001?s=20&t=mKNcJFvbunWFoYKj2gqcJQ)
- **2022-02-20**: Added support for different first lines.
- **2022-01-25**: Added support for the Web Share API, hard mode, and added a license (I'm really bad at that).
- **2022-01-14**: Initial release.
