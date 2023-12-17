namespace CustodianPortal.Entities
{
    public class TenantUserDto
    {
        public int UserRowId { get; set; }
        public int TenantRowId { get; set; }
        public string? UserDisplayName { get; set; }
        public string? UserEmail { get; set; }
        public string? UserNormalizedEmail { get; set; }
        public DateTime TenantCreationDate { get; set; }
        public string? TenantIdentifier { get; set; }
        public DateTime UserCreationDate { get; set; }
    }
}
