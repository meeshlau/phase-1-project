/* 
Three Question Rule for Events:
    Overview: What is the feature?
    1. When?
    2. Cause - What is the cause of the event that happens?
    3. Effect - What happens after the event triggers?
*/

/* Global Variables */
const baseUrl = "https://www.thecocktaildb.com/api/json/v1/1/search.php?"
const favorites = []

/* Node Getters:  */
const mainDiv = document.getElementById("main") 
const searchLink =  document.getElementById("search-link")
const favesLink =  document.getElementById("faves-link")
const form = document.getElementById("form")
const textArea = document.getElementById("textarea1")
const cocktailCollection = document.getElementById("cocktail-collection")

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
    h1.innerText = "Search for Cocktail Recipes"
    mainDiv.append(h1)
}

const loadFavesLink = (e) => {
    e.preventDefault()
    resetMainDiv()
    resetFormDiv()
    resetCocktailCollectionResults()
    const h1 = document.createElement("h1")
    h1.innerText = "Favorites"
    mainDiv.append(h1)
    for (const name of favorites) {
        mainDiv.append(name)
    }
}

function addToFavorites(e) {
    e.preventDefault()
    const li = document.createElement("li")
    li.textContent = this.strDrink

    favorites.push(li)
    for (const name of favorites) {
        mainDiv.append(name)
    }
}

/* REQUESTS */
const handleSearchResults = () => {    
    form.addEventListener("submit", (e) => {
        e.preventDefault()
        e.target[0].value
        fetch(baseUrl + `s=${e.target[0].value}`)
        .then(response => response.json())
        .then(response => {
            cocktailCollection.innerHTML = ""
            response.drinks.map(drink => {
                renderCard(drink)
                console.log(drink)
            })
        })
    form.reset()
    })
}

const loadSearchResultsDetails = (cocktail, e) => {
    console.log(e.target.value)
    fetch(baseUrl + `s=${cocktail}`)
    .then(response => response.json())
    .then(response => response.map(collection => {
        const li = document.createElement("li")
        const h1 = document.createElement("h1")
        h1.textContent = collection.strDrink
        h1.append(li)
        cocktailCollection(h1)
    }))
}

/* Misc */
const resetMainDiv = () => {
    mainDiv.innerHTML = ""
}

const resetFormDiv = () => {
    form.innerHTML = ""
}

const resetCocktailCollectionResults = () => {
    cocktailCollection.innerHTML = ""
}

const renderCard = (drinks) => {
    const cardDiv = document.createElement("div")
    const imageDiv = document.createElement("div")
    const cardContent = document.createElement("div")
    const cardReveal = document.createElement("div")
    const span = document.createElement("span")
    const cardTitleSpan = document.createElement("span")
    const p = document.createElement("p")
    const cardTitleP = document.createElement("p")
    const img = document.createElement("img")
    const like = document.createElement("button")
    
    cardDiv.className = "card container"
    cardReveal.className = "card-reveal"
    imageDiv.className = "card-image waves-effect waves-block waves-light"
    img.className = "activator"
    span.className = "card-title activator grey-text text-darken-4 center-align"
    cardTitleSpan.className = "card-title grey-text text-darken-4 center-align"
    cardContent.className = "card-content"
    like.className = "fixed-action-btn btn-floating btn-large waves-effect waves-light red"
    like.setAttribute("id", "fave-btn")
    like.addEventListener("click", addToFavorites.bind(drinks))
    
    cardTitleSpan.textContent = drinks.strDrink
    like.textContent = "♥"
    img.src = drinks.strDrinkThumb
    span.textContent = drinks.strDrink
    cardTitleP.textContent = drinks.strInstructions
    
    cardReveal.append(cardTitleSpan, cardTitleP)
    p.append(like)
    cardContent.append(span, p)
    imageDiv.append(img)
    cardDiv.append(cardContent, imageDiv, like, cardReveal)

    cocktailCollection.append(cardDiv)
}


/* Startup: What we want to do on load */
document.addEventListener("DOMContentLoaded", () => {
    loadSearch()
    handleSearchLinkClick()
    handleFavesLinkClick()
    handleSearchResults()
})