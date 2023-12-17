using CustodianPortal.Domain.DTO;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using System.Net.Http;
using System.Security.Claims;
using System.Text;
using CustodianPortal.Configuration;
using CustodianPortal.Session;
using Microsoft.Extensions.Options;
using CustodianPortal.Services.Interface;
using CustodianPortal.Services;
using CustodianPortal.Enum;
using CustodianPortal.Domain.Response;
using CustodianPortal.Domain.Payloads;
using Newtonsoft.Json;
using static CustodianPortal.Domain.Response.LoginPostResponse;
using Microsoft.Identity.Client;
using Newtonsoft.Json.Linq;
using Microsoft.AspNetCore.DataProtection.KeyManagement;

namespace CustodianPortal.Controllers
{
    [AllowAnonymous]
    public class AccountController : BaseController
    {

        private readonly ISessionHandler _SessionHandler;
        private readonly ILogger<AccountController> _logger;
        private readonly Services.Interface.IAccount _account;
        private readonly ILoginService _loginService;
        private readonly AppConfiguration _appConfig;
        public AccountController(ILoginService loginservice, IOptions<AppConfiguration> options, ISessionHandler sessionHandler, Services.Interface.IAccount account, ILogger<AccountController> logger)
        {
            _SessionHandler = sessionHandler;
            _account = account;
            _logger = logger;
            _loginService = loginservice;
            _appConfig = options.Value;
        }

        [HttpGet]
        public IActionResult Login(string ReturnUrl = "/")
        {
            ViewBag.Messagetrigger = TempData["messagetrigger"];

            LoginModel objLoginModel = new LoginModel();
            objLoginModel.ReturnUrl = ReturnUrl;
            return View(objLoginModel);
        }

        [HttpPost]
        //[ValidateAntiForgeryToken]
        public async Task<IActionResult> LoginPostRequest([FromBody] LoginModel model)
        {
            try
            {
                string payloadBase64 = Request.Headers["HToken"];

                var token = _SessionHandler.getSession<string>(SessionVariable.Token);

                if (token != payloadBase64) throw new Exception("Sorry, Something went wrong while processing your request.");

                _SessionHandler.removeSession(SessionVariable.Token.ToString());
               



                if (string.IsNullOrEmpty(payloadBase64)) throw new ArgumentException("Invalid Inout");


                byte[] bytes = Convert.FromBase64String(payloadBase64);
                string decodedString = Encoding.UTF8.GetString(bytes);
                //string decryptedUserKey = GenerateToken.DecryptString(decodedString); 

                 

                
                string usernameValue = decodedString;
                string prefix = model.Username + ":";

                // Check if the Username value contains the prefix
                int prefixIndex = usernameValue.IndexOf(prefix);
                if (prefixIndex != -1)
                {
                    // Extract the rest of the value after the prefix
                    string Password = usernameValue.Substring(prefixIndex + prefix.Length);
                    LoginRequest loginRequest = new LoginRequest();
                    loginRequest.username = model.Username;
                    loginRequest.password = Password;
                    var authenticarResponse = await _account.authenticate(loginRequest);

                    if (authenticarResponse.status != "Success") throw new Exception(authenticarResponse.message);


                    string idtoken = authenticarResponse.data.accessToken;
                    var AccountId = Config.GetUserIdToken(idtoken);


                    var profileResponse = await _account.getProfile(AccountId, idtoken);

                    if (profileResponse.status != "Success") throw new Exception(profileResponse.message);

                    var claims = new List<Claim>
                            {
                                new Claim(ClaimTypes.Email,profileResponse.data.email),
                                new Claim(ClaimTypes.Name, profileResponse.data.firstName + " "+ profileResponse.data.lastName)
                            };

                    var claimIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
                    var claimPrincipal = new ClaimsPrincipal(claimIdentity);
                    var authProperties = new AuthenticationProperties
                    {
                        AllowRefresh = true,
                        IsPersistent = false
                    }; 
                    
                    await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, claimPrincipal, authProperties);
                    DateTime ex = authenticarResponse.data.expiresAt;
                    authenticarResponse.data.expiresAt = ex.AddMinutes(-20);
                    _SessionHandler.setSession(SessionVariable.LOGGEDUSER, profileResponse.data);
                    _SessionHandler.setSession(SessionVariable.USERTOKEN, authenticarResponse.data);


                    LoginModel LoginModel = new LoginModel();
                    LoginModel.IsPasswordUpdate = profileResponse.data.isPasswordUpdated; 

                    return Ok(new BaseResponsejs<LoginModel>
                    {
                        isSuccess = true,
                        errorMsg = "",
                        formData = LoginModel
                    });

                    //if (profileResponse.data.isPasswordUpdated == false)
                    //{
                    //    return RedirectToAction("changepassword", "Profile");
                    //}
                    //else
                    //{
                    //    if (userLoginView.ReturnUrl == "/")
                    //    {
                    //        return RedirectToAction("dashboard_Index", "Dashboard");

                    //    }
                    //    else
                    //    {
                    //        return LocalRedirect(userLoginView.ReturnUrl);
                    //    }
                    //} 
                }
                else
                {
                    throw new Exception("Invalid input");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message, ex);
                ViewData["error"] = ex.Message;
                return BadRequest(new BaseResponsejs<AuthenticateResponse>
                {
                    isSuccess = false,
                    errorMsg = ex.Message
                });
            }
        }

    }
}
