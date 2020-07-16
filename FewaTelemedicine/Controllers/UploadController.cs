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

namespace FewaTelemedicine.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]


    public class UploadController : ControllerBase
    {
        [Obsolete]
        private IHostingEnvironment _hostingEnvironment;
        WaitingRoom waitingroom = null;
        FewaDbContext fewaDbContext = null;

        [Obsolete]
        public UploadController(IHostingEnvironment hostingEnvironment,WaitingRoom _waitingroom, FewaDbContext _fewaDbContext)
        {
            _hostingEnvironment = hostingEnvironment;
            waitingroom = _waitingroom;
            fewaDbContext = _fewaDbContext;
        }
        [HttpPost, DisableRequestSizeLimit]
        [Obsolete]
        public IActionResult UploadFile()
        {
            try
            {
                var files = Request.Form.Files;
                string folderName = "Upload";
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
        public IActionResult Files()
        {
            try
            {
                var result = new List<string>();
                string folderName = "Upload";
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
        [HttpGet]
        [Route("download")]
        [Obsolete]
        public IActionResult Download([FromQuery] string file)
        {
            try
            {
                string folderName = "Upload";
                string webRootPath = _hostingEnvironment.WebRootPath;
                string newPath = Path.Combine(webRootPath, folderName);
                var filePath = Path.Combine(newPath, file);
                if (!System.IO.File.Exists(filePath))
                    return NotFound();

                var memory = new MemoryStream();
                using (var stream = new FileStream(filePath, FileMode.Open))
                {
                    stream.CopyToAsync(memory);
                }
                memory.Position = 0;

                return File(memory, GetContentType(filePath), file);
            }
            catch (System.Exception ex)
            {
                return Ok("download Failed: " + ex.Message);
            }
        }
        private string GetContentType(string path)
        {
            var provider = new FileExtensionContentTypeProvider();
            string contentType;
            if (!provider.TryGetContentType(path, out contentType))
            {
                contentType = "application/octet-stream";
            }
            return contentType;
        }
    }
}