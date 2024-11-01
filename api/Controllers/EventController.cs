using api.Databases;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using api.Models;

namespace MyApp.Namespace
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventController : ControllerBase
    {
        // // GET: api/recipe/{id}
        // [HttpGet("{customerEmail}", Name = "Get")] 
        // public async Task<List<Event>> Get(int id)
        // {
        //     EventDatabase myDatabase = new EventDatabase();
        //     return await myDatabase.GetAllCustomerEvents(customerEmail);
        // }
    }
}
