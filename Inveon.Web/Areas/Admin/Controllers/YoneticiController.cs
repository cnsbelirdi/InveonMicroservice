using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;

namespace Inveon.Web.Areas.Admin.Controllers
{
	[Area("Admin")]
	public class YoneticiController : Controller
	{
		public IActionResult Index()
		{
			return View();
		}
		public IActionResult Git()
		{
			return View();
		}
		public IActionResult AdminLogout()
		{
			return SignOut(new AuthenticationProperties
			{
				RedirectUri = "/" // Kullanıcı çıkış yaptığında nereye yönlendirileceğini belirtin
			}, "Cookies", "oidc");
		}
	}
}
