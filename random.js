const getContent = function(url) {
  // return new pending promise
  return new Promise((resolve, reject) => {
    // select http or https module, depending on reqested url
    const lib = url.startsWith('https') ? require('https') : require('http');
    const request = lib.get(url, (response) => {
      // handle http errors
      if (response.statusCode < 200 || response.statusCode > 299) {
         reject(new Error('Failed to load page, status code: ' + response.statusCode));
       }
      // temporary data holder
      const body = [];
      // on every content chunk, push it to the data array
      response.on('data', (chunk) => body.push(chunk));
      // we are done, resolve promise with those joined chunks
      response.on('end', () => resolve(body.join('')));
    });
    // handle connection errors of the request
    request.on('error', (err) => reject(err))
    })
};

var rnd = 'https://www.random.org/integers/?num=1&min=1&max=100&col=1&base=10&format=plain&rnd=new';

getContent(rnd)
  .then((html) => console.log(html))
  .then((html) => console.log(html))
  .catch((err) => console.error(err));

/*
getContent(rnd)
	.then( (html1) => 
		{
			console.log("1:"+html1); 
			console.log("x");
		} 
	)
	.then( (html1) => (
		{
			getContent(rnd)
			  .then((html2) => console.log("2:"+html2 + " 1="+html1))
			  .catch((err) => console.error(err));
		}
	)

	.catch((err) => console.error(err));
*/