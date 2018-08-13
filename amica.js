var ruokalista = function(pvm) // palauttaa piispankallion pvm-päivän ruokalistan
{
	var answer = '';
	var request = require('sync-request');
	// costNumber = 3618 on piispankallio, löytyy websivun sorsasta
	// firstDay = 2017-01-18 on alkupäivä
	// lastDay = 2017-01-18 on loppupäivä, ei toimi eikä ole pakollinen
	var url = 'http://www.amica.fi/modules/json/json/Index?costNumber=3618&firstDay=' + pvm + '&lastDay=' + pvm + '&language=fi';
	
	console.log('amica ruokalista url=' + url);
	var response = request('GET', url); 

	if (response.statusCode === 200) 
	{
		var data = JSON.parse(response.getBody());
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
	}

	return(answer);
};

var amicapvm = function(date) 
{
	var nyt = new Date();
	nyt = date;

	var pp = nyt.getDate();
	var kk = nyt.getMonth()+1;
	var vvvv = nyt.getFullYear();

	pp = (pp > 9) ? pp : '0' + pp;
	kk = (kk > 9) ? kk : '0' + kk;

	var paivamaara = vvvv + "-" + kk + "-" + pp;
	
	return(paivamaara);
};

module.exports = 
{
	ruokalista: ruokalista,
	amicapvm: amicapvm
};

console.log( 'amicapvm = ' + amicapvm(new Date()) );
console.log( ruokalista(amicapvm(new Date()) ) );
