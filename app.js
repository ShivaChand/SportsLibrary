let container = document.querySelector(".container");
let newSport = document.querySelector("#newsport");
let closeAdd = document.querySelector(".closeAdd");
let closeDelete = document.querySelector(".closeDelete");
let yesDelete = document.querySelector("#yes");
let noDelete = document.querySelector("#no");
let addsportdiv = document.querySelector(".mainDiv2 ");
let deletesportdiv = document.querySelector(".deleteDiv ");
let savebtn = document.querySelector("input[name='save']");
let updatebtn = document.querySelector("input[name='update']");
var table = document.querySelector("#table1");
var tables = document.querySelector(".records");
let pagination = document.querySelector('.pagination');
var popupTitle = document.querySelector(".head .span1");
var searched = document.querySelector('#search');
// console.log(searched);
var totalRecordInStorage;


// Login Validation


function loginValidation() {

  var loginCredentials =JSON.parse(localStorage.getItem("loginCredentials"));
  let username = document.querySelector("#uname");
  let password = document.querySelector("#pswd");
  let target = document.querySelector("#login");
  let userlogged = document.querySelector('#username');

  if (loginCredentials.uname == username.value && loginCredentials.pswd == password.value) {
    alert("Login Successful.");
    target.setAttribute("href", "dashboard.html");
    userlogged.innerHTML =`${loginCredentials.uname}`;
  } else if (username.value == "" || password.value == "") {
    alert("All Feilds Required.");
    target.setAttribute("href", "#");
  } else {
    alert("Invalid Credentials.");
    target.setAttribute("href", "#");
  }
}

// SignUp
function signUp() {
  var username = document.querySelector("#uname").value;
  var password = document.querySelector("#pswd").value;

  var loginCredentials = {
    "uname":username,
    "pswd":password
  };
  console.log(loginCredentials);
  if (username.value != "" && password.value != "") {
    alert("SignUp Successful.");
  } else if (username.value == "" || password.value == "") {
    alert("All Feilds Required.");
  } else {
    alert("Invalid Credentials.");
  }
  localStorage.setItem('loginCredentials',JSON.stringify(loginCredentials));
}


// Event Listeners

newSport.addEventListener("click", addsport);

closeAdd.addEventListener("click", close);
closeDelete.addEventListener("click", close);
noDelete.addEventListener("click", close);

savebtn.addEventListener("click", addingsport);

// Display the popup division of sport

function addsport() {
  popupTitle.textContent = "New Sport";
  addsportdiv.style.display = "block";
  savebtn.style.display = "inline-block";
  updatebtn.style.display = "none";
  addsportdiv.querySelector("input[name='sportname']").value = "";
  addsportdiv.querySelector("input[name='about']").value = "";
  addsportdiv.querySelector("#org").textContent = "Origin Country";
  addsportdiv.querySelector("input[name='members']").value = "";
  addsportdiv.querySelector("#type").textContent = "Type Of Sport";
  addsportdiv.querySelector("#eqp").textContent = "Equipment Used";
  addsportdiv.querySelector("#btn2").value = "Save";
  container.style.filter = "contrast(40%)";
}

// Hide the popup division of sport
function close() {
  addsportdiv.style.display = "none";
  deletesportdiv.style.display = "none";
  container.style.filter = "contrast(100%)";
}

// Reading the user entered inputs & creating an object of values
function readInputFeilds() {
  let name = document.querySelector("input[name='sportname']").value;
  let about = document.querySelector("input[name='about']").value;
  let origin = document.querySelector("select[name='origin']").value;
  let members = document.querySelector("input[name='members']").value;
  let type = document.querySelector("select[name='type']").value;
  let equipment = document.querySelector("select[name='equipment']").value;

  if (name != '' && origin != '' && members != '' && type != '' && equipment != '') {
    if (members != 0) {
      var obj = new sport(name, about, origin, members, type, equipment);
      return obj;
    }
    else {
      alert("Members cannot be zero(0).");
    }

  }
  else {
    alert("All * feilds are mandatory.");
  }

}

// Object Constructor
function sport(name, about, origin, members, type, equipment) {
  this.name = name;
  this.about = about;
  this.origin = origin;
  this.members = members;
  this.type = type;
  this.equipment = equipment;
}

// Adding new sport into the local storage
function addingsport() {
  var obj = readInputFeilds();

  if(obj != null)
  {
  saveIntoStorage(obj);
  alert("Added Successfully.");
  close();
  location.reload();
  }
}

// Storing into local storage
function saveIntoStorage(sportsobj) {
  let Sports = getSportsFromStorage();

  Sports.push(sportsobj);

  localStorage.setItem("Sports", JSON.stringify(Sports));
}

// Get the contents from storage
function getSportsFromStorage() {
  let sports;

  if (localStorage.getItem("Sports") === null) {
    Sports = [];
  } else {
    Sports = JSON.parse(localStorage.getItem("Sports"));
  }

  return Sports;
}




// Updating existing Records with new values

var indexNo;

function gettingRowValues(edit) {
  popupTitle.textContent = "Edit Sport";
  addsportdiv.style.display = "block";
  savebtn.style.display = "none";
  updatebtn.style.display = "inline-block";
  container.style.filter = "contrast(40%)";

  // getting the particular table row
  const sportRow = edit.target.parentElement.parentElement;

  //getting existing row values into input feilds
  indexNo = sportRow.querySelector(".indexNo").textContent - 1;

  addsportdiv.querySelector("input[name='sportname']").value = sportRow.querySelector(".name").textContent;
  addsportdiv.querySelector("input[name='about']").value = sportRow.querySelector(".about").textContent;
  addsportdiv.querySelector("#org").textContent = sportRow.querySelector(".origin").textContent;
  addsportdiv.querySelector("input[name='members']").value = sportRow.querySelector(".members").textContent;
  addsportdiv.querySelector("#type").textContent = sportRow.querySelector(".type").textContent;
  addsportdiv.querySelector("#eqp").textContent = sportRow.querySelector(".equipment").textContent;

}



function updateRecord(event) {
  let obj = readInputFeilds();
  console.log(obj);
  let Sports = getSportsFromStorage();

  Sports[indexNo] = obj;
  localStorage.setItem("Sports", JSON.stringify(Sports));
  close();
  alert("Updated Successfully.");
  location.reload();
}



// Deleting an object from storage & from dashboard
function deletesport(del) {
  deletesportdiv.style.display = "block";
  container.style.filter = "contrast(40%)";
  console.log(del);
  const sportRow = del.target.parentElement.parentElement;

  indexNo = sportRow.querySelector(".indexNo").textContent - 1;
}

function deleteObj() {
  let Sports = getSportsFromStorage();

  Sports.splice([indexNo], 1);
  localStorage.setItem("Sports", JSON.stringify(Sports));
  close();
  alert("Deleted Successfully.");
  location.reload();
}






document.addEventListener('DOMContentLoaded', createPages);
function createPages() {
  var loginCredentials =JSON.parse(localStorage.getItem("loginCredentials"));
const userlogged = document.querySelector('#username');
userlogged.textContent =`${loginCredentials.uname}`;

  let Sports = getSportsFromStorage();
  totalRecordInStorage = Sports.length;
  var noOfPages = Math.ceil(totalRecordInStorage / 10);
  for (var i = 1; i <= noOfPages; i++) {
    var page = document.createElement('a');
    page.setAttribute('href', `#`);
    page.setAttribute('id', `page${i}`);
    page.setAttribute('onclick', 'paginationselection(this)')
    page.textContent = `${i}`;
    pagination.appendChild(page);
  }
  var gt = document.createElement('a')
  gt.setAttribute('href', `#`);
  gt.innerHTML = `&gt`;
  pagination.appendChild(gt);

  retreiveRecords(noOfPages);
}


// Retrive Records from local storage & display in dashboard
function retreiveRecords(noOfPages) {
  var limit = 0;
  for (var element = 0; element < totalRecordInStorage; element++) {
    if (limit < 10) {
      var row = document.createElement("tr");
      row.innerHTML = `<td class="indexNo" >${Sports.indexOf(Sports[element]) + 1}</td>
              <td class="name">${Sports[element].name}</td>
              <td class="about">${Sports[element].about}</td>
              <td class="origin">${Sports[element].origin}</td> 
              <td class="members"> ${Sports[element].members}</td>
              <td class="type"> ${Sports[element].type}</td> 
              <td class="equipment"> ${Sports[element].equipment}</td>
              <td><img src="images/baseline-border_color-24px.png" class="${Sports.indexOf(Sports[element])}" id="edit">&nbsp&nbsp
              &nbsp&nbsp<img src="images/baseline-delete-24px.png" class="${Sports.indexOf(Sports[element])}" id="delete"></td>`;
      table.appendChild(row);
      limit++;
    }
  }

  var edit;
  var delet;
  for (var i = 0; i < 10; i++) {
    edit = document.getElementsByClassName(`${i}`)[0];
    delet = document.getElementsByClassName(`${i}`)[1];
    edit.addEventListener("click", gettingRowValues);
    delet.addEventListener("click", deletesport);
  }

}



function paginationselection(pageno) {
  let pageNo = pageno.textContent;
  var recordsToRetrive = (pageNo * 10) - 10;
  var limit = 0;
  let Sports = getSportsFromStorage();
  table.innerHTML = `<tr>
  <th>#</th>
  <th>Sport</th>
  <th>About</th>
  <th>Origin</th>
  <th>Members&nbsp;<button style="background-color:#FFFFFF;border:none;color: #A1A9A7;"><i class="fas fa-caret-down"></i></button></th>
  <th>Type</th>
  <th>Equipment</th>
  <th>Actions</th>
  </tr>`;
  for (var element = recordsToRetrive; element < totalRecordInStorage; element++) {
    if (limit < 10) {
      var row = document.createElement("tr");
      row.innerHTML = `<td class="indexNo" >${Sports.indexOf(Sports[element]) + 1}</td>
          <td class="name">${Sports[element].name}</td>
          <td class="about">${Sports[element].about}</td>
          <td class="origin">${Sports[element].origin}</td> 
          <td class="members"> ${Sports[element].members}</td>
          <td class="type"> ${Sports[element].type}</td> 
          <td class="equipment"> ${Sports[element].equipment}</td>
          <td><img src="images/baseline-border_color-24px.png" class="${Sports.indexOf(Sports[element])}" id="edit">&nbsp&nbsp
          &nbsp&nbsp<img src="images/baseline-delete-24px.png" class="${Sports.indexOf(Sports[element])}" id="delete"></td>`;
      table.appendChild(row);
      limit++;
    }
  }

  var edit;
  var delet;
  for (var i = recordsToRetrive; i < recordsToRetrive + 10; i++) {
    edit = document.getElementsByClassName(`${i}`)[0];
    delet = document.getElementsByClassName(`${i}`)[1];
    edit.addEventListener("click", gettingRowValues);
    delet.addEventListener("click", deletesport);
  }
}




// Search Functionality
function searchFun(searchedvalue) {
  let Sports = getSportsFromStorage();
  
    Sports = Sports.filter(search => {
      if ((search.name === searchedvalue) || (search.about === searchedvalue) || (search.origin === searchedvalue) || (search.members === searchedvalue) || (search.type === searchedvalue) || (search.equipment === searchedvalue))
      {
        console.log(search);
        return search;
      }
    });
    console.log(Sports);

    
    var limit = 0;
    table.innerHTML = `<tr>
  <th>#</th>
  <th>Sport</th>
  <th>About</th>
  <th>Origin</th>
  <th>Members&nbsp;<button style="background-color:#FFFFFF;border:none;color: #A1A9A7;"><i class="fas fa-caret-down"></i></button></th>
  <th>Type</th>
  <th>Equipment</th>
  <th>Actions</th>
  </tr>`;
  for (var element = 0; element < Sports.length; element++) {
    if (limit < 10) {
      var row = document.createElement("tr");
      row.innerHTML = `<td class="indexNo" >${Sports.indexOf(Sports[element]) + 1}</td>
              <td class="name">${Sports[element].name}</td>
              <td class="about">${Sports[element].about}</td>
              <td class="origin">${Sports[element].origin}</td> 
              <td class="members"> ${Sports[element].members}</td>
              <td class="type"> ${Sports[element].type}</td> 
              <td class="equipment"> ${Sports[element].equipment}</td>
              <td><img src="images/baseline-border_color-24px.png" class="${Sports.indexOf(Sports[element])}" id="edit">&nbsp&nbsp
              &nbsp&nbsp<img src="images/baseline-delete-24px.png" class="${Sports.indexOf(Sports[element])}" id="delete"></td>`;
      table.appendChild(row);
      limit++;
    }
  }

  var edit;
  var delet;
  for (var i = 0; i < Sports.length; i++) {
    edit = document.getElementsByClassName(`${i}`)[0];
    delet = document.getElementsByClassName(`${i}`)[1];
    edit.addEventListener("click", gettingRowValues);
    delet.addEventListener("click", deletesport);
  }

  }


function searchFunctions(search) {
  searchFun(search.value);
}