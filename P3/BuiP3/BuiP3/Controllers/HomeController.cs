using BuiP3.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using BuiP3.Services;
using Newtonsoft.Json;
using System.Text.RegularExpressions;


namespace BuiP3.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        public async Task<IActionResult> About()
        {
            //need to go get the data
            DataRetrieval dr = new DataRetrieval();
            //tell the instance of dr to go get the data
            var loadedAbout = await dr.GetData("about/");

            //installed NuGet package NewTonSoft JSON

            var rtnResults = JsonConvert.DeserializeObject<AboutModel>(loadedAbout);
            rtnResults.pageTitle = "About us page!";

            return View(rtnResults);
        }

        public async Task<IActionResult> People()
        {
            DataRetrieval dr = new DataRetrieval();
            var loadedPeople = await dr.GetData("people/");
            var rtnResults = JsonConvert.DeserializeObject<PeopleModel>(loadedPeople);
            rtnResults.pageTitle = "People page!";

            return View(rtnResults);
        }
        public async Task<IActionResult> Degrees()
        {
            DataRetrieval dr = new DataRetrieval();
            var loadedDegrees = await dr.GetData("degrees/");
            var rtnResults = JsonConvert.DeserializeObject<DegreesModel>(loadedDegrees);
            rtnResults.pageTitle = "Degrees Offered";
            return View(rtnResults);
        }

        public async Task<IActionResult> Minors()
        {
            DataRetrieval dr = new DataRetrieval();
            var loadedMinors = await dr.GetData("minors/");
            var rtnResults = JsonConvert.DeserializeObject<MinorsModel>(loadedMinors);
            rtnResults.pageTitle = "Undergraduate Minors";
            return View(rtnResults);
        }

        public async Task<IActionResult> Employment()
        {
            //need to go get the data
            DataRetrieval dr = new DataRetrieval();
            //tell the instance of dr to go get the data
            var loadedEmployment = await dr.GetData("employment/");

            var rtnResults = JsonConvert.DeserializeObject<EmploymentModel>(loadedEmployment);
            rtnResults.pageTitle = "Employment page!";

            return View(rtnResults);
        }

        public async Task<IActionResult> Courses()
        {
            DataRetrieval dr = new DataRetrieval();

            // Get degrees and minors data (same as before)
            var degreesData = await dr.GetData("degrees/");
            var degrees = JsonConvert.DeserializeObject<DegreesModel>(degreesData);
            var minorsData = await dr.GetData("minors/");
            var minors = JsonConvert.DeserializeObject<MinorsModel>(minorsData);

            // Combine all courses with proper filtering
            var allCourses = new List<string>();

            // Regex pattern to match course codes like "ISTE-430"
            var courseCodePattern = new Regex(@"^[A-Za-z]{2,}-\d{3}$");

            // Filter undergraduate courses
            if (degrees?.undergraduate != null)
            {
                foreach (var undergrad in degrees.undergraduate)
                {
                    if (undergrad?.concentrations != null)
                    {
                        allCourses.AddRange(undergrad.concentrations
                            .Where(c => !string.IsNullOrWhiteSpace(c) && courseCodePattern.IsMatch(c)));
                    }
                }
            }

            // Filter graduate courses
            if (degrees?.graduate != null)
            {
                foreach (var grad in degrees.graduate)
                {
                    if (grad?.concentrations != null)
                    {
                        allCourses.AddRange(grad.concentrations
                            .Where(c => !string.IsNullOrWhiteSpace(c) && courseCodePattern.IsMatch(c)));
                    }
                    if (grad?.availableCertificates != null)
                    {
                        allCourses.AddRange(grad.availableCertificates
                            .Where(c => !string.IsNullOrWhiteSpace(c) && courseCodePattern.IsMatch(c)));
                    }
                }
            }

            // Filter minor courses
            if (minors?.UgMinors != null)
            {
                foreach (var minor in minors.UgMinors)
                {
                    if (minor?.courses != null)
                    {
                        allCourses.AddRange(minor.courses
                            .Where(c => !string.IsNullOrWhiteSpace(c) && courseCodePattern.IsMatch(c)));
                    }
                }
            }

            // Return filtered results
            var model = new CoursesModel
            {
                pageTitle = "All Courses",
                allCourses = allCourses
                    .Distinct()
                    .OrderBy(c => c)
                    .ToList()
            };

            return View(model);
        }

        public async Task<IActionResult> CourseDetails(string id)
        {
            //need to go get the data
            DataRetrieval dr = new DataRetrieval();
            //tell the instance of dr to go get the data
            var loadedCourse = await dr.GetData($"course/courseID={id}");

            var rtnResults = JsonConvert.DeserializeObject<CourseDetailModel>(loadedCourse);
            rtnResults.pageTitle = "Course Details page!";

            return View(rtnResults);
        }
        
        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
