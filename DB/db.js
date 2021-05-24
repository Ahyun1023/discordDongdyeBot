var mysql = require('mysql');
var config = require('./dbInfo').local;

module.exports = ()=>{
    return {
        init: ()=>{
            return mysql.createConnection({
                host: config.host,
                port: config.port,
                user: config.user,
                password: config.password,
                database: config.database
            })
        }
    }
};