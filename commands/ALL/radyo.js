const Discord = require("discord.js");
const fs = require("fs")
const radio = JSON.parse(fs.readFileSync('./radyo.json', 'utf8'))




exports.run = async (client, message, args) => {

if (!message.member.voice.channel) return message.channel.send('Lütfen bir **odaya gir!**')
        
if (!args) return message.channel.send('Bir **radyo seçin:** **!radyoliste**')


if (args[0] === "dur") {
    //message.guild.me.voiceChannel.leave()
} else {
    if(!radio[args[0]]) return message.channel.send('Seçtiğiniz radyo listede yok. !radyoliste')

  const coo = await message.member.voice.channel.join()
  coo.play(args[0])

       
        
    
    }

};
exports.conf = {
    aliases: ['p', 'pong', 'uptime',],
    permLevel: 0
};
exports.help = {
    name: 'radyo',
    description: 'Radyo çalar! Radyo listeleri için !radyoliste yazın.',
    usage: 'radyo 7'
};
