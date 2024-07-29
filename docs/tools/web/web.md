---
sidebar_label: 'Web'
---

# Web

Collection of classes in C# helping you to execute web operations.

Content:
* [Request](#request)
  * [Simple request](#simple-request)
  * [Sending binary file](#sending-binary-file)

## Installation

```nuget
Install-Package FrApp42.Web
```

## Examples

* [AnthoDingo](https://github.com/AnthoDingo) - Author (inspiration taken from the community)
* [Sikelio](https://github.com/sikelio) - Contributor

### Request

#### Simple request

```cs title="Program.cs"
using FrApps42.Web.API;

string url = "";
HttpMethod method = HttpMethod.Get;

ApiRequest request = new(url, method);
request
    .AddContentHeader("", "")
    .AddHeader("", "")
    .AddJsonBody("")
    .AddQueryParam("", "")
    .AcceptJson();

Result<MyModel> result = await request.RunObject<MyModel>();

if (result.StatusCode == 200 && result.Value != null)
{
    Console.WriteLine(result.Value.Name);
    Console.WriteLine(result.Value.Description);
}
else
{
    // Other cases
}
```

```cs title="MyModel.cs"
using System.Text.Json.Serialization;

namespace Program
{
    public class MyModel
    {
        [JsonPropertyName("name")]
        public string Name { get; set; }

        [JsonPropertyName("description")]
        public string Description { get; set; }
    }
}
```

#### Sending binary file

```cs title="Program.cs"
using FrApps42.Web.API;

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

        Result<MyModel> result = await request.RunDocument<MyModel>();
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
```

```cs title="MyModel.cs"
using System.Text.Json.Serialization;

namespace Program
{
    public class MyModel
    {
        [JsonPropertyName("success")]
        public bool Success { get; set; }
    }
}
```
