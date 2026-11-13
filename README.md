# Unblocked Games

A minimal, dark-mode GBA emulator game site template. **No games included** — the
canvas runs whatever GBA ROM you give it.

## Run

```sh
npm start
```

Then open http://localhost:3000. There are no dependencies — `server.js` uses only
Node's built-in `http` module.

The site itself is fully static, so it also works on any static host
(e.g. GitHub Pages) without the Node server.

## Adding games

1. Drop `.gba` ROM files into `roms/`.
2. Add an entry to `roms/games.json`:

```json
[
  { "name": "My Game", "file": "mygame.gba" }
]
```

Each entry becomes a button above the screen. Games load straight into the
canvas.

## Controls

| Key        | Action |
|------------|--------|
| Arrow keys | D-pad  |
| Z          | A      |
| X          | B      |
| A          | L      |
| S          | R      |
| Enter      | Start  |
| \          | Select |

Gamepads are supported too.

## Layout

```
index.html        the site (dark mode, canvas screen)
server.js         optional zero-dependency static server
emulator/         GBA.js emulator (MPL 2.0, see emulator/COPYING)
bios/gba_bios.bin GBA BIOS, auto-loaded by the site
roms/             put .gba ROM files here (none included)
```

## Notes

- The emulator is [GBA.js](https://github.com/endrift/gbajs) by endrift, licensed
  under the MPL 2.0.
- `bios/gba_bios.bin` is Nintendo's GBA BIOS firmware. It is copyrighted by
  Nintendo — do not redistribute it or push it to a public repository.
