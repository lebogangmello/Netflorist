using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace florist.Controllers
{
    public class viewProductController : ApiController
    {

        public int prodId { get; set; }
        public string prodCat { get; set; }
        public string prodDesc { get; set; }
        public Nullable<decimal> prodPrice { get; set; }
        public byte[] photo { get; set; }
        public viewProductController()
        {

        }

    }
}
