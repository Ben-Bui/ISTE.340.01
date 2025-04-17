using System;
using System.Collections.Generic;

namespace BasicDIctionary
{
    class Program
    {
        static void Main(string[] args)
        {
            #region Create
            Faculty gpavks = new Faculty { username = "gpavks", name = "Garret Arcoraci", tagline = "", imagePath = "https://ist.rit.edu/assets/img/people/gpavks.jpg", title = "Lecturer", interestArea = "cit nsa ist", office = "GOL 2315", website = "", phone = "5854757854", email = "gpavks@rit.edu", twitter = "", facebook = "" };
            Faculty ciiics = new Faculty { username = "ciiics", name = "Catherine Beaton", tagline = "", imagePath = "https://ist.rit.edu/assets/img/people/ciiics.jpg", title = "Associate Professor", interestArea = "hci hcc cit ist", office = "GOL 2621", website = "http://www.ist.rit.edu/~cib", phone = "585-281-6162", email = "catherine.beaton@rit.edu", twitter = "", facebook = "" };
            Faculty dsbics = new Faculty { username = "dsbics", name = "Daniel Bogaard", tagline = "Undergraduate Program Director", imagePath = "https://ist.rit.edu/assets/img/people/dsbics.jpg", title = "Associate Professor", interestArea = "cit hcc wmc ist", office = "GOL 2111", website = "http://people.rit.edu/dsbics", phone = "5854755231", email = "dsbics@rit.edu", twitter = "dsbics", facebook = "" };
            Faculty sjzics = new Faculty { username = "sjzics", name = "Steve Zilora", tagline = "Department Chair", imagePath = "https://ist.rit.edu/assets/img/people/sjzics.jpg", title = "Professor", interestArea = "wmc cit hcc hci nsa ist hi", office = "GOL 2109", website = "http://ist.rit.edu/~sjz", phone = "585-475-7643", email = "sjzics@rit.edu", twitter = "", facebook = "" };

            Dictionary<string, Faculty> facultyDictionary = new Dictionary<string, Faculty>();

            //var facultyDictionary = new Dictionary<string, Faculty>();

            facultyDictionary.Add(gpavks.username, gpavks);
            facultyDictionary.Add(ciiics.username, ciiics);
            facultyDictionary.Add(dsbics.username, dsbics);
            facultyDictionary.Add(sjzics.username, sjzics);
            #endregion Create

            #region Lookup
            // Perform a Look Up
            Console.WriteLine("////////////////////Start Lookup");
            Faculty selectedFaculty = facultyDictionary["gpavks"];

            Console.WriteLine(selectedFaculty.name);
            Console.WriteLine(selectedFaculty.title);
            Console.WriteLine(selectedFaculty.office);
            Console.WriteLine(selectedFaculty.email);
            Console.WriteLine("////////////////////End Lookup");
            Console.WriteLine(Environment.NewLine);//blank line
            #endregion Lookup

            #region Enumerate
            // Enumerate
            Console.WriteLine("////////////////////Start Enumerate");
            foreach (var faculty in facultyDictionary)
                Console.WriteLine(faculty.Value.name);

            Console.WriteLine(Environment.NewLine);

            foreach (var faculty in facultyDictionary.Values)
                Console.WriteLine(faculty.name);

            Console.WriteLine(Environment.NewLine);

            foreach (KeyValuePair<string, Faculty> kvp in facultyDictionary)
            {
                Console.WriteLine(kvp.Key);
                Console.WriteLine(kvp.Value.name);
            }
            Console.WriteLine("////////////////////End Enumerate");
            Console.WriteLine(Environment.NewLine);//blank line
            #endregion

            #region TryGetValue
            //Test to see if a key is in the dictionary
            Console.WriteLine("////////////////////Start TryGetValue");
            var foundFaculty = new Faculty();
            facultyDictionary.TryGetValue("dsbics", out foundFaculty);
            if (foundFaculty != null)
            {
                Console.WriteLine(foundFaculty.name);
            }
            else
            {
                Console.WriteLine("User name not found.");
            }
            Console.WriteLine("////////////////////End TryGetValue");
            #endregion TryGetValue

            Console.WriteLine("////////////////////Finished!");
        }
    }
}
