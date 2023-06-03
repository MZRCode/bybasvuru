const { ChatInputCommandInteraction, SlashCommandBuilder, Client, PermissionFlagsBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { DeveloperID } = require('../../config.json');
const db = require('croxydb');

module.exports = {
    subCommand: "ekle.onay-red",
    /**
     * @param {Client} client
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction, client) {
        const superYetkili = await db.get(`superyetkili.${interaction.guild.id}`);
        if (!DeveloperID.includes(interaction.user.id) && (!superYetkili || !superYetkili.includes(interaction.user.id))) return interaction.reply({ content: "Yetkili Değilsin!", ephemeral: true });

        const basvuruOnayRedKanal = interaction.options.getChannel('kanal');

        db.set(`basvuruonayred.${interaction.guild.id}`, basvuruOnayRedKanal.id);

        await interaction.reply({ content: `${basvuruOnayRedKanal} kanalı başarıyla onay-red kanalı olarak ayarlandı!`, ephemeral: true });
    }
};