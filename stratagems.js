// Shared stratagem data — keep in sync with index.html

const stratagems = [
  // Defensive – Sentries
  { name: "Flame Sentry",            category: "Defensive",           icon: "https://helldivers.wiki.gg/images/Flame_Sentry_Stratagem_Icon.svg?97ca77" },
  { name: "EMS Mortar Sentry",       category: "Defensive",           icon: "https://helldivers.wiki.gg/images/EMS_Mortar_Sentry_Stratagem_Icon.svg?3e0d88" },
  { name: "Autocannon Sentry",       category: "Defensive",           icon: "https://helldivers.wiki.gg/images/Autocannon_Sentry_Stratagem_Icon.svg?cb2722" },
  { name: "Gatling Sentry",          category: "Defensive",           icon: "https://helldivers.wiki.gg/images/Gatling_Sentry_Stratagem_Icon.svg?e3c78d" },
  { name: "Laser Sentry",            category: "Defensive",           icon: "https://helldivers.wiki.gg/images/Laser_Sentry_Stratagem_Icon.svg?72c5b8" },
  { name: "Machine Gun Sentry",      category: "Defensive",           icon: "https://helldivers.wiki.gg/images/Machine_Gun_Sentry_Stratagem_Icon.svg?a8045d" },
  { name: "Mortar Sentry",           category: "Defensive",           icon: "https://helldivers.wiki.gg/images/Mortar_Sentry_Stratagem_Icon.svg?5bf6cc" },
  { name: "Rocket Sentry",           category: "Defensive",           icon: "https://helldivers.wiki.gg/images/Rocket_Sentry_Stratagem_Icon.svg?9e05dc" },
  { name: "Tesla Tower",             category: "Defensive",           icon: "https://helldivers.wiki.gg/images/Tesla_Tower_Stratagem_Icon.svg?a30c81" },
  { name: "Gas Mortar Sentry",       category: "Defensive",           icon: "https://helldivers.wiki.gg/images/Gas_Mortar_Sentry_Stratagem_Icon.svg?faaf07" },
  // Defensive – Emplacements & Mines
  { name: "Anti-Personnel Minefield",category: "Defensive",           icon: "https://helldivers.wiki.gg/images/Anti-Personnel_Minefield_Stratagem_Icon.svg?ccc429" },
  { name: "Anti-Tank Mines",         category: "Defensive",           icon: "https://helldivers.wiki.gg/images/Anti-Tank_Mines_Stratagem_Icon.svg?b36aca" },
  { name: "Anti-Tank Emplacement",   category: "Defensive",           icon: "https://helldivers.wiki.gg/images/Anti-Tank_Emplacement_Stratagem_Icon.svg?6c5737" },
  { name: "Gas Mines",               category: "Defensive",           icon: "https://helldivers.wiki.gg/images/Gas_Mines_Stratagem_Icon.svg?3181af" },
  { name: "Grenadier Battlement",    category: "Defensive",           icon: "https://helldivers.wiki.gg/images/Grenadier_Battlement_Stratagem_Icon.svg?64eda4" },
  { name: "HMG Emplacement",         category: "Defensive",           icon: "https://helldivers.wiki.gg/images/HMG_Emplacement_Stratagem_Icon.svg?b5de1a" },
  { name: "Incendiary Mines",        category: "Defensive",           icon: "https://helldivers.wiki.gg/images/Incendiary_Mines_Stratagem_Icon.svg?241736" },
  { name: "Shield Generator Relay",  category: "Defensive",           icon: "https://helldivers.wiki.gg/images/Shield_Generator_Relay_Stratagem_Icon.svg?6f5e09" },
  { name: "Directional Shield",      category: "Defensive", isBackpack: true, icon: "https://helldivers.wiki.gg/images/Directional_Shield_Stratagem_Icon.svg?ee4281" },
  // Supply – Support Weapons
  { name: "Anti-Materiel Rifle",     category: "Supply",              icon: "https://helldivers.wiki.gg/images/Anti-Materiel_Rifle_Stratagem_Icon.svg?3012d6" },
  { name: "Arc Thrower",             category: "Supply",              icon: "https://helldivers.wiki.gg/images/Arc_Thrower_Stratagem_Icon.svg?989f0a" },
  { name: "Autocannon",              category: "Supply",              icon: "https://helldivers.wiki.gg/images/Autocannon_Stratagem_Icon.svg?67957f" },
  { name: "Airburst Rocket Launcher",category: "Supply",              icon: "https://helldivers.wiki.gg/images/Airburst_Rocket_Launcher_Stratagem_Icon.svg?79be66" },
  { name: "Belt-Fed Grenade Launcher",category: "Supply",             icon: "https://helldivers.wiki.gg/images/Belt-Fed_Grenade_Launcher_Stratagem_Icon.svg?315364" },
  { name: "Breaching Hammer",        category: "Supply",              icon: "https://helldivers.wiki.gg/images/Breaching_Hammer_Stratagem_Icon.svg?afd444" },
  { name: "Bullet Storm",            category: "Supply",              icon: "https://helldivers.wiki.gg/images/Bullet_Storm_Stratagem_Icon.svg?45bc97" },
  { name: "Commando",                category: "Supply",              icon: "https://helldivers.wiki.gg/images/Commando_Stratagem_Icon.svg?524e93" },
  { name: "Cremator",                category: "Supply",              icon: "https://helldivers.wiki.gg/images/Cremator_Stratagem_Icon.svg?a0a2d3" },
  { name: "De-Escalator",            category: "Supply",              icon: "https://helldivers.wiki.gg/images/De-Escalator_Stratagem_Icon.svg?9f2324" },
  { name: "Defoliation Tool",        category: "Supply",              icon: "https://helldivers.wiki.gg/images/Defoliation_Tool_Stratagem_Icon.svg?10a3bf" },
  { name: "Expendable Anti-Tank",    category: "Supply",              icon: "https://helldivers.wiki.gg/images/Expendable_Anti-Tank_Stratagem_Icon.svg?504a15" },
  { name: "Expendable Napalm",       category: "Supply",              icon: "https://helldivers.wiki.gg/images/Expendable_Napalm_Stratagem_Icon.svg?4b2d70" },
  { name: "Flamethrower",            category: "Supply",              icon: "https://helldivers.wiki.gg/images/Flamethrower_Stratagem_Icon.svg?95194d" },
  { name: "Grenade Launcher",        category: "Supply",              icon: "https://helldivers.wiki.gg/images/Grenade_Launcher_Stratagem_Icon.svg?c5905c" },
  { name: "Heavy Machine Gun",       category: "Supply",              icon: "https://helldivers.wiki.gg/images/Heavy_Machine_Gun_Stratagem_Icon.svg?59c94f" },
  { name: "Laser Cannon",            category: "Supply",              icon: "https://helldivers.wiki.gg/images/Laser_Cannon_Stratagem_Icon.svg?a6c147" },
  { name: "Leveller",                category: "Supply",              icon: "https://helldivers.wiki.gg/images/Leveller_Stratagem_Icon.svg?c94491" },
  { name: "Machine Gun",             category: "Supply",              icon: "https://helldivers.wiki.gg/images/Machine_Gun_Stratagem_Icon.svg?54c36c" },
  { name: "Maxigun",                 category: "Supply",              icon: "https://helldivers.wiki.gg/images/Maxigun_Stratagem_Icon.svg?54e54b" },
  { name: "One True Flag",           category: "Supply",              icon: "https://helldivers.wiki.gg/images/One_True_Flag_Stratagem_Icon.svg?268e93" },
  { name: "PLAS-45 Epoch",           category: "Supply",              icon: "https://helldivers.wiki.gg/images/Epoch_Stratagem_Icon.svg?7f20cc" },
  { name: "Quasar Cannon",           category: "Supply",              icon: "https://helldivers.wiki.gg/images/Quasar_Cannon_Stratagem_Icon.svg?8aa6f0" },
  { name: "Railgun",                 category: "Supply",              icon: "https://helldivers.wiki.gg/images/Railgun_Stratagem_Icon.svg?66cdeb" },
  { name: "Recoilless Rifle",        category: "Supply",              icon: "https://helldivers.wiki.gg/images/Recoilless_Rifle_Stratagem_Icon.svg?270863" },
  { name: "Solo Silo",               category: "Supply",              icon: "https://helldivers.wiki.gg/images/Solo_Silo_Stratagem_Icon.svg?8b6ddb" },
  { name: "Spear",                   category: "Supply",              icon: "https://helldivers.wiki.gg/images/Spear_Stratagem_Icon.svg?c3f9af" },
  { name: "Speargun",                category: "Supply",              icon: "https://helldivers.wiki.gg/images/Speargun_Stratagem_Icon.svg?f80347" },
  { name: "StA-X3 W.A.S.P. Launcher",category: "Supply",             icon: "https://helldivers.wiki.gg/images/W.A.S.P._Launcher_Stratagem_Icon.svg?db7fac" },
  { name: "Stalwart",                category: "Supply",              icon: "https://helldivers.wiki.gg/images/Stalwart_Stratagem_Icon.svg?f9f3f5" },
  { name: "Sterilizer",              category: "Supply",              icon: "https://helldivers.wiki.gg/images/Sterilizer_Stratagem_Icon.svg?946d84" },
  // Supply – Backpacks
  { name: "Ballistic Shield Backpack",category: "Supply", isBackpack: true, icon: "https://helldivers.wiki.gg/images/Ballistic_Shield_Backpack_Stratagem_Icon.svg?9ea21d" },
  { name: "C4 Pack",                 category: "Supply", isBackpack: true, icon: "https://helldivers.wiki.gg/images/C4_Pack_Stratagem_Icon.svg?cfb679" },
  { name: "Guard Dog Breath",        category: "Supply", isBackpack: true, icon: "https://helldivers.wiki.gg/images/Dog_Breath_Stratagem_Icon.svg?833287" },
  { name: "Guard Dog Rover",         category: "Supply", isBackpack: true, icon: "https://helldivers.wiki.gg/images/Rover_Stratagem_Icon.svg?80445d" },
  { name: "Guard Dog",               category: "Supply", isBackpack: true, icon: "https://helldivers.wiki.gg/images/Guard_Dog_Stratagem_Icon.svg?bf3310" },
  { name: "Guard Dog K-9",           category: "Supply", isBackpack: true, icon: "https://helldivers.wiki.gg/images/K-9_Stratagem_Icon.svg?adfb74" },
  { name: "Hot Dog",                 category: "Supply", isBackpack: true, icon: "https://helldivers.wiki.gg/images/Hot_Dog_Stratagem_Icon.svg?21ad0f" },
  { name: "Hover Pack",              category: "Supply", isBackpack: true, icon: "https://helldivers.wiki.gg/images/Hover_Pack_Stratagem_Icon.svg?c5f32f" },
  { name: "Jump Pack",               category: "Supply", isBackpack: true, icon: "https://helldivers.wiki.gg/images/Jump_Pack_Stratagem_Icon.svg?68659f" },
  { name: "Portable Hellbomb",       category: "Supply", isBackpack: true, icon: "https://helldivers.wiki.gg/images/Portable_Hellbomb_Stratagem_Icon.svg?84704d" },
  { name: "Shield Generator Pack",   category: "Supply", isBackpack: true, icon: "https://helldivers.wiki.gg/images/Shield_Generator_Pack_Stratagem_Icon.svg?babfa4" },
  { name: "Supply Pack",             category: "Supply", isBackpack: true, icon: "https://helldivers.wiki.gg/images/Supply_Pack_Stratagem_Icon.svg?2e569f" },
  { name: "Warp Pack",               category: "Supply", isBackpack: true, icon: "https://helldivers.wiki.gg/images/Warp_Pack_Stratagem_Icon.svg?c33eea" },
  // Supply – Vehicles
  { name: "EXO-45 Patriot Exosuit",  category: "Supply", isVehicle: true,  icon: "https://helldivers.wiki.gg/images/Patriot_Exosuit_Stratagem_Icon.svg?18fd58" },
  { name: "EXO-49 Emancipator Exosuit",category: "Supply", isVehicle: true, icon: "https://helldivers.wiki.gg/images/Emancipator_Exosuit_Stratagem_Icon.svg?2917bc" },
  { name: "EXO-55 Breakthrough Exosuit",category: "Supply", isVehicle: true, icon: "https://helldivers.wiki.gg/images/Breakthrough_Exosuit_Stratagem_Icon.svg?951248" },
  { name: "EXO-51 Lumberer Exosuit", category: "Supply", isVehicle: true,  icon: "https://helldivers.wiki.gg/images/Lumberer_Exosuit_Stratagem_Icon.svg?4e2ca8" },
  { name: "Fast Recon Vehicle",      category: "Supply", isVehicle: true,  icon: "https://helldivers.wiki.gg/images/Fast_Recon_Vehicle_Stratagem_Icon.svg?3c3758" },
  { name: "TD-220 Bastion",          category: "Supply", isVehicle: true,  icon: "https://helldivers.wiki.gg/images/Bastion_MK_XVI_Stratagem_Icon.svg?3895cb" },
  // Offensive – Eagle
  { name: "Eagle 110mm Rocket Pods", category: "Offensive – Eagle",   icon: "https://helldivers.wiki.gg/images/Eagle_110mm_Rocket_Pods_Stratagem_Icon.svg?54c976" },
  { name: "Eagle 500kg Bomb",        category: "Offensive – Eagle",   icon: "https://helldivers.wiki.gg/images/Eagle_500kg_Bomb_Stratagem_Icon.svg?61faff" },
  { name: "Eagle Airstrike",         category: "Offensive – Eagle",   icon: "https://helldivers.wiki.gg/images/Eagle_Airstrike_Stratagem_Icon.svg?c5e1e8" },
  { name: "Eagle Cluster Bomb",      category: "Offensive – Eagle",   icon: "https://helldivers.wiki.gg/images/Eagle_Cluster_Bomb_Stratagem_Icon.svg?6d03ee" },
  { name: "Eagle Napalm Airstrike",  category: "Offensive – Eagle",   icon: "https://helldivers.wiki.gg/images/Eagle_Napalm_Airstrike_Stratagem_Icon.svg?e059df" },
  { name: "Eagle Smoke Strike",      category: "Offensive – Eagle",   icon: "https://helldivers.wiki.gg/images/Eagle_Smoke_Strike_Stratagem_Icon.svg?751626" },
  { name: "Eagle Strafing Run",      category: "Offensive – Eagle",   icon: "https://helldivers.wiki.gg/images/Eagle_Strafing_Run_Stratagem_Icon.svg?bbc684" },
  // Offensive – Orbital
  { name: "Orbital 120mm HE Barrage",category: "Offensive – Orbital", icon: "https://helldivers.wiki.gg/images/Orbital_120mm_HE_Barrage_Stratagem_Icon.svg?d918e1" },
  { name: "Orbital 380mm HE Barrage",category: "Offensive – Orbital", icon: "https://helldivers.wiki.gg/images/Orbital_380mm_HE_Barrage_Stratagem_Icon.svg?220047" },
  { name: "Orbital Airburst Strike", category: "Offensive – Orbital", icon: "https://helldivers.wiki.gg/images/Orbital_Airburst_Strike_Stratagem_Icon.svg?c22da6" },
  { name: "Orbital EMS Strike",      category: "Offensive – Orbital", icon: "https://helldivers.wiki.gg/images/Orbital_EMS_Strike_Stratagem_Icon.svg?964fec" },
  { name: "Orbital Gas Strike",      category: "Offensive – Orbital", icon: "https://helldivers.wiki.gg/images/Orbital_Gas_Strike_Stratagem_Icon.svg?f43562" },
  { name: "Orbital Gatling Barrage", category: "Offensive – Orbital", icon: "https://helldivers.wiki.gg/images/Orbital_Gatling_Barrage_Stratagem_Icon.svg?a743a8" },
  { name: "Orbital Laser",           category: "Offensive – Orbital", icon: "https://helldivers.wiki.gg/images/Orbital_Laser_Stratagem_Icon.svg?18e79e" },
  { name: "Orbital Napalm Barrage",  category: "Offensive – Orbital", icon: "https://helldivers.wiki.gg/images/Orbital_Napalm_Barrage_Stratagem_Icon.svg?3d49f8" },
  { name: "Orbital Precision Strike",category: "Offensive – Orbital", icon: "https://helldivers.wiki.gg/images/Orbital_Precision_Strike_Stratagem_Icon.svg?f7747f" },
  { name: "Orbital Railcannon Strike",category: "Offensive – Orbital",icon: "https://helldivers.wiki.gg/images/Orbital_Railcannon_Strike_Stratagem_Icon.svg?64a5ff" },
  { name: "Orbital Smoke Strike",    category: "Offensive – Orbital", icon: "https://helldivers.wiki.gg/images/Orbital_Smoke_Strike_Stratagem_Icon.svg?683b12" },
  { name: "Orbital Walking Barrage", category: "Offensive – Orbital", icon: "https://helldivers.wiki.gg/images/Orbital_Walking_Barrage_Stratagem_Icon.svg?7f8e1d" },
];

function getCardType(s) {
  if (s.isVehicle || s.isBackpack)                                                  return { label: "Backpack / Exosuit",   emoji: "🎒" };
  if (s.category === "Offensive – Eagle" || s.category === "Offensive – Orbital")  return { label: "Strike",               emoji: "☄️" };
  if (s.category === "Defensive")                                                   return { label: "Sentry / Emplacement", emoji: "🗼" };
  return                                                                                   { label: "Support Weapon",       emoji: "🔫" };
}

function pickDraftLoadout(arr) {
  const result = [];
  const usedIndices = new Set();
  while (result.length < 4 && result.length < arr.length) {
    const i = Math.floor(Math.random() * arr.length);
    if (usedIndices.has(i)) continue;
    const s = arr[i];
    const isStrike  = s.category === "Offensive – Eagle" || s.category === "Offensive – Orbital";
    const isSupport = s.category === "Supply" && !s.isBackpack && !s.isVehicle;
    if (isSupport && Math.random() < 0.2) continue; // 20% chance to skip support weapons
    if (!isStrike  && Math.random() < 0.2) continue; // boost strikes: 20% skip for non-strikes
    usedIndices.add(i);
    result.push(s);
  }
  const backpackCount = result.filter(s => s.isBackpack || s.isVehicle).length;
  const supportCount  = result.filter(s => s.category === "Supply" && !s.isBackpack && !s.isVehicle).length;
  if (backpackCount > 1 || supportCount > 2) return pickDraftLoadout(arr);
  return result;
}

module.exports = { stratagems, getCardType, pickDraftLoadout };
