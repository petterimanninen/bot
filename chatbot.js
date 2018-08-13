var VERIFY_TOKEN = 'leikkuribot';
var ACCESS_TOKEN = 'EAAaLMXJoq7QBACJYJSR19Vs7in1FLAJ6mZAg3DDCxZCJAjAiGt11UaWxBZB1MSqq0HgoqXIy2fCT5yFTAN6u02UV1ehDleZBKFuydAxZA2GUiM5LuGj4UqcpXuZAeeK9EnCjsmjZB2BVFYa0ATRZCVxArnpx8x0VJzVKJlSZB2ImZBegZDZD';

var util		= require('./util.js');
var pvm			= require('./pvm.js');
var nimipv		= require('./nimipv.js');
var larry		= require('./larry.js');
var amica		= require('./amica.js');
var chucknorris	= require('./joke.js');
var fb			= require('./fbprofile.js');

var express		= require('express');
var bodyParser	= require('body-parser');
var Botly		= require('botly');

var botly = new Botly
(
	{
		accessToken: ACCESS_TOKEN,
		verifyToken: VERIFY_TOKEN,
		webHookPath: '/',
		notificationType:  Botly.CONST.REGULAR
	}
);

console.log("Startup ok.");

// --------------------------------------------------------------------------------------------
function sendReply(userId, message, question, profile)
{
	var answer = 'Kirjoita "Moi", "Mitä kuuluu?", "Mitä kello on?" tai "Mikä päivä nyt on?" niin saat paremman vastauksen';
	var d = new Date();	

	console.log('sendReply profile = ' + profile);
	var p = profile;
	//var firstname = p.first_name;
	//var lastname = p.last_name;
	//var pic = p.profile_pic;
	//var locale = p.locale;
	//var tz = p.timezone;
	//var gender = '';
	//if(p.gender==='male') gender = 'mies';
	//else if(p.gender==='female') gender = 'nainen';
	//else gender = 'määrittelemätön';
	//var username = firstname + ' ' + lastname;

	//console.log('first name = ' + firstname);
	//console.log('last name = ' + lastname);
	//console.log('username = ' + username);
	//console.log('tz = ' + tz);
	//console.log('locale = ' + locale);
	//console.log('gender = ' + gender);
	//console.log('picture = ' + pic);
	
	console.log("Question:"+question);

	if (util.isIn(question, 'moi') || util.isIn(question, 'hei') || util.isIn(question, 'terve'))
	{
		answer = 'Moi vaan, ' + p.first_name + '!';
		sendText(userId, answer);
	}
	else if (util.isIn(question, 'Hi'))
	{
		answer = 'Hello there ' + p.first_name + '!';		
		sendText(userId, answer);
	}
	else if (util.isIn(question, 'kuuluu'))
	{
		answer = 'Kiitos hyvää.';
		sendText(userId, answer);
	}
	else if (util.isIn(question, 'info'))
	{
		// answer = 'Nimesi on ' + p.first_name + ' ' + p.last_name + '.\n Olet '+ (p.gender==='male' ? 'mies' : 'nainen') + ' ja olet aikavyöhykkeellä GMT'+ (p.timezone>=0?'+':'-') + p.timezone + '.\nKuvasi on ' + p.profile_pic;
		answer = 'Nimesi on ' + p.first_name + ' ' + p.last_name + '.\n Olet '+ (p.gender==='male' ? 'mies' : 'nainen') + ' ja olet aikavyöhykkeellä GMT'+ (p.timezone>=0?'+':'-') + p.timezone + '.\n';
		sendText(userId, answer);
		botly.sendImage({id: userId, url: p.profile_pic});
	}
	else if (util.isIn3(question, 'How', 'are', 'you'))
	{
		answer = 'Fine thanks.';
		sendText(userId, answer);
	}
	else if (util.isIn(question, 'kello'))
	{
		answer = 'Kello on ' + util.showFilled(d.getHours()+p.timezone) + ':' + util.showFilled(d.getMinutes());
		sendText(userId, answer);
	}
	else if (util.isIn(question, 'time'))
	{
		answer = 'The time is ' + util.showFilled(d.getHours()+p.timezone) + ':' + util.showFilled(d.getMinutes());
		sendText(userId, answer);
	}
	else if (util.isIn(question, ' päivä') || util.isIn(question, 'päivämäärä') || util.isIn(question, 'pvm') || util.isIn(question, 'nimipäivä'))
	{
		answer = pvm.pvm(d,'fi') + '\nNimipäiväänsä viettää '+ nimipv.nimipv(d) + '.';
		sendText(userId, answer);
	}
	else if ( util.isIn(question, 'date') )
	{
		answer = pvm.pvm(d,'en');
		sendText(userId, answer);
	}
	else if ( util.isIn(question, 'lounas') || util.isIn(question, 'ruoka') || util.isIn(question, 'amica') )
	{
		answer = 'Tänään tarjolla Amicassa on\n' + amica.ruokalista(amica.amicapvm(new Date()));
		sendText(userId, answer);
	}
	else if ( util.isIn(question, 'vitsi') || util.isIn(question, 'joke') || util.isIn(question, 'chuck') || util.isIn(question, 'norris') )
	{
		answer = chucknorris.joke();
		sendText(userId, answer);
	}
	else if ( util.isIn(question, 'oracle') || util.isIn(question, 'larry') || util.isIn(question, 'ellison') )
	{
		var r = Math.floor(Math.random() * (49 - 0 + 1)) + 0;
		answer = larry.quote(r);
		sendText(userId, answer);
	}
	else if ( util.isIn(question, 'apua') || util.isIn(question, 'help')  || util.isIn(question, '?'))
	{
		sendText(userId, 'Sopivia avainsanoja ovat esim. moi, hei, terve, hi\n- tervehdys\nkuuluu, how are you\n- vastaus\ninfo\n- käyttäjän tiedot\nkello, time\n- kellonaika\npäivä, päivämäärä, pvm, nimipäivä, date\n- päivämäärä ja nimipäivä\nlounas, ruoka, amica\n- Oraclen Amican päivän ruokalista\nvitsi, joke, chuck, norris\n- Chuck Norris-vitsi\noracle, larry, ellison\n- Larryn sitaatti\napua, help, ?\n- komennot\n');
	}
	else
	{
		sendText(userId, 'Nyt meni yli ymmärryksen, kokeile apua tai ?');
	}

	return(answer);
}


// -----------------------------------------------------------------------
function sendText(userId, reply)
{
	console.log('sendText reply=' + reply);
	botly.sendText({id: userId , text: reply} , function(error, data)
	{
		if(error)
		{
			console.log('error:' + error);
		}
		else
		{
			console.log('sent:' + reply);
		}
	});
}

// -----------------------------------------------------------------------
botly.on('message', function (userId, message, data) 
{
    console.log(userId, message, data);
    console.log('userId=' + userId);
    console.log('message=' + message);
    console.log('data=' + data);

	console.log('get fb profile');
	var profile = fb.fbprofile(userId, ACCESS_TOKEN);
	console.log('profile = '+ profile);
	
	console.log('send reply');
	var reply = sendReply(userId, message, data.text.toLowerCase(), profile);
	console.log('send reply done, reply =' +reply);

});

// -----------------------------------------------------------------------
botly.on('postback', function (userId, message, postback) 
{
    console.log('postback:');
    console.log(postback);
});

var app = express();
app.use(bodyParser.json());
app.use("/webhook", botly.router());
app.listen( process.env.PORT || 8081);

// -----------------------------------------------------------------------
app.get('/webhook', function (req, res) 
{
	console.log('webhook request: ' + JSON.parse(req) );
    if (req.query['hub.mode'] === 'subscribe' && req.query['hub.verify_token'] === VERIFY_TOKEN)
	{
        console.log("Validating webhook");
        res.status(200).send(req.query['hub.challenge']);
    } 
	else 
	{
        console.error("Failed validation. Make sure the validation tokens match.");
        res.sendStatus(403);
    }
});

// -----------------------------------------------------------------------
app.get('/amica', function (req, res) 
{
	// console.log('amica request: ' + JSON.parse(req) );
	var answer = "{'lunch':'Tänään tarjolla Amicassa on\n" + amica.ruokalista(amica.amicapvm(new Date())) + "'}";
	res.status(200).send(answer);
});

console.log("Startup done.");