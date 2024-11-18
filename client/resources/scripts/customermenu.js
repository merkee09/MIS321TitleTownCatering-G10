let myEvents = []
const url = "http://localhost:5003/api/event"

function handleOnLoad(){
    getCustomerEvents()

}

async function getCustomerEvents(){
    let response = await fetch(url)
    if(response.status == 200){
        myEvents = await response.json()

        console.log(myEvents)
        CreateTable(myEvents)
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
                    <th>Dishes Ordered</th>
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
                    <td> </td>
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