using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Text;

namespace Backend
{
    public interface ILogger
    {
        void Log(string s);
    }

    public class Logger : ILogger
    {
        public void Log(string s)
        {
            Debug.WriteLine(s);
        }
    }
}
