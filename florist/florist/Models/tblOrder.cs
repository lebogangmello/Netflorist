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
    
    public partial class tblOrder
    {
        public int orderId { get; set; }
        public Nullable<decimal> totalPrice { get; set; }
        public string orderDeliveryAddress { get; set; }
        public string custEmail { get; set; }
        public string orderStatus { get; set; }
        public Nullable<int> paymentId { get; set; }
        public Nullable<int> prodId { get; set; }
        public Nullable<int> custId { get; set; }
        public Nullable<int> drvId { get; set; }
    
        public virtual Customer Customer { get; set; }
        public virtual product product { get; set; }
        public virtual tblDriver tblDriver { get; set; }
    }
}
