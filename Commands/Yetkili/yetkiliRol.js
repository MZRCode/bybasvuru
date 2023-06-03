const { ChatInputCommandInteraction, SlashCommandBuilder, Client, PermissionFlagsBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { DeveloperID } = require('../../config.json');
const db = require('croxydb');

module.exports = {
    subCommand: "ekle.verilecek-rol",
    /**
     * @param {Client} client
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction, client) {
        if (!DeveloperID.includes(interaction.user.id) && (!superYetkili || !superYetkili.includes(interaction.user.id))) return interaction.reply({ content: "Yetkili Değilsin!", ephemeral: true });

        const yetkiliRol = interaction.options.getRole('rol');

        db.set(`basvuruyetkili.${interaction.guild.id}`, yetkiliRol.id);

        await interaction.reply({ content: `${yetkiliRol} Rolü başarıyla kabul edilince verilecek rol olarak ayarlandı!`, ephemeral: true });
    }
};