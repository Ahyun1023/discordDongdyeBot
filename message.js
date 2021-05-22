const Discord = require('discord.js');
const global = require('./global/global_variable.json');
const fetch = require('node-fetch');
const mysql = require('mysql');
const ip = require('ip');

const connection = mysql.createConnection({
    host : "localhost",
    port : 3306,
    user : "root",
    password : global.dbpw,
    database : "discord"
});

function commandEvent(msg) {
    // 프로필
    if (msg.content === '!myProfile') {
        msg.reply(msg.author.displayAvatarURL());
    }

    /*else if(msg.content === '!!!'){
        // 길드 내에 있는 멤버 이름 출력
        console.log(Array.from(msg.member.guild.members));
    }*/

    else if(msg.content === global.prefix + 'nowTime'){
        let week = ['일', '월', '화', '수', '목', '금', '토'];
        let nowDate = new Date();
        let year = nowDate.getFullYear();
        let month = nowDate.getMonth() + 1;
        let date = nowDate.getDate();
        let day = nowDate.getDay();

        msg.channel.send(year + "년 " + month + "월 " + date + "일 " + week[day] + "요일 입니다.", {
            tts: true
        })
    }

    else if(msg.content.indexOf(global.prefix + 'weather') != -1){
        if(msg.content.indexOf('-') != -1){
            //msg.content.split('-')로 앞 뒤 나눌 수도 있긴 함
            let city = msg.content.substring(9, msg.content.length);
            let apiURI = "http://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+global.weatherApiKey;

            fetch(apiURI).then(response => response.json())
            .then((result) =>{
                console.log(result);

                if(result.cod != '404' && result.cod != '400'){
                    weatherEvent(msg, result);
                } else {
                    let errMsg = '정확한 도시 이름을 입력해주세요!';
                    searchWeatherFailEvent(msg, errMsg);
                }
            })
        } else {
            let errMsg = '정확한 명령어를 입력해주세요!';
            searchWeatherFailEvent(msg, errMsg);
        }
        
    }

    else if (msg.content === global.prefix + 'help') {
        helpEmbedEvent(msg);
    }

    else if(msg.content === global.prefix + 'clean'){
        msg.delete();
        msg.channel.send('메시지 삭제됨');
    }

    // 이미지 첨부
    else if (msg.content === global.prefix + 'swordCow') {
        let attachment = new Discord.MessageAttachment("./file/image/검문소.png");
        msg.channel.send(`${msg.author}, 당신을 지켜줄...`, attachment);
    } 

    // 외부 사이트 이미지 첨부
    else if (msg.content === global.prefix + 'rip') {
        let attachment = new Discord.MessageAttachment("https://i.imgur.com/w3duR07.png");
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

function weatherEvent(msg, result){
    const embed = new Discord.MessageEmbed();

    let nowTemp = Math.round(result.main.temp - 273.15),
        nowHumid = result.main.humidity,
        weather = result.weather[0].main,
        wind = result.wind.speed,
        cityName = result.name,
        cloud = result.clouds.all;
        icon = result.weather[0].icon;

    embed.setAuthor(cityName + '의 현재 온도는 ' + nowTemp + '°C 입니다.', 'https://i.imgur.com/7ua6qm7.png', 'https://www.weather.go.kr/w/index.do');
    embed.setThumbnail('http://openweathermap.org/img/w/' + icon + '.png');

    embed.addField('날씨', weather);
    embed.addField('풍속', wind + 'm/s');
    embed.addField('구름', cloud + '%');
    embed.addField('습도', nowHumid + '%');

    embed.setTimestamp();

    embed.setImage('https://i.imgur.com/wSTFkRMs.png');

    embed.setFooter('오늘의 날씨');

    msg.channel.send(embed);
}

function searchWeatherFailEvent(msg, errMsg){
    const embed = new Discord.MessageEmbed();;
    
    embed.setAuthor(errMsg);

    embed.addField('" !weather-[도시영어이름] " 형태로 작성해주세요.', '예시: !weather-daegu, !weather-seoul');

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
    embed.addField('COMMANDS', '!weather');
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