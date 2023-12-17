using System.ComponentModel.DataAnnotations;

namespace BrokersPortalV2.Validation
{
     
    public class EmailValidationAttribute : ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            if (value == null)
                return ValidationResult.Success;

            string input = value.ToString().Trim();

            var displayName = validationContext.DisplayName;
            var dataTypeAttribute = new DataTypeAttribute(DataType.EmailAddress);
            var regexAttribute = new RegularExpressionAttribute(@"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$");
            regexAttribute.ErrorMessage = "Invalid email address.";
             
            var dataTypeResult = dataTypeAttribute.GetValidationResult(input, validationContext);
            var regexResult = regexAttribute.GetValidationResult(input, validationContext);
             
            if (dataTypeResult != ValidationResult.Success)
                return FormatErrorMessage(dataTypeResult, displayName);

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
