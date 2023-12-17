﻿namespace CustodianPortal.Models
{
    public class AzureAdUser
    {
        public string? DisplayName { get; set; }
        public string? GivenName { get; set; }
        public string? Surname { get; set; }
        public string? UserPrincipalName { get; set; }
        public string? Mail { get; set; }
    }
}
