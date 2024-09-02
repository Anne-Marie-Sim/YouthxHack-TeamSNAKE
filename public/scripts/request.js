// Import Firebase and Firestore modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getFirestore, collection, query, where, getDoc, updateDoc, doc } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";


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