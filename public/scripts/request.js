// Import Firebase and Firestore modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getFirestore, doc, getDoc, updateDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAKvjxNBWJFoLiVbTYN6ks3CL5clqWd_zw",
    authDomain: "youthxhack-teamsnake.firebaseapp.com",
    projectId: "youthxhack-teamsnake",
    storageBucket: "youthxhack-teamsnake.appspot.com",
    messagingSenderId: "180498244497",
    appId: "1:180498244497:web:e463ab124fdf965f5c3030",
    measurementId: "G-V6JDMV148Q"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

async function requestVolunteer() {
    const volunteerInfoDiv = document.getElementById('volunteer-info');
    let i = 1;
    let volunteerFound = false;

    while (true) {
        try {
            // Construct the document ID for each volunteer
            const volunteerDocRef = doc(db, 'volunteers', `volunteer${i}`);
            const volunteerDoc = await getDoc(volunteerDocRef);

            // Check if the document exists
            if (volunteerDoc.exists()) {
                const volunteerData = volunteerDoc.data();

                // Check if the volunteer is available and not assigned
                if (volunteerData.available === true && volunteerData.elderlyAssigned === null) {
                    volunteerFound = true;

                    volunteerInfoDiv.innerHTML = `
                        <p>Volunteer Assigned:</p>
                        <p>Name: ${volunteerData.vName}</p>
                        <p>ID: ${volunteerData.vId}</p>
                    `;

                    // Update the volunteer document to mark them as unavailable
                    await updateDoc(volunteerDocRef, {
                        available: false,
                        elderlyAssigned: 'assigned' // You can set this to an actual assigned value
                    });

                    break; // Exit the loop as we have found an available volunteer
                }
            } else {
                // If the document does not exist, break the loop (no more volunteers)
                break;
            }

            i++; // Move to the next volunteer document
        } catch (error) {
            console.error(`Error fetching volunteer${i}:`, error);
            break; // Exit the loop in case of an error
        }
    }

    if (!volunteerFound) {
        volunteerInfoDiv.innerHTML = `<p>No available volunteers at the moment.</p>`;
    }
}

// Attach the function to the button
document.getElementById('request-volunteer-btn').addEventListener('click', requestVolunteer);

// DOMContentLoaded Event Listener
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
          loggedUserClose = document.getElementById('loggedUserClose'),
          emailField = document.getElementById('loginEmail'),
          passwordField = document.getElementById('loginPassword'),
          loginButton = document.querySelector('.loginButton'),
          signUpButton = document.querySelector('.signUpButton'),
          logOutUserButton = document.querySelector('.logOutUserButton');

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
        toggleUserDetails();
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
                email: email
            });

            alert(`Sign-up successful! Welcome, ${name}!`);
            login.classList.add('showLogin'); // Show login form
            signUp.classList.remove('showSignUp'); // Hide sign-up form
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(`Error: ${errorMessage}`);
        }
    });

    // Handle log out
    logOutUserButton.addEventListener("click", async () => {
        try {
            await signOut(auth);
            alert("Logged out successfully.");
            // Redirect to login page or perform other actions
        } catch (error) {
            console.error("Error signing out: ", error);
        }
    });
});
