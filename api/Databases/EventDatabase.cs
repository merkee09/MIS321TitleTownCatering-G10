using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using Microsoft.AspNetCore.Mvc.Rendering;
using System.Data.SqlTypes;
using MySql.Data.MySqlClient;
using System.Configuration;

namespace api.Databases
{
    public class EventDatabase
    {

        private async Task<List<Event>> SelectEvents(string sql, List<MySqlParameter> parms){

            List<Event> myEvents = new List<Event>();

            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;


            using var connection = new MySqlConnection(cs);
            await connection.OpenAsync();
            using var command = new MySqlCommand(sql, connection);

            if(parms != null){
                command.Parameters.AddRange(parms.ToArray());
            }

            using var reader = await command.ExecuteReaderAsync();
            while (await reader.ReadAsync())
            {
                myEvents.Add(new Event(){
                    EventID = reader.GetInt32(0),
                    EventFulfilled = reader.GetBoolean(1),
                    EventHealthAllergens = reader.GetString(2),
                    EventChildAttendance = reader.GetInt16(3),
                    EventTotalAttendance = reader.GetInt16(4),
                    EventAddress = reader.GetString(5),
                    EventType = reader.GetString(6),
                    EventName = reader.GetString(7),
                    // EventStartTime = reader.GetDateTime(8),
                    // EventDuration = reader.GetInt16(9),
                    // EventDate = reader.GetDateTime(10),
                    // EventVenueName = reader.GetString(11)
                });
            }

            return myEvents;

        }


        public async Task<List<Event>> GetAllCustomerEvents(string customerEmail){
            string sql = $"SELECT * FROM Events WHERE customer_email = @customerEmail;";

            List<MySqlParameter> parms = new();

            parms.Add(new MySqlParameter("@customerEmail", MySqlDbType.String) {Value = customerEmail});
            return await SelectEvents(sql, parms);
        }
        
    }
}