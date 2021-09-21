/*    JavaScript 6th Edition
 *    Chapter 8
 *    Chapter case

 *    Golden Rocks National Park 
 *    Author: Mickey Saine
 *    Date:   20 March 2021

 *    Filename: contactus.js
 */

"use strict";

// global variables
var profile = {};
var HackerSpace = [];
var objectString;
var arrayString;

// validate entered username
function validateUsername() {
   var unInput = document.getElementById("name");
   var errorDiv = document.getElementById("usernameError");
   
   try {
//      if (unInput.value.length < 4) {
      if (/.{4,}/.test(unInput.value) === false) {
          throw "Username must be at least 4 characters long";
      } else if (/\W/.test(unInput.value) === true) {
          throw "Username must contain only letters and numbers";
      }

      // remove any username error styling and message
      unInput.style.background = "";
      errorDiv.style.display = "none";
      errorDiv.innerHTML = "";
      // copy valid username value to profile object
      profile.username = unInput.value;
      // copy profile.username value to profile section
      document.getElementById("profileUsername").innerHTML = profile.username;
      // make profile section and username section visible
      document.getElementById("profile").style.display = "block";
      document.getElementById("usernameSection").style.display = "block";
   }
   catch(msg) {
      // display error message
      errorDiv.style.display = "block";
      errorDiv.innerHTML = msg;
      // change input style
      unInput.style.background = "rgb(255,233,233)";
   }
}

// validate entered email
function validateEmail() {
   var emailInput = document.getElementById("email");
   var errorDiv = document.getElementById("emailError");
   var emailCheck = /^[_\w\-]+(\.[_\w\-]+)*@[\w\-]+(\/[\w\-]+)*(\.[\D]{2,6})$/;
   try {
//      if (emailInput.value.search(/@/) === -1 || emailInput.value.lastIndexOf(".") === -1) {
//          throw "Please provide a valid email address";
//      }
//      if (
//          (/@/.test(emailInput.value) === false) || (
//            (/\...$/.test(emailInput.value) === false) && 
//            (/\....$/.test(emailInput.value) === false) &&
//            (/\.....$/.test(emailInput.value) === false) && 
//            (/\......$/.test(emailInput.value) === false)
//          )  
//      ) {
//      if ((/@/.test(emailInput.value) === false) || 
//          (/\..{2,6}$/.test(emailInput.value) === false)) {
    if (emailCheck.test(emailInput.value) === false) {
       throw "Please provide a valid email address";   
    }

      // remove any email error styling and message
      emailInput.style.background = "";
      errorDiv.innerHTML = "";
      errorDiv.style.display = "none";
      // convert email address to lowercase
      emailInput.value = emailInput.value.toLowerCase();
      // copy valid email value to profile object
      profile.email = emailInput.value;
      // copy profile.email value to profile section
      document.getElementById("profileEmail").innerHTML = profile.email;
      // make profile section and email section visible
      document.getElementById("profile").style.display = "block";
      document.getElementById("emailSection").style.display = "block";
   }
   catch(msg) {
      // display error message
      errorDiv.innerHTML = msg;
      errorDiv.style.display = "block";
      // change input style
      emailInput.style.background = "rgb(255,233,233)";
   }
}

// add lodging to profile
function registerLodging(event) {
   if (event === undefined) { // get caller element in IE8
      event = window.event;
   }
   var callerElement = event.target || event.srcElement;
   var lodgingName = callerElement.value;
   if (callerElement.checked) { // if box has just been checked
      // add checkbox value to lodging array
      lodging.push(lodgingName);

      // add checkbox value to list in profile section
      var newLodging = document.createElement("li");
      newLodging.innerHTML = lodgingName;
      document.getElementById("profileHackerSpace").appendChild(newLodging);
      // make profile section and lodging section visible
      document.getElementById("profile").style.display = "block";
      document.getElementById("HackerSpaceSection").style.display = "block";
   } else { // if box has just been unchecked
      var listItems = document.querySelectorAll("#profileHackerSpace li");
      for (var i = 0; i < listItems.length; i++) {
         if (listItems[i].innerHTML === lodgingName) {
            // remove element at index i from array
            lodging.splice(i,1);
            // remove lodging from profile list
            listItems[i].parentNode.removeChild(listItems[i]);
            break;
         }
      }
   }
}

// convert form input to strings for submission
function convertToString() {
    // convert information array to string
    queryArray = information.toString();
    // convert profile object to string
    objectString = JSON.stringify(profile);
}

function createEventListeners() {
   var unInput = document.getElementById("name");
   var emailInput = document.getElementById("email");
   if (unInput.addEventListener) {
      unameInput.addEventListener("change", validateUsername, false); 
      emailInput.addEventListener("change", validateEmail, false); 
   } else if (unInput.attachEvent) {
      unameInput.attachEvent("onchange", validateUsername);
      emailInput.attachEvent("onchange", validateEmail);
   }
   
   var HackerSpace = document.getElementsByName("HackerSpace");
   if (HackerSpace[0].addEventListener) {
      for (var i = 0; i < HackerSpace.length; i++) {
         HackerSpace[i].addEventListener("change", registerLodging, false);
      }
   } else if (HackerSpace[0].attachEvent) {
      for (var i = 0; i < HackerSpace.length; i++) {
         HackerSpace[i].attachEvent("onchange", registerLodging);
      }
   }
}

function parseData(){
  var formData = decodeURIComponent(location.search);
  var formArray = [];
  var list = document.querySelector("div.results ul");
  formData = formData.substring(1, formData.length);
  while(formData.indexOf("+") !== -1){
    formData = formData.replace("+", " ");
  }
  formData = decodeURIComponent(formData);
  formArray = formData.split("&");
  for(var i = 0; i<formArray.length; i++){
    var newItem = document.createElement("li");
    newItem.innerHTML = formArray[i];
    list.appendChild(newItem);
  }
}


if (window.addEventListener) {
   window.addEventListener("load", createEventListeners, false);
} else if (window.attachEvent) {
   window.attachEvent("onload", createEventListeners);
}