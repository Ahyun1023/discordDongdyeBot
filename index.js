const Discord = require('discord.js');
const client = new Discord.Client();
const global = require('./global/global_variable.js');

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`); 
});

client.on('message', msg => {
    if (msg.content === 'ping') {
         msg.reply('Pong!'); 
    } 
});

client.login(global.BOT_TOKEN);
