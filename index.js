// Discord.js bot
const Discord = require('discord.js');
const client = new Discord.Client();
const cr = require('cr.js');

let clash = new cr.Client();

client.on('ready', () => {
    client.user.setGame('Clash Royale');
});

client.on('message', msg => {
    if (!msg.content.startsWith(process.env.PREFIX) || !msg.guild) return;
    const command = msg.content.split(' ')[0].substr(process.env.PREFIX.length);
    const args = msg.content.split(' ').slice(1).join(' ');
    if (command === 'guide') return msg.channel.send('https://github.com/MPapus/bot-cc-rols#readme');
    else if (command === 'invite') return msg.channel.send(process.env.INVITE);
    else if (command === 'hola') { 
        if (args.length === 0) {
            return msg.channel.send('No heu ingressat cap tag de CR');
        }
        else {
            let playerProfile = clash.getProfile('22RLYPLYC').then(player => console.log(args[0]));
            return msg.channel.send(playerProfile.clanTag);   
        }
    }
});

client.login(process.env.TOKEN);

// Web app (Express + EJS)
const http = require('http');
const express = require('express');
const app = express();

// set the port of our application
// process.env.PORT lets the port be set by Heroku
const port = process.env.PORT || 5000;

// set the view engine to ejs
app.set('view engine', 'ejs');

// make express look in the `public` directory for assets (css/js/img)
app.use(express.static(__dirname + '/public'));

// set the home page route
app.get('/', (request, response) => {
    // ejs render automatically looks in the views folder
    response.render('index');
});

app.listen(port, () => {
    // will echo 'Our app is running on http://localhost:5000 when run locally'
    console.log('Our app is running on http://localhost:' + port);
});

// pings server every 15 minutes to prevent dynos from sleeping
setInterval(() => {
 http.get('http://bot-cc-rols.herokuapp.com');
}, 900000);
