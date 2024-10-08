import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js';
import { getFirestore, collection, getDocs } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js';

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
const db = getFirestore(app);

// Fetch and display posts
async function getPosts() {
    const querySnapshot = await getDocs(collection(db, "posts"));
    querySnapshot.forEach((doc) => {
        const postData = doc.data();
        displayPost(postData);
    });
}

function displayPost(postData) {
    const postsContainer = document.getElementById("posts-container");

    const postDiv = document.createElement("div");
    const title = document.createElement("h2");
    const content = document.createElement("p");
    const accountId = document.createElement("span");
    const timestamp = document.createElement("span");

    title.textContent = postData.title;
    content.textContent = postData.content;
    accountId.textContent = `Posted by: userId-${postData.accountId} \n`;
    timestamp.textContent = timestamp.textContent = new Date(postData.timestamp * 1000).toLocaleString();


    postDiv.appendChild(title);
    postDiv.appendChild(content);
    postDiv.appendChild(accountId);
    postDiv.appendChild(timestamp);

    postsContainer.appendChild(postDiv);
}

window.onload = getPosts;


document.addEventListener('DOMContentLoaded', function() {
    const createPostButton = document.getElementById('create-post-button');
    const postComposer = document.getElementById('post-composer');
    const closePostComposerButton = document.getElementById('close-post-composer');

    // Show the post composer when "Create Post" is clicked
    createPostButton.addEventListener('click', function() {
        postComposer.style.display = 'block';
    });

    // Hide the post composer when "Close" is clicked
    closePostComposerButton.addEventListener('click', function() {
        postComposer.style.display = 'none';
    });

    createPostForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        
        const title = document.getElementById('post-title').value;
        const content = document.getElementById('post-content').value;
        
        try {
            await addDoc(collection(db, 'posts'), {
                title: title,
                content: content,
                accountId: "userId", // Replace with actual user ID if available
                timestamp: serverTimestamp(),
            });

            // Hide the post composer and reset the form
            postComposer.style.display = 'none';
            createPostForm.reset();

            // Refresh posts
            getPosts();
        } catch (error) {
            console.error('Error adding document: ', error);
        }
    });
});


