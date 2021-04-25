using HajosTeszt.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HajosTeszt.Controllers
{
    //[Route("api/[controller]")]
    [ApiController]
    public class BoatController : ControllerBase
    {
        [HttpGet]
        [Route("questions/all")]
        public ActionResult M1()
        {
            hajostesztContext context = new hajostesztContext();
            var kérdések = from x in context.Questions
                           select x.QuestionText;
            return new JsonResult(kérdések);
        }

        [HttpGet]
        [Route("questions/{id}")]
        public ActionResult M2(int id)
        {
            hajostesztContext context = new hajostesztContext();
            var question = (from x in context.Questions
                            where x.QuestionId == id
                            select x).FirstOrDefault();

            if (question == null) return BadRequest("Nincs ilyen sorszámú kérdés");

            return new JsonResult(question);

        }
    }
}
