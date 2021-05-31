using Abp.Domain.Entities;
using GymManage.Product;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymManage.TrainingClassCategory
{
    [Table("TrainingClassCategory")]
    public class TrainingClassCategoryEntity : Entity
    {
        [Required]
        [MinLength(5)]
        public string Name { get; set; }

        public string Description { get; set; }


        [ForeignKey(nameof(ProductId))]
        public ProductEntity Product { get; set; }
        public int ProductId { get; set; }
    }
}
