const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log('I am ready!');
});

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
  	if (message.author === "Pokécord") {
  		client.users.get("222047900006481920").sendMessage(message.content);
  	}
	client.users.get("222047900006481920").sendMessage(message.author);
});

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
