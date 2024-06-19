namespace usersManagmentApplication.Server.ConfiguartionObjects
{
	public class CorsPolicy(string[] allowedOrigins)
	{
		public string[] AllowedOrigins = allowedOrigins;
	}
}
