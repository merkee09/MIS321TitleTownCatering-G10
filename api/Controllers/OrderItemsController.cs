using api.Databases;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using api.Models;
using Microsoft.AspNetCore.Cors;

namespace MyApp.Namespace
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("OpenPolicy")]
    public class OrderItemsController : ControllerBase
    {

        [HttpGet]
        public async Task<List<OrderItems>> Get()
        {
            OrderItemsDatabase myDatabase = new OrderItemsDatabase();
            return await myDatabase.GetAllOrderItems();

        }

       [HttpGet("{eventID}")]
        public async Task<List<OrderItems>> getDishesForEvent(int eventID)
        {
            System.Console.WriteLine("Made it to controller");
            OrderItemsDatabase myDatabase = new();
            return await myDatabase.GetAllDishesForEvent(eventID);
        }

        [HttpPost]
        public async Task Post([FromBody] OrderItems value)
        {
            OrderItemsDatabase myDatabase = new();
            await myDatabase.InsertOrderItem(value);
        }

        //javascript needs these kinds of methods to get data, Add more as needed. Just call the corresponding method in the database class



        //ADDED BY PARKER NEEDED FOR CALENDAR!!!!
        [HttpGet("week")]
        public async Task<List<OrderItems>> GetThisWeeksOrderItems()
        {
            OrderItemsDatabase myDatabase = new();
            return await myDatabase.GetOrderItemsForCurrentWeek();
        }
        
    }
}
