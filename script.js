var myRequest = 'https://animechan.vercel.app/api/random';

axios.get(myRequest)
    .then(function (response) {
        document.getElementById("Quote").innerHTML = "\"" + response.data.quote + "\"";
        document.getElementById("Character").innerHTML = "-" + response.data.character;
        document.getElementById("Anime").innerHTML = response.data.anime;
 })
