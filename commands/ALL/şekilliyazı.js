const figlet = require('figlet');

exports.run = (client, message, args) => {
    if(!args[0]) return message.channel.send('Kelimeyi unuttun, doğru kullanım: !şekilliyazı kelime');

    msg = args.join(" ");

    figlet.text(msg, function (err, data){
        if(err){
            console.log('Birşeyler bozuk');
            console.dir(err);
        }
        if(data.length > 2000) return message.channel.send('Sınır 2000 karakterdir.')

        message.channel.send('```' + data + '```')
    })
  };
   exports.help = {
       name: 'şekilliyazı',
       description: 'Şekilli yazı yazar.',
       usage: 'şekilliyazı ZeYnEpK'
   };
