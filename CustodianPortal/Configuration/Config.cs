using System.IdentityModel.Tokens.Jwt;

namespace CustodianPortal.Configuration
{
    public static class Config
    {


        //encoding
        public static string Base64Encode(string plainText)
        {
            var plainTextBytes = System.Text.Encoding.UTF8.GetBytes(plainText);
            return Convert.ToBase64String(plainTextBytes);
        }

        //decoding
        public static string Base64Decode(string base64EncodedData)
        {
            var base64EncodedBytes = Convert.FromBase64String(base64EncodedData);
            return System.Text.Encoding.UTF8.GetString(base64EncodedBytes);
        }

        public static int CalculateAge(string dateOfBirth)
        {
            DateTime DOB = Convert.ToDateTime(dateOfBirth);
            int age = 0;
            age = DateTime.Now.Year - DOB.Year;
            if (DateTime.Now.DayOfYear < DOB.DayOfYear)
                age = age - 1;

            return age;
        }

        public static List<string> ConvertListFilesToBase64(List<IFormFile> files)
        {
            List<string> base64Strings = new List<string>();
            foreach (var file in files)
            {
                byte[] fileBytes;
                using (var ms = new MemoryStream())
                {
                    file.CopyTo(ms);
                    fileBytes = ms.ToArray();
                }
                string base64String = Convert.ToBase64String(fileBytes);
                base64Strings.Add(base64String);
            }
            return base64Strings;
        }

        //     if (file == null || file.Length == 0)
        //{
        //     File not provided or empty
        //    return BadRequest("No file uploaded.");
        //}

        //var base64String = await file.ToBase64Async();
        public static async Task<string> ConvertFileToBase64Async(this IFormFile file)
        {
            using (var memoryStream = new MemoryStream())
            {
                await file.CopyToAsync(memoryStream);
                var bytes = memoryStream.ToArray();
                return Convert.ToBase64String(bytes);
            }
        }


        //var file = base64String.ToIFormFile("file.jpg", "image/jpeg");
        public static IFormFile COnvertBase64ToIFormFile(this string base64String, string fileName, string contentType)
        {
            var bytes = Convert.FromBase64String(base64String);
            var stream = new MemoryStream(bytes);

            return new FormFile(stream, 0, bytes.Length, "file", fileName)
            {
                Headers = new HeaderDictionary(),
                ContentType = contentType
            };
        }

        public static string GetUserIdToken(string idtoken)
        {
            var token = new JwtSecurityToken(jwtEncodedString: idtoken);
            string expiry = token.Claims.First(c => c.Type == "identityNo").Value;
            return expiry;
        }
        public static string GetAdminIdToken(string idtoken)
        {
            var token = new JwtSecurityToken(jwtEncodedString: idtoken);
            string expiry = token.Claims.First(c => c.Type == "email").Value;
            return expiry;
        }

    }
}
