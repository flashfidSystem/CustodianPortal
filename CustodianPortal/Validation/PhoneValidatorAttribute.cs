using System.ComponentModel.DataAnnotations;

namespace BrokersPortalV2.Validation
{

    public class PhoneValidationAttribute : ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            if (value == null)
                return ValidationResult.Success;

            string input = value.ToString().Trim();

            var displayName = validationContext.DisplayName;
            var dataTypeAttribute = new DataTypeAttribute(DataType.PhoneNumber);
            var maxLengthAttribute = new MaxLengthAttribute(11);
            var minLengthAttribute = new MinLengthAttribute(11);
            var regexAttribute = new RegularExpressionAttribute(@"^(?:\+?[1-9]\d{1,14}|0\d{9,14})$");
            regexAttribute.ErrorMessage = "Invalid phone number.";
             
            var dataTypeResult = dataTypeAttribute.GetValidationResult(input, validationContext);
            var maxLengthResult = maxLengthAttribute.GetValidationResult(input, validationContext);
            var minLengthResult = minLengthAttribute.GetValidationResult(input, validationContext);
            var regexResult = regexAttribute.GetValidationResult(input, validationContext);
             
            if (dataTypeResult != ValidationResult.Success)
                return FormatErrorMessage(dataTypeResult, displayName);

            if (maxLengthResult != ValidationResult.Success)
                return FormatErrorMessage(maxLengthResult, displayName);

            if (minLengthResult != ValidationResult.Success)
                return FormatErrorMessage(minLengthResult, displayName);

            if (regexResult != ValidationResult.Success)
                return FormatErrorMessage(regexResult, displayName);

            return ValidationResult.Success;
        }

        private ValidationResult FormatErrorMessage(ValidationResult validationResult, string displayName)
        {
            return new ValidationResult(validationResult.ErrorMessage.Replace("{0}", displayName));
        }
    }
}
