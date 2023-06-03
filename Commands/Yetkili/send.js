const { ChatInputCommandInteraction, SlashCommandBuilder, Client, PermissionFlagsBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { DeveloperID } = require('../../config.json');
const db = require('croxydb');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("gönder")
        .setDescription("Formu Gönderir")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    /**
     * @param {Client} client
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction, client) {
      const superYetkili = await db.get(`superyetkili.${interaction.guild.id}`);
      if (!DeveloperID.includes(interaction.user.id) && (!superYetkili || !superYetkili.includes(interaction.user.id))) return interaction.reply({ content: "Yetkili Değilsin!", ephemeral: true });
    const embed = new EmbedBuilder()
        .setTitle('Başvuru Formu')
        .setDescription('Yetkili alımı için aşağıdaki butona tıklayınız!')
        .setColor('Red')
    const row = new ActionRowBuilder()
        .addComponents(
         new ButtonBuilder()
         .setStyle(ButtonStyle.Success)
      .setLabel('Başvuru Yap')
      .setCustomId('basvuru')
    )
    await interaction.reply({
      embeds: [embed],
      components: [row]
    })
  }
};