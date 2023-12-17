using Microsoft.Extensions.Options;
using Microsoft.Identity.Client;
using System.Net.Http.Headers;
using System.Web;
using CustodianPortal.Configuration;
using CustodianPortal.Entities;
using CustodianPortal.Models;
using CustodianPortal.Session;
using CustodianPortal.Services.Interface;

namespace CustodianPortal.Services.Implementation
{
    public class LoginServiceManager : ILoginService
    {
        private readonly AppConfiguration _appConfig;
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly ISessionHandler _SessionHandler;
        public LoginServiceManager(IOptions<AppConfiguration> options, IHttpClientFactory httpclientFactory, ISessionHandler sessionHandler)
        {
            _SessionHandler = sessionHandler;
            _appConfig = options.Value;
            _httpClientFactory = httpclientFactory;
        }

        public string GenerateLoginUrl(GenerateLoginUrlOptions options)
        {
            var requestScope = "https://graph.microsoft.com/User.Read";
            var requestState = Constants.CallbackModeLogin;
            var urlString = $"https://login.microsoftonline.com/{options.AppSettings.TenantId}/oauth2/v2.0/authorize?client_id={options.AppSettings.ClientId}&redirect_uri={HttpUtility.UrlEncode(options.AppSettings.CallbackPath)}&response_type=code&scope={HttpUtility.UrlEncode(requestScope)}&response_mode=form_post&prompt=select_account&state={requestState}";

            return urlString;
        }

        public AuthenticationResult AcquireTokenRequestAuthenticationResult(string authenticationCode, string mode)
        {
            string[] scopes = new string[]
            {
                "https://graph.microsoft.com/User.Read"
            };

            var confidentialClient = ConfidentialClientApplicationBuilder
                .Create(_appConfig.ClientId)
                .WithClientSecret(_appConfig.ClientSecret)
                .WithAuthority($"https://login.microsoftonline.com/{_appConfig.TenantId}/")
                .WithRedirectUri(mode == Constants.CallbackModeLogin ? _appConfig.CallbackPath : _appConfig.SignupCallback)
                .Build();

            var accesstokenRequest = confidentialClient.AcquireTokenByAuthorizationCode(scopes, authenticationCode);
            var requestResult = accesstokenRequest.ExecuteAsync().Result;

            return requestResult;
        }

        public bool CanLogTenantUser(TenantApplicationUser tenantUser)
        {
            throw new NotImplementedException();
        }

        public void CreateTenantUserIfNotExists(string tenantId, string userEmail, string displayName)
        {
            throw new NotImplementedException();
        }

        public string ExtractTokenFromAuthenticationResult(AuthenticationResult authenContext)
        {
            return authenContext.AccessToken;
        }

        public TenantApplicationUser GenerateTenantUser(AzureAdUser azureUser, AuthenticationResult authenContext)
        {
            throw new NotImplementedException();
        }

        public AzureAdUser? GetLoggedInUser(string accessToken)
        {
            var graphUri = new Uri("https://graph.microsoft.com/v1.0/me");
            var httpclient = _httpClientFactory.CreateClient();

            httpclient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            httpclient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);

            var resp = httpclient.GetAsync(graphUri).Result;
            resp.EnsureSuccessStatusCode();

            var adUser = resp.Content.ReadFromJsonAsync<AzureAdUser>().Result;

            if (adUser != null)
            {
                return adUser;
            }

            return default;
        }


        //public void CheckProduct(in string product, in string? product2, out double rate, out bool check)
        //{
        //    var products = _SessionHandler.getSession<ProfileResponse?>(SessionVariable.LOGGEDUSER);
        //    check = false;
        //    rate = 0;
        //    foreach (var item in products.products)
        //    {
        //        if (item.name == product || item.name == product2)
        //        {
        //            if (item.name == product2)
        //            {
        //                rate = item.rate;
        //                check = true;
        //                return;
        //            }
        //            else
        //            {
        //                rate = item.rate;
        //                check = true;
        //            }


        //        }
        //    }
        //}

        public TenantUserDto GetUserByEmail(string email)
        {
            throw new NotImplementedException();
        }

        public void RegisterTenant(string tenantId)
        {
            throw new NotImplementedException();
        }

        public bool TenantExists(string tenantId)
        {
            throw new NotImplementedException();
        }
    }
}
