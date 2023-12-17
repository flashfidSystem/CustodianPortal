using Microsoft.AspNetCore.Mvc;

namespace CustodianPortal.Controllers
{
    public class DashboardController : Controller
    {
        public IActionResult dashboard_Index()
        {
            return View();
        }
    }
}
