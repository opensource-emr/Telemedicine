using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Routing;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.Linq;
using System.Threading.Tasks;

namespace FewaTelemedicine.Domain
{
    public class RouteTransformer : DynamicRouteValueTransformer
    {
        /// <summary>
        /// mapping routes when page loads
        /// where as url must contain practice and provider
        /// structure of url is> host.com/controller/action/ but for display url controller is practice and action is provider
        /// this url is used as baseHref in index.cshtml of Home Controller
        /// if url is only host name (means prctice or provider not exists in url) then 404(page not found)
        /// Added by Ajay Patil 06 Oct 2020
        /// </summary>
        /// <param name="httpContext"></param>
        /// <param name="values"></param>
        /// <returns></returns>
        public override async ValueTask<RouteValueDictionary> TransformAsync(HttpContext httpContext, RouteValueDictionary values)
        {
            if (!values.ContainsKey("controller") || !values.ContainsKey("action"))
                return values;

            var practice = (string)values["controller"];
            var provider = (string)values["action"];
            //if (practice == "Home" && provider == "Index")
            //{
            //    return null;
            //}
            IConfiguration config = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddEnvironmentVariables()
                .Build();
            var optionsBuilder = new DbContextOptionsBuilder<FewaDbContext>();
            optionsBuilder.UseNpgsql(config.GetConnectionString("DefaultConnection"));

            using (var context = new FewaDbContext(optionsBuilder.Options))
            {
                var tp = context.practices.Where(a => a.url.ToLower().Trim() == practice.ToLower().Trim()).FirstOrDefault();
                if (tp != null)
                {
                    int count = httpContext.Request.Path.Value.Count(x => (x == '/'));
                    if (provider == "Index" && practice != "Home")
                    {
                        provider = "admin";
                        if (count == 1) httpContext.Session.SetString("admin", "/admin/");
                        else httpContext.Session.SetString("admin", "admin/");
                    }
                    if (provider == "admin")
                    {
                        values["controller"] = "Home";
                        values["action"] = "Index";
                        //values["id"] = "";
                    }
                    else
                    {
                        var t = context.providers.Where(a => a.url.ToLower().Trim() == provider.ToLower().Trim() && a.practiceId == tp.practiceId).FirstOrDefault();
                        if (t != null)
                        {
                            values["controller"] = "Home";
                            values["action"] = "Index";
                            //values["id"] = "";
                        }

                    }
                }

            }
            return values;
        }
    }
}
