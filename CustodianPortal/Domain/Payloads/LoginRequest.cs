using System.ComponentModel.DataAnnotations;
using System.ComponentModel;

namespace CustodianPortal.Domain.Payloads
{
    public class LoginRequest
    {

        public string? username { get; set; }
        public string? password { get; set; }

    }
}
