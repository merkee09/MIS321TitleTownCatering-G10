using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Dish
    {
        public int DishID { get; set; }
        public string DishName { get; set; }
        public DateTime DishStartAvailability { get; set; }  
        public DateTime DishEndAvailability { get; set; }
        public string DishType { get; set; }
        public double DishPrice { get; set; }
        public double DishCost { get; set; }
        public string DishImage { get; set; }
        public bool DishIsDeleted { get; set; }
        
    }
}