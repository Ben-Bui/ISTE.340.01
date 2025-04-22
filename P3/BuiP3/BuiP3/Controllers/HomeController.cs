using BuiP3.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using BuiP3.Services;
using Newtonsoft.Json;


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


        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
