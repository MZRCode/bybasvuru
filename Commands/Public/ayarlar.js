const { ChatInputCommandInteraction, SlashCommandBuilder, Client, EmbedBuilder } = require("discord.js");
const mzrdb = require('croxydb');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("ayarlar")
    .setDescription("Ayarlarını Gösterir"),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */

    async execute(interaction, client) {

        const guildId = interaction.guild.id;
        const adminRolId = await mzrdb.get(`adminrol.${guildId}`);
        const yetkiliRolId = await mzrdb.get(`basvuruyetkili.${guildId}`);
        const onayredKanalId = await mzrdb.get(`basvuruonayred.${guildId}`);
        const logKanalId = await mzrdb.get(`basvurulog.${guildId}`);

        const embed = new EmbedBuilder()
            .setTitle("Sunucu Ayarları")
            .setColor("#5865F2");

        const adminRol = interaction.guild.roles.cache.get(adminRolId);
        if (adminRol) {
            embed.addFields([
                {name: "<:staff:1114564666916610188> Admin Rol", value: adminRol.toString(), inline: false}
            ]);
        } else {
            embed.addFields([
                {name: "<:staff:1114564666916610188> Admin Rol", value: `Ayarlı Değil <:hayir:1110297826631622657>`, inline: false}
            ]);
        }
            
        const yetkiliRol = interaction.guild.roles.cache.get(yetkiliRolId);
        if (yetkiliRol) {
            embed.addFields([
                {name: "<:moderator:1110298405714010212> Verilecek Yetkili Rol", value: yetkiliRol.toString(), inline: false}
            ]);
        } else {
            embed.addFields([
                {name: "<:moderator:1110298405714010212> Verilecek Yetkili Rol", value: `Ayarlı Değil <:hayir:1110297826631622657>`, inline: false}
            ]);
        }

        const logKanal = interaction.guild.channels.cache.get(logKanalId);
        if (logKanal) {
            embed.addFields([
                {name: "<:settings:1106906002353303666> Başvuru Log Kanalı", value: logKanal.toString(), inline: false}
            ]);
        } else {
            embed.addFields([
                {name: "<:settings:1106906002353303666> Başvuru Log Kanalı", value: `Ayarlı Değil <:hayir:1110297826631622657>`, inline: false}
            ]);
        }

        const onayredKanal = interaction.guild.channels.cache.get(onayredKanalId);
        if (onayredKanal) {
            embed.addFields([
                {name: "<:settings:1106906002353303666> Başvuru Onay & Red Kanalı", value: onayredKanal.toString(), inline: false}
            ]);
        } else {
            embed.addFields([
                {name: "<:settings:1106906002353303666> Başvuru Onay & Red Kanalı", value: `Ayarlı Değil <:hayir:1110297826631622657>`, inline: false}
            ]);
        }

        await interaction.reply({ embeds: [embed], ephemeral: true });
    }
};