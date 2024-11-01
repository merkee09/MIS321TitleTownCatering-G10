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
    public class DishDatabase
    {

        //GETS DISHES FROM DATABASE
            private async Task<List<Dish>> SelectDishes(string sql, List<MySqlParameter> parms){

            List<Dish> myDishes = new List<Dish>();

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
                myDishes.Add(new Dish(){
                    DishID = reader.GetInt32(0),
                    DishName = reader.GetString(1),
                    DishStartAvailability = reader.GetDateTime(2),
                    DishEndAvailability = reader.GetDateTime(3).Date,
                    DishType = reader.GetString(4),
                    DishPrice = reader.GetDouble(5),
                    DishCost = reader.GetDouble(6),
                    DishImage = reader.GetString(7),
                    DishIsDeleted = reader.GetBoolean(8)
                });
            }

            return myDishes;

        }

        //DOES NOT RETURN ANY DISHES
            private async Task DishesNoReturnSql(string sql, List<MySqlParameter> parms){
            
            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;

            List<Dish> myRecipes = new List<Dish>();
            using var connection = new MySqlConnection(cs);
            await connection.OpenAsync();
            using var command = new MySqlCommand(sql, connection);

            if(parms != null){
                command.Parameters.AddRange(parms.ToArray());
            }

            await command.ExecuteNonQueryAsync();

        }


        //METHOD TO GET ALL DISHES
        public async Task<List<Dish>> GetAllDishes()
        {
            string sql = "SELECT * FROM Dishes where dish_deleted != TRUE;";

            List<MySqlParameter> parms = new();

            return await SelectDishes(sql, parms);

        }

        //METHOD TO GET ONE DISH BASED ON ID
        public async Task<List<Dish>> GetDish(int id){
            string sql = $"SELECT * FROM Dishes WHERE dish_id = @id;";

            List<MySqlParameter> parms = new();

            parms.Add(new MySqlParameter("@id", MySqlDbType.Int32) {Value = id});
            return await SelectDishes(sql, parms);
        }

            public async Task InsertDish(Dish dish){


            string sql = @$"INSERT INTO Dishes (dish_name, dish_start_availability, dish_end_availability, dish_type, dish_price, dish_cost, dish_image) 
                                VALUES (@dishName, @dishStartAvailability, @dishEndAvailability, @dishType, @dishPrice, @dishCost, @dishImage);";

            List<MySqlParameter> parms = new();

            parms.Add(new MySqlParameter("@dishID", MySqlDbType.Int32) {Value = dish.DishID});
            parms.Add(new MySqlParameter("@dishName", MySqlDbType.String) {Value = dish.DishName});
            parms.Add(new MySqlParameter("@dishStartAvailability", MySqlDbType.Date) {Value = dish.DishStartAvailability});
            parms.Add(new MySqlParameter("@dishEndAvailability", MySqlDbType.Date) {Value = dish.DishEndAvailability});
            parms.Add(new MySqlParameter("@dishType", MySqlDbType.String) {Value = dish.DishType});
            parms.Add(new MySqlParameter("@dishPrice", MySqlDbType.Decimal) {Value = dish.DishPrice});
            parms.Add(new MySqlParameter("@dishCost", MySqlDbType.Decimal) {Value = dish.DishCost});
            parms.Add(new MySqlParameter("@dishImage", MySqlDbType.String) {Value = dish.DishImage});


            await DishesNoReturnSql(sql, parms);
        }

        public async Task DeleteDish(int id){
            string sql = $"UPDATE Dishes set dish_deleted = !dish_deleted WHERE dish_id = @id;";

            List<MySqlParameter> parms = new();

            parms.Add(new MySqlParameter("@id", MySqlDbType.Int32) {Value = id});
            await DishesNoReturnSql(sql, parms);
        }

        public async Task UpdateDish(Dish dish){



            string sql = @$"UPDATE Dishes set 
            dish_name = @dishName,
            dish_start_availability = @dishStartAvailability,
            dish_end_availability = @dishEndAvailability,
            dish_type = @dishType,
            dish_price = @dishPrice,
            dish_cost = @dishCost,
            dish_image = @dishImage
            where dish_id = @dishID";

            List<MySqlParameter> parms = new();

            parms.Add(new MySqlParameter("@dishID", MySqlDbType.Int32) {Value = dish.DishID});
            parms.Add(new MySqlParameter("@dishName", MySqlDbType.String) {Value = dish.DishName});
            parms.Add(new MySqlParameter("@dishStartAvailability", MySqlDbType.Date) {Value = dish.DishStartAvailability});
            parms.Add(new MySqlParameter("@dishEndAvailability", MySqlDbType.Date) {Value = dish.DishEndAvailability});
            parms.Add(new MySqlParameter("@dishType", MySqlDbType.String) {Value = dish.DishType});
            parms.Add(new MySqlParameter("@dishPrice", MySqlDbType.Decimal) {Value = dish.DishPrice});
            parms.Add(new MySqlParameter("@dishCost", MySqlDbType.Decimal) {Value = dish.DishCost});
            parms.Add(new MySqlParameter("@dishImage", MySqlDbType.String) {Value = dish.DishImage});


            await DishesNoReturnSql(sql, parms);
        }

        // public async Task FavoriteRecipe(int id){
        //     string sql = $"UPDATE Recipes set recipe_favorited = !recipe_favorited WHERE recipe_id = @id;";

        //     List<MySqlParameter> parms = new();

        //     parms.Add(new MySqlParameter("@id", MySqlDbType.Int32) {Value = id});
        //     await RecipesNoReturnSql(sql, parms);
        // }

        public async Task<List<Dish>> GetDeletedDishes(){
            string sql = "SELECT * FROM Dishes where dish_deleted = TRUE;";

            List<MySqlParameter> parms = new();

            return await SelectDishes(sql, parms);

        }
        
    }
}