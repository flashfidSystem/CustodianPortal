﻿using CustodianPortal.Enum;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace CustodianPortal.Controllers
{
    public class BaseController : Controller
    {
        public void Notify(string message, string title = "Custodian Portal",
                                     NotificationType notificationType = NotificationType.success)
        {
            var msg = new
            {
                message,
                title,
                icon = notificationType.ToString(),
                type = notificationType.ToString(),
                provider = GetProvider()
            };

            TempData["Message"] = JsonConvert.SerializeObject(msg);
        }

        private string GetProvider()
        {
            var builder = new ConfigurationBuilder()
                            .SetBasePath(Directory.GetCurrentDirectory())
                            .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                            .AddEnvironmentVariables();

            IConfigurationRoot configuration = builder.Build();

            var value = configuration["NotificationProvider"];

            return value;
        }
    }
}
