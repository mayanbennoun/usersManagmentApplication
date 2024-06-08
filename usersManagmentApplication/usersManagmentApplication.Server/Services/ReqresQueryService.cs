using Microsoft.AspNetCore.Mvc.RazorPages;
using System;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using usersManagmentApplication.Server.Dto;
using usersManagmentApplication.Server.Interfaces;

namespace usersManagmentApplication.Server.Services
{
	public class ReqresQueryService : IQueryService
	{
		private readonly IHttpClientFactory _httpClientFactory;
		private readonly HttpClient client;
		public ReqresQueryService(IHttpClientFactory httpClientFactory)
		{
			_httpClientFactory = httpClientFactory;
			client = _httpClientFactory.CreateClient("reqresapi");

		}
		public async Task<bool> CreateUser(string fullName, string job)
		{
			var user = new 
			{
				Name = fullName,
				Job = job
			};

			var content = new StringContent(JsonSerializer.Serialize(user), Encoding.UTF8, "application/json");

			var response = await client.PostAsync("users", content);

			return response.IsSuccessStatusCode;
		}

		public Task DeleteUser(int id)
		{
			throw new NotImplementedException();
		}

		public async Task<ReqresResponse> GetUser(int id)
		{
			HttpResponseMessage response = await client.GetAsync($"{client.BaseAddress}users/{id}");

			if (response.IsSuccessStatusCode)
			{
				string responseBody = await response.Content.ReadAsStringAsync();
				ReqresResponse userResponse = JsonDocument.Parse(responseBody).RootElement.GetProperty("data").Deserialize<ReqresResponse>();
				return userResponse;
			}
			else if (response.StatusCode == HttpStatusCode.NotFound)
			{
				return null; // User not found
			}
			else
			{
				throw new HttpRequestException("Unable to fetch user: " + response.ReasonPhrase);
			}
		}

		public async Task<ReqresResponse> GetUsers(int page)
		{
			string url = $"{client.BaseAddress}users?page={page}";
			HttpResponseMessage response = await client.GetAsync(url);

			if (response.IsSuccessStatusCode)
			{
				string responseBody = await response.Content.ReadAsStringAsync();
				ReqresResponse users = JsonSerializer.Deserialize<ReqresResponse>(responseBody);
				return users;
			}
			else
			{
				throw new HttpRequestException("Unable to fetch users: " + response.ReasonPhrase);
			}
		}


		public Task UpdateUser(int id)
		{
			throw new NotImplementedException();
		}
	}
}
