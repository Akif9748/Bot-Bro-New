
const Discord = require('discord.js')


exports.run = (client, message, args) => {
    function ebobEkok(sayi1, sayi2){
        let ebob;
        let ekok;
        let kucukSayi = (sayi1 < sayi2) ? sayi1 : sayi2;
        
        for(let i = kucukSayi; i > 0; i--){
            if((sayi1%i == 0) && (sayi2%i == 0)){
                ebob = i;
                break;
            }
        }
    
        ekok = (sayi1 * sayi2) /ebob;
        message.channel.send("Ebob : " + ebob + "   Ekok : " + ekok)
    }

    ebobEkok(args[0], args[1]);
    
}
    
exports.conf = {
    aliases: ['p', 'pong', 'uptime',],
    permLevel: 0
};
exports.help = {
    name: 'ebobekok',
    description: '2 sayının Ebob ve Ekokunu hesaplar. :).',
    usage: 'ebobekok 15 20'
};
