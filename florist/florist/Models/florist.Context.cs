﻿//------------------------------------------------------------------------------
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
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class floristEntities2 : DbContext
    {
        public floristEntities2()
            : base("name=floristEntities2")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<Admin> Admins { get; set; }
        public virtual DbSet<Payment> Payments { get; set; }
        public virtual DbSet<product> products { get; set; }
        public virtual DbSet<supplier> suppliers { get; set; }
        public virtual DbSet<supplierinfo> supplierinfoes { get; set; }
        public virtual DbSet<tblDriver> tblDrivers { get; set; }
        public virtual DbSet<tblOrder> tblOrders { get; set; }
        public virtual DbSet<tblProImage> tblProImages { get; set; }
        public virtual DbSet<Customer> Customers { get; set; }
    }
}
