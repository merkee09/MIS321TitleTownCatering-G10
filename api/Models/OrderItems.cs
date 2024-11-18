using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class OrderItems
    {
        public int OrderID {get; set;}
        public int EventID {get; set;}
        public int DishID {get; set;}
        public DateTime OrderDate {get; set;}
        public int Quantity {get; set;}
        public double TotalCostPerItem {get; set;}
        public double OrderTotalCost {get; set;}
        public double OrderTip {get; set;}

    }
}