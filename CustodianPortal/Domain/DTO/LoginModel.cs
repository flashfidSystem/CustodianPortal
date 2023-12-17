using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace CustodianPortal.Domain.DTO
{
    public class LoginModel
    {
        [Required]
        [DisplayName("Username")]
        public string Username { get; set; }
        [Required]
        [DisplayName("Password")]
        public string Password { get; set; }
        
        public string? token { get; set; }
        public string? LoginCredential { get; set; }

        public bool RememberLogin { get; set; }
        public bool IsPasswordUpdate { get; set; }
        public string? ReturnUrl { get; set; }
    }
}
