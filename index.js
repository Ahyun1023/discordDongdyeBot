const Discord = require('discord.js');
const client = new Discord.Client();

const token = 'ODI4MjExNzczMTQ3ODQwNTIy.YGmSUg.-CfRAbHtMKDdcmLO984JgdJG8Ww';

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`); 
});

client.on('message', msg => {
    if (msg.content === 'ping') {
         msg.reply('Pong!'); 
    } 
});
client.login(token);
