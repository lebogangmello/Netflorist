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
    public class suppliersController : ApiController
    {
        private floristEntities2 db = new floristEntities2();

        // GET: api/suppliers
        public IQueryable<supplier> Getsuppliers()
        {
            return db.suppliers;
        }

        // GET: api/suppliers/5
        [ResponseType(typeof(supplier))]
        public IHttpActionResult Getsupplier(int id)
        {
            supplier supplier = db.suppliers.Find(id);
            if (supplier == null)
            {
                return NotFound();
            }

            return Ok(supplier);
        }

        // PUT: api/suppliers/5
        [ResponseType(typeof(void))]
        public IHttpActionResult Putsupplier(int id, supplier supplier)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != supplier.suppId)
            {
                return BadRequest();
            }

            db.Entry(supplier).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!supplierExists(id))
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

        // POST: api/suppliers
        [ResponseType(typeof(supplier))]
        public IHttpActionResult Postsupplier(supplier supplier)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.suppliers.Add(supplier);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = supplier.suppId }, supplier);
        }

        // DELETE: api/suppliers/5
        [ResponseType(typeof(supplier))]
        public IHttpActionResult Deletesupplier(int id)
        {
            supplier supplier = db.suppliers.Find(id);
            if (supplier == null)
            {
                return NotFound();
            }

            db.suppliers.Remove(supplier);
            db.SaveChanges();

            return Ok(supplier);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool supplierExists(int id)
        {
            return db.suppliers.Count(e => e.suppId == id) > 0;
        }
    }
}