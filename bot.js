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

            /*var imageUrl = embed.image.url;
            var urlCheck = imageUrl.slice(-17);

            let user = client.fetchUser('222047900006481920').then(user => {
                user.send(imageUrl+'\n \n');
            });*/

            //if (urlCheck == 'PokecordSpawn.jpg') {

                let user = client.fetchUser('222047900006481920').then(user => {
                    user.send('https://images.google.com/searchbyimage?image_url='+embed.image.url+'\n \n');
                });

                var request = require('request');
                var cheerio = require('cheerio');

                var google = 'https://www.google.com/searchbyimage';
                var image = embed.image.url;

                var options = {
                    url: google,
                    qs: { image_url: image },
                    headers: { 'user-agent': 'Mozilla/5.0 (X11; Linux i686) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.64 Safari/537.11' }
                };

                function callback(error, response, body) {
                    if (!error && response.statusCode == 200) {
                        var $ = cheerio.load(body);
                        var infoStuff = $("h2").text();
                        $('cite').each(function() {
                            if ($(this).text().substring(0,21) === "https://pokemondb.net") {
                                var parts = $(this).text().split("/");
                                var partWeWant = parts.length - 1;
                                //console.log('p!catch '+parts[partWeWant]);
                                let user = client.fetchUser('222047900006481920').then(user => {
                                    user.send('**p!catch '+parts[partWeWant]+'**\n \n:kissing_heart:\n \n');
                                });
                            }
                        });

                    }
                }

                request(options, callback);

            //}
        }
    }
    if (message.content === "Summon mew!") {
        message.reply('I would if I could :kissing_heart:');
    }

});

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
