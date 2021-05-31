using Abp.Domain.Entities;
using GymManage.TrainingClassCategory;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymManage.TrainingClass
{
    [Table("TrainingClass")]
    public class TrainingClassEntity : Entity
    {
        [Required]
        [MinLength(5)]
        public string Name { get; set; }
        //khoa ngoai den category
        [ForeignKey(nameof(TrainingClassCategoryId))]
        public TrainingClassCategoryEntity TrainingClassCategory { get; set; }
        public int TrainingClassCategoryId { get; set; }
       
    }
}
