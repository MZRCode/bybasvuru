const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("ekle")
    .setDescription("Başvuru Sistemi")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addSubcommand((options) => options
        .setName("admin")
        .setDescription("Yetkili Sorumlusu Olacak Rolü Etiketleyin!")
      .addRoleOption(options => options
            .setName('rol')
            .setDescription('Yetkili Sorumlusu Olacak Rolü Etiketleyin!')
            .setRequired(true)))
    .addSubcommand((options) => options
        .setName("verilecek-rol")
        .setDescription("Başvurusu Onaylanacak Kişilere Verilecek Rolü Etiketleyin!")
      .addRoleOption(option => option
            .setName('rol')
            .setDescription('Başvurusu Onaylanacak Kişilere Verilecek Rolü Etiketleyin!')
            .setRequired(true)))
    .addSubcommand((options) => options
            .setName("log")
            .setDescription("Kabul Edildi & Red Edildi Mesajlarının Gideceği Kanalı Etiketleyin!")
        .addChannelOption(option => option
              .setName('kanal')
              .setDescription('Kabul Edildi & Red Edildi Mesajlarının Gideceği Kanalı Etiketleyin!')
              .setRequired(true)))
    .addSubcommand((options) => options
            .setName("onay-red")
            .setDescription("Başvuru Formlarının Gideceği Kanalı Etiketleyin!")
        .addChannelOption(option => option
              .setName('kanal')
              .setDescription('Başvuru Formlarının Gideceği Kanalı Etiketleyin!')
              .setRequired(true))),
}