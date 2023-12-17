namespace CustodianPortal.Configuration
{
    public class AppConfiguration
    {
        public string ClientId { get; set; } = string.Empty;
        public string Instance { get; set; } = string.Empty;
        public string TenantId { get; set; } = string.Empty;
        public string CallbackPath { get; set; } = string.Empty;
        public string SignedOutCallbackPath { get; set; } = string.Empty;
        public string ClientSecret { get; set; } = string.Empty;
        public string SignupCallback { get; set; } = string.Empty;
    }
}
