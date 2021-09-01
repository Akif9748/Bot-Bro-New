const fetch = require("node-fetch");
const Discord = require('discord.js');


exports.run = async (client, message, args) => {
    const search = args[0];
    if (!search) return message.channel.send("Aratacak bir şey gir.")


    let version = args[1];
    if (!version) version = `stable`;

    await fetch(`https://djsdocs.sorta.moe/v2/embed?src=${encodeURIComponent(version)}&q=${encodeURIComponent(search)}`)
        .then(async res => {
            const json = await res.json()
            await message.channel.send({ embed: json })
        })
        .then(body => {
            if (body === null) return message.channel.send("**Sonuç yok.**");
        })
        .catch(e => {
            message.channel.send({
                embed: { "color": 0x4D5E94, "author": { "name": "Discord.js Docs (master)", "url": "https://discord.js.org/#/docs/main/master", "icon_url": "https://discord.js.org/favicon.ico" }, "title": "Search results:", "description": "No results." }
            });
        });
  
  
};
exports.conf = {
    aliases: ['p', 'pong', 'uptime',],
    permLevel: 0
};
exports.help = {
    name: 'döküman',
    description: 'Discord.js dökümanlarını gösterir...',
    usage: 'döküman guild'
};