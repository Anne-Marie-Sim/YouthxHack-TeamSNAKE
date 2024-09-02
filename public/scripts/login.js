// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {
    const body = document.querySelector("body"),
          modeToggle = document.querySelector(".dark-light"),

          sideBar = document.getElementById('sidebar'),
          menuBtn = document.getElementById('menuIcon'),
          menuClose = document.getElementById('menuClose'),
          
          search = document.getElementById('search'),
          searchBtn = document.getElementById('searchIcon'),
          searchClose = document.getElementById('searchClose'),
          
          login = document.getElementById('login'),
          userBtn = document.getElementById('userIcon'),
          loginClose = document.getElementById('loginClose'),
          loginLink = document.getElementById('loginLink'),
          
          signUp = document.getElementById('signUp'),
          signUpClose = document.getElementById('signUpClose'),
          signUpLink = document.getElementById('signUpLink'),
          
          loggedUser = document.getElementById('loggedUser'),
          loggedUserClose = document.getElementById('loggedUserClose');


    // Toggle dark and light mode
    modeToggle.addEventListener("click", () => {
        modeToggle.classList.toggle("active");
        body.classList.toggle("dark");
    });

    // Show and hide side bar when menu icon clicked
    menuBtn.addEventListener('click', () => {
        sideBar.classList.toggle('showSidebar');
    });

    // Hide side bar
    menuClose.addEventListener('click', () => {
        sideBar.classList.remove('showSidebar');
    });

    // Show search box
    searchBtn.addEventListener('click', () => {
        search.classList.add('showSearch');
    });

    // Hide search box
    searchClose.addEventListener('click', () => {
        search.classList.remove('showSearch');
    });

    // Show login form
    userBtn.addEventListener('click', () => {
        login.classList.add('showLogin');
    });

    // Hide login form
    loginClose.addEventListener('click', () => {
        login.classList.remove('showLogin');
    });

    // Handle "Login" link click
    loginLink.addEventListener('click', () => {
        signUp.classList.remove('showSignUp'); // Hide sign-up form
        login.classList.add('showLogin'); // Show login form
    });

    // Handle "Sign Up" link click
    signUpLink.addEventListener('click', () => {
        login.classList.remove('showLogin'); // Hide login form
        signUp.classList.add('showSignUp'); // Show sign-up form
    });

    // Hide sign-up form
    signUpClose.addEventListener('click', () => {
        signUp.classList.remove('showSignUp');
    });

    // Hide loggedUser form
    loggedUserClose.addEventListener('click', () => {
        loggedUser.classList.remove('showLoggedUser'); // Hide loggedUser form
    });


    // =============== FIREBASE ===============
    const firebaseConfig = {
        apiKey: "AIzaSyAKvjxNBWJFoLiVbTYN6ks3CL5clqWd_zw",
        authDomain: "youthxhack-teamsnake.firebaseapp.com",
        databaseURL: "https://youthxhack-teamsnake-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: "youthxhack-teamsnake",
        storageBucket: "youthxhack-teamsnake.appspot.com",
        messagingSenderId: "180498244497",
        appId: "1:180498244497:web:e463ab124fdf965f5c3030",
        measurementId: "G-V6JDMV148Q"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getFirestore(app);

    // Select input fields and buttons
    const emailField = document.getElementById('loginEmail');
    const passwordField = document.getElementById('loginPassword');
    const loginButton = document.querySelector('.loginButton');
    const signUpButton = document.querySelector('.signUpButton');
    const logOutUserButton = document.querySelector('.logOutUserButton');


    // Function to show user details or login form based on authentication state
    function toggleUserDetails() {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                console.log("User is logged in:", user.email);
                const userDocRef = doc(db, "users", user.uid);
                const userDoc = await getDoc(userDocRef);

                if (userDoc.exists()) {
                    const userData = userDoc.data();

                    // Set the input values to the user's name and email
                    document.getElementById('loggedUserName').value = userData.name;
                    document.getElementById('loggedUserEmail').value = userData.email;

                    // Show the logged user section
                    loggedUser.classList.add('showLoggedUser');
                    
                    // Hide the login form if it's open
                    login.classList.remove('showLogin');
                } else {
                    console.log("No such document!");
                }
            } else {
                console.log("No user is logged in");
                // Show the login form and hide the logged user details section
                loggedUser.classList.remove('showLoggedUser');
                login.classList.add('showLogin');
                signUp.classList.remove('showSignUp');
            }
        });
    }

    // Show user details or login form when the user icon is clicked
    userBtn.addEventListener('click', () => {
        toggleUserDetails();
    });

    // Hide the loggedUser form when the close button is clicked
    loggedUserClose.addEventListener('click', () => {
        loggedUser.classList.remove('showLoggedUser');
    });

    // Initial call to set up UI based on current authentication state
    toggleUserDetails();

    // Handle login on button click
    loginButton.addEventListener("click", async function(event) {
        event.preventDefault(); // Prevent form from submitting

        const email = emailField.value;
        const password = passwordField.value;

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            alert(`Welcome back, ${user.email}!`);

            const userDocRef = doc(db, "users", user.uid);
            const userDoc = await getDoc(userDocRef);

            if (userDoc.exists()) {
                console.log("User data:", userDoc.data());
                // Update UI with user data if necessary
            } else {
                console.log("No such document!");
            }
            // Redirect to a different page or perform other actions
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(`Error: ${errorMessage}`);
        }
    });

    // Handle Sign Up on button click
    signUpButton.addEventListener("click", async function(event) {
        event.preventDefault(); // Prevent form from submitting

        const name = document.getElementById('signUpName').value;
        const email = document.getElementById('signUpEmail').value;
        const password = document.getElementById('signUpPassword').value;
        const confirmPassword = document.getElementById('signUpConfirmPassword').value;

        // Basic validation
        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await setDoc(doc(db, "users", user.uid), {
                name: name,
                email: email,
                createdAt: new Date(),
                volunteerAssigned: null
            });

            alert(`Welcome, ${name}!`);
            // Redirect to a different page or perform other actions
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(`Error: ${errorMessage}`);
        }
    });


    logOutUserButton.addEventListener("click", async function(event) {
        event.preventDefault(); // Prevent any default action (optional)

        try {
            await signOut(auth);
            alert("You have been logged out.");
            
            // Optionally, redirect to the login page or refresh the UI
            // location.href = "login.html"; // Example: Redirect to the login page
            toggleUserDetails(); // Refresh UI to show login form
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(`Error logging out: ${errorMessage}`);
        }
    });

});
