//Quote request
var myRequest = 'https://animechan.vercel.app/api/random';

getQuote();

//gets new quote
function newQuote(){
    document.getElementById("Quote").innerHTML = "Loading New Quote...";
    document.getElementById("Character").innerHTML = "Try again later if this takes longer than expected.";
    var elem = document.getElementById('img');
    elem.remove();
    getQuote();
}

//gets a quote, and then sends the getImage()
function getQuote(){
    axios.get(myRequest)
        .then(function (response) {
            if (response.data.quote.length > 225) {
                getQuote(myRequest);
                return;
            }
            getImage(response);
    })
        .catch(err => {
            if (err){
                document.getElementById("Quote").innerHTML = "Too many requests, please try again later";
                document.getElementById("Character").innerHTML = "Gabe";
            }
    })
}

//gets the image and calls addToHTML() to add the image and quote to website
//finds the image by searching for the character of the quote and using the first result
async function getImage(quote){
    axios.get('https://api.jikan.moe/v3/search/character?q=' + quote.data.character + '&limit=1')
    .then(function (response) {
            addToHTML(response, quote);
        })
        .catch(err => {
            if (err){
                getQuote(myRequest);
            }
    })
}

function addToHTML(img, response){
    //add image
    var image = document.createElement('img');
    image.id = 'img';
    image.src = img.data.results[0].image_url;
    var src = document.getElementById('img-div');
    src.appendChild(image);
    //adds quote and character
    document.getElementById("Quote").innerHTML = "\"" + response.data.quote + "\"";
    document.getElementById("Character").innerHTML = response.data.character;
}