using CustodianPortal.Domain.DTO;
using CustodianPortal.Domain.Payloads;
using CustodianPortal.Domain.Response;

namespace CustodianPortal.Services.Interface
{
    public interface IAccount
    {
        public Task<BaseResponse<AuthenticateResponse>> authenticate(LoginRequest loginPayload);
        public Task<BaseResponse<ProfileResponse>> getProfile(string AccountId, string idtoken);


    }
}
