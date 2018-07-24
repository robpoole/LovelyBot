const Discord = require('discord.js');
const client = new Discord.Client();

client.on('message', message => {
    if (message.content === 'l! help') {
        message.author.sendMessage("Hey there! \n \nThis is what the LovelyBot currently has up for grabs \n \n**8! [your question]**\n    ask the magic 8-ball a question!")
    }
    if (message.content.substring(0, 2) === '8!') {
        var eightBallResponses = [
            'It is certain', 
            'It is decidedly so', 
            'Without a doubt', 
            'Yes - definitely', 
            'You may rely on it', 
            'As I see it, yes', 
            'Most likely', 
            'Outlook good', 
            'Yes', 
            'Signs point to yes', 
            'Reply hazy, try again', 
            'Ask again later', 
            'Better not tell you now', 
            'Cannot predict now', 
            'Concentrate and ask again', 
            'Don\'t count on it', 
            'My reply is no', 
            'My sources say no', 
            'Outlook not so good', 
            'Very doubtful'
        ];
        var randResponse = eightBallResponses[Math.floor(Math.random() * eightBallResponses.length)];
        message.reply(randResponse+' :kissing_heart:');
    }

    // Farm!
    if (message.content === "l!farm") { 
        var lovelyResponses = [
            'Lovely weather we\'re having', 
            'Lovely atmosphere in here', 
            'Lovely night for some vidya games', 
            'Lovely day', 
            'Lovely jubbly'
        ];

        var counter = 30;
        setInterval(function() {
            counter--
            if (counter > 0) {
                var randResponse = lovelyResponses[Math.floor(Math.random() * lovelyResponses.length)];
                message.channel.send(randResponse+' :kissing_heart:')
                .catch(console.error); // add error handling here
            }
        }, 20 * 1000);
    }

    if (message.content.indexOf("ummon mew") > 0) {
        message.reply('I would if I could :kissing_heart:');
    }
    if (message.content === "p!catch mew") {
        message.reply('You wish Jedi! :kissing_heart:');
    }
    var randomNumber = Math.floor(Math.random() * 1000) + 1;
    if (randomNumber == 1000) {
        message.reply("You're the best! :kissing_heart:");
    }

});

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
