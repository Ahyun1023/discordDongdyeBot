const Discord = require('discord.js');
const global = require('./global/global_variable.json');
const messageEventFunc = require('./message.js');
const client = new Discord.Client();

//const myHook = new Discord.WebhookClient(global.myWebHookId, global.myWebHookToken);
// 주문 봇도 별로인 거 같아서 그냥 채널 관리하는 봇으로 변경.

//서버 처음 켜졌을 때
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`); 
});

// 사용자가 특정 메시지를 날렸을 때
client.on('message', msg => {
    messageEventFunc.commandEvent(msg);
    if (msg.content === '!help') {
        messageEventFunc.helpEmbedEvent(msg);
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
