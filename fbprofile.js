var fbprofile = function(userId, ACCESS_TOKEN) 
{
	// url = 'https://graph.facebook.com/v2.6/1293217144033334?fields=first_name,last_name,profile_pic,locale,timezone,gender&access_token=EAAaLMXJoq7QBACJYJSR19Vs7in1FLAJ6mZAg3DDCxZCJAjAiGt11UaWxBZB1MSqq0HgoqXIy2fCT5yFTAN6u02UV1ehDleZBKFuydAxZA2GUiM5LuGj4UqcpXuZAeeK9EnCjsmjZB2BVFYa0ATRZCVxArnpx8x0VJzVKJlSZB2ImZBegZDZD';
	// get profile info
	//{
	//"first_name": "Petteri",
	//"last_name": "Manninen",
	//"profile_pic": "https://scontent.xx.fbcdn.net/v/t1.0-1/262958_10151084298618422_2146321058_n.jpg?oh=4b973f0a6e1817dcbf9b181f9c34b944&oe=58E2E296",
	//"locale": "en_GB",
	//"timezone": 2,
	//"gender": "male"
	//}
	console.log('get profile info for ' + userId);
	console.log('ACCESS_TOKEN= ' + ACCESS_TOKEN);

	var request = require('sync-request');

	console.log('profile request');
	var data='';
	var url = '';
	url = 'https://graph.facebook.com/v2.6/'+userId+'?fields=first_name,last_name,profile_pic,locale,timezone,gender&access_token='+ACCESS_TOKEN;

	console.log('profile url='+url);
	var response = request('GET', url);

	if (response.statusCode === 200) 
	{
		data = JSON.parse(response.getBody());
		console.log('FB-profile-call success, data = ' + data);
		console.log('first name = ' + data.first_name);
		console.log('last name = ' + data.last_name);
		console.log('tz = ' + data.timezone);
		console.log('locale = ' + data.locale);
		console.log('gender = ' + data.gender);
		console.log('picture = ' + data.profile_pic);
	}
	else
	{
		console.log('FB-profile-call failed, HTTP reponse code = ' + response.statusCode);
	}
	
	return(data);
};

module.exports = 
{
	fbprofile: fbprofile
};

console.log( fbprofile(1293217144033334,'EAAaLMXJoq7QBACJYJSR19Vs7in1FLAJ6mZAg3DDCxZCJAjAiGt11UaWxBZB1MSqq0HgoqXIy2fCT5yFTAN6u02UV1ehDleZBKFuydAxZA2GUiM5LuGj4UqcpXuZAeeK9EnCjsmjZB2BVFYa0ATRZCVxArnpx8x0VJzVKJlSZB2ImZBegZDZD') );
