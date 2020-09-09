#region This file contains description of Security Controller.
/* This file contains defnition of Methods related to Security of application like JWT,Doctor Login and Decrypt Password.
 */
#endregion

using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using FewaTelemedicine.Domain;
using FewaTelemedicine.Domain.Models;
using FewaTelemedicine.Domain.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace FewaTelemedicine.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SecurityController : ControllerBase
    {
        private FewaDbContext FewaDbContext = null;
        private readonly IDoctorRepository _doctorRepository;
        List<DoctorCabin> _doctorcabins = null;
        List<DoctorsModel> _doctors = null;
        private readonly IConfiguration _config;

        public SecurityController(
            IDoctorRepository doctorRepository,
            List<DoctorCabin> doctorcabins, IConfiguration config, List<DoctorsModel> doctors,
            FewaDbContext fewaDbContext
            )
        {
            _doctorRepository = doctorRepository;
            FewaDbContext = fewaDbContext;
            _doctorcabins = doctorcabins;
            _doctors = doctors;
            _config = config;
        }

        [HttpGet]
        public ActionResult GetDoctors()
        {
            return Ok(_doctorRepository.GetDoctorsList());
        }

        [HttpPost("Login")]
        public ActionResult Login(DoctorsModel doctor)
        {
            try
            {
                if (doctor == null)
                {
                    return BadRequest();
                }
                if (string.IsNullOrEmpty(doctor.UserName))
                {
                    return BadRequest();
                }
                var doc = _doctorRepository.GetDoctorByUserName(doctor.UserName);
                doc.DoctorRoomName = doc.DoctorRoomName.Replace("DoctorName", doctor.UserName);
                if (doc == null)
                {
                    return Unauthorized();
                }
                var docPwd = Cipher.Decrypt(doc.Password, doctor.UserName);
                if (doctor.Password != docPwd)
                {
                    return Unauthorized();
                }
                if (docPwd== doctor.Password)
                {
                doctor.Image = doc.Image;
                doctor.NameTitle = doc.NameTitle;
                doctor.DoctorName = doc.DoctorName;
                doctor.DoctorRoomName = doc.DoctorRoomName;
                HttpContext.Session.SetString("Name", doctor.UserName);
                    var token = GenerateJSONWebToken(doctor.UserName, "doctor");
                    AddDoctorCabin(doc.UserName);
                    var data = new
                    {
                        User = doctor,                  
                        Token = token
                    };
                    return Ok(data);
                }
                return Unauthorized();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }
        //public bool CheckDoctor(string name, string password)
        //{
        //    foreach (var item in _doctors)
        //    {
        //        if (item.UserName == name)
        //        {
        //            if (item.Password == password)
        //            {
        //                return true;
        //            }
        //            else
        //            {
        //                return false;
        //            }
        //        }
        //    }
        //    return false;
        //}
        private void AddDoctorCabin(string DoctorName)
        {
            foreach (var item in _doctorcabins)
            {
                if (item.DoctorsModel.UserName == DoctorName)
                {
                    _doctorcabins.Remove(item);
                    _doctorcabins.Add(new DoctorCabin()
                    { DoctorsModel = new DoctorsModel() { UserName = DoctorName } });
                    return;
                }
            }
            _doctorcabins.Add(new DoctorCabin()
            { DoctorsModel = new DoctorsModel() { UserName = DoctorName } });

        }
     
        private string GenerateJSONWebToken(string username, string usertype)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var claims = new[] {
                new Claim("Issuer", _config["Jwt:Issuer"]),
                new Claim("UserType",usertype),
                new Claim(JwtRegisteredClaimNames.UniqueName, username)
            };

            var token = new JwtSecurityToken(_config["Jwt:Issuer"],
              _config["Jwt:Issuer"],
              claims,
              expires: DateTime.Now.AddMinutes(120),
              signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
    public static class Cipher
    {
       
        //public static string Encrypt(string plainText, string password)
        //{
        //    if (plainText == null)
        //    {
        //        return null;
        //    }

        //    if (password == null)
        //    {
        //        password = String.Empty;
        //    }

        //    // Get the bytes of the string
        //    var bytesToBeEncrypted = Encoding.UTF8.GetBytes(plainText);
        //    var passwordBytes = Encoding.UTF8.GetBytes(password);

        //    // Hash the password with SHA256
        //    passwordBytes = SHA256.Create().ComputeHash(passwordBytes);

        //    var bytesEncrypted = Encrypt(bytesToBeEncrypted, passwordBytes);

        //    return Convert.ToBase64String(bytesEncrypted);
        //}

        public static string Decrypt(string encryptedText, string password)
        {
            if (encryptedText == null)
            {
                return null;
            }

            if (password == null)
            {
                password = String.Empty;
            }

            // Get the bytes of the string
            var bytesToBeDecrypted = Convert.FromBase64String(encryptedText);
            var passwordBytes = Encoding.UTF8.GetBytes(password);

            passwordBytes = SHA256.Create().ComputeHash(passwordBytes);

            var bytesDecrypted = Decrypt(bytesToBeDecrypted, passwordBytes);

            return Encoding.UTF8.GetString(bytesDecrypted);
        }

        //private static byte[] Encrypt(byte[] bytesToBeEncrypted, byte[] passwordBytes)
        //{
        //    byte[] encryptedBytes = null;

        //    // Set your salt here, change it to meet your flavor:
        //    // The salt bytes must be at least 8 bytes.
        //    var saltBytes = new byte[] { 1, 2, 3, 4, 5, 6, 7, 8 };

        //    using (MemoryStream ms = new MemoryStream())
        //    {
        //        using (RijndaelManaged AES = new RijndaelManaged())
        //        {
        //            var key = new Rfc2898DeriveBytes(passwordBytes, saltBytes, 1000);

        //            AES.KeySize = 256;
        //            AES.BlockSize = 128;
        //            AES.Key = key.GetBytes(AES.KeySize / 8);
        //            AES.IV = key.GetBytes(AES.BlockSize / 8);

        //            AES.Mode = CipherMode.CBC;

        //            using (var cs = new CryptoStream(ms, AES.CreateEncryptor(), CryptoStreamMode.Write))
        //            {
        //                cs.Write(bytesToBeEncrypted, 0, bytesToBeEncrypted.Length);
        //                cs.Close();
        //            }

        //            encryptedBytes = ms.ToArray();
        //        }
        //    }

        //    return encryptedBytes;
        //}

        private static byte[] Decrypt(byte[] bytesToBeDecrypted, byte[] passwordBytes)
        {
            byte[] decryptedBytes = null;

            // Set your salt here, change it to meet your flavor:
            // The salt bytes must be at least 8 bytes.
            var saltBytes = new byte[] { 1, 2, 3, 4, 5, 6, 7, 8 };

            using (MemoryStream ms = new MemoryStream())
            {
                using (RijndaelManaged AES = new RijndaelManaged())
                {
                    var key = new Rfc2898DeriveBytes(passwordBytes, saltBytes, 1000);

                    AES.KeySize = 256;
                    AES.BlockSize = 128;
                    AES.Key = key.GetBytes(AES.KeySize / 8);
                    AES.IV = key.GetBytes(AES.BlockSize / 8);
                    AES.Mode = CipherMode.CBC;

                    using (var cs = new CryptoStream(ms, AES.CreateDecryptor(), CryptoStreamMode.Write))
                    {
                        cs.Write(bytesToBeDecrypted, 0, bytesToBeDecrypted.Length);
                        cs.Close();
                    }

                    decryptedBytes = ms.ToArray();
                }
            }

            return decryptedBytes;
        }
    }
}