

  const Discord = require("discord.js");

  exports.run = async (client, message, args) => {
    if(!args[0]) return message.channel.send("Yahu kardeş bir şey yazsana beni havada bırakıyorsun.")
    function binaryAgent(str) {
        const bytes = str.split(' ')
        let output = ''
          
        for (let k = 0; k < bytes.length; k++){
            output += String.fromCharCode(parseInt(bytes[k], 2))
        }
        
        return output
      }
      
     message.channel.send(binaryAgent(args.slice(0).join(' ')));
  }
  exports.conf = {
          aliases: ['p', 'pong', 'uptime',],
          permLevel: 0
  };
  exports.help = {
                 name: 'yazı',
                 description: 'Binaryyi yazıya çevirir.',
                 usage: 'yazı 01000001'
   };