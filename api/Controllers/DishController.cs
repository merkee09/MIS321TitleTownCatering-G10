using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using api.Databases;
using api.Models;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DishController : ControllerBase
    {
        // GET: api/dish
        [HttpGet]
        public async Task<List<Dish>> Get()
        {
            DishDatabase myDatabase = new DishDatabase();
            return await myDatabase.GetAllDishes();

        }


        // [HttpGet("{eventDate}")]
        // public async Task<List<Dish>> GetAllAvailableDishes(DateTime eventDate)
        // {
        //     DishDatabase myDatabase = new();
        //     return await myDatabase.GetAllAvailableDishes(eventDate);
        // }

        //POST
        [HttpPost]
        public async Task Post([FromBody] Dish value)
        {
            DishDatabase myDatabase = new();
            await myDatabase.InsertDish(value);
        }

        // DELETE: api/recipe/{id}
        [HttpDelete("{id}")] 
        public async Task Delete(int id)
        {

            DishDatabase myDatabase = new();
            await myDatabase.DeleteDish(id);
        }

        [HttpPut]
        public async Task Put([FromBody] Dish value)
        {

            System.Console.WriteLine("Made it to Update Dish");

            DishDatabase myDatabase = new();
            await myDatabase.UpdateDish(value);
        }

        // [HttpPut("{id}")] 
        // public async Task Put(int id)
        // {

        //     DishDatabase myDatabase = new();
        //     await myDatabase.FavoriteRecipe(id);
        // }

        [HttpGet("deleted")]
        public async Task<List<Dish>> GetDeletedRecipes()
        {
            DishDatabase myDatabase = new();
            return await myDatabase.GetDeletedDishes();
        }


    }
}
