let myCustomers = []
const url = "http://localhost:5003/api/customer"

function handleOnLoad(){
    getAllCustomers()
    createSignUpForm()

}

async function getAllCustomers(){
    let resopnse = await fetch(url)
    if(resopnse.status == 200){
        myCustomers = await resopnse.json()

    }
    console.log(myCustomers)
}

function createSignUpForm(){

    html =
    `
    <form class="sign-up-form">
        <label for="referral">How did you hear about us?</label>
        <select id="referral" name="referral">
            <option value="">Select</option>
            <option value="Google">Google</option>
            <option value="Social Media">Social Media</option>
            <option value="Recommendation">Recommendation</option>
            <option value="Magazine">Magazine</option>
            <option value="Other">Other</option>
        </select>
        <br>
        <label for="fname">First Name</label>
        <input type="text" id="fname" name="fname" required>
        <br>
        <label for="lname">Last Name</label>
        <input type="text" id="lname" name="lname" required>
        <br>
        <label for="email">Email</label>
        <input type="text" id="email" name="email" required>
        <br>
        <label for="phone">Phone Number</label>
        <input type="text" id="phone" name="phone" required>
        <br>
        <label for="password">Password</label>
        <input type="password" id="password" name="password" required>

        <button type="button" onclick="checkEmail()" class="new-account-button">Submit</button>
    </form>

    `
    document.getElementById("app").innerHTML = html

}



function checkEmail(){
    let email = document.getElementById('email').value
    let password = document.getElementById('password').value
    let first = document.getElementById('fname').value
    let last = document.getElementById('lname').value
    let phone = document.getElementById('phone').value;
    let referral = document.getElementById('referral').value
    let found = false

    console.log(email, password, first, last, phone, referral)
    
    myCustomers.forEach((customer => {
        if(customer.customerEmail == email){
            found = true
        }

    }))

    if(found == true){
        emailTaken()
    }

    if(found == false){
        addCustomer(email, password, first, last, phone, referral)
        localStorage.setItem('currentUser', email);
    }

}

async function addCustomer(email, password, first, last, phone, referral){
    localStorage.setItem('username', email)
    
    let customer = {
        customerEmail: email,
        customerPassword: password,
        customerFirstName: first,
        customerLastName: last,
        customerPhone: phone,
        customerReferral: referral
    }
    await fetch(url, {
        method: "POST",
        body: JSON.stringify(customer),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
        });
    
    window.location.href = "customermenu.html";

}



function emailTaken(){

    let html = document.getElementById("app").innerHTML
    html += `<h2>Email is already taken. Please try a different one or login</h2>`
    document.getElementById("app").innerHTML = html
}