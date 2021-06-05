const Discord = require('discord.js');
const global = require('./global/global_variable.json');
const messageModule = require('./message.js');
const client = new Discord.Client();

//서버 처음 켜졌을 때
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`); 
});

// 사용자가 특정 메시지를 날렸을 때
client.on('message', msg => {
    if(msg.content.indexOf('!') == 0){
        messageModule.commandEvent(msg);
    } else {
        if(msg.content.indexOf('ㅅㅂ') == 0){
         //비속어 사용 시 필터링
         msg.delete();

        const embed = new Discord.MessageEmbed();
        embed.setTitle('비속어는 필터링됩니다.');
        embed.setDescription('바르고 고운 말을 사용합시다.');
        
        msg.channel.send(embed);
        }
    }
});


// 웹훅을 가져올 때 수행
client.fetchWebhook(global.myWebHookId, global.myWebHookToken)
  /*.then(webhook => console.log(`${webhook.name}`))
  .catch(console.error);*/

// 길드 멤버가 추가되어 들어왔을 때
client.on('guildMemberAdd', member =>{
    const channel = member.guild.channels.cache.find(ch => ch.name === '유저-로그');
    
    if(!channel) return;

    channel.send(`장난감 서버에 오신 걸 환영합니다, ${member}`);
});

client.login(global.token);
