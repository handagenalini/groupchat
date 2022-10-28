

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const signup = document.getElementById("signup");
signup.addEventListener("click", (e) => {
    const nametag = document.getElementById("name");
    const name = nametag.value;
    const emailtag = document.getElementById("email");
    const email = emailtag.value;
    const phonetag = document.getElementById("phone");
    const phone = phonetag.value;
    const passwordtag = document.getElementById("password");
    const password = passwordtag.value;
    let userdetails = {
        name: name,
        email: email,
        phone: phone,
        password: password,
    };
    axios_1.default.post("/signupUser", userdetails).then((result) => {
        alert(result);
    });
});