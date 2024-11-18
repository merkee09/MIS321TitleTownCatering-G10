let myCustomers = []
const url = "http://localhost:5003/api/customer"

function handleOnLoad(){
    getAllCustomers()
    createLoginForm()

}

async function getAllCustomers(){
    let response = await fetch(url)
    if(response.status == 200){
        myCustomers = await response.json()

        console.log(myCustomers)
    }
}

function createLoginForm(){

    html =
    `
    <form class="form-group">
                        <label for="email" class="login-label">Email</label>
                        <input type="text" class="form-rules" id="email" name = "email">
                        <br><br>
                        <label for="password" class="login-label">Password</label>
                        <input type="password" class="form-rules" id="password" name="password">
    </form>
    <br><br>
    <button onclick="checkEmail()" class="btn log-in-button">Submit</button>
    
    `
    document.getElementById("app").innerHTML = html

}

function checkEmail(){
    let email = document.getElementById('email').value
    let password = document.getElementById('password').value
    let found = false
    
    myCustomers.forEach((customer => {
        if(customer.customerEmail == email){
            checkPassword(password, customer.customerPassword, email)
            found = true
        }

    }))

    if (!found) {
        failedLogin();
    }

}

function checkPassword(password, customerPassword, email){

    if(password == customerPassword){
        localStorage.setItem('username', email)
        successfulLogin()
    }
    else{
        failedLogin()
    }

}

function successfulLogin(){

    let html = `<h2>You have been logged in!</h2>`
    document.getElementById("app2").innerHTML = html
    window.location.href = "customermenu.html"

}

function failedLogin(){

    let html = `<h2>Please try a different username or password</h2>`
    document.getElementById("app2").innerHTML = html
}