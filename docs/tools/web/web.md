---
sidebar_label: 'Web'
---

# Web

Collection of classes in C# helping you to execute web operations.

## Content
* [Installation](#installation)
* [Examples](#examples)
    * [Request](#request)
        * [Simple request](#simple-request)
        * [Sending binary file](#sending-binary-file)
        * [Sending raw file](#sending-raw-file)
        * [Getting binary file in response](#getting-binary-file-in-response)

## Installation

```nuget
Install-Package FrApp42.Web
```

## Examples

### Request

Authors / Contributors:
* [AnthoDingo](https://github.com/AnthoDingo) - Author (inspiration taken from the community)
* [Sikelio](https://github.com/sikelio) - Contributor

---

This class allows you to simplify HTTP requests.

:::info
You'll need `Newtosoft.Json` [**13.0.3+**](https://www.nuget.org/packages/Newtonsoft.Json/13.0.3) nuget package to use the `Request` class.

```nuget
Install-Package Newtosoft.Json
```
:::

---

#### Simple request

```cs title="Program.cs"
using FrApps42.Web.API;
using System.Net;

string url = "";
HttpMethod method = HttpMethod.Get;

Request request = new(url, method);
request
    .AddContentHeader("", "")
    .AddHeader("", "")
    .AddJsonBody("")
    .AddQueryParam("", "")
    .AcceptJson();

Result<MyModel> result = await request.RunObject<MyModel>();

if (result.StatusCode == (int)HttpStatusCode.OK && result.Value != null)
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
using Newtonsoft.Json;

namespace Program
{
    public class MyModel
    {
        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("description")]
        public string Description { get; set; }
    }
}
```

#### Sending binary file

```cs title="Program.cs"
using FrApps42.Web.API;
using System.IO;

string url = "";
string filePath = "path_to_your_file.ext";

if (File.Exists(filePath))
{
    try
    {
        byte[] fileBytes = File.ReadAllBytes(filePath);

        Request request = new(url, HttpMethod.Post);
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
using Newtonsoft.Json;

namespace Program
{
    public class MyModel
    {
        [JsonProperty("success")]
        public bool Success { get; set; }
    }
}
```

#### Sending raw file

```cs title="Program.cs"
using FrApps42.Web.API;
using System.IO;

string url = "";
string filePath = "path_to_your_file.ext";

if (File.Exists(filePath))
{
    try
    {
        byte[] fileBytes = File.ReadAllBytes(filePath);

        Request request = new(url, HttpMethod.Post);
        request
            .SetContentType("text/plain")
            .AddDocumentBody(fileBytes, null);

        Result<object> result = await request.RunBinaryRaw<object>();
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

#### Getting binary file in response
```cs title="Program.cs"
using FrApps42.Web.API;
using System.Net;

string url = "";
HttpMethod method = HttpMethod.Get;

Request request = new(url, method);
Result<byte[]> result = await request.RunGetBytes();

if (result.StatusCode == (int)HttpStatusCode.OK && result.Value != null)
{
    // Do something
}
else
{
    // Other cases
}
```
