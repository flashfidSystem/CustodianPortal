using System.ComponentModel.DataAnnotations;

namespace BrokersPortalV2.Validation
{ 
    public class NumberValidationAttribute : ValidationAttribute
    {
        private readonly int minLength;
        private readonly int maxLength;

        public NumberValidationAttribute(int minLength, int maxLength)
        {
            this.minLength = minLength;
            this.maxLength = maxLength;
        }

        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            string stringValue = value as string;

            if (string.IsNullOrEmpty(stringValue))
            {
                return ValidationResult.Success; // Skip validation if the value is null or empty
            }

            if (!int.TryParse(stringValue, out _))
            {
                return new ValidationResult($"The {validationContext.DisplayName} must contain only numeric characters.");
            }

            if (stringValue.Length < minLength || stringValue.Length > maxLength)
            {
                return new ValidationResult($"The {validationContext.DisplayName} must be between {minLength} and {maxLength} characters long.");
            }

            return ValidationResult.Success;
        }
    }
}
