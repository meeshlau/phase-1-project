/* 
Three Question Rule for Events:
    Overview: What is the feature?
    1. When?
    2. Cause - What is the cause of the event that happens?
    3. Effect - What happens after the event triggers?
*/

/* Global Variables */
const baseUrl = "https://api.tvmaze.com/search/shows?q="
const favorites = []

/* Node Getters:  */
const mainDiv = document.getElementById("main") 
const searchLink =  document.getElementById("search-link")
const favesLink =  document.getElementById("faves-link")
const form = document.getElementById("form")
const textArea = document.getElementById("textarea1")
const searchCollection = document.getElementById("search-collection")
const favoritesCollection = document.getElementById("favorites-collection")

/* Event Listeners*/
const handleSearchLinkClick = () => {
    searchLink.addEventListener("click", loadSearch)
}

const handleFavesLinkClick = () => {
    favesLink.addEventListener("click", loadFavesLink)
}

/* Event Handlers: what happens when something triggers */
const loadSearch = () => {
    resetMainDiv()
    const h1 = document.createElement('h1')
    h1.className = "center-align"
    h1.innerText = "Search for a TV Show"
    mainDiv.append(h1)
}

const loadFavesLink = (e) => {
    e.preventDefault()
    resetMainDiv()
    resetFormDiv()
    resetSearchCollectionResults()

    const h1 = document.createElement("h1")
    h1.innerText = "Favorites"
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

function mouseOverFavorites() {
    document.getElementById("add-link").style.color = "grey"
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
                console.log(show)
            })
        })
        form.reset()
    })
    
}


/* Misc */
const resetMainDiv = () => {
    mainDiv.innerHTML = ""
}

const resetFormDiv = () => {
    form.innerHTML = ""
}

const resetSearchCollectionResults = () => {
    searchCollection.innerHTML = ""
}

const resetFavoritesCollection = () => {
    favoritesCollection.innerHTML = ""
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
    colDiv.className = "col s12 m6"
    cardDiv.className = "card"
    imageDiv.className = "card-image"
    cardTitleSpan.className = "card-title black-text"
    cardActionDiv.className = "card-action"
    cardContent.className = "card-content"
    a.setAttribute("id", "add-link")
    
    img.src = show.show.image.original
    a.addEventListener("click", addToFavorites.bind(show))
    // a.href = show.show.officialSite
    a.textContent = "♥ Add to favorites"
    cardTitleSpan.textContent = show.show.name
    p.innerHTML = show.show.summary
    
    cardActionDiv.append(a)
    imageDiv.append(img)
    cardContent.append(cardTitleSpan, p)
    cardDiv.append(imageDiv, cardContent, cardActionDiv)
    colDiv.append(cardDiv)
    rowDiv.append(colDiv)

    searchCollection.append(rowDiv)
}

/* Startup: What we want to do on load */
document.addEventListener("DOMContentLoaded", () => {
    loadSearch()
    handleSearchLinkClick()
    handleFavesLinkClick()
    handleSearchResults()
})