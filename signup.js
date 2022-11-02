console.log("Hello");

let myForm = document.getElementById("signup-form");

myForm.addEventListener("submit", signup);

async function signup(event) {
  event.preventDefault();

  let form = new FormData(myForm);
  let obj = {};
  for (const [key, value] of form) {
    obj[key] = value;
  }

  try {
    let res = await axios({
      method: "post",
      url: api + "user/signup",
      data: obj,
    });

    if (res.status === 201) {
      alert("SignUp Done");
      window.location = "./login.html";
    } else {
      alert(res.data.message);
    }
  } catch (err) {
    console.log(err);
  }
}