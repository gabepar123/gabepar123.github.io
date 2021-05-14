//const axios = require("axios");


var myRequest = 'https://animechan.vercel.app/api/random';

getQuote(myRequest);

function getQuote(myRequest){
    axios.get(myRequest)
        .then(function (response) {
            if (response.data.quote.length > 225) {
                getQuote(myRequest);
                return;
            }
            document.getElementById("Quote").innerHTML = "\"" + response.data.quote + "\"";
            document.getElementById("Character").innerHTML = response.data.character;
            getImage(response);
    })
        .catch(err => {
            if (err){
                document.getElementById("Quote").innerHTML = "Too many requests, please try again later";
                document.getElementById("Character").innerHTML = "Gabe";
            }
    })
}

function getImage(response){
    axios.get('https://api.jikan.moe/v3/search/character?q=' + response.data.character + '&limit=1')
        .then(function (response) {
            var image = document.createElement('img');
            image.src = response.data.results[0].image_url;
            var src = document.getElementById('img-div');
            src.appendChild(image);
        })
        .catch(err => {
            if (err){
                getQuote(myRequest);
            }
    })
}

/*
document.getElementById("Quote").innerHTML = "xoxo sadasd adas dsad asdas dasd asd asdasd asda sdasd asdasd adas dsadasd asdsddsdsdsd sdsd.";
var image = document.createElement('img');
image.src = 'https://cdn.myanimelist.net/images/characters/11/32678.jpg';
var src = document.getElementById('block')
src.appendChild(image);

*/