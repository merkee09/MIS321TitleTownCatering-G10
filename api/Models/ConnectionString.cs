using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{

    public class ConnectionString
    {
        public string cs { get; set; }


        public ConnectionString(){
            string server = "bmsyhziszmhf61g1.cbetxkdyhwsb.us-east-1.rds.amazonaws.com";
            string database = "giweemwc8o7782vz";
            string port = "3306";
            string userName = "zhg8ehrpbkh31p8r";
            string password = "idwpvrlxpgwa1afw";

            cs = $@"server = {server};user={userName};database={database}; port={port}; password={password};";
        }
    }
}