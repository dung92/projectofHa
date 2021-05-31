
using GymManage.Catalog.TimeManage.Timetable.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymManage.Catalog.TimeManage.Timetable
{
    public interface ITimeTableAppService
    {
        Task<List<TimeTableViewModel>> GetAllTimeTable(GetTimeTableFilterRequest request);
        Task<List<TimeTableViewModel>> GetTimeTableByDate(DateTime date);

        Task<List<TimeTableViewModel>> GetTimeTableById(GetTimeTableByIdRequest request);

        Task DeleteTimeTable(int id);

        Task CreateOrUpdateTimeTable(CreateOrUpdateTimeTableRequest request);
    }
}
