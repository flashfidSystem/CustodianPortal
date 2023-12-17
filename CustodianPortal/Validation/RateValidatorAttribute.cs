using System.ComponentModel.DataAnnotations;
using System; 
namespace BrokersPortalV2.Validation
{

    public class RateValidationAttribute : ValidationAttribute
    {
        private const int MaxRate = 100;

        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            string rate = value as string;

            if (string.IsNullOrEmpty(rate))
            {
                return ValidationResult.Success;  
            }

            if (!ValidateRate(rate))
            {
                return new ValidationResult("Invalid rate format.");
            }

            decimal rateValue = decimal.Parse(rate);

            if (rateValue > MaxRate)
            {
                return new ValidationResult($"Rate must be less than or equal to {MaxRate}.");
            }

            return ValidationResult.Success;
        }

        private static bool ValidateRate(string rate)
        {
            if (!decimal.TryParse(rate, out _))
            {
                return false;  
            }
             
            return true;
        }
    }
}
