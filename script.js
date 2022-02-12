
const openModalButtons = document.querySelectorAll('[data-modal-target]');
const closeModalButtons = document.querySelectorAll('[data-close-button]');
const overlay = document.getElementById('overlay');

openModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = document.querySelector(button.dataset.modalTarget)
    search(modal);
  })
})

overlay.addEventListener('click', () => {
  const modals = document.querySelectorAll('.modal.active')
  modals.forEach(modal => {
    closeModal(modal)
  })
})


closeModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = button.closest('.modal')
    closeModal(modal)
  })
})

function openModal(modal) {
  if (modal == null) return
  modal.classList.add('active')
  overlay.classList.add('active')
  console.log(overlay.classList.toString)
}

function closeModal(modal) {
  if (modal == null) return
  modal.classList.remove('active')
  overlay.classList.remove('active')
}



function search(modal){

    

    var elem = document.getElementById('img');
    if (elem != null)
        elem.remove();

    var location = document.getElementById('location').value;
    
    var other = document.getElementById('other').value;
    //TODO: randomize
    const checked = document.querySelectorAll('input[type="checkbox"]:checked')
    var selectedArray = Array.from(checked).map(x => x.value)
    selectedArray = selectedArray.sort((a, b) => 0.5 - Math.random());

    var selected = selectedArray.join();


    if (other.length != 0){
        other = encodeURIComponent(other.toLowerCase().trim());
        if (selected.length != 0)
            selected += "," + other;
        else
            selected = other;
    }
    location = encodeURIComponent(location.trim());
    //selected = encodeURIComponent(selected.trim());

    var myRequest =  "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=restaurants&limit=1&location=" + location +"&categories=" + selected;

    var set = "cl3c2FED152EXRIIENjt7XDootXOVf_KTGBQK84vj9DuXR6CaW_gMsUcJe2VG1Auw1o2n2Tk1YwoNC98M4bdcX_pBQ4VrDTPDkhpDc7VBAdGnAmXwnzNs-jM5A0HYnYx"

    
    console.log(myRequest);
    get(myRequest, set, modal);
    
}

function get(myRequest, set, modal){
    axios(myRequest, {
        method: "GET",
        headers: {
            "accept": "application/json",
            "x-requested-with": "xmlhttprequest",
            "Access-Control-Allow-Origin":"*",
            Authorization: `Bearer ${set}`
        }
    })
    .then(response => {
        console.log(response.data.businesses);
        var data = response.data.businesses[0];
        var name = data.name + '!';
        var rating = "Rating: " + data.rating + ' stars';
        
        var reviews = data.review_count + " Reviews";
        var link = data.url;
        name.href = link;
        var image_url = data.image_url;
        var city = "City: " + data.location.city;
        
        document.getElementById("name").innerHTML = name;
        document.getElementById("rating").innerHTML = rating;
        document.getElementById("reviews").innerHTML = reviews;
        document.getElementById("city").innerHTML = city;
        
        var image = document.createElement('img');
        image.id = 'img';
        image.src = image_url;
        var src = document.getElementById('img-div');
        src.appendChild(image);
      
        openModal(modal)
    })
    .catch(error => {
        document.getElementById("name").innerHTML = "Something went wrong!";
        openModal(modal)
    });
    
}