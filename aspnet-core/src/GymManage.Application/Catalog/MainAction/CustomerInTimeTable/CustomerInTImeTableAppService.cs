using Abp.Domain.Repositories;
using GymManage.AppEntity.CustomerInTimeTable;
using GymManage.AppEntity.SessionWork;
using GymManage.Catalog.MainAction.CustomerInTimeTable.Request;
using GymManage.Customer;
using GymManage.Employee;
using GymManage.TimeTable;
using GymManage.TrainingClass;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymManage.Catalog.MainAction.CustomerInTimeTable
{
    public class CustomerInTImeTableAppService : GymManageAppServiceBase, ICustomerInTimeTableAppService
    {
        private readonly IRepository<TimeTableEntity> _timeTableRepos;
        private readonly IRepository<SessionWorkEntity> _sessionRepos;
        private readonly IRepository<TrainingClassEntity> _classRepos;
        private readonly IRepository<EmployeeEntity> _employeeRepos;
        private readonly IRepository<CustomerEntity> _customerRepos;
        private readonly IRepository<CustomerInTimeTableEntity> _customerInTimeRepos;

        public CustomerInTImeTableAppService(
            IRepository<TimeTableEntity> timeTableRepos,
            IRepository<SessionWorkEntity> sessionRepos,
            IRepository<TrainingClassEntity> classRepos,
            IRepository<EmployeeEntity> employeeRepos,
            IRepository<CustomerInTimeTableEntity> customerInTimeRepos,
            IRepository<CustomerEntity> customerRepos)
        {
            _timeTableRepos = timeTableRepos;
            _sessionRepos = sessionRepos;
            _classRepos = classRepos;
            _employeeRepos = employeeRepos;
            _customerInTimeRepos = customerInTimeRepos;
            _customerRepos = customerRepos;
        }
        public async Task CreateOrUpdateCustomerInTimeTable(CreateOrUpdateCustomerInTimeTableRequest request)
        {
            var data = new CustomerInTimeTableEntity
            {
               CustomerId = request.CustomerId,
               TimeTableId = request.TimeTableId,
               Active = request.Active
            };

            if (request.Id > 0)
            {
                data.Id = request.Id.Value;
                await _customerInTimeRepos.UpdateAsync(data);
            }
            else
            {
                await _customerInTimeRepos.InsertAsync(data);
            }
        }

        public async Task DeleteCustomeInTimeTable(int id)
        {
            var data = await _customerInTimeRepos.GetAsync(id);
            await _customerInTimeRepos.DeleteAsync(data);
        }

        public async Task<List<CustomerInTimeTableViewModel>> GetAllCustomerInTimeTable(GetCustomerInTimeTableRequest request)
        {
            var employeeQuery = _employeeRepos.GetAll();
            var sessionQuery = _sessionRepos.GetAll();
            var classQuery = _classRepos.GetAll();
            var timeTableQuery = _timeTableRepos.GetAll();
            var customerQuery = _customerRepos.GetAll();
            var customerInTimeQuery = _customerInTimeRepos.GetAll();

            var query = from cit in customerInTimeQuery
                        join cus in customerQuery on cit.CustomerId equals cus.Id
                        join time in timeTableQuery on cit.TimeTableId equals time.Id
                        join e in employeeQuery on time.employeeId equals e.Id
                        join cl in classQuery on time.ClassId equals cl.Id
                        join s in sessionQuery on time.SessionId equals s.Id
                        select new { cit, cus, time, e, cl, s };

            var data = await query.Select(x => new CustomerInTimeTableViewModel()
            {
                Id = x.cit.Id,
                CustomerId = x.cit.CustomerId,
                TimeTableId = x.cit.TimeTableId,
                CustomerName = x.cus.Name,
                Active = x.cit.Active,
                CustomerPhoneNumber = x.cus.PhoneNumber,
                ClassName = x.cl.Name,
                EmployeeName = x.e.Name,
                Lesson = x.time.Lesson,
                Date = x.time.Date,
                SessionId = x.time.SessionId,
                SessionName = x.s.Name
            }).ToListAsync();

            return data;
        }

        public async Task<List<CustomerInTimeTableViewModel>> GetCustomerByTimeTableId(int id)
        {
            var employeeQuery = _employeeRepos.GetAll();
            var sessionQuery = _sessionRepos.GetAll();
            var classQuery = _classRepos.GetAll();
            var timeTableQuery = _timeTableRepos.GetAll();
            var customerQuery = _customerRepos.GetAll();
            var customerInTimeQuery = _customerInTimeRepos.GetAll();

            var query = from cit in customerInTimeQuery
                        join cus in customerQuery on cit.CustomerId equals cus.Id
                        join time in timeTableQuery on cit.TimeTableId equals time.Id
                        join e in employeeQuery on time.employeeId equals e.Id
                        join cl in classQuery on time.ClassId equals cl.Id
                        join s in sessionQuery on time.SessionId equals s.Id
                        select new { cit, cus, time, e, cl, s };

            query = query.Where(x => x.cit.TimeTableId == id);

            var data = await query.Select(x => new CustomerInTimeTableViewModel()
            {
                Id = x.cit.Id,
                CustomerId = x.cit.CustomerId,
                TimeTableId = x.cit.TimeTableId,
                CustomerName = x.cus.Name,
                CustomerPhoneNumber = x.cus.PhoneNumber,
                ClassName = x.cl.Name,
                Active = x.cit.Active,
                EmployeeName = x.e.Name,
                Lesson = x.time.Lesson,
                Date = x.time.Date,
                SessionId = x.time.SessionId,
                SessionName = x.s.Name
            }).ToListAsync();

            return data;
        }

        public async Task<List<CustomerInTimeTableViewModel>> GetTimetableByCustomerId(int id)
        {
            var employeeQuery = _employeeRepos.GetAll();
            var sessionQuery = _sessionRepos.GetAll();
            var classQuery = _classRepos.GetAll();
            var timeTableQuery = _timeTableRepos.GetAll();
            var customerQuery = _customerRepos.GetAll();
            var customerInTimeQuery = _customerInTimeRepos.GetAll();

            var query = from cit in customerInTimeQuery
                        join cus in customerQuery on cit.CustomerId equals cus.Id
                        join time in timeTableQuery on cit.TimeTableId equals time.Id
                        join e in employeeQuery on time.employeeId equals e.Id
                        join cl in classQuery on time.ClassId equals cl.Id
                        join s in sessionQuery on time.SessionId equals s.Id
                        select new { cit, cus, time, e, cl, s };

            query = query.Where(x => x.cit.CustomerId == id);

            var data = await query.Select(x => new CustomerInTimeTableViewModel()
            {
                Id = x.cit.Id,
                CustomerId = x.cit.CustomerId,
                TimeTableId = x.cit.TimeTableId,
                CustomerName = x.cus.Name,
                CustomerPhoneNumber = x.cus.PhoneNumber,
                ClassName = x.cl.Name,
                Active = x.cit.Active,
                EmployeeName = x.e.Name,
                Lesson = x.time.Lesson,
                Date = x.time.Date,
                SessionId = x.time.SessionId,
                SessionName = x.s.Name
            }).ToListAsync();

            return data;
        }
    }
}
