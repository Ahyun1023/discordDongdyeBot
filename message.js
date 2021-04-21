const Discord = require('discord.js');

function commandEvent(msg) {
    // 프로필
    if (msg.content === '!myProfile') {
        msg.reply(msg.author.displayAvatarURL());
    }
}

function msgFileEvent(msg){
    // 외부 사이트 이미지 첨부
    if (msg.content === '!rip') {
        var attachment = new Discord.MessageAttachment("https://i.imgur.com/w3duR07.png");
        msg.channel.send(`${msg.author},`, attachment);
    }

    // 이미지 첨부
    if (msg.content === '!swordCow') {
        var attachment = new Discord.MessageAttachment("./file/image/검문소.png");
        msg.channel.send(`${msg.author}, 당신을 지켜줄...`, attachment);
    }
}

function embedEvent(msg){
    // 임베드 생성
    const embed = new Discord.MessageEmbed();
    embed.setTitle('안녕하세요! 도움말입니다.').setDescription('명령어는 아래에서 볼 수 있습니다.');
    embed.setDescription('');

    // 링크 이동
    //embed.setAuthor('안녕하세요! 도움말입니다!', 'https://i.imgur.com/wSTFkRM.png', 'https://github.com/Ahyun1023/discordDongdyeBot');

    // 썸네일 추가
    //embed.setThumbnail('https://i.imgur.com/wSTFkRM.png');

    // 필드 추가
    embed.addField('HELP', '!');

    // 시간 출력
    embed.setTimestamp();

    // 이미지 추가
    embed.setImage('https://i.imgur.com/wSTFkRMs.png');

    // 하단
    embed.setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');

    msg.channel.send(embed);
}

module.exports.commandEvent = commandEvent;
module.exports.msgFileEvent = msgFileEvent;
module.exports.embedEvent = embedEvent;