const Discord = require('discord.js')
const bot = new Discord.Client()

bot.on('ready', () => {
    console.log('Der Bot ist nun Online!')

    bot.user.setPresence({
        activity: {
            name: ' 👑Max sein Server👑',
            type: 'PLAYING',
        }
    })
})

bot.on('message', message => {
    let parts = message.content.split(" ");

    if(parts[0] == 'help') {
        message.channel.send('**Hier meine Befehle**\n**t!clear**/**t!purge** - Löscht bis zu 100 Nachrichten\n**t!member** - Sagt dir, wieviele Mitglieder der Server hat, auf dem du dich befindest.\n**t!owner** - Sagt dir, wer der die Eigentumsrechte von einem Server hat.\n**t!userinfo <@>** - Damit kannst du dir die Benutzerinfo von dir oder jmd anderes anzeigen lassen')
    }
    else if(parts[0] == 't!clear' || parts[0] == 't!purge') {
        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('Du brauchst die Berechtigung, Nachrichten zu löschen!')
        if(!parts[1]) return message.channel.send('Du musst angeben, wieviele Nachrichten du löschen möchtest!')
        if(isNaN(parts[1])) return message.channel.send('Die Angabe, wieviele Nachrichten du löschen möchtest, muss eine Zahl sein!')
        if(parts[1] > 100) return message.channel.send('Du kannst nicht mehr als 100 Nachrichten löschen!')
        if(parts[1] < 2) return message.channel.send('Du kannst nicht weniger als 2 Nachricht löschen')
        message.channel.bulkDelete(parts[1])
        message.channel.send(`Ich habe erfolgreich **${parts[1]}** Nachrichten gelöscht!`).then(m => m.delete({timeout: 3000}))
    }
    else if(parts[0] == 't!member') {
        message.channel.send(`Der **${message.guild.name}**-Server hat gerade **${message.guild.members.cache.filter(m => m.user.bot).size}** Mitglieder!`)
    }
    else if(parts[0] == 't!owner') {
        message.channel.send(`Der Owner vom **${message.guild.name}**-Server ist **${message.guild.owner.user.tag}**`)
    }
    else if(parts[0] == 't!userinfo') {

        const guild = message.guild
        const usr = message.mentions.users.first() || message.author
        const member = guild.members.cache.get(usr.id)

        const userr = member.user

        const embed = new Discord.MessageEmbed()
        .setColor('69e3e2')
        .setAuthor(`${usr.tag}`, `${usr.displayAvatarURL({dynamic: true})}`)
        .setThumbnail(`${usr.displayAvatarURL({dynamic: true})}`)
        .setDescription(`${usr}'s Informationen`)
        .addField('**Name + ID:**', `${usr.tag}`)
        .addField('**ID:**', `${usr.id}`)
        .addField('**Avatar URL:**', `${usr.displayAvatarURL({dynamic: true})}`)
        .addField('**Nickname (Wenn vorhanden):**', `${member.nickname || `Der Benutzer hat keinen Nickname`}`)
        .addField('**Dem Server gejoined:**', `${member.joinedAt}`)
        .addField('**Discord gejoined**', `${usr.createdAt}`)
        .addField('**Status:**', `${userr.presence.status}`)
        .addField('**Bot:**', `${usr.bot}`)
        .addFields({
            name: '**Rollenmenge:**',
            value: member.roles.cache.size - 1,
        })

        message.channel.send(embed)
    }
    else if(message.content.includes('<@!BOTID>')) {
        const embed = new Discord.MessageEmbed()
        .setColor('ff0000')
        .setTitle('**Was gibts?**')
        .addField('Brauchst du Hilfe?', 'Benutze t!help')
        .addField('Willst du dem Owner eine FA schicken?', `Hier der Name: **${message.guild.owner.user.tag}**`)
        .addField('Brauchst du bei sonst etwas Hilfe?', 'Wende dich an den Owner oder das Team')

        message.channel.send(embed)
    }
})

bot.on('message', async message => {
    let parts = message.content.split(" ");

    if(parts[0].toLowerCase() == 't!buttontest') {
        const embed = new Discord.MessageEmbed()
        .setColor('69e3e2')
        .setTitle('Test')
        .setDescription('Dies ist ein Testembed')

        const greenButton = new MessageButton()
        .setLabel('Grün')
        .setStyle('green')
        .setEmoji('<a:Hakengif:861302881328431165>')
        .setID('green')

        const redButton = new MessageButton()
        .setLabel('Rot')
        .setStyle('red')
        .setEmoji('<a:Hakengif:861302881328431165>')
        .setID('red')

        const blurpleButton = new MessageButton()
        .setLabel('Blau')
        .setStyle('blurple')
        .setEmoji('<a:Hakengif:861302881328431165>')
        .setID('blurple')

        const greyButton = new MessageButton()
        .setLabel('Grau')
        .setStyle('grey')
        .setEmoji('<a:Hakengif:861302881328431165>')
        .setID('grey')

        const urlButton = new MessageButton()
        .setLabel('URL')
        .setStyle('url')
        .setEmoji('<a:Hakengif:861302881328431165>')
        .setURL('https://dsc.gg/hello!')

        const row1 = new MessageActionRow()
        .addComponent(greenButton)
        .addComponent(redButton)
        .addComponent(blurpleButton)

        const row2 = new MessageActionRow()
        .addComponent(greyButton)
        .addComponent(urlButton)

        message.channel.send({
            embed: embed,
            components: [row1, row2]
        })
    }
})

bot.on('clickButton', async (button) => {
    if(button.id === `green`) {
        const embed = new Discord.MessageEmbed()
        .setDescription('Der Knopf mit der grünen Farbe wurde geklickt!')

        button.clicker.member.roles.add('862322528709640262')

        button.message.edit({
            embed: embed
        })
    }
    else if(button.id === 'red') {
        const embed = new Discord.MessageEmbed()
        .setDescription('Der Knopf mit der roten Farbe wurde geklickt!')

        button.clicker.member.roles.remove('862322528709640262')

        button.message.edit({
            embed: embed
        })
    }
    else if(button.id === 'blurple') {
        const embed = new Discord.MessageEmbed()
        .setDescription('Der Knopf mit der blauen Farbe wurde geklickt!')

        button.message.edit({
            embed: embed
        })
    }
    else if(button.id === 'grey') {
        const embed = new Discord.MessageEmbed()
        .setDescription('Der Knopf mit der grauen Farbe wurde geklickt!')

        button.message.edit({
            embed: embed
        })
    }
})

bot.login(process.env.token)