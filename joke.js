var joke = function() 
{
	var result = '';
	var request = require('sync-request');
	var response = request('GET', 'http://api.icndb.com/jokes/random');
	
	if (response.statusCode === 200) 
	{
		console.log('ICNDB-call succeeded');
		var data = JSON.parse(response.getBody());
		var result = data.value.joke;
		result = result.replace(/&quot;/g,'"');
		console.log('joke is:' + result);
		return( result );
	}
	else
	{
		console.log('ICNDB-call failed, HTTP reponse code = ' + response.statusCode);
	}
	return('no joke today.');
};

module.exports = 
{
	joke: joke
};

console.log(joke());