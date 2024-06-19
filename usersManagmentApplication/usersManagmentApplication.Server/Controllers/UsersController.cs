using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Xml.Linq;
using usersManagmentApplication.Server.Dto;
using usersManagmentApplication.Server.Interfaces;
using usersManagmentApplication.Server.ReqresResponses;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace usersManagmentApplication.Server.Controllers
{
    [Route("api/[controller]")]
	[ApiController]
	public class UsersController(IQueryService queryService) : ControllerBase
	{

		// GET: api/<UsersController>
		[HttpGet("/getUsers/{page}")]
		public async Task<IActionResult> GetAll (int page,int perPage)
		{
			try
			{
				ReqresResponse users = await queryService.GetUsers(page, perPage);
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
					return NotFound(new {}); 
				}

				return Ok(user);
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		// POST api/<UsersController>
		[HttpPost("/createUser/")]
		public async Task<IActionResult> CreateUser(string fullName,string job)
		{
			try
			{
				var createdUser = await queryService.CreateUser(fullName, job);
				return Ok(createdUser);
			}
			catch (HttpRequestException ex)
			{
				return StatusCode(500, new { error = ex.Message });
			}
		}

		// PUT api/<UsersController>/5
		[HttpPut("/updateUser/{id}")]
		public async Task<IActionResult>Put(int id,string fullname , string job)
		{
			try
			{
				var updatedUser = await queryService.UpdateUser(id, fullname, job);
				return Ok(updatedUser);
			}
			catch (InvalidOperationException)
			{
				return NotFound();
			}
			catch (HttpRequestException ex)
			{
				return StatusCode(500, new { error = ex.Message });
			}
		}

		// DELETE api/<UsersController>/5
		[HttpDelete("/deleteUser/{id}")]
		public async Task<IActionResult> Delete(int id)
		{
			if( await queryService.DeleteUser(id))
			{
				return NoContent();
			}
			else
			{
				return NotFound();
			}
		}
	}
}
