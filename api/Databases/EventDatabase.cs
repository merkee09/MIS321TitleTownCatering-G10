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
                    EventChildAttendance = reader.GetInt32(3),
                    EventTotalAttendance = reader.GetInt32(4),
                    EventVenueAddressOne = reader.GetString(5),
                    EventVenueAddressTwo = reader.GetString(6),
                    EventVenueCity = reader.GetString(7),
                    EventVenueZipCode = reader.GetInt32(8),
                    EventType = reader.GetString(9),
                    EventName = reader.GetString(10),
                    EventStartTime = reader.GetDateTime(11),
                    EventDuration = reader.GetInt32(12),
                    EventDate = reader.GetDateTime(13),
                    EventVenueName = reader.GetString(14),
                    EventCustomerEmail = reader.GetString(15)
                });
            }
 
 
            return myEvents;
 
        }
 
        private async Task EventsNoReturnSQL(string sql, List<MySqlParameter> parms){
            
            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;
 
            List<Event> myEvents = new List<Event>();
            using var connection = new MySqlConnection(cs);
            await connection.OpenAsync();
            using var command = new MySqlCommand(sql, connection);
 
            if(parms != null){
                command.Parameters.AddRange(parms.ToArray());
            }
 
            await command.ExecuteNonQueryAsync();
 
        }
 
        public async Task<List<Event>> GetAllEvents()
        {
            string sql = "SELECT * FROM Events;";

            List<MySqlParameter> parms = new();

            return await SelectEvents(sql, parms);

        }
 

        public async Task<List<Event>> GetAllCustomerEvents(string customerEmail){
            string sql = $"SELECT * FROM Events WHERE customer_email = @customerEmail;";
 
 
            List<MySqlParameter> parms = new();
 
 
            parms.Add(new MySqlParameter("@customerEmail", MySqlDbType.String) {Value = customerEmail});
            return await SelectEvents(sql, parms);
        }
 
        public async Task<int> InsertEvent(Event myEvent){
            System.Console.WriteLine("made it to event database");
 
 
            string sql = @$"INSERT INTO Events (event_health_allergens, event_child_attendance, event_total_attendance, event_address_one, event_address_two, event_city, event_zip_code, event_type, event_name, event_start_time, event_duration, event_date, event_venue_name, customer_email)
                                VALUES (@eventHealthAllergens, @eventChildAttendance, @eventTotalAttendance, @eventVenueAddressOne, @eventVenueAddressTwo, @eventVenueCity, @eventVenueZipCode, @eventType, @eventName, @eventStartTime, @eventDuration, @eventDate, @eventVenueName, @customerEmail); SELECT LAST_INSERT_ID();";
 
            List<MySqlParameter> parms = new();

            // parms.Add(new MySqlParameter("@eventID", MySqlDbType.Int32) {Value = myEvent.EventHealthAllergens});
            // parms.Add(new MySqlParameter("@eventFulfilled", MySqlDbType.Int16) {Value = myEvent.EventHealthAllergens});
            parms.Add(new MySqlParameter("@eventHealthAllergens", MySqlDbType.String) {Value = myEvent.EventHealthAllergens});
            parms.Add(new MySqlParameter("@eventChildAttendance", MySqlDbType.Int32) {Value = myEvent.EventChildAttendance});
            parms.Add(new MySqlParameter("@eventTotalAttendance", MySqlDbType.Int32) {Value = myEvent.EventTotalAttendance});
            parms.Add(new MySqlParameter("@eventVenueAddressOne", MySqlDbType.String) {Value = myEvent.EventVenueAddressOne});
            parms.Add(new MySqlParameter("@eventVenueAddressTwo", MySqlDbType.String) {Value = myEvent.EventVenueAddressTwo});
            parms.Add(new MySqlParameter("@eventVenueCity", MySqlDbType.String) {Value = myEvent.EventVenueCity});
            parms.Add(new MySqlParameter("@eventVenueZipCode", MySqlDbType.Int32) {Value = myEvent.EventVenueZipCode});
            parms.Add(new MySqlParameter("@eventType", MySqlDbType.String) {Value = myEvent.EventType});
            parms.Add(new MySqlParameter("@eventName", MySqlDbType.String) {Value = myEvent.EventName});
            parms.Add(new MySqlParameter("@eventStartTime", MySqlDbType.DateTime) {Value = myEvent.EventStartTime});
            parms.Add(new MySqlParameter("@eventDuration", MySqlDbType.Int32) {Value = myEvent.EventDuration});
            parms.Add(new MySqlParameter("@eventDate", MySqlDbType.DateTime) {Value = myEvent.EventDate});
            parms.Add(new MySqlParameter("@eventVenueName", MySqlDbType.String) {Value = myEvent.EventVenueName});
            parms.Add(new MySqlParameter("@customerEmail", MySqlDbType.String) {Value = myEvent.EventCustomerEmail});
            
 
 
            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;

            using var connection = new MySqlConnection(cs);
            await connection.OpenAsync();

            using var command = new MySqlCommand(sql, connection);
            command.Parameters.AddRange(parms.ToArray());

            object result = await command.ExecuteScalarAsync();
            return Convert.ToInt32(result);
        }


        public async Task<List<Event>> GetEventInformation(int eventID){
            string sql = $"SELECT * FROM Events WHERE event_id = @eventID;";
 
 
            List<MySqlParameter> parms = new();
 
 
            parms.Add(new MySqlParameter("@eventID", MySqlDbType.String) {Value = eventID});
            return await SelectEvents(sql, parms);
        }
 
    }
}