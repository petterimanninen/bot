var tekstitv = function(pagenumber) // tekstitv
{
	var result = '';
	var request = require('sync-request');
	// a	Pakollinen parametri. Palvelun API Key.
	// c	Vapaaehtoinen parametri. Määrittelee palautetaanko vastauksen yhteydessä alasivun sisältö. Mahdolliset arvot ovat true tai false, oletuksena false.
	// p	Pakollinen parametri. Halutut sivunumerot pilkulla eroteltuna.
	// s	Vapaaehtoinen parametri. Parametrin avulla voi kysyä sivua edeltävän tai seuraavan sivun. Mahdolliset arvot ovat prev tai next.
	// t	Vapaaehtoinen parametri. Määrittelee vastauksen formaatin. Mahdolliset arvot ovat json tai xml, oletuksena json.
	// Sivun 301 alasivut http://beta.yle.fi/api/ttvcontent/?a=apikey&p=301
	// Sivujen 100 ja 200 alasivut http://beta.yle.fi/api/ttvcontent/?a=apikey&p=100,200
	// Sivua 101 edeltävän sivun alasivut http://beta.yle.fi/api/ttvcontent/?a=apikey&p=100&s=prev
	// Sivun 301 alasivut sisällön kanssa http://beta.yle.fi/api/ttvcontent/?a=apikey&p=301&c=true
	// Sivun 301 alasivut XML-formaatissa http://beta.yle.fi/api/ttvcontent/?a=apikey&p=301&t=xml
	// pma api key 3oPg6vkOlanNhwrKKQFlBP
	// http://beta.yle.fi/api/ttvcontent/?a=3oPg6vkOlanNhwrKKQFlBP&c=true&p=102
	
	var url = 'http://beta.yle.fi/api/ttvcontent/?a=3oPg6vkOlanNhwrKKQFlBP&c=true&p=' + pagenumber;
	
	console.log('TekstiTV page url=' + url);
	var response = request('GET', url); 

		if (response.statusCode === 200) 
		{
			var page = JSON.parse(response.getBody());
			var subpagecount = page.pagesCount;
			// console.log('TekstiTV API-call success for page ' + pagenumber + ': pagecount=' + subpagecount);
			// console.log('Page ' + pagenumber + '\n' + page);
			result = page;

			var i=0;
			var subpage='';
			for(i in page.pages[0].subpages)
			{
				var subpagenumber = page.pages[0].subpages[i].number
				subpage = subpage + 'YLE TekstiTV ' + pagenumber + ':' + subpagenumber + ' --------------------\n' + page.pages[0].subpages[i].content;
				subpage=subpage.replace(/\[gc..\].*\n/g,''); // remove all lines with [gc..]
				subpage=subpage.replace(/\[....\]/g,' '); // remove all ttv tags [....]
				subpage=subpage.replace(/(\n\s*\n\s*\n)/g,'\n'); // remove double empty lines
			};
			
			result = subpage + '\n';
		}
		else
		{
			result = 'TekstiTV sivua ' + page + ' ei löydy.';
		}

	console.log("len="+result.length);

	var i=0;
	
	while (i<result.length)
	{
		var n=result.substr(i,640+i).lastIndexOf('\n');
		console.log('i='+i+'n='+n+'->\n' + result.substr(i,i+n) + '<-');
		i+=n+1;
	}
	
	return(result);
};

console.log( tekstitv(102) );
console.log( tekstitv( process.argv[2] ) );
