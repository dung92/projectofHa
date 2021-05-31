﻿using Abp.AutoMapper;
using GymManage.AppEntity.SessionWork;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymManage.Catalog.TimeManage.SessionWork.Request
{
    
    public class SessionWorkViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime FromTime { get; set; }
        public DateTime ToTime { get; set; }
    }
}
