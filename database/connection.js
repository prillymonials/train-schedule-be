const sq = require('sequelize');

const db = new sq.Sequelize('mysql://webapps:$5CWwK8@y>b4jtQq@206.189.89.105:3306/train_schedule');

module.exports = db;
