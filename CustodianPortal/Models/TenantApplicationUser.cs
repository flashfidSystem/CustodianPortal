namespace CustodianPortal.Models
{
    public class TenantApplicationUser
    {
        public AzureAdUser? AuthenticatedAzureAdUser { get; set; }
        public string? TenantId { get; set; }
        public string? Issuer { get; set; }
        public string? Subject { get; set; }
        public string? Audience { get; set; }
    }
}
