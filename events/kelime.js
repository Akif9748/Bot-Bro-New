const db = require("quick.db")
const fetch = require('node-fetch');
const prefic = "!!"
const kelime = require('rastgelekelime');


exports.basla = async message => {


  const word = kelime() //EKAlojinin modülünden bir kelime.
  message.channel.send("Oyun başladı\n\n" + word) //kelimeyi yazar
  const ilkharf = word.split("")[word.split("").length - 1] //son harfi alır
  db.set(`sonharf_${message.guild.id}`, ilkharf) //son harfi not alır.

};

exports.devamke = async message => {


  if (!db.fetch(`sonharf_${message.guild.id}`)) return message.react("⛔")   //Eğer oyun başlamamışsa başlamaz.

  var nkelime = message.content.replace(prefic, "").toLowerCase() //Mesajdaki kelimeyi çok gerekeceği için tanımladık

  if (nkelime.split("")[0] === db.fetch(`sonharf_${message.guild.id}`)) { //dosyanın içiyle yazdığınız kelimenin son harfi uyuyorsa
    const arama = await fetch("https://sozluk.gov.tr/gts?ara=" + encodeURI(nkelime))
    const veri = await arama.json(); //tdk sitesinden veri alır.
    if (veri.error) {
      message.react("⛔")
      message.reply("Kelime yok. Son harf şuydu, hatırlatayım : " + db.fetch(`sonharf_${message.guild.id}`))
      return
    } //eğer öyle bir kelime yoksa sitede durur. Ama oyun bitmez, yanlış yazmış olabilirsin.

    message.react("🆗") //Doğru ise emoji atar
    const conten = nkelime.split("")[nkelime.split("").length - 1] //son harfi tekrar aldı 
    db.set(`sonharf_${message.guild.id}`, conten) //son harfi yazdı
    db.add(`kelimesayac_${message.guild.id}`, 1)
  } else {
    message.react("⛔")   //yanlışsa yazıyor 
    message.reply("Yanlış! Oyun bitti. Şu ana kadar yazılan doğru kelime : " + db.fetch(`kelimesayac_${message.guild.id}`))
    db.delete(`sonharf_${message.guild.id}`)
    db.delete(`kelimesayac_${message.guild.id}`) //ve oyunu bitiriyor, !!kelimeadı yazınca çalışmayacak.
    return;
  }


};