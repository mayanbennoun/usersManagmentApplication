using System.Text.Json.Serialization;

namespace usersManagmentApplication.Server.ReqresResponses
{
	public class UpdateUserResponse
	{
		[JsonPropertyName("name")]
		public string Name { get; set; }

		[JsonPropertyName("job")]
		public string Job { get; set; }

		[JsonPropertyName("createdAt")]
		public DateTime CreatedAt { get; set; }
	}
}
