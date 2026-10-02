# -*- coding: utf-8 -*-
import os
import json

def write_file(path, content):
    os.makedirs(os.path.dirname(os.path.abspath(path)), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content.strip() + "\n")
    print(f"Created: {path}")

# Complete 18-Section Course Hierarchy
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
  "progressPercent": 25,
  "prerequisites": ["None - Starts from true ground zero"],
  "outcomes": [
    "Master the JVM architecture, memory model (Stack vs Heap), and garbage collection",
    "Write clean, idiomatic object-oriented code applying SOLID principles",
    "Solve algorithmic coding challenges and output-prediction questions",
    "Ace technical interview rounds with confidence"
  ],
  "sections": [
    {
      "id": "sec-java-basics",
      "slug": "basics",
      "title": "Java Basics",
      "orderIndex": 1,
      "summary": "Build strong mental models of computers, compilers, bytecode, syntax, variables, conditions, and loops.",
      "isLocked": False,
      "progressPercent": 40,
      "totalModules": 7,
      "totalLessons": 21,
      "estimatedHours": 10,
      "modules": [
        {
          "id": "mod-getting-started",
          "slug": "getting-started",
          "sectionSlug": "basics",
          "title": "Getting Started",
          "description": "Demystify what happens when code runs. Understand JDK, JRE, JVM, and dissect your first Hello World program.",
          "orderIndex": 1,
          "estimatedMinutes": 45,
          "isLocked": False,
          "progressPercent": 66,
          "prerequisites": ["Curiosity to learn programming"],
          "learningObjectives": [
            "Distinguish between JDK, JRE, and JVM with crystal clarity",
            "Deconstruct public static void main word-by-word",
            "Understand source code compilation into bytecode (.class)",
            "Solve beginner output prediction and debugging questions"
          ],
          "lessons": [
            {
              "id": "les-what-is-java",
              "slug": "what-is-java",
              "sectionSlug": "basics",
              "moduleSlug": "getting-started",
              "title": "What is Java & Why Does it Run Everywhere?",
              "summary": "Discover the story of Java, the WORA philosophy, and how bytecode conquered platform dependence.",
              "orderIndex": 1,
              "difficulty": "easy",
              "estimatedMinutes": 15,
              "isCompleted": True
            },
            {
              "id": "les-hello-world",
              "slug": "hello-world",
              "sectionSlug": "basics",
              "moduleSlug": "getting-started",
              "title": "Deconstructing Hello World & The JVM Architecture",
              "summary": "No magic allowed: discover why every keyword in public static void main exists and how the JVM executes it.",
              "orderIndex": 2,
              "difficulty": "easy",
              "estimatedMinutes": 20,
              "isCompleted": True
            },
            {
              "id": "les-first-program-practice",
              "slug": "first-program-practice",
              "sectionSlug": "basics",
              "moduleSlug": "getting-started",
              "title": "Guided Practice & Syntax Bug Hunt",
              "summary": "Hands-on challenge: solve output prediction problems and catch common compilation errors.",
              "orderIndex": 3,
              "difficulty": "easy",
              "estimatedMinutes": 15,
              "isCurrent": True
            }
          ]
        },
        {
          "id": "mod-variables",
          "slug": "variables-and-data-types",
          "sectionSlug": "basics",
          "title": "Variables & Data Types",
          "description": "Master primitive vs reference types, memory allocation in RAM, and type casting rules.",
          "orderIndex": 2,
          "estimatedMinutes": 60,
          "isLocked": False,
          "progressPercent": 0,
          "prerequisites": ["Getting Started"],
          "learningObjectives": ["Primitives: byte, short, int, long, float, double, char, boolean", "Stack memory representation", "Implicit vs explicit casting"],
          "lessons": [
            { "id": "les-var-1", "slug": "what-is-variable", "sectionSlug": "basics", "moduleSlug": "variables-and-data-types", "title": "Memory Boxes: What is a Variable?", "summary": "How computers reserve memory for values.", "orderIndex": 1, "difficulty": "easy", "estimatedMinutes": 15 },
            { "id": "les-var-2", "slug": "primitive-types", "sectionSlug": "basics", "moduleSlug": "variables-and-data-types", "title": "The 8 Primitive Data Types", "summary": "Sizes, ranges, and when to use each.", "orderIndex": 2, "difficulty": "easy", "estimatedMinutes": 20 },
            { "id": "les-var-3", "slug": "type-casting", "sectionSlug": "basics", "moduleSlug": "variables-and-data-types", "title": "Type Casting & Overflow Pitfalls", "summary": "Widening vs narrowing conversions.", "orderIndex": 3, "difficulty": "medium", "estimatedMinutes": 25 }
          ]
        },
        {
          "id": "mod-operators",
          "slug": "operators",
          "sectionSlug": "basics",
          "title": "Operators",
          "description": "Arithmetic, relational, logical, bitwise, and ternary operator precedence.",
          "orderIndex": 3,
          "estimatedMinutes": 45,
          "isLocked": False,
          "progressPercent": 0,
          "prerequisites": ["Variables & Data Types"],
          "learningObjectives": ["Short-circuit evaluation in logical operators", "Post-increment vs pre-increment subtleties"],
          "lessons": [
            { "id": "les-op-1", "slug": "arithmetic-relational", "sectionSlug": "basics", "moduleSlug": "operators", "title": "Arithmetic & Relational Operators", "summary": "Calculations and comparison expressions.", "orderIndex": 1, "difficulty": "easy", "estimatedMinutes": 20 }
          ]
        },
        {
          "id": "mod-io",
          "slug": "input-output",
          "sectionSlug": "basics",
          "title": "Input & Output",
          "description": "Reading console input using Scanner and formatted printing with printf.",
          "orderIndex": 4,
          "estimatedMinutes": 40,
          "isLocked": False,
          "progressPercent": 0,
          "prerequisites": ["Operators"],
          "learningObjectives": ["Scanner nextLine() trap", "System.out.printf specifiers"],
          "lessons": []
        },
        {
          "id": "mod-conditions",
          "slug": "conditions",
          "sectionSlug": "basics",
          "title": "Conditions",
          "description": "Decision making: if-else chains, switch statements, and modern switch expressions.",
          "orderIndex": 5,
          "estimatedMinutes": 50,
          "isLocked": False,
          "progressPercent": 0,
          "prerequisites": ["Input & Output"],
          "learningObjectives": ["Nested conditions", "Fall-through behavior in switch"],
          "lessons": []
        },
        {
          "id": "mod-loops",
          "slug": "loops",
          "sectionSlug": "basics",
          "title": "Loops",
          "description": "Iteration mechanics: while, do-while, for loops, break and continue statements.",
          "orderIndex": 6,
          "estimatedMinutes": 60,
          "isLocked": False,
          "progressPercent": 0,
          "prerequisites": ["Conditions"],
          "learningObjectives": ["Loop counter invariants", "Infinite loops and termination conditions"],
          "lessons": []
        },
        {
          "id": "mod-methods",
          "slug": "methods",
          "sectionSlug": "basics",
          "title": "Methods",
          "description": "Modular code: parameters, return values, call stack frames, and pass-by-value.",
          "orderIndex": 7,
          "estimatedMinutes": 60,
          "isLocked": False,
          "progressPercent": 0,
          "prerequisites": ["Loops"],
          "learningObjectives": ["Call stack activation records", "Pass-by-value proof in Java"],
          "lessons": []
        }
      ]
    },
    {
      "id": "sec-oop",
      "slug": "oop",
      "title": "Object-Oriented Programming",
      "orderIndex": 2,
      "summary": "Master classes, objects, encapsulation, inheritance, polymorphism, abstraction, and interfaces.",
      "isLocked": False,
      "progressPercent": 0,
      "totalModules": 7,
      "totalLessons": 28,
      "estimatedHours": 12,
      "modules": [
        {
          "id": "mod-classes-objects",
          "slug": "classes-and-objects",
          "sectionSlug": "oop",
          "title": "Classes & Objects",
          "description": "Understand blueprints, heap instances, reference variables, and member access.",
          "orderIndex": 1,
          "estimatedMinutes": 90,
          "isLocked": False,
          "progressPercent": 0,
          "prerequisites": ["Java Basics"],
          "learningObjectives": [
            "Explain what a class is vs what an object is with physical analogies",
            "Understand heap memory allocation with the new keyword",
            "Manipulate object state using methods",
            "Trace multiple reference pointers to a single heap object"
          ],
          "lessons": [
            {
              "id": "les-what-is-a-class",
              "slug": "what-is-a-class",
              "sectionSlug": "oop",
              "moduleSlug": "classes-and-objects",
              "title": "What is a Class? (The Blueprint)",
              "summary": "Why procedural code falls apart and how classes group state and behavior.",
              "orderIndex": 1,
              "difficulty": "easy",
              "estimatedMinutes": 15
            },
            {
              "id": "les-what-is-an-object",
              "slug": "what-is-an-object",
              "sectionSlug": "oop",
              "moduleSlug": "classes-and-objects",
              "title": "What is an Object? (Instances in Heap)",
              "summary": "Step into RAM: see how objects are born on the Heap while references live on the Stack.",
              "orderIndex": 2,
              "difficulty": "easy",
              "estimatedMinutes": 20
            },
            {
              "id": "les-creating-first-class",
              "slug": "creating-your-first-class",
              "sectionSlug": "oop",
              "moduleSlug": "classes-and-objects",
              "title": "Creating Your First Class & Instantiating Objects",
              "summary": "Write a clean Car or Student class from scratch and invoke its behaviors.",
              "orderIndex": 3,
              "difficulty": "medium",
              "estimatedMinutes": 25
            }
          ]
        },
        {
          "id": "mod-constructors",
          "slug": "constructors",
          "sectionSlug": "oop",
          "title": "Constructors",
          "description": "Default constructors, parameterized constructors, constructor chaining with this() and super().",
          "orderIndex": 2,
          "estimatedMinutes": 60,
          "isLocked": False,
          "progressPercent": 0,
          "prerequisites": ["Classes & Objects"],
          "learningObjectives": ["Constructor lifecycle", "No-arg vs parameterized constructor"],
          "lessons": []
        },
        {
          "id": "mod-encapsulation",
          "slug": "encapsulation",
          "sectionSlug": "oop",
          "title": "Encapsulation",
          "description": "Data hiding, access modifiers (private, default, protected, public), getters, and setters.",
          "orderIndex": 3,
          "estimatedMinutes": 50,
          "isLocked": False,
          "progressPercent": 0,
          "prerequisites": ["Constructors"],
          "learningObjectives": ["Defensive copying", "Invariants protection"],
          "lessons": []
        },
        {
          "id": "mod-inheritance",
          "slug": "inheritance",
          "sectionSlug": "oop",
          "title": "Inheritance",
          "description": "Code reuse through IS-A relationships, method overriding, super keyword, and Object root.",
          "orderIndex": 4,
          "estimatedMinutes": 60,
          "isLocked": False,
          "progressPercent": 0,
          "prerequisites": ["Encapsulation"],
          "learningObjectives": ["Single vs multiple inheritance in Java", "Method overriding vs overloading"],
          "lessons": []
        },
        {
          "id": "mod-polymorphism",
          "slug": "polymorphism",
          "sectionSlug": "oop",
          "title": "Polymorphism",
          "description": "Compile-time vs Runtime polymorphism, dynamic method dispatch, and upcasting/downcasting.",
          "orderIndex": 5,
          "estimatedMinutes": 60,
          "isLocked": False,
          "progressPercent": 0,
          "prerequisites": ["Inheritance"],
          "learningObjectives": ["Dynamic method dispatch", "instanceof operator"],
          "lessons": []
        },
        {
          "id": "mod-abstraction",
          "slug": "abstraction",
          "sectionSlug": "oop",
          "title": "Abstraction",
          "description": "Hiding implementation details using abstract classes and pure conceptual interfaces.",
          "orderIndex": 6,
          "estimatedMinutes": 50,
          "isLocked": False,
          "progressPercent": 0,
          "prerequisites": ["Polymorphism"],
          "learningObjectives": ["Abstract methods", "When to choose abstract class vs interface"],
          "lessons": []
        },
        {
          "id": "mod-interfaces",
          "slug": "interfaces",
          "sectionSlug": "oop",
          "title": "Interfaces",
          "description": "Multiple contract implementation, default and static methods, marker interfaces.",
          "orderIndex": 7,
          "estimatedMinutes": 60,
          "isLocked": False,
          "progressPercent": 0,
          "prerequisites": ["Abstraction"],
          "learningObjectives": ["Loose coupling", "Functional interfaces"],
          "lessons": []
        }
      ]
    },
    {
      "id": "sec-collections",
      "slug": "collections",
      "title": "Collections Framework",
      "orderIndex": 3,
      "summary": "Master ArrayList, LinkedList, HashMap, HashSet, PriorityQueue, Iterators, and Big-O efficiency.",
      "isLocked": True,
      "lockReason": "Complete Object-Oriented Programming to unlock Collections.",
      "progressPercent": 0,
      "totalModules": 6,
      "totalLessons": 24,
      "estimatedHours": 10,
      "modules": []
    },
    {
      "id": "sec-exceptions",
      "slug": "exception-handling",
      "title": "Exception Handling",
      "orderIndex": 4,
      "summary": "Checked vs Unchecked exceptions, try-catch-finally, try-with-resources, and custom exceptions.",
      "isLocked": True,
      "progressPercent": 0,
      "totalModules": 4,
      "totalLessons": 16,
      "estimatedHours": 6,
      "modules": []
    },
    {
      "id": "sec-generics",
      "slug": "generics",
      "title": "Generics",
      "orderIndex": 5,
      "summary": "Type safety, generic classes, bounded type parameters, and wildcard mechanics (? extends T).",
      "isLocked": True,
      "progressPercent": 0,
      "totalModules": 3,
      "totalLessons": 12,
      "estimatedHours": 5,
      "modules": []
    },
    {
      "id": "sec-modern-java",
      "slug": "modern-java",
      "title": "Modern Java (Java 8 to 21)",
      "orderIndex": 6,
      "summary": "Records, pattern matching, sealed classes, text blocks, and modern switch syntax.",
      "isLocked": True,
      "progressPercent": 0,
      "totalModules": 4,
      "totalLessons": 16,
      "estimatedHours": 6,
      "modules": []
    },
    {
      "id": "sec-streams-lambdas",
      "slug": "streams-and-lambdas",
      "title": "Streams & Lambda",
      "orderIndex": 7,
      "summary": "Functional programming in Java: Stream pipelines, filter, map, flatMap, reduce, collectors.",
      "isLocked": True,
      "progressPercent": 0,
      "totalModules": 4,
      "totalLessons": 16,
      "estimatedHours": 7,
      "modules": []
    },
    {
      "id": "sec-multithreading",
      "slug": "multithreading",
      "title": "Multithreading & Concurrency",
      "orderIndex": 8,
      "summary": "Thread lifecycle, Runnable vs Callable, Synchronization, Deadlocks, ExecutorService, and Virtual Threads.",
      "isLocked": True,
      "progressPercent": 0,
      "totalModules": 5,
      "totalLessons": 20,
      "estimatedHours": 10,
      "modules": []
    },
    {
      "id": "sec-file-handling",
      "slug": "file-handling",
      "title": "File Handling & I/O",
      "orderIndex": 9,
      "summary": "Byte vs Character streams, BufferedReader, Java NIO.2 Files and Paths.",
      "isLocked": True,
      "progressPercent": 0,
      "totalModules": 3,
      "totalLessons": 12,
      "estimatedHours": 4,
      "modules": []
    },
    {
      "id": "sec-jdbc",
      "slug": "jdbc-databases",
      "title": "JDBC & Databases",
      "orderIndex": 10,
      "summary": "Connecting Java to PostgreSQL, PreparedStatement to prevent SQL injection, and connection pooling.",
      "isLocked": True,
      "progressPercent": 0,
      "totalModules": 4,
      "totalLessons": 14,
      "estimatedHours": 6,
      "modules": []
    },
    {
      "id": "sec-networking",
      "slug": "networking",
      "title": "Networking & Sockets",
      "orderIndex": 11,
      "summary": "TCP/IP socket communication, HTTP clients, and building a mini chat client/server.",
      "isLocked": True,
      "progressPercent": 0,
      "totalModules": 3,
      "totalLessons": 10,
      "estimatedHours": 5,
      "modules": []
    },
    {
      "id": "sec-jvm-memory",
      "slug": "jvm-memory",
      "title": "JVM & Memory Management",
      "orderIndex": 12,
      "summary": "Deep dive into ClassLoaders, Metaspace, Stack Frames, Eden/Tenured Generations, and G1 Garbage Collection.",
      "isLocked": True,
      "progressPercent": 0,
      "totalModules": 4,
      "totalLessons": 14,
      "estimatedHours": 7,
      "modules": []
    },
    {
      "id": "sec-testing",
      "slug": "testing",
      "title": "Testing & JUnit 5",
      "orderIndex": 13,
      "summary": "Writing unit tests, assertions, parameterized tests, and mocking with Mockito.",
      "isLocked": True,
      "progressPercent": 0,
      "totalModules": 3,
      "totalLessons": 12,
      "estimatedHours": 5,
      "modules": []
    },
    {
      "id": "sec-spring-boot",
      "slug": "spring-boot",
      "title": "Spring & Spring Boot",
      "orderIndex": 14,
      "summary": "Dependency Injection, Inversion of Control, REST APIs, Spring Data JPA, and security basics.",
      "isLocked": True,
      "progressPercent": 0,
      "totalModules": 6,
      "totalLessons": 26,
      "estimatedHours": 14,
      "modules": []
    },
    {
      "id": "sec-dsa",
      "slug": "dsa",
      "title": "Data Structures & Algorithms",
      "orderIndex": 15,
      "summary": "Arrays, Strings, Two Pointers, Linked Lists, Stacks, Queues, Trees, Graphs, Sorting, Dynamic Programming.",
      "isLocked": True,
      "progressPercent": 0,
      "totalModules": 10,
      "totalLessons": 40,
      "estimatedHours": 25,
      "modules": []
    },
    {
      "id": "sec-backend",
      "slug": "backend-development",
      "title": "Backend Development",
      "orderIndex": 16,
      "summary": "Architecture of professional backend systems, microservices, caching with Redis, message queues.",
      "isLocked": True,
      "progressPercent": 0,
      "totalModules": 5,
      "totalLessons": 18,
      "estimatedHours": 12,
      "modules": []
    },
    {
      "id": "sec-projects",
      "slug": "projects",
      "title": "Real-World Projects",
      "orderIndex": 17,
      "summary": "Build resume-ready, production-grade applications with clean Git commits and architectural documentation.",
      "isLocked": True,
      "progressPercent": 0,
      "totalModules": 3,
      "totalLessons": 12,
      "estimatedHours": 20,
      "modules": []
    },
    {
      "id": "sec-interview-prep",
      "slug": "interview-prep",
      "title": "Interview Preparation",
      "orderIndex": 18,
      "summary": "Top 100 interview questions, company-specific rounds (TCS, Infosys, Wipro, Amazon), and mock technical rounds.",
      "isLocked": True,
      "progressPercent": 0,
      "totalModules": 5,
      "totalLessons": 25,
      "estimatedHours": 15,
      "modules": []
    }
  ]
}

write_file("data/curriculum/java/course.json", json.dumps(java_course, indent=2))
print("Course data updated.")
