---
sidebar_label: 'Shutdown'
---

# Shutdown

## About
A class that sends a command to shutdown a computer with its hostname or perform various other shutdown-related operations.

Authors:
* [Sikelio](https://github.com/Sikelio) - Original author
* [AnthoDingo](https://github.com/AnthoDingo) - Contributor

## Installation

```
dotnet add package FrApps42.System.Computer.Shutdown
```

## Usage
### Shutdown a specific computer
```cs title="Program.cs"
using FrApps42.System.Computer.Shutdown;

namespace Program
{
    public class Program
    {
        public static async Task Main()
        {
            string hostname = "your-computer-name"; // <-- the hostname of the machine you want to shutdown.

            Shutdowner shutdowner = new();
            shutdowner
                .SetMachine(hostname)
                .ShutdownComputer();

            CommandResult result = await shutdowner.Run();

            if (result.ExitCode == 0)
            {
                Console.WriteLine("Shutdown command executed successfully.");
            }
            else
            {
                Console.WriteLine($"Shutdown command failed with exit code {result.ExitCode}. Error: {result.ErrorMessage}");
            }
        }
    }
}
```

## Advanded Usage
### Ping before shutdown
```cs
using FrApps42.System.Computer.Shutdown;

namespace Program
{
    public class Program
    {
        public static async Task Main()
        {
            Shutdowner shutdowner = new();
            shutdowner
                .PingBefore(5); // <-- Timeout of the ping

            CommandResult result = await shutdowner.Run();

            if (result.ExitCode == 0)
            {
                Console.WriteLine("Shutdown command executed successfully.");
            }
            else
            {
                Console.WriteLine($"Shutdown command failed with exit code {result.ExitCode}. Error: {result.ErrorMessage}");
            }
        }
    }
}
```

### Log off the current user
```cs title="Program.cs"
using FrApps42.System.Computer.Shutdown;

namespace Program
{
    public class Program
    {
        public static async Task Main()
        {
            Shutdowner shutdowner = new();
            shutdowner
                .LogoutUser();

            CommandResult result = await shutdowner.Run();

            if (result.ExitCode == 0)
            {
                Console.WriteLine("Shutdown command executed successfully.");
            }
            else
            {
                Console.WriteLine($"Shutdown command failed with exit code {result.ExitCode}. Error: {result.ErrorMessage}");
            }
        }
    }
}
```

### Shutdown and sign on automatically
```cs title="Program.cs"
using FrApps42.System.Computer.Shutdown;

namespace Program
{
    public class Program
    {
        public static async Task Main()
        {
            Shutdowner shutdowner = new();
            shutdowner
                .ShutdownAndSignOn();

            CommandResult result = await shutdowner.Run();

            if (result.ExitCode == 0)
            {
                Console.WriteLine("Shutdown command executed successfully.");
            }
            else
            {
                Console.WriteLine($"Shutdown command failed with exit code {result.ExitCode}. Error: {result.ErrorMessage}");
            }
        }
    }
}
```

### Set a timeout and add a custom reason for the shutdown
```cs title="Program.cs"
using FrApps42.System.Computer.Shutdown;

namespace Program
{
    public class Program
    {
        public static async Task Main()
        {
            Shutdowner shutdowner = new();
            shutdowner
                .SetTimeOut(60) // Set timeout to 60 seconds
                .SetComment("Scheduled maintenance"); // Max 512 characters

            CommandResult result = await shutdowner.Run();

            if (result.ExitCode == 0)
            {
                Console.WriteLine("Shutdown command executed successfully.");
            }
            else
            {
                Console.WriteLine($"Shutdown command failed with exit code {result.ExitCode}. Error: {result.ErrorMessage}");
            }
        }
    }
}
```
