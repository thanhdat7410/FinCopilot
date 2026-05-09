using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
        policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
});

var app = builder.Build();
app.UseCors();

app.MapPost("/api/insights", async (InsightRequest request) =>
{
    var apiKey = Environment.GetEnvironmentVariable("GEMINI_API_KEY");
    var model = Environment.GetEnvironmentVariable("GEMINI_MODEL") ?? "gemini-1.5-flash";

    if (string.IsNullOrWhiteSpace(apiKey))
    {
        return Results.BadRequest(new { output = "Missing GEMINI_API_KEY" });
    }

    var prompt = $@"You are a personal finance AI advisor.\n" +
                 $"User input: {request.Input}\n" +
                 "Provide concise, actionable budgeting advice, short bullets.";

    using var http = new HttpClient();
    http.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

    var payload = new
    {
        contents = new[]
        {
            new
            {
                parts = new[]
                {
                    new { text = prompt }
                }
            }
        }
    };

    var json = JsonSerializer.Serialize(payload);
    var url = $"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={apiKey}";

    var response = await http.PostAsync(url, new StringContent(json, Encoding.UTF8, "application/json"));
    var responseBody = await response.Content.ReadAsStringAsync();

    if (!response.IsSuccessStatusCode)
    {
        return Results.StatusCode((int)response.StatusCode);
    }

    using var doc = JsonDocument.Parse(responseBody);
    var text = doc.RootElement
        .GetProperty("candidates")[0]
        .GetProperty("content")
        .GetProperty("parts")[0]
        .GetProperty("text")
        .GetString();

    return Results.Ok(new { output = text ?? "" });
});

app.Run();

record InsightRequest(string Input);
