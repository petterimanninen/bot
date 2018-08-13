var pvm = function(date, lang) 
{
	var nyt = new Date();
	nyt = date;

	var pp = nyt.getDate();
	var kk = nyt.getMonth();
	var vv = nyt.getFullYear();
	var pv = nyt.getDay();

	var p = "";
	var k = "";
	
	if(pv === 0) p = "sunnuntai";
	if(pv === 1) p = "maanantai";
	if(pv === 2) p = "tiistai";
	if(pv === 3) p = "keskiviikko";
	if(pv === 4) p = "torstai";
	if(pv === 5) p = "perjantai";
	if(pv === 6) p = "lauantai";

	if(kk === 0)  k = "tammikuun";
	if(kk === 1)  k = "helmikuun";
	if(kk === 2)  k = "maaliskuun";
	if(kk === 3)  k = "huhtikuun";
	if(kk === 4)  k = "toukokuun";
	if(kk === 5)  k = "kesäkuun";
	if(kk === 6)  k = "heinäkuun";
	if(kk === 7)  k = "elokuun";
	if(kk === 8)  k = "syyskuun";
	if(kk === 9)  k = "lokakuun";
	if(kk === 10) k = "marraskuun";
	if(kk === 11) k = "joulukuun";

	var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
		
	var paivamaara = paivamaara ="Tänään on " + p + ", " + k + " " + pp + ". päivä, vuonna " + vv +".";
	if (lang==='en') paivamaara ="Today is " + nyt.toLocaleDateString("en-US",options) + ".";
	return(paivamaara);
};

module.exports = 
{
	pvm: pvm
};

console.log( 'pvm(fi)=' + pvm( new Date()), 'fi' );
console.log( 'pvm(en)=' + pvm( new Date()), 'en' );
