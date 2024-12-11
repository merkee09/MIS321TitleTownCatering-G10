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
    public class OrderItemsDatabase
    {

                public async Task<List<OrderItems>> SelectOrderItems(string sql, List<MySqlParameter> parms)
        {
            List<OrderItems> myOrderItems = new();
            string cs = new ConnectionString().cs;

            using var connection = new MySqlConnection(cs);
            await connection.OpenAsync();
            using var command = new MySqlCommand(sql, connection);

            if (parms != null)
            {
                command.Parameters.AddRange(parms.ToArray());
            }

            using var reader = await command.ExecuteReaderAsync();

            while (await reader.ReadAsync())
            {
                myOrderItems.Add(new OrderItems()
                {
                    OrderID = reader.GetInt32(0),
                    DishID = reader.GetInt32(1),
                    EventID = reader.GetInt32(2),
                    OrderDate = reader.GetDateTime(3),
                    Quantity = reader.GetInt32(4),
                    TotalCostPerItem = reader.GetDouble(5),
                    OrderTotalCost = reader.GetDouble(6),
                    OrderTip = reader.GetDouble(7)
                });
            }

            return myOrderItems;
        }
        public async Task<List<OrderItems>> GetAllOrderItems()
        {
            string sql = "SELECT * FROM OrderItems;";
            return await SelectOrderItems(sql, new List<MySqlParameter>());
        }

public async Task InsertOrderItem(OrderItems item)
        {
            string sql = @"
                INSERT INTO OrderItems 
                (order_id, event_id, dish_id, order_date, quantity, order_cost_per_item, order_total_cost, order_tip) 
                VALUES (@OrderID, @EventID, @DishID, @OrderDate, @Quantity, @TotalCostPerItem, @OrderTotalCost, @OrderTip);
            ";

            List<MySqlParameter> parms = new()
            {
                new MySqlParameter("@OrderID", MySqlDbType.Int32) { Value = item.OrderID },
                new MySqlParameter("@EventID", MySqlDbType.Int32) { Value = item.EventID },
                new MySqlParameter("@DishID", MySqlDbType.Int32) { Value = item.DishID },
                new MySqlParameter("@OrderDate", MySqlDbType.DateTime) { Value = item.OrderDate },
                new MySqlParameter("@Quantity", MySqlDbType.Int32) { Value = item.Quantity },
                new MySqlParameter("@TotalCostPerItem", MySqlDbType.Double) { Value = item.TotalCostPerItem },
                new MySqlParameter("@OrderTotalCost", MySqlDbType.Double) { Value = item.OrderTotalCost },
                new MySqlParameter("@OrderTip", MySqlDbType.Double) { Value = item.OrderTip }
            };

            await OrderItemsNoReturnSql(sql, parms);
        }

         
         
         
        public async Task OrderItemsNoReturnSql(string sql, List<MySqlParameter> parms)
        {
            string cs = new ConnectionString().cs;

            using var connection = new MySqlConnection(cs);
            await connection.OpenAsync();
            using var command = new MySqlCommand(sql, connection);

            if (parms != null)
            {
                command.Parameters.AddRange(parms.ToArray());
            }

            await command.ExecuteNonQueryAsync();
        }



        public async Task InsertOrderItems(OrderItems orderItems){
            System.Console.WriteLine("Made it to database call");

            string sql = @$"INSERT INTO OrderItems (dish_id, event_id, quantity, order_cost_per_item, order_total_cost, order_tip) 
                                VALUES (@dishID, @eventID, @quantity, @orderCostPerItem, @orderTotalCost, @orderTip);";

            List<MySqlParameter> parms = new();

            parms.Add(new MySqlParameter("@dishID", MySqlDbType.Int32) {Value = orderItems.DishID});
            parms.Add(new MySqlParameter("@eventID", MySqlDbType.Int32) {Value = orderItems.EventID});
            // parms.Add(new MySqlParameter("@orderDate", MySqlDbType.Date) {Value = orderItems.OrderDate});
            parms.Add(new MySqlParameter("@quantity", MySqlDbType.Int32) {Value = orderItems.Quantity});
            parms.Add(new MySqlParameter("@orderCostPerItem", MySqlDbType.Decimal) {Value = orderItems.TotalCostPerItem});
            parms.Add(new MySqlParameter("@orderTotalCost", MySqlDbType.Decimal) {Value = orderItems.OrderTotalCost});
            parms.Add(new MySqlParameter("@orderTip", MySqlDbType.Decimal) {Value = orderItems.OrderTip});


            await OrderItemsNoReturnSql(sql, parms);
        }

        public async Task<List<OrderItems>> GetFromEventID(int EventID)
        {
            string sql = "SELECT * FROM OrderItems WHERE event_id = @EventID;";
            List<MySqlParameter> parms = new()
            {
                new MySqlParameter("@EventID", MySqlDbType.Int32) { Value = EventID }
            };
            return await SelectOrderItems(sql, parms);
        }



        public async Task<List<OrderItems>> GetFromCustomerEmail(string custEmail)
        {
            string sql = @"
                SELECT * 
                FROM OrderItems 
                JOIN Events ON OrderItems.event_id = Events.event_id 
                WHERE Events.customer_email = @custEmail;
            ";
            List<MySqlParameter> parms = new()
            {
                new MySqlParameter("@custEmail", MySqlDbType.VarChar) { Value = custEmail }
            };
            return await SelectOrderItems(sql, parms);
        }

        
        public async Task<List<OrderItems>> GetOrderItemsForCurrentWeek()
        {
            DateTime startOfWeek = DateTime.Now.Date.AddDays(-(int)DateTime.Now.DayOfWeek);
            DateTime endOfWeek = startOfWeek.AddDays(6);

            string sql = @"
                SELECT * 
                FROM OrderItems
                WHERE OrderDate BETWEEN @StartOfWeek AND @EndOfWeek;
            ";

            List<MySqlParameter> parms = new()
            {
                new MySqlParameter("@StartOfWeek", MySqlDbType.DateTime) { Value = startOfWeek },
                new MySqlParameter("@EndOfWeek", MySqlDbType.DateTime) { Value = endOfWeek }
            };

            return await SelectOrderItems(sql, parms);
        }

        public async Task<List<OrderItems>> GetAllDishesForEvent(int eventID)
        {

            string sql = @"
            SELECT d.dish_name
            FROM OrderItems oi
            INNER JOIN Dishes d ON oi.dish_id = d.dish_id
            WHERE oi.event_id = @EventID;
            ";

            List<MySqlParameter> parms = new()
            {
                new MySqlParameter("@EventID", MySqlDbType.DateTime) { Value = eventID }
            };

            return await SelectOrderItems(sql, parms);
        }

        

        
    }
}