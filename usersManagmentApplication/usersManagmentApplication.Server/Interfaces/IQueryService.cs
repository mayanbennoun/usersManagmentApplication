using usersManagmentApplication.Server.Dto;

namespace usersManagmentApplication.Server.Interfaces
{
	public interface IQueryService
	{
		Task<ReqresResponse> GetUsers(int page);
		Task<ReqresResponse> GetUser(int id);
		Task<bool> CreateUser(string fullName, string job);
		Task DeleteUser(int id);
		Task UpdateUser(int id);
	}
}
