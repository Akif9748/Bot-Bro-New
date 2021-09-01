const Discord = require("discord.js");
const Canvas = require('canvas');

exports.run = async (client, message, args) => {
    let member = message.mentions.users.first() || message.author
 
    const canvas = Canvas.createCanvas(1000, 1000);
	const context = canvas.getContext('2d');
    
    const background = await Canvas.loadImage('https://cdn.discordapp.com/attachments/832639401136750656/856546348777865256/sq74glXTzusB0dyFJN6E.png');

	context.drawImage(background, 0, 0, canvas.width, canvas.height);

	

    context.strokeRect(0, 0, canvas.width, canvas.height);

	context.font = '75px impact';

	context.fillStyle = '#0B1461';

	context.fillText(member.username, 15, 720);

    const avatar = await Canvas.loadImage(member.displayAvatarURL({size: 256, format: "jpg", dynamic: "true"}));
    context.drawImage(avatar, 650, 125, 256, 256);


    	const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'animeisigonulisi.png');

	message.channel.send(attachment);


};

exports.conf = {
aliases: ['p', 'pong', 'uptime',],
permLevel: 0

};

exports.help = {
name: 'gonul',
description: 'ANİME İŞİ GÖNÜL İŞİ :).',
usage: 'gonul @member'
};