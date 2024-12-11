let myEvents = []
let birthday = 0
let wedding = 0
let graduation = 0
let corporate = 0
let other = 0

const url = "http://localhost:5003/api/event"

function handleOnLoad(){
    getAllEvents()
}

async function getAllEvents(){
    let resopnse = await fetch(url)
    if(resopnse.status == 200){
        myEvents = await resopnse.json()
        console.log(myEvents)
        AddEvents(myEvents)
    }
}




function AddEvents(checkEvents){
  console.log(checkEvents)
  const currentDate = new Date();
  const pastSixMonths = new Date();
  pastSixMonths.setMonth(currentDate.getMonth() - 6)
  checkEvents.forEach((event => {
    const eventDate = new Date(event.eventDate)
    if(eventDate >= pastSixMonths && eventDate <= currentDate){
    if(event.eventType == "Birthday"){
      birthday++
      console.log(event.eventType)
    }else if(event.eventType == "Wedding"){
      wedding++
    }else if(event.eventType == "Graduation"){
      graduation++
    }else if(event.eventType == "Corporate"){
      corporate++
    }else if(event.eventType == "Other"){
      other++
    }
  }
}
))
  console.log(birthday)

    //W3Schools bar chart
  const xValues = ["Birthday", "Wedding", "Graduation", "Corporate", "Other"]
  const yValues = [birthday, wedding, graduation, corporate, other]
  const barColors = ["red", "green","blue","orange","brown"]

  new Chart("myChart", {
    type: "bar",
    data: {
      labels: xValues,
      datasets: [{
        backgroundColor: barColors,
        data: yValues
      }]
    },
    options: {}
  })
}