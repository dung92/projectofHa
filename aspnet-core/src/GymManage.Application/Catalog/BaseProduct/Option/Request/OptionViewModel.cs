using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymManage.Catalog.BaseProduct.Option.Request
{
    public class OptionViewModel
    {
        public int? Id { get; set; }
        public string Name { get; set; }
        public int Amount { get; set; }
        public string Unit { get; set; }
        public string Description { get; set; }
    }
}
