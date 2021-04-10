const Discord = require('discord.js');
const global = require('./global/global_variable.json');
const client = new Discord.Client();

const myHook = new Discord.WebhookClient(global.myWebHookId, global.myWebHookToken);

//서버 처음 켜졌을 때
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`); 
});

// 사용자가 특정 메시지를 날렸을 때
client.on('message', msg => {
    if (msg.content === 'ping') {
         msg.reply('Pong!'); 
    } 

    // 프로필
    if(msg.content === '!myProfile'){
        msg.reply(msg.author.displayAvatarURL());
    }

    // 외부 사이트 이미지 첨부
    if(msg.content === '!rip'){
        var attachment = new Discord.MessageAttachment("https://i.imgur.com/w3duR07.png");
        msg.channel.send(`${msg.author},`, attachment);
    }

    // 이미지 첨부
    if(msg.content === '!swordCow'){
        var attachment = new Discord.MessageAttachment("./file/image/검문소.png");
        msg.channel.send(`${msg.author}, 당신을 지켜줄...`, attachment);
    }

    // 파일 첨부
    if(msg.content === '!easyLife'){
        var attachment = new Discord.MessageAttachment("./file/txt/쉽게사는 방법.txt")
        msg.channel.send(`${msg.author}, 당신에게 필요한`, attachment);;
    }

    // 임베드 설명
    if(msg.content === '임베드'){
        const embed = new Discord.MessageEmbed();
        embed.setTitle
        embed.setTitle(0xff0000).setDescription('안녕하세요! 임베드 설명입니다.');
        embed.setDescription('설명!');
        embed.setAuthor('Author', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org');
        embed.setThumbnail('https://i.imgur.com/wSTFkRM.png');
        embed.addField('Regular field title', 'Some value here');
        embed.setTimestamp();
        embed.setImage('https://i.imgur.com/wSTFkRM.png');
        embed.setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');;

        msg.channel.send(embed);
    }
});

// 웹훅을 가져올 때 수행
client.fetchWebhook(global.myWebHookId, global.myWebHookToken)
  .then(webhook => console.log(`${webhook.name} 이름의 웹훅을 가져옵니다`))
  .catch(console.error);

// 길드 멤버가 추가되어 들어왔을 때
client.on('guildMemberAdd', member =>{
    const channel = member.guild.channels.cache.find(ch => ch.name === '유저-로그');
    
    if(!channel) return;

    channel.send(`장난감 서버에 오신 걸 환영합니다, ${member}`);
});

client.login(global.token);
