using api.Databases;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using api.Models;
using Microsoft.Extensions.ObjectPool;
using Microsoft.Extensions.ObjectPool;
using Microsoft.AspNetCore.Cors;

namespace MyApp.Namespace
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("OpenPolicy")]


    public class EventController : ControllerBase
    {

        // GET: api/recipe
        [HttpGet]
        public async Task<List<Event>> Get()
        {
            EventDatabase myDatabase = new EventDatabase();
            return await myDatabase.GetAllEvents();

        }

        [HttpGet("{eventID}")]
        public async Task<List<Event>> GetEventInformation(int eventID)
        {
            EventDatabase myDatabase = new();
            return await myDatabase.GetEventInformation(eventID);
        }

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
            int eventID = await myDatabase.InsertEvent(value);
            // await myDatabase.InsertEvent(value);
            System.Console.WriteLine(eventID);
            return Ok(new { message = "Event created successfully", eventID});
        }

    }
}