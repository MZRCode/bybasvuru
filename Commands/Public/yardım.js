const { ChatInputCommandInteraction, SlashCommandBuilder, Client, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("yardım")
    .setDescription("Yardım Menüsünü Gösterir"),
    /**
     * @param {Client} client
     * @param {ChatInputCommandInteraction} interaction 
     */
    execute(interaction, client){
        const embed = new EmbedBuilder()
        .setTitle("Yardım Menüm")
        .addFields([
            {name: "Başvuru Ayarlama Komutlarım", value: `<:DisBook:1114646725576118402> **/gönder**\nBaşvuru Formunu yazılan kanala gönderir.\n\n<:DisBook:1114646725576118402> **/ekle admin [Rol]**\nAdmin eklemek haricinde bot ile alakalı tüm yetkilere sahiptir.\n\n<:DisBook:1114646725576118402> **/ekle verilecek-rol [Rol]**\nAtılan başvuru formu onaylandığında verilecek rolü ayarlarsınız.\n\n<:DisBook:1114646725576118402> **/ekle log [Kanal]**\nOnaylandı & Rededildi mesajlarının gönderileceği kanalı ayarlarsınız.\n\n<:DisBook:1114646725576118402> **/ekle onay-red [Kanal]**\nBaşvuru Formlarının gideceği kanalı ayarlarsınız.`, inline: false},
            {name: "Başvuru Sıfırlama Komutlarım", value: `<:DisBook:1114646725576118402> **/sıfırla admin-rol**\nAyarlanan Admin Rolünü sıfırlar.\n\n<:DisBook:1114646725576118402> **/sıfırla verilecek-rol**\nAyarlanan Verilecek Rolü sıfırlar.\n\n<:DisBook:1114646725576118402> **/sıfırla log**\nAyarlanan Log Kanalını sıfırlar.\n\n<:DisBook:1114646725576118402> **/sıfırla onay-red**\nAyarlanan Onay & Red Kanalını sıfırlar.`, inline: false},
            {name: "Kullanıcı Komutlarım", value: `<:kullanici:1114652011938467930> **/ayarlar**\nAyarlı olan ayarları görürsünüz.\n\n<:kullanici:1114652011938467930> **/yardım**\nYardım menüsünü gösterir\n\n<:kullanici:1114652011938467930> **/ping**\nBotun pingini gösterir\n\n<:kullanici:1114652011938467930> **/invite**\nBotu davet edersiniz ve destek sunucusuna katılabilirsiniz`, inline: true},
        ])
        .setColor("Random")
        interaction.reply({embeds: [embed], ephemeral: true});

    }

}
