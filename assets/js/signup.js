// =====================================
// ResumeIQ AI
// signup.js
// =====================================


// -------------------------
// DOM Elements
// -------------------------

const signupForm = document.getElementById("signupForm");

const fullName = document.getElementById("fullName");

const email = document.getElementById("email");

const password = document.getElementById("password");

const confirmPassword = document.getElementById("confirmPassword");

const terms = document.getElementById("terms");

const togglePassword = document.getElementById("togglePassword");

const strengthBar = document.getElementById("strengthBar");

const strengthText = document.getElementById("strengthText");


// -------------------------
// Show / Hide Password
// -------------------------

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


// -------------------------
// Password Strength
// -------------------------

password.addEventListener("input", () => {

    const value = password.value;

    let strength = 0;

    if (value.length >= 8) strength++;

    if (/[A-Z]/.test(value)) strength++;

    if (/[0-9]/.test(value)) strength++;

    if (/[^A-Za-z0-9]/.test(value)) strength++;

    switch (strength) {

        case 1:

            strengthBar.style.width = "25%";
            strengthBar.style.background = "#ff4d4d";
            strengthText.innerText = "Weak Password";
            break;

        case 2:

            strengthBar.style.width = "50%";
            strengthBar.style.background = "#ff9800";
            strengthText.innerText = "Medium Password";
            break;

        case 3:

            strengthBar.style.width = "75%";
            strengthBar.style.background = "#ffc107";
            strengthText.innerText = "Strong Password";
            break;

        case 4:

            strengthBar.style.width = "100%";
            strengthBar.style.background = "#4CAF50";
            strengthText.innerText = "Very Strong Password";
            break;

        default:

            strengthBar.style.width = "0%";
            strengthText.innerText = "Password Strength";

    }

});


// -------------------------
// Signup
// -------------------------

signupForm.addEventListener("submit", function(e){

    e.preventDefault();

    const user = {

        name: fullName.value.trim(),

        email: email.value.trim(),

        password: password.value.trim()

    };


    if(

        user.name === "" ||

        user.email === "" ||

        user.password === ""

    ){

        alert("Please fill all fields.");

        return;

    }


    if(user.password.length < 8){

        alert("Password should be at least 8 characters.");

        return;

    }


    if(user.password !== confirmPassword.value.trim()){

        alert("Passwords do not match.");

        return;

    }


    if(!terms.checked){

        alert("Please accept Terms & Conditions.");

        return;

    }


    // Check Existing User

    const existingUser = JSON.parse(

        localStorage.getItem("resumeUser")

    );

    if(existingUser && existingUser.email === user.email){

        alert("Email already registered.");

        return;

    }


    // Save User

    localStorage.setItem(

        "resumeUser",

        JSON.stringify(user)

    );


    alert("🎉 Account Created Successfully!");


    window.location.href = "login.html";

});