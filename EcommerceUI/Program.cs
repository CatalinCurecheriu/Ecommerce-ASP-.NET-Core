var builder = WebApplication.CreateBuilder(args);

// Aggiungi servizi al container
builder.Services.AddRazorPages();
builder.Services.AddServerSideBlazor();

// Configura HttpClient per chiamare le API
builder.Services.AddHttpClient("EcommerceAPI", client =>
{
    client.BaseAddress = new Uri("https://localhost:5001/"); // Cambia con l'URL del tuo backend
});

builder.Services.AddScoped(sp => sp.GetService<IHttpClientFactory>().CreateClient("EcommerceAPI"));

var app = builder.Build();

// Configurazione middleware
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.MapBlazorHub();
app.MapFallbackToPage("/_Host");

app.Run();
