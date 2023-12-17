using System.ComponentModel.DataAnnotations;

namespace BrokersPortalV2.Validation
{
      
    public class DateRangeValidationAttribute : ValidationAttribute
    {
        private readonly string _startDatePropertyName;
        private readonly string _endDatePropertyName;

        public DateRangeValidationAttribute(string startDatePropertyName, string endDatePropertyName)
        {
            _startDatePropertyName = startDatePropertyName;
            _endDatePropertyName = endDatePropertyName;
        }

        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            if (value == null)
            {
                return ValidationResult.Success;  
            }
            if (!DateTime.TryParse(value.ToString(), out DateTime dateValue))
            {
                return new ValidationResult("Invalid date format.");
            }

            DateTime startDate = (DateTime)validationContext.ObjectType.GetProperty(_startDatePropertyName).GetValue(validationContext.ObjectInstance);
            DateTime endDate = (DateTime)validationContext.ObjectType.GetProperty(_endDatePropertyName).GetValue(validationContext.ObjectInstance);
            DateTime today = DateTime.Today;

       

            if (!DateTime.TryParse(endDate.ToString(), out DateTime endDatedateValue))
            {
                return new ValidationResult("Invalid date format.");
            }

           

            if (startDate > today)
            {
                return new ValidationResult("Start date cannot be greater than today.");
            }

            if (endDate < startDate || endDate > today)
            {
                return new ValidationResult("End date must be between the start date and today's date.");
            } 

            return ValidationResult.Success;
        }
    }
}
