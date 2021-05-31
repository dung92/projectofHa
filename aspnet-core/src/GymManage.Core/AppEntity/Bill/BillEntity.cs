using Abp.Domain.Entities;
using GymManage.Customer;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymManage.Bill
{
    [Table("Bill")]
    public class BillEntity : Entity
    {
        [ForeignKey(nameof(CustomerId))]
        public int CustomerId { get; set; }
        public CustomerEntity Customer { get; set; }

        public string Name { get; set; }

        private DateTime dateCreated;
        public DateTime DateCreated { get { return dateCreated; } set { dateCreated = DateTime.Now; } }
        public string UserCreated { get; set; }
        public float OriginalPrice { get; set; }
        public float Discount { get; set; }
        public float TotalPrice { get; set; }      
        public string Note { get; set; }
    }
}
