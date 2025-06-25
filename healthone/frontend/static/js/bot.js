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

// display msgs in chat window
function addMessageToChat(message, sender) {
    // Create message container
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender);
    
    // Create message content
    const messageContent = document.createElement('div');
    messageContent.classList.add('message-content');
    
    // Create message text
    const messagePara = document.createElement('p');
    if (sender === 'bot') {
        messagePara.innerHTML = message; // allow HTML like <a>
    } else {
        messagePara.textContent = message; // escape user input
    }    
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

// perform prediction
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
        
        if (response && response[0].predictions && response[1].predictions) {
            // result = probtestFromResponse(response.predictions) 
            const probtestresult = probtestFromResponse(response[0].predictions, response[1].predictions);
            console.log(probtestresult); // inspect probtestresult
            if (probtestresult[0]) {
                askAgain(probtestresult[2]);
            } else {
                let msg = "Top Predictions:\n";
                response[0].predictions.forEach(p => {
                    msg += `${p.disease}: ${(p.probability * 100).toFixed(2)}%\n`;
                });
                response[1].predictions.forEach(p => {
                    msg += `${p.disease}: ${(p.probability * 100).toFixed(2)}%\n`;
                });
                if (probtestresult[1] == 'case1' || probtestresult[1] == 'case4.1') {
                    const videoTitle = probtestresult[2];
                    const videoLink = `<a href="/video_detail/${encodeURIComponent(videoTitle)}/" target="_blank">${videoTitle}</a>`;
                    addMessageToChat(videoLink, 'bot');           
                } 
                else if (probtestresult[1] == 'case2') {
                    const videoTitle1 = probtestresult[2];
                    const videoLink1 = `<a href="/video_detail/${encodeURIComponent(videoTitle1)}/" target="_blank">${videoTitle1}</a>`;
                    const videoTitle2 = probtestresult[2];
                    const videoLink2 = `<a href="/video_detail/${encodeURIComponent(videoTitle1)}/" target="_blank">${videoTitle2}</a>`;
                    addMessageToChat(`Inconclusive ${videoLink1} or ${videoLink2}`, 'bot');                    
                } 
                else {
                    const videoLink = `<a href="/video_detail/${encodeURIComponent(empty)}/" target="_blank">Link to our Video website</a>`;
                    addMessageToChat(`${probtestresult[2]}, ${videoLink}`, 'bot'); 
                }
            }
        }
    }, 1000);
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
        const response1 = await fetch("/ml_predict/", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "X-CSRFToken": getCSRFToken(),  // Ensure CSRF protection
            },
            body: new URLSearchParams({ input_text: inputText }),
        });
        const result1 = await response1.json();

        const response2 = await fetch("/bert_predict/", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "X-CSRFToken": getCSRFToken(),  // Ensure CSRF protection
            },
            body: new URLSearchParams({ input_text: inputText }),
        });
        const result2 = await response2.json();

        if (result1.error) {
            console.error("Error:", result1.error);
        }
        if (result2.error) {
            console.error("Error:", result2.error);
        }
        
        return [result1, result2];
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

// accuracy check
function probtestFromResponse(predictions1, predictions2) {
    console.log(predictions1);
    const b_first1 = predictions1[0]?.disease;
    const b_prob11 = predictions1[0]?.probability;
    const b_second1 = predictions1[1]?.disease;
    const b_prob21 = predictions1[1]?.probability;
    const b_third1 = predictions1[2]?.disease;
    const b_prob31 = predictions1[2]?.probability;

    // Log the extracted values for debugging
    console.log(`First: ${b_first1}, Probability: ${b_prob11}`);
    console.log(`Second: ${b_second1}, Probability: ${b_prob21}`);
    console.log(`Third: ${b_third1}, Probability: ${b_prob31}`);

    console.log(predictions2);
    const b_first2 = predictions2[0]?.disease;
    const b_prob12 = predictions2[0]?.probability;
    const b_second2 = predictions2[1]?.disease;
    const b_prob22 = predictions2[1]?.probability;
    const b_third2 = predictions2[2]?.disease;
    const b_prob32 = predictions2[2]?.probability;

    // Log the extracted values for debugging
    console.log(`First: ${b_first2}, Probability: ${b_prob12}`);
    console.log(`Second: ${b_second2}, Probability: ${b_prob22}`);
    console.log(`Third: ${b_third2}, Probability: ${b_prob32}`);

    if (b_first1 == b_first2 && b_prob11 >= 0.80 && b_prob12 >= 0.80) {
        return [false, 'case1', `${b_first1}`]; // both top is same and confedent
    } else if (b_prob11 >= 0.80 && b_prob12 >= 0.80) {// both top is dif and confedent
        return [false, 'case2', `${b_first1}`, `${b_first2}`];
    } else if (
        (b_prob11 >= 0.80 && (b_first1 !== b_second2 && b_first1 !== b_third2)) ||
        (b_prob12 >= 0.80 && (b_first2 !== b_second1 && b_first2 !== b_third1))
    ) {
        // Collect the diseases and probabilities from the top 3 of both models
        const diseases_data1 = [
            { disease: b_first1, probability: b_prob11 },
            { disease: b_second1, probability: b_prob21 },
            { disease: b_third1, probability: b_prob31 }
        ];
    
        const diseases_data2 = [
            { disease: b_first2, probability: b_prob12 },
            { disease: b_second2, probability: b_prob22 },
            { disease: b_third2, probability: b_prob32 }
        ];
    
        // Combine the results from both models
        const combined_data = [...diseases_data1, ...diseases_data2];
    
        // Sort the combined data by probability in descending order
        const sorted_diseases = combined_data.sort((a, b) => b.probability - a.probability);
    
        // Extract only the disease names from the top 3
        const top3_disease_names = sorted_diseases.slice(0, 3).map(item => item.disease);

        return [true, 'case3', top3_disease_names];
    } else {
        const find_common_disease = (base_data, bert_data) => {
            // Iterate through the top 3 predictions from both models
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    if (base_data[i].disease === bert_data[j].disease) {
                        return {
                            disease: base_data[i].disease,
                            p1: base_data[i].probability,
                            p2: bert_data[j].probability
                        };
                    }
                }
            }
            return null; // No common disease
        };
    
        const base_data = [
            { disease: b_first1, probability: b_prob11 },
            { disease: b_second1, probability: b_prob21 },
            { disease: b_third1, probability: b_prob31 }
        ];
    
        const bert_data = [
            { disease: b_first2, probability: b_prob12 },
            { disease: b_second2, probability: b_prob22 },
            { disease: b_third2, probability: b_prob32 }
        ];
    
        const common = find_common_disease(base_data, bert_data);
        
        if (common && (common.p1 + common.p2) >= 1.2) {
            return [false, 'case4.1', `${common.disease}`];
        } else if (b_prob11 < 0.50 && b_prob12 < 0.50) {
            return [false, 'case4.2', 'No result (Low confidence)'];
        } else {
            return [false, 'case4.2', 'Needs manual review'];
        }
    }

    // if (b_first1 === "Unknown") {
    //     return [false, `No disease identified`];
    // } else if (b_prob1 >= 0.80) {
    //     return [false, `${b_first}`];
    // } else {
    //     const diseases_data = [b_first, b_second, b_third];
    //     return [true, diseases_data];
    // }
}

// if low acuracy
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
            const videoTitle = initResp.result;
            const videoLink = `<a href="/video_detail/${encodeURIComponent(videoTitle)}/" target="_blank">${videoTitle}</a>`;
            addMessageToChat(videoLink, 'bot');
            askingSymp = false;
        }
    } catch (error) {
        console.error("Error in askAgain:", error);
        addMessageToChat("Sorry, there was an error processing your diagnosis.", "bot");
        askingSymp = false;
    }
}
  
function displayFollowUp(symptom) {
    awaitingSymptom = symptom;
  
    addMessageToChat(`Do you have "${symptom}"?`, "bot");
    
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
            const videoTitle = resp.result;
            const videoLink = `<a href="/video_detail/${encodeURIComponent(videoTitle)}/" target="_blank">${videoTitle}</a>`;
            addMessageToChat(videoLink, 'bot');
            askingSymp = false;
        }
        
        return [resp];
    } catch (error) {
        console.error("Error in submitAnswer:", error);
        addMessageToChat("Sorry, there was an error processing your response.", "bot");
        askingSymp = false;
        return { error: "Failed to submit answer" };
    }
}