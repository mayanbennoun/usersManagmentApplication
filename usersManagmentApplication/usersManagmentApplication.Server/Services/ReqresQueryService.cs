using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using usersManagmentApplication.Server.Dto;
using usersManagmentApplication.Server.Interfaces;
using usersManagmentApplication.Server.ReqresResponses;

namespace usersManagmentApplication.Server.Services
{
    public class ReqresQueryService : IQueryService
	{
		private readonly IHttpClientFactory _httpClientFactory;
		private readonly HttpClient client;
		private static readonly JsonSerializerOptions jsonOptions = new JsonSerializerOptions
		{
			PropertyNameCaseInsensitive = true
		};

		private List<ReqresUser> reqresUsers; 
		public ReqresQueryService(IHttpClientFactory httpClientFactory)
		{
			_httpClientFactory = httpClientFactory;
			client = _httpClientFactory.CreateClient("reqresapi");
			reqresUsers = GetUsers(1, 12).Result.Data;

		}
		public async Task<CreateUserResponse> CreateUser(string fullName, string job)
		{
			var user = new 
			{
				Name = fullName,
				Job = job
			};

			var content = new StringContent(JsonSerializer.Serialize(user), Encoding.UTF8, "application/json");

			var response = await client.PostAsync("users", content);
			if (response.IsSuccessStatusCode)
			{
				string responseBody = await response.Content.ReadAsStringAsync();
				CreateUserResponse? createdUser = JsonSerializer.Deserialize<CreateUserResponse>(responseBody, jsonOptions);
				return createdUser;
			}
			else
			{
				throw new HttpRequestException($"Failed to create user: {response.ReasonPhrase}");
			}
		}

		public async Task<bool> DeleteUser(int id)
		{
			 HttpResponseMessage response = await client.DeleteAsync($"{client.BaseAddress}users/{id}");
			return response.IsSuccessStatusCode;

		}

		public async Task<ReqresUser?> GetUser(int id)
		{
			HttpResponseMessage response = await client.GetAsync($"{client.BaseAddress}users/{id}");

			if (response.IsSuccessStatusCode)
			{
				string responseBody = await response.Content.ReadAsStringAsync();
				ReqresSingleUserResponse userResponse = JsonSerializer.Deserialize<ReqresSingleUserResponse>(responseBody, jsonOptions)!;
				return userResponse?.Data;
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

		public async Task<ReqresResponse> GetUsers(int page ,int perPage)
		{
			string url = $"{client.BaseAddress}users?page={page}&per_page={perPage}";
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


		public async Task<UpdateUserResponse> UpdateUser(int id, string name,string job)
		{
			if (reqresUsers.FirstOrDefault(user => user.Id == id) == null)
			{
				throw new InvalidOperationException("User Not Exist cannot update");
			}
			var user = new
			{
				Name = name,
				Job = job
			};

			var content = new StringContent(JsonSerializer.Serialize(user), Encoding.UTF8, "application/json");

			 HttpResponseMessage response = await client.PutAsync($"{client.BaseAddress}users/{id}",content);
			if (response.IsSuccessStatusCode)
			{
				string responseBody = await response.Content.ReadAsStringAsync();
				UpdateUserResponse? updateUserResponse = JsonSerializer.Deserialize<UpdateUserResponse>(responseBody, jsonOptions);
				return updateUserResponse;
			}
			else
			{
				throw new HttpRequestException($"Failed to create user: {response.ReasonPhrase}");
			}
		}	

	}
}
