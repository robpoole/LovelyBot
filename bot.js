const Discord = require('discord.js');
const client = new Discord.Client();

client.on('guildMemberAdd', member => {
    var discordId = member.id;
    console.log('discord id: '+discordId);

    let role = lovelyGuild.roles.find('name', 'Common');
    var roleId = role.id;
    member.addRole(roleId);

    var request = require('ajax-request');

    request({
        url: 'http://www.robpoole.co.uk/lovely/ajax.php?method=newMember&discordId='+discordId,
        //url: 'http://rp.lovely.com/ajax.php?method=newMember&discordId='+discordId,
        method: 'GET'
    }, function(err, res, body) {

        // Done
        console.log('done');
        
    });
});

function manageRoles()
{
    console.log('manageRoles');
    var request = require('ajax-request');

    request({
        url: 'http://www.robpoole.co.uk/lovely/ajax.php?method=updateRoles',
        //url: 'http://rp.lovely.com/ajax.php?method=updateRoles',
        method: 'GET',
        json: true
    }, function(err, res, body) {

        let lovelyGuild = client.guilds.get("172093104008986624");

        if (typeof lovelyGuild !== 'undefined') {

            console.log('discord id: '+body['discordId']);
            let member = lovelyGuild.members.get(body['discordId']);
            if (typeof member !== 'undefined') {
                for (var key in body['roles']) {
                    console.log(key+' = '+body['roles'][key]);
                    let role = lovelyGuild.roles.find('name', key);
                    var roleId = role.id;
                    console.log('role id: '+roleId);
                    if (body['roles'][key] == 1) {
                        member.addRole(roleId);
                    } else {
                        member.removeRole(roleId);
                    }
                }
            }
        }
        
    });
}

function clanOnline()
{
    console.log('hi');

    // lovely who-online    625721306951843851
    // lovely message       ?
    // rob who-online       626142994663342082
    // rob message          626148378446659619

    //client.channels.get("625721306951843851").send("test...");
    //client.channels.get("626142994663342082").send("test...");

    let channel = client.channels.get("625721306951843851");

    channel.fetchMessages({ limit: 1 }).then(messages => {
        let lastMessage = messages.first();
        console.log(lastMessage);

        if (!lastMessage.author.bot) {
            // The author of the last message wasn't a bot
        }
    })
    .catch(console.error);

    /*var request = require('ajax-request');

    request({
        url: 'http://www.robpoole.co.uk/lovely/ajax.php?method=clanOnline',
        //url: 'http://rp.lovely.com/api.php?user='+message.author.id+'&command='+message.content,
        method: 'GET',
        json: true
    }, function(err, res, body) {
    
        let channel = client.channels.get("626142994663342082");
        console.log(body);

        var theMsg = "";

        if (body.length == 0) {

            theMsg = "No one is online :( \n";

        } else {

            var onlineList = "";

            for (var i = 0; i < body.length; i++) {
                onlineList += "**" + body[i] + "**\n";
            }
            theMsg += onlineList;
        }

        var today = new Date();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

        channel.fetchMessages({around: 626148378446659619, limit: 1})
        .then(msg => {
            const fetchedMsg = msg.first();
            fetchedMsg.edit({ 
                embed: {
                    color: 0xff004e,
                    width: 600,
                    title: "Online Clan Members",
                    description: theMsg,
                    timestamp: new Date(),
                    footer: {
                        icon_url: client.user.avatarURL,
                        text: "Courtesy of LovelyBot"
                    }
                }
            });
        });
        
    });*/
}

client.on("ready", () => {
    var interval = setInterval (function () {
        manageRoles();
        clanOnline();
    }, 1 * 60 * 1000); 
});

client.on('message', message => {

    // Lovely Rank
    if (message.content.substring(0, 2) === 'l!') {

        var request = require('ajax-request');

        request({
            url: 'http://www.robpoole.co.uk/lovely/'+new Date().getTime()+'/api.php?user='+message.author.id+'&command='+message.content,
            //url: 'http://rp.lovely.com/api.php?user='+message.author.id+'&command='+message.content,
            method: 'GET',
            json: true
        }, function(err, res, body) {
        
            message.channel.send({ 
                embed: {
                    color: 0xff004e,
                    width: 600,
                    title: body['title'],
                    description: body['description'],
                    fields: body['fields'],
                    thumbnail: {
                        url: body['img']
                    },
                    timestamp: new Date(),
                    footer: {
                        icon_url: client.user.avatarURL,
                        text: "Courtesy of LovelyBot"
                    }
                }
            });
            
        });

    }

    // Pay respects
    if (message.content === 'f' || message.content === 'F') {
        message.channel.send(message.author.username+" pays respects :pray:").catch(console.error);
    }

    // Yeh Yeet!
    if (message.content === 'y' || message.content === 'Y') {
        message.channel.send(message.author.username+" yah yeets :100: :ok_hand:").catch(console.error);
    }

    // Random act of kindness
    var randomNumber = Math.floor(Math.random() * 1000) + 1;
    if (randomNumber == 1000) {
        message.reply("You're the best! :kissing_heart:");
    }

    // Pokecord assistance
    if (message.author.username === "Pokécord") {

        if (message.embeds.length > 0) {

            var embed = message.embeds[0];

            if (embed.image != null) {

                var imageUrl = embed.image.url;
                var urlCheck = imageUrl.slice(-17);
                if (urlCheck == 'PokecordSpawn.jpg') {

                    var Pokemon = {
                        "765248386bc9b67eed5cd55f175a304d": "abomasnow",
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
                        "404db83a3dd925f621c6bb1cc827ca41": "exeggcute",
                        "5da716f194475bf3b600ec9c5fd271e1": "exeggutor",
                        "3450747c50dc418dcf9a2038c10a6dd2": "exploud",
                        "b333d107bdc3bfe2edd66e415503852e": "farfetchd",
                        "e2a11a47fd22448b4c8b095a77c4dc2f": "fearow",
                        "3c8b96a555baaa08a0d2fdb755325eb2": "feebas",
                        "98ef69a26b3afb8c2fa92e3783fa7ead": "fennekin",
                        "27490fedcd76b5976060f52da62c50ee": "feraligatr",
                        "bd108925144181367b18458cfe788170": "ferroseed",
                        "5e04ef31b709a6618c365105e3a20141": "ferrothorn",
                        "4bd7fc277dac985c15034136181c2ad0": "finneon",
                        "c5bf8f28cdad2bc0bd53e7ed7fea9581": "flaaffy",
                        "b5a3161ad1e54d16daf731f829d52166": "flabebe",
                        "0853ac8ca20d2e35ddb3201be285af4f": "flareon",
                        "686be4ada74527c87bae836f34951bed": "fletchinder",
                        "4ef602d0ecff3fafab22c6aed14b885f": "fletchling",
                        "2e58a80463d058789460a514bf49af6b": "floatzel",
                        "80f3a86043cbe92284036c4a94a58dbf": "floette",
                        "049ba684ebd73e73f09510fba6164dc1": "florges",
                        "0168b70b5a7d0d4858d6cb848957b3ce": "flygon",
                        "8f0683ddecf6cb2bcbc5f86e695e6623": "fomantis",
                        "43591387684c5dbb178ca4b997f3f8f3": "foongus",
                        "d7216b2f412bfec4de3ee091d96abf89": "forretress",
                        "e4383c8fceb73b3faf2c250fb35eedd1": "fraxure",
                        "7ae0b378e15f707528450e55a6f525b4": "frillish",
                        "46d153642145a6cf4fd650bd9abfd928": "froakie",
                        "db1f2ab8451d2c4c0c15008dd0d0716f": "frogadier",
                        "de362d961bbb29ae131c50670192f185": "froslass",
                        "41c94c0830be909a82273ff3ff272f77": "furfrou",
                        "d1e74efcb30f9c8def522fc71095d5bc": "furret",
                        "ab292cd1c1b28e1b2eb411a778439bae": "gabite",
                        "526d82e682f6cd4d8f577fc87ae0ec37": "gallade",
                        "91966c70203ed475652c4e5d2369bc88": "galvantula",
                        "757015628d01753340d47205d8fad3ca": "garbodor",
                        "ac5f9f9169c3772c5fed17434bcdd55d": "garchomp",
                        "5412f323a26d27168a3fdb98069019f8": "gardevoir",
                        "52ce63530eb8687ba9440ec2dd8a3bf9": "gastly",
                        "2927f3d6e8a92db35683e2eac3296587": "gastrodon",
                        "028aca0093560b960bf954e73a167431": "genesect",
                        "af15c9c82b625ba3a3c2ba0b8e762299": "gengar",
                        "fac018d4b96f424db822cb82aebcd7ad": "geodude",
                        "3f87f9579510e92207e103d342b3edcd": "gible",
                        "b870b390d81d48f3157cc30b9c7497ba": "gigalith",
                        "e9b4abaf323ceefb47109fb4bb447a3f": "girafarig",
                        "92e7d49a88cac00b0e4942fdd277cf59": "giratina",
                        "aaaf9ffb25992b6f2600a4edc8571aed": "glaceon",
                        "4a24ac8acd6ab60633f7aa16d844d62e": "glalie",
                        "bb59ffb7bb1497fd0c44c524c8b783f7": "glameow",
                        "463c35992c4a978844e631514a595ef0": "gligar",
                        "f3430f4e696319c6d0bb61653c6010af": "gliscor",
                        "1d9aed066b55178ecf46a0a205b8a1e9": "gloom",
                        "a5b34159e269ae158bbc70527ba81aa7": "gogoat",
                        "080e7243872fbee761fee747bda559e4": "golbat",
                        "698f2e91ca1c512c62f915f8cedeedeb": "goldeen",
                        "c020e3e895b15c79f11b0b87a46e5dcf": "golduck",
                        "f7d1f98ed2d93e6dd040ef0fb3682f26": "golem",
                        "7525e6055a38360f7dbc6cfc63ce5a44": "golett",
                        "84a5daa7d33fc8725f7263b9a303e18c": "golisopod",
                        "c4734f0e9d1f7c33bee0c8f03205cf3f": "golurk",
                        "c8e1978b36d1e6a119b36924334e1c00": "goodra",
                        "76ce06015305361f6ae745fb5bb7fd52": "goomy",
                        "11d264f1543009af6795c21a5f0b49d6": "gorebyss",
                        "82f826d387406725a2777df0fa0ea5e0": "gothita",
                        "1a9002213ad454e21e1ac75764beb238": "gothitelle",
                        "04dba37f65c8b546f134acf54d5d8151": "gothorita",
                        "3d3519423409e5c09b49a220d8e7c97f": "gourgeist",
                        "4bb08568b37d147f632cf8bca17ebbb9": "granbull",
                        "21074bee28fb06fdd9e305b0cef3fa29": "graveler",
                        "b9f6c7740c6b0ab9bedc49dc8b4ab3d8": "greninja",
                        "b4f98f4ad560e310da1f83d401700f92": "grimer",
                        "a3b9816d5169f635e866ff1a95fb34ad": "grotle",
                        "b26baf1958632e345f1ccd4d490cfe9d": "groudon",
                        "b9d641924d1dc50e4c86c06936b383dc": "grovyle",
                        "72d42386f34c272cea0f5db2cdd73f11": "growlithe",
                        "a59eb4a8afb2a16a4cfe76498ec9f128": "grubbin",
                        "0688d5bdc96c59cf5315b321520578bb": "grumpig",
                        "72da6e5d3fc910019c55628379b00336": "gulpin",
                        "d970acf8955a5454f3766458391f3074": "gumshoos",
                        "b899ed29370ddffb677f7e6a1e82cc4e": "gurdurr",
                        "7f72679849fde5ea8cad9e3ee69f5fd5": "guzzlord",
                        "ace57a59c66ad46bd225e00df19e2287": "gyarados",
                        "7e1d0caebb842d1145bd86cdf13fc2a4": "hakamo-o",
                        "0d9c0d7a70b4ae63812c1c4aa78a4039": "happiny",
                        "63314fc9cfe70acf60b976504ed6963c": "hariyama",
                        "7f667c23a800fc14c93facc00b5b8b9e": "haunter",
                        "e0e5cb8ba4f310758a41ac9d35c7afcc": "hawlucha",
                        "1591d84bbd00a37f8dc64a192020b9de": "haxorus",
                        "36b861b1c28223e227d1bd8160934e21": "heatmor",
                        "b77fa48cacdfb64aa28b39cd8e40b256": "heatran",
                        "99b38a6ac159fc81e2a98de087028765": "heliolisk",
                        "40635f44c259f99a530291e534b659ea": "helioptile",
                        "7c3f72fa72cbef5124107cbd7b403f64": "heracross",
                        "55553416fc8fa2e1e1a3f7caba7e42d2": "herdier",
                        "f96590d170f14ceb3393c39acc9e934e": "hippopotas",
                        "05b1fd09bb622470231d3ce18377ce78": "hippowdon",
                        "10b413017b06d04e37a07879e52e6e8c": "hitmonchan",
                        "b467c9f7f9ba14845cc57aec0787c85c": "hitmonlee",
                        "b869a2c585a5b44868624abab2744800": "hitmontop",
                        "fd6b6c5b936a8e46ba9b9f041c6e7d11": "ho-oh",
                        "52d6448354b842ebd7624af992117f19": "honchkrow",
                        "59cfe493414923da4d1a6b5a6210a70c": "honedge",
                        "81ec8c22dd65e90a9c7d89dc29972602": "hoopa",
                        "070da87335d2c879e00d261c4f106550": "hoothoot",
                        "35d0f7bfdf22890a0f2965bacf82eb25": "hoppip",
                        "3d9133deb527515f249450c8efdf5bc2": "horsea",
                        "49ef675666cdc4c2b76a5d67229b834b": "houndoom",
                        "8bea53b002217a4a623883a343df71c6": "houndour",
                        "032f051bb29aea55c6759f852d965df3": "huntail",
                        "1687fb364720603de09d063fc830b679": "hydreigon",
                        "ac44e54547e8b76fb1fb0a3a361c0dd1": "hypno",
                        "9a01062dfc0746178e28307e37cd3569": "igglybuff",
                        "a2806b26f5da9c4b78493a54783bc11b": "illumise",
                        "33ed422a47c551dfad2d940db08ff5d4": "incineroar",
                        "1b84d9bfa7204ae3119c60beeff0e509": "infernape",
                        "70c8bbd5d669edf8b6ea5231db362ba5": "inkay",
                        "83e1a962286d2229e1da05054c26bd24": "ivysaur",
                        "c41ae3365c204d2723f8ff166d81fa6b": "jangmo-o",
                        "be103fa06f3933f9f954c4d2f6a87523": "jellicent",
                        "602bb71371ea63c9c3f0574517e27396": "jigglypuff",
                        "ceecb62ad8919a25a460279b05d37b4a": "jirachi",
                        "cefbb348c051a6bb3bee501b0724e3d0": "jolteon",
                        "5b14e81022d8aab37b25373f95500ce4": "joltik",
                        "d21aa3e8a9562fe2c5428aeac17d6b99": "jumpluff",
                        "2e88dff4ee663da32c917eb87a660560": "jynx",
                        "d2a40b79beef49a0acc9ebd35dc9a472": "kabuto",
                        "28fa2ef45ebfa78984f11e0b37f456d8": "kabutops",
                        "b0f1401374f429c9c65d6219edaa063d": "kadabra",
                        "02e6ef1f5bd28779029957d3bdc26bd0": "kakuna",
                        "f9c7c683e94dd6b275f804440767402a": "kangaskhan",
                        "d6ca583cfade5c3346b5fbf6554e9d9c": "karrablast",
                        "6cda790b39686b7516d22a149ac0680d": "kartana",
                        "2a796f0308f2c2b9ee6cfe77d5d99487": "kecleon",
                        "52f40bb7ed869a9f228f4c3e04e95306": "keldeo",
                        "e2803ce2c5d130a7f1484391073c6c0d": "kingdra",
                        "b507526da058dfc8e6cf434335dc7243": "kingler",
                        "7a638ba1c45fad7bc8b918d3ec085e57": "kirlia",
                        "3a478d413d2a7d27e828de937f493a02": "klang",
                        "3915037f3d701483fd97868f5a5e391c": "klefki",
                        "ea9a5b324bab8bc7a8118dd1b242efaf": "klink",
                        "11687fe657f24184b5af2ead1f83624c": "klinklang",
                        "a9d8d5c7bf438af422ac291da11eac0d": "koffing",
                        "1314e9c17009d4825a7155debf6da6c9": "komala",
                        "c0d49983d9450343fcd308be7feb95b8": "kommo-o",
                        "d548e0fd82375bea5f166c0c2983a305": "krabby",
                        "4752b89863cd0f5ca5c8ef573f804016": "kricketot",
                        "ea413b31dbdd41c1a66d21dff60378c7": "kricketune",
                        "d744e764df53a0e2d92b1ea79fccfa14": "krokorok",
                        "a86c873dd979aadda25458872acaa518": "krookodile",
                        "93f099227bdf066ac6b5a441da67ec6a": "kyogre",
                        "2d447dc4d3b4aa33918e48347d297ea6": "kyurem",
                        "49a2a9ff787577d516ea44f1577f59c0": "lairon",
                        "a9e4f90003a2e8c6af57cbab1da29959": "lampent",
                        "4f62f8c63d1f9ddfd84ae599df631a06": "landorus",
                        "feabcd6c9f498c84a3727adf0e7636f7": "lanturn",
                        "3b36f4f1d2753c819e5b5c6bfb86094d": "lapras",
                        "ebb5d1b371e80c1918aabef72d2ffa7f": "larvesta",
                        "244624d8763ac42a423bbe0b31af3d32": "larvitar",
                        "47b0476759b419a900ce85f5c61df518": "latias",
                        "84d51581b1bd18f9fe8cdd6eb03986e2": "latios",
                        "50fb440c777370aa4bda6a0e0bb6019c": "leafeon",
                        "2919282cd46d6647ea244464bea615cc": "leavanny",
                        "868da0743460f5c04d355fa408f4b9a8": "ledian",
                        "24475fb510d8b05df2a6c5aacfe5cea1": "ledyba",
                        "39d2bfc689ecd42f094f8ccc47d10e1f": "lickilicky",
                        "42b2a73b6578d243882f042af10f1c95": "lickitung",
                        "4e6be71630b19f358e0e9ed0548c3fb5": "liepard",
                        "7684891b2b0f0cf25a4bbc38649022c4": "lileep",
                        "4be02b238d9f4ede9a39e72310ac8014": "lilligant",
                        "26ce71bf772d84794aa75eb253b4dcdf": "lillipup",
                        "af777ddfcd13239d660f596cea0aea0e": "linoone",
                        "053d281f2a2135bdf4a6f9218f54c380": "litleo",
                        "63edd834471ef4d052506aace0acd48a": "litten",
                        "d447a16c1769d957e6dfa86bf7ef3464": "litwick",
                        "db55f9f331a4ca55262f221eb89912ca": "lombre",
                        "c044b6abf1da1cf0026e4a47098d8cc4": "lopunny",
                        "335d4ccb2abd9462608a5afda1164e44": "lotad",
                        "7e18c9203504ea74cc9b0dd3ea103604": "loudred",
                        "46766c5cf3274cf91233c0ce743411ef": "lucario",
                        "b71c594bd374479d521995be0c9267ca": "ludicolo",
                        "08777872151733c0f4c46aa0f1ac1b4a": "lugia",
                        "c4019db7812f1ae7cb4dfca32bc48fb6": "lumineon",
                        "66e240a327c8c5115e518fea65f786e2": "lunala",
                        "78b3d03de5b48ffb54f28f1c42d758e3": "lunatone",
                        "50691e638b6fbd2f3e4fb4d8b53563e4": "lurantis",
                        "ebde0b0f7dbd196cae5bfb99b292dd46": "luvdisc",
                        "53e0e229653f629fa850e50500184acd": "luxio",
                        "fa8560b4b10dff1bbd154af03092ae8b": "luxray",
                        "0c513775a582427df547ae588c846450": "lycanroc",
                        "5dfdb4bb9a2abbaaff853f90f3eedea2": "machamp",
                        "c2dd10297fffc734ff213b228d4f6071": "machoke",
                        "b7e871473d062973a6a47e6204335fb5": "machop",
                        "a8ed2cf01eb7c9ea82c92229ef65ac54": "magby",
                        "cb40b31509d59e462fcbf902c67953d9": "magcargo",
                        "19bafae915928cb523e3c979fa344736": "magearna",
                        "2afb2a03bb2866d5efb59bb7992d246f": "magikarp",
                        "0dfaba2a75a5da08fafb883f128dddd7": "magmar",
                        "3d9b4654b954838cc989ca52d912e064": "magmortar",
                        "60cffeb7288f6eabe6b9dcb533d7571e": "magnemite",
                        "d81d0c83fe7e5cccd0c2dbf1271498de": "magneton",
                        "08a1625c2ddd4b95b0a2f23a57fd2559": "magnezone",
                        "1e858e896889b4b6fe32edc86607d3ce": "makuhita",
                        "a05205ee89e6c58c721b450e95e38e9a": "malamar",
                        "c79de116d143ccaae756e1df7b6d76b3": "mamoswine",
                        "ff973ecd43587cad35429759a9bbd5f4": "manaphy",
                        "5b4b59ebc802d2566c1ae3e8106c0d07": "mandibuzz",
                        "86a3f1176f984fbf1f740371b8c6628c": "manectric",
                        "1122feb6d42475c643bc81365f21b730": "mankey",
                        "eae335a1f0dc95c43fcf81f49af3c124": "mantine",
                        "71d5ebd34fe551defcaaac18547b9977": "mantyke",
                        "f7c68f78b569d13743223aa6a185b944": "maractus",
                        "0ac75fcb1c40ceae6aaaf3d6b8562664": "mareanie",
                        "a4c94a489abc4d137684d682defae7f3": "mareep",
                        "eaf1910ba9dd15fdd3421279da8efe08": "marill",
                        "45fcb539c9f12ca7e190b6549410b90b": "marowak",
                        "a21ef04400918596d8a55345691359b5": "marshadow",
                        "45edc742d64baab670830b4c90c43688": "marshtomp",
                        "650e48e9bbdb44ad6338ac14162b032d": "masquerain",
                        "5ee255549c9364be64c522e1f4339fa9": "mawile",
                        "098729fc4581119cc8faaf0bc9ee403b": "medicham",
                        "b2386c906b5cd5bdb21fcef8746f7ebf": "meditite",
                        "e8a7a4551e15c76bcced147e420dd267": "meganium",
                        "20192be1de2b00b0ae77f8c8191c63bd": "meloetta",
                        "fda715a91a9be05d53729a6373f4afae": "meowstic",
                        "d65962f6ee506f1216f36ff76c7e8d28": "meowth",
                        "c52886d4e706fd95cd723ccb0abf3192": "mesprit",
                        "cea6a6f09ff194a9c910b7f126e25100": "metagross",
                        "1c7f8e70207a44e3ec93a4e3d1f8e89f": "metang",
                        "ea6afe04fc7da4b4b7de850c0eff902b": "metapod",
                        "de4b431f91597a895618f05077628bcc": "mew",
                        "e542751ec0838afa2f1efb5d5820ec56": "mewtwo",
                        "308463a4f98476dfe50bd951dda7f062": "mienfoo",
                        "1503d5b58570183f7447a0fd9ff17884": "mienshao",
                        "439efb6b9e38008c3c9b15ec0505728a": "mightyena",
                        "8e4f01e42b635cb96f94c13b13cd88a5": "milotic",
                        "dcded8296f7e86688705100acced7c6b": "miltank",
                        "80bb7c5a91c84661666651b1a8d39558": "mime jr.",
                        "25ed206f38e477e30e32ff515f4ff615": "mimikyu",
                        "722d50b7d6de92135f1694f0f76bfd5b": "minccino",
                        "d90663e30abc5d9ce0ee6c5c6b3c25f2": "minior",
                        "d0aae8ad99c5867f864e71a8c269b9e4": "minun",
                        "15614c6f7167693f959daf45d942e456": "misdreavus",
                        "64a8d4810beed551f9b64d7dc3d9dba9": "mismagius",
                        "b230c0fbb37cb5e65a8a708c34b46058": "moltres",
                        "9271345342e94b7a3e8e20efed927ae6": "monferno",
                        "23c89b3c5e721d31b87848bdc138e217": "morelull",
                        "354a0178b2bcb86d8c787ee508ca8f29": "mothim",
                        "28ac51863618de888f0eba090f7dec1b": "mr. mime",
                        "e0b176719230b42800514c31a03801c4": "mudbray",
                        "871d38b121a4f1ced689837d5edcb042": "mudkip",
                        "43f75134d8fd6b56591ad13863d8f955": "mudsdale",
                        "8d3353cc15b1174c1d69b46d73b42a11": "muk",
                        "03a47e060c0c38e0b72bac78ddd27ee3": "munchlax",
                        "979fc8ac49db980a1a8f3f0707c2b1f9": "munna",
                        "af9eecba5f2741ff0a0ded05a0bce5c7": "murkrow",
                        "c7a9be725c12910b37b72de05fda27f6": "musharna",
                        "86dfa1d23dacb61ed602388127c1ca55": "naganadel",
                        "44eaae4c91acbbd8a24800180c1971a3": "natu",
                        "600368fdba701317550fdfb16b543a06": "necrozma",
                        "6703e27a6f79c815657bdc88e8e1d7e7": "nidoking",
                        "5e526290da7859d31b2d07e551a06394": "nidoqueen",
                        "c28ff00c22c02fab65ecf36b31dc2c3d": "nidoran♀",
                        "5725b5b356fb78b0c862c82ad00d3347": "nidoran♂",
                        "f3f4db14cb4cb07a5375238eefa493d9": "nidorina",
                        "ac0c44d1f3605ae4c0e801d814739d3e": "nidorino",
                        "2b567998efc1e07bc6ea847b57d828e9": "nihilego",
                        "9c523eac5a1b22a32f897e305b84dc02": "nincada",
                        "c751725585d65e517ca9d267efe938a9": "ninetales",
                        "c151b14cfa974b642c2d42502aae3cf4": "ninjask",
                        "0701fca1652a58f3b7ed4218ab15bd03": "noctowl",
                        "e84ba33d4cc9de629ec4e907196ade97": "noibat",
                        "9de30bec3e6fd1d36c08610ef72180d2": "noivern",
                        "007f7582aff1e7125075799a98b6d18a": "nosepass",
                        "c35bf6a294f55fb9bff162cda1d32e32": "numel",
                        "d27043e67bd387771dbe3a43f92808fd": "nuzleaf",
                        "6336c105f73a3df561a5bd8327d54f91": "octillery",
                        "afb7c274e3ed9c8066642ec7d9be4449": "oddish",
                        "888c57cdb7ede5b806be8f0947679b47": "omanyte",
                        "70621931a6d7477dbb4113125f3aab9d": "omastar",
                        "d16f103e83bfa48c3ad670256e6dbfad": "onix",
                        "f4239b0c60c569af49704b9945e55cb9": "oranguru",
                        "d809818c14264915807903f9efd18832": "oricorio",
                        "ec134064ea3d7a8b45f5b2f6ace4d10a": "oshawott",
                        "734208e3a4d1aeba4ab933a82c4c026c": "pachirisu",
                        "eed963182792f05d179e3633a12f0e0b": "palkia",
                        "67156f2cafaf050d3b1123c470b27202": "palossand",
                        "dbdc81eb1eeff6b3fb8d872336f79451": "palpitoad",
                        "f8d32861e860a2f9fe6ddc768465ff28": "pancham",
                        "100ed2f78e61936cd63e3af0272d1400": "pangoro",
                        "b0f5c38b12e5ebeeed409eeefcaae720": "panpour",
                        "0414342e4b54c9454a1569dc8aba0cde": "pansage",
                        "35e55741538064a8fe7bda18e82f7a28": "pansear",
                        "84dddffc55e0354ae1675fbe04b70fc0": "paras",
                        "4e21a81e810a5663adb246646e30b393": "parasect",
                        "33385e76ceb619909173244fd01df79a": "passimian",
                        "8a7be2316c03d2efaf9316afd28ce7cf": "patrat",
                        "5e38ef032c8826a3287b8506a5708f37": "pawniard",
                        "026f3349bfa520acd99ec5c31b306498": "pelipper",
                        "0fde0b16a6c762b9e4dc070302316663": "persian",
                        "6c5b8962cc0449f20be7bdcc1c473e5d": "petilil",
                        "693f60afbf73347939ab816b2ed014b8": "phanpy",
                        "06679728159a8a2608478543f85e1b6b": "phantump",
                        "e6e38ff65d543e1e78fb3c5feb53afca": "pheromosa",
                        "669f5279bf6e57ad10da3e75e3cefdb6": "phione",
                        "e645c291fef0d7efb8d2accedf117ad4": "pichu",
                        "25412474f42d8b25ef1c6e36022f165c": "pidgeot",
                        "29c0cbc3e7fa6d96eee11595589c2df7": "pidgeotto",
                        "d487d244c28bf3b05a2a939618d42156": "pidgey",
                        "3d540efc76bfcb7574667c0ce334566b": "pidove",
                        "daeb20f16f5a44b55ddca00931af2fc5": "pignite",
                        "0a820a5246cec5293a186339e648730f": "pikachu",
                        "cc866bf72d53483db4822ea75df92af3": "pikipek",
                        "097115849225c81e6338328ea1b9fa0b": "piloswine",
                        "31f34d5d49a7844423ce1171aafbd991": "pineco",
                        "b15a74a59ec73e5ccc8e0ccea087df41": "pinsir",
                        "06305e9d1088fba8b491354d9907e47b": "piplup",
                        "51b0e8b7780d04b32db8fc857a57bf1f": "plusle",
                        "a081970a444392dd71bb562e1b5f1854": "poipole",
                        "160f81854e5e92d3ee3d76d7261a3b77": "politoed",
                        "252ed99b0c8c01af90e56bc8526cf949": "poliwag",
                        "b53138d826dbfa1ec41612536cf55ba9": "poliwhirl",
                        "4c854e7b18f91704503843c8994fd807": "poliwrath",
                        "ec6cd619269cf4eff9b7e81cc9891ade": "ponyta",
                        "1d280bbb6137fdbcad12ce9d2cf7df19": "poochyena",
                        "50c3e411d1ca6b7fd62ef522f6119ba0": "popplio",
                        "70b9310d2b2c6f806225c9fdc0ae77b9": "porygon",
                        "5470f7f7bc9d9ba95f60200d2c5727b2": "porygon-z",
                        "763ed11cff96e5bf775941e8ece8bdc5": "porygon2",
                        "efb865e6f2bbb04143b935c7717722a2": "primarina",
                        "66e08deb2602f4f04887ceb8e79c0bbb": "primeape",
                        "37e4d4b7bb5e434ffe311c75b882be61": "prinplup",
                        "025a302d9e10806ceb9cc4a0068e53b1": "probopass",
                        "ab51ee178fe8c6518c1acc1add7515a5": "psyduck",
                        "06cd48decd028949c1387f45619f1b1c": "pumpkaboo",
                        "c97765e17e6780c917bda8ac1ceb8d7b": "pupitar",
                        "626e983203f0ee91d83ea86883daaf3e": "purrloin",
                        "23bd0511d61fdbc27e7935b26421adb7": "purugly",
                        "665621d5fe66f4d66ac212120ae8b6e7": "pyroar",
                        "04c3734728c1285aa9f773d929fbe3b4": "pyukumuku",
                        "fd610ac6db6b656031f95cedd303b751": "quagsire",
                        "69e4c7db0de26ac1458775415ef2dc9b": "quilava",
                        "e18c5860f3d30a9c7c41151b728117cb": "quilladin",
                        "364dff760ad3dba702f08fa11e5d9362": "qwilfish",
                        "ebd437512b705f962bee7508643dc126": "raichu",
                        "7e2ca5e4554c69ea884b69f051594503": "raikou",
                        "4355e4a712a449cefd19133995006cde": "ralts",
                        "ff26f6ab1d3fe609f52ec0a158916fce": "rampardos",
                        "83c00c0028437f98015848a5bed4c76f": "rapidash",
                        "0895cf0b1f66e64c891151dd48290c28": "raticate",
                        "a4bbe0ef788c5c2f7db3e7626e800ab4": "rattata",
                        "d874e3be950f096e66c41ca5c2dd64a9": "rayquaza",
                        "1d7edf757f009a0f0adba98f5e7fc2a8": "regice",
                        "5aaf61619852fa1a33f774b2d1a9d055": "regigigas",
                        "710d03257fbde442576c4216b4641c76": "regirock",
                        "84ce6a2025cc1a28d4d45e7521d936c6": "registeel",
                        "9caf029e8be6d18dbb45335dd235d571": "relicanth",
                        "26ab332e7ee610d222f8d6f89b1faa7f": "remoraid",
                        "ef4913374f59aafe0c9f1ce3c7e48958": "reshiram",
                        "0031bb1e6e32eee973c6d202e68636a9": "reuniclus",
                        "560503efecb82a34da0442b4e644aa11": "rhydon",
                        "d243298ee8c89e20df0341eacfbff956": "rhyhorn",
                        "5d93d73d8a30dedd65767beef7c0a34c": "rhyperior",
                        "55ffbe62b4dfa9537d1d68f5d12bb0f0": "ribombee",
                        "571054c708f631ec24c72d6295171566": "riolu",
                        "1080ebcda1f2ae3956b37de94c4f1eae": "rockruff",
                        "95391391b44fb5d840eab425c0a643da": "roggenrola",
                        "23baadd6207a8d789b77eb04c3a0de18": "roselia",
                        "03dcf57bcbcf61c41021fd7e35bc1708": "roserade",
                        "b524013a0a280575b70643053b07ab0c": "rotom",
                        "54f773fa110bee3e689635661cfeaacd": "rowlet",
                        "dda5926cab376eb703c555d9b8bc8c6b": "rufflet",
                        "e58352a0380494d235ae41f3ea6e7bf2": "sableye",
                        "9843d8dab6da16cc6d9d847241a42c9b": "salamence",
                        "9f300b1472db2f1465e2f300e8e47185": "salandit",
                        "84972201741c883d43f7dc35161cec44": "salazzle",
                        "f3953f1861df0b0608d212c2671ce7d0": "samurott",
                        "69becd6d48d80439c349671d91c118ce": "sandile",
                        "4c929b31feef2c5b8ec7ac35be7d74c7": "sandshrew",
                        "4a6bc8cb99cb4e351a71af003fd3b01e": "sandslash",
                        "07850881702eb34c880893db5641a10c": "sandygast",
                        "c0cb46cd74ff5940d6f9c9a8028005d9": "sawk",
                        "4701520cf6c0c4757950aada7d7bddb7": "sawsbuck",
                        "a0b2bc875c23f8fac456fc9c9024fd32": "scatterbug",
                        "cc4b37da5e787cbe796996523ecf9ee4": "sceptile",
                        "c5fbce46683188aa194579c61bbf6bdd": "scizor",
                        "63a57f5aca31f6a6a0efd04c35ab1b93": "scolipede",
                        "29ac922276ad7c4f27cdc0a356f83dcc": "scrafty",
                        "2ae8b546b42881dfe5ba214a5b1a9433": "scraggy",
                        "749c0e4fed42f79864bbb7443fe43152": "scyther",
                        "ab47b3f650bfef15d4c122b2a9e2aacf": "seadra",
                        "17d85c95b88edc903c398b916c76a850": "seaking",
                        "0e9ee2d72718bc897dbdd12498980f43": "sealeo",
                        "fe56aac1d31f657476a49468d8515662": "seedot",
                        "95a2247030c77788faa5ea6ebbf51148": "seel",
                        "09fd654f33bfc53606c23f48bbab843d": "seismitoad",
                        "e7c8e62c66bbfd26a3b3eba36fda30dc": "sentret",
                        "f012db78c7893f289a3a436eead01892": "serperior",
                        "0c71d8844dd005e4733c9c69b28bce34": "servine",
                        "bbd8f93e144a9d143b356fa99e355ae0": "seviper",
                        "d0d91c42fed71d66a1e88091fdc0e1a7": "sewaddle",
                        "0a1b7556fc77e1d14cf3a0f7ccdace9f": "sharpedo",
                        "ea42460b99472934b6b9337b6c54903b": "shaymin",
                        "488d3bdc368a2e9133ce56a9117b7100": "shedinja",
                        "4d8b1bdd237da6e0d64709b4bec4d622": "shelgon",
                        "50b8077a3b66c48acaf2e382b52bdcce": "shellder",
                        "b20a5ce6ea0bfef18da45ce6337649ec": "shellos",
                        "008ce418d6ae72be574170d71517b1e1": "shelmet",
                        "13360efa249d4c6ef5a91a2a6de99729": "shieldon",
                        "d53880bd3ede294852d6daec0430eb7d": "shiftry",
                        "189da81a68d4ef524349ee009d2c13cb": "shiinotic",
                        "26e91d3d27a74254b13c0e9e3b49252d": "shinx",
                        "a3b310151a1bb2897ee1775f6543f76b": "shroomish",
                        "10b7b9eddc429319b6b080d8febef4fa": "shuckle",
                        "de4ba7d8630b0068be6a600e7870f035": "shuppet",
                        "507baba689bbda25dfc05e831be15f81": "sigilyph",
                        "03df5644a3a079ee842f5f016e8c9e5e": "silcoon",
                        "539f3344661ee7081841d6644d9df336": "silvally",
                        "5eaea50aa2e14563596aa8c337584c14": "simipour",
                        "793dab5813f1acbf6f4a4a7041d44c1f": "simisage",
                        "36f464d6a087609978d65006afba7a98": "simisear",
                        "389fdc2a00194ecfde63f42f7e901031": "skarmory",
                        "3f8be510bd0c6498e50c1f9af929c0ab": "skiddo",
                        "5bda79ff267d51c2c0a40294cd151286": "skiploom",
                        "82ca6ffbfa08fd164187792228db412d": "skitty",
                        "181681f85a18aac425163face7d1fde0": "skorupi",
                        "275202af6b029e240224b0c432716384": "skrelp",
                        "3376e1e151a225f74a4cc93bbbb3410d": "skuntank",
                        "b6fe4d56a79c4ab97557e0ae17a34e40": "slaking",
                        "904fdebd00045a563fc4b078b63d27e5": "slakoth",
                        "5ff924f33094619122519f608836d0c0": "sliggoo",
                        "26482749e7bb62531f34d23fc3c87532": "slowbro",
                        "67f38eaebc14d19655a9ffc4c7da4cca": "slowking",
                        "1fe7cf829f40a4b5a7dc2afcc576eb88": "slowpoke",
                        "cda41cdd0ba3937d6db71b640e2dc5b0": "slugma",
                        "efea75a32f823bcb7dcf70b43ba90b32": "slurpuff",
                        "aeddd7a3de8fc7f76afa44a3348287e9": "smeargle",
                        "9586aecf64777e7e9a33a724aa46c46b": "smoochum",
                        "13ff4952c7449773d47c543c5df09d81": "sneasel",
                        "44fa4b90f6e03b949ea10905a197c29b": "snivy",
                        "c43d5c88f640431b4f6fa7e7c167dfee": "snorlax",
                        "730308c1a740fec0e812cedcb4f8921b": "snorunt",
                        "59f373f11d3caba06cfb198d0ff0571e": "snover",
                        "567b1d553000cda26854fcab9ab97b5b": "snubbull",
                        "6590ed14eb22df3d357a112fc978cbe4": "solgaleo",
                        "2bb5fa41a59dcdefbd454659e111672c": "solosis",
                        "fed6770825f8611fb3265ece89741d83": "solrock",
                        "368735b8ba76570d7cbd5b45f1fda426": "spearow",
                        "0602b6fd81d2ab0fa217ab96f9ba91b4": "spewpa",
                        "51391434acb3b0a2dd82d7d2c9ae64da": "spheal",
                        "f1e69efd8b51e3b90f2e7d3ccf6ea201": "spinarak",
                        "65e61555c05dc66ed8780a7854cf4deb": "spinda",
                        "ed21656cd9f5f8c04ce5b0f91939af4f": "spiritomb",
                        "5faa416a68763b919996ee485ee77dea": "spoink",
                        "f0ae718da720357f22e9f8cc48433314": "spritzee",
                        "ef87d59af47057913436b993f75d49e9": "squirtle",
                        "6a70906220f54ba7e2cf3390ef2dd139": "stakataka",
                        "f28092f08c4dac404a71db5406608451": "stantler",
                        "4528e21d7eb6c338395929f4b6516f7d": "staraptor",
                        "8d4cb1c16940be6b877d6db1e15cde58": "staravia",
                        "074d89331a346064a173cfc9867beb33": "starly",
                        "a4e1de739fdabd62a7c30dc9fc1c1e5c": "starmie",
                        "3b364fbf8ddf8e3e21a27061a76e2561": "staryu",
                        "7d30c7082d6fe1c63e21d03ed7d2f819": "steelix",
                        "cdf11ed5601a529b526cf3fdfe051ac3": "steenee",
                        "2199b3b74f31439b59278d93c2cf7eed": "stoutland",
                        "590445b656eeb6275a79f5d396582cc0": "stufful",
                        "9a62e5b6190e429c5a8fd00b3bd5931a": "stunfisk",
                        "c41a9a012fbb5b420f511e18b76970ee": "stunky",
                        "1d4c6d93c698852b01b8a62d91e9064b": "sudowoodo",
                        "e859983e48ce9e1ee4a6444d6797022b": "suicune",
                        "c490473a1b9a0bdf5a3d35d42cbc163a": "sunflora",
                        "a870204e40358e2b103994e746831bad": "sunkern",
                        "38ead9ab5c28609bc68acba230ed327a": "surskit",
                        "f394a7b93d32510a57c24c5c901f8141": "swablu",
                        "3366da42fff9d41ed9d12e0ba9512597": "swadloon",
                        "576deddade4b3d235cf9e3210e619b27": "swalot",
                        "04b2acb9a238d7d275ebbb5b3a1dafb7": "swampert",
                        "c1f878b8ec68521b81ec9c8d76fecb8d": "swanna",
                        "597406282491442be175e079e73f3b4b": "swellow",
                        "3fa316c6970eafa4d235caca550baa45": "swinub",
                        "242f92d6a5f90437dbeff466c82fcf16": "swirlix",
                        "7f9de669f7ee3fd106d3cc6ccc1152f3": "swoobat",
                        "ae89f2cb2b4d82e69ac593795ab60e31": "sylveon",
                        "59b58d357bbfdb11a656f78c061076c5": "taillow",
                        "321233bc751daa5dca816ad923463672": "talonflame",
                        "9e66a85ab4f55d2e4de134d93ae4eee8": "tangela",
                        "3724200f178af0b48a0bd8d5d06fe7a7": "tangrowth",
                        "01c796c65b453ac9234a17172e273e57": "tapu bulu",
                        "901a6f37431f3b092ebbfe8e6ed5e3ff": "tapu fini",
                        "186764370816df558ea4c1a40b384047": "tapu koko",
                        "d589f74fe6dc4908ef1f3c0972190885": "tapu lele",
                        "399514c14af9cb528c3735476642b5fe": "tauros",
                        "916c13bf9fc098000b1ed517e946e90b": "teddiursa",
                        "9c8b538fd695fcb8fc381ad246a1bc43": "tentacool",
                        "312346bee9b78979c0a36e27e2faab80": "tentacruel",
                        "56650c9d608ad79e8b176b7be9f45c16": "tepig",
                        "9ba74429c5334da942be69f70d909323": "terrakion",
                        "399118398561126e98c441235d5c9345": "throh",
                        "d2ada55c32063e53f8b63aebbc0e98d0": "thundurus",
                        "3839fd8bca0f53475d652c2d24a7a90f": "timburr",
                        "fd0119cca7208271e26c4c41850eb5cb": "tirtouga",
                        "72d29c3f498d24035ffdfd80849ff9b6": "togedemaru",
                        "2a03a2a3ff4fa9bc159fd9ff5911952d": "togekiss",
                        "3e4529711e623daa4f7089c9def7bd5e": "togepi",
                        "027862796045257c98a4444f4906fc82": "togetic",
                        "33f29a4f5a5551dc8737b8e52a335da0": "torchic",
                        "008d4233ad34fc5d9e056b7fdd3b8ebc": "torkoal",
                        "022ac16dc752b8d8a47001700c3001bd": "tornadus",
                        "8e989ce9b3853e87baab5b9a45e76541": "torracat",
                        "ec8edc8217f0e854e235b0d1d3603003": "torterra",
                        "94cd12c336af50cc251c825f121c4edf": "totodile",
                        "71ab58a19b8a5d75d6fa85b888777c1a": "toucannon",
                        "5f843d7a6d53ba62437ebbb19495ba97": "toxapex",
                        "426b0acfc95c7e16997c7d2262ea8ed4": "toxicroak",
                        "b0cdd0ca5c9ceb4c1fc82c7e3d620546": "tranquill",
                        "e87141e9a4f554acc1d1e3eb0101e7b8": "trapinch",
                        "7e611449d7e4e67df7a02826c8952159": "treecko",
                        "27153325708e08a794ae0901cffcfc13": "trevenant",
                        "891cdf13be06c310412abcf538bfcdfa": "tropius",
                        "f38c9bec27e8f66bef320480e50ae68a": "trubbish",
                        "4f081458a5e024122a143c9d99e75502": "trumbeak",
                        "7647c1f802055fc28b2df8cf0e40104d": "tsareena",
                        "9f4037716b6355bdd9d15bf299974b07": "turtonator",
                        "a4209d025ecdfb54d2b58a83fd12d61d": "turtwig",
                        "32fe54186286aa7199d446f26f1f6a80": "tympole",
                        "9196ec40da9cc21f1366ab6452f5d55a": "tynamo",
                        "97c384ed01f406605fd1f34dfdbaaa40": "type: null",
                        "e8aa343ff1bc3502f7d8f887fb3eef3e": "typhlosion",
                        "cc6336f3a5416d11dda6c0ddbac988e3": "tyranitar",
                        "dc865f390ae823ff962cb4392f326245": "tyrantrum",
                        "e3989932d9f8ab431161dfb785e594ef": "tyrogue",
                        "3c5f283b58ca8fb8a9378c4ab8469f84": "tyrunt",
                        "614388003537f5919acc8f515c7dce37": "umbreon",
                        "7c8a764a175baebe1585a9678cd16f22": "unfezant",
                        "6f20779a132c17cb16ef69b2e676996e": "unown",
                        "7949b203faf4ad046f38d985918cf476": "ursaring",
                        "0dd780134a086ef677325930a303bff5": "uxie",
                        "c1c7c7a96ee4c6632daceb1bbdd7c2d8": "vanillish",
                        "81ec6746d81447ac42dc593e63797242": "vanillite",
                        "3cf5d103700909adc2ff71f1a3b02243": "vanilluxe",
                        "d80e0351cebe5f0b469bfb1e4a687118": "vaporeon",
                        "17effb8489b97e3b6fcec189e4ec65d5": "venipede",
                        "270db7e7bd851ad1b7554992d8c0630e": "venomoth",
                        "a3d9e2ce65cc25abc997e9578a3f4a0e": "venonat",
                        "8e895514c54661ddf8a0ea8308c91467": "venusaur",
                        "bfaa08128e9d967b769b5282036ca10f": "vespiquen",
                        "5313cea96dc5b3ed71dd1b1f899c5508": "vibrava",
                        "e6b12e5ec830217bea96414f7d86e74d": "victini",
                        "e7c5454a35252d6a5b3ed229c0f99512": "victreebel",
                        "9a7e740b5ed7580aaf36200ad0c257dd": "vigoroth",
                        "893ad3733c7e4241754b3b693c44e519": "vikavolt",
                        "73d6b01eab0de98a543c36d95437281b": "vileplume",
                        "57dccd27c89334d3ff65007c4e22995f": "virizion",
                        "90367122678735d58ddd36ad1d464265": "vivillon",
                        "3c8eb117adfdd5101dad39887bb57b3e": "volbeat",
                        "594847a3e2e02c41636a4b14706d7397": "volcanion",
                        "0ae77889201f9098e7cf91d4480f4735": "volcarona",
                        "113c5dd7a9b73d368980f90715747c5f": "voltorb",
                        "0ba92c0392a92e1be25e5d01a14e05ad": "vullaby",
                        "116cd81c3b19bf7bcac200008eda7ef1": "vulpix",
                        "7c94aacdee6c0d364d0c876d9cf6e1d6": "wailmer",
                        "f7c93473bbd59fb7d8343df657b7bf1e": "wailord",
                        "bc52663cf4ba1fbf42b8d9838d2d8965": "walrein",
                        "b4f5cc35211fff76b515c08f42bfcf98": "wartortle",
                        "3ad4c17379a4fce3cc1703c7cdfb977e": "watchog",
                        "f26204b854cb77c5a3d8afacc7809c10": "weavile",
                        "05d61bce7ae39b1621a2f32c8c262ad2": "weedle",
                        "641b92dc140c9b26b32c739ddce60d65": "weepinbell",
                        "fbb8cdd86c738a1eaff4f79252b8e6ea": "weezing",
                        "aef5154ece9050a9fbb30e4d6afed635": "whimsicott",
                        "82a472e591f507526f7f3244d7e8486a": "whirlipede",
                        "5661033234f2b60388b68320781326f9": "whiscash",
                        "f3c683ac70042cb0bdae79cfecda964a": "whismur",
                        "f46a6f4f76b1ff184108f2bc11aa8fa1": "wigglytuff",
                        "461076cc6c2d18e893edee63ba8a066e": "wimpod",
                        "171a9f32cfd2efe5e944b221e350e945": "wingull",
                        "68c8c6b66b11ad64a0aba8fe885f81ed": "wishiwashi",
                        "6aa2608c7770f5e890779cc534a13dc7": "wobbuffet",
                        "9a1d82b122907e6e334df56b634d5dcf": "woobat",
                        "fbaace03d1a523048e3d906d5a9dd8e7": "wooper",
                        "48e1ee98dec9986a6de8d613fb0b2d10": "wormadam",
                        "9f377c0e6eac387d4191c34ffffefa2a": "wurmple",
                        "02e0b9f7c8d03d57cc74254b13f1bcba": "wynaut",
                        "6fddcba6798353ea24f8f378bf3ebbb0": "xatu",
                        "f6887a45f68e9fda608dd533eae271a7": "xerneas",
                        "3bd006f38d0e484bd3c09bef88269565": "xurkitree",
                        "7b13cbc6ef1d3bba10931d9721226a1a": "yamask",
                        "4c4905a0b8b68d6ce69e51d46d468f6f": "yanma",
                        "460a1a7e814cb59ccbaf4a2b4e86ad25": "yanmega",
                        "73d13f96365b7480c3bc76a497c2e41a": "yungoos",
                        "a0950d8c5ef3f38fa19feb395d217e67": "yveltal",
                        "32316594954710b5fc99835ec4d05b27": "zangoose",
                        "0d4900b3d247bffdc84364ca2cc09283": "zapdos",
                        "0c7ac9c17ac070b8377df99ce2bcafd7": "zebstrika",
                        "1e219930f183fe000739ac86b256fbc3": "zekrom",
                        "102deb152b48aca54b11598edd6ce015": "zeraora",
                        "86e56c4192ce0f25dbe320069c4cc2d8": "zigzagoon",
                        "8d8087503a919ba3b2893baad6a2165c": "zoroark",
                        "dcb64cda89815ce8efe8d598e7d47b58": "zorua",
                        "04682dbf089fd597df55c2ec55bf6d86": "zubat",
                        "78bfbd425abe22d7ec481ab1c61907d8": "zweilous",
                        "a96fbe7e9ff84f520e289e3eb404377e": "zygarde"
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
                        var pokeName = Pokemon[hash];
                        var pokeHint = pokeName[0];
                        for (var i = 1; i < pokeName.length; i++) {
                            var y = Math.random();
                            if (y < 0.3) {
                                pokeHint += pokeName[i];
                            } else {
                                pokeHint += '?';
                            }
                        }
                        message.channel.send("!catch "+pokeHint+" :kissing_heart:").catch(console.error);
                    });

                }
            }
        }
    }

});

client.login(process.env.BOT_TOKEN);
