const { ChatInputCommandInteraction, SlashCommandBuilder, Client, PermissionFlagsBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { DeveloperID } = require('../../config.json');
const db = require('croxydb');

module.exports = {
    subCommand: "ekle.log",
    /**
     * @param {Client} client
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction, client) {
        const superYetkili = await db.get(`superyetkili.${interaction.guild.id}`);
        if (!DeveloperID.includes(interaction.user.id) && (!superYetkili || !superYetkili.includes(interaction.user.id))) return interaction.reply({ content: "Yetkili Değilsin!", ephemeral: true });

        const basvuruLogKanal = interaction.options.getChannel('kanal');

        db.set(`basvurulog.${interaction.guild.id}`, basvuruLogKanal.id);

        await interaction.reply({ content: `${basvuruLogKanal} kanalı başarıyla log kanalı olarak ayarlandı!`, ephemeral: true });
    }
};