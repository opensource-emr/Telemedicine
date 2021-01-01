using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using FewaTelemedicine.Domain;
using FewaTelemedicine.Domain.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.AspNetCore.Authorization;


namespace FewaTelemedicine.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]

    public class UploadController : ControllerBase
    {
        [Obsolete]
        private IHostingEnvironment _hostingEnvironment;
        WaitingRoom waitingroom = null;
        FewaDbContext fewaDbContext = null;

        [Obsolete]
        public UploadController(IHostingEnvironment hostingEnvironment, WaitingRoom _waitingroom, FewaDbContext _fewaDbContext)
        {
            _hostingEnvironment = hostingEnvironment;
            waitingroom = _waitingroom;
            fewaDbContext = _fewaDbContext;
        }
        [HttpPost, DisableRequestSizeLimit]
        [Obsolete]
        public IActionResult UploadFile(string folderName = "")
        {
            try
            {
                var files = Request.Form.Files;
                folderName = "Upload" + (!string.IsNullOrEmpty(folderName) ? "/" + folderName : "");
                string webRootPath = _hostingEnvironment.WebRootPath;
                string newPath = Path.Combine(webRootPath, folderName);
                var result = new List<string>();
                if (!Directory.Exists(newPath))
                {
                    Directory.CreateDirectory(newPath);
                }
                if (files.Any(f => f.Length == 0))
                {
                    return BadRequest();
                }

                foreach (var file in files)
                {
                    var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');

                    var fullPath = Path.Combine(newPath, fileName);
                    var dbPath = Path.Combine(folderName, fileName); //you can add this path to a list and then return all dbPaths to the client if require

                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }
                }
                if (Directory.Exists(newPath))
                {
                    var provider = _hostingEnvironment.ContentRootFileProvider;
                    foreach (string fileName in Directory.GetFiles(newPath))
                    {
                        var fileInfo = provider.GetFileInfo(fileName);
                        result.Add(fileInfo.Name);
                    }
                }
                return Ok(result);
            }
            catch (System.Exception ex)
            {
                return Ok("Upload Failed: " + ex.Message);
            }
        }

        [HttpGet]
        [Route("files")]
        [Obsolete]
        public IActionResult Files(string folderName = "")
        {
            try
            {
                var result = new List<string>();
                folderName = "Upload" + (!string.IsNullOrEmpty(folderName) ? "/" + folderName : "");
                string webRootPath = _hostingEnvironment.WebRootPath;
                string newPath = Path.Combine(webRootPath, folderName);
                if (Directory.Exists(newPath))
                {
                    var provider = _hostingEnvironment.ContentRootFileProvider;
                    foreach (string fileName in Directory.GetFiles(newPath))
                    {
                        var fileInfo = provider.GetFileInfo(fileName);
                        result.Add(fileInfo.Name);
                    }
                }
                return Ok(result);
            }
            catch (System.Exception ex)
            {
                return Ok("file doesnot exists: " + ex.Message);
            }
        }

    }
}