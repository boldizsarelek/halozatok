using HajosTeszt.ProverbModels;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace HajosTeszt.Controllers
{
    [Route("api/proverbs")]
    [ApiController]
    public class ProverbController : ControllerBase
    {
        // GET: api/<ProverbController>
        [HttpGet]
        public IEnumerable<Proverb> Get()
        {
            ProverbContext context = new ProverbContext();
            return context.Proverbs.ToList();
        }

        // GET api/<ProverbController>/5
        [HttpGet("{id}")]
        public Proverb Get(int id)
        {
            ProverbContext context = new ProverbContext();
            var searchedProverb = (from x in context.Proverbs
                                   where id == x.ProverbId
                                   select x).FirstOrDefault();
            return searchedProverb;
        }

        [HttpGet("count")]
        public int Count()
        {
            ProverbContext context = new ProverbContext();
            return context.Proverbs.Count();
        }
        // POST api/<ProverbController>
        [HttpPost]
        public void Post([FromBody] Proverb newProverb)
        {
            ProverbContext context = new ProverbContext();
            context.Proverbs.Add(newProverb);
            context.SaveChanges();
        }

        // DELETE api/<ProverbController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            ProverbContext context = new ProverbContext();
            var proverbToDelete = (from x in context.Proverbs
                                   where id == x.ProverbId
                                   select x).FirstOrDefault();
            context.Remove(proverbToDelete);
            context.SaveChanges();
        }
    }
}
