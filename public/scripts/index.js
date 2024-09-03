const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const micBtn = document.querySelector("#mic-btn");  // Microphone button
const chatbox = document.querySelector(".chatbox");
const chatbotToggler = document.querySelector(".chatbot-toggler");
const chatbotCloseBtn = document.querySelector(".close-btn");

let userMessage;
const API_KEY = "AIzaSyBhgWWafJsYarPrtUj4JNZGAXPqiQmx6m8";
const inputInitHeight = chatInput.scrollHeight;

const faqs = [
    "1. What services are available for seniors in the community?",
    "2. How can I get assistance with grocery shopping?",
    "3. What transportation options are available for seniors?",
    "4. How can I stay connected with friends and family online?",
    "5. How can I learn new skills or hobbies?"
];

const createChatLi = (message, className) => {
    // Create a chat <li> element with passed message and className
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    let chatContent = className === "outgoing" 
        ? `<p></p>` 
        : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi;
};

const generateResponse = (incomingChatLi) => {
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`;
    const messageElement = incomingChatLi.querySelector("p");

    // Define the properties and message for the API request
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
            contents: [{ 
                role: "user", 
                parts: [{ text: userMessage }] 
            }] 
        }),
    };

    // Send POST request to API, get response
    fetch(API_URL, requestOptions)
        .then(res => res.json())
        .then(data => {
            messageElement.textContent = data.candidates[0].content.parts[0].text; // Update message text with API response
        })
        .catch((error) => {
            messageElement.classList.add("error");
            messageElement.textContent = "Oops! Something went wrong. Please try again.";
        })
        .finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
};

const handleChat = () => {
    userMessage = chatInput.value.trim();
    if (!userMessage) return;
    chatInput.value = "";
    chatInput.style.height = `${inputInitHeight}px`;

    // Append the user's message to the chatbox
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);

    const userSelection = parseInt(userMessage);
    if (!isNaN(userSelection) && userSelection >= 1 && userSelection <= faqs.length) {
        setTimeout(() => {
            const selectedQuestion = faqs[userSelection - 1].substring(3); // Get the question without the number
            const incomingChatLi = createChatLi("Thinking...", "incoming");
            chatbox.appendChild(incomingChatLi);
            chatbox.scrollTo(0, chatbox.scrollHeight);
            userMessage = selectedQuestion; // Set userMessage to the selected question
            generateResponse(incomingChatLi); // Generate and display the AI response
        }, 600);
    } else {
        setTimeout(() => {
            const incomingChatLi = createChatLi("Thinking...", "incoming");
            chatbox.appendChild(incomingChatLi);
            chatbox.scrollTo(0, chatbox.scrollHeight);
            generateResponse(incomingChatLi); // Handle any general question
        }, 600);
    }
};

const displayFAQs = () => {
    const faqsCombined = faqs.join("\n"); // Combine all FAQs into one string with line breaks
    const faqLi = createChatLi(faqsCombined, "incoming"); // Create one <li> with the combined FAQs
    chatbox.appendChild(faqLi);
    chatbox.scrollTo(0, chatbox.scrollHeight);
};

// Speech Recognition Setup
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.interimResults = false;

recognition.addEventListener('result', (e) => {
    const transcript = Array.from(e.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');

    chatInput.value = transcript;
    handleChat();  // Automatically send the message after speech input
});

// Show listening signal when microphone button is clicked
micBtn.addEventListener('click', () => {
    micBtn.classList.add('listening');  // Add listening class to change appearance
    recognition.start();  // Start speech recognition
});

// Remove listening signal when speech recognition ends
recognition.addEventListener('end', () => {
    micBtn.classList.remove('listening');  // Remove listening class
});

chatInput.addEventListener("input", () => {
    // Adjust the height of the input textarea based on its content
    chatInput.style.height = `${inputInitHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keyup", (e) => {
    // If Enter key is pressed without Shift key and the window 
    // width is greater than 800px, handle the chat
    if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
        e.preventDefault();
        handleChat();
    }
});

sendChatBtn.addEventListener("click", handleChat);
chatbotCloseBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click", () => {
    document.body.classList.toggle("show-chatbot");
    if (document.body.classList.contains("show-chatbot")) {
        displayFAQs();
    }
});
