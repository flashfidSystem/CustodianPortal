using System;
using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace BrokersPortalV2.Validation
{
    public class AlphabetValidationAttribute : ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            if (value == null)
                return ValidationResult.Success;

            string input = value.ToString().Trim();

            var displayName = validationContext.DisplayName;
            var customMethodAttribute = new CustomValidationAttribute(typeof(AlphabetValidationAttribute), "ValidateInputToAcceptOnlyAlphabets");

            var customMethodResult = customMethodAttribute.GetValidationResult(input, validationContext);

            if (customMethodResult != ValidationResult.Success)
                return FormatErrorMessage(customMethodResult, displayName);

            return ValidationResult.Success;
        }

        public static ValidationResult ValidateInputToAcceptOnlyAlphabets(object value, ValidationContext validationContext)
        {
            string input = value.ToString().Trim();
            string regexPattern = @"^[a-zA-Z]+$";
            Regex regex = new Regex(regexPattern);

            if (!regex.IsMatch(input))
            {
                return new ValidationResult("Only alphabets are allowed.");
            }

            return ValidationResult.Success;
        }

        private ValidationResult FormatErrorMessage(ValidationResult validationResult, string displayName)
        {
            return new ValidationResult(validationResult.ErrorMessage.Replace("{0}", displayName));
        }
    }
}