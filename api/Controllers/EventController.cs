using api.Databases;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using api.Models;
using Microsoft.Extensions.ObjectPool;
using Microsoft.Extensions.ObjectPool;

namespace MyApp.Namespace
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventController : ControllerBase
    {
        // // GET:
        // // GET:
        // [HttpGet("{customerEmail}", Name = "Get")] 
        // public async Task<List<Event>> Get(int id)
        // {
        //     EventDatabase myDatabase = new EventDatabase();
        //     return await myDatabase.GetAllCustomerEvents(customerEmail);
        // }

        // GET: api/recipe
        // [HttpGet]
        // public async Task<List<Dish>> Get()
        // {
        //     DishDatabase myDatabase = new DishDatabase();
        //     return await myDatabase.GetAllDishes();

        // }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Event value)
        {
            EventDatabase myDatabase = new();

            List<Event> existingEvents = await myDatabase.GetAllEvents();
            
            Schedule schedule = new Schedule(existingEvents);

            string conflictMessage = schedule.AddEvent(value);
            if (conflictMessage != "All clear")
            {
                return BadRequest("Date or time selected is booked. Please try a different day or time.");
            }

            // If no conflicts, insert the event
            await myDatabase.InsertEvent(value);
            return Ok(new { message = "Event created successfully" });
        }

    }
}