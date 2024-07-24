---
sidebar_label: 'Request'
---

# Request

## About
A class helps you making call to APIs

Authors:
* [AnthoDingo](https://github.com/AnthoDingo) - Initiator by taking inspiration from the dev community
* [Sikelio](https://github.com/Sikelio) - Contributor

## Installation

```
dotnet add package FrApps42.Web.API.Request
```

## Usage
### Simple request
```cs title="Program.cs"
using FrApps42.Web.API;
using Program.Models;

namespace Program
{
    public class Program
    {
        public static async Task Main()
        {
            string url = "";
            HttpMethod method = HttpMethod.Get;

            ApiRequest request = new(url, method);
            request
                .AddContentHeader("", "")
                .AddHeader("", "")
                .AddJsonBody("")
                .AddQueryParam("", "")
                .AcceptJson();

            Result<SomeModel> result = await request.RunObject<SomeModel>();

            if (result.StatusCode == 200)
            {
                // If your request succeded
            }
            else
            {
                // Other cases
            }
        }
    }
}
```

```cs title="Models/SomeModel.cs"
using System.Text.Json.Serialization;

namespace Program.Models
{
    public class SomeModel
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }

        [JsonPropertyName("name")]
        public string Name { get; set; } = string.Empty;

        [JsonPropertyName("email")]
        public string Email { get; set; } = string.Empty;
    }
}
```

## Advanded Usage
### Sending binary file
```cs
using FrApps42.Web.API;
using Program.Models;

namespace Program
{
    public class Program
    {
        public static async Task Main()
        {
            string url = "";
            string filePath = "path_to_your_file.ext";

            if (File.Exists(filePath))
            {
                try
                {
                    byte[] fileBytes = File.ReadAllBytes(filePath);

                    ApiRequest request = new(url, HttpMethod.Post);
                    request
                        .SetContentType("application/type")
                        .AddDocumentBody(fileBytes, "your_file_name.ext");

                    Result<FileModel> result = await request.RunDocument<FileModel>();
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);
                }
            }
            else
            {
                Console.WriteLine("File do not exist");
            }
        }
    }
}
```

```cs
using System.Text.Json.Serialization;

namespace Program.Models
{
    public class FileModel
    {
        [JsonPropertyName("success")]
        public bool Success { get; set; }
    }
}
```
