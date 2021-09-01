const Discord = require("discord.js");
 const Canvacord = require("canvacord");
const { ImageMaker } = require("canvacord");


exports.run = async (client, message, args) => {
 let user = message.mentions.users.first() || message.author;

       

            let trackIMG = `https://i.scdn.co/image/${user.presence.game.assets.largeImage.slice(8)}`;
            let trackURL = `https://open.spotify.com/track/${user.presence.game.syncID}`;
            let trackName = user.presence.activities.details;
            let trackAuthor = user.presence.activities.state;
            let trackAlbum = user.presence.activities.assets.largeText;

            const embed = new Discord.MessageEmbed()
                .setAuthor('Spotify Track Info', 'https://cdn.discordapp.com/emojis/653135129870336031.png?v=1')
                .setColor("GREEN")
                .setThumbnail(trackIMG)
                .addField('Song Name', trackName, true)
                .addField('Album', trackAlbum, true)
                .addField('Author', trackAuthor, false)
                .addField('Listen to Track', `${trackURL}`, false)
                .setFooter(message.member.displayName, message.author.displayAvatarURL())
                .setTimestamp()

            message.channel.send(embed);
      
            message.channel.send('Adam spotify dinlemiyor ki!');
        
};
exports.conf = {
        aliases: ['p', 'pong', 'uptime',],
        permLevel: 0
};
exports.help = {
               name: 'spotify',
               description: 'Spotify bilgi.',
               usage: 'spotify @affan'
 };