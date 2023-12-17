namespace CustodianPortal.Session
{
    public interface ISessionHandler
    {
        public T? getSession<T>(SessionVariable sessionVariable);
        public Dictionary<string, bool> getSessionDic(SessionVariable sessionVariable);
        public void setSession(SessionVariable sessionVariable, object value);
        public void setLogOut();

        public void removeSession(string p);
       
    }
}
