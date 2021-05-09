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

        //összes kérdés
        [HttpGet]
        [Route("questions/all")]
        public ActionResult M1()
        {
            HajostesztContext context = new HajostesztContext();
            var questions = from x in context.Questions
                           select x.QuestionText;
            return new JsonResult(questions);
        }

        //kérdés id -> kérdés adatok
        [HttpGet]
        [Route("questions/{id}")]
        public ActionResult M2(int id)
        {
            HajostesztContext context = new HajostesztContext();
            var question = (from x in context.Questions
                            where x.QuestionId == id
                            select x).FirstOrDefault();

            if (question == null) return BadRequest("Nincs ilyen sorszámú kérdés");
            return new JsonResult(question);
        }


        //kérdések száma
        [HttpGet]
        [Route("questions/count")]
        public int M3()
        {
            HajostesztContext context = new HajostesztContext();
            int questionCount = context.Questions.Count();
            return questionCount;
        }
    }
}
