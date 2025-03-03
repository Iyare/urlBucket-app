// chrome://extensions/
let myLeads = [];
const inputEl = document.querySelector("#input-el");
const inputBtn = document.querySelector("#input-btn");
const deleteAllBtn = document.querySelector("#delete-btn");
const tabBtn = document.querySelector("#tab-btn");
const list = document.querySelector("#list");

let savedLeads = JSON.parse(localStorage.getItem("myLeads"));

// Checking if there are any saved URLs in the local storage
if (savedLeads) {
  myLeads = savedLeads;
  renderLeads(myLeads);
}

// Adding event listener to input element to save the URL when Enter key is pressed
inputEl.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    saveUrl();
  }
});

// Adding event listener to save button to save the URL when clicked
inputBtn.addEventListener("click", saveUrl);

// Function to save the URL
function saveUrl() {
  let url = inputEl.value;
  if (!url) {
    alert("Please enter a valid URL");
    return;
  } else {
    if (!url.includes("http")) {
      url = "https://" + url;
    }
    myLeads.push(url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    inputEl.value = "";
    renderLeads(myLeads);
  }
}

// Function to render the list of URLs  in the list element

function renderLeads(leads) {
  let listItems = "";
  // Refactor the onclick function on the i element
  for (let i = 0; i < leads.length; i++) {
    listItems += `
            <li>
                <i class="fas fa-trash-alt" 
                onclick="
                myLeads.splice(${i}, 1); 
                localStorage.setItem('myLeads', JSON.stringify(myLeads)); renderLeads(myLeads)">
                </i>
            <a target='_blank' href='${leads[i]}'>${leads[i]}</a> 
                       
            </li>
        `;
  }
  list.innerHTML = listItems;
}

// Adding event listener to delete all button to delete all the URLs saved
deleteAllBtn.addEventListener("click", deleteAllLeads);
function deleteAllLeads() {
  localStorage.clear();
  myLeads = [];
  renderLeads(myLeads);
}

// Adding event listener to tab button to save the URL of the current tab
tabBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    renderLeads(myLeads);
  });
});
