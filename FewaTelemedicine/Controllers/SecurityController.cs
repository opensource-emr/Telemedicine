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
using Newtonsoft.Json;

namespace FewaTelemedicine.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SecurityController : ControllerBase
    {
        private FewaDbContext FewaDbContext = null;
        private readonly IProviderRepository _providerRepository;
        List<ProviderCabin> _providerCabins = null;
        List<Provider> _providers = null;
        private readonly IConfiguration _config;

        public SecurityController(
            IProviderRepository providerRepository,
            List<ProviderCabin> providerCabins, IConfiguration config, List<Provider> providers,
            FewaDbContext fewaDbContext
            )
        {
            _providerRepository = providerRepository;
            FewaDbContext = fewaDbContext;
            _providerCabins = providerCabins;
            _providers = providers;
            _config = config;
        }

        [HttpGet]
        public ActionResult GetProviders()
        {
            return Ok(_providerRepository.getProvidersList());
        }

        [HttpPost("Login")]
        public ActionResult Login(Provider provider)
        {
            try
            {
                if (provider == null)
                {
                    return BadRequest();
                }
                if (string.IsNullOrEmpty(provider.userName))
                {
                    return BadRequest();
                }
                var pro = _providerRepository.getProviderByUserName(provider.practice, provider.userName);

                if (pro == null)
                {
                    return BadRequest("User name does not exist, please check");
                }
                if (pro.url != provider.url)
                {
                    return BadRequest("User name is invalid, please check");
                }
                pro.roomName = pro.roomName.Replace("name", provider.userName);
                var providerPwd = Cipher.Decrypt(pro.password, provider.userName);
                if (provider.password != providerPwd)
                {
                    return BadRequest("Password is invalid, please check"); 
                }
                if (providerPwd == provider.password)
                {
                    HttpContext.Session.SetString("name", pro.userName);
                    HttpContext.Session.SetString("practice", pro.practice);
                    pro.newPassword = providerPwd;
                    var token = GenerateJSONWebToken(pro.userName, "provider",pro.providerId,pro.practiceId);
                    AddProviderCabin(pro);
                    var data = new
                    {
                        User = pro,

                        Token = token
                    };
                    return Ok(data);
                }
                return BadRequest("Can not connect please talk with admin.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }

        private void AddProviderCabin(Provider provider)
        {
            foreach (var item in _providerCabins)
            {
                if (item.provider.userName == provider.userName && item.provider.practice == provider.practice)
                {
                    _providerCabins.Remove(item);
                    _providerCabins.Add(new ProviderCabin()
                    { provider = provider });
                    return;
                }
            }
            _providerCabins.Add(new ProviderCabin()
            { provider = provider });

        }
        [HttpPost("VerifyOTP")]
        public ActionResult VerifyOTP([FromBody] Provider obj)
        {
            try
            {
                if (obj == null)
                {
                    return BadRequest();
                }
                if (string.IsNullOrEmpty(obj.email) && (string.IsNullOrEmpty(obj.email) || string.IsNullOrEmpty(obj.userName)))
                {
                    return BadRequest();
                }
                var otp = HttpContext.Session.GetString("otp");
                if (string.IsNullOrEmpty(otp))
                {
                    return NotFound("Otp is not generated");
                }
                Provider provider = JsonConvert.DeserializeObject<Provider>(otp);
                if (provider == null)
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, "provider is not found");
                }
                if (provider.otp == obj.otp && (provider.email == obj.email || provider.userName == obj.email))
                {
                    return Ok(new { Message = "otp verified" });
                }
                else
                {
                    return Unauthorized(new { Message = "invalid otp" });
                }

            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }

        }

        [HttpPost("AdminSetPassword")]
        public ActionResult AdminSetPassword([FromBody] Provider obj)
        {
            try
            {
                if (obj == null)
                {
                    return BadRequest();
                }
                if (string.IsNullOrEmpty(obj.email) && (string.IsNullOrEmpty(obj.email) || string.IsNullOrEmpty(obj.userName)))
                {
                    return BadRequest();
                }
                Provider provider = FewaDbContext.providers.Where(a => a.userName == obj.userName && a.practice.ToLower().Trim() == obj.practice.ToLower().Trim()).FirstOrDefault();
                if (provider == null)
                {
                    return Unauthorized(new { Message = "provider not found" });
                }
                provider.email = obj.email;
                provider.password = Cipher.Encrypt(obj.newPassword, provider.userName);
                FewaDbContext.providers.Update(provider);
                FewaDbContext.SaveChanges();
                return Ok(new { Message = "admin password has been set successfully" });

            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }

        [HttpPost("ResetPassword")]
        public ActionResult ResetPassword([FromBody] Provider obj)
        {
            try
            {
                if (obj == null)
                {
                    return BadRequest();
                }
                if (string.IsNullOrEmpty(obj.email) && (string.IsNullOrEmpty(obj.email) || string.IsNullOrEmpty(obj.userName)))
                {
                    return BadRequest();
                }
                Provider provider = FewaDbContext.providers.Where(a =>( a.email == obj.email || a.userName == obj.email)&&a.practice.ToLower().Trim()==obj.practice.ToLower().Trim()).FirstOrDefault();
                if (provider == null)
                {
                    return Unauthorized(new { Message = "provider not found" });
                }
                provider.password = Cipher.Encrypt(obj.newPassword, provider.userName);
                FewaDbContext.providers.Update(provider);
                FewaDbContext.SaveChanges();
                return Ok(new { Message = "password has been changed successfully" });

            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }

        [HttpPost("VerifyRegistrationOTP")]
        public ActionResult VerifyRegistrationOTP([FromBody] Practice obj)
        {
            try
            {
                if (obj == null)
                {
                    return BadRequest();
                }
                if (string.IsNullOrEmpty(obj.email) && (string.IsNullOrEmpty(obj.email) || string.IsNullOrEmpty(obj.name)))
                {
                    return BadRequest();
                }
                var otp = HttpContext.Session.GetString("registrationOtp");
                if (string.IsNullOrEmpty(otp))
                {
                    return NotFound("Otp is not generated");
                }
                Practice practice = JsonConvert.DeserializeObject<Practice>(otp);
                if (practice == null)
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, "practice is not found");
                }
                if (practice.otp == obj.otp && (practice.email == obj.email && practice.name == obj.name))
                {
                    /// getting default values from database 
                    //Practice pra = FewaDbContext.practices.Where(a => a.url == "practice").FirstOrDefault();
                    //if (pra == null)
                    //{
                    //    return BadRequest();
                    //}

                    /// to add new practice 

                    Practice newPractice = new Practice();
                    newPractice.practiceId = FewaDbContext.practices.Max(a => a.practiceId) + 1;
                    newPractice.name = obj.name; 
                    newPractice.email = obj.email;
                    newPractice.emailHtmlBody = FewaDbContext._emailHtmlBody;
                    newPractice.description = FewaDbContext._description;
                    newPractice.emailSubject = "Fewa Telemedicine Call Today Schedule";
                    newPractice.emailPlainBody = "Please attend the provider";
                    newPractice.emailAdditionalContent = "EmailAdditionalContent";
                    newPractice.callingPlatform = "Jitsi";
                    newPractice.logoPath = "/img/logo.png";
                    newPractice.url = obj.name; 
                    FewaDbContext.practices.Add(newPractice);
                    FewaDbContext.SaveChanges();

                    /// to add new provider

                    Provider provider = new Provider();
                    provider.userName = "admin";
                    provider.password = "admin";
                    provider.password = Cipher.Encrypt(provider.password, provider.userName);
                    provider.roomName = Guid.NewGuid().ToString() + "-" + "name";
                    provider.practice = obj.name; 
                    provider.url = provider.userName; 
                    provider.practiceId = newPractice.practiceId;
                    provider.providerId = FewaDbContext.providers.Max(a => a.providerId) + 1;
                    FewaDbContext.providers.Add(provider);
                    FewaDbContext.SaveChanges();
                    _providers.Clear();
                    foreach (var a in FewaDbContext.providers.ToList<Provider>())
                    {
                        _providers.Add(a);

                    }
                    //  to add new advice

                    ProviderAdvice newAdvice= new ProviderAdvice();
                    newAdvice.adviceId = FewaDbContext.advices.Max(a => a.adviceId) + 1;           
                    newAdvice.inputType = newAdvice.inputType;
                    newAdvice.isChecked = newAdvice.isChecked;
                    newAdvice.practiceId = newPractice.practiceId;
                    newAdvice.providerId = provider.providerId;
                    newAdvice.advice = FewaDbContext._advice1;
                   
                    FewaDbContext.advices.Add(newAdvice);
                    FewaDbContext.SaveChanges();
                    newAdvice.advice = FewaDbContext._advice2;

                    newAdvice.adviceId = newAdvice.adviceId + 1;
                    FewaDbContext.advices.Add(newAdvice);
                    FewaDbContext.SaveChanges();
                    newAdvice.advice = FewaDbContext._advice3;

                    newAdvice.adviceId = newAdvice.adviceId + 1;
                    FewaDbContext.advices.Add(newAdvice);
                    FewaDbContext.SaveChanges();
                    return Ok(new { message = "Your practice account is created successfully! Please set admin email and password", practice = newPractice, provider = provider, providerAdvice = newAdvice });
                }
                else
                {
                    return Unauthorized(new { message = "invalid otp" });
                }

            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }

        }

        [HttpPost("AddProvider")]
        public IActionResult AddProvider([FromBody] Provider obj)
        {
            try
            {
                if (obj is null)
                {
                    return StatusCode(500);
                }
                Provider provider = FewaDbContext.providers.Where(a => a.userName == obj.userName && a.practiceId == obj.practiceId).FirstOrDefault();
                if (provider != null)
                {
                    return Ok(new { message = "Provider already exists" });
                }
                obj.providerId = FewaDbContext.providers.Max(a => a.providerId) + 1;
                obj.password = Cipher.Encrypt(obj.password, obj.userName);
                obj.roomName = Guid.NewGuid().ToString() + "-" + "name";
                obj.practiceId = (from practice in FewaDbContext.practices
                                  where obj.practice.ToLower().Trim() == practice.url.ToLower().Trim()
                                  select practice.practiceId).FirstOrDefault();

                ProviderAdvice newAdvice = new ProviderAdvice();
                newAdvice.adviceId = FewaDbContext.advices.Max(a => a.adviceId) + 1;
                newAdvice.inputType = newAdvice.inputType;
                newAdvice.isChecked = newAdvice.isChecked;
                newAdvice.practiceId = obj.practiceId;
                newAdvice.providerId = obj.providerId;
                newAdvice.advice = FewaDbContext._advice1;

                FewaDbContext.advices.Add(newAdvice);
                FewaDbContext.SaveChanges();
                newAdvice.advice = FewaDbContext._advice2;

                newAdvice.adviceId = newAdvice.adviceId + 1;
                FewaDbContext.advices.Add(newAdvice);
                FewaDbContext.SaveChanges();
                newAdvice.advice = FewaDbContext._advice3;

                newAdvice.adviceId = newAdvice.adviceId + 1;
                FewaDbContext.advices.Add(newAdvice);
                FewaDbContext.SaveChanges();

                FewaDbContext.providers.Add(obj);
                FewaDbContext.SaveChanges();
                _providers.Clear();
                foreach (var a in FewaDbContext.providers.ToList<Provider>()) //fetch new provider 
                {
                    _providers.Add(a);

                }
                return Ok(_providers.Where(a => a.practiceId == obj.practiceId).ToList());
            }
            catch (Exception ex)
            {
                return BadRequest("Please try again");
            }
        }

        [HttpPost("EditProvider")]
        public IActionResult EditProvider([FromBody] Provider obj)
        {
            try
            {
                if (obj is null)
                {
                    return StatusCode(500);
                }
                Provider provider = FewaDbContext.providers.Where(a => a.providerId == obj.providerId && a.practiceId == obj.practiceId).FirstOrDefault();
                if (provider == null)
                {
                    return Ok(new { message = "Provider doesn't exists" });
                }
                else
                {
                    provider.userName = obj.userName;
                    provider.email = obj.email;
                    provider.password = Cipher.Encrypt(obj.password, obj.userName);
                    provider.url = obj.url;
                }
                FewaDbContext.providers.Update(provider);
                FewaDbContext.SaveChanges();
                _providers.Clear();
                foreach (var a in FewaDbContext.providers.ToList<Provider>())
                {
                    _providers.Add(a);

                }
                return Ok(_providers.Where(a => a.practiceId == obj.practiceId).ToList());

            }
            catch (Exception ex)
            {
                return BadRequest("Please try again");
            }
        }


        public string GenerateJSONWebToken(string username, string usertype,int providerId,int practiceId)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var claims = new[] {
                new Claim("Issuer", _config["Jwt:Issuer"]),
                new Claim("UserType",usertype),
                new Claim("ProviderId",providerId.ToString()),
                new Claim("PracticeId",practiceId.ToString()),
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
        /// <summary>
        /// Encrypt text
        /// </summary>
        /// <param name="plainText"> Text to be encrypt</param>
        /// <param name="password"> Key to encrypt text</param>
        /// <returns> Encrypted text</returns>
        public static string Encrypt(string plainText, string password) //password,key:username
        {
            if (plainText == null)
            {
                return null;
            }

            if (password == null)
            {
                password = String.Empty;
            }

            // Get the bytes of the string
            var bytesToBeEncrypted = Encoding.UTF8.GetBytes(plainText);
            var passwordBytes = Encoding.UTF8.GetBytes(password);

            // Hash the password with SHA256
            passwordBytes = SHA256.Create().ComputeHash(passwordBytes);

            var bytesEncrypted = Encrypt(bytesToBeEncrypted, passwordBytes);

            return Convert.ToBase64String(bytesEncrypted);
        }

        public static string Decrypt(string encryptedText, string password) //encryptedpass,key:username
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

        private static byte[] Encrypt(byte[] bytesToBeEncrypted, byte[] passwordBytes)
        {
            byte[] encryptedBytes = null;

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

                    using (var cs = new CryptoStream(ms, AES.CreateEncryptor(), CryptoStreamMode.Write))
                    {
                        cs.Write(bytesToBeEncrypted, 0, bytesToBeEncrypted.Length);
                        cs.Close();
                    }

                    encryptedBytes = ms.ToArray();
                }
            }

            return encryptedBytes;
        }

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