using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymManage.Service
{
    [Table("Service")]
    public class ServiceEntity : Entity
    {
        public string Name { get; set; }
        public string Description { get; set; }
    }
}
