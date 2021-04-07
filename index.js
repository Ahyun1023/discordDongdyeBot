const Discord = require('discord.js');
const global = require('./global/global_variable.json');
const client = new Discord.Client();

const myHook = new Discord.WebhookClient(global.myWebHookId, global.myWebHookToken);

myHook.send('^.^');

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`); 
});

client.on('message', msg => {
    if (msg.content === 'ping') {
         msg.reply('Pong!'); 
    } 

    if(msg.content === '!myProfile'){
        msg.reply(msg.author.displayAvatarURL());
    }

    if(msg.content === '!rip'){
        var attachment = new Discord.MessageAttachment("https://i.imgur.com/w3duR07.png");
        msg.channel.send(`${msg.author},`, attachment);
    }

    if(msg.content === '!swordCow'){
        var attachment = new Discord.MessageAttachment("./file/image/검문소.png");
        msg.channel.send(`${msg.author}, 당신을 지켜줄...`, attachment);
    }

    if(msg.content === '!easyLife'){
        var attachment = new Discord.MessageAttachment("./file/txt/쉽게사는 방법.txt")
        msg.channel.send(`${msg.author}, 당신에게 필요한`, attachment);;
    }

    if(msg.content === '임베드'){
        const embed = new Discord.MessageEmbed().setTitle(0xff0000).setDescription('안녕하세요! 임베드 설명입니다.');
        msg.channel.send(embed);
    }
});

client.on('guildMemberAdd', member =>{
    const channel = member.guild.channels.cache.find(ch => ch.name === '유저-로그');
    
    if(!channel) return;

    channel.send(`장난감 서버에 오신 걸 환영합니다, ${member}`);
});

client.login(global.token);
