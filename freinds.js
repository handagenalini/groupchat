let friendTable = document.getElementById("friend-list");
let chatTable = document.getElementById("chat-list");
let createGroup = document.getElementById("create-group");
let checkBox = document.getElementById("check-box");
console.log("----------------------------------in freind")

window.addEventListener("DOMContentLoaded", getAllFriends);
window.addEventListener("DOMContentLoaded", groupList);

async function getAllFriends() {
  try {
    let res = await axios({ method: "get", url: api + "friend" });

    let friendTableHead = `
    <thead>
    <th>Friend Name</th>
    <th>Start Chat</th>
    </thead>
    
    `;

    let tableBody = document.createElement("tbody");
    let friends = res.data.data.friends;
    console.log("----------------------------------in freind===============================")
    console.log(friends)

    for (const friend of friends) {
      let tr = `
        <tr>
        <td>${friend.name}</td>
        <td><button class="btn btn-primary" onclick="startChat(this)" value="${friend.id}">Start Chat</button></td>
        </tr>
        
        `;

      tableBody.innerHTML += tr;
    }

    friendTable.innerHTML += friendTableHead;
    friendTable.appendChild(tableBody);
  } catch (err) {
    console.log(err);
  }
}

// Start Chat

async function startChat(event) {
  localStorage.setItem("chat", event.value);

  window.location = "./chat.html";
}

// Registered Group
let groupTable = document.getElementById("group-list");
async function groupList(event) {
  try {
    let res = await axios({ method: "get", url: api + "user/group/list" });

    let groupTableHead = `
    <thead>
    <th>Group Name</th>
    <th>Start Chat</th>
    <th> Admin </th>
    </thead>
    
    `;

    let tableBody = document.createElement("tbody");
    let groups = res.data.data.groups;
    let self = localStorage.getItem("self");

    for (const group of groups) {
      let isAdmin = "";

      if (group.isAdmin === true) {
        isAdmin = `<td><button class="btn btn-info" onclick="adminPage(this)" value="${group.group.id}">Admin</button></td>`;
      }

      let tr = `
        <tr>
        <td>${group.group.name}</td>
        <td><button class="btn btn-primary" onclick="startGroupChat(this)" value="${group.group.id}">Start Chat</button></td>
        ${isAdmin}
        </tr>
        
        `;

      tableBody.innerHTML += tr;
    }

    groupTable.innerHTML += groupTableHead;
    groupTable.appendChild(tableBody);
  } catch (err) {
    console.log(err);
  }
}

// Open Group Chat

function startGroupChat(event) {
  localStorage.setItem("groupChat", event.value);

  window.location = "./groupchat.html";
}

function adminPage(event) {
  localStorage.setItem("groupChat", event.value);
  window.location = "./admin.html";
}
window.addEventListener("DOMContentLoaded", listFriends);

async function listFriends() {
  try {
    let res = await axios({ method: "get", url: api + "friend" });

    let data = res.data.data.friends !== undefined ? res.data.data.friends : [];

    for (const friend of data) {
      let id = friend.id;
      let name = friend.name;

      let structure = `
      <input
        class="form-check-input"
        type="checkbox"
        value="${id}"
        id="flexCheckDefault"
        name="${name}-${id}"
      />
      <label class="form-check-label" for="flexCheckDefault">
       ${name}
      </label>
    `;

      let ele = document.createElement("div");
      ele.innerHTML = structure;
      ele.setAttribute("class", "form-check ms-3");

      checkBox.appendChild(ele);
    }
  } catch (err) {
    console.log(err);
  }
}

createGroup.addEventListener("submit", async (event) => {
  event.preventDefault();
  console.log("Form");
  let form = new FormData(createGroup);

  let obj = {};
  obj["users"] = [];
  for (const [key, value] of form) {
    if (key === "name") {
      obj["name"] = value;
    } else {
      obj["users"].push(Number(value));
    }
  }

  try {
    let res = axios({ method: "post", url: api + "group/create", data: obj });

    if (res.data.status === "success") {
      alert("Group Created");
      window.location.reload();
    } else {
      console.log("error");
    }
  } catch (err) {
    console.log(err);
  }
});