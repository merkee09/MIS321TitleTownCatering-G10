const gratuityInput = document.getElementById('gratuity');
const totalOutput = document.getElementById('total');
const submitButton = document.getElementById('sumbitOrder');
const eventApiUrl = "http://localhost:5003/api/event";

// Function to fetch the latest event for the logged-in user
async function fetchLatestEvent() {
    try {
        const customerEmail = localStorage.getItem('username'); // Get the logged-in user's email
        const response = await fetch(eventApiUrl);
        if (!response.ok) throw new Error('Failed to fetch event data.');

        const events = await response.json();
        // Find the most recent event created by the customer
        const userEvents = events.filter(event => event.eventCustomerEmail === customerEmail);
        const latestEvent = userEvents.sort((a, b) => new Date(b.eventDate) - new Date(a.eventDate))[0];
        return latestEvent || null;
    } catch (error) {
        console.error('Error fetching latest event:', error);
        return null;
    }
}

// Function to display the event in the Order Review table
async function displayEventInfo() {
    const latestEvent = await fetchLatestEvent();

    if (latestEvent) {
        const contentBox = document.querySelector('.content-box');
        contentBox.innerHTML = `
            <p><strong>Event Name:</strong> ${latestEvent.eventName}</p>
            <p><strong>Event Type:</strong> ${latestEvent.eventType}</p>
            <p><strong>Venue Name:</strong> ${latestEvent.eventVenueName}</p>
            <p><strong>Venue Address:</strong> ${latestEvent.eventVenueAddressOne}, ${latestEvent.eventVenueCity} ${latestEvent.eventVenueZipCode}</p>
            <p><strong>Total Attendance:</strong> ${latestEvent.eventTotalAttendance}</p>
            <p><strong>Order Total:</strong> $100.00</p>
            <p>+10% Sales Tax</p>
            <div class="form-group">
                <input type="number" id="gratuity" placeholder="Enter gratuity" step="0.01" min="0">
            </div>
            <div class="total-section">
                Final Price: $<span id="total">0.00</span>
            </div>
        `;

        // Reassign elements as the content is dynamically replaced
        const gratuityInput = document.getElementById('gratuity');
        const totalOutput = document.getElementById('total');

        gratuityInput.addEventListener('input', calculateTotal);

        function calculateTotal() {
            const subtotal = 100; // Replace this with the actual order total
            const tax = subtotal * 0.10;
            const gratuity = parseFloat(gratuityInput.value) || 0;
            const total = subtotal + tax + gratuity;

            totalOutput.textContent = total.toFixed(2);
        }
    } else {
        alert("No recent events found for the current user.");
    }
}

// Load the event information when the page loads
document.addEventListener('DOMContentLoaded', displayEventInfo);







// const gratuityInput = document.getElementById('gratuity');
// const totalOutput = document.getElementById('total');
// const submitButton = document.getElementById('sumbitOrder');

// function calculateTotal() {
//     const subtotal = 100;
//     const tax = subtotal * 0.10;
//     const gratuity = parseFloat(gratuityInput.value) || 0;
//     const total = subtotal + tax + gratuity;

//     totalOutput.textContent = total.toFixed(2);
// }

// gratuityInput.addEventListener('input', calculateTotal);

// submitButton.addEventListener('click', (event) => {
//     event.preventDefault();
//     calculateTotal();
//     window.location.href= 'customermenu.html';
// })