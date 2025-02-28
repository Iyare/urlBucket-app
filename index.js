// chrome://extensions/
let myLeads = [];
const inputEl = document.querySelector("#input-el");
const inputBtn = document.querySelector("#input-btn");
const deleteAllBtn = document.querySelector("#delete-btn");
const savedUrlsBtn = document.querySelector("#saved-btn");
const tabBtn = document.querySelector("#tab-btn");
const list = document.querySelector("#list");

let savedLeads = JSON.parse(localStorage.getItem("myLeads"));

console.log(savedLeads)

inputBtn.addEventListener("click", function () {
    if  (inputEl.value === "") {
        alert("Please enter a valid URL")
        return
    } else {
        if (!inputEl.value.includes("http")) {
            inputEl.value = "https://" + inputEl.value;
        }
        myLeads.push(inputEl.value);
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        inputEl.value = "";
        renderLeads(myLeads);
        console.log(savedLeads)
        
    }
    
})

function renderLeads(leads) {
    let listItems = ""

    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a> 
                <i class="fas fa-trash-alt" 
                onclick="
                myLeads.splice(${i}, 1); 
                localStorage.setItem('myLeads', JSON.stringify(myLeads)); renderLeads(myLeads)">
                </i>
            </li>
        `
    }
    list.innerHTML = listItems  
}


savedUrlsBtn.addEventListener("click", function() {
    myLeads = savedLeads;
    if (savedLeads === null) {
        myLeads = [];
    }
    renderLeads(myLeads);
})

deleteAllBtn.addEventListener("click", deleteAllLeads)
function deleteAllLeads() {
    localStorage.clear();
    myLeads = [];
    renderLeads(myLeads);
}
tabBtn.addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        renderLeads(myLeads)
    })

})

/*
1 meter = 3.281 feet
1 liter = 0.264 gallon
1 kilogram = 2.204 pound
*/