const Discord = require('discord.js')
const translate = require('@iamtraction/google-translate');

exports.run = (client, message, args) => {
  if (!args[0]) return message.channel.send("Giriş dili eksik. Doğru kullanım !çeviri tr Deneme --giriş dili (zorunlu değil)")
  if (!args[1]) return message.channel.send("Cümle eksik. Doğru kullanım !çeviri tr Deneme --giriş dili (zorunlu değil)")
  const msj = args.join(" ")
  if (msj.includes("--")) {
    const cikti = args[0]
    const aa = msj.replace(cikti + " ", "").split("--")
    const cumle = aa[0]
    const girdi = aa[1]
    translate(cumle, { from: girdi, to: cikti }).then(res => {
      message.channel.send(res.text)
    }).catch(err => {
      console.error(err);
    });
  } else {
    const cikti = args[0]
    const cumle = msj.replace(cikti + " ", "")
    translate(cumle, { to: cikti }).then(res => {
      message.channel.send(res.text)
    }).catch(err => {
      console.error(err);
    });
  }
};

exports.help = {
  name: 'çeviri',
  description: 'Google çeviri ile yazdığınız şeyi çevirir. :).',
  usage: 'çeviri çıkışdil cümleniz --girişdili(opsiyonel.)'
};
