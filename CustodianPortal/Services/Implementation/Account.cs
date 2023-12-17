using CustodianPortal.Domain.DTO;
using CustodianPortal.Domain.Payloads;
using CustodianPortal.Domain.Response;
using Microsoft.Identity.Client;
using System.Net.Http;

namespace CustodianPortal.Services.Implementation
{
    public class Account : Interface.IAccount
    {
        private readonly IHttpClientFactory _httpClientFactory;
        public Account(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }
        public async Task<BaseResponse<AuthenticateResponse>> authenticate(LoginRequest loginPayload)
        {
            string url = "api/v1/auth/login";
            var loginResponse = await DataServices<BaseResponse<AuthenticateResponse>>.PostPayload(loginPayload, url, "", _httpClientFactory);
            return loginResponse;
        }

        public async Task<BaseResponse<ProfileResponse>> getProfile(string AccountId, string idtoken)
        {
            string url = $"api/v1/account?accountId={AccountId}";
            var loginResponse = await DataServices<BaseResponse<ProfileResponse>>.GetPayload<BaseResponse<ProfileResponse>>(url, idtoken, _httpClientFactory);
            return loginResponse;
        }
    }
}
