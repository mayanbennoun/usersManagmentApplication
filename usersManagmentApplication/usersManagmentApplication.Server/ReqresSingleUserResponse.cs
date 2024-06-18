using System.Text.Json.Serialization;
using usersManagmentApplication.Server.Dto;

namespace usersManagmentApplication.Server
{
	public class ReqresSingleUserResponse
	{
		[JsonPropertyName("data")]
		public ReqresUser? Data { get; set; }
	}
}
