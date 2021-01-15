let addToy = false;
const TOY_URL = "http://localhost:3000/toys"
const toyCollection = document.querySelector('#toy-collection')
const form = document.querySelector('.add-toy-form')

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  getToys()

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      toyFormContainer.addEventListener('submit', (event) => {
        event.preventDefault()
        addNewToy(event.target)
      })
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

function getToys() {
  fetch(TOY_URL)
    .then(resp => resp.json())
    .then(resp => resp.forEach(function(toy) {
       createToy(toy)
    }))
    // resp.forEach((toy) => createToy(toy))
}

function createToy(toy) {
  // console.log(toy)
  div = document.createElement('div')
  div.className = "card"
  toyCollection.appendChild(div)
  h2 = document.createElement('h2')
  h2.innerText = toy.name
  let img = document.createElement('img')
  img.src = toy.image
  img.className = "toy-avatar"
  let p = document.createElement('p')
  p.innerText = `Likes: ${toy.likes} `
  p.id = `${toy.id}`
  let button = document.createElement('button')
  button.className = "like-btn"
  button.innerText = "Like"
  button.addEventListener('click', () => {
    // console.log(toy)
    addLikes(toy)
  })
  div.append(h2, img, p, button)
}



function addNewToy(toy) {
  // console.log(toy.name.value)
  let newToy = {
    name: toy.name.value,
    image: toy.image.value,
    likes: 0
  }
  
  let reqPackage = {
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify(newToy)
  }

  fetch(TOY_URL, reqPackage)
    .then(resp => resp.json())
    .then(data => createToy(data))

  form.reset()
}

function addLikes(toy) {
  let toyLikes = +document.getElementById(`${toy.id}`).innerText.split(" ")[1]
  NEW_URL = TOY_URL + `/${toy.id}`
  let likes = {
    likes: toyLikes + 1
  }

  // toyLikes = likes
  
  let reqPackage = {
    headers: {
      "Content-Type": "application/json"
    },
    method: "PATCH",
    body: JSON.stringify(likes)
  }

  fetch(NEW_URL, reqPackage)
    .then(resp => resp.json())
    .then(toyObject => {
      // document.getElementById(`${toyObject.id}`).innerText = "Likes: " + likes.likes
      updateLikes(toyObject, likes)
    })
}

function updateLikes(toyObject, likes) {
  document.getElementById(`${toyObject.id}`).innerText = "Likes: " + likes.likes
}