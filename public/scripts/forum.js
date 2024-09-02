import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

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
const firestore = getFirestore();
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(app);

// Reference to the 'posts' collection
const postsRef = db.collection("posts");

// Function to get and display posts
function getPosts() {
    postsRef.get().then((querySnapshot) => {
        let postsHTML = '';
        querySnapshot.forEach((doc) => {
            const post = doc.data();
            postsHTML += `<h2>${post.title}</h2><p>${post.content}</p>`;
        });
        document.getElementById('posts-container').innerHTML = postsHTML;
    }).catch((error) => {
        console.error("Error getting documents: ", error);
    });
}

// Call the function to display posts
getPosts();
