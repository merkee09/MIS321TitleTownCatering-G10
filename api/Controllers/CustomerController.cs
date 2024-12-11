using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using api.Databases;
using api.Models;
using Microsoft.AspNetCore.Cors;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("OpenPolicy")]
    public class CustomerController : ControllerBase
    {
        // GET: api/customer
        [HttpGet]
        public async Task<List<Customer>> Get()
        {
            System.Console.WriteLine("made it to controller");
            CustomerDatabase myDatabase = new CustomerDatabase();
            return await myDatabase.GetAllCustomers();

        }


        // // GET: api/recipe/{id}
        // [HttpGet("{id}", Name = "Get")] 
        // public async Task<List<Dish>> Get(int id)
        // {
        //     DishDatabase myDatabase = new DishDatabase();
        //     return await myDatabase.GetDish(id);
        // }


        //POST
        [HttpPost]
        public async Task Post([FromBody] Customer value)
        {
            CustomerDatabase myDatabase = new();
            await myDatabase.InsertCustomer(value);
        }

        // // DELETE: api/recipe/{id}
        // [HttpDelete("{id}")] 
        // public async Task Delete(int id)
        // {

        //     DishDatabase myDatabase = new();
        //     await myDatabase.DeleteDish(id);
        // }

        // [HttpPut]
        // public async Task Put([FromBody] Dish value)
        // {

        //     System.Console.WriteLine("Made it to Update Dish");

        //     DishDatabase myDatabase = new();
        //     await myDatabase.UpdateDish(value);
        // }

        // // [HttpPut("{id}")] 
        // // public async Task Put(int id)
        // // {

        // //     DishDatabase myDatabase = new();
        // //     await myDatabase.FavoriteRecipe(id);
        // // }

        // [HttpGet("deleted")]
        // public async Task<List<Dish>> GetDeletedRecipes()
        // {
        //     DishDatabase myDatabase = new();
        //     return await myDatabase.GetDeletedDishes();
        // }
    }
}