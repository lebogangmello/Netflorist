using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using florist.Models;

namespace florist.Controllers
{
    public class supplierinfoesController : ApiController
    {
        private floristEntities2 db = new floristEntities2();

        // GET: api/supplierinfoes
        public IQueryable<supplierinfo> Getsupplierinfoes()
        {
            return db.supplierinfoes;
        }

        // GET: api/supplierinfoes/5
        [ResponseType(typeof(supplierinfo))]
        public IHttpActionResult Getsupplierinfo(string suppEmail, string password)
        {
            supplierinfo supp = db.supplierinfoes.Where(sup => sup.suppEmail.Equals(suppEmail) &&
    sup.password.Equals(password)).FirstOrDefault();

            if (suppEmail == null && password == null)
            {
                return (null);
            }
            else
            {
                return Ok(supp);
            }
        }

        // PUT: api/supplierinfoes/5
        [ResponseType(typeof(void))]
        public IHttpActionResult Putsupplierinfo(int id, supplierinfo supplierinfo)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != supplierinfo.Id)
            {
                return BadRequest();
            }

            db.Entry(supplierinfo).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!supplierinfoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/supplierinfoes
        [ResponseType(typeof(supplierinfo))]
        public IHttpActionResult Postsupplierinfo(supplierinfo supplierinfo)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.supplierinfoes.Add(supplierinfo);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (supplierinfoExists(supplierinfo.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = supplierinfo.Id }, supplierinfo);
        }

        // DELETE: api/supplierinfoes/5
        [ResponseType(typeof(supplierinfo))]
        public IHttpActionResult Deletesupplierinfo(int id)
        {
            supplierinfo supplierinfo = db.supplierinfoes.Find(id);
            if (supplierinfo == null)
            {
                return NotFound();
            }

            db.supplierinfoes.Remove(supplierinfo);
            db.SaveChanges();

            return Ok(supplierinfo);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool supplierinfoExists(int id)
        {
            return db.supplierinfoes.Count(e => e.Id == id) > 0;
        }
    }
}