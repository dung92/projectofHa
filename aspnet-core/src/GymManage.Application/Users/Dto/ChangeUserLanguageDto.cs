using System.ComponentModel.DataAnnotations;

namespace GymManage.Users.Dto
{
    public class ChangeUserLanguageDto
    {
        [Required]
        public string LanguageName { get; set; }
    }
}