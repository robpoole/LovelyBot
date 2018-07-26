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

        var counter = 100;
        setInterval(function() {
            counter--
            if (counter > 0) {
                var randResponse = lovelyResponses[Math.floor(Math.random() * lovelyResponses.length)];
                message.channel.send(randResponse+' :kissing_heart:')
                .catch(console.error); // add error handling here
            }
        }, 2 * 1000);
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

    if (message.author.username === "Pokécord") {

        if (message.embeds.length > 0) {

            var embed = message.embeds[0];

            if (embed.image != null) {

                var imageUrl = embed.image.url;
                var urlCheck = imageUrl.slice(-17);
                if (urlCheck == 'PokecordSpawn.jpg') {

                    var Pokemon = {
                        "9555d70640c9a1326fc72d26756160fc": "abra",
                        "92ee550067fd74000f4f4dbfd8c11478": "absol",
                        "06305e68990a599e7929a026f92f27f2": "accelgor",
                        "b720d263436140dec15e906ceb5708af": "aegislash",
                        "6cc64e7920046fcf847e601fef02345b": "aerodactyl",
                        "55b5967944a4fa39626e57315d471d5a": "aggron",
                        "8fc45d60387f8bd05217820f1ba0ea1e": "aipom",
                        "fd1c42e5d3c193269bbf90e96f53fcca": "alakazam",
                        "37925330e6ae1e511bee06447034f537": "alomomola",
                        "aaf455aff5b245334cb4ea7d46bb9600": "altaria",
                        "96a4dda8c6d6e08ca3cb4544d3528638": "amaura",
                        "d37efb1ab2c6ef54b786cc65cdb0f91b": "ambipom",
                        "46717219b010e7de51ec7069e181ebab": "amoonguss",
                        "df307014ab908714bb463a4588b821e2": "ampharos",
                        "2f09ae50ba3e9c26b9ed248a3a948aa7": "anorith",
                        "c5a74de8954f9563edfc8a43659f45ef": "araquanid",
                        "9a51c7b69b8e69fb489c572432fe8234": "arbok",
                        "9d8d628b29b0d33b53e9f728ceb2552e": "arcanine",
                        "77758b03d9c64afb656af22f50ad3acc": "arceus",
                        "159255e705d55e81adfb2105ce7fad16": "archen",
                        "59b59136feda29c254cc1764aa648951": "archeops",
                        "6cd222ce2493c6a9db2c6a75724f561d": "ariados",
                        "dad9d29626c52a10211b22fdf4f0ef8c": "armaldo",
                        "b7f26c3c0a28c7df3a86d442f87ff651": "aromatisse",
                        "7b18df4377c768415813bcb79c361fed": "aron",
                        "dd5c1f3134dafe01d23f7da79be21dfb": "articuno",
                        "a821855e51e44f9f21ef985a650f83aa": "audino",
                        "dce6927fa363ab01263e52560e687ba7": "aurorus",
                        "5564e807f1431affd9aec059ed4d7885": "avalugg",
                        "bec3a89be5db6f6b6eaa5346c901e399": "axew",
                        "ad73d410d58f9d0f2d610ae3b16f8abd": "azelf",
                        "4d45308a88384853904583d999366da6": "azumarill",
                        "e5f0b61cbf7246ec647fda345538b89f": "azurill",
                        "6bdc2678ab5bf5ef1681c7db5f3622ad": "bagon",
                        "0cfe73e012a44c06cc5ad9da20a18fe1": "baltoy",
                        "fd3042efad95692cdcdf8a83cca03c82": "banette",
                        "625c6493c1bd9ff4859228531dbdcf1b": "barbaracle",
                        "60009aa6718fcef2a65bb750c72e8a73": "barboach",
                        "d0b0fb20556ee4e391eb7bc1c28d3937": "basculin",
                        "e40586d6e34eff1bad06827bb2e6298c": "bastiodon",
                        "d0112ebf538246630ba1813a4899b857": "bayleef",
                        "658d1ac6fb38fd68f250ae428b962670": "beartic",
                        "8d4af42e3b23164c0e7058e49883e183": "beautifly",
                        "528a72fa410ed9e7c70b401dff67f7ff": "beedrill",
                        "e5dba8fc647491fec738e9f9b7d52dca": "beheeyem",
                        "d86124f094d325cd3f4e2181aafa0a24": "beldum",
                        "ed1def92849654fc85622a99d4deb3f0": "bellossom",
                        "0d542db2dd8b93f390e6978881650840": "bellsprout",
                        "e2ef01b247517b6bb47811ae9f7bdfca": "bergmite",
                        "28dd9334bfc691efccc45445f7f7098c": "bewear",
                        "a6eb4838dec9431286c56c4a2ab862d5": "bibarel",
                        "f2a6aaaf5cc65c425d218a3a43d87ce0": "bidoof",
                        "a602d00e1d4ebbeae653a8a18a1428bb": "binacle",
                        "76e32e01303218c3e8b67828a3e6f89c": "bisharp",
                        "2cd10e6a436befa79e9662a3b58883e9": "blacephalon",
                        "df9c2061ada5bc07fa8c356ee005d64d": "blastoise",
                        "9c4ccd5e9fc5f0b01a58453f28a46b76": "blaziken",
                        "5fae5eca9279def1cddddc212b8c5d61": "blissey",
                        "554f52071473e9d0a4936b5fd6d896d1": "blitzle",
                        "25ef3a9b995d81bb08d660d3f2777604": "boldore",
                        "fdd8bbf0e21cc35e8d0a9ef26e41ffc5": "bonsly",
                        "63d7e61309a516a1fb897536999de1d3": "bouffalant",
                        "5565f46a064d51f7765c31a63eec9d18": "bounsweet",
                        "6b023746b5ff04044f94a5cbe773b9f8": "braixen",
                        "68b3dcc77018a2d638a51ac89dd0f94b": "braviary",
                        "40f188960754ba3042d770de54b8e510": "breloom",
                        "4c73e07e610d844e9d1e70022bcb54e1": "brionne",
                        "b8af5cc7fd966f8f2a1bf6c4f1494ae1": "bronzong",
                        "9e2d8b7ab8abdd79b60a80f51fc635fb": "bronzor",
                        "1caeafe4293daa5aeb958db8362abd9f": "bruxish",
                        "c1b314e4f45ecbb13e671c8e69227230": "budew",
                        "d19747ffd10d1375f4ec796a2850778e": "buizel",
                        "44e02cb8cdad2530f8ffd4b2196137b2": "bulbasaur",
                        "997c589d96efacefef67e3ca6d5e8772": "buneary",
                        "f0204458a2d45a0c65dcef33d8aa7dcf": "bunnelby",
                        "45113ea70f685521de87d3abe084d4d7": "burmy",
                        "11fdf2d62393f105263c81f6c11002d5": "butterfree",
                        "77f66c2fc0ef87874dfee3fe41ff50f3": "buzzwole",
                        "84f665815606c235bcad3cd714412394": "cacnea",
                        "c8acf7b01cfdc798390c9004eb992522": "cacturne",
                        "e73c36dc058fdc37ca58746c673151e6": "camerupt",
                        "f5747e6054278bd3101b4fa63e74d16c": "carbink",
                        "736d6814134c431c7d723026cb183bff": "carnivine",
                        "f2de67438406cde60a49f7028eb4cbe0": "carracosta",
                        "1aa26be01894181bdf6722d98a3c3330": "carvanha",
                        "db2ec4eb3d8487d8bec7a78e24ffcf43": "cascoon",
                        "1b8bbbbc007d3d9be4a56ac7cb88fc46": "castform",
                        "f629107391098c7e88db68813b53a341": "caterpie",
                        "67468eac03da66ab8b2bf5f1d585ccdc": "celebi",
                        "a9952610cc127ed700ae094c27dc9a5c": "celesteela",
                        "9da17f94da217d531baa5352d8f301c3": "chandelure",
                        "72573b715696b0c50c886d190e23fe14": "chansey",
                        "082062ec0160932ad283c3af103ca59e": "charizard",
                        "7a6a59e8b67f332cdd698c05c90991c1": "charjabug",
                        "90eabac42a6f6da72fc224451df8d2c3": "charmander",
                        "659fe9f45db671aed14c115f07d0ca4b": "charmeleon",
                        "299c4c790416321367b633f5d96351b9": "chatot",
                        "2f0125164a3342aca231040e9064af7e": "cherrim",
                        "c362ed2d929d58a6c25e237117dccd2f": "cherubi",
                        "dee5a015981a2a23a6665bf167f2efd2": "chesnaught",
                        "93a940e685534834b8a1e56c422713a6": "chespin",
                        "2131371ad2165ce4261fd01379cdba84": "chikorita",
                        "8c2423d74cad4bb293272273ea079249": "chimchar",
                        "65e575784ed609f1a085304f511cb7ad": "chimecho",
                        "a1ec19d18ca1a08266d78b2099754483": "chinchou",
                        "a7caa793174a346b2d76add1ccb200b3": "chingling",
                        "518479101f7ade2c4fd64c50011cedb5": "cinccino",
                        "128027bc032980abb611250f661237d0": "clamperl",
                        "3b3ec469550bf795e6321b9f412d7811": "clauncher",
                        "b11190590a28c296a9d92c40988f7711": "clawitzer",
                        "968acd6f740ec817f0efeaf1264387ab": "claydol",
                        "95f5c56d906309d97ce5b7d4bc3f870e": "clefable",
                        "71ad05cc563ec4c2a6f6fd31476bdb0b": "clefairy",
                        "66adc8172cf72b748fe97a529dd28b6b": "cleffa",
                        "55beeb26416e7c416cb08e3f9dd9d029": "cloyster",
                        "d9a9e1934e9b53684cd87a9016d8d125": "cobalion",
                        "c40ad4df2be3d22da30468e116116b08": "cofagrigus",
                        "4accfdddf60050135ad2216b8c2643e7": "combee",
                        "1fd8bae7f673c730118431268fd61087": "combusken",
                        "8cbf41aa1821ea1023e50d73a638f967": "comfey",
                        "a75e5bf118cc6f6c2fa596cc2871ba1a": "conkeldurr",
                        "3c2a0f8c2b8d6be50ad196ffba729633": "corphish",
                        "16a8ff156094dce5d82da0f96d282ee2": "corsola",
                        "0b2df0ccb9124bdba58cc4646baec755": "cosmoem",
                        "635b13afbd9197dc3aad5bb7981556b5": "cosmog",
                        "b0ede65eb5563faba308381d70c93ec5": "cottonee",
                        "f50f483a6214dfb39c85bfebe268f4ef": "crabominable",
                        "e0707e813240d57dfd7889170be54336": "crabrawler",
                        "36d12e49a72bb9074ec3c6f61631b367": "cradily",
                        "f491c0bd81169531027b40ab7d5f8fcb": "cranidos",
                        "f294e3b919e0d994c6bda6db4c7a9eab": "crawdaunt",
                        "d2933ae9bfd8d5ddd0723d228567573b": "cresselia",
                        "48f1bae108855ec1874569ae2616ff10": "croagunk",
                        "c4e5136c0cdc573797947f721d23c339": "crobat",
                        "75bb7cc768f37a68c4fcb07d0f0e345b": "croconaw",
                        "fc2992718f90a458de1e8447b09e07a5": "crustle",
                        "6f58869e228b5cd45099cb1522c339ec": "cryogonal",
                        "bf08ca44ff118f7ea912f86e46e4aa3a": "cubchoo",
                        "7a678884b899632523e66ff9758f3dcd": "cubone",
                        "607ef4a8804688eaf1c66151ed938f75": "cutiefly",
                        "6e44a6691d5b15a620ac469c410cde17": "cyndaquil",
                        "f1876f556a653c50adb6f47314b0ade2": "darkrai",
                        "13226cf53360444958dec8f3387646e2": "darmanitan",
                        "078428634b692383509e4b2fcf197387": "dartrix",
                        "212fd63c43adfffc014f61a58f1c78e9": "darumaka",
                        "72e5a8ac08b03031f1156364b6ef706c": "decidueye",
                        "04cb91357f41cd64ff1a158184f576c6": "dedenne",
                        "7041eb57400661cd8ad775d23be23db2": "deerling",
                        "8100723f1863ced21aefff35f38a47ca": "deino",
                        "a5b8fa64ecff91e61d5dc7a9eaece6ca": "delcatty",
                        "7c5e024cfc4457b40e02fc7431153423": "delibird",
                        "4925188976386ee5c15d82e7dabfdd72": "delphox",
                        "286edd7dd607e871c38cdc2d130dffde": "deoxys",
                        "8ffdc010e3d40bc817ee7bf8f98613b6": "dewgong",
                        "a4d83a3bb02d58204a8139468ecc2193": "dewott",
                        "2f6582f5f7adc1fa48933f17ad9be555": "dewpider",
                        "6ac759023a25158194f6d275b5a5b732": "dhelmise",
                        "4f85ab889c81f637f54b9603d8e9ae5b": "dialga",
                        "377fe71c1852480bbf6c007cb693787b": "diancie",
                        "7d5cbe11ecb53c2fd4654fc6b97bd693": "diggersby",
                        "71bfd06a3dc5637675abd4e29c4b20dc": "diglett",
                        "4799941b536ac7b63950976713c4d85b": "ditto",
                        "3624fa7e1b5dfd64ecbc4b690a8bda9c": "dodrio",
                        "63f0fd7feac98c7bc2bc15a5f407e1ed": "doduo",
                        "67494fb718917c1306a0e9d2a6acfd25": "donphan",
                        "2162c0f80d1144f1a81842ebebde28ea": "doublade",
                        "73aedb99a001e5951312dbe6a2e1f5da": "dragalge",
                        "b11be97c6a771a2a472bf01f2ce67aee": "dragonair",
                        "fee1c86ef3f1a3a7ba96404054a19b2f": "dragonite",
                        "7e49acd3f35552c09d7bf9d46e85b516": "drampa",
                        "9dfbe55aff1572978798d6776c9870da": "drapion",
                        "fe5ce5b606efb460277c13faa5ea29ba": "dratini",
                        "fc5356f9dcc0a990a4001cd89fc82797": "drifblim",
                        "702f3630d2bdc4cb879068d0e91577f4": "drifloon",
                        "314ddf55c33bd83b5a3dda99ab02bae9": "drilbur",
                        "4518552cdde96f08c1e4be69de26d085": "drowzee",
                        "cfec04daec3c6b0b8496eaaacc2e3459": "druddigon",
                        "153e0198887a0a8b218064bfad4b8cc4": "ducklett",
                        "1d2bd3bc34fba4fe377e764b96f3402b": "dugtrio",
                        "8c50edad7da4e26cb95d31ad94c0739d": "dunsparce",
                        "078f6ba6d38e8b0d7c7b9a11ed188505": "duosion",
                        "8cd4db49a5a6952607217eaf6863a3bf": "durant",
                        "77d500df52b9fb96c561d07b13fd4ba0": "dusclops",
                        "08371f0b7fefe4351b15c571055e68be": "dusknoir",
                        "f3ed63887230454934176e641d2f8653": "duskull",
                        "44b00ac8e6cd83952384cd5549ea4260": "dustox",
                        "557d85fb4d30439343a126094bafe25b": "dwebble",
                        "0502c4e9851afc58e3ba8a08520d2e11": "eelektrik",
                        "a3d814495295cdd5c165620c7c028113": "eelektross",
                        "732c4c0f09aa6b2dc37d36251513b922": "eevee",
                        "471359a7397fe7c03dd45d4a18afb6c3": "ekans",
                        "3195832e51a396f0e7e05aa18c57de93": "electabuzz",
                        "3195832e51a396f0e7e05aa18c57de93": "electabuzz",
                        "05fa9ecb3eebf57313a4b08412c750bd": "electivire",
                        "62917bdf84f16bd617c2a014aa075a33": "electrike",
                        "541e42f0ff38d9ac9a551c45606c45be": "electrode",
                        "c4d90df9a14d3a69e0f57edd0f3f1972": "elekid",
                        "f808761edd1416ecff149d1cd7a41749": "elgyem",
                        "2642799e0c05f07a77c26636bdcca564": "emboar",
                        "a1918e9a03a28f7026144caaabdd6a4b": "emolga",
                        "688d87e4d4b318bd333e92f843718248": "empoleon",
                        "6e39f0773c1aafbfc35e6db5375c6d71": "entei",
                        "bb3a31b115603e88df807e6661891711": "escavalier",
                        "4b31bc0ae979e4a82cec91ffed0dbbcb": "espeon",
                        "747b37a85520d819a283a01330c354c0": "espurr",
                        "3ca42cb0aa7a306817b49cd1adf595b3": "excadrill",
                        "404db83a3dd925f621c6bb1cc827ca41": "exeggcute"
                    };

                    var crypto = require('crypto');
                    var fs = require('fs');
                    var axios = require('axios');
                    axios.get(embed.image.url, {
                        responseType: 'arraybuffer'
                    })
                    .then(function(res) {
                        var image = new Buffer(res.data, 'binary');
                        var hash = crypto.createHash('md5').update(image).digest('hex');
                        let user = client.fetchUser('222047900006481920').then(user => {
                            user.send('**p!catch '+Pokemon[hash]+'** :kissing_heart:');
                        });
                    });

                }
            }
        }
    }

});

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
