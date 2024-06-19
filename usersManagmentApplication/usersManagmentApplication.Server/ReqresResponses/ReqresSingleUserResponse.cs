using System.Text.Json.Serialization;
using usersManagmentApplication.Server.Dto;

namespace usersManagmentApplication.Server.ReqresResponses
{
    public class ReqresSingleUserResponse
    {
        [JsonPropertyName("data")]
        public ReqresUser? Data { get; set; }
    }
}
