var Discord = require('discord.io');
var auth = require('./auth.json');
var net = require('net')

var socket = new net.Socket();
socket.connect(3000, "localhost", function() {
    console.log("Client: Connected to server");
});

var bot = new Discord.Client({
    token: auth.token,
    autorun: true
});

socket.on("data", function (data) {
    data = JSON.parse(data);
    message = data.response;
    console.log("Response from server: %s", message);
    socket.write(JSON.stringify({ response: "Data recieved" }));

    spongebob_message = '';
    for (var i = 0; i < message.length; i++) {
        if (Math.random() > 0.5) {
            spongebob_message += message.charAt(i).toUpperCase();
        } else {
            spongebob_message += message.charAt(i).toLowerCase();
        }
    }

    bot.sendMessage({
        to: 'general',
        message: spongebob_message 
    });
});

//bot.on('message', function (user, userID, channelID, message, evt) {
//    if (user == 'kpzerg') {
//        spongebob_message = '';
//        for (var i = 0; i < message.length; i++) {
//            if (Math.random() > 0.5) {
//                spongebob_message += message.charAt(i).toUpperCase();
//            } else {
//                spongebob_message += message.charAt(i).toLowerCase();
//            }
//        }
//
//        bot.sendMessage({
//            to: channelID,
//            message: spongebob_message 
//        });
//    }
//});
