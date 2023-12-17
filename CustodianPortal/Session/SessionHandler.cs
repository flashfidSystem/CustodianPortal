using Microsoft.AspNetCore.Authentication;
using Newtonsoft.Json;
using System.Data;

namespace CustodianPortal.Session
{
    public class SessionHandler : ISessionHandler
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        public SessionHandler(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }


        public T? getSession<T>(SessionVariable sessionVariable)
        {
            string sessionVariableStr = sessionVariable.ToString();
            var value = _httpContextAccessor.HttpContext.Session.GetString(sessionVariableStr);
            return value == null ? default : JsonConvert.DeserializeObject<T>(value);
        }
        public Dictionary<string, bool> getSessionDic(SessionVariable sessionVariable)
        {
            string sessionVariableStr = sessionVariable.ToString();
            var value = _httpContextAccessor.HttpContext.Session.GetString(sessionVariableStr);

            Dictionary<string, bool> dic = new Dictionary<string, bool>();

            return JsonConvert.DeserializeObject<Dictionary<string, bool>>(value);

        }
        public string getSessionString(SessionVariable sessionVariable)
        {
            string sessionVariableStr = sessionVariable.ToString();
            var value = _httpContextAccessor.HttpContext.Session.GetString(sessionVariableStr);

            return JsonConvert.DeserializeObject<string>(value);

        }

        public void setSession(SessionVariable sessionVariable, object value)
        {
            string sessionVariableStr = sessionVariable.ToString();
            _httpContextAccessor.HttpContext.Session.SetString(sessionVariableStr, JsonConvert.SerializeObject(value));
        }
        public void setLogOut()
        {
            _httpContextAccessor.HttpContext.Session.Clear();
            _httpContextAccessor.HttpContext.SignOutAsync();

        }

        public void removeSession(string r)
        {
            _httpContextAccessor.HttpContext.Session.Remove(r);
        }
    }
}
