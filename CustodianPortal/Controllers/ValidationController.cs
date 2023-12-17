using CustodianPortal.Configuration;
using CustodianPortal.Domain.DTO;
using CustodianPortal.Domain.Response;
using CustodianPortal.Enum;
using CustodianPortal.Session;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Diagnostics;
using System.Text;
using System.Text.Json.Nodes;
using static CustodianPortal.Domain.Response.LoginPostResponse;

namespace CustodianPortal.Controllers
{
    public class ValidationController : Controller
    {
        private readonly ISessionHandler _SessionHandler;
        public ValidationController( ISessionHandler sessionHandler)
        {
            _SessionHandler = sessionHandler;
        }

        [HttpPost]
        public async Task<IActionResult> LoginPost([FromBody] LoginModel model)
        {

            Validation.Validation.ValidateInputToAcceptNumbersAndAlphabetsWithSpace(model.Username);

            if (!Validation.Validation.ValidateInputToAcceptNumbersAndAlphabetsWithSpace(model.Username))
            {
                return BadRequest(new BaseResponsejs<LoginPostResponse>
                {
                    isSuccess = false,
                    errorMsg = "Invalid Username", 
                    formData = null
                });
            }
            string payloadBase64 = Request.Headers["payloadBase64"];

            if (string.IsNullOrEmpty(payloadBase64))
            {
                return BadRequest(new BaseResponsejs<LoginPostResponse>
                {
                    isSuccess = false,
                    errorMsg = "Invalid Input",
                    formData = null
                });
            }
            string payload = Encoding.UTF8.GetString(Convert.FromBase64String(payloadBase64));


            // Decode the Base64-encoded payload
            var Userdetals = JsonConvert.DeserializeObject<LoginModel>(payload);


            string usernameValue = Userdetals.Username;
            string prefix = model.Username + ":";

            // Check if the Username value contains the prefix
            int prefixIndex = usernameValue.IndexOf(prefix);
            if (prefixIndex != -1)
            {
                // Extract the rest of the value after the prefix
                string Password = usernameValue.Substring(prefixIndex + prefix.Length);
                if (!Validation.Validation.PasswordValidate(Password))
                {
                    return BadRequest(new BaseResponsejs<LoginPostResponse>
                    {
                        isSuccess = false,
                        errorMsg = "Password Must contain at least one uppercase letter, one lowercase letter, one digit, one special character and minlength of 6 character.",
                        
                        formData = null
                    });
                }

                string userKey = model.Username + ":" + Password;

                byte[] bytes = Encoding.UTF8.GetBytes(userKey); 
                string encryptedBytes = Convert.ToBase64String(bytes);



                string token = encryptedBytes;

                _SessionHandler.setSession(SessionVariable.Token, token);
                //HttpContext.Session.SetString(SessionVariable.Token.ToString(), token);

                LoginPostResponse formData   = new LoginPostResponse();
                formData.UserName = model.Username;
                //formData.Password = Password;
                formData.url = "/Account/LoginPostRequest";
                formData.token = token;
                return Ok(new BaseResponsejs<LoginPostResponse>
                {
                    isSuccess = true,
                    errorMsg = "",
                    formData = formData
                });

            }
            else
            {
                return BadRequest(new BaseResponsejs<LoginPostResponse>
                {
                    isSuccess = false,
                    errorMsg = "Invalid input", 
                    formData = null
                });
            }
        }
    }
}
