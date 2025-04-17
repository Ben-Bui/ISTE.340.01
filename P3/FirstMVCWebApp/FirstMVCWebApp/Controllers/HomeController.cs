using FirstMVCWebApp.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace FirstMVCWebApp.Controllers
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

        public IActionResult Privacy()
        {
            return View();
        }

        public IActionResult BenNoView()
        {
            return View();
        }

        public IActionResult BenModel()
        {
            //This time with a model!
            //Why have a model? Some way to hold my data!
            var getBenModelModel = new BenModelModel ();
            getBenModelModel.Title = "Some hard coded title from my Model";
            getBenModelModel.PageTitle = "Title up top in the title tag";
            getBenModelModel.Description = "Lots and lots of word in my first Controller to model to view";
            getBenModelModel.Howmany = 99;
            //send it to the view
            return View(getBenModelModel);  
          
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
