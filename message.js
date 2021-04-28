const Discord = require('discord.js');

function commandEvent(msg) {
    // 프로필
    if (msg.content === '!myProfile') {
        msg.reply(msg.author.displayAvatarURL());
    }

    else if(msg.content === '!!!'){
        // 길드 내에 있는 멤버 이름 출력
        console.log(Array.from(msg.member.guild.members));
    }

    else if(msg.content === '!!'){
            console.log(msg.createdTimestamp);
    }

    else if(msg.content === 'say 123'){
        msg.channel.send("안녕하세요.", {
            tts: true
        })
    }

    else if (msg.content === '!help') {
        helpEmbedEvent(msg);
    }

    // 이미지 첨부
    else if (msg.content === '!swordCow') {
        var attachment = new Discord.MessageAttachment("./file/image/검문소.png");
        msg.channel.send(`${msg.author}, 당신을 지켜줄...`, attachment);
    } 

    // 외부 사이트 이미지 첨부
    else if (msg.content === '!rip') {
        var attachment = new Discord.MessageAttachment("https://i.imgur.com/w3duR07.png");
        msg.channel.send(`${msg.author},`, attachment);
    }

    else {
        exceptionEmbedEvent(msg);
    }
}

function exceptionEmbedEvent(msg){
    const embed = new Discord.MessageEmbed();
    // 링크 이동
    embed.setTitle('존재하지 않는 명령어입니다.');
    embed.setDescription('모든 명령어를 보려면 [!help]를 입력해주세요!');

    // 썸네일 추가
    embed.setThumbnail('https://i.imgur.com/7ua6qm7.png');

    // 시간 출력
    embed.setTimestamp();

    // 하단
    embed.setFooter('Some footer text here', 'https://i.imgur.com/7ua6qm7.png');

    msg.channel.send(embed);
}

function helpEmbedEvent(msg){
    // 임베드 생성
    const embed = new Discord.MessageEmbed();
    // 링크 이동
    embed.setAuthor('안녕하세요! 도움말입니다!', 'https://i.imgur.com/7ua6qm7.png', 'https://github.com/Ahyun1023/discordDongdyeBot');

    embed.setDescription('명령어는 아래에서 볼 수 있습니다.');

    // 썸네일 추가
    embed.setThumbnail('https://i.imgur.com/7ua6qm7.png');

    // 필드 추가
    embed.addField('COMMANDS', '!');
    embed.addField('MUSIC', '!');
    embed.addField('EMOJI', '!');
    embed.addField('GUILD', '!');
    embed.addField('HELP', '!');

    // 시간 출력
    embed.setTimestamp();

    // 이미지 추가
    embed.setImage('https://i.imgur.com/wSTFkRMs.png');

    // 하단
    embed.setFooter('Some footer text here', 'https://i.imgur.com/7ua6qm7.png');

    msg.channel.send(embed);
}

module.exports.commandEvent = commandEvent;
module.exports.helpEmbedEvent = helpEmbedEvent;
module.exports.exceptionEmbedEvent = exceptionEmbedEvent;