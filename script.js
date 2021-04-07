//const axios = require("axios");


var myRequest = 'https://animechan.vercel.app/api/random';

getQuote(myRequest);

function getQuote(myRequest){
    axios.get(myRequest)
        .then(function (response) {
            document.getElementById("Quote").innerHTML = "\"" + response.data.quote + "\"";
            document.getElementById("Character").innerHTML = "- " + response.data.character;
            getCharacterID(response);
    })
        .catch(err => {
            if (err){
                document.getElementById("Quote").innerHTML = "Too many requests, please try again later";
                document.getElementById("Character").innerHTML = "- " + "Gabe";
            }
    })
}

function getCharacterID(response){
    axios.get('https://api.jikan.moe/v3/search/character?q=' + response.data.character + '&limit=1')
        .then(function (response) {
            getImage(response);
    })
}

function getImage(response){
    axios.get('https://api.jikan.moe/v3/character/' + response.data.results[0].mal_id + '/pictures')
                .then(function(response){
                    console.log(response.data.pictures[0].large);
                    var url = response.data.pictures[0].large;
                    var image = new Image();
                    image.src = url;
                    document.getElementById('img').appendChild(image);
    })
}

/*
var url = 'https://cdn.myanimelist.net/images/characters/11/32678.jpg';
var image = new Image();
image.src = url;
document.getElementById('img').appendChild(image);
*/