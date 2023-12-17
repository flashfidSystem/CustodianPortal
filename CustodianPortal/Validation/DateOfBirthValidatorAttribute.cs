using System;
using System.ComponentModel.DataAnnotations;

namespace BrokersPortalV2.Validation
{
    public class DateOfBirthValidationAttribute : ValidationAttribute
    {
        private readonly int _ageLimit;

        public DateOfBirthValidationAttribute(int ageLimit)
        {
            _ageLimit = ageLimit;
        }

        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            if (value == null)
                return ValidationResult.Success;

            DateTime dateOfBirth = (DateTime)value;

            if (dateOfBirth > DateTime.Now)
                return new ValidationResult("Date of birth cannot be in the future.");

            if (_ageLimit > 0)
            {
                int age = CalculateAge(dateOfBirth);

                if (age < _ageLimit)
                    return new ValidationResult($"Minimum age required is {_ageLimit} years.");
            }

            return ValidationResult.Success;
        }

        private int CalculateAge(DateTime dateOfBirth)
        {
            int age = DateTime.Today.Year - dateOfBirth.Year;

            if (dateOfBirth > DateTime.Today.AddYears(-age))
                age--;

            return age;
        }
    }
}