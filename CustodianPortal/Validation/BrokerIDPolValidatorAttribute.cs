using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace BrokersPortalV2.Validation
{
    public class BrokerPolValidationAttribute : ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            if (value == null)
                return ValidationResult.Success;

            string input = value.ToString();

            string regexPattern = @"^[a-zA-Z0-9/-]+$";
            Regex regex = new Regex(regexPattern);

            if (!regex.IsMatch(input))
            {
                return new ValidationResult("Invalid input. Only alphanumeric characters and / - are allowed.");
            }

            return ValidationResult.Success;
        }
    }
}