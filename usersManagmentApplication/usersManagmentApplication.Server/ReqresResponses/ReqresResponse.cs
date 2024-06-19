using System.Text.Json.Serialization;
using usersManagmentApplication.Server.Dto;

namespace usersManagmentApplication.Server.ReqresResponses
{
	public class ReqresResponse
    {
        [JsonPropertyName("page")]
        public int Page { get; set; }
        [JsonPropertyName("per_page")]
        public int PerPage { get; set; }
        [JsonPropertyName("total")]
        public int Total { get; set; }
        [JsonPropertyName("total_pages")]
        public int TotalPages { get; set; }
        [JsonPropertyName("data")]
        public List<ReqresUser>? Data { get; set; }
    }
}
