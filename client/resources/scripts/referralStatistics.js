let myCustomers = []
let google = 0
let socialmedia = 0
let magazine = 0
let recommendation = 0
let other = 0

const url = "http://localhost:5003/api/customer"

function handleOnLoad(){
    getAllCustomers()
}

async function getAllCustomers(){
    let resopnse = await fetch(url)
    if(resopnse.status == 200){
        myCustomers = await resopnse.json()
        console.log(myCustomers)
        AddReferrals(myCustomers)
    }
}




function AddReferrals(checkCustomers){
  console.log(checkCustomers)
  // const currentDate = new Date();
  // const pastSixMonths = new Date();
  // pastSixMonths.setMonth(currentDate.getMonth() - 6)
  checkCustomers.forEach((customer => {
    // const signUpDate = new Date(customer.signUpDate)
    // if(signUpDate >= pastSixMonths && signUpDate <= currentDate){
    if(customer.customerReferral == "Google"){
      google++
    }else if(customer.customerReferral == "Social Media"){
      socialmedia++
    }else if(customer.customerReferral == "Magazine"){
      magazine++
    }else if(customer.customerReferral == "Recommendation"){
      recommendation++
    }else if(customer.customerReferral == "Other"){
      other++
    }
  }
// }
))
  console.log(socialmedia)

  //W3Schools bar chart
  const xValues = ["Google", "Social Media", "Magazine", "Recommendation ", "Other"]
  let yValues = [google, socialmedia, magazine, recommendation, other]
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