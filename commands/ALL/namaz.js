const Discord = require("discord.js");
const axios = require('axios');
exports.run = (client, message, args) => {
    var mesaj =""
    const city = args[0];
    if (!city) return message.channel.send('Şehir adı girmelisiniz.');
    axios.get(`https://api.collectapi.com/pray/all?data.city=${city.toLowerCase()}`, {
        headers: {
            "content-type": "application/json",
            "authorization": "apikey 1pHbemnN6LjPR6UnIYgwu0:3Fi6aBZPIFndOl10RH5Iyw"
        }
    }).then(res => {
        res.data.result.forEach(sala=>{
            mesaj += `${sala["vakit"]}: ${sala["saat"]}\n`
        })

        message.channel.send(mesaj);
    }).catch(err => {
        message.channel.send('Bir sorun ortaya çıktı. Komutu doğru kullandığınızdan emin olun.');
        console.log(err);
    });

};

exports.help = {
    name: 'namaz',
    description: 'İller için namaz vakitleri.',
    usage: 'namaz istanbul'
};