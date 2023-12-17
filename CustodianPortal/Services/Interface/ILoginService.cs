using CustodianPortal.Configuration;
using CustodianPortal.Entities;
using CustodianPortal.Models;
using Microsoft.Identity.Client;
namespace CustodianPortal.Services.Interface
{
    public interface ILoginService
    {
        string GenerateLoginUrl(GenerateLoginUrlOptions options);
        string ExtractTokenFromAuthenticationResult(AuthenticationResult authenContext);
        AzureAdUser? GetLoggedInUser(string accessToken);
        AuthenticationResult AcquireTokenRequestAuthenticationResult(string authenticationCode, string mode);
        TenantApplicationUser GenerateTenantUser(AzureAdUser azureUser, AuthenticationResult authenContext);
        bool CanLogTenantUser(TenantApplicationUser tenantUser);
        bool TenantExists(string tenantId);
        void RegisterTenant(string tenantId);
        void CreateTenantUserIfNotExists(string tenantId, string userEmail, string displayName);
        TenantUserDto GetUserByEmail(string email);

        //void CheckProduct(in string product,in string? product2, out double rate, out bool check);
    }
}
