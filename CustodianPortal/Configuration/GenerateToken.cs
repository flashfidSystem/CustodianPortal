using System.Reflection;
using System.Security.Cryptography;
using System.Text;

namespace CustodianPortal.Configuration
{
    public static class GenerateToken
    {

        public static string GetTokens(int length)
        {
            const string allowedChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            byte[] randomBytes = new byte[length];

            using (var rng = new RNGCryptoServiceProvider())
            {
                rng.GetBytes(randomBytes);
            }

            char[] chars = new char[length];
            for (int i = 0; i < length; i++)
            {
                int index = randomBytes[i] % allowedChars.Length;
                chars[i] = allowedChars[index];
            }

            return new string(chars);
        }
        public static string EncryptString(string plainText)
        {
            string userKey = "dcvefveffev434";


            byte[] encryptedBytes;

            using (AesManaged aes = new AesManaged())
            {
                aes.Key = Encoding.UTF8.GetBytes(userKey);
                aes.GenerateIV();
                byte[] iv = aes.IV;

                ICryptoTransform encryptor = aes.CreateEncryptor(aes.Key, iv);

                using (MemoryStream memoryStream = new MemoryStream())
                {
                    using (CryptoStream cryptoStream = new CryptoStream(memoryStream, encryptor, CryptoStreamMode.Write))
                    {
                        using (StreamWriter streamWriter = new StreamWriter(cryptoStream))
                        {
                            streamWriter.Write(plainText);
                        }

                        encryptedBytes = memoryStream.ToArray();
                    }
                }

                // Combine IV and encrypted data
                byte[] result = new byte[iv.Length + encryptedBytes.Length];
                Buffer.BlockCopy(iv, 0, result, 0, iv.Length);
                Buffer.BlockCopy(encryptedBytes, 0, result, iv.Length, encryptedBytes.Length);

                return Convert.ToBase64String(result);
            }
        }

        public static string DecryptString(string cipherText)
        {
            string userKey = "dcvefveffev434";
            byte[] encryptedData = Convert.FromBase64String(cipherText);
            byte[] iv = new byte[16]; // IV size is 16 bytes
            byte[] encryptedBytes = new byte[encryptedData.Length - iv.Length];

            // Split IV and encrypted data
            Buffer.BlockCopy(encryptedData, 0, iv, 0, iv.Length);
            Buffer.BlockCopy(encryptedData, iv.Length, encryptedBytes, 0, encryptedBytes.Length);

            string plainText;

            using (AesManaged aes = new AesManaged())
            {
                aes.Key = Encoding.UTF8.GetBytes(userKey);
                aes.IV = iv;

                ICryptoTransform decryptor = aes.CreateDecryptor(aes.Key, aes.IV);

                using (MemoryStream memoryStream = new MemoryStream(encryptedBytes))
                {
                    using (CryptoStream cryptoStream = new CryptoStream(memoryStream, decryptor, CryptoStreamMode.Read))
                    {
                        using (StreamReader streamReader = new StreamReader(cryptoStream))
                        {
                            plainText = streamReader.ReadToEnd();
                        }
                    }
                }
            }

            return plainText;
        }
    }

     
}
