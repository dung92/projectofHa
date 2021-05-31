using Abp.Domain.Entities;
using GymManage.Option;
using GymManage.Product;
using GymManage.Service;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymManage.ProductCategory
{
    [Table("ProductCategory")]
    public class ProductCategoryEntity : Entity
    {
        [ForeignKey(nameof(ProductId))]
        public int ProductId { get; set; }
        public ProductEntity Product { get; set; }



        [ForeignKey(nameof(OptionId))]
        public int OptionId { get; set; }
        public OptionEntity Option { get; set; }




        [ForeignKey(nameof(ServiceId))]
        public int ServiceId { get; set; }
        public ServiceEntity Service { get; set; }



       
        public int Price { get; set; }

    }
}
