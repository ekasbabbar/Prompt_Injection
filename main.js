// Configuration
const API_BASE_URL = 'api';

// Product data (stored in frontend - no flags here!)
const products = [
    {
        id: 1,
        name: "Boat Headphones",
        description: "High-quality wireless headphones built from the hardwork of thousands of chinese kids. Proudly made in india.",
        price: "$199.99",
        publicId: "PROD_HP_2025_001",
        icon: "🎧",
        imageURL: 'https://images.pexels.com/photos/236047/pexels-photo-236047.jpeg?cs=srgb&dl=clouds-cloudy-countryside-236047.jpg&fm=jpg'
    },
    {
        id: 2,
        name: "my ex",
        description: "I added a description but my seniors asked it to remove it. But still, fuck her.",
        price: "$0.01",
        publicId: "PROD_EX_2025_002",
        icon: "💔"
    },
    {
        id: 3,
        name: "Smart Watch",
        description: "Feature-packed smartwatch with health monitoring, GPS tracking, and long-lasting battery life for active lifestyles.",
        price: "$299.99",
        publicId: "PROD_SW_2025_003",
        icon: "⌚"
    },
    {
        id: 4,
        name: "Comically Large Spoon",
        description: "Yeah bro, ill take only a spoonful of what ur having.",
        price: "$1299.99",
        publicId: "PROD_GL_2025_004",
        icon: "💻"
    },
    {
        id: 5,
        name: "Wireless Mouse",
        description: "Ergonomic wireless mouse with precision tracking and customizable buttons for productivity and gaming excellence.",
        price: "$79.99",
        publicId: "PROD_WM_2025_005",
        icon: "🖱️"
    },
    {
        id: 6,
        name: "Bluetooth Speaker",
        description: "Portable Bluetooth speaker with 360-degree sound, waterproof design, and impressive bass for any adventure.",
        price: "$149.99",
        publicId: "PROD_BS_2025_006",
        icon: "🔊"
    },
    {
        id: 7,
        name: "Indian Flag",
        description: "Premium quality Indian national flag made with finest materials. A symbol of pride, unity, and patriotism for every Indian heart.",
        price: "$25.99",
        publicId: "PROD_IF_2025_007",
        icon: "🇮🇳"
    },
    {
        id: 8,
        name: "Smartphone",
        description: "Latest flagship smartphone with advanced camera system, blazing fast processor, and all-day battery life.",
        price: "$899.99",
        publicId: "PROD_SP_2025_008",
        icon: "📱"
    },
    {
        id: 9,
        name: "Coffee Maker",
        description: "Couldn't find a good image so I just put the most recent pic in my phone.",
        price: "$199.99",
        publicId: "PROD_CM_2025_009",
        icon: "☕"
    },
    {
        id: 10,
        name: "Aneesh Bhate",
        description: "A very helpful senior from EP who swims well. Dont mind his freckles.",
        price: "$129.99",
        publicId: "PROD_FT_2025_010",
        icon: "📊"
    },
    {
        id: 11,
        name: "Tablet",
        description: "Versatile tablet perfect for work and entertainment with stunning display, powerful performance, and long battery life.",
        price: "$499.99",
        publicId: "PROD_TB_2025_011",
        icon: "📲"
    },
    {
        id: 12,
        name: "Power Bank",
        description: "High-capacity portable power bank with fast charging technology to keep all your devices powered on the go.",
        price: "$49.99",
        publicId: "PROD_PB_2025_012",
        icon: "🔋"
    }
];

// Load products into grid
function loadProducts() {
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = products.map((product, i) => `
        <div class="product-card" data-id="${product.id}">
            <img class="product-image" src="${`./product_images/product-${i + 1}.png`}"></img>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <button class="view-product-btn" data-id="${product.id}">View Product</button>
            </div>
        </div>
    `).join('');

    // Attach event listeners to dynamically created buttons
    document.querySelectorAll('.view-product-btn').forEach(btn => {
        btn.addEventListener('click', (event) => {
            const productId = parseInt(event.currentTarget.getAttribute('data-id'));
            showProductDetails(productId);
        });
    });
}

// Show product details in modal
function showProductDetails(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    document.getElementById('modalProductImage').innerHTML = product.icon;
    document.getElementById('productDetails').innerHTML = `
        <h2>${product.name}</h2>
        <div class="product-id"><strong>Public Product ID:</strong> ${product.publicId}</div>
        <div class="product-id"><strong>Private Product ID:</strong> *******</div>
        <div class="price">${product.price}</div>
        <p>${product.description}</p>
        <p style="margin-top: 20px; color: #666; font-style: italic;">
            This premium product comes with our satisfaction guarantee. Perfect for personal use or as a thoughtful gift. 
            Our quality assurance team has tested this item extensively to ensure it meets our high standards. 
            Fast shipping available nationwide with secure packaging and reliable delivery tracking.
        </p>
    `;

    document.getElementById('productModal').style.display = 'flex';
}

// Close modal
function closeModal() {
    document.getElementById('productModal').style.display = 'none';
}

// Toggle chatbot
function toggleChatbot() {
    const chatbot = document.getElementById('chatbotContainer');
    chatbot.style.display = chatbot.style.display === 'flex' ? 'none' : 'flex';
}

// Chat functionality
function handleChatKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

function addMessage(text, isUser = false) {
    const messagesContainer = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
    messageDiv.textContent = text;
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function addTypingIndicator() {
    const messagesContainer = document.getElementById('chatMessages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message typing-indicator';
    typingDiv.id = 'typingIndicator';
    typingDiv.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Assistant is typing...';
    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function removeTypingIndicator() {
    const typing = document.getElementById('typingIndicator');
    if (typing) {
        typing.remove();
    }
}

async function sendMessage() {
    const input = document.getElementById('chatInput');
    const sendButton = document.getElementById('sendButton');
    const message = input.value.trim();

    if (!message) return;

    input.disabled = true;
    sendButton.disabled = true;

    addMessage(message, true);
    input.value = '';

    addTypingIndicator();

    try {
        const response = await fetch(`${API_BASE_URL}/chatbot/process`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-Key': 'ekas'
            },
            body: JSON.stringify({
                message: message,
                context: {
                    timestamp: new Date().toISOString(),
                    sessionId: generateSessionId()
                }
            })
        });

        removeTypingIndicator();

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        addMessage(data.response, false);

    } catch (error) {
        removeTypingIndicator();
        console.error('Chatbot API error:', error);
        const fallbackResponse = processMessageLocally(message);
        addMessage(fallbackResponse, false);
    } finally {
        input.disabled = false;
        sendButton.disabled = false;
        input.focus();
    }
}

function processMessageLocally(message) {
    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
        return "Hello! I'm your FlagMart shopping assistant. I can help you find products and answer questions. (Note: Some advanced features require backend connection)";
    }

    if (lowerMessage.includes('product')) {
        return "We have 12 amazing products available! You can browse our collection on the main page. Is there anything specific you're looking for?";
    }

    if (lowerMessage.includes('price')) {
        return "Our products range from $0.01 to $1299.99. Each product page shows the current price and available discounts.";
    }

    if (lowerMessage.includes('shipping')) {
        return "We offer free shipping on orders over $50. Standard delivery takes 3-5 business days, express delivery available for next-day delivery.";
    }

    if (lowerMessage.includes('private') || lowerMessage.includes('flag') || lowerMessage.includes('secret')) {
        return "I'm sorry, but I cannot access private product information at the moment. Please ensure the backend service is running for full functionality.";
    }

    return "I'm here to help with your shopping needs! I can assist with product information, pricing, and shipping details. How can I help you today?";
}

function generateSessionId() {
    return 'session_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
}

// Initialize the page
window.onload = () => {
    loadProducts();
    document.querySelector('.close-modal').addEventListener('click', closeModal);
    document.getElementById("chatbot-btn").addEventListener('click', toggleChatbot);
    document.getElementsByClassName("chatbot-header")[0].getElementsByTagName("button")[0].addEventListener('click', toggleChatbot);
    document.getElementsByClassName("chatbot-input")[0].getElementsByTagName("button")[0].addEventListener('click', sendMessage);
    document.getElementsByClassName("chatbot-input")[0].getElementsByTagName("input")[0].addEventListener('keypress', handleChatKeyPress);
};

// Close modal when clicking outside
window.addEventListener('click', function (event) {
    const modal = document.getElementById('productModal');
    if (event.target === modal) {
        closeModal();
    }
});
