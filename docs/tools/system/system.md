---
sidebar_label: 'System'
---

# System

Collection of classes in C# helping you to execute system operations.

Content:
* [IsOnline](#isonline)
  * [Check if device is online](#check-if-device-is-online)
* [Shutdown](#shutdown-windows-only)
  * [Shutdown a specific computer](#shutdown-a-specific-computer)
  * [Ping before shutdown](#ping-before-shutdown)
  * [Log off the current user](#log-off-the-current-user)
  * [Shutdown and sign on automatically](#shutdown-and-sign-on-automatically)
  * [Set a timeout and add a custom reason for the shutdown](#set-a-timeout-and-add-a-custom-reason-for-the-shutdown)
* [WakeOnLan](#wakeonlan)

## Installation

```nuget
Install-Package FrApp42.System
```

## Examples

### IsOnline

* [AnthoDingo](https://github.com/AnthoDingo) - Author

#### Check if device is online

```csharp title="Program.cs"
using namespace FrApp42.System.Net;

string address = "your-address";
string timeout = 5;

IsOnline online = new(address, timeout);

bool isOnline = online.Check();
```

### Shutdown (Windows-only)

* [Sikelio](https://github.com/sikelio) - Author
* [AnthoDingo](https://github.com/AnthoDingo) - Contributor

#### Shutdown a specific computer

```csharp title="Program.cs"
using namespace FrApp42.System.Computer.Shutdown;

string hostname = "your-hostame";

Shutdown shutdown = new();
shutdown
    .SetMachine(hostname)
    .ShutdownComputer();

ShutdownResult result = await shutdown.Run();

if (result.ExitCode == 0)
{
    Console.WriteLine("Shutdown command executed successfully.");
}
else
{
    Console.WriteLine($"Shutdown command failed with exit code {result.ExitCode}. Error: {result.ErrorMessage}");
}
```

#### Ping before shutdown
```cs
using FrApp42.System.Computer.Shutdown;

string hostname = "your-hostame";

Shutdown shutdown = new();
shutdown
    .SetMachine(hostname)
    .PingBefore(5);

ShutdownResult result = await shutdown.Run();

if (result.ExitCode == 0)
{
    Console.WriteLine("Shutdown command executed successfully.");
}
else
{
    Console.WriteLine($"Shutdown command failed with exit code {result.ExitCode}. Error: {result.ErrorMessage}");
}
```

#### Log off the current user

```csharp title="Program.cs"
using FrApp42.System.Computer.Shutdown;

Shutdown shutdown = new();
shutdown
    .LogoutUser();

ShutdownResult result = await shutdown.Run();

if (result.ExitCode == 0)
{
    Console.WriteLine("Shutdown command executed successfully.");
}
else
{
    Console.WriteLine($"Shutdown command failed with exit code {result.ExitCode}. Error: {result.ErrorMessage}");
}
```

#### Shutdown and sign on automatically

```csharp title="Program.cs"
using FrApp42.System.Computer.Shutdown;

Shutdown shutdown = new();
shutdown
    .ShutdownAndSignOn();

ShutdownResult result = await shutdown.Run();

if (result.ExitCode == 0)
{
    Console.WriteLine("Shutdown command executed successfully.");
}
else
{
    Console.WriteLine($"Shutdown command failed with exit code {result.ExitCode}. Error: {result.ErrorMessage}");
}
```

#### Set a timeout and add a custom reason for the shutdown

```csharp title="Program.cs"
using FrApp42.System.Computer.Shutdown;

Shutdown shutdown = new();
shutdown
    .SetTimeOut(60)
    .SetComment("Scheduled maintenance");

ShutdownResult result = await shutdown.Run();

if (result.ExitCode == 0)
{
    Console.WriteLine("Shutdown command executed successfully.");
}
else
{
    Console.WriteLine($"Shutdown command failed with exit code {result.ExitCode}. Error: {result.ErrorMessage}");
}
```

### WakeOnLan

* [Poul Bak](https://stackoverflow.com/users/5741643/poul-bak) - Original author
* [Sikelio](https://github.com/sikelio) - Contributor

```csharp title="Program.cs"
using namespace FrApp42.System.Net;

string macAddress = "your-mac-address";

await WakeOnLan.WakeUp(macAddress);
```
