const { ChatInputCommandInteraction, SlashCommandBuilder, Client, PermissionFlagsBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { DeveloperID } = require('../../config.json');
const db = require('croxydb');

module.exports = {
    subCommand: "ekle.admin",
    /**
     * @param {Client} client
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction, client) {
        if (interaction.user.id !== DeveloperID) return interaction.reply({ content: "Developer Değilsin!", ephemeral: true });

        const adminRol = interaction.options.getRole('rol');

        db.set(`adminrol.${interaction.guild.id}`, adminRol.id);

        await interaction.reply({ content: `${adminRol} rolü başarıyla **Admin Rolü** olarak ayarlandı!`, ephemeral: true });
    }
};
