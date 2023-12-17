using System.ComponentModel.DataAnnotations; 
using Microsoft.AspNetCore.Http;
using System.IO;
using System.Linq;

namespace BrokersPortalV2.Validation
{
   
    public class FileValidationAttribute : ValidationAttribute
    {
        private readonly string[] allowedExtensions = { ".pdf", ".jpeg", ".png", ".jpg" };
        private const int MaxFileSize = 2 * 1024 * 1024; // 2MB

        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            IFormFile file = value as IFormFile;

            if (file == null)
            {
                return new ValidationResult("Invalid file.");
            }

            if (file.Length > MaxFileSize)
            {
                return new ValidationResult("File size exceeds the limit.");
            }

            string fileExtension = Path.GetExtension(file.FileName);

            if (!allowedExtensions.Contains(fileExtension.ToLower()))
            {
                return new ValidationResult("Invalid file extension.");
            }

            return ValidationResult.Success;
        }
    }
}
