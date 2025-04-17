using System;

namespace BasicArray
{
    class Program
    {
        static void Main(string[] args)
        {

            #region variable vs Array
            Console.WriteLine("////////////////////Start var vs Array");
            string monday = "Monday";

            string[] daysOfWeek =
            {
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday"
            };

            Console.WriteLine(monday);//access to the value

            Console.WriteLine(daysOfWeek);//can't get value this way...
            Console.WriteLine(daysOfWeek[0]);//direct access or iterate

            Console.WriteLine(Environment.NewLine);//blank line

            // Simplest way to iterate through array is with "foreach"
            foreach (var item in daysOfWeek)
            {
                Console.WriteLine(item);
            }
            Console.WriteLine("////////////////////End var vs Array");
            #endregion

            #region initializeValues
            Console.WriteLine("////////////////////Start initialize values");
            string[] states = new string[50];

            foreach (var item in states)
                Console.WriteLine(item);//50 blank lines

            int numStudents = 25;
            int[] studentAges = new int[numStudents];

            foreach (var item in studentAges)
                Console.WriteLine(item);//25 zeros
            Console.WriteLine("////////////////////End initialize values");
            #endregion

            #region ArrayReplaceItem
            Console.WriteLine("////////////////////Start Array Replace Item");
            string[] colors =
            {
                "red",
                "orange",
                "yellow",
                "greem",
                "blue",
                "indigo",
                "violet"
            };

            foreach (var item in colors)
                Console.WriteLine(item);

            colors[3] = "green";//fix "greem"

            Console.WriteLine(Environment.NewLine);

            foreach (var item in colors)
                Console.WriteLine(item);
            Console.WriteLine("////////////////////End Array Replace Item");
            #endregion

            Console.WriteLine("////////////////////Finished!");
        }

    }
}
