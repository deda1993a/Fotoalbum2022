﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Fotóalbum
{
    public class UploadController : Controller
    {
        public string tmp;
        public ActionResult OnPostUppy(List<IFormFile> files)
        {
            Console.WriteLine("public ActionResult OnPostUppy(List<IFormFile> files)");
            long size = files.Sum(f => f.Length);

            foreach (var formFile in files)
            {
                if (formFile.Length > 0)
                {
                    var filePath = $"wwwroot/Upload/{formFile.FileName}";
                    Console.WriteLine("ez: "+filePath);

                    using var stream = System.IO.File.Create(filePath);
                    
                        formFile.CopyTo(stream);
                    tmp = formFile.FileName;
                }
            }

            // Process uploaded files
            // Don't rely on or trust the FileName property without validation.

            return Ok(new {  tmp });
        }
        
    }
}
