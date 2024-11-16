using System;
using System.Collections.Generic;



namespace api.Models
{
    public class Schedule
    {
        
        public List<Event> Events;

        //Class holds all the events. I'm thinking I'll use this as a maintained list. Could just write it all here?
        public Schedule(List<Event> EvInput){//i think this works
            Events = EvInput;


        }

        public string AddEvent(Event newEvent){
            // Console.WriteLine("got here");
            string errorString = RedundancyCheck(newEvent); //check for overlap or overbook
                                                            //if we recieeve null there are no errors

            if(errorString == null){
                Events.Add(newEvent);
                //stage on database with sql
                
                return("All clear");


            }else{
                return(errorString);
                
            }


        }

        private string RedundancyCheck(Event newEvent){  //checks if there is any schedule overlap, and tells you what's wrong

            int count = CountOccurencesOfDate(Events, newEvent.EventDate);    

            if(count >= 2){  //overbooking error, two already on this day.
                return( "- Overbooking error, please choose another date. \n");




            }


                            //one other event on date.
            if(count == 1){  // risk of overlap, use the duration, and TimeSpan struct
            
                Event overlapStart = new Event();
                foreach(Event x in Events){
                    if(x.EventDate.Day == newEvent.EventDate.Day && x.EventDate.Month == newEvent.EventDate.Month && x.EventDate.Year == newEvent.EventDate.Year){
                         overlapStart = x;
                         break; //target found, leave search loop
                    }
                       //found the potential overlapper. We KNOW the date is the same. We only need look at the time values and duration

                }
                


                DateTime overlapEnd = overlapStart.EventDate.AddHours(overlapStart.EventDuration);
                DateTime newEventEnd = newEvent.EventDate.AddHours(newEvent.EventDuration);
                
            
                   

                //found the potential overlapper, put it in overlap, now need start time and duration of both to look for overlap
                //which one is first?
                if(newEvent.EventDate < overlapStart.EventDate){//if the new event starts before

                    
                    if(overlapStart.EventDate < newEventEnd ){//existing starts before it can end
                        return("Event overlaps with an exising event. Please schedule earlier in the day. \n");

                    }

                //         message += "Event overlaps with an exising event. Please schedule earlier in the day. \n";
        
                }else{//existing event starts first

                    if(newEvent.EventDate < overlapEnd){
                        return("Event overlaps with an exising event. Please schedule later in the day. \n");
                    }
                
                    //      message += "Event overlaps with an exising event. Please schedule later in the day. \n";

                };
                    


                }






            


            if(count == 0){ //no other events on this date
                return(null);  //return no because no issues

            }

            //if it's zero no work needs to be done and we're cool

            return null;





        }

        private int CountOccurencesOfDate(List<Event> dates, DateTime dateToCheck){
    
            int c = 0;
            foreach(Event x in dates){
                if(x.EventDate.Day == dateToCheck.Day && x.EventDate.Month == dateToCheck.Month && x.EventDate.Year == dateToCheck.Year){
                    c++;
                    
                }


            }
            return c;


        }



    }
}