//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace florist.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class product
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public product()
        {
            this.tblProImages = new HashSet<tblProImage>();
        }
    
        public int prodId { get; set; }
        public string prodName { get; set; }
        public string prodCat { get; set; }
        public string prodDesc { get; set; }
        public Nullable<decimal> prodPrice { get; set; }
        public Nullable<int> quantity { get; set; }
        public Nullable<int> prodThreshold { get; set; }
        public Nullable<int> suppId { get; set; }
        public Nullable<int> img_Id { get; set; }
    
        public virtual supplier supplier { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<tblProImage> tblProImages { get; set; }
        public virtual tblProImage tblProImage { get; set; }
    }
}