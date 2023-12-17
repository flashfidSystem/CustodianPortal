using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace BrokersPortalV2.Validation
{
    public class AmountValidationAttribute : ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            if (value == null)
                return ValidationResult.Success;

            string amount = value.ToString().Trim();

            var displayName = validationContext.DisplayName;
            var customMethodAttribute = new CustomValidationAttribute(typeof(AmountValidationAttribute), "ValidateAmount");

            var customMethodResult = customMethodAttribute.GetValidationResult(value, validationContext);

            if (customMethodResult != ValidationResult.Success)
                return FormatErrorMessage(customMethodResult, displayName);

            return ValidationResult.Success;
        }

        public static ValidationResult ValidateAmount(object value, ValidationContext validationContext)
        {
            string amount = value.ToString().Trim();
            string regexPattern = @"^(?=.*[1-9])\d*(?:\.\d+)?$";
            Regex regex = new Regex(regexPattern);

            if (!regex.IsMatch(amount))
            {
                return new ValidationResult("Invalid amount.");
            }

            return ValidationResult.Success;
        }

        private ValidationResult FormatErrorMessage(ValidationResult validationResult, string displayName)
        {
            return new ValidationResult(validationResult.ErrorMessage.Replace("{0}", displayName));
        }
    }
}