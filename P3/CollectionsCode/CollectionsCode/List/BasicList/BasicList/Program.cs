using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;

namespace BasicList
{
    class Program
    {
        static void Main(string[] args)
        {
            #region InstantiateList
            // There are two ways to instantiate a List<T>

            List<string> daysOfWeek1 = new List<string>();

            daysOfWeek1.Add("Monday");
            daysOfWeek1.Add("Tuesday");
            daysOfWeek1.Add("Wednesday");
            daysOfWeek1.Add("Thursday");
            daysOfWeek1.Add("Friday");
            daysOfWeek1.Add("Saturday");
            daysOfWeek1.Add("Sunday");

            // Collection Initializer
            // Collection Initializer is what is referred to as "syntactic sugar"
            // the compiler actually first instantiates the empty list and
            // then generates an add for each item listed as we did above.
            List<string> daysOfWeek2 = new List<string>
            {
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday"
            };
            #endregion InstantiateList


            #region ListFaculty
            /*
             * First - get some data to build a real List of tyep Faculty
             * faculty.json is a file in BasicList>BasicList>bin>Debug>net5.0 
             * (not a great idea, but OK for this)
             * Go get the file
            */
            var jsonData = File.ReadAllText(@"facutly.json");

            //turn it into JSON
            var data = JsonConvert.DeserializeObject<List<Faculty>>(jsonData);

            //create the List of Type Faculty named faculty
            List<Faculty> faculty = new List<Faculty>();
            //populate the List of Type Faculty named faculty
            foreach (var item in data)
                faculty.Add(item);

            Console.WriteLine("////////////////////Put out all faculty");
            foreach (var item in faculty)
            {
                Console.WriteLine(item.username);
                Console.WriteLine(item.name);
                Console.WriteLine(item.title);
                Console.WriteLine(item.office);
                Console.WriteLine(item.phone);
                Console.WriteLine(item.email);
                Console.WriteLine(Environment.NewLine);
            }

            Console.WriteLine(Environment.NewLine);
            Console.WriteLine("////////////////////Get a specific faculty");
            /* Find "username": "jalics"
             * FindIndex takes as an argument a "predicate" which is an expression that returns a boolean
             * Arrow is a lambda expression
             * FindIndex() runs the expression on every element until it finds a match
             */
            int index = faculty.FindIndex(x => x.username == "vlhics");
            Faculty selectedFaculty = faculty[index];

            Console.WriteLine(selectedFaculty.username);
            Console.WriteLine(selectedFaculty.name);
            Console.WriteLine(selectedFaculty.title);
            Console.WriteLine(selectedFaculty.office);
            Console.WriteLine(selectedFaculty.phone);
            Console.WriteLine(selectedFaculty.email);
            #endregion ListFaculty

            Console.WriteLine("////////////////////Finished!");
        }
    }
}

