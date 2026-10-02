# LearnBySelf — Java Curriculum Architecture & Master Plan

## 1. Overview & Pedagogical Philosophy

LearnBySelf is engineered as a self-learning programming environment for beginners, B.Tech students, college graduates, and placement candidates. The platform is designed so that a student can start with **zero prior knowledge** and systematically progress without needing a teacher:

$$\text{Learn} \longrightarrow \text{Understand} \longrightarrow \text{Practice (MCQ)} \longrightarrow \text{Hands-on Assignment} \longrightarrow \text{Interview Q\&A} \longrightarrow \text{Checklist}$$

---

## 2. Top-Level Course Roadmap (17 Sections)

| # | Section Slug | Section Title | Modules | Lessons | Est. Hours | Status |
|---|---|---|---|---|---|---|
| **01** | `basics` | **Java Basics** | **12** | **187** | **35h** | **Active Curriculum** |
| **02** | `oop` | Object-Oriented Programming (OOP) | 7 | 26 | 25h | Planned |
| **03** | `collections` | Collections Framework | 6 | 22 | 20h | Planned |
| **04** | `generics` | Generics & Type Safety | 4 | 14 | 12h | Planned |
| **05** | `exception-handling` | Advanced Exception Handling | 4 | 12 | 10h | Planned |
| **06** | `file-io` | File I/O & NIO.2 | 5 | 16 | 14h | Planned |
| **07** | `functional-java` | Functional Programming & Lambdas | 4 | 15 | 12h | Planned |
| **08** | `streams` | Stream API | 5 | 18 | 15h | Planned |
| **09** | `multithreading` | Multithreading & Concurrency | 6 | 22 | 22h | Planned |
| **10** | `jvm-memory` | JVM Architecture & Memory Internals | 5 | 16 | 15h | Planned |
| **11** | `jdbc-sql` | Database Programming with JDBC & SQL | 5 | 18 | 18h | Planned |
| **12** | `spring` | Spring Framework Core | 5 | 16 | 18h | Planned |
| **13** | `spring-boot` | Spring Boot Microservices | 6 | 20 | 22h | Planned |
| **14** | `rest-apis` | REST API Development | 5 | 16 | 16h | Planned |
| **15** | `backend-engineering` | Enterprise Backend Engineering | 6 | 20 | 24h | Planned |
| **16** | `dsa` | Data Structures & Algorithms in Java | 8 | 35 | 40h | Planned |
| **17** | `projects-and-interview` | Capstone Projects & Placement Interview Prep | 6 | 25 | 30h | Planned |

**Total Curriculum Scope:** 17 Sections • 100+ Modules • 500+ Lessons • 350+ Hours of Structured Learning.

---

## 3. Java Basics: Complete 12-Module Hierarchy (187 Lessons)

### Module 01: Getting Started (10 Lessons, ~155 mins)
1. `What is Java?` — Story of Java, history, WORA design philosophy, and enterprise ubiquity.
2. `Why Java? — Platform independence & WORA` — How bytecode solved hardware fragmentation compared to C/C++.
3. `JDK, JRE & JVM` — Deconstructing the three essential software layers of Java.
4. `Installing Java & Setting Up IDE` — Step-by-step guidance on setting up modern Java 21 LTS and VS Code / IntelliJ.
5. `Your First Java Program` — Write, compile with javac, and run your first Hello World program.
6. `main() Method Explained` — Deep dive into public, static, void, main, String[] args.
7. `Compilation → Bytecode → Execution` — Tracing source code translation to .class bytecode and CPU execution.
8. `Java Program Structure` — Class naming conventions, case-sensitivity, curly braces, and statements.
9. `Comments & Documentation` — Single-line, multi-line, and Javadoc comments for clean readable code.
10. `Guided Practice + First Bug Hunt` — Interactive syntax error diagnosis and foundational output prediction.

### Module 02: Variables & Data Types (20 Lessons, ~310 mins)
1. `What is a Variable?` — Mental model of named memory boxes holding values.
2. `Memory & Variables — Mental Model` — How the computer assigns memory addresses to variables.
3. `Primitive vs Reference Types` — Comparing values stored directly vs memory addresses pointing to objects.
4. `The 8 Primitive Data Types` — Overview of byte, short, int, long, float, double, char, boolean.
5. `byte, short, int, long` — Integer data types, min/max ranges, and memory efficiency.
6. `float & double` — IEEE 754 floating point numbers, precision, and the f/d suffix.
7. `char` — Single characters, ASCII codes, and 16-bit Unicode characters.
8. `boolean` — True and false logical values in decision making.
9. `Literals` — Integer, floating, character, string, and boolean literal values.
10. `Variable Declaration & Initialization` — Declaring types, assigning initial values, and local variable rules.
11. `final Variables / Constants` — Creating immutable constants with the final keyword.
12. `Type Inference with var` — Local variable type inference introduced in Java 10.
13. `Type Conversion` — Automatic widening conversion without data loss.
14. `Type Casting` — Explicit narrowing conversion and potential truncation.
15. `Widening vs Narrowing` — Deep comparison between safe widening and dangerous narrowing.
16. `Overflow & Underflow` — What happens when numbers exceed their maximum or minimum boundaries.
17. `Scope & Lifetime` — Block scope, method scope, and variable shadowing.
18. `Common Variable Bugs` — Uninitialized variables, precision loss, and scope leakage.
19. `Output Prediction Practice` — Predicting exact console output from complex variable expressions.
20. `Interview Questions` — Master technical interview questions on Java data types and memory.

### Module 03: Operators (16 Lessons, ~245 mins)
1. `Arithmetic Operators` — Addition, subtraction, multiplication, division, and modulus.
2. `Unary Operators` — Unary plus, minus, logical NOT, bitwise inversion, and increment.
3. `Assignment Operators` — Simple assignment and compound assignment operators.
4. `Relational Operators` — Comparing numeric values with <, <=, >, >=.
5. `Equality Operators` — Comparing primitives (==, !=) vs object reference comparison.
6. `Logical Operators` — Logical AND (&&), OR (||), and NOT (!).
7. `Short-Circuit Evaluation` — How && and || skip right-side evaluation when the outcome is guaranteed.
8. `Bitwise Operators` — Manipulating binary bits directly with &, |, ^, and ~.
9. `Shift Operators` — Left shift (<<), right shift (>>), and unsigned right shift (>>>).
10. `Ternary Operator` — The compact inline conditional operator (condition ? expr1 : expr2).
11. `Operator Precedence` — Order of operator execution and using parentheses for clarity.
12. `Expression Evaluation` — Step-by-step evaluation order of operands and operators.
13. `Increment/Decrement Pitfalls` — Classic tricky interview puzzles involving i++ + ++i.
14. `Output Prediction` — Hands-on challenge predicting output of complex operator chains.
15. `Debugging Challenges` — Finding bugs caused by operator precedence and assignment in conditions.
16. `Interview Questions` — Top operator questions asked in placement rounds.

### Module 04: Input & Output (11 Lessons, ~175 mins)
1. `System.out.print` — Printing text without appending a newline character.
2. `println` — Printing formatted text with an automatic trailing newline.
3. `printf` — Formatted printing with format specifiers like %d, %s, %f, %n.
4. `Escape Sequences` — Special characters like \n, \t, \", and \\.
5. `Reading Input with Scanner` — Importing java.util.Scanner and reading standard input (System.in).
6. `Reading Different Data Types` — Using nextInt(), nextDouble(), nextBoolean(), and next().
7. `next() vs nextLine()` — Understanding token-based reading vs whole-line reading.
8. `Common Scanner Bugs` — The notorious skipped nextLine() bug after nextInt() and how to fix it.
9. `Formatting Output` — Building clean user-facing console menus and tables.
10. `Mini Practice` — Interactive input validation and calculating simple user bills.
11. `Interview Questions` — Technical questions on standard streams and Scanner performance.

### Module 05: Conditional Statements (16 Lessons, ~245 mins)
1. `Boolean Thinking` — Translating real-world decision trees into boolean logic.
2. `if` — Single branch decision making when a condition holds true.
3. `if-else` — Binary branching: doing one thing when true, another when false.
4. `else-if` — Multi-way branching for sequential condition evaluation.
5. `Nested Conditions` — Placing conditional blocks inside other conditional blocks.
6. `Multiple Conditions` — Combining criteria with logical AND (&&) and logical OR (||).
7. `Logical Conditions` — Simplifying complex expressions using De Morgan's laws.
8. `switch` — Traditional multi-way branch selection on discrete values.
9. `Modern Switch Expressions` — Java 14+ arrow syntax switch with return expressions.
10. `case, default, yield` — Handling multiple labels, default fallbacks, and yielding values.
11. `break` — Controlling fall-through in legacy switch statements.
12. `Nested Decision Making` — Structuring real-world login, role-based access, and pricing logic.
13. `Common Conditional Bugs` — Dangling else problem, accidental assignment in conditions, and floating comparison.
14. `Output Prediction` — Predicting exact execution branches in complex nested conditionals.
15. `Debugging Challenges` — Interactive bug hunting in conditional logic.
16. `Interview Questions` — Top conditional statement questions asked in technical interviews.

### Module 06: Loops (17 Lessons, ~260 mins)
1. `Why Loops?` — The mental model of repetition and DRY (Don't Repeat Yourself).
2. `for` — Definite iteration with initialization, condition, and update.
3. `while` — Indefinite iteration running as long as a condition holds true.
4. `do-while` — Guaranteed at-least-once execution with post-condition check.
5. `Loop Anatomy` — Deconstructing initialization, condition, body, and step update.
6. `Counter & Accumulator` — Tracking counts, totals, running averages, and min/max.
7. `Nested Loops` — Loops inside loops: multi-dimensional traversal and grid thinking.
8. `break` — Exiting a loop prematurely upon meeting a condition.
9. `continue` — Skipping the rest of the current iteration and moving to the next.
10. `Infinite Loops` — Causes of infinite loops and how to terminate them safely.
11. `Loop Control` — Flag variables, compound conditions, and clean loop termination.
12. `Pattern Problems` — Printing stars, pyramids, inverted triangles, and numbers.
13. `Number Problems` — Reversing numbers, checking palindromes, Armstrong numbers, and prime numbers.
14. `Common Loop Bugs` — Off-by-one errors (fencepost error), accidental semicolons after for/while.
15. `Dry Run / Output Prediction` — Tracing loop variable values table-by-table on paper and screen.
16. `Debugging` — Finding and fixing logic errors in loop conditions and updates.
17. `Interview Questions` — Classic interview questions on loops and efficiency.

### Module 07: Methods (19 Lessons, ~295 mins)
1. `Why Methods?` — Decomposing complex problems into reusable, testable functions.
2. `Method Anatomy` — Modifiers, return type, method name, parameter list, and body.
3. `Parameters` — Defining input placeholders in method signatures.
4. `Arguments` — Passing actual values into methods during invocation.
5. `Return Values` — Returning results to the caller using the return keyword.
6. `void` — Methods that perform actions without returning a value.
7. `Multiple Parameters` — Working with methods taking 2, 3, or more arguments.
8. `Method Scope` — Variable lifetime and isolation between methods.
9. `Local Variables` — Stack allocation of method variables and default value rules.
10. `Method Calling` — How methods invoke other methods in sequence.
11. `Call Stack Mental Model` — How the JVM pushes and pops Stack Frames during execution.
12. `Method Overloading` — Multiple methods with the same name but different parameter lists.
13. `static Methods` — Class-level methods that run without an instantiated object.
14. `Pass-by-Value` — The foundational truth: Java is STRICTLY pass-by-value, always.
15. `Java's Argument Passing Model` — Passing reference copies: mutating object state vs reassigning references.
16. `Recursion Introduction` — Methods that call themselves: base case and recursive step.
17. `Common Method Bugs` — Missing return statements, unreachable code, and signature mismatch.
18. `Practice` — Building a reusable mathematical and string utility library.
19. `Interview Questions` — Top method questions asked in placement rounds.

### Module 08: Arrays (20 Lessons, ~310 mins)
1. `What is an Array?` — Concept of contiguous memory holding multiple elements of the same type.
2. `Array Memory Model` — Arrays as Heap objects: reference on Stack, elements in contiguous Heap slots.
3. `Declaration & Initialization` — Three ways to declare and initialize arrays in Java.
4. `Indexing` — Zero-based indexing, accessing elements, and array.length.
5. `Traversing Arrays` — Iterating through all elements using index-based for loops.
6. `for Loop + Arrays` — Accumulating totals, finding averages, and conditional updates.
7. `Enhanced for` — The clean for-each loop syntax (for (Type item : array)).
8. `Updating Elements` — Modifying array values in-place by index.
9. `Searching` — Linear search algorithm finding target elements and indices.
10. `Min/Max` — Algorithms to find the smallest and largest numbers in an array.
11. `Sum/Average` — Calculating totals and floating-point averages without truncation.
12. `Copying Arrays` — Shallow copies, System.arraycopy, and Arrays.copyOf.
13. `Arrays Utility Class` — Using java.util.Arrays for toString, sort, binarySearch, and equals.
14. `Multidimensional Arrays` — Arrays of arrays: matrices, tables, and 2D grids.
15. `Jagged Arrays` — Arrays with rows of different lengths.
16. `Common Array Errors` — Uninitialized elements default values, null references, and index mistakes.
17. `ArrayIndexOutOfBoundsException` — Why this exception happens and how to permanently prevent it.
18. `Output Prediction` — Predicting outputs of array manipulations and reference copies.
19. `Practice Problems` — Reversing an array, checking if sorted, and finding duplicates.
20. `Interview Questions` — Top array questions asked in technical interviews.

### Module 09: Strings (22 Lessons, ~340 mins)
1. `What is a String?` — Strings as objects wrapping a sequence of characters.
2. `String Memory Model` — Stack reference pointing to Heap String object or String Pool entry.
3. `String Literals` — Declaring strings with double quotes vs the 'new' keyword.
4. `String Immutability` — Why Strings cannot be modified after creation: security, caching, thread-safety.
5. `== vs .equals()` — The most famous Java trap: reference equality vs character content equality.
6. `Common String Methods` — Overview of the rich java.lang.String API.
7. `length()` — Getting the total number of characters in a string.
8. `charAt()` — Accessing characters at specific index positions.
9. `substring()` — Extracting portions of a string with begin and end indices.
10. `contains()` — Checking if a string contains a sequence of characters.
11. `startsWith() / endsWith()` — Validating file extensions, prefixes, protocols, and URLs.
12. `indexOf()` — Finding the first or last occurrence index of a character or substring.
13. `replace()` — Replacing characters or character sequences.
14. `split()` — Splitting strings by delimiters into an array of tokens.
15. `trim() / strip()` — Removing leading and trailing whitespace characters.
16. `String Concatenation` — The + operator, String.concat(), and behind-the-scenes StringBuilder.
17. `StringBuilder` — Mutable character sequences for high-performance loops.
18. `StringBuffer` — Thread-safe synchronized alternative to StringBuilder.
19. `String Performance` — Memory churn, garbage collection pressure, and optimization.
20. `Common String Bugs` — NullPointerException on null strings, ignoring method return values, == traps.
21. `Practice` — String reversal, palindrome check, anagram detection, and vowel counting.
22. `Interview Questions` — Master top interview questions on String Constant Pool and immutability.

### Module 10: Exception Basics (16 Lessons, ~250 mins)
1. `What is an Exception?` — Unexpected runtime events disrupting normal program execution.
2. `Errors vs Exceptions` — Comparing unrecoverable system failures with recoverable exceptions.
3. `Exception Hierarchy` — Throwable → Exception → RuntimeException hierarchy tree.
4. `try` — Enclosing risky operations inside a protected try block.
5. `catch` — Handling specific exception types and extracting error details.
6. `finally` — Guaranteed cleanup block that executes whether an exception occurs or not.
7. `Multiple Catch` — Catching different exception types in specific order.
8. `throw` — Manually throwing an exception when business validation fails.
9. `throws` — Declaring potential checked exceptions in method signatures.
10. `Checked Exceptions` — Compile-time verified exceptions that MUST be handled or declared.
11. `Unchecked Exceptions` — Runtime exceptions (subclasses of RuntimeException) caused by logic bugs.
12. `Common Java Exceptions` — NullPointerException, ArithmeticException, NumberFormatException, IndexOutOfBounds.
13. `Creating Custom Exceptions` — Extending Exception or RuntimeException for domain errors.
14. `Debugging Exception Stack Traces` — Reading stack traces from bottom to top to pinpoint root cause.
15. `Practice` — Building a resilient bank withdrawal validator with custom exceptions.
16. `Interview Questions` — Top exception handling questions in technical placement rounds.

### Module 11: Packages, Imports & Access Control (12 Lessons, ~190 mins)
1. `What is a Package?` — Namespace containers for organizing related classes and preventing naming collisions.
2. `Creating Packages` — Declaring packages with the package keyword at the top of the file.
3. `import` — Bringing classes from other packages into scope.
4. `Fully Qualified Names` — Using complete package.ClassName to resolve naming collisions.
5. `public` — Unrestricted global access from any class in any package.
6. `private` — Restricting access strictly to the declaring class.
7. `protected` — Access within the same package and by subclasses in other packages.
8. `Package-Private` — Default access (no modifier) restricted strictly to classes in the same package.
9. `Access Across Packages` — Complete 4x4 matrix comparing public, protected, package-private, and private.
10. `Naming Conventions` — Standard Java naming conventions for packages, classes, methods, and constants.
11. `Practice` — Structuring a multi-package modular library with proper visibility.
12. `Interview Questions` — Top access modifier and package questions asked in technical interviews.

### Module 12: Java Basics Mini Projects (8 Projects, ~280 mins)
1. 🧮 `Calculator Console App` — Interactive arithmetic calculator with input validation and loop menus.
2. 🎯 `Number Guessing Game` — Random number generation, counter tracking, and binary search hints.
3. 🏧 `ATM Console Application` — Simulating account balance, deposits, withdrawals, and PIN validation.
4. 📊 `Student Marks Analyzer` — Reading student grades, computing statistics (average, highest, lowest), and grade report.
5. 🧾 `Billing System` — Item catalog, quantity calculation, discount tiers, and formatted receipts.
6. 🔐 `Simple Password Validator` — Checking password rules: length, uppercase, lowercase, numbers, and special characters.
7. 📚 `Student Grade Manager` — Storing student records in parallel arrays and searching by student ID.
8. 🎮 `Console Quiz Game` — Multiple-choice interactive quiz runner with timer, scoring, and performance summary.

---

## 4. Next Phase Roadmap
Execution strictly halts here as instructed. Only upon explicit review and approval will **Module 01: Getting Started** be populated with full interactive content, code labs, MCQs, and assignments.
