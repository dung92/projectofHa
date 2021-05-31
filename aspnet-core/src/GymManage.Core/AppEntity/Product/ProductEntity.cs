using Abp.Domain.Entities;
using GymManage.Customer;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymManage.Product
{
    [Table("Product")]
    public class ProductEntity :Entity
    {
        public string Name { get; set; }
        public string Description { get; set; }
    }
}
