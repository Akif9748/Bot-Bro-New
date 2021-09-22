const Discord = require('discord.js');
const sa = ["sa", "selamun aleyküm", "selamunaleykum","selamunaleyküm","selamün aleyküm"]

module.exports = (msg) => {

   if(sa.some(word => msg.content.toLowerCase() === word)) {
      msg.reply("Aleyküm Selam")
   }
   if (msg.content.toLowerCase() === "merhaba") {
    msg.reply('Merhaba hoş geldin!.');
  }
    if (msg.content.toLowerCase() === "günaydın" || msg.content.toLowerCase() === "gün aydın"||msg.content.toLowerCase() === "günaydınlar") {
    msg.reply('Sana da günaydın.');
  }
    if (msg.content.toLowerCase() === "iyi geceler" || msg.content.toLowerCase() === "iyi akşamlar") {
    msg.reply('İyi geceleer.');
  }
   if (msg.content.toLowerCase() === "bb" || msg.content.toLowerCase() === "görüşürüz") {
    msg.reply('Hadi kendine iyi baaak, görüşürüz.');
  }
   if (msg.content === "31") {
    msg.reply('SJ çok komik ben gülmek ölmek', {files: ["https://i.hizliresim.com/hmh7dwh.jpg"]});
  }
       if (msg.content.toLowerCase() === "cu") {
    msg.reply('cu çok komik ben gülmek ölmek', {files: ["https://foto.haberler.com/haber/2021/06/17/sj-ne-demek-s-ve-j-hikayesi-nedir-sosyal-14206005_2219_m.jpg"]});
  }
}
