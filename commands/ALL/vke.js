const Discord = require('discord.js')


exports.run = (client, message, args) => {
if (!args[0] || !args[1]) message.reply("Doğru kullanım: !vke boy kilo")

var kilo = Number(args[1])
var boy = Number(args[0])

var sonuc = kilo/(boy/100*boy/100)
if (sonuc < 18.49) {
  message.reply("Vücut kitle endeksiniz: " + sonuc + "\nZayıfsınız. Az fazla yiyin.")
} else if (sonuc > 18.49 && sonuc < 25) {
  message.reply("Vücut kitle endeksiniz: " + sonuc + "\nNormalsiniz. Öyle takılmaya devam.")
} else if (sonuc > 24.99 && sonuc < 30) {
  message.reply("Vücut kitle endeksiniz: " + sonuc + "\nFazla kilolusunuz, sağlığınız için kilo verin.")
} else if (sonuc > 29.99 && sonuc < 40) {
  message.reply("Vücut kitle endeksiniz: " + sonuc + "\nObezitesiniz, sağlığınız için kilo verin.")
} else if (sonuc > 40) {
  message.reply("Vücut kitle endeksiniz: " + sonuc + "\nAşşırı ileri obezsiniz. Az yeyin kilo verin çabuk.")
}

return
};

exports.help = {
    name: 'vke',
    description: 'Vücut kitle endeksi verir.',
    usage: 'vke boy kilo'
};
