import os
import json

def write_file(path, content):
    os.makedirs(os.path.dirname(os.path.abspath(path)), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content.strip() + "\n")
    print(f"Created: {path}")

manifest = {
    "version": "1.0.0",
    "languages": [
        {
            "slug": "java",
            "name": "Java",
            "version": "Java 21 LTS",
            "description": "Production-grade, enterprise-ready object-oriented programming for high-scale backend services and enterprise solutions.",
            "icon": "?",
            "isAvailable": True,
            "paradigms": ["Object-Oriented", "Class-based", "Concurrent", "Type-safe"],
            "primaryUseCases": ["Enterprise Backends", "Spring Boot Microservices", "High-Performance Systems", "Android"]
        },
        {
            "slug": "python",
            "name": "Python",
            "version": "Python 3.12",
            "description": "Readable, expressive general-purpose language leading AI, data science, automation, and rapid web prototyping.",
            "icon": "??",
            "isAvailable": False,
            "paradigms": ["Multi-paradigm", "Dynamically typed", "Functional"],
            "primaryUseCases": ["AI & Machine Learning", "Data Engineering", "FastAPI Web Backends", "Automation"]
        },
        {
            "slug": "csharp",
            "name": "C# (.NET)",
            "version": ".NET 9",
            "description": "Modern, elegant, cross-platform language for enterprise applications, cloud native APIs, and game development.",
            "icon": "??",
            "isAvailable": False,
            "paradigms": ["Object-Oriented", "Functional", "Component-oriented"],
            "primaryUseCases": ["Enterprise Cloud APIs", "Azure Microservices", "Desktop", "Unity Gaming"]
        },
        {
            "slug": "javascript",
            "name": "JavaScript / TypeScript",
            "version": "ES2024 / TS 5.7",
            "description": "The language of the modern web, spanning full-stack web applications, real-time services, and edge computing.",
            "icon": "?",
            "isAvailable": False,
            "paradigms": ["Event-driven", "Functional", "Prototype-based"],
            "primaryUseCases": ["Fullstack Web", "Node.js APIs", "React Applications"]
        }
    ]
}

java_course = {
    "id": "course-java-core",
    "slug": "java",
    "languageSlug": "java",
    "title": "Java Mastery from Scratch: Fundamentals to Placement Ready",
    "headline": "Zero prior coding experience required. Build deep mental models, write clean code, solve DSA, and master technical interview questions.",
    "summary": "Designed specifically for Indian B.Tech and college students to bridge the gap between classroom theory and real-world software engineering interviews.",
    "level": "beginner",
    "estimatedHours": 60,
    "learningPathOrder": 1,
    "prerequisites": ["None - Starts from true ground zero"],
    "outcomes": [
        "Master the JVM architecture, memory model (Stack vs Heap), and garbage collection",
        "Write clean, idiomatic object-oriented code applying SOLID principles",
        "Solve algorithmic coding challenges and output-prediction questions",
        "Ace technical interview rounds with confidence"
    ],
    "sections": [
        {
            "id": "sec-fundamentals",
            "title": "Phase 1: Ground Zero & Java Fundamentals",
            "orderIndex": 1,
            "summary": "Build strong mental models of computers, compilers, bytecode, and basic program execution.",
            "modules": [
                {
                    "id": "mod-java-fundamentals",
                    "slug": "fundamentals",
                    "title": "Java Architecture & Your First Program",
                    "description": "Demystify what happens when code runs. Understand JDK, JRE, JVM, and dissect your first Hello World without memorizing boilerplate.",
                    "orderIndex": 1,
                    "estimatedMinutes": 45,
                    "prerequisites": ["Curiosity to learn programming"],
                    "learningObjectives": [
                        "Distinguish between JDK, JRE, and JVM with crystal clarity",
                        "Deconstruct public static void main word-by-word",
                        "Understand source code compilation into bytecode (.class)",
                        "Solve beginner output prediction and debugging questions"
                    ],
                    "lessons": [
                        {
                            "id": "les-hello-world",
                            "slug": "hello-world",
                            "title": "Deconstructing Hello World & The JVM Architecture",
                            "summary": "No magic allowed: discover why every keyword in public static void main exists and how the JVM executes it.",
                            "orderIndex": 1,
                            "difficulty": "easy",
                            "estimatedMinutes": 20
                        }
                    ]
                }
            ]
        }
    ]
}

java_module = {
    "id": "mod-java-fundamentals",
    "slug": "fundamentals",
    "courseSlug": "java",
    "title": "Java Architecture & Your First Program",
    "description": "Demystify what happens when code runs. Understand JDK, JRE, JVM, and dissect your first Hello World without memorizing boilerplate.",
    "orderIndex": 1,
    "estimatedMinutes": 45,
    "prerequisites": ["Curiosity to learn programming"],
    "learningObjectives": [
        "Distinguish between JDK, JRE, and JVM with crystal clarity",
        "Deconstruct public static void main word-by-word",
        "Understand source code compilation into bytecode (.class)",
        "Solve beginner output prediction and debugging questions"
    ],
    "lessons": [
        {
            "id": "les-hello-world",
            "slug": "hello-world",
            "title": "Deconstructing Hello World & The JVM Architecture",
            "summary": "No magic allowed: discover why every keyword in public static void main exists and how the JVM executes it.",
            "orderIndex": 1,
            "difficulty": "easy",
            "estimatedMinutes": 20
        }
    ]
}

lesson_hello_world = {
    "id": "les-hello-world",
    "slug": "hello-world",
    "moduleSlug": "fundamentals",
    "languageSlug": "java",
    "title": "Deconstructing Hello World & The JVM Architecture",
    "summary": "Step into the shoes of the Java compiler and virtual machine. Understand every single word of your first Java program.",
    "difficulty": "easy",
    "prerequisites": ["None. We assume zero prior programming experience."],
    "learningObjectives": [
        "Explain the journey of code: .java source file -> javac compiler -> .class bytecode -> JVM execution",
        "Break down the role of 'public', 'class', 'static', 'void', and 'main' without jargon",
        "Differentiate System.out.println from System.out.print",
        "Confidently answer interview questions regarding the main method"
    ],
    "expectedOutcomes": [
        "Ability to write, fix, and explain a complete Java entry point from memory with reasoning"
    ],
    "activities": [
        {
            "id": "act-analogy",
            "orderIndex": 1,
            "type": "analogy",
            "title": "Real-World Analogy: The Universal Recipe & The Kitchen",
            "analogy": {
                "headline": "Why write once, run anywhere?",
                "story": "Imagine writing a recipe in English (Java source code). If you want an Italian chef, a Japanese chef, and an Indian chef (Windows, macOS, Linux) to cook it identically, you don't rewrite the recipe 3 times. Instead, an international culinary standard translates it into standardized universal culinary instructions (Bytecode). Each kitchen has a certified translator (JVM) that takes those standard instructions and commands the specific kitchen appliances (CPU & OS).",
                "keyTakeaway": "You write .java code once. The 'javac' compiler turns it into universal bytecode (.class). The JVM on Windows, Linux, or Mac executes that bytecode into machine-specific instructions."
            }
        },
        {
            "id": "act-concept",
            "orderIndex": 2,
            "type": "concept",
            "title": "The JVM Trio: JDK vs JRE vs JVM",
            "content": "To write and run Java, you need three interconnected layers:\n\n1. **JVM (Java Virtual Machine)**: The actual engine that loads, verifies, and executes bytecode. It provides memory management and garbage collection.\n2. **JRE (Java Runtime Environment)**: JVM + Core Standard Libraries (like java.lang, java.util). It contains everything needed to RUN an existing program, but no compiler.\n3. **JDK (Java Development Kit)**: JRE + Development Tools (like `javac` compiler, `jdb` debugger, `jar` packaging tool). As a software engineer, you install the JDK."
        },
        {
            "id": "act-code-walkthrough",
            "orderIndex": 3,
            "type": "code_walkthrough",
            "title": "Anatomy of the Java Entry Point",
            "codeSnippet": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello, LearnBySelf!\");\n    }\n}",
            "description": "Let's dissect each keyword:\n- `public`: Accessible to the JVM from anywhere outside the package.\n- `class Main`: In Java, all code lives inside a class (a blueprint).\n- `static`: Can be invoked WITHOUT creating an object instance of `Main`. Crucial because before the program starts, no objects exist!\n- `void`: The method returns no value to the operating system.\n- `main`: The standardized identifier the JVM searches for as the execution entry point.\n- `String[] args`: Command-line arguments passed as an array of strings.\n- `System.out.println()`: Writes text to standard output followed by a newline."
        },
        {
            "id": "act-mcq-1",
            "orderIndex": 4,
            "type": "mcq",
            "title": "Concept Check: Compilation vs Execution",
            "questions": [
                {
                    "id": "q-jvm-bytecode",
                    "type": "mcq",
                    "prompt": "What does the Java compiler (`javac`) produce when it compiles `Main.java`?",
                    "options": [
                        "Platform-specific binary machine code (.exe or .bin)",
                        "Assembly instructions for x86/ARM CPUs",
                        "Platform-independent bytecode (.class file)",
                        "Directly executable RAM instructions"
                    ],
                    "correctAnswer": 2,
                    "hints": [
                        {"step": 1, "hint": "Think about the 'Write Once, Run Anywhere' promise."},
                        {"step": 2, "hint": "The file produced has a .class extension."}
                    ],
                    "explanation": "`javac` compiles human-readable source code into platform-independent bytecode (.class). The JVM installed on the target machine then interprets or JIT-compiles this bytecode into native machine instructions.",
                    "difficulty": "easy",
                    "estimatedSeconds": 45
                }
            ]
        },
        {
            "id": "act-debugging",
            "orderIndex": 5,
            "type": "debugging",
            "title": "Debugging Practice: Find the Syntax Error",
            "questions": [
                {
                    "id": "q-debug-case",
                    "type": "debugging",
                    "prompt": "A student wrote the following program, but it fails to compile with: 'error: cannot find symbol'. Identify the error.",
                    "codeSnippet": "public class Solution {\n    public static void main(String[] args) {\n        system.out.println(\"Welcome to B.Tech Prep\");\n    }\n}",
                    "options": [
                        "String[] args should be String args[]",
                        "system should be capitalized as System (Java is case-sensitive)",
                        "public static void main must return an integer",
                        "Solution class name must always be Main"
                    ],
                    "correctAnswer": 1,
                    "hints": [
                        {"step": 1, "hint": "Java is strictly case-sensitive."},
                        {"step": 2, "hint": "Look closely at the word 'system'."}
                    ],
                    "explanation": "Java is strictly case-sensitive. The standard library class name is `System` with a capital 'S'. `system` with a lowercase 's' is an unresolved identifier.",
                    "difficulty": "easy",
                    "estimatedSeconds": 60
                }
            ]
        },
        {
            "id": "act-interview",
            "orderIndex": 6,
            "type": "interview_qa",
            "title": "Top Tech Interview Questions: Java Entry Point",
            "interviewQA": [
                {
                    "id": "int-why-static",
                    "question": "Why is the Java main method declared as static?",
                    "companyTags": ["TCS Ninja/Digital", "Infosys DSE", "Amazon", "Wipro Turbo"],
                    "expectedAnswer": "The main method is static so that the JVM can invoke it directly upon class loading without having to instantiate an object of that class first. If it were non-static, the JVM would have to create an instance, which would lead to ambiguity if the class lacked a default no-arg constructor or required initialization parameters.",
                    "keyPoints": [
                        "JVM calls Main.main(args) directly on the class",
                        "Avoids ambiguity of object construction before execution starts",
                        "Saves memory allocation before the program lifecycle begins"
                    ],
                    "commonMistakes": [
                        "Saying 'because main doesn't return anything' (that is void, not static).",
                        "Failing to mention that no objects exist yet when the program starts."
                    ],
                    "followUpQuestions": [
                        "Can we overload the main method in Java? (Yes, but the JVM will only call the standard String[] signature as the entry point)",
                        "What happens if we remove the static keyword from main and run the program? (Compiles successfully, but throws NoSuchMethodError / Main method not static runtime error)"
                    ]
                }
            ]
        },
        {
            "id": "act-checklist",
            "orderIndex": 7,
            "type": "self_evaluation",
            "title": "Mastery Verification Checklist",
            "checklist": [
                "I can clearly explain the difference between JDK, JRE, and JVM to an interviewer.",
                "I can write a valid Java class and main method from scratch without looking at notes.",
                "I know why Java is case-sensitive and why System has a capital S.",
                "I can explain why main must be static."
            ]
        }
    ]
}

write_file("data/curriculum/manifest.json", json.dumps(manifest, indent=2))
write_file("data/curriculum/java/course.json", json.dumps(java_course, indent=2))
write_file("data/curriculum/java/fundamentals/module.json", json.dumps(java_module, indent=2))
write_file("data/curriculum/java/fundamentals/hello-world.json", json.dumps(lesson_hello_world, indent=2))

print("Curriculum data created successfully.")
