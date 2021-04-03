//const axios = require('axios');


var myRequest = 'https://animechan.vercel.app/api/random';


axios.get(myRequest)
    .then(function (response) {
        document.body.innerHTML = response.data.quote;
 })

 