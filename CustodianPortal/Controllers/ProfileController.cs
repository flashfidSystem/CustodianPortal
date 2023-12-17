using Microsoft.AspNetCore.Mvc;

namespace CustodianPortal.Controllers
{
    public class ProfileController : Controller
    {

        public IActionResult changepassword()
        {
            return View();
        }
    }
}
