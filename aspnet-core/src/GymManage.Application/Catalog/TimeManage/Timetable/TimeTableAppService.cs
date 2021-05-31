using Abp.Domain.Repositories;
using Abp.Runtime.Session;
using GymManage.AppEntity.SessionWork;
using GymManage.Authorization.Users;
using GymManage.Catalog.TimeManage.Timetable.Request;
using GymManage.Employee;
using GymManage.TimeTable;
using GymManage.TrainingClass;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymManage.Catalog.TimeManage.Timetable
{
    public class TimeTableAppService : GymManageAppServiceBase, ITimeTableAppService
    {
        private readonly IRepository<TimeTableEntity> _timeTableRepos;
        private readonly IRepository<SessionWorkEntity> _sessionRepos;
        private readonly IRepository<TrainingClassEntity> _classRepos;
        private readonly IRepository<EmployeeEntity> _employeeRepos;
        private readonly IAbpSession _session;
        private readonly UserManager _userManager;
        public TimeTableAppService(
            IRepository<TimeTableEntity> timeTableRepos,
            IRepository<SessionWorkEntity> sessionRepos,
            IRepository<TrainingClassEntity> classRepos,
            IRepository<EmployeeEntity> employeeRepos,
            IAbpSession session,
            UserManager userManager)
        {
            _timeTableRepos = timeTableRepos;
            _sessionRepos = sessionRepos;
            _classRepos = classRepos;
            _employeeRepos = employeeRepos;
            _session = session;
            _userManager = userManager;
        }
        public async Task CreateOrUpdateTimeTable(CreateOrUpdateTimeTableRequest request)
        {
            var data = new TimeTableEntity
            {
                ClassId = request.ClassId,
                SessionId = request.SessionId,
                Lesson = request.Lesson,
                employeeId = request.employeeId,
                Date = request.Date,
                Day = request.Day
            };

            if (request.Id > 0)
            {
                data.Id = request.Id.Value;
                await _timeTableRepos.UpdateAsync(data);
            }
            else
            {
                await _timeTableRepos.InsertAsync(data);
            }
        }

        public async Task DeleteTimeTable(int id)
        {
            var data = await _timeTableRepos.GetAsync(id);
            await _timeTableRepos.DeleteAsync(data);
        }

        public async Task<List<TimeTableViewModel>> GetAllTimeTable(GetTimeTableFilterRequest request)
        {
            var user = _userManager.FindByIdAsync(_session.UserId.ToString());
            var userName = user.Result.UserName;

            var employeeQuery = _employeeRepos.GetAll();
            var sessionQuery = _sessionRepos.GetAll();
            var classQuery = _classRepos.GetAll();
            var timeTableQuery = _timeTableRepos.GetAll();

            var query = from t in timeTableQuery
                        join s in sessionQuery on t.SessionId equals s.Id
                        join c in classQuery on t.ClassId equals c.Id
                        join e in employeeQuery on t.employeeId equals e.Id
                        select new { t, s, c, e };
            if(!string.IsNullOrEmpty(request.Keyword))
            {
                query = query.Where(x => x.c.Name.Contains(request.Keyword));
            }

            if (request.FromDateFilter != null)
            {
                query = query.Where(x => DateTime.Compare(request.FromDateFilter.Value, x.t.Date) < 0 );
            }

            if (request.ToDateFilter != null)
            {
                query = query.Where(x => DateTime.Compare(request.ToDateFilter.Value, x.t.Date) > 0 );
            }

            var data = await query.Select(x => new TimeTableViewModel
            {
                Id = x.t.Id,
                ClassId = x.t.ClassId,
                SessionId = x.t.SessionId,
                EmployeeId = x.t.employeeId,
                Day = x.t.Day,
                Lesson = x.t.Lesson,
                Date = x.t.Date,
                ClassName = x.c.Name,
                SessionName = x.s.Name,
                EmployeeName = x.e.Name,
                CurentUserName = userName,
                EmployeeUserName = x.e.UserName
            }).ToListAsync();

            return data;
        }

        public async Task<List<TimeTableViewModel>> GetTimeTableByDate(DateTime date)
        {
            DateTime dateToCompare = DateTime.Now;

            var user = _userManager.FindByIdAsync(_session.UserId.ToString());
            var userName = user.Result.UserName;

            var employeeQuery = _employeeRepos.GetAll();
            var sessionQuery = _sessionRepos.GetAll();
            var classQuery = _classRepos.GetAll();
            var timeTableQuery = _timeTableRepos.GetAll();

            var query = from t in timeTableQuery
                        join s in sessionQuery on t.SessionId equals s.Id
                        join c in classQuery on t.ClassId equals c.Id
                        join e in employeeQuery on t.employeeId equals e.Id
                        select new { t, s, c, e };

            query = query.Where(x => x.t.Date == date && dateToCompare.Hour < x.s.FromTime.Hour);


            var data = await query.Select(x => new TimeTableViewModel
            {
                Id = x.t.Id,
                ClassId = x.t.ClassId,
                SessionId = x.t.SessionId,
                EmployeeId = x.t.employeeId,
                Day = x.t.Day,
                Lesson = x.t.Lesson,
                Date = x.t.Date,
                ClassName = x.c.Name,
                SessionName = x.s.Name,
                EmployeeName = x.e.Name,
                CurentUserName = userName,
                EmployeeUserName = x.e.UserName
            }).ToListAsync();

            return data;
        }

        public async Task<List<TimeTableViewModel>> GetTimeTableById(GetTimeTableByIdRequest request)
        {
            var user = _userManager.FindByIdAsync(_session.UserId.ToString());
            var userName = user.Result.UserName;

            var employeeQuery = _employeeRepos.GetAll();
            var sessionQuery = _sessionRepos.GetAll();
            var classQuery = _classRepos.GetAll();
            var timeTableQuery = _timeTableRepos.GetAll();

            var query = from t in timeTableQuery
                        join s in sessionQuery on t.SessionId equals s.Id
                        join c in classQuery on t.ClassId equals c.Id
                        join e in employeeQuery on t.employeeId equals e.Id
                        select new { t, s, c, e };

            if (request.ClassId != null)
            {
                query = query.Where(x => x.t.ClassId == request.ClassId.Value);
            }
            if (request.EmployeeId != null)
            {
                query = query.Where(x => x.t.employeeId == request.EmployeeId.Value);
            }
            if (request.SessionId != null)
            {
                query = query.Where(x => x.t.SessionId == request.SessionId.Value);
            }

            var data = await query.Select(x => new TimeTableViewModel
            {
                Id = x.t.Id,
                ClassId = x.t.ClassId,
                SessionId = x.t.SessionId,
                EmployeeId = x.t.employeeId,
                Day = x.t.Day,
                Lesson = x.t.Lesson,
                Date = x.t.Date,
                ClassName = x.c.Name,
                SessionName = x.s.Name,
                EmployeeName = x.e.Name,
                CurentUserName = userName,
                EmployeeUserName = x.e.UserName
            }).ToListAsync();

            return data;
        }
    }
}
