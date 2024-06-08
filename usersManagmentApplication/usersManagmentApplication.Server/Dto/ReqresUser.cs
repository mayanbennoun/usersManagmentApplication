using System.Text.Json.Serialization;

namespace usersManagmentApplication.Server.Dto
{
	public class ReqresUser
	{
		[JsonConstructor]
		public ReqresUser(int id, string email, string firstName, string lastName, string avatar)
		{
			Id = id;
			Email = email;
			FirstName = firstName;
			LastName = lastName;
			Avatar = avatar;
		}
		[JsonPropertyName("id")]
		public int Id { get; set; }

		[JsonPropertyName("email")]
		public string Email { get; set; }
		[JsonPropertyName("first_name")]
		public string FirstName { get; set; }

		[JsonPropertyName("last_name")]
		public string LastName { get; set; }

		[JsonPropertyName("avatar")]
		public string Avatar { get; set; }
	}
}
