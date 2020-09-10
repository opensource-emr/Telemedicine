using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace FewaTelemedicine.Domain.Models
{
    public class ParametersModel
    {
       
        [Key]
        public int Id { get; set; }
        public string ParameterGroupName { get; set; }
        public string ParameterName { get; set; }
        public string ParameterValue { get; set; }
        public string ValueDataType { get; set; }
        public string Description { get; set; }
        [Key, ForeignKey("DoctorsModel")]
        public string DoctorId { get; set; }


    }
    public class Singleton
    {
        [NotMapped]
        public int MyProperty { get; set; }
    }
    public class ChatMessage
    {
        [NotMapped]
        public bool IsDoctor { get; set; }
        [NotMapped]
        public string Name { get; set; }
        [NotMapped]
        public string Message { get; set; }
    }
}
