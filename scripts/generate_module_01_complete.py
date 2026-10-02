import json
import os
import shutil

GETTING_STARTED_DIR = os.path.join(
    os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
    "data", "curriculum", "java", "basics", "getting-started"
)

os.makedirs(GETTING_STARTED_DIR, exist_ok=True)

LESSONS_DATA = [
    {
        "id": "les-getting-started-what-is-java-and-why-is-it-used",
        "primarySlug": "what-is-java-and-why-is-it-used",
        "aliasSlugs": ["what-is-java"],
        "title": "What Is Java & Why Is It Used?",
        "summary": "Discover why Java remains the backbone of global enterprise software, financial systems, and mobile applications worldwide.",
        "difficulty": "beginner",
        "estimatedMinutes": 12,
        "prerequisites": [],
        "learningObjectives": [
            "Explain what Java is in simple, everyday language",
            "Identify real-world systems built with Java (UPI payments, Netflix, Android)",
            "Understand the basic 3-step cycle: write code, compile, and run"
        ],
        "expectedOutcomes": [
            "Confident mental model of Java's role in modern software engineering"
        ],
        "activities": [
            {
                "id": "act-wij-breakdown",
                "orderIndex": 1,
                "type": "concept",
                "title": "What Is Java & Why Is It Used?",
                "outputSnippet": "Hello! Java is running smoothly.",
                "breakdown": {
                    "whatIsIt": "Java is a popular, human-readable programming language created in 1995. It lets you write clear instructions that any computer can execute safely and quickly.",
                    "whyItMatters": "Java is trusted by banks, UPI apps, and tech giants because it is secure, fast, and rarely crashes. Once you learn Java, you have a rock-solid foundation for any tech career.",
                    "howItWorks": [
                        "You write instructions in plain English-like code in a .java file.",
                        "The Java compiler (javac) translates your instructions into universal Bytecode (.class).",
                        "The Java Virtual Machine (JVM) on any computer executes the bytecode smoothly."
                    ],
                    "keyTakeaways": [
                        "English-like, secure programming language",
                        "Powers UPI payments, banking, and Android apps",
                        "Write once in .java, run everywhere via bytecode"
                    ]
                }
            },
            {
                "id": "act-wij-code",
                "orderIndex": 2,
                "type": "code_walkthrough",
                "title": "Your First High-Level Look at Java Code",
                "codeSnippet": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello! Java is running smoothly.\");\n    }\n}",
                "description": "Here is a complete, working Java program. Notice three essential parts: 1. All code lives inside a class (Main). 2. Execution always starts at main(). 3. System.out.println prints text to the screen."
            },
            {
                "id": "act-wij-mcq",
                "orderIndex": 3,
                "type": "mcq",
                "title": "Quick Concept Check",
                "questions": [
                    {
                        "id": "q-wij-usage",
                        "type": "mcq",
                        "prompt": "Where is Java widely used in the real world today?",
                        "options": [
                            "Only for simple desktop calculators",
                            "For banking backends, UPI payment systems, and Android apps",
                            "Only on older computers running Windows 95",
                            "Exclusively for styling website colors"
                        ],
                        "correctAnswer": 1,
                        "hints": [
                            {
                                "step": 1,
                                "hint": "Think about UPI apps like PhonePe and Google Pay, and cloud services like Netflix."
                            }
                        ],
                        "explanation": "Java is the primary backbone for enterprise banking, UPI payments, cloud microservices, and Android applications globally.",
                        "difficulty": "easy",
                        "estimatedSeconds": 30
                    }
                ]
            },
            {
                "id": "act-wij-practice",
                "orderIndex": 4,
                "type": "interactive_sandbox",
                "title": "Hands-on Practice: Say Hello with Java",
                "practice": {
                    "title": "First Greeting Assignment",
                    "problemStatement": "Write a complete Java program that prints: 'Hello! I am learning Java with LearnBySelf.' to standard output.",
                    "requirements": [
                        "Class name must be 'Main'",
                        "Include standard entry point: public static void main(String[] args)",
                        "Output must exactly match: Hello! I am learning Java with LearnBySelf."
                    ],
                    "initialCode": "public class Main {\n    public static void main(String[] args) {\n        // TODO: Print the greeting below\n        System.out.println(\"Hello! I am learning Java with LearnBySelf.\");\n    }\n}",
                    "expectedOutput": "Hello! I am learning Java with LearnBySelf.",
                    "hints": [
                        "Make sure 'System' has a capital S.",
                        "Double-check that the string matches the requirement exactly."
                    ]
                }
            },
            {
                "id": "act-wij-interview",
                "orderIndex": 5,
                "type": "interview_qa",
                "title": "Placement Interview Q&A",
                "interviewQA": [
                    {
                        "id": "int-wij-1",
                        "question": "What is Java and why is it so widely used in banking and enterprise software?",
                        "companyTags": ["TCS", "Infosys", "Wipro", "Cognizant"],
                        "expectedAnswer": "Java is an object-oriented, cross-platform programming language known for its robust security, automatic memory management (Garbage Collection), and high performance. Enterprise companies and banks trust Java because it provides long-term backward compatibility and proven stability under massive user traffic.",
                        "keyPoints": [
                            "Platform independent via bytecode and JVM",
                            "Robust security and automatic garbage collection",
                            "Proven reliability for mission-critical enterprise systems"
                        ],
                        "commonMistakes": [
                            "Confusing Java with JavaScript (they are completely different languages)"
                        ]
                    }
                ]
            },
            {
                "id": "act-wij-checklist",
                "orderIndex": 6,
                "type": "self_evaluation",
                "title": "Confidence Checklist",
                "checklist": [
                    "I can explain what Java is in simple words to a friend.",
                    "I know that Java powers banking, UPI payments, and mobile apps.",
                    "I understand the basic 3-step flow: write code, compile, and run."
                ]
            }
        ]
    },
    {
        "id": "les-getting-started-why-does-java-run-on-different-computers",
        "primarySlug": "why-does-java-run-on-different-computers",
        "aliasSlugs": ["why-java-platform-independence-and-wora"],
        "title": "Why Does Java Run on Different Computers?",
        "summary": "Understand how intermediate bytecode and the JVM solve platform compatibility without rewriting code.",
        "difficulty": "beginner",
        "estimatedMinutes": 12,
        "prerequisites": ["les-getting-started-what-is-java-and-why-is-it-used"],
        "learningObjectives": [
            "Understand 'Write Once, Run Anywhere' (WORA)",
            "Differentiate direct machine code (.exe) from portable bytecode (.class)",
            "Understand why the JVM is platform-dependent while bytecode is portable"
        ],
        "expectedOutcomes": [
            "Clear understanding of why Java code written on Windows runs seamlessly on Mac and Linux"
        ],
        "activities": [
            {
                "id": "act-wip-breakdown",
                "orderIndex": 1,
                "type": "concept",
                "title": "Why Does Java Run on Different Computers?",
                "outputSnippet": "Write Once, Run Anywhere!",
                "breakdown": {
                    "whatIsIt": "Java is famous for WORA: 'Write Once, Run Anywhere'. You can write your program on Windows, and the exact same compiled file runs on macOS or Linux without changes.",
                    "whyItMatters": "In older languages like C++, an executable compiled on Windows (.exe) crashes on a Mac because their processors and operating systems speak different binary formats. Java eliminates this limitation.",
                    "howItWorks": [
                        "You write your program in Main.java.",
                        "The compiler (javac) turns your code into universal Bytecode (Main.class), which is independent of any operating system.",
                        "Each OS has its own JVM translator (Windows JVM, Mac JVM, Linux JVM). The local JVM reads the universal bytecode and translates it into native CPU instructions."
                    ],
                    "keyTakeaways": [
                        "Bytecode (.class) is universal and platform-independent",
                        "The JVM is OS-specific (platform-dependent)",
                        "You never have to recompile your program for different laptops"
                    ]
                }
            },
            {
                "id": "act-wip-analogy",
                "orderIndex": 2,
                "type": "analogy",
                "title": "The Universal Document Analogy",
                "analogy": {
                    "headline": "Why Bytecode is like a PDF document",
                    "story": "Imagine you save a document as a universal PDF. You don't need a separate PDF for Windows, Mac, or Android. As long as each device has a certified PDF reader installed, your document displays identically everywhere. Java Bytecode is like a PDF for code, and the JVM is the certified reader.",
                    "keyTakeaway": "Bytecode is universal. The JVM is the local reader that translates it to your device's screen and processor."
                }
            },
            {
                "id": "act-wip-code",
                "orderIndex": 3,
                "type": "code_walkthrough",
                "title": "Cross-Platform Message Example",
                "codeSnippet": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Write Once, Run Anywhere!\");\n    }\n}",
                "description": "This program prints Java's famous promise. When compiled, the resulting Main.class can be shared and run on any machine with Java installed."
            },
            {
                "id": "act-wip-mcq",
                "orderIndex": 4,
                "type": "mcq",
                "title": "Platform Independence Check",
                "questions": [
                    {
                        "id": "q-wip-wora",
                        "type": "mcq",
                        "prompt": "Which component of Java is platform-independent, and which is platform-dependent?",
                        "options": [
                            "Bytecode is platform-independent; the JVM is platform-dependent",
                            "Bytecode is platform-dependent; the JVM is platform-independent",
                            "Both Bytecode and JVM are platform-independent",
                            "Both Bytecode and JVM are platform-dependent"
                        ],
                        "correctAnswer": 0,
                        "hints": [
                            {
                                "step": 1,
                                "hint": "Think about whether you download a different Java installer for Windows vs Mac."
                            }
                        ],
                        "explanation": "Bytecode (.class) is identical across all systems (Write Once). But the JVM must be tailored to the specific OS and CPU (Run Anywhere). Therefore, the JVM itself is platform-dependent.",
                        "difficulty": "easy",
                        "estimatedSeconds": 40
                    }
                ]
            },
            {
                "id": "act-wip-practice",
                "orderIndex": 5,
                "type": "interactive_sandbox",
                "title": "Hands-on Practice: Output the WORA Motto",
                "practice": {
                    "title": "WORA Assignment",
                    "problemStatement": "Write a Java program that outputs: 'Write Once, Run Anywhere!' to standard output.",
                    "requirements": [
                        "Class name must be 'Main'",
                        "Include standard entry point: public static void main(String[] args)",
                        "Output must exactly match: Write Once, Run Anywhere!"
                    ],
                    "initialCode": "public class Main {\n    public static void main(String[] args) {\n        // TODO: Print the WORA motto\n        System.out.println(\"Write Once, Run Anywhere!\");\n    }\n}",
                    "expectedOutput": "Write Once, Run Anywhere!",
                    "hints": [
                        "Double check spelling and exclamation mark.",
                        "Ensure the semicolon (;) is at the end of the line."
                    ]
                }
            },
            {
                "id": "act-wip-interview",
                "orderIndex": 6,
                "type": "interview_qa",
                "title": "Placement Interview Q&A",
                "interviewQA": [
                    {
                        "id": "int-wip-1",
                        "question": "Why is Java called platform-independent?",
                        "companyTags": ["TCS", "Infosys", "Wipro", "Amazon"],
                        "expectedAnswer": "Java is platform-independent because its compiler produces intermediate Bytecode (.class) instead of machine-specific binary code. Any operating system equipped with a compatible Java Virtual Machine (JVM) can interpret and execute this bytecode without recompiling the original source code.",
                        "keyPoints": [
                            "Compiles to universal Bytecode (.class)",
                            "OS-specific JVM translates Bytecode to native machine instructions",
                            "Eliminates the need for OS-specific builds"
                        ],
                        "commonMistakes": [
                            "Claiming that the JVM itself is platform-independent"
                        ]
                    }
                ]
            },
            {
                "id": "act-wip-checklist",
                "orderIndex": 7,
                "type": "self_evaluation",
                "title": "Confidence Checklist",
                "checklist": [
                    "I can explain what WORA stands for and what it means.",
                    "I understand why bytecode is portable across Windows, Mac, and Linux.",
                    "I know that the JVM is OS-specific."
                ]
            }
        ]
    },
    {
        "id": "les-getting-started-jdk-jre-and-jvm",
        "primarySlug": "jdk-jre-and-jvm",
        "aliasSlugs": ["jdk-jre-jvm"],
        "title": "JDK, JRE & JVM",
        "summary": "Deconstruct the three software packages of Java: what's inside each, who needs what, and what you must install.",
        "difficulty": "beginner",
        "estimatedMinutes": 12,
        "prerequisites": ["les-getting-started-why-does-java-run-on-different-computers"],
        "learningObjectives": [
            "Clearly distinguish between JDK, JRE, and JVM",
            "Know where developer tools like javac live",
            "Understand why software developers always install the JDK"
        ],
        "expectedOutcomes": [
            "Clear mental picture of the JDK ⊃ JRE ⊃ JVM hierarchy"
        ],
        "activities": [
            {
                "id": "act-trio-breakdown",
                "orderIndex": 1,
                "type": "concept",
                "title": "JDK, JRE & JVM: The Three Software Layers",
                "outputSnippet": "JDK contains JRE, and JRE contains JVM.",
                "breakdown": {
                    "whatIsIt": "Java is packaged into three software layers: JVM (the execution engine), JRE (the runtime environment with libraries), and JDK (the complete developer toolkit).",
                    "whyItMatters": "Knowing this prevents setup confusion. If you only install the JRE, you cannot compile code with javac! As a developer, you always need the JDK.",
                    "howItWorks": [
                        "JVM (Java Virtual Machine): The engine that runs bytecode, manages computer memory, and talks to your CPU.",
                        "JRE (Java Runtime Environment): JVM + Core Libraries (like Math, String, System). It is for users who only want to RUN pre-built Java apps.",
                        "JDK (Java Development Kit): JRE + Developer Utilities (javac compiler, debugger, javadoc). It is for engineers who WRITE and COMPILE code."
                    ],
                    "keyTakeaways": [
                        "JDK contains JRE; JRE contains JVM (JDK ⊃ JRE ⊃ JVM)",
                        "javac compiler lives exclusively inside the JDK",
                        "As a software engineering student, always install the JDK"
                    ]
                }
            },
            {
                "id": "act-trio-code",
                "orderIndex": 2,
                "type": "code_walkthrough",
                "title": "Software Relationship Example",
                "codeSnippet": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"JDK contains JRE, and JRE contains JVM.\");\n    }\n}",
                "description": "This program prints the fundamental relationship between the three layers. The code was compiled by the JDK's javac and is being executed by the JVM."
            },
            {
                "id": "act-trio-mcq",
                "orderIndex": 3,
                "type": "mcq",
                "title": "Layer Classification Check",
                "questions": [
                    {
                        "id": "q-trio-javac",
                        "type": "mcq",
                        "prompt": "As a student writing and compiling Java programs, which software package must you install?",
                        "options": [
                            "JRE only",
                            "JVM only",
                            "JDK (Java Development Kit)",
                            "A browser extension"
                        ],
                        "correctAnswer": 2,
                        "hints": [
                            {
                                "step": 1,
                                "hint": "Think about which package contains the 'javac' compiler."
                            }
                        ],
                        "explanation": "You must install the JDK because it contains the javac compiler. The JRE and JVM only run already-compiled programs.",
                        "difficulty": "easy",
                        "estimatedSeconds": 30
                    }
                ]
            },
            {
                "id": "act-trio-practice",
                "orderIndex": 4,
                "type": "interactive_sandbox",
                "title": "Hands-on Practice: Architecture Summary",
                "practice": {
                    "title": "Three Layers Assignment",
                    "problemStatement": "Write a Java program that outputs: 'JDK contains JRE, and JRE contains JVM.' to standard output.",
                    "requirements": [
                        "Class name must be 'Main'",
                        "Include standard entry point: public static void main(String[] args)",
                        "Output must exactly match: JDK contains JRE, and JRE contains JVM."
                    ],
                    "initialCode": "public class Main {\n    public static void main(String[] args) {\n        // TODO: Print the architecture relationship\n        System.out.println(\"JDK contains JRE, and JRE contains JVM.\");\n    }\n}",
                    "expectedOutput": "JDK contains JRE, and JRE contains JVM.",
                    "hints": [
                        "Check capitalization of JDK, JRE, and JVM.",
                        "Include the comma and period as required."
                    ]
                }
            },
            {
                "id": "act-trio-interview",
                "orderIndex": 5,
                "type": "interview_qa",
                "title": "Placement Interview Q&A",
                "interviewQA": [
                    {
                        "id": "int-trio-1",
                        "question": "What is the difference between JDK, JRE, and JVM?",
                        "companyTags": ["Infosys", "Wipro", "TCS", "Accenture"],
                        "expectedAnswer": "JVM (Java Virtual Machine) is the abstract computing machine that executes bytecode and provides memory management. JRE (Java Runtime Environment) is the software package containing the JVM plus standard runtime libraries needed to run applications. JDK (Java Development Kit) is the full developer kit containing the JRE plus tools like javac (compiler) and jdb (debugger). In short: JDK = JRE + Tools, and JRE = JVM + Libraries.",
                        "keyPoints": [
                            "JVM is the execution engine",
                            "JRE is runtime environment for end users",
                            "JDK is complete kit for developers containing javac"
                        ],
                        "commonMistakes": [
                            "Thinking JRE includes the compiler"
                        ]
                    }
                ]
            },
            {
                "id": "act-trio-checklist",
                "orderIndex": 6,
                "type": "self_evaluation",
                "title": "Confidence Checklist",
                "checklist": [
                    "I can draw the nested relationship: JDK > JRE > JVM.",
                    "I know that javac lives inside the JDK.",
                    "I know that JVM executes bytecode and manages memory."
                ]
            }
        ]
    },
    {
        "id": "les-getting-started-installing-java-and-running-your-first-program",
        "primarySlug": "installing-java-and-running-your-first-program",
        "aliasSlugs": ["installing-java-and-setting-up-ide"],
        "title": "Installing Java & Running Your First Program",
        "summary": "Step-by-step setup guide for modern Java (OpenJDK 21 LTS), verifying your PATH, and running code in an IDE.",
        "difficulty": "beginner",
        "estimatedMinutes": 15,
        "prerequisites": ["les-getting-started-jdk-jre-and-jvm"],
        "learningObjectives": [
            "Understand why enterprises prefer LTS (Long Term Support) releases like Java 21",
            "Know what JAVA_HOME and system PATH variables do",
            "Verify a working Java installation from your computer's terminal"
        ],
        "expectedOutcomes": [
            "Confidence setting up and verifying a working Java development environment on any laptop"
        ],
        "activities": [
            {
                "id": "act-setup-breakdown",
                "orderIndex": 1,
                "type": "concept",
                "title": "Installing Java & Setting Up Your Environment",
                "outputSnippet": "Java Environment is Ready & Verified!",
                "breakdown": {
                    "whatIsIt": "Setting up Java means downloading OpenJDK, setting the JAVA_HOME environment variable, and adding Java's bin folder to your computer's PATH so commands work from any terminal.",
                    "whyItMatters": "Without proper setup, your terminal displays ''javac' is not recognized as an internal or external command'. Knowing how PATH works removes all frustration.",
                    "howItWorks": [
                        "Download OpenJDK 21 LTS (Eclipse Temurin is free, open source, and industry standard).",
                        "Set JAVA_HOME to point to your JDK folder (e.g. C:\\Program Files\\Eclipse Adoptium\\jdk-21).",
                        "Add %JAVA_HOME%\\bin to your system PATH so terminal commands like javac and java work from anywhere.",
                        "Verify by running: javac -version and java -version."
                    ],
                    "keyTakeaways": [
                        "Always choose an LTS (Long Term Support) release like Java 21",
                        "PATH allows your terminal to find javac from any folder",
                        "javac -version verifies your setup is successful"
                    ]
                }
            },
            {
                "id": "act-setup-code",
                "orderIndex": 2,
                "type": "code_walkthrough",
                "title": "Environment Verification Code",
                "codeSnippet": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Java Environment is Ready & Verified!\");\n    }\n}",
                "description": "Running this program in your IDE (VS Code or IntelliJ IDEA) confirms that your editor has successfully connected to your installed JDK."
            },
            {
                "id": "act-setup-mcq",
                "orderIndex": 3,
                "type": "mcq",
                "title": "Terminal Verification Check",
                "questions": [
                    {
                        "id": "q-setup-verify",
                        "type": "mcq",
                        "prompt": "What command checks that the Java compiler is correctly installed and ready in your terminal?",
                        "options": [
                            "javac -version",
                            "java --run",
                            "check java",
                            "compile -test"
                        ],
                        "correctAnswer": 0,
                        "hints": [
                            {
                                "step": 1,
                                "hint": "The Java compiler command is 'javac'."
                            }
                        ],
                        "explanation": "`javac -version` prints the version of the compiler, confirming both that it is installed and present in your system PATH.",
                        "difficulty": "easy",
                        "estimatedSeconds": 30
                    }
                ]
            },
            {
                "id": "act-setup-practice",
                "orderIndex": 4,
                "type": "interactive_sandbox",
                "title": "Hands-on Practice: Environment Confirmation",
                "practice": {
                    "title": "Environment Setup Assignment",
                    "problemStatement": "Write a Java program that outputs: 'Java Environment is Ready & Verified!' to standard output.",
                    "requirements": [
                        "Class name must be 'Main'",
                        "Include standard entry point: public static void main(String[] args)",
                        "Output must exactly match: Java Environment is Ready & Verified!"
                    ],
                    "initialCode": "public class Main {\n    public static void main(String[] args) {\n        // TODO: Print the verification text\n        System.out.println(\"Java Environment is Ready & Verified!\");\n    }\n}",
                    "expectedOutput": "Java Environment is Ready & Verified!",
                    "hints": [
                        "Match capitalization and punctuation exactly.",
                        "Ensure the statement ends with a semicolon."
                    ]
                }
            },
            {
                "id": "act-setup-interview",
                "orderIndex": 5,
                "type": "interview_qa",
                "title": "Placement Interview Q&A",
                "interviewQA": [
                    {
                        "id": "int-setup-1",
                        "question": "What is the purpose of setting the JAVA_HOME environment variable?",
                        "companyTags": ["Amazon", "TCS", "Accenture"],
                        "expectedAnswer": "JAVA_HOME is a standardized environment variable that points to the installation root directory of the JDK. Build tools like Maven, Gradle, and servers like Tomcat look for JAVA_HOME to locate the Java compiler and runtime without hardcoding system paths.",
                        "keyPoints": [
                            "Points to the JDK installation root directory",
                            "Used by build tools (Maven, Gradle) and IDEs to find Java",
                            "Enables clean switching between multiple installed Java versions"
                        ],
                        "commonMistakes": [
                            "Setting JAVA_HOME to point to the bin folder instead of the root directory"
                        ]
                    }
                ]
            },
            {
                "id": "act-setup-checklist",
                "orderIndex": 6,
                "type": "self_evaluation",
                "title": "Confidence Checklist",
                "checklist": [
                    "I understand what an LTS release means for stability.",
                    "I know how JAVA_HOME and PATH help the computer find Java commands.",
                    "I can run javac -version and java -version in my terminal."
                ]
            }
        ]
    },
    {
        "id": "les-getting-started-understanding-your-first-java-program",
        "primarySlug": "understanding-your-first-java-program",
        "aliasSlugs": ["your-first-java-program"],
        "title": "Understanding Your First Java Program",
        "summary": "Dissect your first milestone program line by line: understand classes, methods, and console output.",
        "difficulty": "beginner",
        "estimatedMinutes": 15,
        "prerequisites": ["les-getting-started-installing-java-and-running-your-first-program"],
        "learningObjectives": [
            "Deconstruct a complete Java class and main method",
            "Understand why the file name must match the public class name",
            "Differentiate System.out.println from System.out.print"
        ],
        "expectedOutcomes": [
            "Ability to read, write, and explain a basic Java program without memorization"
        ],
        "activities": [
            {
                "id": "act-ufp-breakdown",
                "orderIndex": 1,
                "type": "concept",
                "title": "Understanding Your First Java Program",
                "outputSnippet": "Hello, World! I can write Java.",
                "breakdown": {
                    "whatIsIt": "A basic Java program is composed of a class container, a main method entry point, and execution statements enclosed in curly braces.",
                    "whyItMatters": "Beginners often feel intimidated by the syntax. Once you realize every word has a single clear purpose, writing Java code becomes straightforward.",
                    "howItWorks": [
                        "public class Main: In Java, all code lives inside a class (a container). The file must be named Main.java.",
                        "public static void main(String[] args): The standardized entry point where the JVM begins execution.",
                        "System.out.println(\"...\"): Sends text to standard output (your console) and jumps to the next line.",
                        "Curly braces { }: Enclose the body of the class and the method. Every { must have a matching }."
                    ],
                    "keyTakeaways": [
                        "All Java code lives inside a class",
                        "The file name must match the public class name (Main.java)",
                        "System.out.println() prints text and moves to the next line"
                    ]
                }
            },
            {
                "id": "act-ufp-code",
                "orderIndex": 2,
                "type": "code_walkthrough",
                "title": "The Classic First Milestone",
                "codeSnippet": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello, World! I can write Java.\");\n    }\n}",
                "description": "Notice: 1. public class Main matches Main.java. 2. main() is where execution begins. 3. System.out.println prints our text string to the terminal."
            },
            {
                "id": "act-ufp-mcq",
                "orderIndex": 3,
                "type": "mcq",
                "title": "Naming Rule Check",
                "questions": [
                    {
                        "id": "q-ufp-filename",
                        "type": "mcq",
                        "prompt": "If a Java source file has 'public class Welcome', what MUST the file name be on disk?",
                        "options": [
                            "welcome.java (lowercase)",
                            "Welcome.java (exact match with capital W)",
                            "Main.java",
                            "Any name you choose"
                        ],
                        "correctAnswer": 1,
                        "hints": [
                            {
                                "step": 1,
                                "hint": "Java is case-sensitive, and the public class name must match the file name."
                            }
                        ],
                        "explanation": "In Java, a public class name and its file name must match exactly, including letter casing (`Welcome.java`).",
                        "difficulty": "easy",
                        "estimatedSeconds": 30
                    }
                ]
            },
            {
                "id": "act-ufp-practice",
                "orderIndex": 4,
                "type": "interactive_sandbox",
                "title": "Hands-on Practice: Write Your Milestone Program",
                "practice": {
                    "title": "First Program Milestone Assignment",
                    "problemStatement": "Write a complete Java program that prints: 'Hello, World! I can write Java.' to standard output.",
                    "requirements": [
                        "Class name must be 'Main'",
                        "Include standard entry point: public static void main(String[] args)",
                        "Output must exactly match: Hello, World! I can write Java."
                    ],
                    "initialCode": "public class Main {\n    public static void main(String[] args) {\n        // TODO: Print the milestone message below\n        System.out.println(\"Hello, World! I can write Java.\");\n    }\n}",
                    "expectedOutput": "Hello, World! I can write Java.",
                    "hints": [
                        "Remember double quotes for string literals.",
                        "End your statement with a semicolon (;)."
                    ]
                }
            },
            {
                "id": "act-ufp-interview",
                "orderIndex": 5,
                "type": "interview_qa",
                "title": "Placement Interview Q&A",
                "interviewQA": [
                    {
                        "id": "int-ufp-1",
                        "question": "What is the difference between System.out.println() and System.out.print()?",
                        "companyTags": ["TCS", "Cognizant", "Wipro"],
                        "expectedAnswer": "System.out.print() outputs the text and leaves the console cursor on the exact same line. System.out.println() outputs the text and automatically appends a newline character, moving the cursor to the beginning of the next line.",
                        "keyPoints": [
                            "print() stays on the same line",
                            "println() appends a newline character (\\n)",
                            "Both write to standard output stream (System.out)"
                        ],
                        "commonMistakes": [
                            "Thinking print() cannot output text strings"
                        ]
                    }
                ]
            },
            {
                "id": "act-ufp-checklist",
                "orderIndex": 6,
                "type": "self_evaluation",
                "title": "Confidence Checklist",
                "checklist": [
                    "I can type a complete working Java program from scratch.",
                    "I know why the file name must match the class name.",
                    "I understand the difference between print() and println()."
                ]
            }
        ]
    },
    {
        "id": "les-getting-started-understanding-main",
        "primarySlug": "understanding-main",
        "aliasSlugs": ["main-method-explained"],
        "title": "Understanding main()",
        "summary": "Every single keyword in public static void main(String[] args) explained in plain English so you never have to memorize it blindly.",
        "difficulty": "beginner",
        "estimatedMinutes": 15,
        "prerequisites": ["les-getting-started-understanding-your-first-java-program"],
        "learningObjectives": [
            "Deconstruct public, static, void, main, and String[] args",
            "Explain why static is required before any object exists in memory",
            "Know that main() can be overloaded"
        ],
        "expectedOutcomes": [
            "Complete clarity on why the Java entry point is designed exactly this way"
        ],
        "activities": [
            {
                "id": "act-main-breakdown",
                "orderIndex": 1,
                "type": "concept",
                "title": "Understanding main(): Every Single Keyword",
                "outputSnippet": "main is public, static, and void.",
                "breakdown": {
                    "whatIsIt": "public static void main(String[] args) is the universal front door that the JVM searches for to start running your Java program.",
                    "whyItMatters": "Interviewers frequently ask why main is static or what String[] args does. Understanding each keyword removes all confusion.",
                    "howItWorks": [
                        "public: Access modifier. Allows the JVM (which lives outside your class package) permission to call this method.",
                        "static: Can be executed without creating an object. When your program starts, zero objects exist in memory! static lets the JVM run main directly.",
                        "void: Return type. The method does not return any value to the operating system when it finishes.",
                        "main: The standardized name the JVM is programmed to search for as the entry point.",
                        "String[] args: Command-line arguments. An array of text arguments passed from the terminal when launching."
                    ],
                    "keyTakeaways": [
                        "public gives JVM permission to call it",
                        "static allows execution before any object is created",
                        "void means no return value",
                        "String[] args receives terminal arguments"
                    ]
                }
            },
            {
                "id": "act-main-code",
                "orderIndex": 2,
                "type": "code_walkthrough",
                "title": "The Entry Point In Action",
                "codeSnippet": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"main is public, static, and void.\");\n    }\n}",
                "description": "Notice how all five keywords fit together to create the entry gateway recognized by the JVM."
            },
            {
                "id": "act-main-mcq",
                "orderIndex": 3,
                "type": "mcq",
                "title": "The 'static' Keyword Check",
                "questions": [
                    {
                        "id": "q-main-static-check",
                        "type": "mcq",
                        "prompt": "Why MUST the main() method be declared as static in Java?",
                        "options": [
                            "So the JVM can invoke it without needing to create an object of the class first",
                            "To make the computer CPU run 10 times faster",
                            "To prevent other classes from calling it",
                            "Because Java does not allow non-static methods inside classes"
                        ],
                        "correctAnswer": 0,
                        "hints": [
                            {
                                "step": 1,
                                "hint": "Think about whether any object exists at the very instant a program starts."
                            }
                        ],
                        "explanation": "Before a program begins executing, no objects have been created in memory. If main() were non-static, the JVM would have to create an object first, but wouldn't know how to construct it.",
                        "difficulty": "easy",
                        "estimatedSeconds": 40
                    }
                ]
            },
            {
                "id": "act-main-practice",
                "orderIndex": 4,
                "type": "interactive_sandbox",
                "title": "Hands-on Practice: Entry Point Summary",
                "practice": {
                    "title": "Main Method Assignment",
                    "problemStatement": "Write a complete Java program that prints: 'main is public, static, and void.' to standard output.",
                    "requirements": [
                        "Class name must be 'Main'",
                        "Include standard entry point: public static void main(String[] args)",
                        "Output must exactly match: main is public, static, and void."
                    ],
                    "initialCode": "public class Main {\n    public static void main(String[] args) {\n        // TODO: Print the main method summary\n        System.out.println(\"main is public, static, and void.\");\n    }\n}",
                    "expectedOutput": "main is public, static, and void.",
                    "hints": [
                        "Check spelling and commas carefully.",
                        "Ensure the statement ends with a semicolon."
                    ]
                }
            },
            {
                "id": "act-main-interview",
                "orderIndex": 5,
                "type": "interview_qa",
                "title": "Placement Interview Q&A",
                "interviewQA": [
                    {
                        "id": "int-main-1",
                        "question": "Can we overload the main() method in Java?",
                        "companyTags": ["Amazon", "TCS", "Infosys", "Cognizant"],
                        "expectedAnswer": "Yes, we can overload the main method by defining other methods named 'main' with different parameter types (e.g. main(int n) or main(String s)). However, the JVM will always call public static void main(String[] args) as the official program entry point. Other overloaded main methods will only run if called explicitly from code.",
                        "keyPoints": [
                            "Yes, main can be overloaded like any other Java method",
                            "JVM specifically looks for the (String[] args) signature as the launch point",
                            "Overloaded versions only run if called manually"
                        ],
                        "commonMistakes": [
                            "Saying 'No' because main is special"
                        ]
                    }
                ]
            },
            {
                "id": "act-main-checklist",
                "orderIndex": 6,
                "type": "self_evaluation",
                "title": "Confidence Checklist",
                "checklist": [
                    "I can explain what public, static, void, main, and args each mean.",
                    "I know why static is required before any object exists.",
                    "I understand that main() can be overloaded."
                ]
            }
        ]
    },
    {
        "id": "les-getting-started-from-java-to-class-to-running-the-program",
        "primarySlug": "from-java-to-class-to-running-the-program",
        "aliasSlugs": ["compilation-bytecode-execution"],
        "title": "From .java → .class → Running the Program",
        "summary": "Follow the journey of code from human-readable text to compiled bytecode to live CPU execution.",
        "difficulty": "beginner",
        "estimatedMinutes": 15,
        "prerequisites": ["les-getting-started-understanding-main"],
        "learningObjectives": [
            "Trace the 3 steps: source code (.java) -> compiler (javac) -> bytecode (.class) -> JVM (java)",
            "Differentiate compile-time errors from runtime errors",
            "Know the correct terminal commands to compile and execute"
        ],
        "expectedOutcomes": [
            "Clear mental model of the translation from human thinking to physical computer execution"
        ],
        "activities": [
            {
                "id": "act-cbe-breakdown",
                "orderIndex": 1,
                "type": "concept",
                "title": "From .java → .class → Running the Program",
                "outputSnippet": "Step 1: Code -> Step 2: javac -> Step 3: java",
                "breakdown": {
                    "whatIsIt": "The lifecycle of a Java program consists of two distinct phases: Compile-time (performed by javac) and Runtime (performed by the JVM).",
                    "whyItMatters": "When your code fails, knowing whether it failed during compilation or runtime tells you immediately whether it's a syntax mistake or a logical runtime error.",
                    "howItWorks": [
                        "Step 1 (Source Code): You write instructions in Main.java.",
                        "Step 2 (Compilation): You run 'javac Main.java'. The compiler checks syntax. If clean, it generates Main.class containing Bytecode.",
                        "Step 3 (Execution): You run 'java Main'. The JVM loads Main.class, verifies security, and executes instructions on your processor."
                    ],
                    "keyTakeaways": [
                        "javac Main.java compiles code and creates Main.class",
                        "java Main executes the class using the JVM",
                        "Do not add .class when running with java command"
                    ]
                }
            },
            {
                "id": "act-cbe-code",
                "orderIndex": 2,
                "type": "code_walkthrough",
                "title": "The 3-Step Lifecycle Code",
                "codeSnippet": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Step 1: Code -> Step 2: javac -> Step 3: java\");\n    }\n}",
                "description": "This program prints the three major phases of code execution from human text to CPU instructions."
            },
            {
                "id": "act-cbe-mcq",
                "orderIndex": 3,
                "type": "mcq",
                "title": "Command Line Execution Check",
                "questions": [
                    {
                        "id": "q-cbe-syntax",
                        "type": "mcq",
                        "prompt": "You compiled 'Program.java' using 'javac Program.java'. What command do you run to execute it?",
                        "options": [
                            "java Program",
                            "java Program.class",
                            "run Program.java",
                            "javac Program"
                        ],
                        "correctAnswer": 0,
                        "hints": [
                            {
                                "step": 1,
                                "hint": "The java command takes a class name, not a file path extension."
                            }
                        ],
                        "explanation": "You use `java Program` without any extension. The java command searches for a class named `Program`.",
                        "difficulty": "easy",
                        "estimatedSeconds": 30
                    }
                ]
            },
            {
                "id": "act-cbe-practice",
                "orderIndex": 4,
                "type": "interactive_sandbox",
                "title": "Hands-on Practice: Execution Sequence",
                "practice": {
                    "title": "Execution Pipeline Assignment",
                    "problemStatement": "Write a Java program that outputs: 'Step 1: Code -> Step 2: javac -> Step 3: java' to standard output.",
                    "requirements": [
                        "Class name must be 'Main'",
                        "Include standard entry point: public static void main(String[] args)",
                        "Output must exactly match: Step 1: Code -> Step 2: javac -> Step 3: java"
                    ],
                    "initialCode": "public class Main {\n    public static void main(String[] args) {\n        // TODO: Print the execution steps\n        System.out.println(\"Step 1: Code -> Step 2: javac -> Step 3: java\");\n    }\n}",
                    "expectedOutput": "Step 1: Code -> Step 2: javac -> Step 3: java",
                    "hints": [
                        "Include the arrows '->' and colons as shown.",
                        "Verify matching double quotes."
                    ]
                }
            },
            {
                "id": "act-cbe-interview",
                "orderIndex": 5,
                "type": "interview_qa",
                "title": "Placement Interview Q&A",
                "interviewQA": [
                    {
                        "id": "int-cbe-1",
                        "question": "Is Java an interpreted or a compiled language?",
                        "companyTags": ["Amazon", "TCS", "Microsoft", "Wipro"],
                        "expectedAnswer": "Java is both compiled and interpreted. First, the javac compiler turns human source code into platform-independent Bytecode (.class). Second, the JVM starts executing that bytecode by interpreting it. As the program runs, the JIT (Just-In-Time) compiler detects frequently executed code sections ('hot spots') and compiles them directly into native machine code for maximum speed.",
                        "keyPoints": [
                            "javac compiles source to bytecode",
                            "JVM interprets bytecode initially",
                            "JIT compiler translates hot spots into native machine code at runtime"
                        ],
                        "commonMistakes": [
                            "Saying Java is purely interpreted like Python"
                        ]
                    }
                ]
            },
            {
                "id": "act-cbe-checklist",
                "orderIndex": 6,
                "type": "self_evaluation",
                "title": "Confidence Checklist",
                "checklist": [
                    "I know the 3 steps: .java -> javac -> .class -> java.",
                    "I understand that java command expects a class name without .class extension.",
                    "I know that Java uses both compilation and JIT interpretation."
                ]
            }
        ]
    },
    {
        "id": "les-getting-started-java-program-structure-and-basic-syntax",
        "primarySlug": "java-program-structure-and-basic-syntax",
        "aliasSlugs": ["java-program-structure"],
        "title": "Java Program Structure & Basic Syntax",
        "summary": "Master the structural skeleton of Java: matching curly braces { }, semicolons ;, case-sensitivity, and indentation.",
        "difficulty": "beginner",
        "estimatedMinutes": 15,
        "prerequisites": ["les-getting-started-from-java-to-class-to-running-the-program"],
        "learningObjectives": [
            "Master the 4 golden syntax rules of Java",
            "Keep curly braces { } perfectly balanced",
            "Avoid common beginner mistakes like missing semicolons or case errors"
        ],
        "expectedOutcomes": [
            "Ability to format clean, error-free Java code blocks"
        ],
        "activities": [
            {
                "id": "act-struct-breakdown",
                "orderIndex": 1,
                "type": "concept",
                "title": "Java Program Structure & Basic Syntax",
                "outputSnippet": "Rule 1: Match your braces.",
                "breakdown": {
                    "whatIsIt": "Basic syntax refers to the grammar rules of Java: semicolons to terminate statements, curly braces to define blocks, and strict case-sensitivity.",
                    "whyItMatters": "Over 80% of beginner errors are simple syntax mistakes: forgetting a semicolon, writing lowercase 'system', or missing a closing brace. Mastering these rules prevents hours of frustration.",
                    "howItWorks": [
                        "Case-Sensitivity: Java treats uppercase and lowercase letters as completely different. 'System' works; 'system' produces an error.",
                        "Curly Braces { }: Group instructions into blocks. Every opening brace { must have a matching closing brace }.",
                        "Semicolons ;: Every executable statement must end with a semicolon. It tells Java 'this instruction is complete'.",
                        "Indentation: Indenting code 4 spaces inside blocks doesn't change execution, but makes your code clean and easy to scan."
                    ],
                    "keyTakeaways": [
                        "Java is strictly case-sensitive",
                        "Every statement ends with a semicolon (;)",
                        "Every opening brace { must have a matching closing brace }"
                    ]
                }
            },
            {
                "id": "act-struct-code",
                "orderIndex": 2,
                "type": "code_walkthrough",
                "title": "Clean Syntax Example",
                "codeSnippet": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Rule 1: Match your braces.\");\n    }\n}",
                "description": "Notice: 1. Class block starts at line 1 and ends at line 5. 2. Main method block starts at line 2 and ends at line 4. 3. Semicolon terminates the println instruction on line 3."
            },
            {
                "id": "act-struct-mcq",
                "orderIndex": 3,
                "type": "mcq",
                "title": "Syntax Rules Check",
                "questions": [
                    {
                        "id": "q-struct-case",
                        "type": "mcq",
                        "prompt": "What happens if you type 'system.out.println(\"Hi\");' with a lowercase 's'?",
                        "options": [
                            "Java gives a compilation error: 'cannot find symbol: package system'",
                            "Java automatically corrects it to uppercase System",
                            "The program runs normally without warnings",
                            "The computer shuts down"
                        ],
                        "correctAnswer": 0,
                        "hints": [
                            {
                                "step": 1,
                                "hint": "Java is strictly case-sensitive."
                            }
                        ],
                        "explanation": "Java is strictly case-sensitive. The standard library class is named `System` with a capital 'S'. Lowercase `system` is not recognized by the compiler.",
                        "difficulty": "easy",
                        "estimatedSeconds": 30
                    }
                ]
            },
            {
                "id": "act-struct-practice",
                "orderIndex": 4,
                "type": "interactive_sandbox",
                "title": "Hands-on Practice: Structure & Braces",
                "practice": {
                    "title": "Syntax Rules Assignment",
                    "problemStatement": "Write a clean Java program that outputs: 'Rule 1: Match your braces.' to standard output.",
                    "requirements": [
                        "Class name must be 'Main'",
                        "Include standard entry point: public static void main(String[] args)",
                        "Output must exactly match: Rule 1: Match your braces."
                    ],
                    "initialCode": "public class Main {\n    public static void main(String[] args) {\n        // TODO: Print the syntax rule below\n        System.out.println(\"Rule 1: Match your braces.\");\n    }\n}",
                    "expectedOutput": "Rule 1: Match your braces.",
                    "hints": [
                        "Ensure all curly braces { } are balanced.",
                        "End the println statement with a semicolon."
                    ]
                }
            },
            {
                "id": "act-struct-interview",
                "orderIndex": 5,
                "type": "interview_qa",
                "title": "Placement Interview Q&A",
                "interviewQA": [
                    {
                        "id": "int-struct-1",
                        "question": "What is a code block in Java and how does it affect variable scope?",
                        "companyTags": ["Infosys", "Wipro", "TCS"],
                        "expectedAnswer": "A code block in Java is a sequence of zero or more statements enclosed between balanced curly braces {}. Code blocks define the scope and lifetime of variables: any variable declared inside a block exists only while that block is executing and cannot be accessed outside of it.",
                        "keyPoints": [
                            "Code blocks are demarcated by { and }",
                            "Variables declared inside a block are scoped strictly to that block",
                            "Helps prevent accidental variable naming collisions and memory leaks"
                        ],
                        "commonMistakes": [
                            "Thinking variables declared inside a method can be accessed across other methods"
                        ]
                    }
                ]
            },
            {
                "id": "act-struct-checklist",
                "orderIndex": 6,
                "type": "self_evaluation",
                "title": "Confidence Checklist",
                "checklist": [
                    "I understand Java's case-sensitivity rules.",
                    "I know that every statement ends with a semicolon (;).",
                    "I can keep my curly braces { } properly balanced."
                ]
            }
        ]
    },
    {
        "id": "les-getting-started-comments-naming-and-clean-java-code",
        "primarySlug": "comments-naming-and-clean-java-code",
        "aliasSlugs": ["comments-and-documentation"],
        "title": "Comments, Naming & Clean Java Code",
        "summary": "Learn single-line and multi-line comments, naming conventions (PascalCase vs camelCase), and self-documenting code.",
        "difficulty": "beginner",
        "estimatedMinutes": 15,
        "prerequisites": ["les-getting-started-java-program-structure-and-basic-syntax"],
        "learningObjectives": [
            "Use single-line (//) and multi-line (/* */) comments appropriately",
            "Apply PascalCase to class names and camelCase to methods/variables",
            "Understand that comments have zero impact on program execution speed"
        ],
        "expectedOutcomes": [
            "Ability to write clean, professional, and self-documenting Java code"
        ],
        "activities": [
            {
                "id": "act-comm-breakdown",
                "orderIndex": 1,
                "type": "concept",
                "title": "Comments, Naming & Clean Java Code",
                "outputSnippet": "Clean code is easy to read and maintain.",
                "breakdown": {
                    "whatIsIt": "Comments are notes written in code for human developers. The Java compiler ignores them completely. Naming conventions are agreed-upon rules for capitalizing classes, methods, and variables.",
                    "whyItMatters": "In software companies, code is read 10 times more often than it is written. Clean naming and helpful comments make code easy to understand, review, and maintain.",
                    "howItWorks": [
                        "Single-line comments (//): Everything after // on that line is ignored by Java.",
                        "Multi-line comments (/* ... */): Useful for longer explanations spanning several lines.",
                        "Class Naming: Use PascalCase (e.g. StudentProfile, Main). Starts with a Capital letter.",
                        "Method & Variable Naming: Use camelCase (e.g. calculateTotal, studentName). Starts with lowercase.",
                        "Performance: Comments do NOT slow down your program; javac strips them completely when creating .class files."
                    ],
                    "keyTakeaways": [
                        "Use // for quick notes and /* */ for blocks",
                        "Class names start with an uppercase letter (PascalCase)",
                        "Comments have zero impact on program runtime speed"
                    ]
                }
            },
            {
                "id": "act-comm-code",
                "orderIndex": 2,
                "type": "code_walkthrough",
                "title": "Clean Commented Code",
                "codeSnippet": "// Lesson 9: Clean Code Example\npublic class Main {\n    public static void main(String[] args) {\n        // Print a clean message\n        System.out.println(\"Clean code is easy to read and maintain.\");\n    }\n}",
                "description": "Notice how the comments explain the developer's intent cleanly without cluttering the screen."
            },
            {
                "id": "act-comm-mcq",
                "orderIndex": 3,
                "type": "mcq",
                "title": "Naming Convention Check",
                "questions": [
                    {
                        "id": "q-comm-naming",
                        "type": "mcq",
                        "prompt": "Which of the following follows the standard Java naming convention for a class name?",
                        "options": [
                            "student_profile",
                            "StudentProfile",
                            "studentProfile",
                            "STUDENTPROFILE"
                        ],
                        "correctAnswer": 1,
                        "hints": [
                            {
                                "step": 1,
                                "hint": "Java classes use PascalCase (starts with a capital letter)."
                            }
                        ],
                        "explanation": "Java classes follow the PascalCase convention, where each word begins with a capital letter (e.g. `StudentProfile`).",
                        "difficulty": "easy",
                        "estimatedSeconds": 30
                    }
                ]
            },
            {
                "id": "act-comm-practice",
                "orderIndex": 4,
                "type": "interactive_sandbox",
                "title": "Hands-on Practice: Clean Commented Program",
                "practice": {
                    "title": "Clean Code Assignment",
                    "problemStatement": "Write a clean Java program that includes a comment and outputs: 'Clean code is easy to read and maintain.' to standard output.",
                    "requirements": [
                        "Class name must be 'Main'",
                        "Include standard entry point: public static void main(String[] args)",
                        "Include at least one comment in your code",
                        "Output must exactly match: Clean code is easy to read and maintain."
                    ],
                    "initialCode": "public class Main {\n    // Main entry point\n    public static void main(String[] args) {\n        // TODO: Print the clean code message below\n        System.out.println(\"Clean code is easy to read and maintain.\");\n    }\n}",
                    "expectedOutput": "Clean code is easy to read and maintain.",
                    "hints": [
                        "Comments start with // on any line.",
                        "Ensure the string matches the requirements exactly."
                    ]
                }
            },
            {
                "id": "act-comm-interview",
                "orderIndex": 5,
                "type": "interview_qa",
                "title": "Placement Interview Q&A",
                "interviewQA": [
                    {
                        "id": "int-comm-1",
                        "question": "Does adding thousands of lines of comments slow down a Java program at runtime?",
                        "companyTags": ["Amazon", "Oracle", "Cognizant"],
                        "expectedAnswer": "No, comments have zero impact on runtime performance. During the compilation step, javac completely strips out all comments when producing the .class bytecode. The resulting bytecode file contains only executable instructions, so runtime speed is 100% identical.",
                        "keyPoints": [
                            "Comments exist solely in .java source files",
                            "javac strips all comments during compilation",
                            "Runtime execution speed and memory are 100% unaffected"
                        ],
                        "commonMistakes": [
                            "Thinking comments are loaded into memory by the JVM"
                        ]
                    }
                ]
            },
            {
                "id": "act-comm-checklist",
                "orderIndex": 6,
                "type": "self_evaluation",
                "title": "Confidence Checklist",
                "checklist": [
                    "I know when to use // and /* */.",
                    "I follow PascalCase for class names and camelCase for methods.",
                    "I understand that comments are removed by the compiler."
                ]
            }
        ]
    },
    {
        "id": "les-getting-started-guided-practice-and-first-debugging-challenge",
        "primarySlug": "guided-practice-and-first-debugging-challenge",
        "aliasSlugs": ["guided-practice-plus-first-bug-hunt"],
        "title": "Guided Practice + First Debugging Challenge",
        "summary": "Step into the shoes of a real software engineer: read compiler error messages, find syntax bugs, and fix them with confidence.",
        "difficulty": "beginner",
        "estimatedMinutes": 20,
        "prerequisites": ["les-getting-started-comments-naming-and-clean-java-code"],
        "learningObjectives": [
            "Decode the 3 most common beginner compiler error messages",
            "Systematically locate missing semicolons, case errors, and unclosed braces",
            "Complete the Module 01 debugging challenge with zero errors"
        ],
        "expectedOutcomes": [
            "Confident debugging mindset: treating error messages as friendly guides rather than roadblocks"
        ],
        "activities": [
            {
                "id": "act-bug-breakdown",
                "orderIndex": 1,
                "type": "concept",
                "title": "Guided Practice + First Debugging Challenge",
                "outputSnippet": "Congratulations! You completed Module 01!",
                "breakdown": {
                    "whatIsIt": "Debugging is the process of finding and fixing mistakes in your code. Compiler errors are not failures—they are free automated reviews that tell you the exact line number of your mistake.",
                    "whyItMatters": "Every developer writes bugs daily. Great developers know how to read compiler messages calmly and fix them step by step.",
                    "howItWorks": [
                        "Bug 1 ('cannot find symbol'): Check letter casing! Java knows 'System', but not 'system'.",
                        "Bug 2 (';' expected): Check the indicated line or the line right above it for a forgotten semicolon.",
                        "Bug 3 ('reached end of file while parsing'): You opened a curly brace { but forgot to close it with } at the bottom of the file."
                    ],
                    "keyTakeaways": [
                        "Error messages tell you the exact file and line number",
                        "Check case sensitivity, semicolons, and curly braces first",
                        "You are now ready to tackle variables and data types in Module 02!"
                    ]
                }
            },
            {
                "id": "act-bug-code",
                "orderIndex": 2,
                "type": "code_walkthrough",
                "title": "Bug-Free Victory Code",
                "codeSnippet": "public class Main {\n    public static void main(String[] args) {\n        // Clean, bug-free output:\n        System.out.println(\"Congratulations! You completed Module 01!\");\n    }\n}",
                "description": "Here is the cleanly fixed code with capitalized System, balanced braces, and a terminating semicolon."
            },
            {
                "id": "act-bug-mcq",
                "orderIndex": 3,
                "type": "mcq",
                "title": "Compiler Error Diagnosis",
                "questions": [
                    {
                        "id": "q-bug-semi",
                        "type": "mcq",
                        "prompt": "If javac shows 'error: ';' expected' pointing to line 4, what is the best first step?",
                        "options": [
                            "Delete the entire file and start over",
                            "Check the end of line 4 (or line 3) for a missing semicolon (;)",
                            "Reinstall the Java JDK",
                            "Change the class name to Calculator"
                        ],
                        "correctAnswer": 1,
                        "hints": [
                            {
                                "step": 1,
                                "hint": "The error message tells you exactly what character was expected."
                            }
                        ],
                        "explanation": "Look directly at the indicated line or the line right above it; you almost certainly forgot a semicolon at the end of an instruction.",
                        "difficulty": "easy",
                        "estimatedSeconds": 30
                    }
                ]
            },
            {
                "id": "act-bug-practice",
                "orderIndex": 4,
                "type": "interactive_sandbox",
                "title": "Hands-on Practice: The Module 01 Bug Hunt Challenge",
                "practice": {
                    "title": "The First Bug Hunt Challenge",
                    "problemStatement": "Fix the syntax errors in the starter code below (case-sensitivity typo in system and missing semicolon) so it compiles cleanly and outputs: 'Congratulations! You completed Module 01!'",
                    "requirements": [
                        "Class name must be 'Main'",
                        "Fix the case-sensitivity typo on system",
                        "Add the missing semicolon (;)",
                        "Output must exactly match: Congratulations! You completed Module 01!"
                    ],
                    "initialCode": "public class Main {\n    public static void main(String[] args) {\n        // BUG HUNT: Fix the errors on the line below\n        system.out.println(\"Congratulations! You completed Module 01!\")\n    }\n}",
                    "expectedOutput": "Congratulations! You completed Module 01!",
                    "hints": [
                        "Change lowercase 'system' to uppercase 'System'.",
                        "Add a semicolon (;) at the end of the println call."
                    ]
                }
            },
            {
                "id": "act-bug-interview",
                "orderIndex": 5,
                "type": "interview_qa",
                "title": "Placement Interview Q&A",
                "interviewQA": [
                    {
                        "id": "int-bug-1",
                        "question": "What is the key difference between a compile-time error and a runtime error?",
                        "companyTags": ["TCS", "Infosys", "Wipro", "Cognizant"],
                        "expectedAnswer": "A compile-time error occurs when code violates Java syntax or type rules (e.g. missing semicolon, misspelled class name). It is caught by javac before bytecode is generated. A runtime error occurs while the program is actively executing in the JVM (e.g. dividing by zero, NullPointerException).",
                        "keyPoints": [
                            "Compile-time errors prevent bytecode generation (.class)",
                            "Runtime errors happen during execution by the JVM",
                            "Modern IDEs highlight compile-time errors in real time"
                        ],
                        "commonMistakes": [
                            "Confusing syntax errors (compile-time) with exceptions like NullPointerException (runtime)"
                        ]
                    }
                ]
            },
            {
                "id": "act-bug-checklist",
                "orderIndex": 6,
                "type": "self_evaluation",
                "title": "Module 01 Mastery Complete!",
                "checklist": [
                    "I can read and decode compiler error messages calmly.",
                    "I know how to fix case errors, missing semicolons, and unbalanced braces.",
                    "I have completed Module 01 and am ready for Variables in Module 02!"
                ]
            }
        ]
    }
]

def main():
    print(f"Generating Module 01 complete content in: {GETTING_STARTED_DIR}")
    for item in LESSONS_DATA:
        # Build canonical lesson JSON
        lesson_obj = {
            "id": item["id"],
            "slug": item["primarySlug"],
            "sectionSlug": "basics",
            "moduleSlug": "getting-started",
            "languageSlug": "java",
            "title": item["title"],
            "summary": item["summary"],
            "difficulty": item["difficulty"],
            "estimatedMinutes": item["estimatedMinutes"],
            "prerequisites": item["prerequisites"],
            "learningObjectives": item["learningObjectives"],
            "expectedOutcomes": item["expectedOutcomes"],
            "activities": item["activities"]
        }

        # Save primary slug file
        primary_path = os.path.join(GETTING_STARTED_DIR, f"{item['primarySlug']}.json")
        with open(primary_path, "w", encoding="utf-8") as f:
            json.dump(lesson_obj, f, indent=2)
        print(f" -> Generated primary: {item['primarySlug']}.json")

        # Save all alias slug files
        for alias in item.get("aliasSlugs", []):
            alias_path = os.path.join(GETTING_STARTED_DIR, f"{alias}.json")
            alias_obj = dict(lesson_obj)
            alias_obj["slug"] = alias
            with open(alias_path, "w", encoding="utf-8") as f:
                json.dump(alias_obj, f, indent=2)
            print(f"    -> Saved alias: {alias}.json")

    print("\nModule 01: All 10 lessons generated with primary and alias slugs successfully!")

if __name__ == "__main__":
    main()
