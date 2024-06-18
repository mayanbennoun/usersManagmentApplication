using System.Net;
using usersManagmentApplication.Server.Dto;

namespace usersManagmentApplication.Server.Interfaces
{
	public interface IQueryService
	{
		Task<ReqresResponse> GetUsers(int page);
		Task<ReqresUser> GetUser(int id);
		Task<bool> CreateUser(string fullName, string job);
		Task<bool> DeleteUser(int id);
		Task <bool>UpdateUser(int id, string name,string job);
	}
}
