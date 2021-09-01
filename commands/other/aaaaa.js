const Discord = require("discord.js");
const Canvas = require('canvas');


exports.run = async (client, message, args) => {
 var msj = args.join(" ").split(".")
if (!args[0]) return message.channel.send("Resme yazacağım şeyi yaz")  
let member = message.mentions.users.first() || message.author

    const canvas = Canvas.createCanvas(500, 829);
	const context = canvas.getContext('2d');
    const background = await Canvas.loadImage('https://cdn.discordapp.com/attachments/849752244953808906/862433919361482752/yEl0w8AAAAASUVORK5CYII.png');
	context.drawImage(background, 0, 0, canvas.width, canvas.height);
    context.strokeRect(0, 0, canvas.width, canvas.height);

	context.font = '40px impact';
	context.fillStyle = '#FFFFFF';
	context.fillText(member.username, 15, 620);
	//context.fillText("Sosyal üyeleri", 30, 620);
    context.font = "50px impact"
	context.fillStyle = '#0000FF';
	context.fillText(msj[0], 15, 350);

const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'ready.png');

	message.channel.send(attachment);


};

exports.help = {
               name: 'ready',
               description: 'Görsel arama.',
               usage: 'ara istanbul'
 };


 
