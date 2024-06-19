﻿using System.Net;
using usersManagmentApplication.Server.Dto;
using usersManagmentApplication.Server.ReqresResponses;

namespace usersManagmentApplication.Server.Interfaces
{
    public interface IQueryService
	{
		Task<ReqresResponse> GetUsers(int page,int perPage);
		Task<ReqresUser?> GetUser(int id);
		Task<CreateUserResponse> CreateUser(string fullName, string job);
		Task<bool> DeleteUser(int id);
		Task<UpdateUserResponse> UpdateUser(int id, string name,string job);
	}
}
