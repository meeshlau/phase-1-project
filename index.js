/* 
Three Question Rule for Events:
    Overview: What is the feature?
    1. When?
    2. Cause - What is the cause of the event that happens?
    3. Effect - What happens after the event triggers?
*/

/* Global Variables */
/* Node Getters:  */
const mainDiv = () => document.getElementById("main") 
const homeLink = () => document.getElementById("home-link")

/* Event Listeners*/
const handleHomeLinkClick = () => {
    homeLink().addEventListener("click", loadHome)
}
/* Event Handlers: what happens when something triggers */
const loadHome = () => {
    resetMainDiv()

    const h1 = document.createElement('h1')
    const p = document.createElement('p')

    h1.className = 'center-align';
    p.className = 'center-align';

    h1.innerText = "Equipment Management"
    p.innerText = "This will be the description of what this page is"

    mainDiv().append(h1)
    mainDiv().append(p)

}
/* Misc */
const resetMainDiv = () => {
    mainDiv().innerHTML =- ""
}
/* Startup: What we want to do on load */
document.addEventListener("DOMContentLoaded", function() {
    loadHome()
    handleHomeLinkClick()
})
