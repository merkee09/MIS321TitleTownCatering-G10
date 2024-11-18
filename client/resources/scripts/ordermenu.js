let MyOrderItmes = []
let dishesOrdered = []
let myDishes = []
let availableDishes = []
let eventDate = localStorage.getItem('eventDate')
let eventID = localStorage.getItem('eventID')
const url = "http://localhost:5003/api/dish"
console.log(eventDate)
console.log(eventID)

async function handleOnLoad() {
    await getAllDishes() 
    getAllAvailableDishes(myDishes, eventDate) 
    createAppetizerPage()
}

async function getAllDishes() {
    let response = await fetch(url)
    if (response.status == 200) {
        myDishes = await response.json()
    } else {
        console.error("Failed to fetch dishes:", response.status)
    }
}

function getAllAvailableDishes(myDishes, eventDate) {
    availableDishes = [] 
    myDishes.forEach((dish) => {
        let isAvailable = isDishAvailable(eventDate, dish.dishStartAvailability, dish.dishEndAvailability)
        if (isAvailable) {
            availableDishes.push(dish) 
        }
    })
}

function isDishAvailable(eventDate, dishStartAvailability, dishEndAvailability) {

    let eventDateObj = new Date(eventDate)
    let startAvailability = new Date(dishStartAvailability)
    let endAvailability = new Date(dishEndAvailability)

    let eventMonth = eventDateObj.getMonth()
    let eventDay = eventDateObj.getDate()
    let startMonth = startAvailability.getMonth()
    let startDay = startAvailability.getDate()
    let endMonth = endAvailability.getMonth()
    let endDay = endAvailability.getDate()


    if (startMonth <= endMonth) {
        return (
            (eventMonth > startMonth || (eventMonth === startMonth && eventDay >= startDay)) &&
            (eventMonth < endMonth || (eventMonth === endMonth && eventDay <= endDay))
        )
    }

    return (
        (eventMonth > startMonth || (eventMonth === startMonth && eventDay >= startDay)) ||
        (eventMonth < endMonth || (eventMonth === endMonth && eventDay <= endDay))
    )
}

function createAppetizerPage() {
    let html = `
    <h1>Appetizers</h1>
        <div class="menu-grid">
    `

    availableDishes
        .filter(dish => dish.dishType === "appetizer")
        .forEach((dish) => {

        let currentServings = 0

        dishesOrdered.forEach((orderItem => {
            if(dish.dishID == orderItem.dishID){
                currentServings = orderItem.quantity
            }
        }))
             
            html += `
            <div class="menu-item">
                <table>
                    <tr>
                        <td class="title">${dish.dishName}</td>
                    </tr>
                    <tr>
                        <td class="image"><img src="${dish.dishImage}"></td>
                    </tr>
                    <tr>
                        <td class="price">$${dish.dishPrice}</td>
                    </tr>
                    <tr>
                        <td class="servings">
                            Servings: 
                            <input 
                                type="number" 
                                name="servings" 
                                min="0" 
                                value="${currentServings}" 
                                data-dish-id="${dish.dishID}" 
                                onchange="updateOrder(${eventID}, ${dish.dishID}, this.value, ${dish.dishPrice})"
                            >
                        </td>
                    </tr>
                </table>
            </div>
            `;
        });

    html += `
        </div>
        <button onclick="customerMenu()" class="nav-button left">
            <span class="arrow left"></span>
        </button>
        <button onclick="createEntreePage()" class="nav-button right">
            <span class="arrow right"></span>
        </button>
    `;

    document.getElementById("app").innerHTML = html;
}


function createEntreePage() {
    let html = `
    <h1>Entrees</h1>
        <div class="menu-grid">
    `

    availableDishes
        .filter(dish => dish.dishType === "entree")
        .forEach((dish) => {

        let currentServings = 0

        dishesOrdered.forEach((orderItem => {
            if(dish.dishID == orderItem.dishID){
                currentServings = orderItem.quantity
            }
        }))
             
            html += `
            <div class="menu-item">
                <table>
                    <tr>
                        <td class="title">${dish.dishName}</td>
                    </tr>
                    <tr>
                        <td class="image"><img src="${dish.dishImage}"></td>
                    </tr>
                    <tr>
                        <td class="price">$${dish.dishPrice}</td>
                    </tr>
                    <tr>
                        <td class="servings">
                            Servings: 
                            <input 
                                type="number" 
                                name="servings" 
                                min="0" 
                                value="${currentServings}" 
                                data-dish-id="${dish.dishID}" 
                                onchange="updateOrder(${eventID}, ${dish.dishID}, this.value, ${dish.dishPrice})"
                            >
                        </td>
                    </tr>
                </table>
            </div>
            `;
        });

    html += `
        </div>
        <button onclick="createAppetizerPage()" class="nav-button left">
            <span class="arrow left"></span>
        </button>
        <button onclick="createDessertPage()" class="nav-button right">
            <span class="arrow right"></span>
        </button>
    `;

    document.getElementById("app").innerHTML = html;
}


function createDessertPage() {
    let html = `
    <h1>Desserts</h1>
        <div class="menu-grid">
    `

    availableDishes
        .filter(dish => dish.dishType === "dessert")
        .forEach((dish) => {

        let currentServings = 0

        dishesOrdered.forEach((orderItem => {
            if(dish.dishID == orderItem.dishID){
                currentServings = orderItem.quantity
            }
        }))
             
            html += `
            <div class="menu-item">
                <table>
                    <tr>
                        <td class="title">${dish.dishName}</td>
                    </tr>
                    <tr>
                        <td class="image"><img src="${dish.dishImage}"></td>
                    </tr>
                    <tr>
                        <td class="price">$${dish.dishPrice}</td>
                    </tr>
                    <tr>
                        <td class="servings">
                            Servings: 
                            <input 
                                type="number" 
                                name="servings" 
                                min="0" 
                                value="${currentServings}" 
                                data-dish-id="${dish.dishID}" 
                                onchange="updateOrder(${eventID}, ${dish.dishID}, this.value, ${dish.dishPrice})"
                            >
                        </td>
                    </tr>
                </table>
            </div>
            `;
        });

    html += `
        </div>
        <button onclick="createEntreePage()" class="nav-button left">
            <span class="arrow left"></span>
        </button>
        <button onclick="createDrinkPage()" class="nav-button right">
            <span class="arrow right"></span>
        </button>
    `;

    document.getElementById("app").innerHTML = html;
}


function createDrinkPage() {
    let html = `
    <h1>Drinks</h1>
        <div class="menu-grid">
    `

    availableDishes
        .filter(dish => dish.dishType === "drink")
        .forEach((dish) => {

        let currentServings = 0

        dishesOrdered.forEach((orderItem => {
            if(dish.dishID == orderItem.dishID){
                currentServings = orderItem.quantity
            }
        }))
             
            html += `
            <div class="menu-item">
                <table>
                    <tr>
                        <td class="title">${dish.dishName}</td>
                    </tr>
                    <tr>
                        <td class="image"><img src="${dish.dishImage}"></td>
                    </tr>
                    <tr>
                        <td class="price">$${dish.dishPrice}</td>
                    </tr>
                    <tr>
                        <td class="servings">
                            Servings: 
                            <input 
                                type="number" 
                                name="servings" 
                                min="0" 
                                value="${currentServings}" 
                                data-dish-id="${dish.dishID}" 
                                onchange="updateOrder(${eventID}, ${dish.dishID}, this.value, ${dish.dishPrice})"
                            >
                        </td>
                    </tr>
                </table>
            </div>
            `;
        });

    html += `
        </div>
        <button onclick="createDessertPage()" class="nav-button left">
            <span class="arrow left"></span>
        </button>
        <button onclick="orderReview()" class="nav-button right">
            <span class="arrow right"></span>
        </button>
    `;

    document.getElementById("app").innerHTML = html;
}


function updateOrder(eventID, dishID, quantity, dishPrice) {

    let existingItem = dishesOrdered.find(item => item.dishID === dishID);

    if (existingItem) {
        if(quantity < 0){
            quantity = 0
        }
        if (quantity === 0) {
            dishesOrdered = dish.filter(item => item.dishID !== dishID);
        } else {
            existingItem.quantity = quantity;
        }
    } else if (quantity > 0) {

        dishesOrdered.push({ eventID, dishID, quantity, dishPrice });
    }

    console.log("Current Order Items:", dishesOrdered);
    localStorage.setItem("dishesOrdered", JSON.stringify(dishesOrdered))
}

function orderReview(){
    window.location.href = "orderreview.html"

}

function customerMenu(){
    window.location.href = "customermenu.html"
}