var express = require('express');
var app = express();

var ruokalista = function(pvm, res) // palauttaa piispankallion pvm-päivän ruokalistan
{
	var answer = 'Ruokalista päivälle ' + pvm + '\n';

	var request = require('request');
	// costNumber = 3618 on piispankallio, löytyy websivun sorsasta
	// firstDay = 2017-01-18 on alkupäivä
	// lastDay = 2017-01-18 on loppupäivä, ei toimi eikä ole pakollinen
	request('http://www.amica.fi/modules/json/json/Index?costNumber=3618&firstDay=' + pvm + '&lastDay=' + pvm + '&language=fi', function (error, response, body) 
	{
		if (!error && response.statusCode === 200) 
		{
			var data = JSON.parse(body);

			var dish;
			var component;
			for(dish in data.MenusForDays[0].SetMenus)
			{
				for(component in data.MenusForDays[0].SetMenus[dish].Components)
				{
					answer += data.MenusForDays[0].SetMenus[dish].Components[component]+'\n';
				}
				answer +='\n';
			}
			console.log('Amica API-call success, menu for ' + pvm + ' is:\n' + answer);
		}
		else
		{
			console.log('Amica API-call failed, HTTP reponse code = ' + response.statusCode);
			console.log('with error ' + error);
		}
		res.send(answer);
	});
};



// in  a Fiber
function handleGet(req, res)
{
	console.log('handleGet 1');
	ruokalista('2017-01-19', res);
	console.log('handleGet 2');
}

app.get('/', function(req,res)
{
	console.log('get 1');
    handleGet(req, res); //handle in a fiber, keep node spinning
	console.log('get 2');
});

console.log('listen 1');
app.listen(3000);
console.log('listen 2');
