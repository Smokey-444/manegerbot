const Discord = require('discord.js')
const bot = new Discord.Client()

bot.on('ready', () => {
    console.log('Der Bot ist nun Online!')

    bot.user.setPresence({
        activity: {
            name: 'auf 👑Max sein Server👑',
            type: 'PLAYING',
        }
    })
})

ot.on('message', async message => {
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
    else if(parts[0].toLowerCase() == `t!rrtest`) {
        let sendMessage = await message.channel.send('Reagiere mit \:Nike: um die 【👨】┃Verifiziert┃Rolle zu bekommen!')
        sendMessage.react('emojiName')
    }

})

bot.on('messageReactionAdd', async (reaction, user, channel) => {
    if(reaction.message.partial) await reaction.message.fetch();
    if(reaction.partial) await reaction.fetch();

    if(user.bot) return;
    if(!reaction.message.guild) return;

    if(reaction.message.channel.id === '856916241011703869') {
        if(reaction.emoji.name === '490e1b5de5924518bd81ae37c3059f13') {
            reaction.message.guild.members.cache.get(user.id).roles.add('856916240475488270')
        }
    }
})

bot.on('messageReactionRemove', async (reaction, user, channel) => {
    if(reaction.message.partial) await reaction.message.fetch();
    if(reaction.partial) await reaction.fetch();

    if(user.bot) return;
    if(!reaction.message.guild) return;

    if(reaction.message.channel.id === '856916241011703869') {
        if(reaction.emoji.name === '490e1b5de5924518bd81ae37c3059f13') {
            reaction.message.guild.members.cache.get(user.id).roles.remove('856916240475488270')
        }
    }
})


bot.login(process.env.token)