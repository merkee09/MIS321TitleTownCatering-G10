let myDishes = []
const url = "http://localhost:5003/api/dish"

async function handleOnLoad(){
    await getAllDishes()
    // sortDishes()
    createDishTable()

}

async function getAllDishes(){
    let response = await fetch(url)
    if(response.status == 200){
        myDishes = await response.json()
    }
}


async function createDishTable(){
    console.log(myDishes)



    // sortDishes(myDishes)

    let html = `
    <button class="btn btn-primary btn-lg" onclick="handleAddForm()">Add Dish</button>  <button class="btn btn-primary btn-lg" onclick="createDeletedTable()">Deleted Dishes</button><br><br>
    <table class="table">
  <tr>
    <th>Name</th>
    <th>Start Availability</th>
    <th>End Availability</th>
    <th>Type</th>
    <th>Price</th>
    <th>Cost</th>
    <th>Image</th>
    <th>Edit Dish</th>
    <th>Delete Dish</th>
  </tr>`

    myDishes.forEach((dish) =>{
        let startAvailability = new Date(dish.dishStartAvailability).toISOString().slice(0, 10);
        let endAvailability = new Date(dish.dishEndAvailability).toISOString().slice(0, 10);
        html +=
        `
        <tr>
            <td>${dish.dishName}</td>
            <td>${startAvailability}</td>
            <td>${endAvailability}</td>
            <td>${dish.dishType}</td>
            <td>${dish.dishPrice}</td>
            <td>${dish.dishCost}</td>
            <td><img src="${dish.dishImage}" width="auto" height="75"alt="dish image>"</td>
            <td><button type="button" onclick ="handleEditForm('${dish.dishID}', '${dish.dishName}', '${startAvailability}', '${endAvailability}', '${dish.dishType}', '${dish.dishPrice}', '${dish.dishCost}', '${dish.dishImage}')"class="btn edit"><i class="bi bi-pencil"></i></button></td>
            <td><button type="button" onclick="handleDelete('${dish.dishID}')" class="btn delete"><i class="fa fa-trash"></i></button></td>
            </tr>
        `
    })
    html += `
    </table>
    <br>
    <a href="./adminHome.html"><button id="adminHomeButton" class="btn btn-adminHomeButton">Admin Home Page</button></a>`
     

    document.getElementById("app").innerHTML = html
}



async function createDeletedTable(){
    let deletedUrl = url + "/deleted";
    let resopnse = await fetch(deletedUrl);
    let deletedDishes = [];
    
    if (resopnse.status == 200) {
        deletedDishes = await resopnse.json();
    }

    let html = `
    <table class="table">
      <tr>
      <th>Name</th>
      <th>Start Availability</th>
      <th>End Availability</th>
      <th>Type</th>
      <th>Price</th>
      <th>Cost</th>
      <th>Image</th>
      <th>Restore Dish</th>
      </tr>`;

    deletedDishes.forEach((dish) => {
        let startAvailability = new Date(dish.dishStartAvailability).toISOString().slice(0, 10);
        let endAvailability = new Date(dish.dishEndAvailability).toISOString().slice(0, 10);
        html += `
        <tr>
            <td>${dish.dishName}</td>
            <td>${startAvailability}</td>
            <td>${endAvailability}</td>
            <td>${dish.dishType}</td>
            <td>${dish.dishPrice}</td>
            <td>${dish.dishCost}</td>
            <td><img src="${dish.dishImage}" width="auto" height="75"alt="dish image>"</td>
            <td><button type="button" onclick="handleRestore('${dish.dishID}')" class="btn btn-secondary">Restore</button></td>
        </tr>`;
    });

    html += `</table>
    <br>
    <button class="btn btn-primary btn-lg" onclick="handleOnLoad()">Back to Dishes</button>`;

    document.getElementById("app").innerHTML = html;
}

async function handleRestore(id){

    await fetch(url+"/"+id, {
        method: "DELETE",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
        });
    handleOnLoad()

}



function handleAddForm(){


    let html =
    `
    <form onsubmit="return false">
    <label for="name">Dish Name</label><br>
    <input type="text" id="name" name="name"><br>

    <label for="startAvailability">Start Availability</label><br>
    <input type="date" id="startAvailability" name="startAvailability"><br>

    <label for="endAvailability">End Availability</label><br>
    <input type="date" id="endAvailability" name="endAvailability"><br>

    <label for="type">Type</label><br>
    <input type="text" id="type" name="type"><br>

    <label for="price">Price</label><br>
    <input type="text" id="price" name="price"><br>

    <label for="cost">Cost</label><br>
    <input type="text" id="cost" name="cost"><br>

    <label for="image">Image</label><br>
    <input type="text" id="image" name="image"><br>
    
    <button onclick="handleAdd()" class="btn btn-primary">Submit</button><br><br>
    <button onclick="handleOnLoad()" class="btn btn-primary">Back</button><br>
</form>
    `
    document.getElementById("app").innerHTML = html
}

async function handleAdd(){
    let dish = {
        dishName: document.getElementById('name').value,
        dishStartAvailability: document.getElementById('startAvailability').value,
        dishEndAvailability: document.getElementById('endAvailability').value,
        dishType: document.getElementById('type').value,
        dishPrice: document.getElementById('price').value,
        dishCost: document.getElementById('cost').value,
        dishImage: document.getElementById('image').value
    }

    //Save recipe
    console.log(dish)
    await fetch(url, {
    method: "POST",
    body: JSON.stringify(dish),
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
    });


    handleOnLoad()
}

function handleEditForm(id, name, startAvailability, endAvailability, type, price, cost, image){

    html = `
    <form onsubmit="return false">
        <label for="name">Dish Name</label><br>
        <input type="text" id="name" name="name" value="${name}"><br>

        <label for="startAvailability">Start Availability</label><br>
        <input type="date" id="startAvailability" name="startAvailability" value="${startAvailability}"><br>

        <label for="endAvailability">End Availability</label><br>
        <input type="date" id="endAvailability" name="endAvailability" value="${endAvailability}"><br>

        <label for="type">Type</label><br>
        <input type="text" id="type" name="type" value="${type}"><br>

        <label for="price">Price</label><br>
        <input type="text" id="price" name="price" value="${price}"><br>

        <label for="cost">Cost</label><br>
        <input type="text" id="cost" name="cost" value="${cost}"><br>

        <label for="image">Image</label><br>
        <input type="text" id="image" name="image" value="${image}"><br>


        <input type="hidden" id="id" name="id" value="${id}"><br>
        <button onclick="handleEdit()" class="btn btn-primary">Submit</button><br><br>
        <button onclick="handleOnLoad()" class="btn btn-primary">Back</button><br>
</form>
    </form>
    `;
    
    document.getElementById("app").innerHTML = html;
}

async function handleEdit(){
    let dish = {
        dishID: document.getElementById('id').value,
        dishName: document.getElementById('name').value,
        dishStartAvailability: document.getElementById('startAvailability').value,
        dishEndAvailability: document.getElementById('endAvailability').value,
        dishType: document.getElementById('type').value,
        dishPrice: document.getElementById('price').value,
        dishCost: document.getElementById('cost').value,
        dishImage: document.getElementById('image').value
    }

    //Save recipe

    await fetch(url, {
    method: "PUT",
    body: JSON.stringify(dish),
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
    });


    handleOnLoad()
}

async function handleDelete(id){

    console.log(id)

    await fetch(url+"/"+id, {
        method: "DELETE",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
        });
    handleOnLoad()

}

// async function handleFavorite(id){

//     await fetch(url+"/"+id, {
//         method: "PUT",
//         headers: {
//             "Content-type": "application/json; charset=UTF-8"
//         }
//         });
//     handleOnLoad()

// }

// async function sortRecipes(myDishes) {
//     myDishes.sort((a, b) => b.recipeRating - a.recipeRating);
// }




// <br>
// <button class="btn btn-primary btn-lg" onclick="handleAddForm()">Add Recipe</button>
// <button class="btn btn-primary btn-lg" onclick="createDeletedTable()">Deleted Recipes</button>
// <button class="btn btn-primary btn-lg" onclick="createFavoriteTable('${myDishes}')">Favorite Recipes</button>
