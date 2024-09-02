/*// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAKvjxNBWJFoLiVbTYN6ks3CL5clqWd_zw",
  authDomain: "youthxhack-teamsnake.firebaseapp.com",
  projectId: "youthxhack-teamsnake",
  storageBucket: "youthxhack-teamsnake.appspot.com",
  messagingSenderId: "180498244497",
  appId: "1:180498244497:web:e463ab124fdf965f5c3030",
  measurementId: "G-V6JDMV148Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
  
  // Function to retrieve posts and display them
  function displayPosts() {
    const postsContainer = document.getElementById("posts-container");
  
    db.collection("posts").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const post = doc.data();
        const postElement = document.createElement("div");
        postElement.classList.add("post");
  
        postElement.innerHTML = `
          <h2>${post.title}</h2>
          <p>${post.content}</p>
          <button class="btn btn-secondary btn-sm edit-post-button" data-id="${doc.id}">Edit</button>
        `;
  
        postsContainer.appendChild(postElement);
      });
  
      // Add event listeners to edit buttons
      const editButtons = document.querySelectorAll(".edit-post-button");
      editButtons.forEach(button => {
        button.addEventListener("click", openEditModal);
      });
    });
  }
  
  // Function to open the edit modal with the post's data
  function openEditModal(event) {
    const postId = event.target.getAttribute("data-id");
    const postRef = db.collection("posts").doc(postId);
  
    postRef.get().then((doc) => {
      if (doc.exists) {
        const post = doc.data();
        document.getElementById("edit-post-id").value = postId;
        document.getElementById("edit-post-title").value = post.title;
        document.getElementById("edit-post-content").value = post.content;
        const editPostModal = new bootstrap.Modal(document.getElementById("editPostModal"));
        editPostModal.show();
      }
    });
  }
  
  // Function to save edited post data
  document.getElementById("edit-post-form").addEventListener("submit", function(event) {
    event.preventDefault();
  
    const postId = document.getElementById("edit-post-id").value;
    const postRef = db.collection("posts").doc(postId);
    
    const updatedPost = {
      title: document.getElementById("edit-post-title").value,
      content: document.getElementById("edit-post-content").value
    };
  
    postRef.update(updatedPost).then(() => {
      // Close the modal and refresh the posts
      bootstrap.Modal.getInstance(document.getElementById("editPostModal")).hide();
      document.getElementById("posts-container").innerHTML = "";
      displayPosts();
    });
  });
  
  // Call the function to display posts
  displayPosts();*/

 
        // Import the functions you need from the SDKs you need
        import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
        import { getFirestore, collection, getDocs, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js";

        // Your web app's Firebase configuration
        const firebaseConfig = {
            apiKey: "AIzaSyAKvjxNBWJFoLiVbTYN6ks3CL5clqWd_zw",
            authDomain: "youthxhack-teamsnake.firebaseapp.com",
            projectId: "youthxhack-teamsnake",
            storageBucket: "youthxhack-teamsnake.appspot.com",
            messagingSenderId: "180498244497",
            appId: "1:180498244497:web:e463ab124fdf965f5c3030",
            measurementId: "G-V6JDMV148Q"
        };

        // Initialize Firebase
        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);

        // Function to retrieve posts and display them
        function displayPosts() {
            const postsContainer = document.getElementById("posts-container");

            getDocs(collection(db, "posts")).then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    const post = doc.data();
                    const postElement = document.createElement("div");
                    postElement.classList.add("post");

                    postElement.innerHTML = `
                        <h2>${post.title}</h2>
                        <p>${post.content}</p>
                        <button class="btn btn-secondary btn-sm edit-post-button" data-id="${doc.id}">Edit</button>
                    `;

                    postsContainer.appendChild(postElement);
                });

                // Add event listeners to edit buttons
                const editButtons = document.querySelectorAll(".edit-post-button");
                editButtons.forEach(button => {
                    button.addEventListener("click", openEditModal);
                });
            });
        }

        // Function to open the edit modal with the post's data
        function openEditModal(event) {
            const postId = event.target.getAttribute("data-id");
            const postRef = doc(db, "posts", postId);

            getDoc(postRef).then((doc) => {
                if (doc.exists()) {
                    const post = doc.data();
                    document.getElementById("edit-post-id").value = postId;
                    document.getElementById("edit-post-title").value = post.title;
                    document.getElementById("edit-post-content").value = post.content;
                    const editPostModal = new bootstrap.Modal(document.getElementById("editPostModal"));
                    editPostModal.show();
                }
            });
        }

        // Function to save edited post data
        document.getElementById("edit-post-form").addEventListener("submit", function(event) {
            event.preventDefault();

            const postId = document.getElementById("edit-post-id").value;
            const postRef = doc(db, "posts", postId);

            const updatedPost = {
                title: document.getElementById("edit-post-title").value,
                content: document.getElementById("edit-post-content").value
            };

            updateDoc(postRef, updatedPost).then(() => {
                // Close the modal and refresh the posts
                bootstrap.Modal.getInstance(document.getElementById("editPostModal")).hide();
                document.getElementById("posts-container").innerHTML = "";
                displayPosts();
            });
        });

        // Call the function to display posts
        displayPosts();
  