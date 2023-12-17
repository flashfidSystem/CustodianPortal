using CustodianPortal.Configuration;

namespace CustodianPortal.Configuration
{
    public class GenerateLoginUrlOptions
    {
        public bool InDevelopmentMode { get; set; }
        public AppConfiguration AppSettings { get; set; } = new AppConfiguration();
    }
}
