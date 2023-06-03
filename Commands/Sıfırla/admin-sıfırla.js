const { SlashCommandBuilder, ChatInputCommandInteraction, PermissionFlagsBits, Client } = require('discord.js');
const mzrdb = require('croxydb');
const { DeveloperID } = require('../../config.json');

module.exports = {
     subCommand: "sıfırla.admin-rol",
  /**
   * 
   * @param {ChatInputCommandInteraction} interaction 
   * @param {Client} client 
   */

  async execute(interaction, client) {
    if (!DeveloperID.includes(interaction.user.id)) return interaction.reply({ content: "Developer Değilsin!", ephemeral: true });

    const guildId = interaction.guild.id;

    await mzrdb.delete(`adminrol.${guildId}`);

    interaction.reply({ content: 'Admin Rolü başarıyla sıfırlandı!', ephemeral: true });
  },
};