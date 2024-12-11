let myEvents = []
const url = "http://localhost:5003/api/event"
const data = "http://localhost:5003/api/dish"

function handleOnLoad(){
    CreateLogoutButton()
    getCustomerEvents()

}
function CreateLogoutButton(){
        let logouthtml = 
        `
        <button class="log-out-btn" onclick="clearStorage()">Log Out</button>
        `
        document.getElementById("divlogout").innerHTML = logouthtml
    }

async function getCustomerEvents(){
    let response = await fetch(url)
    if(response.status == 200){
        myEvents = await response.json()

        console.log(myEvents)
        CreateTable(myEvents)
    }
}

async function getDishesOrdered(eventID){
    let response = await fetch(data + '/dishesordered' + eventID)
    if(response.status == 200){
        myDishes = await response.json()

        console.log(myDishes)
    }
}


function CreateTable(myEvents){
            html = `
            <table class="table">
            <thead>
                <tr>
                    <th>Event Name</th>
                    <th>Event Type</th>
                    <th>Event Time</th>
                    <th>Date</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
            `
            myEvents.forEach(event => {
            if(event.eventCustomerEmail == localStorage.getItem("username")){
                    html += `
                <tr>
                    <td>${event.eventName}</td>
                    <td>${event.eventType}</td>
                    <td>${formatTime(event.eventStartTime)}</td>
                    <td>${formatDate(event.eventDate)}</td>
                    <td>${getStatus(event.eventDate)}</td>
                </tr>
            `
        }
    });
    html += `
    </tbody>
    </table>
    `
    document.getElementById("customermenu").innerHTML = html
}


function formatTime(eventTime){
    let date = new Date(eventTime)
    let hours = date.getHours()
    let minutes = date.getMinutes()
    let ampm = hours >= 12 ? 'PM' : 'AM'
    hours = hours % 12
    hours = hours ? hours : 12
    minutes = minutes < 10 ? '0'+minutes : minutes
    let strTime = hours + ':' + minutes + ' ' + ampm
    return strTime
}

function formatDate(eventDate){
    let date = new Date(eventDate)
    let month = (date.getMonth() + 1).toString().padStart(2, '0')
    let day = date.getDate().toString().padStart(2, '0')
    let year = date.getFullYear()
    return `${month}/${day}/${year}`
}

function getStatus(eventDate){
    let date = new Date(eventDate)
    let currDate = new Date()
    let status
    if(date <= currDate){
        status = "Completed"
    }else if(date > currDate){
        status = "Pending"
    }
    return status
}

function clearStorage(){
    localStorage.clear()
    window.location.href='login.html'
}


// let myEvents = []
// let eventDishes = []
// const url = "http://localhost:5003/api/event"

// async function handleOnLoad(){
//     await getCustomerEvents()
//     CreateTable(myEvents)
//     CreateLogoutButton()

// }

// async function getCustomerEvents(){
//     console.log("Made it to method")
//     let response = await fetch(url)
//     if(response.status == 200){
//         myEvents = await response.json()
//     }
// }

// function CreateLogoutButton(){
//     let logouthtml = 
//     `
//     <button class="log-out-btn" onclick="clearStorage()">Log Out</button>
//     `
//     document.getElementById("divlogout").innerHTML = logouthtml
// }


// async function CreateTable(myEvents){
//             html = `
//             <table class="table">
//             <thead>
//                 <tr>
//                     <th>Event Name</th>
//                     <th>Event Type</th>
//                     <th>Event Time</th>
//                     <th>Date</th>
//                     <th>Dishes Ordered</th>
//                     <th>Status</th>
//                 </tr>
//             </thead>
//             <tbody>
//             `
//             myEvents.forEach(event => {
//                 console.log(event.eventID)
//                 getDishesForEvent(event.eventID)
//                 console.log(eventDishes)
//             if(event.eventCustomerEmail == localStorage.getItem("username")){
//                     html += `
//                 <tr>
//                     <td>${event.eventName}</td>
//                     <td>${event.eventType}</td>
//                     <td>${formatTime(event.eventStartTime)}</td>
//                     <td>${formatDate(event.eventDate)}</td>
//                     `

//                     eventDishes.forEach((dish) => {
//                         html +=

//                         `
//                         <td>${dish.dishName}</td>
//                         `

//                     })
                
//                     html +=
//                     `
//                     <td>${getStatus(event.eventDate)}</td>
//                 </tr>
//             `
//         }
//     });
//     html += `
//     </tbody>
//     </table>
    
//     `
//     document.getElementById("customermenu").innerHTML = html
// }


// function formatTime(eventTime){
//     let date = new Date(eventTime)
//     let hours = date.getHours()
//     let minutes = date.getMinutes()
//     let ampm = hours >= 12 ? 'PM' : 'AM'
//     hours = hours % 12
//     hours = hours ? hours : 12
//     minutes = minutes < 10 ? '0'+minutes : minutes
//     let strTime = hours + ':' + minutes + ' ' + ampm
//     return strTime
// }

// function formatDate(eventDate){
//     let date = new Date(eventDate)
//     let month = (date.getMonth() + 1).toString().padStart(2, '0')
//     let day = date.getDate().toString().padStart(2, '0')
//     let year = date.getFullYear()
//     return `${month}/${day}/${year}`
// }

// function getStatus(eventDate){
//     let date = new Date(eventDate)
//     let currDate = new Date()
//     let status
//     if(date <= currDate){
//         status = "Completed"
//     }else if(date > currDate){
//         status = "Pending"
//     }
//     return status
// }

// function clearStorage(){
//     localStorage.clear()
//     window.location.href='login.html'
// }

// async function getDishesForEvent(eventID){
//     let dishurl = `http://localhost:5003/api/orderitems/${eventID}`
//     let response = await fetch(dishurl)
//     if(response.status == 200){
//         eventDishes = await response.json()
//     }
// }