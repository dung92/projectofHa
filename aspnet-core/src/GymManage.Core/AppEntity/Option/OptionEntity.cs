using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymManage.Option
{
    [Table("Option")]
    public class OptionEntity : Entity
    {
        public string Name { get; set; }
        public int Amount { get; set; }
        public string Unit { get; set; }
        public string Description { get; set; }
    }
}
