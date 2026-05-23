# Helldivers 2 Stratagem Randomizer — CLAUDE.md

## What This Is

A single-page web app that randomly selects Helldivers 2 stratagems and boosters for challenge runs. The idea: let fate decide your loadout and try to make it work. Built for fun.

Live data is sourced from **helldivers.wiki.gg** (icon images). No API calls — everything is hardcoded JS arrays. Firebase Realtime Database is used for the shared activity log only.

---

## Architecture: One File Rules Them All

**The entire app is `index.html`.**

No build step. No framework. Firebase SDK loaded via CDN. Just serve `index.html` as a static file or open it directly. Deployed via Vercel (git push → auto deploy).

```
helldiver/
├── index.html        ← THE app (HTML + CSS + JS all-in-one)
├── bot.js            ← Discord bot (separate, not used by web app)
├── package.json      ← Only needed for bot.js (discord.js deps)
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
const weakStratagems = [17 items]  // gray glow — situational/meme picks
// everything else = normal (cyan glow)
```

**Current rare stratagems:** Orbital Napalm Barrage, Orbital 380mm HE Barrage, Recoilless Rifle, Rocket Sentry, Autocannon Sentry, Shield Generator Pack, Eagle 500kg Bomb

**Current weak stratagems:** StA-X3 W.A.S.P. Launcher, Directional Shield, Orbital Smoke Strike, Fast Recon Vehicle, Orbital EMS Strike, Guard Dog Breath, Ballistic Shield Backpack, Flame Sentry, Shield Generator Relay, Anti-Personnel Minefield, Gas Mines, Incendiary Mines, Anti-Tank Mines, Commando, Airburst Rocket Launcher, One True Flag, Breaching Hammer

### Boosters (17 items)

```js
{ name: string, icon: string }
```

Icons are SVG from the wiki (different URL format than stratagem SVGs — watch for this when adding new boosters).

### `iconMap`

Built at runtime from `[...stratagems, ...boosters]` — maps `name → icon URL`. Used by the activity log to render icons without re-fetching data.

---

## Core Logic

### `pickRandomStratagems(arr, count)`

Picks `count` unique random stratagems with **balance constraints** (recursive retry on failure):

| Mode | Constraint |
|------|-----------|
| count ≤ 4 | `backpack + supply_weapon ≤ 2` total |
| count > 4 | `backpack ≤ 2` AND `supply_weapon ≤ 2` each |

`supply_weapon` = Supply category that is NOT a backpack and NOT a vehicle.

### `randomBoosters(arr, count)`

Simple unique random pick, no constraints.

### `displayStratagems(count, hideRarity)`

Main render function. No longer called on page load — user must click a button first.

| Button | Call |
|--------|------|
| Random 4 | `displayStratagems()` → `(4, false)` |
| Random 8 + Hide Rarity | `displayStratagems(8, true)` |
| Random Boosters | `displayBoosters()` |

Each call also writes the roll to Firebase via `logRoll()`.

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

1. **First click on any card** → `scanCount: 1→0` → reveals that card's true rarity glow, but **does NOT flip** it.
2. **Any click after that** → `scanCount: 0→-1` → cards flip normally, true rarity shown on flip.

When the 4th card is flipped in 8-mode, the remaining 4 auto-flip as `disabled + weak`.

**Key gotcha:** `scanCount` is global, so scanning card A then clicking card B skips card B's scan and jumps straight to flip.

---

## Draft Mode

Generates 3 loadouts of 4 stratagems each. Player picks one; the others fade out. Selected loadout cards become re-rollable (per-card, same type pool).

### `getCardType(s)` — card front color + label

| Type | Condition | Emoji | CSS class |
|------|-----------|-------|-----------|
| Exosuit / Vehicle | `isVehicle` | 🤖 | `type-exosuit` |
| Backpack | `isBackpack` | 🎒 | `type-backpack` |
| Strike | Eagle or Orbital category | ☄️ | `type-strike` |
| Sentry / Emplacement | Defensive category | 🗼 | `type-defensive` |
| Support Weapon | Supply, not backpack/vehicle | 🔫 | `type-support` |

Exosuits and backpacks are **separate categories** — re-rolls pull from the correct pool.

### `pickDraftLoadout(arr)`

Weighted random: boosts strikes (20% skip for non-strikes), limits support weapons (20% skip). Max 1 backpack, max 2 support weapons per loadout. Recursive retry on violation.

### `getSameTypePool(s)`

Returns all stratagems of the same `getCardType` class — used for per-card re-rolls.

Selecting a loadout also logs it to Firebase as `[Draft]`.

---

## Callsign

Stored in `localStorage` under key `callsign`. Defaults to `"Helldiver"`.

- Displayed in the sidebar as `👤 <name> ✏️`
- Entire bar is clickable — switches to an inline text input on click, saves on Enter/blur
- Included in every Firebase roll entry as `callsign` field
- Shown in each log entry in cyan before the timestamp

### Functions
- `getCallsign()` — reads from localStorage
- `initCallsign()` — wires up the display/input toggle, called from `window.onload`

---

## Spin Animation

When `displayStratagems` or `displayBoosters` renders cards, each card front starts blank and cycles through random stratagem icons rapidly (slot machine effect) before settling on "Click to Reveal".

- `spinCard(frontEl, staggerDelay, onDone)` — animates one card front. Runs `totalFrames` steps with exponentially increasing delay (fast → slow)
- Cards stagger by `120ms` per index so they stop one after another
- Cards have class `spinning` during animation — click handlers return early if `spinning` is present, preventing premature flips

---

## Firebase Activity Log

**Project:** `wtk-game` (Firebase)
**Database URL:** `https://wtk-game-default-rtdb.asia-southeast1.firebasedatabase.app`
**Path:** `/rolls`

### Schema

```js
{
  names: string[],   // stratagem/booster names
  mode: string,      // "Random 4" | "Random 8" | "Boosters" | "Draft"
  ts: number         // ServerValue.TIMESTAMP (ms)
}
```

### `logRoll(items, mode)`

Pushes a roll to Firebase. Called by `displayStratagems`, `displayBoosters`, and draft mode on loadout select.

### `subscribeToLog()`

`on("value")` listener on `/rolls` ordered by `ts`, last 30. Re-renders the full log on every change. Uses `snap.forEach(child => { entries.push(child.val()); })` — **note the curly braces are required**: without them, `push()` returns a truthy length and Firebase stops iterating after 1 entry.

### `snap.forEach` gotcha

Use `snap.forEach(child => { entries.push(child.val()); })` — **curly braces required**. Without them, the arrow function implicitly returns `push()`'s return value (a truthy number), which causes Firebase to stop iteration after 1 entry.

### Layout

Two-column layout: main content on the left, log as a sticky right sidebar (`width: 280px`, `position: sticky`). Each log entry shows the callsign in cyan, timestamp, mode tag, then a row of 32×32 icons (name shown on hover via `title`). All icons at full brightness.

### 🔥 Hot Right Now

Below the log, a `#hot-list` section shows the top 3 most-rolled stratagems from the last 30 entries. Computed in `renderHotNow(entries)` — called from the same `on("value")` callback before `entries.reverse()`. Shows gold/silver/bronze rank, icon, name, and roll count (`×N`).

---

## Page Layout

```
#page-layout (flex row)
├── #main-content (flex: 1)
│   ├── Draft Mode button + #draft-section  ← top
│   ├── Random 4 / Random 8 buttons
│   ├── #stratagems card grid
│   ├── #boosters card grid
│   └── Random Boosters button
└── #roll-log-section (280px sticky sidebar)
    └── #roll-log (scrollable, custom cyan scrollbar)
```

Page loads empty — no stratagems shown until user clicks a button.

---

## Adding New Stratagems

1. Add to the `stratagems` array in `index.html`
2. Follow the existing format — find the icon URL on **helldivers.wiki.gg**
3. Set `isBackpack: true` if it occupies the backpack slot
4. Set `isVehicle: true` for exosuits/vehicles
5. Add to `rareStratagems` or `weakStratagems` if applicable
6. `iconMap` is built automatically — no extra step needed

**Icon URL pattern (SVG):**
```
https://helldivers.wiki.gg/images/{Name}_Stratagem_Icon.svg?{cache_hash}
https://helldivers.wiki.gg/images/{Name}_Booster_Icon.svg?{cache_hash}
```

All icons are SVG from `helldivers.wiki.gg/images/` — old PNG URLs with directory hashes are deprecated and broken.

---

## Known Quirks & Technical Debt

- No mobile responsiveness — cards overflow on small screens
- `displayBoosters()` sets `div.category` content to `s.name` (duplicate) — minor bug
- Recursive retry in `pickRandomStratagems` has no max-depth guard — not an issue with current data
- SVG icons use cache-busting query strings that may break if wiki updates
- Firebase rules are currently open (test mode) — fine for a fun project, but set expiry if needed

---

## Game Context (Helldivers 2)

- **Stratagems** = the 4 equipment slots called in with button sequences
- **Boosters** = passive team upgrades (1 per player, squad can stack 4 different ones)
- **Backpack slot** is shared between backpack stratagems and some weapons
- The balance constraint mimics real loadout rules: you can't carry two backpack items

**Current meta (as of 2025):** Eagle 500kg, Orbital Railcannon, Recoilless Rifle, Quasar Cannon, and Shield Generator Pack are considered top tier.

---

## Dev Workflow

```bash
# Serve locally
npx serve .
python -m http.server 8080
# Or open index.html directly — works fine
```

No build. No lint. No tests. Edit `index.html`, reload browser, done. Push to `master` → Vercel auto-deploys.
