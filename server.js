const stratagems = {
  "Offensive – Orbital": [
    "Precision Strike", "Gatling Barrage", "Airburst Strike", "Napalm Barrage",
    "120 MM HE Barrage", "Walking Barrage", "380 MM HE Barrage", "Railcannon Strike",
    "Laser", "EMS Strike", "Gas Strike", "Smoke Strike"
  ],
  "Offensive – Eagle": [
    "Strafing Run", "500 kg Bomb", "110 MM Rocket Pods", "Airstrike",
    "Cluster Bomb", "Napalm Airstrike", "Smoke Strike"
  ],
  "Supply": [
    "MG‑43 Machine Gun", "Heavy Machine Gun", "APW‑1 Anti‑Material Rifle",
    "M‑105 Stalwart", "Flamethrower", "Autocannon", "Railgun", "Spear Launcher",
    "Grenade Launcher", "Laser Cannon", "Quasar Cannon", "Arc Thrower",
    "Jump Pack", "Supply Pack", "Ballistic Shield Backpack", "Guard Dog Rover",
    "Patriot Exosuit", "Exo‑45"
  ],
  "Defensive": [
    "Machine Gun Sentry", "Gatling Sentry", "Autocannon Sentry", "Mortar Sentry",
    "Rocket Sentry", "EMS Sentry", "HMG Emplacement", "Tesla Tower", 
    "Anti‑Personnel Minefield", "Incendiary Mines", "Gas Mines", "Shield Generator Pack"
  ]
};

function getRandomStratagem() {
  const categories = Object.keys(stratagems);
  const category = categories[Math.floor(Math.random() * categories.length)];
  const items = stratagems[category];
  const stratagem = items[Math.floor(Math.random() * items.length)];

  return { category, stratagem };
}

function getUniqueRandomStratagems(count) {
  const seen = new Set();
  const results = [];

  while (results.length < count) {
    const { category, stratagem } = getRandomStratagem();
    const key = `${category} - ${stratagem}`;
    if (!seen.has(key)) {
      seen.add(key);
      results.push({ category, stratagem });
    }
  }

  return results;
}

const randomStrats = getUniqueRandomStratagems(4);

console.log("🎯 Your 4 Random Stratagems:");
randomStrats.forEach((item, idx) => {
  console.log(`${idx + 1}. [${item.category}] ${item.stratagem}`);
});
