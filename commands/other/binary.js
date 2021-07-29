

  const Discord = require("discord.js");

exports.run = async (client, message, args) => {
if(!args[0]) return message.channel.send("Yahu kardeş bir şey yazsana beni havada bırakıyorsun.")
    message.channel.send(`${args.slice(0).join(' ').split('ç').join('c').split('ı').join('i').split('ş').join("s").split('ı').join('i').split('ğ').join('g').split('İ').join('i').split('Ç').join('C').split('Ş').join("S").split('Ğ').join('G')}`.split('').map((char) => '00'.concat(char.charCodeAt(0).toString(2)).slice(-8)).join(' '));
}
exports.conf = {
        aliases: ['p', 'pong', 'uptime',],
        permLevel: 0
};
exports.help = {
               name: 'binary',
               description: 'Binary kodu yapar.',
               usage: 'binary deneme'
 };