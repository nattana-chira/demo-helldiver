require('dotenv').config();
const {
  Client, GatewayIntentBits, REST, Routes,
  SlashCommandBuilder, EmbedBuilder,
  ActionRowBuilder, ButtonBuilder, ButtonStyle,
  AttachmentBuilder,
} = require('discord.js');
const sharp = require('sharp');
const { stratagems, getCardType, pickDraftLoadout } = require('./stratagems.js');

const TOKEN     = process.env.DISCORD_TOKEN;
const CLIENT_ID = process.env.DISCORD_CLIENT_ID;

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Stores generated loadouts keyed by Discord message ID, expires after 10 min
const loadoutCache = new Map();

// ── Image fetching ──────────────────────────────────────────────────────────

async function fetchIconAsPng(iconUrl) {
  const res = await fetch(iconUrl, {
    headers: { Referer: 'https://helldivers.wiki.gg/' },
  });
  if (!res.ok) return null;
  const buf = Buffer.from(await res.arrayBuffer());
  return sharp(buf)
    .resize(200, 200, { fit: 'contain', background: { r: 34, g: 34, b: 34, alpha: 1 } })
    .png()
    .toBuffer();
}

// ── Embed builders ──────────────────────────────────────────────────────────

const TYPE_COLOR = {
  'Support Weapon':       0x4488ff,
  'Backpack / Exosuit':   0x00aaff,
  'Sentry / Emplacement': 0x44cc44,
  'Strike':               0xff4444,
};

function buildLoadoutEmbed(loadout, index) {
  const lines = loadout.map(s => {
    const t = getCardType(s);
    return `${t.emoji} **${s.name}** — *${t.label}*`;
  });

  return new EmbedBuilder()
    .setTitle(`Loadout ${index + 1}`)
    .setDescription(lines.join('\n'))
    .setColor(0x2b2d31);
}

// ── Slash command registration ──────────────────────────────────────────────

async function registerCommands() {
  const commands = [
    new SlashCommandBuilder()
      .setName('loadout')
      .setDescription('Roll 3 Helldivers 2 draft loadouts and pick one')
      .toJSON(),
  ];
  const rest = new REST().setToken(TOKEN);
  const GUILD_ID = process.env.DISCORD_GUILD_ID;
  const route = GUILD_ID
    ? Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID)  // instant
    : Routes.applicationCommands(CLIENT_ID);                 // up to 1hr
  await rest.put(route, { body: commands });
  console.log('✅ Slash commands registered.');
}

// ── Interaction handlers ────────────────────────────────────────────────────

async function handleLoadout(interaction) {
  await interaction.deferReply();

  const loadouts = [0, 1, 2].map(() => pickDraftLoadout(stratagems));

  const embeds = [
    new EmbedBuilder()
      .setTitle('🎲 Helldivers 2 — Draft Mode')
      .setDescription('Three loadouts, one choice. Pick wisely, Helldiver.')
      .setColor(0xff0080)
      .setFooter({ text: 'Click a button to reveal your loadout' }),
    ...loadouts.map(buildLoadoutEmbed),
  ];

  const buttons = new ActionRowBuilder().addComponents(
    loadouts.map((_, i) =>
      new ButtonBuilder()
        .setCustomId(`pick_${i}`)
        .setLabel(`⚔️ Pick Loadout ${i + 1}`)
        .setStyle(ButtonStyle.Primary)
    )
  );

  const reply = await interaction.editReply({ embeds, components: [buttons] });

  loadoutCache.set(reply.id, { loadouts, timestamp: Date.now() });
  setTimeout(() => loadoutCache.delete(reply.id), 10 * 60 * 1000);
}

async function handlePick(interaction) {
  await interaction.deferUpdate();

  const pickIndex = parseInt(interaction.customId.split('_')[1]);
  const cached = loadoutCache.get(interaction.message.id);

  if (!cached) {
    await interaction.followUp({
      content: '⏱️ This draft expired. Run `/loadout` for a fresh roll.',
      ephemeral: true,
    });
    return;
  }

  const chosen = cached.loadouts[pickIndex];
  loadoutCache.delete(interaction.message.id);

  // Download and convert all 4 stratagem icons to PNG
  const pngBuffers = await Promise.all(
    chosen.map(s => fetchIconAsPng(s.icon).catch(() => null))
  );

  const files = pngBuffers
    .map((buf, i) => buf ? new AttachmentBuilder(buf, { name: `s${i}.png` }) : null)
    .filter(Boolean);

  // Discord "gallery" trick: same url on multiple embeds → 2×2 image grid
  const GALLERY_URL = 'https://helldivers.wiki.gg/wiki/Stratagems';

  const galleryEmbeds = chosen.map((s, i) => {
    const t = getCardType(s);
    const embed = new EmbedBuilder()
      .setURL(GALLERY_URL)
      .setColor(TYPE_COLOR[t.label] ?? 0x00ffcc);

    if (i === 0) {
      const lines = chosen.map(s => {
        const t = getCardType(s);
        return `${t.emoji} **${s.name}**`;
      });
      embed
        .setTitle(`✅ Loadout ${pickIndex + 1} — For Super Earth!`)
        .setDescription(lines.join('\n'));
    }

    if (pngBuffers[i]) embed.setImage(`attachment://s${i}.png`);

    return embed;
  });

  await interaction.editReply({
    embeds: galleryEmbeds,
    files,
    components: [],
  });
}

// ── Bot events ──────────────────────────────────────────────────────────────

client.once('clientReady', async () => {
  console.log(`🤖 Logged in as ${client.user.tag}`);
  await registerCommands();
});

client.on('interactionCreate', async interaction => {
  try {
    if (interaction.isChatInputCommand() && interaction.commandName === 'loadout') {
      await handleLoadout(interaction);
    } else if (interaction.isButton() && interaction.customId.startsWith('pick_')) {
      await handlePick(interaction);
    }
  } catch (err) {
    console.error('Interaction error:', err);
  }
});

// Periodic cleanup of expired cache entries
setInterval(() => {
  const cutoff = Date.now() - 10 * 60 * 1000;
  for (const [id, { timestamp }] of loadoutCache) {
    if (timestamp < cutoff) loadoutCache.delete(id);
  }
}, 60_000);

client.login(TOKEN);
