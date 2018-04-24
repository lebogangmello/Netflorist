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
using System.Web;
using System.IO;

namespace florist.Controllers
{
    public class tblProImagesController : ApiController
    {
        private floristEntities2 db = new floristEntities2();

        // GET: api/tblProImages
        public IQueryable<tblProImage> GettblProImages()
        {
            return db.tblProImages;
        }

        // GET: api/tblProImages/5
        [ResponseType(typeof(tblProImage))]
        public IHttpActionResult GettblProImage(int id)
        {
            tblProImage tblProImage = db.tblProImages.Find(id);
            if (tblProImage == null)
            {
                return NotFound();
            }

            return Ok(tblProImage);
        }

        // PUT: api/tblProImages/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PuttblProImage(int id, tblProImage tblProImage)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != tblProImage.img_Id)
            {
                return BadRequest();
            }

            db.Entry(tblProImage).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!tblProImageExists(id))
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

        // POST: api/tblProImages
        public string POST()
        {
            int counter = 0;

            // collecting files
            System.Web.HttpFileCollection files = System.Web.HttpContext.Current.Request.Files;
            string url = HttpContext.Current.Request.Url.AbsoluteUri;
            tblProImage funpic = new tblProImage();
            var productId = db.products.Select(i => i).ToArray().LastOrDefault();

            String Status = "";
            for (int i = 0; i < files.Count; i++)
            {
                //get the posted files
                System.Web.HttpPostedFile file = files[i];
                string fileName = new FileInfo(file.FileName).Name;


                if (file.ContentLength > 0)
                {
                    Guid id = Guid.NewGuid();

                    string modifiedFileName = id.ToString() + "_" + fileName;
                    byte[] imageb = new byte[file.ContentLength];
                    file.InputStream.Read(imageb, 0, file.ContentLength);
                    funpic.img_Id = new Random().Next();
                    funpic.prodId = int.Parse(productId.prodId.ToString());
                    funpic.photo = imageb;
                    db.tblProImages.Add(funpic);
                    db.SaveChanges();
                    counter++;
                }
                else
                {
                    return "error";
                }

            }

            if (counter > 0)
            {
                return Status;
            }
            return "Upload Failed";
        }

        // DELETE: api/tblProImages/5
        [ResponseType(typeof(tblProImage))]
        public IHttpActionResult DeletetblProImage(int id)
        {
            tblProImage tblProImage = db.tblProImages.Find(id);
            if (tblProImage == null)
            {
                return NotFound();
            }

            db.tblProImages.Remove(tblProImage);
            db.SaveChanges();

            return Ok(tblProImage);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool tblProImageExists(int id)
        {
            return db.tblProImages.Count(e => e.img_Id == id) > 0;
        }
    }
}