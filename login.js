// function login(e) {
//     e.preventDefault();
//     // console.log(e.target.name);
//     const form = new FormData(e.target);
//     console.log('12345')

//     const loginDetails = {
//         email: form.get("email"),
//         password: form.get("password")

//     }
//     console.log(loginDetails)
//     axios.post('http://localhost:3000/login',loginDetails).then(response => {
//         console.log('index1')
//         if(response.status === 200){
//             console.log("---------------------------")
//             console.log('index')
//             localStorage.setItem('token', response.data.token);
//             localStorage.setItem('userDetails', JSON.stringify(response.data.user))

//             window.location.href = "./friends.html" // change the page on successful login
//         } else {
//             throw new Error('Failed to login')
//         }
//     }).catch(err => {
//         document.body.innerHTML += `<div style="color:red;">${err} <div>`;
//     })
// }
// function forgotpassword() {
//     window.location.href = "../ForgotPassword/index.html"
// }
localStorage.removeItem("chat");
localStorage.removeItem("message");
localStorage.removeItem("to");
localStorage.removeItem("group_messages");
localStorage.removeItem("token");
localStorage.removeItem("groupChat");
localStorage.removeItem("self");
let myForm = document.getElementById("login-form");

myForm.addEventListener("submit", login);

async function login(event) {
  event.preventDefault();

  let form = new FormData(myForm);
  let obj = {};
  for (const [key, value] of form) {
    obj[key] = value;
  }

  try {
    let res = await axios({
      method: "post",
      url: api + "user/login",
      data: obj,
    });

    if (res.status === 200) {
      let token = res.headers.token;
      localStorage.setItem("token", token);
      if (res.data.self) {
        localStorage.setItem("self", res.data.self);
      }
      alert("Login Done");

      window.location = "./friends.html";
    } else {
      alert(res.data.message);
    }
  } catch (err) {
    console.log(err);
  }
}
