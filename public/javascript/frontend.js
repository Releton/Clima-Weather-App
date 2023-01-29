//constants
const toggleCity = document.getElementById("city-toggle")
const toggleLat = document.getElementById("lat-toggle")
const getLocation = document.getElementById("getLocation")
const cityForm = document.querySelector(".city-form")
const latForm = document.querySelector(".lat-form")
const latInput  = document.querySelector(".search-lat")
const lonInput = document.querySelector(".search-lon")
const latSubmit = document.querySelector(".lat-submit")


//event listeners
toggleCity.addEventListener("click", (e)=>{
    show(latForm, cityForm, toggleCity, toggleLat)
})

toggleLat.addEventListener("click", (e)=>{
    show(cityForm, latForm, toggleLat, toggleCity)
})
document.addEventListener('contextmenu', event => event.preventDefault());
getLocation.addEventListener("click", async (e)=>{
    show(cityForm, latForm, toggleLat, toggleCity)
    window.navigator.geolocation.getCurrentPosition((location)=>{
        latInput.value = location.coords.latitude.toString().slice(0,4)
        lonInput.value = location.coords.longitude.toString().slice(0,4)
        latSubmit.click()
    },
    ()=>{
       console.log("Problem!") 
    })
})




//functions
function show(form1, form2, button1, button2){
    form1.classList.add("hidden")
    form2.classList.remove("hidden")
    button1.classList.add("hidden")
    button2.classList.remove("hidden")
    // toggleLocation(button1)
}
function toggleLocation(button1){
    if(button1.dataset.work == "lat-toggle"){
        getLocation.classList.remove("hidden")
    }
    else{
        getLocation.classList.add("hidden")
    }
}