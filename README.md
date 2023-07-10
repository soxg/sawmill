### Sawmill - Open-source Node.js/Express & Next.js performance logging and analysis
**Still under development!**

### **Table of Contents**


[Description]()

[Key Features]()

[Getting Started]()

[Configuration Options]()

[How to Contribute]()

[Contributors]()

### **Description**:

Sawmill is a lightweight yet customizable package designed to provide developers with real-time tracking and logging of server handler performance and analytical metrics in Node.js/Express & Next.js environments. Sawmill features two distinct uses in the context of middleware and server environments:

**Request-Response Cycle Timing**: This mode measures the complete lifecycle of a request. From the moment your server receives a request to when it sends a response, all processing times—including routing, request parsing, handling, and response formatting—are encapsulated in this measurement. It reflects the total time a client would have to wait from making a request until receiving a response.

**Individual Middleware Processing Time**: Sawmill may also process the duration of a specific middleware function, measuring the time it takes from when a particular middleware begins execution until it completes. This allows developers to isolate and test the speeds of individual middleware functions for performance tuning and troubleshooting. 

Sawmill aims to empower test-driven development and compatibility with various testing libraries through providing easy-to-access response metrics. It provides easy-to-access response metrics, promoting streamlined and accurate performance analysis. This allows for efficient benchmarking of middleware functions, aiding developers in identifying bottlenecks and optimizing the performance of their web applications. 

However, it's important to note that Sawmill is primarily a development tool and is not advised for use in production. A production-compatible version may be made available in the future.

### **Key Features**:
Real-time performance tracking: Sawmill tracks and logs server handler performance in real-time, providing developers with immediate insights into their application's response metrics.

Customizability: Developers can customize the functionality of Sawmill according to their unique requirements, making it a versatile tool for various development and testing scenarios.

Support for test-driven development: By providing key performance metrics, Sawmill aids in creating more efficient, performance-oriented applications, facilitating the test-driven development process.

Integration with Testing Libraries: Sawmill can be seamlessly incorporated into testing libraries, making it an invaluable tool for performance testing.

External Logging: Beyond tracking, Sawmill also supports external logging. This feature allows for a comprehensive record of your server handler's performance, useful for analysis and debugging.

