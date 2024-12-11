let dishesOrderd = []
dishesOrdered = JSON.parse(localStorage.getItem("dishesOrdered"))
console.log(dishesOrdered)
const url = "http://localhost:5003/api/orderitems"

eventID = localStorage.getItem("eventID")

let finalOrderItems = []
let myEvent;

let orderSubTotalNoTax = dishesOrdered.reduce((total, dish) => {
    return total + dish.dishPrice * parseInt(dish.quantity, 10);
}, 0)

let totalWithTax = orderSubTotalNoTax * 1.1

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

async function handleOnLoad(){
    await getEventInformation(eventID)
    console.log(myEvent)
    createOrderReviewForm()
}

async function getEventInformation(eventID){
    eventurl = `http://localhost:5003/api/event/${eventID}`
    let response = await fetch(eventurl)
    if(response.status == 200){
        myEvent = await response.json()
    }
}

function createOrderReviewForm(){

 
    let html =
    `
    <div class="container">
        <h1 class="reviewHeader">Order Review</h1>
        <div class="content-box">
            <p><strong>Menu Items:</strong></p>

    `

        dishesOrdered.forEach((dish) => {
            html +=

            `<ul>${dish.dishName}: ${dish.quantity} servings</ul>`
        });

        let startTime = myEvent[0].eventStartTime.split("T")[1].slice(0, 5)
        let date = myEvent[0].eventDate.split("T")[0];


        html +=
    
    `
            <p><strong>Event Information:</strong></p>
            <ul>Total Attendance: ${myEvent[0].eventTotalAttendance}</ul>
            <ul>Child Attendance: ${myEvent[0].eventChildAttendance}</ul>
            <ul>Adress: ${myEvent[0].eventVenueAddressOne} ${myEvent[0].eventVenueAddressTwo}, ${myEvent[0].eventVenueCity} ${myEvent[0].eventVenueZipCode}</ul>
            <ul>Start Time: ${startTime}</ul>
            <ul>Duration: ${myEvent[0].eventDuration} hours</ul>
            <ul>Date: ${date}</ul>
            <p><strong>Order Subtotal:</strong> $${orderSubTotalNoTax.toFixed(2)}</p>
            <p><strong>+10% Sales Tax:</strong> $${totalWithTax.toFixed(2)}</p>
            <div class="form-group">
                <label for="gratuity">Enter gratuity:</label>
                <input type="number" id="gratuity" placeholder="Enter gratuity" step="0.01" min="0">
            </div>
            <div class="total-section">
                <strong>Final Price:</strong> $<span id="total">${(totalWithTax).toFixed(2)}</span>
            </div>
        </div>
        <button id="submitOrder" onclick="addOrderItems(${orderSubTotalNoTax})" class="submit-button">Submit</button>
    </div>

    `

    document.getElementById("app").innerHTML = html

    document.getElementById("gratuity").addEventListener("input", updateFinalPrice)

    function updateFinalPrice() {
        let gratuity = parseFloat(document.getElementById("gratuity").value) || 0
        let finalPrice = totalWithTax + gratuity
        document.getElementById("total").textContent = finalPrice.toFixed(2)
    }
}


async function addOrderItems(orderTotalCost) {
    let totalCostPerItem

    dishesOrdered.forEach((dish) => {
        totalCostPerItem = dish.dishPrice * dish.quantity

        let orderItem = {
            eventID: eventID,
            dishID: dish.dishID,
    
            // orderDate: new Date().toISOString(),  
            quantity: dish.quantity,
            totalCostPerItem: totalCostPerItem,
            orderTotalCost: orderTotalCost,
            orderTip: parseFloat(document.getElementById("gratuity").value) || 0 
        };

        finalOrderItems.push(orderItem);
    });

    
    try {
        for (let i = 0; i < finalOrderItems.length; i++) {
            let orderItem = finalOrderItems[i]
            console.log(orderItem)

          
            const response = await fetch(url, {
                method: "POST",
                body: JSON.stringify(orderItem),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            });

            if (response.ok) {
                console.log(`Order item ${orderItem.dishID} successfully inserted.`);
            } else {
                const errorMessage = await response.json();
                console.error(`Error inserting order item ${orderItem.dishID}:`, errorMessage);
            }
        }
        window.location.href = "customermenu.html";

    } catch (error) {
        console.error("Error submitting order items:", error);
        alert("There was an issue submitting your order items. Please try again.");
    }
}
