const randomPuppy = require('random-puppy');
const Discord = require('discord.js');



exports.run = async (client, message, args) => {
    const subReddits = ["dankmeme", "meme", "memes",]
    const random = subReddits[Math.floor(Math.random() * subReddits.length)]

    const img = await randomPuppy(random);

    const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setImage(img)
    .setTitle(`Sana özel. Yer: r/${random}`)
    .setURL(`https://reddit.com/r/${random}`)

    message.channel.send(embed);
    

  
};
exports.conf = {
    aliases: ['p', 'pong', 'uptime',],
    permLevel: 0
};
exports.help = {
    name: 'meme',
    description: 'İnternet şakası yapar!',
    usage: 'meme'
};