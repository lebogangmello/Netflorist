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
    public class tblDriversController : ApiController
    {
        private floristEntities2 db = new floristEntities2();

        // GET: api/tblDrivers
        public IQueryable<tblDriver> GettblDrivers()
        {
            return db.tblDrivers;
        }

        // GET: api/tblDrivers/5
        [ResponseType(typeof(tblDriver))]
        public IHttpActionResult GettblDriver(string drvEmail , string drv_Password)
        {
            tblDriver drv = db.tblDrivers.Where(dv => dv.drvEmail.Equals(drvEmail) &&
 dv.drv_Password.Equals(drv_Password)).FirstOrDefault();

            if (drvEmail == null && drv_Password == null)
            {
                return (null);
            }
            else
            {
                return Ok(drv);
            }
        }

        // PUT: api/tblDrivers/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PuttblDriver(int id, tblDriver tblDriver)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != tblDriver.drvId)
            {
                return BadRequest();
            }

            db.Entry(tblDriver).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!tblDriverExists(id))
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

        // POST: api/tblDrivers
        [ResponseType(typeof(tblDriver))]
        public IHttpActionResult PosttblDriver(tblDriver tblDriver)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.tblDrivers.Add(tblDriver);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = tblDriver.drvId }, tblDriver);
        }

        // DELETE: api/tblDrivers/5
        [ResponseType(typeof(tblDriver))]
        public IHttpActionResult DeletetblDriver(int id)
        {
            tblDriver tblDriver = db.tblDrivers.Find(id);
            if (tblDriver == null)
            {
                return NotFound();
            }

            db.tblDrivers.Remove(tblDriver);
            db.SaveChanges();

            return Ok(tblDriver);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool tblDriverExists(int id)
        {
            return db.tblDrivers.Count(e => e.drvId == id) > 0;
        }
    }
}