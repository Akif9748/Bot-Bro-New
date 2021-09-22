const Discord = require("discord.js");
const fetch = require('node-fetch');

exports.run = async (client, message, args) => {
        if (!args[0]) return message.channel.send("Sorguyu yaz.")
        if (args[0].startsWith("/")) {
                var sayı = args[0].replace("/", "")
                if (Number(sayı) > 11 || Number(sayı) < 1) {
                        message.channel.send(`10'dan fazla arama yapamaz. ${sayı} sayısını azalt. Ben yine de arama yapacağım...`)
                        var sayı = "1"
                        var aramaterimi = message.content.replace("!ara /" + sayı + " ", "")
                } else {
                        var aramaterimi = message.content.replace("!ara /" + sayı + " ", "")
                }
        } else {
                var sayı = "1"
                var aramaterimi = message.content.replace("!ara ", "")
        }
        const arama = await fetch("https://api.codare.fun/gorsel-ara/" + encodeURI(aramaterimi) + "?say%C4%B1=" + sayı)
        const veri = await arama.json();
        var gonder = [];
        veri.forEach(sonuc => {
                gonder.push(sonuc.substring(3));
        })
        console.log(gonder)
        message.channel.send({ files: gonder })
};

exports.help = {
        name: 'ara',
        description: 'Görsel arama. /10 yazarsanız 10 tane arar.',
        usage: 'ara /10 istanbul'
};
 
