const { Client, GatewayIntentBits, Partials, Collection, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ModalBuilder, TextInputStyle, TextInputBuilder } = require("discord.js");
const { Guilds, GuildMembers, GuildMessages } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember } = Partials;
const config = require('./config.json');
const db = require('croxydb');

const client = new Client({ 
    intents: [Guilds, GuildMembers, GuildMessages],
    partials: [User, Message, GuildMember, ThreadMember]
});

client.config = require("./config.json");
client.commands = new Collection();
client.subCommands = new Collection();
client.events = new Collection();

const { loadEvents } = require("./Handlers/eventHandler");
loadEvents(client);

client.on('interactionCreate', async (interaction) => {
    if (interaction.isButton()) {
        if (interaction.customId === 'basvuru') {
            const modal = new ModalBuilder()
            .setTitle('Başvuru Yap')
            .setCustomId('basvuru_yap')
    
            const isimYasComponent = new TextInputBuilder()
            .setCustomId('yetkili_isim_yas')
            .setLabel("İsminiz ve Yaşınız Nedir?")
            .setMinLength(2)
            .setMaxLength(25)
            .setRequired(true)
            .setPlaceholder('Kaan 18')
            .setStyle(TextInputStyle.Short)
    
            const aktiflikComponent = new TextInputBuilder()
            .setCustomId('yetkili_aktiflik')
            .setLabel("Günde Kaç Saat Aktifsiniz?")
            .setMinLength(1)
            .setMaxLength(2)
            .setStyle(TextInputStyle.Short)
            .setPlaceholder('10')
            .setRequired(true)
    
            const discordZamanComponent = new TextInputBuilder()
            .setCustomId('discord_zaman')
            .setLabel("Discordu Hangi Yıldan Beri Kullanıyorsun?")
            .setMinLength(4)
            .setMaxLength(4)
            .setStyle(TextInputStyle.Short)
            .setPlaceholder(`2018`)
            .setRequired(true)

            const nedenSenComponent = new TextInputBuilder()
            .setCustomId('neden_yetkilisin')
            .setLabel("Neden Yetkili Olmak İstiyorsun?")
            .setMinLength(10)
            .setMaxLength(120)
            .setStyle(TextInputStyle.Paragraph)
            .setPlaceholder(`${interaction.guild.name} sunucusunun yetkilisi olmak istemenizin nedenini bize söyleyin`)
            .setRequired(true)
    
            const rows = [isimYasComponent, aktiflikComponent, discordZamanComponent, nedenSenComponent].map(
                (component) => new ActionRowBuilder().addComponents(component)
            )
    
            modal.addComponents(...rows);
            interaction.showModal(modal);
        }

        // Kabul Et ve Reddet Butonları
        if (interaction.customId === 'staff_kabulet') {
            const yetkiliRol = await db.get(`basvuruyetkili.${interaction.guild.id}`);
            if (!yetkiliRol) {
                    return interaction.reply({
                        content: "Önce verilecek rolü ekleyin! (**`/ekle verilece-rol [Rol]`**)"
                });
            };
            const logKanalı = await db.get(`basvurulog.${interaction.guild.id}`)
            if (!logKanalı) {
                    return interaction.reply({
                        content: "Önce log kanalını ayarlayın! (**`/ekle log [Kanal]`**)"
                });
            };
            const getIdFromFooter = interaction.message.embeds[0].footer.text;
            const getMember = await interaction.guild.members.fetch(getIdFromFooter);
            await getMember.roles.add(yetkiliRol).catch((err) => {
                console.error(err)
                return interaction.reply({
                    content: ":x: Kullanıcı için rolü vermeye çalışırken bir hata oluştu!"
                })
            });
            interaction.reply({
                content: `✅ **${getMember.user}** başarıyla yetkili kadromuza katıldı!`
            })
            await getMember.send({
                content: `Hey **${getMember.user.tag}**, Yetkili kadromuza başarıyla kabul edildin!\n🎉 **Tebrik Ederim** 🎉`
            }).catch(() => {
                return interaction.message.reply(':x: Kullanıcıya mesaj göndermeye çalıştım ve bir hata oluştu')
            })
            const newDisabledRow = new ActionRowBuilder()
            .setComponents(
                new ButtonBuilder()
                .setCustomId('staff_kabulet_bitis')
                .setDisabled()
                .setStyle(ButtonStyle.Success)
                .setLabel('Kabul Et')
            )
            .addComponents(
                new ButtonBuilder()
                .setCustomId('yetkili_reddet_bitis')
                .setDisabled()
                .setStyle(ButtonStyle.Danger)
                .setLabel('Reddet')
            )
            interaction.message.edit({ components: [newDisabledRow] });
            const logKanalId = await db.get(`basvurulog.${interaction.guild.id}`);
            const logKanal = interaction.guild.channels.cache.get(logKanalId);
            if (!logKanal) return interaction.reply({ content: "Log Kanalı Ayarlı Değil!", ephemeral: true });
			const kabulyedi = new EmbedBuilder()
                .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() })
                .addFields(
                    {
                        name: "Kabul Edilen Şanslı Kişi:",
                        value: `${getMember.user}`
                    },
                    {
                        name: "Kabul Eden Yetkili Sorumlusu:",
                        value: `${interaction.user}`
                    },
                )
				.setColor("#66ff00")
                .setThumbnail(interaction.user.displayAvatarURL())
			logKanal.send({
              embeds: [kabulyedi]
            })
        }
        if (interaction.customId === 'yetkili_reddet') {
            const logKanalı = await db.get(`basvurulog.${interaction.guild.id}`)
            if (!logKanalı) {
                    return interaction.reply({
                        content: "Önce log kanalını ayarlayın! (**`/ekle log [Kanal]`**)"
                });
            };
            const getIdFromFooter = interaction.message.embeds[0].footer?.text;
            const getMember = await interaction.guild.members.fetch(getIdFromFooter);
            await getMember.send({
                content: `Hey **${getMember.user.tag}**, yetkili başvurun reddedildiği için üzgünüm.`
            }).catch(e => {})
            interaction.reply({
                content: `**${getMember.user}** başarıyla rededildi!`
            })
            const newDisabledRow = new ActionRowBuilder()
            .setComponents(
                new ButtonBuilder()
                .setCustomId('staff_kabulet_bitis')
                .setDisabled()
                .setStyle(ButtonStyle.Success)
                .setLabel('Kabul Et')
            )
            .addComponents(
                new ButtonBuilder()
                .setCustomId('yetkili_reddet_bitis')
                .setDisabled()
                .setStyle(ButtonStyle.Danger)
                .setLabel('Reddet')
            )
            interaction.message.edit({ components: [newDisabledRow] });
            const logKanalId = await db.get(`basvurulog.${interaction.guild.id}`);
            const logKanal = interaction.guild.channels.cache.get(logKanalId);
            if (!logKanal) return interaction.reply({ content: "Log Kanalı Ayarlı Değil!", ephemeral: true });
			const redyedi = new EmbedBuilder()
                .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() })
                .addFields(
                    {
                        name: "Rededilen Bahtsız Kişi:",
                        value: `${getMember.user}`
                    },
                    {
                        name: "Rededen Yetkili Sorumlusu:",
                        value: `${interaction.user}`
                    },
                )
				.setColor("#ff0000")
                .setThumbnail(interaction.user.displayAvatarURL())
			logKanal.send({
              embeds: [redyedi]
            })
        }
    }
    if (interaction.isModalSubmit()) {
        if (interaction.customId === 'basvuru_yap') {
            const yetkiliİsimYas = interaction.fields.getTextInputValue('yetkili_isim_yas');
            const yetkiliAktiflik = interaction.fields.getTextInputValue('yetkili_aktiflik');
            const discordZaman = interaction.fields.getTextInputValue('discord_zaman');
            const nedenSen = interaction.fields.getTextInputValue('neden_yetkilisin');
            if (isNaN(yetkiliAktiflik)) {
                return interaction.reply({
                    content: ":x: Aktiflik Süren **Saat** olmalıdır. Örnek; **10** buradaki 10, 10 saat demektir. Tekrar form gönder!",
                    ephemeral: true
                })
            }
            if (isNaN(discordZaman)) {
                return interaction.reply({
                    content: ":x: Discordu kullanmaya başladığın sene **Sayı** olmalıdır. Örnek; **2018** buradaki 2018, 2018 senesinden beri kullandığını belirtmektedir. Tekrar form gönder!",
                    ephemeral: true
                })
            }
            const onayredKanalId = await db.get(`basvuruonayred.${interaction.guild.id}`);
            const onayredKanal = interaction.guild.channels.cache.get(onayredKanalId);
            if (!onayredKanal) return interaction.reply({ content: "**Onay & Red** Kanalı Ayarlı Değil!", ephemeral: true });
            interaction.reply({
                content: '✅ Yetkili başvurunuz başarıyla gönderildi!',
                ephemeral: true
            })
            const embed = new EmbedBuilder()
            .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() })
            .setColor('Blue')
            .setTimestamp()
            .setFooter({ text: interaction.user.id })
            .setThumbnail(interaction.user.displayAvatarURL())
            .addFields(
                {
                    name: "İsim ve Yaşı:",
                    value: yetkiliİsimYas
                },
                {
                    name: "Aktif Süresi:",
                    value: yetkiliAktiflik
                },
                {
                    name: "Discordu Şu Yıldan Beri Kullanıyor:",
                    value: discordZaman
                },
                {
                    name: "Neden Yetkili Oldoğu:",
                    value: nedenSen
                }
            )
            const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setCustomId('staff_kabulet')
                .setLabel('Kabul Et')
                .setStyle(ButtonStyle.Success)
            )
            .addComponents(
                new ButtonBuilder()
                .setCustomId('yetkili_reddet')
                .setLabel('Reddet')
                .setStyle(ButtonStyle.Danger)
            )
            onayredKanal.send({
                embeds: [embed],
                components: [row]
            })
        }
    }
    })

client.login(client.config.token)
