const db = require("quick.db")
module.exports = message => {
    let xpekle = Math.floor(Math.random() * 7) + 8;
    db.add(`xp_${message.author.id}_${message.guild.id}`, xpekle)
    if (db.fetch(`xp_${message.author.id}_${message.guild.id}`) > 300) {
        db.add(`seviye_${message.author.id}_${message.guild.id}`, 1)
        db.delete(`xp_${message.author.id}_${message.guild.id}`)
    };
}