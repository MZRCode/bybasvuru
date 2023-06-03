const { SlashCommandBuilder, ChatInputCommandInteraction, PermissionFlagsBits, Client } = require('discord.js');
const mzrdb = require('croxydb');
const { DeveloperID } = require('../../config.json');

module.exports = {
     subCommand: "sıfırla.verilecek-rol",
  /**
   * 
   * @param {ChatInputCommandInteraction} interaction 
   * @param {Client} client 
   */

  async execute(interaction, client) {
    const superYetkili = await mzrdb.get(`superyetkili.${interaction.guild.id}`);
    if (!DeveloperID.includes(interaction.user.id) && (!superYetkili || !superYetkili.includes(interaction.user.id))) return interaction.reply({ content: "Yetkili Değilsin!", ephemeral: true });
    
    const { member } = interaction;
    const guildId = interaction.guild.id;

    await mzrdb.delete(`basvuruyetkili.${guildId}`);

    interaction.reply({ content: 'Başvuru onaylandığında verilecek rol başarıyla sıfırlandı!', ephemeral: true });
  },
};