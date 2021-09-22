const Discord = require("discord.js");
const Canvas = require('canvas');

exports.run = async (client, message, args) => {
    let member = message.mentions.users.first() || message.author
 
    const canvas = Canvas.createCanvas(858,473);
	const context = canvas.getContext('2d');
    
    const background = await Canvas.loadImage('https://cdn.discordapp.com/attachments/832639401136750656/887129808444727326/3131.png');

	context.drawImage(background, 0, 0, canvas.width, canvas.height);

	

    context.strokeRect(0, 0, canvas.width, canvas.height);

	context.font = '40px Arial';

	context.fillStyle = '#000000';

	context.fillText(member.username, 550, 290);

    const avatar = await Canvas.loadImage(member.displayAvatarURL({size: 256, format: "jpg", dynamic: "true"}));
    context.drawImage(avatar, 560, 50, 200, 200);


    	const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'animeisigonulisi.png');

	message.channel.send(attachment);


};


exports.help = {
name: 'oy',
description: 'Ampule basma :).',
usage: 'oy @member'
};
