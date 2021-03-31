//const fetch = require('node-fetch');


let myRequest = 'https://animechan.vercel.app/api/random';


fetch(myRequest).then(function(response) {
    return response.text().then(function(text) {
        document.body.innerHTML = text;
    });
});

