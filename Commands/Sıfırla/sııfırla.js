const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("sıfırla")
    .setDescription("Sıfırlama/Silme Sistemi")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addSubcommand((options) => options
        .setName("admin-rol")
        .setDescription("Ayarlanan Admin Rolünü Sıfırlarsınız"))
    .addSubcommand((options) => options
        .setName("verilecek-rol")
        .setDescription("Ayarlanan Verilecek Rolü Sıfırlarsınız"))
    .addSubcommand((options) => options
        .setName("log")
        .setDescription("Ayarlanan Log Kanalını Sıfırlarsınız"))
    .addSubcommand((options) => options
        .setName("onay-red")
        .setDescription("Ayarlanan Onay & Red Kanalını Sıfırlarsınız")),
}