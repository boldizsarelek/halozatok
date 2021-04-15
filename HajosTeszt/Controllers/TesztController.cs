using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HajosTeszt.Controllers
{
    public class TesztController : Controller
    {
        /*public IActionResult Index()
        {
            return View();
        }*/

        [HttpGet]
        [Route("corvinus/szerverido")]
        public IActionResult M1()
        {
            string pontosIdő = DateTime.Now.ToShortTimeString();

            return new ContentResult
            {
                ContentType = System.Net.Mime.MediaTypeNames.Text.Plain,
                Content = pontosIdő
            };
        }

        [HttpGet]
        [Route("corvinus/nagybetus/{szoveg}")]
        public IActionResult M2(string szoveg)
        {
            return new ContentResult
            {
                ContentType = System.Net.Mime.MediaTypeNames.Text.Plain, //"text/plain"
                Content = szoveg.ToUpper()
            };
        }


    }
}
