using usersManagmentApplication.Server.ConfiguartionObjects;
using usersManagmentApplication.Server.Interfaces;
using usersManagmentApplication.Server.Services;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Configuration.AddJsonFile("appsettings.json");

builder.Services.AddHttpClient<IQueryService, ReqresQueryService>("reqresapi", client =>
{
	client.BaseAddress = new Uri("https://reqres.in/api/");
});
builder.Services.AddSingleton<IQueryService, ReqresQueryService>();

//Define Cors Policy
CorsPolicy corsPolicy = new CorsPolicy(allowedOrigins: builder.Configuration.GetSection("CorsPolicy:AllowedOrigins").Get<string[]>()!);
builder.Services.AddCors(options =>
{
	options.AddPolicy(name: "AllowedOrigins",
		policy =>
		{
			policy.WithOrigins(corsPolicy.AllowedOrigins)
			.AllowAnyHeader()
			.AllowAnyMethod();
		});
});
var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
}
app.UseCors("AllowedOrigins");
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
