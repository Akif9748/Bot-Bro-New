
const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');


exports.run = async (client, message, args) => {
    let msj = args.slice(0).join(' ');

        if (!args.length) return message.channel.send('Lütfen videonun **adını** gir..');

      

      const videoFinder = async (query) => {
          const videoResult = await ytSearch(query);
          return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
      } 

      const video = await videoFinder(args.join(' '));

      if(video){
          message.channel.send('Video\'yu buldum :)' + video.url);
      } else {
          message.reply(msj + 'diye bir video yok ki Youtubenin içinde!');
      }

   };
   exports.conf = {
       aliases: ['p', 'pong', 'uptime',],
       permLevel: 0
   };
   exports.help = {
       name: 'ytara',
       description: 'Youtubede video arar.',
       usage: 'ytara videoadı'
   };