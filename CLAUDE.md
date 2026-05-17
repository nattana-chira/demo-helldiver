# Helldivers 2 Stratagem Randomizer — CLAUDE.md

## What This Is

A single-page web app that randomly selects Helldivers 2 stratagems and boosters for challenge runs. The idea: let fate decide your loadout and try to make it work. Built for fun, no backend needed.

Live data is sourced from **helldivers.wiki.gg** (icon images). No API calls — everything is hardcoded JS arrays.

---

## Architecture: One File Rules Them All

**The entire app is `index.html` — 528 lines of HTML + CSS + JS.**

No build step. No framework. No dependencies. Open it in a browser and it works. The `package.json` / `server.js` references are vestigial — ignore them. Just serve `index.html` as a static file or open it directly.

```
helldiver/
├── index.html        ← THE app (HTML + CSS + JS all-in-one)
├── package.json      ← Mostly unused; no deps; references missing server.js
└── CLAUDE.md         ← This file
```

---

## Data Model

### Stratagems (~75 items)

```js
{ name: string, category: string, icon: string, isBackpack?: bool, isVehicle?: bool }
```

**Categories:**
- `Defensive` — Sentries, turrets, mines, emplacements
- `Supply` — Weapons, backpacks, exosuits, vehicles
- `Offensive – Eagle` — Eagle airstrikes
- `Offensive – Orbital` — Orbital strikes/barrages

**Flags:**
- `isBackpack: true` — occupies the backpack slot (Guard Dog, Jump Pack, Shield Generator Pack, etc.)
- `isVehicle: true` — Exosuits and Fast Recon Vehicle

### Rarity Lists

```js
const rareStratagems = [7 items]   // rainbow glow — strong picks
const weakStratagems = [15 items]  // gray glow — situational/meme picks
// everything else = normal (cyan glow)
```

**Current rare stratagems:** Orbital Napalm Barrage, Orbital 380mm HE Barrage, Recoilless Rifle, Rocket Sentry, Autocannon Sentry, Shield Generator Pack, Eagle 500kg Bomb

**Current weak stratagems:** StA-X3 W.A.S.P. Launcher, Directional Shield, Orbital Smoke Strike, Fast Recon Vehicle, Orbital EMS Strike, Guard Dog Breath, Ballistic Shield Backpack, Flame Sentry, Shield Generator Relay, Anti-Personnel Minefield, Gas Mines, Incendiary Mines, Anti-Tank Mines, Commando, Airburst Rocket Launcher, One True Flag, Breaching Hammer

### Boosters (17 items)

```js
{ name: string, icon: string }
```

Icons are SVG from the wiki (different URL format than stratagem PNGs — watch for this when adding new boosters).

---

## Core Logic

### `pickRandomStratagems(arr, count)` — `index.html:365`

Picks `count` unique random stratagems with **balance constraints** (recursive retry on failure):

| Mode | Constraint |
|------|-----------|
| count ≤ 4 | `backpack + supply_weapon ≤ 2` total |
| count > 4 | `backpack ≤ 2` AND `supply_weapon ≤ 2` each |

`supply_weapon` = Supply category that is NOT a backpack and NOT a vehicle.

### `randomBoosters(arr, count)` — `index.html:391`

Simple unique random pick, no constraints.

### `displayStratagems(count, hideRarity)` — `index.html:405`

Main render function. Called on page load with `(4, false)`.

| Button | Call |
|--------|------|
| Random 4 | `displayStratagems()` → `(4, false)` |
| Random 8 + Hide Rarity | `displayStratagems(8, true)` |
| Random Boosters | `displayBoosters()` |

---

## Flip Card + Scan System

### Visual States

| CSS class on `.card` | Appearance |
|---------------------|-----------|
| *(none / default)* | cyan glow — normal pick |
| `.rare` | rainbow glow (7 colors) — powerful pick |
| `.weak` | gray glow — weak pick |
| `.disabled` | 30% opacity — auto-revealed leftover in 8-mode |

Front face shows "Click to Reveal". Back face shows icon + name + category.

### Scan Mechanic (8-mode only)

In `displayStratagems(8, true)`, all cards start as `weak` (rarity is hidden). A global `scanCount` gives the player **1 free peek**:

1. **First click on any card** → `scanCount: 1→0` → reveals that card's true rarity glow (rare/weak/normal), but **does NOT flip** it. Counter shows 0.
2. **Any click after that** → `scanCount: 0→-1` → cards flip normally, true rarity shown on flip.

When the 4th card is flipped in 8-mode, the remaining 4 auto-flip as `disabled + weak`.

In normal 4-mode, `scanCount = 0`, so every click immediately flips — no scan window.

**Key gotcha:** `scanCount` is global, so scanning card A then clicking card B skips card B's scan and jumps straight to flip.

---

## Adding New Stratagems

1. Add to the `stratagems` array in `index.html:235`
2. Follow the existing format — find the icon URL on **helldivers.wiki.gg**
3. Set `isBackpack: true` if it occupies the backpack slot
4. Set `isVehicle: true` for exosuits/vehicles
5. Add to `rareStratagems` or `weakStratagems` if applicable
6. Test that the randomizer balance constraints still behave (especially backpack count)

**Icon URL pattern (stratagems — SVG):**
```
https://helldivers.wiki.gg/images/{Stratagem_Name}_Stratagem_Icon.svg?{cache_hash}
```

**Icon URL pattern (boosters — SVG):**
```
https://helldivers.wiki.gg/images/{Booster_Name}_Booster_Icon.svg?{cache_hash}
```

All icons are now SVG from `helldivers.wiki.gg/images/` — the old PNG URLs with directory hashes (`/images/a/ab/...`) are deprecated and broken. Get the correct URL + cache hash from the stratagem's wiki page or the main Stratagems page.

---

## Known Quirks & Technical Debt

- `server.js` referenced in `package.json` doesn't exist — ignore, it's not needed
- No mobile responsiveness tweaks — cards overflow on small screens
- `displayBoosters()` sets `div.category` content to `s.name` (duplicate) — minor bug, line 501
- No state persistence — refreshing loses your roll
- Recursive retry in `pickRandomStratagems` has no max-depth guard — pathological inputs could stack overflow (not an issue with current data)
- SVG booster icons use cache-busting query strings that may break if wiki updates

---

## Game Context (Helldivers 2)

For stratagem decisions, useful to know:
- **Stratagems** = the 4 equipment slots called in with button sequences
- **Boosters** = passive team upgrades (1 per player, squad can stack 4 different ones)
- **Backpack slot** is shared between backpack stratagems and some weapons (e.g., Recoilless Rifle needs a backpack buddy for ammo)
- The balance constraint mimics real loadout rules: you can't carry two backpack items

**Current meta (as of game patch circa 2025):** Eagle 500kg, Orbital Railcannon, Recoilless Rifle, Quasar Cannon, and Shield Generator Pack are considered top tier. The weak list reflects community consensus on underperformers.

---

## Dev Workflow

```bash
# Serve the file locally (any of these work)
npx serve .
python -m http.server 8080
# Or just open index.html directly in browser — works fine
```

No build. No lint. No tests. Edit `index.html`, reload browser, done.
