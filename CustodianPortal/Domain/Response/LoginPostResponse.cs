namespace CustodianPortal.Domain.Response
{
    public class LoginPostResponse
    {
        public string UserName { get; set; }
        public string Password { get; set; }
        public string? token { get; set; }
        public string? url { get; set; }
    }
}
