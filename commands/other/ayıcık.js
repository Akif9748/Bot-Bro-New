const Discord = require("discord.js");
const Canvas = require('canvas');

exports.run = async (client, message, args) => {
    const hatakodu = args.slice(0).join(' '); 
    const canvas = Canvas.createCanvas(304, 150);
	const context = canvas.getContext('2d');
    
    const background = await Canvas.loadImage('https://cdn.discordapp.com/attachments/827597586940035093/850395834662649866/8mkudb7.png');

	context.drawImage(background, 0, 0, canvas.width, canvas.height);

    context.strokeRect(0, 0, canvas.width, canvas.height);

	context.font = '20px sans-serif';

	context.fillStyle = '#000000';

	context.fillText(hatakodu, 55, 60);

	const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'hata-mesajı.png');

	const bu = await message.channel.send(attachment);


};

exports.conf = {
aliases: ['p', 'pong', 'uptime',],
permLevel: 0

};

exports.help = {
name: 'ayıcık',
description: 'Ayıcığın göbeğine bir şeyler yazar :).',
usage: 'ayıcık bişiler'
};
