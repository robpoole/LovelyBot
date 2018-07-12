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

    if (message.author.username === "Pokécord") {

        if (message.embeds.length > 0) {

            var embed = message.embeds[0];
            let user = client.fetchUser('222047900006481920').then(user => {
                user.send('https://images.google.com/searchbyimage?image_url='+embed.image.url);
            });

            var request = require('request');
            var cheerio = require('cheerio');

            var google = 'https://www.google.com/searchbyimage';
            var image = embed.image.url;

            var options = {
                url: google,
                encoding: 'utf8',
                qs: { image_url: image },
                //headers: { 'user-agent': 'Mozilla/5.0 (X11; Linux i686) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.64 Safari/537.11' }
                headers: { 'User-Agent': 'request' }
            };

            function callback(error, response, body) {
                let user = client.fetchUser('222047900006481920').then(user => {
                    user.send("Callback! :kissing_heart:");
                });
                if (!error && response.statusCode == 200) {
                    //var info = JSON.parse(body);
                    let user = client.fetchUser('222047900006481920').then(user => {
                        user.send("Body! :kissing_heart: ["+body+"]");
                    });
                }
            }

            request(options, callback);

            /*request(options, function (err, res, body) {
                var $ = cheerio.load(html);
                $('span.comhead').each(function(i, element){
                    var a = $(this).prev();
                    console.log(a.text());
                    let user = client.fetchUser('222047900006481920').then(user => {
                        user.send("Cheerio! :kissing_heart: ["+a.text()+"]");
                    });
                });
                callback(error, body);
                let user = client.fetchUser('222047900006481920').then(user => {
                    user.send("Error! :kissing_heart: ["+err+"]");
                    user.send("Response! :kissing_heart: ["+res+"]");
                    user.send("Expanded Response! :kissing_heart: ["+JSON.stringify(res)+"]");
                    user.send("HTML! :kissing_heart: ["+body+"]");
                });
            });*/
        }
    }
    if (message.content === "Summon mew!") {
        message.reply('I would if I could :kissing_heart:');
    }

});

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
