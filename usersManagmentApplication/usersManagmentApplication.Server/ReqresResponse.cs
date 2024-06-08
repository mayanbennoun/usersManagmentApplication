using System.Text.Json;
using System.Text.Json.Serialization;
using usersManagmentApplication.Server.Dto;

namespace usersManagmentApplication.Server
{
	public class ReqresResponse
	{
		[JsonPropertyName("page")]
		public int Page { get; set; }
		[JsonPropertyName("perPage")]
		public int PerPage { get; set; }
		[JsonPropertyName("total")]
		public int Total { get; set; }
		[JsonPropertyName("totalPages")]
		public int TotalPages { get; set; }
		[JsonPropertyName("data")]
		public List<ReqresUser>? Data { get; set; }
	}
}
