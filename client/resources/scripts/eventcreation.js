let myEvents = []
const url = "http://localhost:5003/api/event"
 
function handleOnLoad(){
    createEventForm()
}
 
function createEventForm(){
    html = `
 
    <div class="event-column-container">
    <div class="row">
        <div class="col">
            <form class="vertical=form">
                <div class="form-group">
                    <label for="eventname">Event Name</label>
                    <input type="text" id="eventname" name="eventname">
                </div>
                <br>
                <div class="form-group">
                    <label for="eventtype">Event Type</label>
                    <select id="eventtype" name="eventtype">
                    <option value="">Select</option>
                    <option value="Wedding">Wedding</option>
                    <option value="Graduation">Graduation</option>
                    <option value="Birthday">Birthday</option>
                    <option value="Corporate">Corporate</option>
                    <option value="Other">Other</option>
                    </select>
                </div>
                <br>
                <div class="form-group">
                    <label for="eventdate">Event Date</label>
                    <input type="date" id="eventdate" name="eventdate">
                </div>
                <br>
                <div class="form-group">
                    <label for="eventtime">Event Start Time</label>
                    <select id="eventtime" name="eventtime">
                    <option value="">Select</option>
                    <option value="T10:00:00.000Z">10:00 AM</option>
                    <option value="T10:30:00.000Z">10:30 AM</option>
                    <option value="T11:00:00.000Z">11:00 AM</option>
                    <option value="T11:30:00.000Z">11:30 AM</option>
                    <option value="T12:00:00.000Z">12:00 PM</option>
                    <option value="T12:30:00.000Z">12:30 PM</option>
                    <option value="T13:00:00.000Z">1:00 PM</option>
                    <option value="T13:30:00.000Z">1:30 PM</option>
                    <option value="T14:00:00.000Z">2:00 PM</option>
                    <option value="T14:30:00.000Z">2:30 PM</option>
                    <option value="T15:00:00.000Z">3:00 PM</option>
                    <option value="T15:30:00.000Z">3:30 PM</option>
                    <option value="T16:00:00.000Z">4:00 PM</option>
                    </select>
                </div>
                <br>
                <div class="form-group">
                    <label for="eventduration">Event Duration</label>
                    <select id="eventduration" name="eventduration">
                    <option value="">Select</option>
                    <option value="1">1 Hour</option>
                    <option value="2">2 Hours</option>
                    <option value="3">3 Hours</option>
                    <option value="4">4 Hours</option>
                    <option value="5">5 Hours</option>
                    </select>
                </div>
            </form>
        </div>
        <div class="col">
            <form class="vertical-form">
                <div class="form-group">
                    <label for="venuename">Venue Name</label>
                    <input type="text" id="venuename" name="venuename">
                </div>
                <br>
                <div class="form-group">
                    <label for="venueaddress1">Venue Address Line 1</label>
                    <input type="text" id="venueaddress1" name="venueaddress1">
                </div>
                <br>
                <div class="form-group">
                    <label for="venueaddress2">Venue Address Line 2</label>
                    <input type="text" id="venueaddress2" name="venueaddress2">
                </div>
                <br>
                <div class="form-group">
                    <label for="venuecity">Venue City</label>
                    <input type="text" id="venuecity" name="venuecity">
                </div>
                <br>
                <div class="form-group">
                    <label for="venuezipcode">Venue Zip Code</label>
                    <input type="text" id="venuezipcode" name="venuezipcode">
                </div>
                </form>
        </div>
        <div class="col">
            <form class="vertical-form">
                <div class="form-group">
                    <label for="totalattendance">Total Attendance</label>
                    <input type="text" id="totalattendance" name="totalattendance">
                </div>
                <br>
                <div class="form-group">
                    <label for="childattendance">Child Attendance (12 and Under)</label>
                    <input type="text" id="childattendance" name="childattendance">
                </div>
                <br>
                <div class="form-group">
                    <label for="healthconsiderations">Allergen/Health Considerations</label>
                    <input type="text" id="healthconsiderations" name="healthconsiderations">
                </div>
            </form>
            <button onclick="addNewEvent()"class="event-creation-button">Submit</button>
        </div>
    </div>
</div>
    `
 
    document.getElementById("app").innerHTML = html
}
 
async function addNewEvent(){
    const eventDate = document.getElementById('eventdate').value; 
    const eventTime = document.getElementById('eventtime').value; 

    const eventDateTime = eventDate.slice(0, 10) + eventTime;

    let event = {
        eventHealthAllergens: document.getElementById('healthconsiderations').value,
        eventChildAttendance: document.getElementById('childattendance').value,
        eventTotalAttendance: document.getElementById('totalattendance').value,
        eventVenueAddressOne: document.getElementById('venueaddress1').value,
        eventVenueAddressTwo: document.getElementById('venueaddress2').value,
        eventVenueCity: document.getElementById('venuecity').value,
        eventVenueZipCode: document.getElementById('venuezipcode').value,
        eventType: document.getElementById('eventtype').value,
        eventName: document.getElementById('eventname').value,
        eventStartTime: eventDateTime,
        eventDuration: document.getElementById('eventduration').value,
        eventDate: eventDateTime,
        eventVenueName: document.getElementById('venuename').value,
        eventCustomerEmail: localStorage.getItem('username')
    }
 
    console.log(event)
 
    try {
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(event),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });

        if (response.ok) {
            alert("Event created successfully!");
            const result = await response.json(); 
            localStorage.setItem('eventID', result.eventID);
            localStorage.setItem('eventDate', event.eventDate);
            window.location.href = "ordermenu.html"

        } else {
            const errorMessage = await response.json();
            alert(errorMessage.message || "An error occurred while creating the event.");
        }
    } catch (error) {
        console.error("Error submitting event:", error);
        alert("There w  as an issue submitting your event. Please try again.");
    }

}
 