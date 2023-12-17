using System;
using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace BrokersPortalV2.Validation
{
    public class AlphaNumericValidationAttribute : ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            if (value == null)
                return ValidationResult.Success;

            string input = value.ToString().Trim();

            // Apply the individual validation attributes
            var displayName = validationContext.DisplayName;
            var customMethodAttribute = new CustomValidationAttribute(typeof(AlphaNumericValidationAttribute), "ValidateInputToAcceptNumbersAndAlphabets");

            // Validate the input using the custom method validation attribute
            var customMethodResult = customMethodAttribute.GetValidationResult(input, validationContext);

            // Collect all validation errors, if any
            if (customMethodResult != ValidationResult.Success)
                return FormatErrorMessage(customMethodResult, displayName);

            return ValidationResult.Success;
        }

        public static ValidationResult ValidateInputToAcceptNumbersAndAlphabets(object value, ValidationContext validationContext)
        {
            string input = value.ToString().Trim();

            string regexPattern = @"^[a-zA-Z0-9]+$";
            Regex regex = new Regex(regexPattern);

            if (!regex.IsMatch(input))
            {
                return new ValidationResult("Only alphabets and numbers are allowed.");
            }

            return ValidationResult.Success;
        }

        private ValidationResult FormatErrorMessage(ValidationResult validationResult, string displayName)
        {
            return new ValidationResult(validationResult.ErrorMessage.Replace("{0}", displayName));
        }
    }
}