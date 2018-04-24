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
    public class CustomersController : ApiController
    {
        private floristEntities2 db = new floristEntities2();

        // GET: api/Customers
        public IQueryable<Customer> GetCustomers()
        {
            return db.Customers;
        }

        // GET: api/Customers/5
        [ResponseType(typeof(Customer))]
        public IHttpActionResult GetCustomer(string custEmail, string Password)
        {
            Customer custom = db.Customers.Where(customer => customer.custEmail.Equals(custEmail) &&
 customer.Password.Equals(Password)).FirstOrDefault();

            if (custEmail == null && Password == null)
            {
                return (null);
            }
            else
            {
                return Ok(custom);
            }
        }

        // PUT: api/Customers/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutCustomer(string id, Customer customer)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != customer.custEmail)
            {
                return BadRequest();
            }

            db.Entry(customer).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CustomerExists(id))
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

        // POST: api/Customers
        [ResponseType(typeof(Customer))]
        public IHttpActionResult PostCustomer(Customer customer)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Customers.Add(customer);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (CustomerExists(customer.custEmail))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = customer.custEmail }, customer);
        }

        // DELETE: api/Customers/5
        [ResponseType(typeof(Customer))]
        public IHttpActionResult DeleteCustomer(string id)
        {
            Customer customer = db.Customers.Find(id);
            if (customer == null)
            {
                return NotFound();
            }

            db.Customers.Remove(customer);
            db.SaveChanges();

            return Ok(customer);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CustomerExists(string id)
        {
            return db.Customers.Count(e => e.custEmail == id) > 0;
        }
    }
}