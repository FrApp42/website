---
sidebar_label: 'System'
---

# System

Collection of classes in C# helping you to execute system operations.

Content:
* [Avake](#avake)
  * [Simple usage](#simple-usage)
  * [Log Awake error](#log-awake-error)
  * [Updated version of Power Awake](#updated-version-of-power-awake)
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

### Avake

* [AnthoDingo](https://github.com/AnthoDingo) - Author (taken from PowerToys)

#### V1
#### Simple usage
```cs title="Program.cs"
using FrApps42.System.Computer.Awake.v1;
...

// Keep Screen on
Awake..SetIndefiniteKeepAwake(true);
// Keep Screen off
Awake..SetIndefiniteKeepAwake(false);

// Disable Keep Awake
Awake.SetNoKeepAwake();

...

Awake.CompleteExit(0, false, "AppName");
```

#### Log Awake error
```cs title="Program.cs"
using FrApps42.System.Computer.Awake.v1;
...

private static void LogUnexpectedOrCancelledKeepAwakeThreadCompletion(){
    Console.WriteLine("The keep-awake thread was terminated early.");
}

private static void LogCompletedKeepAwakeThread(bool result)
{
    Console.WriteLine($"Exited keep-awake thread successfully: {result}");
}

// Keep Screen on
Awake..SetIndefiniteKeepAwake(LogCompletedKeepAwakeThread, LogUnexpectedOrCancelledKeepAwakeThreadCompletion,true);
// Keep Screen off
Awake..SetIndefiniteKeepAwake(LogCompletedKeepAwakeThread, LogUnexpectedOrCancelledKeepAwakeThreadCompletion,false);

// Disable Keep Awake
Awake.SetNoKeepAwake();

...

Awake.CompleteExit(0, false, "AppName");
```

#### V2
#### Updated version of Power Awake
```cs title="Program.cs"
using FrApps42.System.Computer.Awake.v1;
...

private static void LogUnexpectedOrCancelledKeepAwakeThreadCompletion(){
    Console.WriteLine("The keep-awake thread was terminated early.");
}

private static void LogCompletedKeepAwakeThread(bool result)
{
    Console.WriteLine($"Exited keep-awake thread successfully: {result}");
}

// Keep Screen on
Awake..SetIndefiniteKeepAwake(true);
// Keep Screen off
Awake..SetIndefiniteKeepAwake(false);

// Keep Awake for a specified seconds with screen on
Awake.SetTimedKeepAwake(3600, true);
// Keep Awake for a specified seconds with screen off
Awake.SetTimedKeepAwake(3600, false);

// Disable Keep Awake
Awake.SetNoKeepAwake();
```

In V2, be sure to disable KeepAwake before app closing.

### IsOnline

* [AnthoDingo](https://github.com/AnthoDingo) - Author

#### Check if device is online

```csharp title="Program.cs"
using FrApp42.System.Net;

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
using FrApp42.System.Computer.Shutdown;

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
using FrApp42.System.Net;

string macAddress = "your-mac-address";

await WakeOnLan.WakeUp(macAddress);
```
