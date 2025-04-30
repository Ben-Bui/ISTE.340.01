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
            // Only minor have course ID
            var loadedMinorsData = await dr.GetData("minors/");
            var minors = JsonConvert.DeserializeObject<MinorsModel>(loadedMinorsData);

            var allCourses = new List<string>();

            
            if (minors?.UgMinors != null)
            {
                foreach (var minor in minors.UgMinors)
                {
                    if (minor?.courses != null)
                    {
                        // If empty dont show
                        allCourses.AddRange(minor.courses
                            .Where(c => !string.IsNullOrWhiteSpace(c)));
                    }
                }
            }

            return View(new CoursesModel
            {
                pageTitle = "All Courses",
                allCourses = allCourses
                    .Distinct()  // no duplicates
                    .OrderBy(c => c)  // Sort inorder to look easier
                    .ToList()
            });
        }

        public async Task<IActionResult> CourseDetails(string id)
        {
            DataRetrieval dr = new DataRetrieval();
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
