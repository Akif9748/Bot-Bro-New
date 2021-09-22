
const Discord = require('discord.js');

exports.run = (client, message, args) => {
    let member = message.mentions.users.first() || message.author

    let avatar = member.displayAvatarURL({ size: 1024, format: "jpg", dynamic: "true" })


    const embed = new Discord.MessageEmbed()
        .setTitle(`${member.username}`)
        .setImage(avatar)
        .setColor("RANDOM")
    message.channel.send(embed);

};

exports.help = {
    name: 'pp',
    description: 'Sizin ya da ismini yazdığınız kişinin PP sini atar.',
    usage: 'pp @birisi ya da !pp'
};
