// // DOM Elements
// const chatToggle = document.querySelector('.chat-toggle');
// const chatWindow = document.querySelector('.chat-window');
// const closeChat = document.querySelector('.close-chat');
// const sendBtn = document.querySelector('.send-btn');
// const chatInput = document.querySelector('.chat-input textarea');
// const chatMessages = document.querySelector('.chat-messages');
// const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
// const navMenu = document.querySelector('nav');
// let askingSymp = false;
// let awaitingSymptom = null;


// // Toggle mobile menu
// mobileMenuBtn.addEventListener('click', () => {
//     navMenu.classList.toggle('active');
    
//     // Toggle icon
//     const icon = mobileMenuBtn.querySelector('i');
//     if (navMenu.classList.contains('active')) {
//         icon.classList.remove('fa-bars');
//         icon.classList.add('fa-times');
//     } else {
//         icon.classList.remove('fa-times');
//         icon.classList.add('fa-bars');
//     }
// });

// // Chat functionality
// chatToggle.addEventListener('click', () => {
//     chatWindow.classList.add('active');
//     chatInput.focus();
// });

// closeChat.addEventListener('click', () => {
//     chatWindow.classList.remove('active');
// });

// // Send message when clicking the send button
// sendBtn.addEventListener('click', sendMessage);

// // Send message when pressing Enter key (but allow Shift+Enter for new line)
// chatInput.addEventListener('keydown', (e) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//         e.preventDefault();
//         sendMessage();
//     }
// });

// async function sendMessage() {
//     const message = chatInput.value.trim();
//     if (!message) return;
    
//     // Add user message to the chat
//     addMessageToChat(message, 'user');
    
//     // Clear input field
//     chatInput.value = '';
    
//     // Auto-resize input field
//     autoResizeTextarea();
    
//     // Simulate bot response (after a short delay)
//     setTimeout(async () => {
//         const response = await getBotResponse(message);
//         console.log(JSON.stringify(response)); // inspect response
//         // result = probtestFromResponse(response.predictions) 
//         probtestresult = probtestFromResponse(response.predictions) 
//         if (probtestresult[0]){
//             askAgain(probtestresult[1]);
//         }
//         else{
//             let msg = "Top Predictions:\n";
//             response.predictions.forEach(p => {
//                 msg += `${p.disease}: ${(p.probability * 100).toFixed(2)}%\n`;
//             });
//             addMessageToChat(probtestresult[1], 'bot');
//         }
//     }, 1000);
// }

// function addMessageToChat(message, sender) {
//     // Create message container
//     const messageDiv = document.createElement('div');
//     messageDiv.classList.add('message', sender);
    
//     // Create message content
//     const messageContent = document.createElement('div');
//     messageContent.classList.add('message-content');
    
//     // Create message text
//     const messagePara = document.createElement('p');
//     messagePara.textContent = message;
    
//     // Create timestamp
//     const timestamp = document.createElement('span');
//     timestamp.classList.add('timestamp');
//     timestamp.textContent = getCurrentTime();
    
//     // Assemble message
//     messageContent.appendChild(messagePara);
//     messageDiv.appendChild(messageContent);
//     messageDiv.appendChild(timestamp);
    
//     // Add to chat
//     chatMessages.appendChild(messageDiv);
    
//     // Scroll to bottom
//     chatMessages.scrollTop = chatMessages.scrollHeight;
// }

// function getCurrentTime() {
//     const now = new Date();
//     const hours = now.getHours().toString().padStart(2, '0');
//     const minutes = now.getMinutes().toString().padStart(2, '0');
//     return `${hours}:${minutes}`;
// }

// function autoResizeTextarea() {
//     chatInput.style.height = 'auto';
//     chatInput.style.height = Math.min(chatInput.scrollHeight, 100) + 'px';
// }

// // Reset textarea height on input to allow for dynamic resizing
// chatInput.addEventListener('input', autoResizeTextarea);

// // Simple bot response logic based on keywords 
// async function getBotResponse(message) {
//         const lowerMessage = message.toLowerCase();
//         if (!askingSymp) {
//             return await getPrediction(lowerMessage);
//         }
//     // Stroke-related queries
//     // if (lowerMessage.includes('stroke') || 
//     //     lowerMessage.includes('face drooping') || 
//     //     lowerMessage.includes('arm weakness')) {
//     //     return "If you suspect a stroke, remember the FAST acronym: Face drooping, Arm weakness, Speech difficulty, Time to call emergency services. The golden hour for stroke treatment is 3-4.5 hours, but the sooner treatment begins, the better the outcome.";
//     // }
      
//     // // Heart attack queries
//     // else if (lowerMessage.includes('heart attack') || 
//     //          lowerMessage.includes('chest pain') || 
//     //          lowerMessage.includes('heart pain')) {
//     //     return "Heart attack symptoms include chest pain/pressure, pain radiating to the arm/jaw/back, shortness of breath, cold sweat, and nausea. Call emergency services immediately if you suspect a heart attack. The golden period for treatment is within 90 minutes.";
//     // }
    
//     // // Trauma queries
//     // else if (lowerMessage.includes('trauma') || 
//     //          lowerMessage.includes('accident') || 
//     //          lowerMessage.includes('injury')) {
//     //     return "For severe trauma, controlling bleeding and getting medical help within the first 60 minutes (the original 'golden hour') is critical. Apply direct pressure to bleeding wounds, keep the person still, and call emergency services immediately.";
//     // }
    
//     // // Bleeding queries
//     // else if (lowerMessage.includes('bleeding') || 
//     //          lowerMessage.includes('blood loss')) {
//     //     return "For severe bleeding, apply direct pressure with a clean cloth or bandage. If blood soaks through, add another layer without removing the first. Elevate the wounded area if possible. The first 10-15 minutes are critical for preventing shock from blood loss.";
//     // }
    
//     // // Golden hour questions
//     // else if (lowerMessage.includes('golden hour') || 
//     //          lowerMessage.includes('what is golden hour')) {
//     //     return "The 'golden hour' refers to the critical time period after a traumatic injury or medical emergency when treatment has the highest likelihood of preventing death. For different conditions, this period varies: 60 minutes for trauma, 90 minutes for heart attacks, and 3-4.5 hours for strokes.";
//     // }
    
//     // // CPR queries
//     // else if (lowerMessage.includes('cpr') || 
//     //          lowerMessage.includes('resuscitation')) {
//     //     return "For CPR, remember CAB: Compressions, Airway, Breathing. Push hard and fast in the center of the chest (about 100-120 compressions per minute), allow full chest recoil between compressions, and minimize interruptions. If untrained, do Hands-Only CPR (chest compressions only).";
//     // }
    
//     // // If no specific keywords match
//     // else {
//     //     return "I'm here to provide general information about medical emergencies and the golden hour concept. For specific medical conditions like stroke, heart attack, trauma, or severe bleeding, please ask directly. Remember, this is not a substitute for emergency medical care.";
//     // }
// }

// // Time bar animation when visible in viewport
// const timeBar = document.querySelector('.time-progress');
// let animationStarted = false;

// function startTimeBarAnimation() {
//     if (!animationStarted) {
//         timeBar.style.animation = 'progress 60s linear infinite';
//         animationStarted = true;
//     }
// }

// // Check if element is in viewport
// function isInViewport(element) {
//     const rect = element.getBoundingClientRect();
//     return (
//         rect.top >= 0 &&
//         rect.left >= 0 &&
//         rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
//         rect.right <= (window.innerWidth || document.documentElement.clientWidth)
//     );
// }

// // Start animation when time bar is in viewport
// document.addEventListener('scroll', () => {
//     if (isInViewport(timeBar)) {
//         startTimeBarAnimation();
//     }
// });

// // Initialize any elements that are in viewport on page load
// document.addEventListener('DOMContentLoaded', () => {
//     if (isInViewport(timeBar)) {
//         startTimeBarAnimation();
//     }
    
//     // Add subtle fade-in animation to cards
//     const cards = document.querySelectorAll('.condition-card');
//     cards.forEach((card, index) => {
//         card.style.opacity = '0';
//         card.style.transform = 'translateY(20px)';
//         setTimeout(() => {
//             card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
//             card.style.opacity = '1';
//             card.style.transform = 'translateY(0)';
//         }, 100 * (index + 1));
//     });
// });

// // Add hover effects to buttons
// const buttons = document.querySelectorAll('.btn');
// buttons.forEach(button => {
//     button.addEventListener('mouseenter', () => {
//         button.style.transform = 'translateY(-2px)';
//     });
    
//     button.addEventListener('mouseleave', () => {
//         button.style.transform = 'translateY(0)';
//     });
// });

// // Close the chat if user clicks outside of it
// document.addEventListener('click', (e) => {
//     if (chatWindow.classList.contains('active') && 
//         !chatWindow.contains(e.target) && 
//         !chatToggle.contains(e.target)) {
//         chatWindow.classList.remove('active');
//     }
// });


// async function getPrediction(inputText) {

//     const response = await fetch("/predict/", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/x-www-form-urlencoded",
//             "X-CSRFToken": getCSRFToken(),  // Ensure CSRF protection
//         },
//         body: new URLSearchParams({ input_text: inputText }),
//     });

//     const result = await response.json();

//     if (result.error) {
//         alert("Error: " + result.error);
//     } else {
//         const predictions = result.predictions;
//         let output = "Top Predictions:\n";
//         predictions.forEach(p => {
//             output += `${p.disease}: ${(p.probability * 100).toFixed(2)}%\n`;
//         });
//         alert(output);
//     }
//     return result;
// }

// // Utility to get CSRF token from cookies
// function getCSRFToken() {
//     // Try from meta tag first
//     const meta = document.querySelector('meta[name="csrf-token"]');
//     if (meta) return meta.getAttribute("content");

//     // Fallback to cookie (in case template uses only cookies)
//     let cookieValue = null;
//     const name = "csrftoken";
//     if (document.cookie && document.cookie !== "") {
//         const cookies = document.cookie.split(";");
//         for (let cookie of cookies) {
//             const trimmed = cookie.trim();
//             if (trimmed.startsWith(name + "=")) {
//                 cookieValue = decodeURIComponent(trimmed.substring(name.length + 1));
//                 break;
//             }
//         }
//     }
//     return cookieValue;
// }


// function probtestFromResponse(predictions, patientIndex = 0) {
//     console.log(predictions);
//     const b_first = predictions[0]?.disease;
//     const b_prob1 = predictions[0]?.probability;
//     const b_second = predictions[1]?.disease;
//     const b_prob2 = predictions[1]?.probability;
//     const b_third = predictions[2]?.disease;
//     const b_prob3 = predictions[2]?.probability;

//     // Log the extracted values for debugging
//     console.log(`First: ${b_first}, Probability: ${b_prob1}`);
//     console.log(`Second: ${b_second}, Probability: ${b_prob2}`);
//     console.log(`Third: ${b_third}, Probability: ${b_prob3}`);

//     if (b_first === "Unknown") {
//         return [false, `Patient ${patientIndex + 1}: Disease = ${b_first} (No disease)`];
//     } else if (b_prob1 >= 0.80) {
//         return [false, `Patient ${patientIndex + 1}: Disease = ${b_first} (High agreement)`];
//     } else {
//         const diseases_data = [b_first, b_second, b_third];
//         return [true, diseases_data];
//     }
// }

// async function askAgain(diseases) {
//     askingSymp = true;
//     console.log("Ask for more symptoms. Possible diseases are:", diseases.join(", "));
  
//     const csrfToken = document.querySelector('meta[name="csrf-token"]').content;
  
//     // Kick off the first step
//     const initResp = await fetch("/diagnosis/", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//         "X-CSRFToken": csrfToken
//       },
//       body: new URLSearchParams({
//         disease_names: diseases.join(",")
//       })
//     }).then(r => r.json());
  
//     if (initResp.next_symptom) {
//         displayFollowUp(initResp.next_symptom);
//     } else if (initResp.result) {
//       addMessageToChat(`Diagnosis: ${initResp.result}`, "bot");
//     }
//   }
  

// function displayFollowUp(symptom) {
//     // remember what we’re asking about
//     awaitingSymptom = symptom;
  
//     // show the bot’s question
//     addMessageToChat(`Do you have “${symptom}”?`, "bot");
    
//     // scroll into view
//     chatMessages.scrollTop = chatMessages.scrollHeight;
//   }

  
//   async function submitAnswer(symptom, answer) {
//     const csrfToken = document.querySelector('meta[name="csrf-token"]').content;
  
//     const resp = await fetch("/diagnosis_step/", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//         "X-CSRFToken": csrfToken
//       },
//       body: new URLSearchParams({
//         symptom: symptom,
//         answer: answer
//       })
//     }).then(r => r.json());
  
//     if (resp.next_symptom) {
//       displayFollowUp(resp.next_symptom);
//     } else if (resp.result) {
//       addMessageToChat(`Diagnosis: ${resp.result}`, "bot");
//     }
//   }
  


// DOM Elements
const chatToggle = document.querySelector('.chat-toggle');
const chatWindow = document.querySelector('.chat-window');
const closeChat = document.querySelector('.close-chat');
const sendBtn = document.querySelector('.send-btn');
const chatInput = document.querySelector('.chat-input textarea');
const chatMessages = document.querySelector('.chat-messages');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navMenu = document.querySelector('nav');
let askingSymp = false;
let awaitingSymptom = null;


// Toggle mobile menu
mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Toggle icon
    const icon = mobileMenuBtn.querySelector('i');
    if (navMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Chat functionality
chatToggle.addEventListener('click', () => {
    chatWindow.classList.add('active');
    chatInput.focus();
});

closeChat.addEventListener('click', () => {
    chatWindow.classList.remove('active');
});

// Send message when clicking the send button
sendBtn.addEventListener('click', sendMessage);

// Send message when pressing Enter key (but allow Shift+Enter for new line)
chatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

async function sendMessage() {
    const message = chatInput.value.trim();
    if (!message) return;
    
    // Add user message to the chat
    addMessageToChat(message, 'user');
    
    // Clear input field
    chatInput.value = '';
    
    // Auto-resize input field
    autoResizeTextarea();
    
    // Simulate bot response (after a short delay)
    setTimeout(async () => {
        const response = await getBotResponse(message);
        console.log(response); // inspect response
        
        if (response && response.predictions) {
            // result = probtestFromResponse(response.predictions) 
            const probtestresult = probtestFromResponse(response.predictions);
            if (probtestresult[0]) {
                askAgain(probtestresult[1]);
            } else {
                let msg = "Top Predictions:\n";
                response.predictions.forEach(p => {
                    msg += `${p.disease}: ${(p.probability * 100).toFixed(2)}%\n`;
                });
                addMessageToChat(probtestresult[1], 'bot');
            }
        }
    }, 1000);
}

function addMessageToChat(message, sender) {
    // Create message container
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender);
    
    // Create message content
    const messageContent = document.createElement('div');
    messageContent.classList.add('message-content');
    
    // Create message text
    const messagePara = document.createElement('p');
    messagePara.textContent = message;
    
    // Create timestamp
    const timestamp = document.createElement('span');
    timestamp.classList.add('timestamp');
    timestamp.textContent = getCurrentTime();
    
    // Assemble message
    messageContent.appendChild(messagePara);
    messageDiv.appendChild(messageContent);
    messageDiv.appendChild(timestamp);
    
    // Add to chat
    chatMessages.appendChild(messageDiv);
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getCurrentTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}

function autoResizeTextarea() {
    chatInput.style.height = 'auto';
    chatInput.style.height = Math.min(chatInput.scrollHeight, 100) + 'px';
}

// Reset textarea height on input to allow for dynamic resizing
chatInput.addEventListener('input', autoResizeTextarea);

// Simple bot response logic based on keywords 
async function getBotResponse(message) {
    const lowerMessage = message.toLowerCase();
    if (!askingSymp) {
        return await getPrediction(lowerMessage);
    } else if (awaitingSymptom) {
        // Process symptom response
        let ans;
        if (lowerMessage.includes('yes')) {
            ans = "yes";
        } else if (lowerMessage.includes('no')) {
            ans = "no";
        } else {
            // Default or unknown response
            addMessageToChat("Please answer with yes or no.", "bot");
            return;
        }
        
        const symptom = awaitingSymptom;
        awaitingSymptom = null; // Clear waiting state
        
        return await submitAnswer(symptom, ans);
    }
}

// Time bar animation when visible in viewport
const timeBar = document.querySelector('.time-progress');
let animationStarted = false;

function startTimeBarAnimation() {
    if (!animationStarted) {
        timeBar.style.animation = 'progress 60s linear infinite';
        animationStarted = true;
    }
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Start animation when time bar is in viewport
document.addEventListener('scroll', () => {
    if (isInViewport(timeBar)) {
        startTimeBarAnimation();
    }
});

// Initialize any elements that are in viewport on page load
document.addEventListener('DOMContentLoaded', () => {
    if (isInViewport(timeBar)) {
        startTimeBarAnimation();
    }
    
    // Add subtle fade-in animation to cards
    const cards = document.querySelectorAll('.condition-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 * (index + 1));
    });
});

// Add hover effects to buttons
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateY(-2px)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateY(0)';
    });
});

// Close the chat if user clicks outside of it
document.addEventListener('click', (e) => {
    if (chatWindow.classList.contains('active') && 
        !chatWindow.contains(e.target) && 
        !chatToggle.contains(e.target)) {
        chatWindow.classList.remove('active');
    }
});


async function getPrediction(inputText) {
    try {
        const response = await fetch("/predict/", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "X-CSRFToken": getCSRFToken(),  // Ensure CSRF protection
            },
            body: new URLSearchParams({ input_text: inputText }),
        });

        const result = await response.json();

        if (result.error) {
            console.error("Error:", result.error);
        }
        
        return result;
    } catch (error) {
        console.error("Fetch error:", error);
        return { error: "Failed to fetch prediction" };
    }
}

// Utility to get CSRF token from cookies
function getCSRFToken() {
    // Try from meta tag first
    const meta = document.querySelector('meta[name="csrf-token"]');
    if (meta) return meta.getAttribute("content");

    // Fallback to cookie (in case template uses only cookies)
    let cookieValue = null;
    const name = "csrftoken";
    if (document.cookie && document.cookie !== "") {
        const cookies = document.cookie.split(";");
        for (let cookie of cookies) {
            const trimmed = cookie.trim();
            if (trimmed.startsWith(name + "=")) {
                cookieValue = decodeURIComponent(trimmed.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}


function probtestFromResponse(predictions, patientIndex = 0) {
    console.log(predictions);
    const b_first = predictions[0]?.disease;
    const b_prob1 = predictions[0]?.probability;
    const b_second = predictions[1]?.disease;
    const b_prob2 = predictions[1]?.probability;
    const b_third = predictions[2]?.disease;
    const b_prob3 = predictions[2]?.probability;

    // Log the extracted values for debugging
    console.log(`First: ${b_first}, Probability: ${b_prob1}`);
    console.log(`Second: ${b_second}, Probability: ${b_prob2}`);
    console.log(`Third: ${b_third}, Probability: ${b_prob3}`);

    if (b_first === "Unknown") {
        return [false, `Patient ${patientIndex + 1}: Disease = ${b_first} (No disease)`];
    } else if (b_prob1 >= 0.80) {
        return [false, `Patient ${patientIndex + 1}: Disease = ${b_first} (High agreement)`];
    } else {
        const diseases_data = [b_first, b_second, b_third];
        return [true, diseases_data];
    }
}

async function askAgain(diseases) {
    askingSymp = true;
    console.log("Ask for more symptoms. Possible diseases are:", diseases.join(", "));
  
    const csrfToken = document.querySelector('meta[name="csrf-token"]').content;
  
    // Kick off the first step
    try {
        const initResp = await fetch("/diagnosis/", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "X-CSRFToken": csrfToken
          },
          body: new URLSearchParams({
            disease_names: diseases.join(",")
          })
        }).then(r => r.json());
    
        if (initResp.next_symptom) {
            displayFollowUp(initResp.next_symptom);
        } else if (initResp.result) {
          addMessageToChat(`Diagnosis: ${initResp.result}`, "bot");
          askingSymp = false;
        }
    } catch (error) {
        console.error("Error in askAgain:", error);
        addMessageToChat("Sorry, there was an error processing your diagnosis.", "bot");
        askingSymp = false;
    }
}
  

function displayFollowUp(symptom) {
    // remember what we're asking about
    awaitingSymptom = symptom;
  
    // show the bot's question
    addMessageToChat(`Do you have "${symptom}"?`, "bot");
    
    // scroll into view
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

  
async function submitAnswer(symptom, answer) {
    try {
        const csrfToken = document.querySelector('meta[name="csrf-token"]').content;
      
        const resp = await fetch("/diagnosis_step/", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "X-CSRFToken": csrfToken
          },
          body: new URLSearchParams({
            symptom: symptom,
            answer: answer
          })
        }).then(r => r.json());
      
        if (resp.next_symptom) {
          displayFollowUp(resp.next_symptom);
        } else if (resp.result) {
          addMessageToChat(`Diagnosis: ${resp.result}`, "bot");
          askingSymp = false;
        }
        
        return resp;
    } catch (error) {
        console.error("Error in submitAnswer:", error);
        addMessageToChat("Sorry, there was an error processing your response.", "bot");
        askingSymp = false;
        return { error: "Failed to submit answer" };
    }
}