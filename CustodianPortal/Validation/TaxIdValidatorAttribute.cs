using System.ComponentModel.DataAnnotations;
using System; 
using System.Text.RegularExpressions;

namespace BrokersPortalV2.Validation
{
    
    public class TaxIdValidationAttribute : ValidationAttribute
    {
        private const int TaxIdLength = 13;
        private const string LastFiveDigitsPattern = "-0001$";
        private static readonly Regex ValidFormatRegex = new Regex(@"^[0-9\-]+$");

        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            string taxId = value as string;

            if (string.IsNullOrEmpty(taxId))
            {
                return ValidationResult.Success; // Skip validation if the value is null or empty
            }

            if (taxId.Length != TaxIdLength)
            {
                return new ValidationResult($"Tax ID must be {TaxIdLength} characters long.");
            }

            if (!ValidFormatRegex.IsMatch(taxId))
            {
                return new ValidationResult("Tax ID can only contain numbers and hyphens.");
            }

            if (!taxId.EndsWith("-0001"))
            {
                return new ValidationResult("Tax ID must end with '-0001'.");
            }

            return ValidationResult.Success;
        }
    }
}
