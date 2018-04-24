using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace florist.Controllers
{
    public class productView
    {

        public int prodId { get; set; }
        public string prodCat { get; set; }
        public string prodDesc { get; set; }
        public Nullable<decimal> prodPrice { get; set; }
        public byte[] photo { get; set; }
        public productView()
        {

        }
    }
}