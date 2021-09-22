const Discord = require('discord.js')


exports.run = (client, message, args) => {
    const yarıcap = args[0];
    var pi = args[1];
    var acı = args[2];
    var ek = yarıcap * 2
    if (!args[0]) return message.channel.send("Yarıçapı gir!")

    if (!args[1]) {
        var pi = 3;
        
    }

    if (!args[2]) {
        var acı = 360
        var ek = 0
     
    }

    const alan = pi * (yarıcap * yarıcap)

        var çevre = pi * 2 * yarıcap * (acı / 360) + ek;

    
    message.channel.send("Pi (π) = " + pi + "\nAçı = " + acı + "\nYarıçap = " + yarıcap + "\nAlan = " + alan + "\nÇevre = " + çevre );
};

exports.help = {
    name: 'daire',
    description: 'Dairenin alanını ve çevresini verir :).',
    usage: 'daire yarıçap pi açı'
};
