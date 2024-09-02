// Initialize Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

const body = document.querySelector("body"),
      modeToggle = document.querySelector(".dark-light"),

      sideBar = document.getElementById('sideBar'),
      menuBtn = document.getElementById('menuIcon'),
      menuClose = document.getElementById('menuClose'),

      search = document.getElementById('search'),
      searchBtn = document.getElementById('searchIcon'),
      searchClose = document.getElementById('searchClose'),
      
      login = document.getElementById('login'),
      loginBtn = document.getElementById('userIcon'),
      loginClose = document.getElementById('loginClose'),
      loginLink = document.getElementById('loginLink'),

      signUp = document.getElementById('signUp'),
      signUpClose = document.getElementById('signUpClose'),
      signUpLink = document.getElementById('signUpLink');

// Toggle dark and light mode
modeToggle.addEventListener("click", () => {
    modeToggle.classList.toggle("active");
    body.classList.toggle("dark");
});

/=============== MENU SIDE BAR ===============/
// Show and hide side bar when menu icon clicked
menuBtn.addEventListener('click', () => {
  sideBar.classList.toggle('showSidebar');
});

// Hide side bar
menuClose.addEventListener('click', () => {
  sideBar.classList.remove('showSidebar');
});

/=============== SEARCH ===============/
// Show search box
searchBtn.addEventListener('click', () => {
    search.classList.add('showSearch');
});

// Hide search box
searchClose.addEventListener('click', () => {
    search.classList.remove('showSearch');
});

/=============== LOGIN ===============/
/* Login show */
loginBtn.addEventListener('click', () =>{
  login.classList.add('showLogin');
});

/* Login hidden */
loginClose.addEventListener('click', () =>{
  login.classList.remove('showLogin');
});

// Handle "Login" link click
loginLink.addEventListener('click', () => {
  signUp.classList.remove('showSignUp'); // Hide sign-up form
  login.classList.add('showLogin'); // Show login form
});

/=============== SIGN UP ===============/
// Handle "Sign Up" link click
signUpLink.addEventListener('click', () => {
  login.classList.remove('showLogin'); // Hide login form
  signUp.classList.add('showSignUp'); // Show sign-up form
});

/* Sign Up hidden */
signUpClose.addEventListener('click', () =>{
  signUp.classList.remove('showSignUp');
});

const firebaseConfig = {
  apiKey: "AIzaSyAC1ZQVYVCu6sEr1jRuBgWHOdPzyqAxJUA",
  authDomain: "youthxhackathon.firebaseapp.com",
  projectId: "youthxhackathon",
  storageBucket: "youthxhackathon.appspot.com",
  messagingSenderId: "117239274513",
  appId: "1:117239274513:web:b9359ed98e583e42f325b0"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Select input fields
const emailField = document.getElementById('loginEmail');
const passwordField = document.getElementById('loginPassword');

// Select the login button
const loginButton = document.querySelector('.loginButton');
const signUpButton = document.querySelector('.signUpButton');

// Handle login on button click
loginButton.addEventListener("click", function(event) {
    event.preventDefault(); // Prevent form from submitting

    const email = emailField.value;
    const password = passwordField.value;

    // Authenticate user
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        alert(`Welcome, ${user.email}!`);
        // Redirect to a different page or perform other actions
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(`Error: ${errorMessage}`);
      });
});

// Handle Sign Up on button click
signUpButton.addEventListener("click", function(event) {
  event.preventDefault(); // Prevent form from submitting

  const name = document.getElementById('signUpName').value;
  const email = document.getElementById('signUpEmail').value;
  const password = document.getElementById('signUpPassword').value;
  const confirmPassword = document.getElementById('signUpConfirmPassword').value;

  // Console logs for debugging
  console.log('Email:', email);
  console.log('Password:', password);
  console.log('Confirm Password:', confirmPassword);

  // Basic validation
  if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
  }

  // Authenticate user
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      alert(`Welcome, ${name}!`);
      // Redirect to a different page or perform other actions
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(`Error: ${errorMessage}`);
    });
});
