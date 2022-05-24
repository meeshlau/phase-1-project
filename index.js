/* Global Variables */
const baseUrl = "https://api.tvmaze.com/search/shows?q="
const favorites = []

/* Node Getters*/
const mainDiv = document.getElementById("main") 
const titleDiv = document.getElementById("title")
const searchLink =  document.getElementById("search-link")
const searchContainer = document.getElementById("search-container")
const favesLink =  document.getElementById("faves-link")
const form = document.getElementById("form")
const searchCollection = document.getElementById("search-collection")
const favoritesCollection = document.getElementById("favorites-collection")

/* Event Listeners*/
const handleSearchLinkClick = () => {
    searchLink.addEventListener("click", loadSearch)
}

const handleFavesLinkClick = () => {
    favesLink.addEventListener("click", loadFavesLink)
}

document.addEventListener("DOMContentLoaded", () => {
    handleSearchLinkClick()
    handleSearchResults()
    handleFavesLinkClick()
    const h3 = document.createElement('h3')
    h3.className = "center-align"
    h3.innerText = "Search for a TV Show"
    titleDiv.append(h3)
})

/* Event Handlers*/
const loadSearch = (e) => {
    e.preventDefault()
    titleDiv.style.display = "block"
    form.style.display = "block"
}

const loadFavesLink = (e) => {
    e.preventDefault()
    resetSearchCollectionResults()
    form.style.display = "none"
    titleDiv.style.display = "none"
    
    const h1 = document.createElement("h1")
    h1.textContent = "Favorites"
    favoritesCollection.append(h1)
    
    
    for (const name of favorites) {
        favoritesCollection.append(name)
    }
    
}

function addToFavorites(e) {
    e.preventDefault()
    const li = document.createElement("li")
    li.textContent = this.show.name

    favorites.push(li)
    for (const name of favorites) {
        favoritesCollection.append(name)
    }
}

function mouseOverFunction() {
    this.style.color = "orange"
}

function mouseOutFunction(){
    this.style.color = "black"
}

/* REQUESTS */
const handleSearchResults = () => {    
    form.addEventListener("submit", (e) => {
        e.preventDefault()
        e.target[0].value
        fetch(baseUrl + `${e.target[0].value}`)
        .then(response => response.json())
        .then(response => {
            searchCollection.innerHTML = ""
            response.map(show => {
                renderCard(show)
            })
        })
        form.reset()
    })
}

/* Misc */

const resetSearchCollectionResults = () => {
    searchCollection.innerHTML = ""
}

const renderCard = (show) => {
    const rowDiv = document.createElement("div")
    const colDiv = document.createElement("div")
    const cardDiv = document.createElement("div")
    const imageDiv = document.createElement("div")
    const cardContent = document.createElement("div")
    const cardTitleSpan = document.createElement("span")
    const p = document.createElement("p")
    const cardActionDiv = document.createElement("div")
    const a = document.createElement("a")
    const img = document.createElement("img")

    rowDiv.className = "row"
    colDiv.className = "col s6"
    cardDiv.className = "card"
    imageDiv.className = "card-image"
    cardTitleSpan.className = "card-title black-text"
    cardActionDiv.className = "card-action"
    cardContent.className = "card-content"
    a.setAttribute("id", "add-link")

    img.src = show.show.image.original
    a.addEventListener("click", addToFavorites.bind(show))
    a.textContent = "♥ Add to favorites"
    cardTitleSpan.textContent = show.show.name
    p.innerHTML = show.show.summary
    p.addEventListener("mouseover", mouseOverFunction)
    p.addEventListener("mouseout", mouseOutFunction)
    
    cardActionDiv.append(a)
    imageDiv.append(img)
    cardContent.append(cardTitleSpan, p)
    cardDiv.append(imageDiv, cardContent, cardActionDiv)
    colDiv.append(cardDiv)
    rowDiv.append(colDiv)

    searchCollection.append(rowDiv)
}
