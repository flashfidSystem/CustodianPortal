using CustodianPortal.Configuration;
using CustodianPortal.Services.Implementation;
using CustodianPortal.Services.Interface;
using CustodianPortal.Session;
using Microsoft.AspNetCore.Authentication.Cookies;

var builder = WebApplication.CreateBuilder(args).AddSerilog();
var appSettings = builder.Configuration.GetSection("AppSettings").Get<AppSettings>();

builder.Services.AddHttpClient(name: "BrokersPortals", configureClient: client =>
{
    client.BaseAddress = new Uri(appSettings.BrokersPortals);
    client.DefaultRequestHeaders.Add("ContentType", "application/json");
});


builder.Services.AddDistributedMemoryCache();
builder.Services.AddHttpContextAccessor();
builder.Services.AddScoped<ISessionHandler, SessionHandler>();
builder.Services.AddScoped<IAccount, Account>();

builder.Services.AddSession(options =>
{
    options.Cookie.Name = ".BrokersPortals.Session";
    options.IdleTimeout = TimeSpan.FromHours(24);
    options.Cookie.IsEssential = true;
});

builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
        .AddCookie(option =>
        {
            option.ExpireTimeSpan = TimeSpan.FromHours(24);
            option.SlidingExpiration = false;
            option.LoginPath = PathString.FromUriComponent("/Account/Login");
            option.AccessDeniedPath = PathString.FromUriComponent("/Home/AccessDenied");
            option.Cookie.Name = "Asp.Net.BrokerPortals";
        });

builder.Services.AddScoped<ILoginService, LoginServiceManager>();
builder.Services.Configure<AppConfiguration>(builder.Configuration.GetSection("AzureAd"));
builder.Services.AddHttpClient();

// Add services to the container.
builder.Services.AddControllersWithViews();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();
app.UseSession();
app.MapControllerRoute(
    name: "default",
     pattern: "{controller=Account}/{action=Login}/{id?}");
app.Run();
