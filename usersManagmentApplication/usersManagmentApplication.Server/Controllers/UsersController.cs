using Microsoft.AspNetCore.Mvc;
using usersManagmentApplication.Server.Dto;
using usersManagmentApplication.Server.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace usersManagmentApplication.Server.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class UsersController(IQueryService queryService) : ControllerBase
	{

		// GET: api/<UsersController>
		[HttpGet("/getUsers/{page}")]
		public async Task<IActionResult> GetAll (int page)
		{
			try
			{
				ReqresResponse users = await queryService.GetUsers(page);
				return Ok(users);
			}
			catch (HttpRequestException ex)
			{
				return StatusCode(500, new { error = ex.Message });
			}
		}

		// GET api/<UsersController>/5
		[HttpGet("/getUser/{id}")]
		public async Task<IActionResult> GetUser(int id)
		{
			try
			{
				var user = await queryService.GetUser(id);

				if (user == null)
				{
					return NotFound(new { Error = "User not found" });
				}

				return Ok(user);
			}
			catch (Exception ex)
			{
				return StatusCode(500, new { Error = ex.Message });
			}
		}

		// POST api/<UsersController>
		[HttpPost("/createUser/")]
		public async Task<IActionResult> CreateUser(string fullName,string job)
		{
			try
			{
				var result = await queryService.CreateUser(fullName,job);
				if (result)
				{
					return StatusCode(201, "User created successfully");
				}
				else
				{
					return StatusCode(500, "Failed to create user");
				}
			}
			catch (Exception ex)
			{
				// Log the exception (ex) as needed
				return StatusCode(500, $"Internal server error: {ex.Message}");
			}
		}

		// PUT api/<UsersController>/5
		[HttpPut("/updateUser/{id}")]
		public void Put(int id, [FromBody] string value)
		{
		}

		// DELETE api/<UsersController>/5
		[HttpDelete("/deleteUser/{id}")]
		public void Delete(int id)
		{
		}
	}
}
