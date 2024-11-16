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
    public class CustomerDatabase
    {
        private async Task<List<Customer>> SelectCustomers(string sql, List<MySqlParameter> parms){


            List<Customer> myCustomers = new List<Customer>();

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
                myCustomers.Add(new Customer(){
                    CustomerEmail = reader.GetString(0),
                    CustomerPassword = reader.GetString(1),
                    CustomerFirstName = reader.GetString(2),
                    CustomerLastName = reader.GetString(3),
                    CustomerPhone = reader.GetString(4),
                    CustomerReferral = reader.GetString(5),
                });
            }

            return myCustomers;

        }

            private async Task CustomersNoReturnSql(string sql, List<MySqlParameter> parms){
            
            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;

            List<Customer> myCustomers = new List<Customer>();
            using var connection = new MySqlConnection(cs);
            await connection.OpenAsync();
            using var command = new MySqlCommand(sql, connection);

            if(parms != null){
                command.Parameters.AddRange(parms.ToArray());
            }

            await command.ExecuteNonQueryAsync();

        }
        public async Task<List<Customer>> GetAllCustomers()
        {
            string sql = "SELECT * FROM Customers;";

            List<MySqlParameter> parms = new();

            return await SelectCustomers(sql, parms);

        }

        public async Task InsertCustomer(Customer customer){

            System.Console.WriteLine("Made it to SQL");


            string sql = @$"INSERT INTO Customers (customer_email, customer_password, customer_first_name, customer_last_name, customer_phone, customer_referral) 
                                VALUES (@customerEmail, @customerPassword, @customerFirstName, @customerLastName, @customerPhone, @customerReferral);";

            List<MySqlParameter> parms = new();

            parms.Add(new MySqlParameter("@customerEmail", MySqlDbType.String) {Value = customer.CustomerEmail});
            parms.Add(new MySqlParameter("@customerPassword", MySqlDbType.String) {Value = customer.CustomerPassword});
            parms.Add(new MySqlParameter("@customerFirstName", MySqlDbType.String) {Value = customer.CustomerFirstName});
            parms.Add(new MySqlParameter("@customerLastName", MySqlDbType.String) {Value = customer.CustomerLastName});
            parms.Add(new MySqlParameter("@customerPhone", MySqlDbType.String) {Value = customer.CustomerPhone});
            parms.Add(new MySqlParameter("@customerReferral", MySqlDbType.String) {Value = customer.CustomerReferral});


            await CustomersNoReturnSql(sql, parms);
        }
    }
}