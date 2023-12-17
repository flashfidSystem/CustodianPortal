using System.ComponentModel.DataAnnotations;
using System; 
using System.Text.RegularExpressions;

namespace BrokersPortalV2.Validation
{
     
    public class PasswordValidationAttribute : ValidationAttribute
    {
        private const int MinimumLength = 6;
        private const int MaximumLength = 100;
        private const string Pattern = @"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{6,}$";

        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            string stringValue = value as string;

            if (string.IsNullOrEmpty(stringValue))
            {
                return ValidationResult.Success; // Skip validation if the value is null or empty
            }

            if (stringValue.Length < MinimumLength || stringValue.Length > MaximumLength)
            {
                return new ValidationResult($"The {validationContext.DisplayName} must be at least {MinimumLength} and at most {MaximumLength} characters long.");
            }

            if (!System.Text.RegularExpressions.Regex.IsMatch(stringValue, Pattern))
            {
                return new ValidationResult("Must contain at least one uppercase letter, one lowercase letter, one digit, and one special character.");
            }

            return ValidationResult.Success;
        }
    }
}
