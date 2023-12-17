using Newtonsoft.Json.Linq;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
//using Newtonsoft.Json;

namespace CustodianPortal.Services
{
    public static class DataServices<T> where T : class
    {

        public static async Task<T> GetPayload<T>(string url,string? idtoken ,IHttpClientFactory httpClientFactory)
        {
            try
            {
                var _client = httpClientFactory.CreateClient("BrokersPortals");

                // Add token to the request headers
                _client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", idtoken);

                var response = await _client.GetAsync(url);

                if (response.IsSuccessStatusCode)
                {
                    var stringData = await response.Content.ReadAsStringAsync();

                    var option = new JsonSerializerOptions
                    {
                        PropertyNameCaseInsensitive = true
                    };

                    return JsonSerializer.Deserialize<T>(stringData, option)!;
                }
                else if (response.StatusCode.ToString() == "InternalServerError")
                {
                    throw new Exception("Server side error");
                }
                else
                {
                    throw new Exception("Bad Request");
                }
            }
            catch
            {
                throw;
            }
        }

        public static async Task<T> PostPayload<U>(U payload, string url, string? token, IHttpClientFactory httpClientFactory)
        {
            try
            {
                var stringData = JsonSerializer.Serialize(payload);
                var contentData = new StringContent(stringData, Encoding.UTF8, "application/json");

                var _client = httpClientFactory.CreateClient("BrokersPortals");

                _client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

                var response = await _client.PostAsync(url, contentData);

                var returnData = await response.Content.ReadAsStringAsync();

                var option = new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                };

                return JsonSerializer.Deserialize<T>(returnData, option)!;
            }

            catch { throw; }
        }

        public static async Task<T> GetUserAuth(string payload, string url, IHttpClientFactory httpClientFactory)
        {
            try
            {
                var _client = httpClientFactory.CreateClient("BrokersPortals");

                _client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", payload);

                var response = await _client.GetAsync(url);

                var returnData = await response.Content.ReadAsStringAsync();

                var option = new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                };

                return JsonSerializer.Deserialize<T>(returnData, option)!;
            }

            catch { throw; }
        }
    }
}

