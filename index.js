const Discord = require('discord.js');
const global = require('./global/global_variable.json');
const client = new Discord.Client();


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`); 
});

client.on('message', msg => {
    if (msg.content === 'ping') {
         msg.reply('Pong!'); 
    } 

    if(msg.content == '!myProfile'){
        msg.reply(msg.author.displayAvatarURL());
    }
});

client.login(global.token);
