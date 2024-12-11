let MyOrderItmes = []
let dishesOrdered = []
let myDishes = []
let availableDishes = []


let eventDate = localStorage.getItem('eventDate')
let eventID = localStorage.getItem('eventID')
let eventAttendance = localStorage.getItem('eventAttendance')
let totalAttendance = localStorage.getItem('totalAttendance')


const url = "http://localhost:5003/api/dish"
console.log(eventDate)
console.log(eventID)

async function handleOnLoad() {
    // await getAllDishes() 
    await getAllAvailableDishes(eventDate)
    console.log(availableDishes)
    createAppetizerPage()
}

// async function getAllDishes() {
//     let response = await fetch(url)
//     if (response.status == 200) {
//         myDishes = await response.json()
//     } else {
//         console.error("Failed to fetch dishes:", response.status)
//     }
// }

async function getAllAvailableDishes(eventDate) {
    let dishurl = `http://localhost:5003/api/dish/available?eventDate=${eventDate}`
    let response = await fetch(dishurl)
    if (response.status == 200) {
        availableDishes = await response.json()
    } else {
        console.error("Failed to fetch dishes:", response.status)
    }
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
                                onchange="updateOrder(${eventID}, ${dish.dishID}, '${dish.dishName}', this.value, ${dish.dishPrice})"
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
                                onchange="updateOrder(${eventID}, ${dish.dishID}, '${dish.dishName}', this.value, ${dish.dishPrice})"
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
                                onchange="updateOrder(${eventID}, ${dish.dishID}, '${dish.dishName}', this.value, ${dish.dishPrice})"
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
                                onchange="updateOrder(${eventID}, ${dish.dishID}, '${dish.dishName}', this.value, ${dish.dishPrice})"
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


function updateOrder(eventID, dishID, dishName, quantity, dishPrice) {


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

        dishesOrdered.push({ eventID, dishID, dishName, quantity, dishPrice });
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