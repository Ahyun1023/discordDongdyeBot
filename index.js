const Discord = require('discord.js');
const client = new Discord.Client();

const token = '토큰은 너굴맨이 잘 처리해뒀다구~';

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`); 
});

client.on('message', msg => {
    if (msg.content === 'ping') {
         msg.reply('Pong!'); 
    } 
});
client.login(token);
