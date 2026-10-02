import json
import os

GETTING_STARTED_DIR = os.path.join(
    os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
    "data", "curriculum", "java", "basics", "getting-started"
)

os.makedirs(GETTING_STARTED_DIR, exist_ok=True)

LESSONS = [
    {
        "id": "les-getting-started-what-is-java",
        "slug": "what-is-java",
        "sectionSlug": "basics",
        "moduleSlug": "getting-started",
        "languageSlug": "java",
        "title": "What is Java & Why Does it Run Everywhere?",
        "summary": "Discover why Java remains the backbone of global enterprise software, the WORA philosophy, and how the JVM solves platform compatibility.",
        "difficulty": "beginner",
        "estimatedMinutes": 15,
        "prerequisites": [],
        "learningObjectives": [
            "Understand the 'Write Once, Run Anywhere' (WORA) design philosophy",
            "Identify why compiled C/C++ code is platform-dependent while Java bytecode is portable",
            "Differentiate source code (.java) from compiled bytecode (.class)",
            "Confidently explain Java platform independence in technical interviews"
        ],
        "expectedOutcomes": [
            "Clear mental model of the translation from human code to bytecode to OS execution"
        ],
        "activities": [
            {
                "id": "act-wij-1",
                "orderIndex": 1,
                "type": "analogy",
                "title": "The Universal Document Analogy",
                "analogy": {
                    "headline": "Why not compile directly to machine code?",
                    "story": "Imagine creating a document in proprietary Windows format that won't open on a Mac or phone. That's how early C/C++ programs worked: you had to recompile completely for every hardware architecture. Java invented PDF for code: you compile to standard universal Bytecode once, and any machine with a certified reader (the JVM) displays and runs it perfectly.",
                    "keyTakeaway": "Source code (.java) compiles into standard bytecode (.class). The JVM installed on Windows, Linux, or Mac executes that bytecode into native CPU instructions."
                }
            },
            {
                "id": "act-wij-2",
                "orderIndex": 2,
                "type": "concept",
                "title": "The Three Pillars: JDK, JRE, and JVM",
                "content": "To write, compile, and run Java programs, you need three software layers:\n\n1. **JVM (Java Virtual Machine)**: The execution engine. It loads bytecode, verifies security, manages memory, and communicates with your CPU.\n2. **JRE (Java Runtime Environment)**: JVM + Core Standard Class Libraries. Needed by users to RUN an already built program.\n3. **JDK (Java Development Kit)**: JRE + Development Utilities (javac compiler, debugger, javadoc). Installed by software engineers."
            },
            {
                "id": "act-wij-3",
                "orderIndex": 3,
                "type": "code_walkthrough",
                "title": "Your First High-Level Look at Java Code",
                "codeSnippet": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Welcome to LearnBySelf!\");\n    }\n}",
                "description": "Notice three primary rules:\n1. In Java, all executable code lives inside a class.\n2. The file name must match the public class name (`Main.java`).\n3. The JVM always starts executing from the `main` method."
            },
            {
                "id": "act-wij-4",
                "orderIndex": 4,
                "type": "mcq",
                "title": "Concept Verification: Platform Independence",
                "questions": [
                    {
                        "id": "q-wij-wora",
                        "type": "mcq",
                        "prompt": "Which component is platform-dependent, and which is platform-independent?",
                        "options": [
                            "Java bytecode is platform-dependent; the JVM is platform-independent",
                            "Java bytecode is platform-independent; the JVM is platform-dependent",
                            "Both bytecode and JVM are platform-independent",
                            "Both bytecode and JVM are platform-dependent"
                        ],
                        "correctAnswer": 1,
                        "hints": [
                            {
                                "step": 1,
                                "hint": "Think about whether you install the same JVM installer on Windows and Mac."
                            },
                            {
                                "step": 2,
                                "hint": "You download different JVM installers for Windows vs Linux, but the .class file is identical."
                            }
                        ],
                        "explanation": "Bytecode (.class) is completely platform-independent (Write Once). But the JVM must be tailored to the underlying OS and CPU architecture (Run Anywhere). Therefore, the JVM itself is platform-dependent.",
                        "difficulty": "easy",
                        "estimatedSeconds": 45
                    },
                    {
                        "id": "q-wij-wora-2",
                        "type": "mcq",
                        "prompt": "What does WORA stand for in Java's philosophy?",
                        "options": [
                            "Write Once, Read Always",
                            "Write Once, Run Anywhere",
                            "Work Online, Run Anywhere",
                            "Windows Operating Runtime Architecture"
                        ],
                        "correctAnswer": 1,
                        "hints": [
                            {
                                "step": 1,
                                "hint": "Focus on Java's core promise of cross-platform portability."
                            }
                        ],
                        "explanation": "WORA stands for 'Write Once, Run Anywhere'. It was coined by Sun Microsystems to illustrate Java's cross-platform benefits.",
                        "difficulty": "easy",
                        "estimatedSeconds": 30
                    }
                ]
            },
            {
                "id": "act-wij-practice",
                "orderIndex": 5,
                "type": "interactive_sandbox",
                "title": "Hands-on Practice: Welcome to LearnBySelf",
                "practice": {
                    "title": "Welcome to Java Practice",
                    "problemStatement": "Write a complete Java program that prints 'Welcome to LearnBySelf!' to standard output. Verify that your class compiles cleanly and satisfies all test conditions.",
                    "requirements": [
                        "Class name must be 'Main'",
                        "Include standard entry point: public static void main(String[] args)",
                        "Ensure your code compiles without syntax errors",
                        "Execute and verify your output matches: Welcome to LearnBySelf!"
                    ],
                    "initialCode": "public class Main {\n    public static void main(String[] args) {\n        // TODO: Print \"Welcome to LearnBySelf!\" below\n        System.out.println(\"Welcome to LearnBySelf!\");\n    }\n}",
                    "expectedOutput": "Welcome to LearnBySelf!",
                    "hints": [
                        "Ensure 'System' starts with a capital S.",
                        "Every Java statement must end with a semicolon (;)."
                    ]
                }
            },
            {
                "id": "act-wij-5",
                "orderIndex": 6,
                "type": "interview_qa",
                "title": "Common Questions: Why does Java run on any computer?",
                "interviewQA": [
                    {
                        "id": "int-platform-indep",
                        "question": "Why is Java called platform-independent?",
                        "companyTags": ["TCS", "Infosys", "Wipro", "Cognizant"],
                        "expectedAnswer": "In older languages like C/C++, code compiles directly into machine instructions tailored to a single OS. Java compiles human-readable code into intermediate 'Bytecode' (.class). The Java Virtual Machine (JVM) installed on each operating system interprets and JIT-compiles this bytecode into native CPU instructions, allowing the same bytecode to run on Windows, Mac, or Linux without recompilation.",
                        "keyPoints": [
                            "Java code compiles to intermediate bytecode (.class)",
                            "The JVM is platform-specific and converts bytecode to machine instructions"
                        ],
                        "commonMistakes": [
                            "Claiming that the JVM itself is platform-independent (JVM is OS-specific; bytecode is portable)"
                        ]
                    },
                    {
                        "id": "int-jvm-portable",
                        "question": "Is the JVM platform-independent?",
                        "companyTags": ["Amazon", "Accenture"],
                        "expectedAnswer": "No, the JVM is platform-dependent. Each operating system (Windows, Linux, macOS) and hardware architecture has its own custom JVM built to interact directly with that OS and processor.",
                        "keyPoints": [
                            "Bytecode is platform-independent",
                            "JVM is platform-dependent"
                        ],
                        "commonMistakes": [
                            "Confusing bytecode portability with JVM software installers"
                        ]
                    }
                ]
            },
            {
                "id": "act-wij-6",
                "orderIndex": 7,
                "type": "self_evaluation",
                "title": "Self-Mastery Verification",
                "checklist": [
                    "I can explain what 'Write Once, Run Anywhere' means without looking at notes.",
                    "I understand why bytecode (.class) is portable across operating systems.",
                    "I know the distinct roles of JDK, JRE, and JVM."
                ]
            }
        ]
    },
    {
        "id": "les-getting-started-why-java-platform-independence-and-wora",
        "slug": "why-java-platform-independence-and-wora",
        "sectionSlug": "basics",
        "moduleSlug": "getting-started",
        "languageSlug": "java",
        "title": "Why Java? — Platform Independence & WORA",
        "summary": "Understand how intermediate bytecode solved hardware fragmentation and why C/C++ requires separate builds for each operating system.",
        "difficulty": "beginner",
        "estimatedMinutes": 15,
        "prerequisites": ["les-getting-started-what-is-java"],
        "learningObjectives": [
            "Explain the difference between direct machine compilation and two-stage bytecode execution",
            "Understand how the JVM isolates Java programs from hardware changes",
            "Recognize why enterprises chose Java to reduce infrastructure porting costs"
        ],
        "expectedOutcomes": [
            "Clear technical vocabulary comparing compiled binaries (.exe, .out) vs Java .class bytecode"
        ],
        "activities": [
            {
                "id": "act-wip-1",
                "orderIndex": 1,
                "type": "analogy",
                "title": "The Global Currency Analogy",
                "analogy": {
                    "headline": "Universal currency vs national cash",
                    "story": "Imagine 50 countries each with their own unique currency. If you trade with all 50, you need 50 conversion agreements. Instead, global trade uses a universal reserve currency. In software, each OS/CPU has its own machine language. Java uses Bytecode as the universal trading unit, and the local JVM converts it to native cash.",
                    "keyTakeaway": "Bytecode acts as the universal language buffer between your code and heterogeneous computer hardware."
                }
            },
            {
                "id": "act-wip-2",
                "orderIndex": 2,
                "type": "concept",
                "title": "Direct Compilation vs Two-Stage Compilation",
                "content": "### 1. Direct Machine Compilation (C, C++)\n`Source (.c)` -> `Compiler (gcc)` -> `Machine Code (.exe / .out)`\nThe output contains raw x86_64 or ARM instructions. If you try to run an x86 Windows binary on a Linux ARM server, the operating system rejects it immediately.\n\n### 2. Two-Stage Compilation (Java)\n`Source (.java)` -> `javac` -> `Universal Bytecode (.class)` -> `JVM` -> `CPU Machine Instructions`\nBecause bytecode does not contain processor-specific opcodes, the exact same `.class` file runs smoothly across Windows, Ubuntu, macOS, Android, and cloud containers."
            },
            {
                "id": "act-wip-3",
                "orderIndex": 3,
                "type": "code_walkthrough",
                "title": "A Program Demonstrating Portability",
                "codeSnippet": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Java WORA: Write Once, Run Everywhere!\");\n    }\n}",
                "description": "Notice how simple this entry point is. Whether executed on an Intel laptop or an Apple Silicon Mac, this exact program produces identical console output without changing a single line."
            },
            {
                "id": "act-wip-4",
                "orderIndex": 4,
                "type": "mcq",
                "title": "Platform Independence Knowledge Check",
                "questions": [
                    {
                        "id": "q-wip-c-vs-java",
                        "type": "mcq",
                        "prompt": "Why does a C++ executable compiled on Windows fail to run on Linux?",
                        "options": [
                            "C++ code is not as fast as Java bytecode",
                            "The Windows executable contains OS-specific system calls and PE binary format that Linux cannot parse",
                            "Linux does not support C++ programs",
                            "C++ requires the JVM which is only available on Windows"
                        ],
                        "correctAnswer": 1,
                        "hints": [
                            {
                                "step": 1,
                                "hint": "Think about binary formats like Windows .exe vs Linux ELF."
                            }
                        ],
                        "explanation": "C++ compiles directly to native machine instructions wrapped in OS-specific executable formats (PE for Windows, ELF for Linux). The operating systems cannot execute foreign binary formats.",
                        "difficulty": "easy",
                        "estimatedSeconds": 45
                    }
                ]
            },
            {
                "id": "act-wip-practice",
                "orderIndex": 5,
                "type": "interactive_sandbox",
                "title": "Hands-on Practice: Outputting WORA Principle",
                "practice": {
                    "title": "WORA Output Assignment",
                    "problemStatement": "Write a Java program that prints 'Java WORA: Write Once, Run Everywhere!' to the console.",
                    "requirements": [
                        "Class name must be 'Main'",
                        "Include standard entry point: public static void main(String[] args)",
                        "Output must exactly match: Java WORA: Write Once, Run Everywhere!"
                    ],
                    "initialCode": "public class Main {\n    public static void main(String[] args) {\n        // TODO: Print the WORA message below\n        System.out.println(\"Java WORA: Write Once, Run Everywhere!\");\n    }\n}",
                    "expectedOutput": "Java WORA: Write Once, Run Everywhere!",
                    "hints": [
                        "Match punctuation and capitalization exactly.",
                        "Make sure to keep 'Main' as the class name."
                    ]
                }
            },
            {
                "id": "act-wip-5",
                "orderIndex": 6,
                "type": "interview_qa",
                "title": "Interview Focus: The Cost of Portability",
                "interviewQA": [
                    {
                        "id": "qa-wip-cost",
                        "question": "Does Java's bytecode layer make it slower than C++?",
                        "companyTags": ["Amazon", "Microsoft", "TCS"],
                        "expectedAnswer": "Historically, early Java versions were interpreted and slower. However, modern JVMs utilize Just-In-Time (JIT) compilation and HotSpot profiling. The JVM monitors frequently executed code ('hot spots') and compiles those bytecode sections directly into optimized native machine code at runtime, often achieving speeds comparable to native C++.",
                        "keyPoints": [
                            "JIT compilation compiles frequently executed bytecode to native machine code",
                            "HotSpot optimization adapts to real-world runtime behavior"
                        ],
                        "commonMistakes": [
                            "Claiming Java is purely interpreted like Python"
                        ]
                    }
                ]
            },
            {
                "id": "act-wip-6",
                "orderIndex": 7,
                "type": "self_evaluation",
                "title": "Self-Mastery Checklist",
                "checklist": [
                    "I can describe why a C binary fails on another OS while Java bytecode succeeds.",
                    "I understand the role of JIT compilation in closing the performance gap.",
                    "I can articulate the business advantage of WORA for cloud and enterprise software."
                ]
            }
        ]
    },
    {
        "id": "les-getting-started-jdk-jre-and-jvm",
        "slug": "jdk-jre-and-jvm",
        "sectionSlug": "basics",
        "moduleSlug": "getting-started",
        "languageSlug": "java",
        "title": "JDK, JRE & JVM: The Three Software Layers",
        "summary": "Deconstructing the three essential software layers of Java: who needs what, what's inside each package, and how they work together.",
        "difficulty": "beginner",
        "estimatedMinutes": 15,
        "prerequisites": ["les-getting-started-why-java-platform-independence-and-wora"],
        "learningObjectives": [
            "Distinguish between developer tools (JDK) and runtime environments (JRE/JVM)",
            "Understand what libraries are bundled in the standard runtime",
            "Know which software package to install on your computer"
        ],
        "expectedOutcomes": [
            "Absolute clarity on what you download and run as a professional software engineer"
        ],
        "activities": [
            {
                "id": "act-trio-1",
                "orderIndex": 1,
                "type": "analogy",
                "title": "The Commercial Kitchen Analogy",
                "analogy": {
                    "headline": "Chef, Kitchen & Training Academy",
                    "story": "Think of the JVM as the executive Chef who prepares and cooks the dish. The JRE is the entire Kitchen (the Chef + kitchen utensils + standard spice pantry). The JDK is the culinary Training Academy (the complete Kitchen + recipe textbooks + inspection tools). If you just want to eat, you need the Kitchen. If you want to develop new recipes, you need the Academy.",
                    "keyTakeaway": "JDK ⊃ JRE ⊃ JVM. As a programmer, you always install the JDK."
                }
            },
            {
                "id": "act-trio-2",
                "orderIndex": 2,
                "type": "concept",
                "title": "Architecture Breakdown: JDK vs JRE vs JVM",
                "content": "```\n+-------------------------------------------------------------+\n| JDK (Java Development Kit)                                  |\n|  - javac (Java Compiler)                                    |\n|  - jdb (Debugger), javadoc, jar packager                     |\n|  +--------------------------------------------------------+ |\n|  | JRE (Java Runtime Environment)                         | |\n|  |  - Core Class Libraries (java.base, java.util)         | |\n|  |  +--------------------------------------------------+  | |\n|  |  | JVM (Java Virtual Machine)                       |  | |\n|  |  |  - ClassLoader, Bytecode Verifier, Execution Engine|  | |\n|  |  |  - JIT Compiler, Garbage Collector (GC)         |  | |\n|  |  +--------------------------------------------------+  | |\n|  +--------------------------------------------------------+ |\n+-------------------------------------------------------------+\n```"
            },
            {
                "id": "act-trio-3",
                "orderIndex": 3,
                "type": "code_walkthrough",
                "title": "Checking Runtime Architecture",
                "codeSnippet": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Runtime: JDK includes JRE, JRE includes JVM\");\n    }\n}",
                "description": "This program prints the fundamental relationship between the three layers. When you run this, the JVM executes the code using class libraries provided by the JRE."
            },
            {
                "id": "act-trio-4",
                "orderIndex": 4,
                "type": "mcq",
                "title": "Layer Classification Check",
                "questions": [
                    {
                        "id": "q-trio-javac-location",
                        "type": "mcq",
                        "prompt": "In which software package is the javac (Java compiler) located?",
                        "options": [
                            "JVM only",
                            "JRE only",
                            "JDK only",
                            "Both JRE and JVM"
                        ],
                        "correctAnswer": 2,
                        "hints": [
                            {
                                "step": 1,
                                "hint": "Does an end-user running an app need to compile code?"
                            },
                            {
                                "step": 2,
                                "hint": "Only developers compile source code into bytecode."
                            }
                        ],
                        "explanation": "The javac compiler is exclusively part of the JDK (Java Development Kit). End users who only run programs need the JRE/JVM, which do not include developer tools like javac.",
                        "difficulty": "easy",
                        "estimatedSeconds": 30
                    }
                ]
            },
            {
                "id": "act-trio-practice",
                "orderIndex": 5,
                "type": "interactive_sandbox",
                "title": "Hands-on Practice: Architecture Summary",
                "practice": {
                    "title": "Architecture Layers Assignment",
                    "problemStatement": "Write a Java program that outputs 'Runtime: JDK includes JRE, JRE includes JVM' to the console.",
                    "requirements": [
                        "Class name must be 'Main'",
                        "Include standard entry point: public static void main(String[] args)",
                        "Output must exactly match: Runtime: JDK includes JRE, JRE includes JVM"
                    ],
                    "initialCode": "public class Main {\n    public static void main(String[] args) {\n        // TODO: Print the architecture layers string below\n        System.out.println(\"Runtime: JDK includes JRE, JRE includes JVM\");\n    }\n}",
                    "expectedOutput": "Runtime: JDK includes JRE, JRE includes JVM",
                    "hints": [
                        "Ensure exact spelling and punctuation.",
                        "Verify matching parentheses and semicolons."
                    ]
                }
            },
            {
                "id": "act-trio-5",
                "orderIndex": 6,
                "type": "interview_qa",
                "title": "Interview Questions: JDK vs JRE vs JVM",
                "interviewQA": [
                    {
                        "id": "qa-trio-diff",
                        "question": "Can you run a Java application if you only have the JRE installed?",
                        "companyTags": ["Infosys", "Wipro", "TCS"],
                        "expectedAnswer": "Yes. The JRE contains the JVM and all runtime libraries needed to execute pre-compiled `.class` bytecode files. You only need the JDK if you intend to compile `.java` source files.",
                        "keyPoints": [
                            "JRE is sufficient to RUN programs",
                            "JDK is required to COMPILE programs"
                        ],
                        "commonMistakes": [
                            "Thinking you need the entire JDK just to execute a Java application"
                        ]
                    }
                ]
            },
            {
                "id": "act-trio-6",
                "orderIndex": 7,
                "type": "self_evaluation",
                "title": "Self-Mastery Checklist",
                "checklist": [
                    "I can draw the nested box relationship of JDK, JRE, and JVM.",
                    "I know where javac lives (JDK) versus where java.lang lives (JRE).",
                    "I know that as a developer, I must always install the JDK."
                ]
            }
        ]
    },
    {
        "id": "les-getting-started-installing-java-and-setting-up-ide",
        "slug": "installing-java-and-setting-up-ide",
        "sectionSlug": "basics",
        "moduleSlug": "getting-started",
        "languageSlug": "java",
        "title": "Installing Java & Setting Up Your Development Environment",
        "summary": "Practical, zero-friction setup guide for modern Java (LTS releases like Java 21), setting JAVA_HOME, and configuring VS Code / IntelliJ IDEA.",
        "difficulty": "beginner",
        "estimatedMinutes": 15,
        "prerequisites": ["les-getting-started-jdk-jre-and-jvm"],
        "learningObjectives": [
            "Understand what LTS (Long Term Support) versions mean for enterprise stability",
            "Know how JAVA_HOME and system PATH environment variables work",
            "Verify a local installation from the command terminal"
        ],
        "expectedOutcomes": [
            "Confidence setting up and troubleshooting a Java environment on any operating system"
        ],
        "activities": [
            {
                "id": "act-setup-1",
                "orderIndex": 1,
                "type": "analogy",
                "title": "The Carpenter's Wall Rack",
                "analogy": {
                    "headline": "Tool storage and global accessibility",
                    "story": "If you keep your hammer in a secret drawer in the basement, every time you want to hammer a nail you must walk all the way downstairs. If you put it on the wall rack in the main hallway (adding it to your PATH), you can grab and use it from anywhere in the house instantly.",
                    "keyTakeaway": "Adding Java's bin directory to your PATH allows your terminal to find javac and java from any directory."
                }
            },
            {
                "id": "act-setup-2",
                "orderIndex": 2,
                "type": "concept",
                "title": "Key Environment Steps for Modern Java",
                "content": "### 1. Download OpenJDK LTS\nAlways prefer a Long Term Support release (e.g., Eclipse Temurin OpenJDK 21 LTS or Oracle JDK 21).\n\n### 2. Configure Environment Variables\n- **JAVA_HOME**: Points to the root directory where JDK is installed (e.g., `C:\\Program Files\\Eclipse Adoptium\\jdk-21.0.x`).\n- **PATH**: Add `%JAVA_HOME%\\bin` (Windows) or `$JAVA_HOME/bin` (macOS/Linux) to your system PATH.\n\n### 3. Verification in Terminal\n```bash\njavac -version   # Should report: javac 21.x.x\njava -version    # Should report: OpenJDK Runtime Environment\n```"
            },
            {
                "id": "act-setup-3",
                "orderIndex": 3,
                "type": "code_walkthrough",
                "title": "Verifying Environment Readiness",
                "codeSnippet": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Environment Ready: Java LTS Active!\");\n    }\n}",
                "description": "Running this program in your IDE confirms that both your Java compiler (javac) and runtime environment (java) are linked and operating smoothly."
            },
            {
                "id": "act-setup-4",
                "orderIndex": 4,
                "type": "mcq",
                "title": "Environment Variable Check",
                "questions": [
                    {
                        "id": "q-setup-path",
                        "type": "mcq",
                        "prompt": "What error does your command terminal throw if Java is not added to your system PATH?",
                        "options": [
                            "java.lang.NullPointerException",
                            "'javac' is not recognized as an internal or external command",
                            "Syntax error: class expected",
                            "JVM Out of Memory Error"
                        ],
                        "correctAnswer": 1,
                        "hints": [
                            {
                                "step": 1,
                                "hint": "The OS shell does not know where to find the executable binary."
                            }
                        ],
                        "explanation": "If the JDK bin directory is not in your system PATH, the operating system shell has no index of where javac lives and reports that it is not recognized.",
                        "difficulty": "easy",
                        "estimatedSeconds": 30
                    }
                ]
            },
            {
                "id": "act-setup-practice",
                "orderIndex": 5,
                "type": "interactive_sandbox",
                "title": "Hands-on Practice: Environment Confirmation",
                "practice": {
                    "title": "Environment Setup Assignment",
                    "problemStatement": "Write a Java program that outputs 'Environment Ready: Java LTS Active!' to verify your IDE workflow.",
                    "requirements": [
                        "Class name must be 'Main'",
                        "Include standard entry point: public static void main(String[] args)",
                        "Output must exactly match: Environment Ready: Java LTS Active!"
                    ],
                    "initialCode": "public class Main {\n    public static void main(String[] args) {\n        // TODO: Print the environment status below\n        System.out.println(\"Environment Ready: Java LTS Active!\");\n    }\n}",
                    "expectedOutput": "Environment Ready: Java LTS Active!",
                    "hints": [
                        "Pay close attention to capitalization and punctuation.",
                        "Ensure no extra spaces before or after the string."
                    ]
                }
            },
            {
                "id": "act-setup-5",
                "orderIndex": 6,
                "type": "interview_qa",
                "title": "Interview Question: Why LTS Versions?",
                "interviewQA": [
                    {
                        "id": "qa-setup-lts",
                        "question": "Why do enterprise companies standardize on Java LTS (Long Term Support) versions?",
                        "companyTags": ["Amazon", "TCS", "Accenture"],
                        "expectedAnswer": "LTS versions receive guaranteed security patches, bug fixes, and vendor support for multiple years (typically 5+ years). Non-LTS feature releases have support for only 6 months, making them unsuitable for mission-critical enterprise systems that demand long-term stability.",
                        "keyPoints": [
                            "LTS provides multi-year stability and security updates",
                            "Prevents risky, frequent platform migrations"
                        ],
                        "commonMistakes": [
                            "Assuming newer non-LTS versions are always preferred for production systems"
                        ]
                    }
                ]
            },
            {
                "id": "act-setup-6",
                "orderIndex": 7,
                "type": "self_evaluation",
                "title": "Self-Mastery Checklist",
                "checklist": [
                    "I understand what JAVA_HOME points to on my computer.",
                    "I know why adding JDK/bin to PATH allows terminal commands to work anywhere.",
                    "I can run javac -version and java -version without errors."
                ]
            }
        ]
    },
    {
        "id": "les-getting-started-your-first-java-program",
        "slug": "your-first-java-program",
        "sectionSlug": "basics",
        "moduleSlug": "getting-started",
        "languageSlug": "java",
        "title": "Your First Java Program: From Text to Execution",
        "summary": "Write, compile with javac, and run your first Hello World program. Understand file naming rules and the terminal compilation workflow.",
        "difficulty": "beginner",
        "estimatedMinutes": 15,
        "prerequisites": ["les-getting-started-installing-java-and-setting-up-ide"],
        "learningObjectives": [
            "Write a syntactically valid Java class and main method from scratch",
            "Understand why the filename must match the public class name exactly",
            "Execute the two-step compile-and-run sequence from the command line"
        ],
        "expectedOutcomes": [
            "Ability to type and execute a simple Java program without copying and pasting"
        ],
        "activities": [
            {
                "id": "act-first-1",
                "orderIndex": 1,
                "type": "analogy",
                "title": "The Name Tag on the Package",
                "analogy": {
                    "headline": "File name must match Class name",
                    "story": "If you send a package with the label 'Main' stamped in big letters on the content, but the outside shipping box says 'Calculator', the courier system gets confused and refuses to deliver it. In Java, the compiler and class loader require the outside file label (`Main.java`) to match the public class declaration inside.",
                    "keyTakeaway": "If a class is declared `public class Main`, the file MUST be saved as `Main.java`."
                }
            },
            {
                "id": "act-first-2",
                "orderIndex": 2,
                "type": "concept",
                "title": "The Step-by-Step Terminal Workflow",
                "content": "### Step 1: Write Source Code\nCreate a file named `Main.java` containing:\n```java\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello, World! I am learning Java by self.\");\n    }\n}\n```\n\n### Step 2: Compile to Bytecode\nRun the compiler:\n```bash\njavac Main.java\n```\nThis produces a binary file: `Main.class` in the same directory.\n\n### Step 3: Run Bytecode via JVM\nLaunch the virtual machine:\n```bash\njava Main\n```\n*Note: Do NOT type `java Main.class`! Pass only the class name.*"
            },
            {
                "id": "act-first-3",
                "orderIndex": 3,
                "type": "code_walkthrough",
                "title": "The Complete Milestone Program",
                "codeSnippet": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello, World! I am learning Java by self.\");\n    }\n}",
                "description": "Every element here has a purpose: `public` makes it visible; `class` defines our unit; `main` is our entry point; `System.out.println` prints our greeting."
            },
            {
                "id": "act-first-4",
                "orderIndex": 4,
                "type": "mcq",
                "title": "Command Execution Syntax Check",
                "questions": [
                    {
                        "id": "q-first-extension",
                        "type": "mcq",
                        "prompt": "When running your compiled class from the command line, what is the correct syntax?",
                        "options": [
                            "java Main.java",
                            "java Main.class",
                            "java Main",
                            "run Main"
                        ],
                        "correctAnswer": 2,
                        "hints": [
                            {
                                "step": 1,
                                "hint": "The java command takes a class name, not a file path extension."
                            }
                        ],
                        "explanation": "You use `javac Main.java` with the file extension to compile, but `java Main` without any extension to execute the class name.",
                        "difficulty": "easy",
                        "estimatedSeconds": 30
                    }
                ]
            },
            {
                "id": "act-first-practice",
                "orderIndex": 5,
                "type": "interactive_sandbox",
                "title": "Hands-on Practice: First Java Milestone",
                "practice": {
                    "title": "Your First Java Program Assignment",
                    "problemStatement": "Write a complete Java program that prints 'Hello, World! I am learning Java by self.' to the console.",
                    "requirements": [
                        "Class name must be 'Main'",
                        "Include standard entry point: public static void main(String[] args)",
                        "Output must exactly match: Hello, World! I am learning Java by self."
                    ],
                    "initialCode": "public class Main {\n    public static void main(String[] args) {\n        // TODO: Print \"Hello, World! I am learning Java by self.\"\n        System.out.println(\"Hello, World! I am learning Java by self.\");\n    }\n}",
                    "expectedOutput": "Hello, World! I am learning Java by self.",
                    "hints": [
                        "Ensure double quotes are used around string literals.",
                        "Check for the semicolon at the end of the line."
                    ]
                }
            },
            {
                "id": "act-first-5",
                "orderIndex": 6,
                "type": "interview_qa",
                "title": "Interview Question: Multiple Classes in One File",
                "interviewQA": [
                    {
                        "id": "qa-first-multi-class",
                        "question": "Can a single .java source file have more than one class?",
                        "companyTags": ["TCS", "Cognizant", "Wipro"],
                        "expectedAnswer": "Yes, a single Java source file can contain multiple classes, but at most ONE class can be declared `public`. The name of the source file must match the name of that public class. When compiled, javac produces a separate `.class` file for each class defined.",
                        "keyPoints": [
                            "At most one public class per file",
                            "Filename must match the public class name",
                            "javac creates a separate .class file for each class"
                        ],
                        "commonMistakes": [
                            "Claiming that a Java file can only contain one class total"
                        ]
                    }
                ]
            },
            {
                "id": "act-first-6",
                "orderIndex": 7,
                "type": "self_evaluation",
                "title": "Self-Mastery Checklist",
                "checklist": [
                    "I can create a .java file and compile it using javac.",
                    "I understand that java command expects a class name without .class extension.",
                    "I know why class name and filename must match."
                ]
            }
        ]
    },
    {
        "id": "les-getting-started-main-method-explained",
        "slug": "main-method-explained",
        "sectionSlug": "basics",
        "moduleSlug": "getting-started",
        "languageSlug": "java",
        "title": "The main() Method Explained: Every Single Word",
        "summary": "Deep dive into public, static, void, main, String[] args in plain English so you never have to memorize it blindly again.",
        "difficulty": "beginner",
        "estimatedMinutes": 15,
        "prerequisites": ["les-getting-started-your-first-java-program"],
        "learningObjectives": [
            "Deconstruct each keyword in public static void main(String[] args)",
            "Understand why static is required before any object exists",
            "Know the role of the String array parameter for command-line arguments"
        ],
        "expectedOutcomes": [
            "Ability to explain the exact technical reason for every keyword in the main signature"
        ],
        "activities": [
            {
                "id": "act-main-1",
                "orderIndex": 1,
                "type": "analogy",
                "title": "The Front Door of an Enterprise",
                "analogy": {
                    "headline": "Entering a building before anyone is inside",
                    "story": "Imagine visiting an automated office building before any staff has arrived. The front door must be unlocked (`public`). There is no receptionist inside yet to invite you in, so you need a direct door that operates independently (`static`). You don't have to pay a toll fee on entry (`void`). You enter through the main lobby door (`main`), and you bring your luggage briefcase (`String[] args`).",
                    "keyTakeaway": "Every keyword in `public static void main(String[] args)` fulfills a specific architectural requirement of the JVM."
                }
            },
            {
                "id": "act-main-2",
                "orderIndex": 2,
                "type": "concept",
                "title": "Keyword-by-Keyword Breakdown",
                "content": "- **`public`**: Access modifier. Allows the JVM to invoke this method from outside the class package.\n- **`static`**: Method belongs to the class itself, not to instances. Crucial because when your program starts, NO objects have been instantiated yet!\n- **`void`**: Return type. The method returns no value to the caller upon completion.\n- **`main`**: The standardized identifier that the JVM is hardcoded to look for as the starting point.\n- **`String[] args`**: Array of text strings passed from the terminal command line when launching the program."
            },
            {
                "id": "act-main-3",
                "orderIndex": 3,
                "type": "code_walkthrough",
                "title": "The Anatomy of main()",
                "codeSnippet": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"main method: public static void main(String[] args)\");\n    }\n}",
                "description": "Notice how all five keywords fit together to create the entry gateway recognized by the JVM."
            },
            {
                "id": "act-main-4",
                "orderIndex": 4,
                "type": "mcq",
                "title": "The 'static' Keyword Verification",
                "questions": [
                    {
                        "id": "q-main-static",
                        "type": "mcq",
                        "prompt": "Why MUST the main method be declared as static in Java?",
                        "options": [
                            "To make the program run faster",
                            "So the JVM can execute it without creating an instance/object of the class first",
                            "To prevent other classes from accessing it",
                            "Because Java does not allow non-static methods inside classes"
                        ],
                        "correctAnswer": 1,
                        "hints": [
                            {
                                "step": 1,
                                "hint": "Think about whether any object exists at the very instant a program starts."
                            }
                        ],
                        "explanation": "Before the program starts running, no objects have been created in memory. If main were non-static, the JVM wouldn't know which constructor or parameters to use to create an object before invoking main.",
                        "difficulty": "easy",
                        "estimatedSeconds": 45
                    }
                ]
            },
            {
                "id": "act-main-practice",
                "orderIndex": 5,
                "type": "interactive_sandbox",
                "title": "Hands-on Practice: Entry Point Construction",
                "practice": {
                    "title": "Main Method Signature Assignment",
                    "problemStatement": "Write a complete Java program that prints: 'main method: public static void main(String[] args)' to standard output.",
                    "requirements": [
                        "Class name must be 'Main'",
                        "Include standard entry point: public static void main(String[] args)",
                        "Output must exactly match: main method: public static void main(String[] args)"
                    ],
                    "initialCode": "public class Main {\n    public static void main(String[] args) {\n        // TODO: Print the main method signature text\n        System.out.println(\"main method: public static void main(String[] args)\");\n    }\n}",
                    "expectedOutput": "main method: public static void main(String[] args)",
                    "hints": [
                        "Check that you have closed all double quotes and brackets.",
                        "Match the exact casing of 'Main' and 'String'."
                    ]
                }
            },
            {
                "id": "act-main-5",
                "orderIndex": 6,
                "type": "interview_qa",
                "title": "Interview Question: Can main be overloaded?",
                "interviewQA": [
                    {
                        "id": "qa-main-overload",
                        "question": "Can we overload the main method in Java?",
                        "companyTags": ["Amazon", "TCS", "Infosys"],
                        "expectedAnswer": "Yes! You can overload the main method by defining multiple methods named 'main' with different parameter types (e.g., `main(int x)` or `main(String a, String b)`). However, the JVM will always call `public static void main(String[] args)` as the program entry point. Other overloaded main methods can only be executed if explicitly called from your code.",
                        "keyPoints": [
                            "Yes, main can be overloaded just like any other Java method",
                            "The JVM specifically looks for the (String[] args) signature as the launch point"
                        ],
                        "commonMistakes": [
                            "Saying 'No' because main is unique"
                        ]
                    }
                ]
            },
            {
                "id": "act-main-6",
                "orderIndex": 7,
                "type": "self_evaluation",
                "title": "Self-Mastery Checklist",
                "checklist": [
                    "I can explain what public, static, void, main, and String[] args each mean.",
                    "I understand why static is required before any object exists.",
                    "I know that the main method can be overloaded."
                ]
            }
        ]
    },
    {
        "id": "les-getting-started-compilation-bytecode-execution",
        "slug": "compilation-bytecode-execution",
        "sectionSlug": "basics",
        "moduleSlug": "getting-started",
        "languageSlug": "java",
        "title": "Compilation → Bytecode → Execution: The Journey of Code",
        "summary": "Follow the journey of code from human-readable text into compact bytecode, classloading, bytecode verification, and JIT compilation to machine instructions.",
        "difficulty": "beginner",
        "estimatedMinutes": 15,
        "prerequisites": ["les-getting-started-main-method-explained"],
        "learningObjectives": [
            "Trace code progression from source text to bytecode to CPU instructions",
            "Understand the roles of the ClassLoader and Bytecode Verifier",
            "Appreciate how the JIT compiler boosts Java execution performance"
        ],
        "expectedOutcomes": [
            "Comprehensive mental model of how the JVM securely executes bytecode inside memory"
        ],
        "activities": [
            {
                "id": "act-cbe-1",
                "orderIndex": 1,
                "type": "analogy",
                "title": "The Airport Security Check",
                "analogy": {
                    "headline": "Luggage check, verification & boarding",
                    "story": "Writing source code is packing your bags. The javac compiler is the check-in desk that verifies your weight limits. When you land at the destination, the ClassLoader takes your bags off the plane. The Bytecode Verifier passes every bag through an X-ray scanner to ensure no dangerous memory corruption or unauthorized access is concealed. Once cleared, the JIT engine lets you board the fast train.",
                    "keyTakeaway": "Java programs are verified for security and type safety before the JVM executes them."
                }
            },
            {
                "id": "act-cbe-2",
                "orderIndex": 2,
                "type": "concept",
                "title": "The Four Execution Stages",
                "content": "1. **Compilation (`javac`)**: Converts `.java` text files into compact `.class` bytecode files.\n2. **Loading (`ClassLoader`)**: Reads `.class` bytes from disk or network into the JVM memory.\n3. **Verification (`Bytecode Verifier`)**: Checks that the code conforms to JVM specifications and does not violate memory access rules.\n4. **Execution (`Execution Engine`)**: Interprets bytecode line-by-line, while the **JIT (Just-In-Time) compiler** compiles frequently executed blocks ('hot spots') into raw CPU instructions for maximum speed."
            },
            {
                "id": "act-cbe-3",
                "orderIndex": 3,
                "type": "code_walkthrough",
                "title": "The Three-Step Lifecycle Program",
                "codeSnippet": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"1. Source Code -> 2. Bytecode -> 3. Machine Code\");\n    }\n}",
                "description": "This program prints the three major representations of code from human thinking to physical CPU execution."
            },
            {
                "id": "act-cbe-4",
                "orderIndex": 4,
                "type": "mcq",
                "title": "JVM Execution Stage Check",
                "questions": [
                    {
                        "id": "q-cbe-verifier",
                        "type": "mcq",
                        "prompt": "What is the primary role of the JVM Bytecode Verifier?",
                        "options": [
                            "To convert Java source code into bytecode",
                            "To ensure bytecode does not violate security constraints or corrupt memory",
                            "To format code indentation automatically",
                            "To allocate hard drive storage for the program"
                        ],
                        "correctAnswer": 1,
                        "hints": [
                            {
                                "step": 1,
                                "hint": "Think about security when downloading code over the internet."
                            }
                        ],
                        "explanation": "The Bytecode Verifier ensures that the loaded bytecode is structurally valid, adheres to JVM memory safety rules, and doesn't perform illegal pointer arithmetic.",
                        "difficulty": "easy",
                        "estimatedSeconds": 45
                    }
                ]
            },
            {
                "id": "act-cbe-practice",
                "orderIndex": 5,
                "type": "interactive_sandbox",
                "title": "Hands-on Practice: Execution Journey",
                "practice": {
                    "title": "Execution Pipeline Output Assignment",
                    "problemStatement": "Write a Java program that outputs: '1. Source Code -> 2. Bytecode -> 3. Machine Code' to standard output.",
                    "requirements": [
                        "Class name must be 'Main'",
                        "Include standard entry point: public static void main(String[] args)",
                        "Output must exactly match: 1. Source Code -> 2. Bytecode -> 3. Machine Code"
                    ],
                    "initialCode": "public class Main {\n    public static void main(String[] args) {\n        // TODO: Print the execution stages string\n        System.out.println(\"1. Source Code -> 2. Bytecode -> 3. Machine Code\");\n    }\n}",
                    "expectedOutput": "1. Source Code -> 2. Bytecode -> 3. Machine Code",
                    "hints": [
                        "Include the arrows '->' and numbers as specified.",
                        "Verify matching quotes and closing semicolon."
                    ]
                }
            },
            {
                "id": "act-cbe-5",
                "orderIndex": 6,
                "type": "interview_qa",
                "title": "Interview Question: JIT vs Interpreter",
                "interviewQA": [
                    {
                        "id": "qa-cbe-jit",
                        "question": "Is Java interpreted or compiled?",
                        "companyTags": ["Amazon", "TCS", "Microsoft"],
                        "expectedAnswer": "Java is both compiled and interpreted. First, the javac compiler turns source code into platform-independent bytecode. Second, the JVM starts executing that bytecode by interpreting it. As the program runs, the JIT (Just-In-Time) compiler identifies heavily used loops and methods ('hot spots') and compiles them directly into native machine instructions for near-instant execution.",
                        "keyPoints": [
                            "javac compiles .java to .class bytecode",
                            "JVM interprets bytecode initially",
                            "JIT compiles hot spots directly into native CPU instructions"
                        ],
                        "commonMistakes": [
                            "Saying Java is purely interpreted or purely compiled"
                        ]
                    }
                ]
            },
            {
                "id": "act-cbe-6",
                "orderIndex": 7,
                "type": "self_evaluation",
                "title": "Self-Mastery Checklist",
                "checklist": [
                    "I can describe the 4 phases: javac -> ClassLoader -> Bytecode Verifier -> JIT/Interpreter.",
                    "I understand why Java is considered both compiled and interpreted.",
                    "I know what a hot spot is in the context of the JVM execution engine."
                ]
            }
        ]
    },
    {
        "id": "les-getting-started-java-program-structure",
        "slug": "java-program-structure",
        "sectionSlug": "basics",
        "moduleSlug": "getting-started",
        "languageSlug": "java",
        "title": "Java Program Structure: Blocks, Braces & Statements",
        "summary": "Master the structural skeleton of every Java program: package declarations, imports, classes, methods, curly braces, and statement semicolons.",
        "difficulty": "beginner",
        "estimatedMinutes": 15,
        "prerequisites": ["les-getting-started-compilation-bytecode-execution"],
        "learningObjectives": [
            "Recognize the hierarchical order: package -> imports -> class -> methods -> statements",
            "Understand statement termination rules with semicolons",
            "Grasp case-sensitivity rules in Java identifier naming"
        ],
        "expectedOutcomes": [
            "Write cleanly formatted, syntactically correct code blocks with properly balanced curly braces"
        ],
        "activities": [
            {
                "id": "act-struct-1",
                "orderIndex": 1,
                "type": "analogy",
                "title": "The Russian Nesting Dolls",
                "analogy": {
                    "headline": "Blocks inside blocks",
                    "story": "Think of Russian nesting dolls (Matryoshka). The biggest doll is the Package. Inside it sits the Class doll. Inside the class sits the Method doll. Inside the method sit the Statement blocks. Each doll opens and closes cleanly with a matching pair of curly braces `{}`. If you try to close a doll that wasn't opened, the pieces jam.",
                    "keyTakeaway": "Every opening brace `{` MUST have a matching closing brace `}`."
                }
            },
            {
                "id": "act-struct-2",
                "orderIndex": 2,
                "type": "concept",
                "title": "The Structural Anatomy of a Java File",
                "content": "```java\n// 1. Package statement (optional, specifies namespace)\npackage com.learnbyself;\n\n// 2. Import statements (bring in standard or third-party classes)\nimport java.util.Scanner;\n\n// 3. Class declaration (the outer container)\npublic class Main {\n\n    // 4. Method declaration (executable behavior)\n    public static void main(String[] args) {\n\n        // 5. Statements (individual instructions ending in ;)\n        System.out.println(\"Structured: Package -> Class -> Method -> Statements\");\n    }\n}\n```\n\n### Golden Rules:\n1. Java is **case-sensitive**: `Main` is completely different from `main`.\n2. Every statement ends with a **semicolon (`;`)**.\n3. Indentation does not affect compiler parsing, but is vital for human readability."
            },
            {
                "id": "act-struct-3",
                "orderIndex": 3,
                "type": "code_walkthrough",
                "title": "Clean Program Structure Walkthrough",
                "codeSnippet": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Structured: Package -> Class -> Method -> Statements\");\n    }\n}",
                "description": "Notice the 4-space indentation for the method inside the class, and 8-space indentation for the statements inside the method."
            },
            {
                "id": "act-struct-4",
                "orderIndex": 4,
                "type": "mcq",
                "title": "Syntax Rules Check",
                "questions": [
                    {
                        "id": "q-struct-case",
                        "type": "mcq",
                        "prompt": "Which of the following is true about Java syntax?",
                        "options": [
                            "Java ignores case sensitivity like HTML",
                            "Java is strictly case-sensitive; System and system are completely different",
                            "Semicolons are optional in Java like JavaScript",
                            "Indentation determines block boundaries like Python"
                        ],
                        "correctAnswer": 1,
                        "hints": [
                            {
                                "step": 1,
                                "hint": "Think about what happens when you write system.out instead of System.out."
                            }
                        ],
                        "explanation": "Java is strictly case-sensitive. `System` refers to the built-in system class, while `system` with a lowercase 's' causes a compilation error 'cannot find symbol'.",
                        "difficulty": "easy",
                        "estimatedSeconds": 30
                    }
                ]
            },
            {
                "id": "act-struct-practice",
                "orderIndex": 5,
                "type": "interactive_sandbox",
                "title": "Hands-on Practice: Structure & Braces",
                "practice": {
                    "title": "Program Structure Assignment",
                    "problemStatement": "Write a clean Java program that outputs: 'Structured: Package -> Class -> Method -> Statements' to standard output.",
                    "requirements": [
                        "Class name must be 'Main'",
                        "Include standard entry point: public static void main(String[] args)",
                        "Output must exactly match: Structured: Package -> Class -> Method -> Statements"
                    ],
                    "initialCode": "public class Main {\n    public static void main(String[] args) {\n        // TODO: Print the structure hierarchy string\n        System.out.println(\"Structured: Package -> Class -> Method -> Statements\");\n    }\n}",
                    "expectedOutput": "Structured: Package -> Class -> Method -> Statements",
                    "hints": [
                        "Ensure all opening and closing braces { } match cleanly.",
                        "Do not omit the terminating semicolon."
                    ]
                }
            },
            {
                "id": "act-struct-5",
                "orderIndex": 6,
                "type": "interview_qa",
                "title": "Interview Question: Semicolons and Code Blocks",
                "interviewQA": [
                    {
                        "id": "qa-struct-block",
                        "question": "What is a code block in Java and what does it define?",
                        "companyTags": ["Infosys", "Wipro"],
                        "expectedAnswer": "A code block in Java is a group of zero or more statements enclosed between balanced curly braces `{}`. Code blocks define variable scope: variables declared inside a block cannot be accessed outside of that block.",
                        "keyPoints": [
                            "Code blocks are demarcated by { and }",
                            "Variables declared inside a block are scoped strictly to that block"
                        ],
                        "commonMistakes": [
                            "Thinking variable scope extends beyond enclosing curly braces"
                        ]
                    }
                ]
            },
            {
                "id": "act-struct-6",
                "orderIndex": 7,
                "type": "self_evaluation",
                "title": "Self-Mastery Checklist",
                "checklist": [
                    "I understand the order: package -> imports -> class -> methods -> statements.",
                    "I can balance curly braces without missing closing brackets.",
                    "I understand why case sensitivity matters in Java naming."
                ]
            }
        ]
    },
    {
        "id": "les-getting-started-comments-and-documentation",
        "slug": "comments-and-documentation",
        "sectionSlug": "basics",
        "moduleSlug": "getting-started",
        "languageSlug": "java",
        "title": "Comments & Documentation: Writing Clean, Maintainable Code",
        "summary": "Learn single-line comments (//), multi-line comments (/* */), and Javadoc (/** */) tags (@param, @return) for self-documenting code.",
        "difficulty": "beginner",
        "estimatedMinutes": 15,
        "prerequisites": ["les-getting-started-java-program-structure"],
        "learningObjectives": [
            "Use single-line and multi-line comments appropriately",
            "Understand Javadoc comment syntax and its role in API documentation",
            "Recognize that comments have zero impact on program runtime performance"
        ],
        "expectedOutcomes": [
            "Ability to document code intent clearly without redundant clutter"
        ],
        "activities": [
            {
                "id": "act-comm-1",
                "orderIndex": 1,
                "type": "analogy",
                "title": "Sticky Notes on Machinery",
                "analogy": {
                    "headline": "Instructions for humans, ignored by motors",
                    "story": "Imagine sticking a Post-It note on an electric generator saying 'Turn valve clockwise during high pressure'. The generator motor doesn't read the paper note or change its electrical flow; the note exists solely so that the next technician understands why the machine is set up that way.",
                    "keyTakeaway": "Comments are completely stripped out by the javac compiler and never affect executable bytecode."
                }
            },
            {
                "id": "act-comm-2",
                "orderIndex": 2,
                "type": "concept",
                "title": "The 3 Types of Comments in Java",
                "content": "### 1. Single-Line Comment (`//`)\n```java\n// Calculate total score for current player\nint score = 100;\n```\nEverything from `//` to the end of that line is ignored.\n\n### 2. Multi-Line Comment (`/* ... */`)\n```java\n/*\n * Use multi-line comments for block explanations\n * or temporarily disabling several lines of code.\n */\n```\n\n### 3. Javadoc Comment (`/** ... */`)\n```java\n/**\n * Represents the main entry point for the application.\n * @param args Command-line arguments\n */\n```\nUsed by the standard `javadoc` tool to generate searchable HTML documentation."
            },
            {
                "id": "act-comm-3",
                "orderIndex": 3,
                "type": "code_walkthrough",
                "title": "A Well-Documented Java Program",
                "codeSnippet": "public class Main {\n    /**\n     * Application starting point.\n     */\n    public static void main(String[] args) {\n        // Print the verification statement\n        System.out.println(\"Clean code: Well commented and easy to maintain\");\n    }\n}",
                "description": "Notice how the comments clarify the code's purpose without being redundant. The output statement remains crystal clear."
            },
            {
                "id": "act-comm-4",
                "orderIndex": 4,
                "type": "mcq",
                "title": "Comments Performance Check",
                "questions": [
                    {
                        "id": "q-comm-perf",
                        "type": "mcq",
                        "prompt": "Does adding 5,000 lines of comments slow down your Java application at runtime?",
                        "options": [
                            "Yes, because the JVM has to read and parse the comments in memory",
                            "No, because the javac compiler removes all comments during compilation to bytecode",
                            "Yes, but only if the comments use Javadoc format",
                            "It depends on whether the JVM runs on 32-bit or 64-bit architecture"
                        ],
                        "correctAnswer": 1,
                        "hints": [
                            {
                                "step": 1,
                                "hint": "Do comments exist inside the compiled .class file?"
                            }
                        ],
                        "explanation": "Comments exist solely in human-readable source code (.java). The javac compiler strips out all comments when producing the .class bytecode, so runtime performance is 100% unaffected.",
                        "difficulty": "easy",
                        "estimatedSeconds": 30
                    }
                ]
            },
            {
                "id": "act-comm-practice",
                "orderIndex": 5,
                "type": "interactive_sandbox",
                "title": "Hands-on Practice: Commented Code",
                "practice": {
                    "title": "Code Documentation Assignment",
                    "problemStatement": "Write a clean Java program that includes helpful comments and prints: 'Clean code: Well commented and easy to maintain' to standard output.",
                    "requirements": [
                        "Class name must be 'Main'",
                        "Include standard entry point: public static void main(String[] args)",
                        "Include at least one comment in your code",
                        "Output must exactly match: Clean code: Well commented and easy to maintain"
                    ],
                    "initialCode": "public class Main {\n    // Main entry point\n    public static void main(String[] args) {\n        // TODO: Print the clean code message below\n        System.out.println(\"Clean code: Well commented and easy to maintain\");\n    }\n}",
                    "expectedOutput": "Clean code: Well commented and easy to maintain",
                    "hints": [
                        "Comments start with // on any line.",
                        "Ensure the printed string matches the requirements exactly."
                    ]
                }
            },
            {
                "id": "act-comm-5",
                "orderIndex": 6,
                "type": "interview_qa",
                "title": "Interview Question: Javadoc Tags",
                "interviewQA": [
                    {
                        "id": "qa-comm-javadoc",
                        "question": "What is Javadoc and why is it standard in enterprise Java development?",
                        "companyTags": ["Amazon", "Oracle", "Cognizant"],
                        "expectedAnswer": "Javadoc is an automated documentation generation tool bundled with the JDK. It parses doc comments starting with `/**` and extracts special tags like `@param`, `@return`, and `@throws` to build standard HTML documentation pages for public APIs.",
                        "keyPoints": [
                            "Generates official HTML API documentation from source code",
                            "Uses tags like @param, @return, and @throws"
                        ],
                        "commonMistakes": [
                            "Confusing regular multi-line comments /* */ with Javadoc comments /** */"
                        ]
                    }
                ]
            },
            {
                "id": "act-comm-6",
                "orderIndex": 7,
                "type": "self_evaluation",
                "title": "Self-Mastery Checklist",
                "checklist": [
                    "I know the difference between //, /* */, and /** */.",
                    "I understand that comments are stripped by javac and do not slow down execution.",
                    "I can write concise comments that describe intent rather than obvious syntax."
                ]
            }
        ]
    },
    {
        "id": "les-getting-started-guided-practice-plus-first-bug-hunt",
        "slug": "guided-practice-plus-first-bug-hunt",
        "sectionSlug": "basics",
        "moduleSlug": "getting-started",
        "languageSlug": "java",
        "title": "Guided Practice + First Bug Hunt: Conquering Syntax Errors",
        "summary": "Hands-on bug hunting! Learn to read compiler error messages, fix case sensitivity bugs, missing semicolons, and unbalanced braces like a seasoned developer.",
        "difficulty": "beginner",
        "estimatedMinutes": 20,
        "prerequisites": ["les-getting-started-comments-and-documentation"],
        "learningObjectives": [
            "Decode the most common compiler error messages without frustration",
            "Quickly locate missing semicolons, case errors, and unclosed braces",
            "Build debugging confidence through hands-on troubleshooting"
        ],
        "expectedOutcomes": [
            "Transform compiler errors from stumbling blocks into helpful diagnostic guideposts"
        ],
        "activities": [
            {
                "id": "act-bug-1",
                "orderIndex": 1,
                "type": "analogy",
                "title": "The Friendly Proofreader",
                "analogy": {
                    "headline": "Compiler errors are free automated code reviews",
                    "story": "When a grammar proofreader marks a typo with a red pen before your book goes to print, they aren't punishing you—they just saved you from publishing an embarrassing error to thousands of readers. The javac compiler is your tireless free proofreader, catching mistakes before any customer runs your application.",
                    "keyTakeaway": "Compiler errors are not failures—they are precise clues to make your code work."
                }
            },
            {
                "id": "act-bug-2",
                "orderIndex": 2,
                "type": "concept",
                "title": "The Top 4 Beginner Errors Decoded",
                "content": "### 1. `error: cannot find symbol: system`\n- **Cause**: Case sensitivity! Java knows `System` (uppercase S), but not `system` (lowercase s).\n\n### 2. `error: ';' expected`\n- **Cause**: You forgot the semicolon at the end of a statement. Look at the line indicated or the line right above it.\n\n### 3. `error: reached end of file while parsing`\n- **Cause**: You forgot to close a curly brace `}`! The compiler kept looking for the closing bracket all the way to the end of the file.\n\n### 4. `error: class X is public, should be declared in a file named X.java`\n- **Cause**: Your public class name does not match the actual file name on disk."
            },
            {
                "id": "act-bug-3",
                "orderIndex": 3,
                "type": "code_walkthrough",
                "title": "Bug Hunt Demonstration",
                "codeSnippet": "public class Main {\n    public static void main(String[] args) {\n        // Clean, bug-free output:\n        System.out.println(\"Bug Hunt Completed: Zero Syntax Errors!\");\n    }\n}",
                "description": "Here is the corrected code with proper capitalization of System, balanced braces, and a terminating semicolon."
            },
            {
                "id": "act-bug-4",
                "orderIndex": 4,
                "type": "mcq",
                "title": "Error Message Diagnosis Check",
                "questions": [
                    {
                        "id": "q-bug-eof",
                        "type": "mcq",
                        "prompt": "When javac outputs 'error: reached end of file while parsing', what is the root cause?",
                        "options": [
                            "The file has zero lines of code",
                            "An opening curly brace { was never closed with a matching }",
                            "The computer ran out of disk storage space",
                            "A string literal was missing closing double quotes"
                        ],
                        "correctAnswer": 1,
                        "hints": [
                            {
                                "step": 1,
                                "hint": "The compiler reached the very end of the file still looking for something."
                            }
                        ],
                        "explanation": "This classic error happens when there is an unclosed curly brace `{`. The compiler parses all the way to the end of the file still waiting for the corresponding `}`.",
                        "difficulty": "easy",
                        "estimatedSeconds": 45
                    }
                ]
            },
            {
                "id": "act-bug-practice",
                "orderIndex": 5,
                "type": "interactive_sandbox",
                "title": "Hands-on Practice: The Bug Hunt Challenge",
                "practice": {
                    "title": "The First Bug Hunt Challenge",
                    "problemStatement": "Fix the syntax errors in the starter code below so that it compiles cleanly and outputs: 'Bug Hunt Completed: Zero Syntax Errors!'",
                    "requirements": [
                        "Class name must be 'Main'",
                        "Fix the case-sensitivity typo on system",
                        "Add the missing semicolon (;)",
                        "Output must exactly match: Bug Hunt Completed: Zero Syntax Errors!"
                    ],
                    "initialCode": "public class Main {\n    public static void main(String[] args) {\n        // BUG HUNT: Fix the errors on the line below\n        system.out.println(\"Bug Hunt Completed: Zero Syntax Errors!\")\n    }\n}",
                    "expectedOutput": "Bug Hunt Completed: Zero Syntax Errors!",
                    "hints": [
                        "Change lowercase 'system' to uppercase 'System'.",
                        "Add a semicolon (;) at the end of the println call."
                    ]
                }
            },
            {
                "id": "act-bug-5",
                "orderIndex": 6,
                "type": "interview_qa",
                "title": "Interview Question: Compile-time vs Runtime Errors",
                "interviewQA": [
                    {
                        "id": "qa-bug-compile-vs-runtime",
                        "question": "What is the key difference between a compile-time error and a runtime error in Java?",
                        "companyTags": ["TCS", "Infosys", "Wipro", "Cognizant"],
                        "expectedAnswer": "A compile-time error occurs when code violates Java syntax or type rules (e.g. missing semicolon, misspelled class name). It is detected by javac, preventing the generation of bytecode. A runtime error occurs while the program is actively executing in the JVM (e.g. dividing by zero, NullPointerException, running out of memory).",
                        "keyPoints": [
                            "Compile-time errors prevent bytecode generation (.class)",
                            "Runtime errors happen during execution by the JVM"
                        ],
                        "commonMistakes": [
                            "Confusing syntax errors (compile-time) with exceptions like NullPointerException (runtime)"
                        ]
                    }
                ]
            },
            {
                "id": "act-bug-6",
                "orderIndex": 7,
                "type": "self_evaluation",
                "title": "Module 01 Mastery Completion",
                "checklist": [
                    "I can debug 'cannot find symbol' errors by checking case-sensitivity and imports.",
                    "I can debug 'reached end of file while parsing' by tracing matching braces.",
                    "I feel confident writing, compiling, and running Java programs from scratch."
                ]
            }
        ]
    }
]

def main():
    print(f"Generating 10 Module 01 lesson JSON files in: {GETTING_STARTED_DIR}")
    for lesson in LESSONS:
        file_path = os.path.join(GETTING_STARTED_DIR, f"{lesson['slug']}.json")
        with open(file_path, "w", encoding="utf-8") as f:
            json.dump(lesson, f, indent=2)
        print(f" -> Generated: {lesson['slug']}.json ({len(lesson['activities'])} activities)")

    print(f"\nAll 10 lesson files generated successfully!")

if __name__ == "__main__":
    main()
