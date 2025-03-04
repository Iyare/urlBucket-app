import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-database.js";

const firebaseConfig = {
  databaseURL: "https://url-bucket-app-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const databaseReference = ref(database, "urls");

let myUrls = [];
const inputEl = document.querySelector("#input-el");
const saveBtn = document.querySelector("#save-btn");
const deleteAllBtn = document.querySelector("#delete-btn");
const list = document.querySelector("#list");

// Checking if there are any saved URLs in the local storage
// if (savedLeads) {
//     myUrls = savedLeads;
//     renderLeads(myUrls);
// }

// Adding event listener to input element to save the URL when Enter key is pressed
inputEl.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    saveUrl();
  }
});

// Adding event listener to save button to save the URL when clicked
saveBtn.addEventListener("click", saveUrl);

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
    myUrls.push(url);
    push(databaseReference, url);
    inputEl.value = "";
    renderLeads(myUrls);
  }
}

// Function to render the list of URLs  in the list element

function renderLeads(urls) {
  let listItems = "";
  //Note +++++  Refactor the onclick function on the i element
  for (let i = 0; i < urls.length; i++) {
    listItems += `
            <li>
                <a target='_blank' href='${urls[i]}'>${urls[i]}</a> 
            </li>
        `;
  }
  list.innerHTML = listItems;
}

// Adding event listener to delete all button to delete all the URLs saved
deleteAllBtn.addEventListener("click", deleteAllLeads);
function deleteAllLeads() {
  remove(databaseReference);
  list.innerHTML = "";
  myUrls = [];
}

onValue(databaseReference, (snapshot) => {
  const isContentinDatabase = snapshot.exists();
  if (isContentinDatabase) {
    const snapshotValues = snapshot.val();
    myUrls = Object.values(snapshotValues);
    renderLeads(myUrls);
  }
});
