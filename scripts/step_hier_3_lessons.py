# -*- coding: utf-8 -*-
import os
import json

def write_file(path, content):
    os.makedirs(os.path.dirname(os.path.abspath(path)), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content.strip() + "\n")
    print(f"Created: {path}")

# 1. what-is-java.json
what_is_java = {
  "id": "les-what-is-java",
  "slug": "what-is-java",
  "sectionSlug": "basics",
  "moduleSlug": "getting-started",
  "languageSlug": "java",
  "title": "What is Java & Why Does it Run Everywhere?",
  "summary": "Discover why Java remains the backbone of global enterprise software, the WORA philosophy, and how the JVM solves platform compatibility.",
  "difficulty": "easy",
  "estimatedMinutes": 15,
  "prerequisites": ["None - We assume zero prior coding background."],
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
      "codeSnippet": "// A simple Java program\npublic class Welcome {\n    public static void main(String[] args) {\n        System.out.println(\"Welcome to LearnBySelf!\");\n    }\n}",
      "description": "Notice three primary rules:\n1. In Java, all executable code lives inside a class.\n2. The file name must match the public class name (`Welcome.java`).\n3. The JVM always starts executing from the `main` method."
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
            {"step": 1, "hint": "Think about whether you install the same JVM installer on Windows and Mac."},
            {"step": 2, "hint": "You download different JVM installers for Windows vs Linux, but the .class file is identical."}
          ],
          "explanation": "Bytecode (.class) is completely platform-independent (Write Once). But the JVM must be tailored to the underlying OS and CPU architecture (Run Anywhere). Therefore, the JVM itself is platform-dependent.",
          "difficulty": "easy",
          "estimatedSeconds": 45
        }
      ]
    },
    {
      "id": "act-wij-5",
      "orderIndex": 5,
      "type": "interview_qa",
      "title": "Top Interview Question: Why is Java Platform Independent?",
      "interviewQA": [
        {
          "id": "int-platform-indep",
          "question": "Why is Java called a platform-independent language, while C/C++ is not?",
          "companyTags": ["TCS Ninja", "Infosys", "Wipro", "Cognizant"],
          "expectedAnswer": "In C/C++, source code is compiled directly into platform-specific machine code (such as .exe on Windows or ELF binary on Linux). In Java, the compiler (javac) generates intermediate, platform-neutral bytecode (.class). This bytecode runs on any machine that has a Java Virtual Machine (JVM) installed, shielding the code from underlying hardware details.",
          "keyPoints": [
            "C/C++ produces direct machine instructions",
            "Java produces intermediate bytecode (.class)",
            "Bytecode is interpreted/JIT-compiled by the platform-specific JVM"
          ],
          "commonMistakes": [
            "Claiming that the JVM is platform-independent (it is not; different OS versions exist).",
            "Saying Java code runs without compilation (it is compiled first into bytecode)."
          ],
          "followUpQuestions": [
            "What is the JIT (Just-In-Time) compiler in JVM? (It compiles frequently executed bytecode loops into native machine code at runtime to optimize execution speed)."
          ]
        }
      ]
    },
    {
      "id": "act-wij-6",
      "orderIndex": 6,
      "type": "self_evaluation",
      "title": "Self-Mastery Verification",
      "checklist": [
        "I can explain what 'Write Once, Run Anywhere' means without looking at notes.",
        "I understand why bytecode (.class) is portable across operating systems.",
        "I know the distinct roles of JDK, JRE, and JVM."
      ]
    }
  ]
}

# 2. hello-world.json in basics/getting-started/
hello_world = {
  "id": "les-hello-world",
  "slug": "hello-world",
  "sectionSlug": "basics",
  "moduleSlug": "getting-started",
  "languageSlug": "java",
  "title": "Deconstructing Hello World & The JVM Architecture",
  "summary": "Step into the shoes of the Java compiler and virtual machine. Understand every single word of your first Java program.",
  "difficulty": "easy",
  "estimatedMinutes": 20,
  "prerequisites": ["What is Java & Why Does it Run Everywhere?"],
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
      "title": "The Universal Recipe & The Kitchen",
      "analogy": {
        "headline": "Why write once, run anywhere?",
        "story": "Imagine writing a recipe in English. If you want an Italian chef, a Japanese chef, and an Indian chef (Windows, macOS, Linux) to cook it identically, you don't rewrite the recipe 3 times. Instead, an international culinary standard translates it into standardized universal culinary instructions (Bytecode). Each kitchen has a certified translator (JVM) that commands the specific kitchen appliances (CPU & OS).",
        "keyTakeaway": "You write .java code once. The 'javac' compiler turns it into universal bytecode (.class). The JVM on Windows, Linux, or Mac executes that bytecode into machine-specific instructions."
      }
    },
    {
      "id": "act-concept",
      "orderIndex": 2,
      "type": "concept",
      "title": "The JVM Trio: JDK vs JRE vs JVM",
      "content": "To write and run Java, you need three interconnected layers:\n\n1. **JVM (Java Virtual Machine)**: The actual engine that loads, verifies, and executes bytecode. It provides memory management and garbage collection.\n2. **JRE (Java Runtime Environment)**: JVM + Core Standard Libraries (like java.lang, java.util). It contains everything needed to RUN an existing program, but no compiler.\n3. **JDK (Java Development Kit)**: JRE + Development Tools (like javac compiler, jdb debugger, jar packaging tool). As a software engineer, you install the JDK."
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
          "prompt": "What does the Java compiler (javac) produce when it compiles Main.java?",
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
          "explanation": "javac compiles human-readable source code into platform-independent bytecode (.class). The JVM installed on the target machine then interprets or JIT-compiles this bytecode into native machine instructions.",
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
          "explanation": "Java is strictly case-sensitive. The standard library class name is System with a capital 'S'. system with a lowercase 's' is an unresolved identifier.",
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
            "What happens if we remove the static keyword from main and run the program? (Compiles successfully, but throws NoSuchMethodError at runtime)"
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

# 3. what-is-an-object.json in oop/classes-and-objects/
what_is_an_object = {
  "id": "les-what-is-an-object",
  "slug": "what-is-an-object",
  "sectionSlug": "oop",
  "moduleSlug": "classes-and-objects",
  "languageSlug": "java",
  "title": "What is an Object? (Instances in Heap)",
  "summary": "Step into RAM: see how objects are born on the Heap while reference variables live on the Stack.",
  "difficulty": "easy",
  "estimatedMinutes": 20,
  "prerequisites": ["What is a Class? (The Blueprint)"],
  "learningObjectives": [
    "Differentiate the class blueprint from a runtime object instance",
    "Understand the 'new' keyword and dynamic Heap memory allocation",
    "Explain how object references on the Stack point to memory addresses on the Heap",
    "Answer technical interview questions on object creation and garbage collection"
  ],
  "expectedOutcomes": [
    "Confidence creating multiple objects from a class and tracing their independent state"
  ],
  "activities": [
    {
      "id": "act-wio-1",
      "orderIndex": 1,
      "type": "analogy",
      "title": "Blueprint vs The Actual Building",
      "analogy": {
        "headline": "Why do we need objects if we already wrote the class?",
        "story": "An architectural blueprint for a 3-bedroom house is not a house: you cannot sleep in a blueprint, park your car in it, or paint its walls. The blueprint (Class) only describes the layout. When the construction crew actually builds houses in the physical neighborhood (Heap memory), each built house is an Object. House 101 can be painted blue, while House 102 can be painted yellow. They share the same blueprint, but maintain completely independent physical state.",
        "keyTakeaway": "A Class is a template in bytecode. An Object is an actual runtime instance living in computer memory (Heap) with its own state."
      }
    },
    {
      "id": "act-wio-2",
      "orderIndex": 2,
      "type": "concept",
      "title": "Memory Architecture: Stack vs Heap",
      "content": "When you execute:\n`Car myCar = new Car();`\n\nTwo distinct memory operations happen simultaneously:\n1. **`Car myCar` (Stack)**: A reference variable named `myCar` is created on the current method's Stack frame. It does NOT store the car itself; it holds a 64-bit memory address pointer.\n2. **`new Car()` (Heap)**: The `new` keyword dynamically allocates a block of memory on the Heap for the car's fields (color, speed, fuel) and calls the constructor.\n3. **`=` (Assignment)**: The reference variable on the Stack is assigned the address of the newly constructed Heap object."
    },
    {
      "id": "act-wio-3",
      "orderIndex": 3,
      "type": "code_walkthrough",
      "title": "Creating Independent Objects",
      "codeSnippet": "class Car {\n    String color;\n    int speed;\n\n    void accelerate() {\n        speed += 10;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Car car1 = new Car();\n        car1.color = \"Red\";\n        car1.accelerate();\n\n        Car car2 = new Car();\n        car2.color = \"Blue\";\n\n        System.out.println(\"Car 1 Speed: \" + car1.speed); // 10\n        System.out.println(\"Car 2 Speed: \" + car2.speed); // 0\n    }\n}",
      "description": "Notice: accelerating `car1` altered only `car1.speed`. `car2.speed` remains 0 because both cars occupy completely distinct addresses in Heap memory."
    },
    {
      "id": "act-wio-4",
      "orderIndex": 4,
      "type": "mcq",
      "title": "Memory Check: Reference Sharing",
      "questions": [
        {
          "id": "q-wio-ref",
          "type": "mcq",
          "prompt": "Consider: Car a = new Car(); Car b = a; b.speed = 50; What is the value of a.speed?",
          "options": [
            "0 (default value)",
            "50 (both variables point to the same Heap object)",
            "Compilation error: cannot reassign reference",
            "NullPointerException"
          ],
          "correctAnswer": 1,
          "hints": [
            {"step": 1, "hint": "Did the 'new' keyword get called a second time?"},
            {"step": 2, "hint": "'Car b = a' copies the memory address from 'a' into 'b'."}
          ],
          "explanation": "Because 'new Car()' was only executed once, only ONE object exists on the Heap. Both 'a' and 'b' on the Stack hold the exact same memory address. Mutating through 'b' affects the object viewed by 'a'.",
          "difficulty": "medium",
          "estimatedSeconds": 45
        }
      ]
    },
    {
      "id": "act-wio-5",
      "orderIndex": 5,
      "type": "interview_qa",
      "title": "Top Tech Interview: What is the Difference Between an Object and a Reference?",
      "interviewQA": [
        {
          "id": "int-obj-vs-ref",
          "question": "What is the difference between an Object and an Object Reference in Java?",
          "companyTags": ["Amazon", "Oracle", "TCS Digital", "Infosys DSE"],
          "expectedAnswer": "An object is an actual instance created in Heap memory containing fields, state, and methods. An object reference is a variable (usually stored on the Stack) that holds the memory address where the object resides. You cannot manipulate objects directly in Java; you can only interact with them through their references.",
          "keyPoints": [
            "Object lives in Heap; reference lives in Stack (if local) or inside another object",
            "Multiple references can point to the same single Heap object",
            "When no active references point to an object, it becomes eligible for Garbage Collection"
          ],
          "commonMistakes": [
            "Thinking 'Car c' creates a car in memory (it only creates a null reference).",
            "Saying objects are passed by reference (Java is strictly pass-by-value; it passes the value of the reference pointer)."
          ]
        }
      ]
    },
    {
      "id": "act-wio-6",
      "orderIndex": 6,
      "type": "self_evaluation",
      "title": "Mastery Verification Checklist",
      "checklist": [
        "I can explain the difference between a class and an object using real-world analogies.",
        "I can draw the Stack and Heap memory diagram for 'Car c = new Car()'.",
        "I understand what happens when two references point to the same object."
      ]
    }
  ]
}

# Write files in both the hierarchical locations and the legacy location for zero breakage
write_file("data/curriculum/java/basics/getting-started/what-is-java.json", json.dumps(what_is_java, indent=2))
write_file("data/curriculum/java/basics/getting-started/hello-world.json", json.dumps(hello_world, indent=2))
write_file("data/curriculum/java/oop/classes-and-objects/what-is-an-object.json", json.dumps(what_is_an_object, indent=2))

# Maintain legacy path for backward compatibility
write_file("data/curriculum/java/fundamentals/hello-world.json", json.dumps(hello_world, indent=2))

print("Lesson files created.")
