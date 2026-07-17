// =====================================
// ResumeIQ AI
// login.js
// =====================================


// ----------------------------
// DOM
// ----------------------------

const loginForm = document.getElementById("loginForm");

const email = document.getElementById("email");

const password = document.getElementById("password");

const togglePassword = document.getElementById("togglePassword");


// ----------------------------
// Show / Hide Password
// ----------------------------

togglePassword.addEventListener("click", () => {

    if (password.type === "password") {

        password.type = "text";

        togglePassword.classList.remove("fa-eye");

        togglePassword.classList.add("fa-eye-slash");

    }

    else {

        password.type = "password";

        togglePassword.classList.remove("fa-eye-slash");

        togglePassword.classList.add("fa-eye");

    }

});


// ----------------------------
// Login
// ----------------------------

loginForm.addEventListener("submit", function (e) {

    e.preventDefault();


    const userEmail = email.value.trim();

    const userPassword = password.value.trim();


    // Empty Fields

    if (userEmail === "" || userPassword === "") {

        alert("Please fill all fields.");

        return;

    }


    // Get User

    const user = JSON.parse(

        localStorage.getItem("resumeUser")

    );


    if (!user) {

        alert("No account found. Please Sign Up first.");

        return;

    }


    // Check Email

    if (

        user.email !== userEmail ||

        user.password !== userPassword

    ) {

        alert("Invalid Email or Password.");

        return;

    }


    // Save Login Session

    localStorage.setItem(

        "isLoggedIn",

        "true"

    );


    localStorage.setItem(

        "loggedUser",

        JSON.stringify(user)

    );


    alert("Login Successful 🎉");


    window.location.href =

        "upload.html";

});