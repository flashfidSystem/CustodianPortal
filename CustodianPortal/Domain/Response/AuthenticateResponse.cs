namespace CustodianPortal.Domain.Response
{
    public class AuthenticateResponse
    {
        public string? accessToken { get; set; }
        public DateTime expiresAt { get; set; }
    }
}
