using Microsoft.Extensions.FileSystemGlobbing.Internal;
using Microsoft.Extensions.Primitives;
using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace CustodianPortal.Validation
{

    public static class Validation
    {

        //public static bool ValidateRate(string p)
        //{
        //    string regexPattern = @"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$";
        //    Regex regex = new Regex(regexPattern);
        //    return regex.IsMatch(p);
        //}

        //public static bool ValidateDate()
        //{
        //    string regexPattern = @"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$";
        //    Regex regex = new Regex(regexPattern);
        //    return regex.IsMatch(p);
        //}

        public static bool PasswordValidate(string p)
        {
            const int MinimumLength = 6;
            const int MaximumLength = 100;
            const string Pattern = @"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{6,}$";

            if (string.IsNullOrEmpty(p))
            {
                return false;
            }

            if (p.Length < MinimumLength || p.Length > MaximumLength)
            {
                return false;
               
            }

            if (!System.Text.RegularExpressions.Regex.IsMatch(p, Pattern))
            {
                return false; 
            }
            return true;
        }
        public static bool ValidatePhoneNumber(string phoneNumber)
        {
            string regexPattern = @"^(?:\+?[1-9]\d{1,14}|0\d{9,14})$";
            Regex regex = new Regex(regexPattern);
            return regex.IsMatch(phoneNumber);
        }
        public static bool ValidateAmount(string amount)
        {
            string regexPattern = @"^(?=.*[1-9])\d*(?:\.\d+)?$";
            Regex regex = new Regex(regexPattern);
            return regex.IsMatch(amount);
        }
        public static bool ValidateEmail(string email)
        {
            string regexPattern = @"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$";
            Regex regex = new Regex(regexPattern);
            return regex.IsMatch(email);
        }


        public static bool ValidateInputToAcceptOnlyAlphabets(string p)
        {
            string regexPattern = @"^[a-zA-Z]+$";
            Regex regex = new Regex(regexPattern);
            return regex.IsMatch(p);
        }
        public static bool ValidateInputToAcceptNumbersAndAlphabets(string p)
        {
            string regexPattern = @"^[a-zA-Z0-9]+$";
            Regex regex = new Regex(regexPattern);
            return regex.IsMatch(p);
        }
        public static bool ValidateInputToAcceptNumbersAndAlphabetsWithSpace(string p)
        {
            string regexPattern = @"^[a-zA-Z0-9\s]+$";
            Regex regex = new Regex(regexPattern);
            return regex.IsMatch(p);
        }
        public static bool ValidateInputToAcceptAlphabetsWithSpace(string p)
        {
            string regexPattern = @"^[A-Za-z\s]+$";
            Regex regex = new Regex(regexPattern);
            return regex.IsMatch(p);
        }


    }
}
