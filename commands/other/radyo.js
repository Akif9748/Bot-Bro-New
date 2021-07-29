const Discord = require("discord.js");





const radio = {
    "number1": "http://20723.live.streamtheworld.com/NUMBER1FM_SC?type=.mp3",
    "powerturk": "http://listen.powerapp.com.tr/powerturk/mpeg/icecast.audio?/;stream.nsv",
    "power": "http://listen.powerapp.com.tr/powerfm/mpeg/icecast.audio?/;stream.nsv",
    "metro": "http://17703.live.streamtheworld.com/METRO_FM_SC?type=.mp3",
    "fenomen": "http://listen.radyofenomen.com/fenomen/128/icecast.audio?/;stream.nsv",
    "oyunfm": "http://37.247.98.8/stream/30/",
    "fenomenfm": "http://fenomenoriental.listenfenomen.com/fenomenoriental/128/icecast.audio",
    "trt": "http://fenomenoriental.listenfenomen.com/fenomenoriental/128/icecast.audio",
    "yedi": "http://radiotrucker.com/tr/play/11981/radyo-7",
    "alem": "http://radiotrucker.com/tr/play/11981/alem-fm",
    "gonul": "http://radiotrucker.com/tr/play/11981/gonul",
    "slowtr": "http://radyo.dogannet.tv/slowturk ",
    "kral": "http://radiotrucker.com/tr/play/11981/kral-fm",
    "kralpop": "http://radiotrucker.com/tr/play/11981/kral-pop",
    
}



exports.run = (client, message, args) => {

if (!message.member.voice.channel) return message.channel.send('Lütfen bir **odaya gir!**')
        
if (!args) return message.channel.send('Bir **radyo seçin:** **!radyoliste**')

if(!radio[args]) return message.channel.send('Seçtiğiniz radyo listede yok. !radyoliste')

  if (message.member.voice.channel.join()
        .then(connection => {
            const dispatcher = connection.play(radio[args]);
            return message.channel.send(`**${args}** FM çalıyorum. :radio: :radio:`);
        }));

 




  


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







