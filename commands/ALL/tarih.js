exports.run = (client, message, args) => {
var zaman = new Date();
message.channel.send(zaman.toLocaleString('tr-TR', { timeZone: 'Turkey' }));
};
exports.help = {
name: 'tarih',
description: 'Tarih ve saati yollar.',
usage: 'tarih'
};
