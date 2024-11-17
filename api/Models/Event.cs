using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Org.BouncyCastle.Asn1.Cms;
 
namespace api.Models
{
    public class Event
    {
        public int EventID {get; set; }
        public bool EventFulfilled {get; set; }
        public string EventHealthAllergens {get; set; }
        public int EventChildAttendance {get; set; }
        public int EventTotalAttendance {get; set; }
        public string EventVenueAddressOne {get; set; }
        public string EventVenueAddressTwo {get; set; }
        public string EventVenueCity {get; set; }
        public int EventVenueZipCode {get; set; }
        public string EventType {get; set; }
        public string EventName {get; set; }
        public DateTime EventStartTime {get; set; }
        public int EventDuration {get; set; }
        public DateTime EventDate {get; set; }
        public string EventVenueName {get; set; }
        public string EventCustomerEmail {get; set; }
    }
}