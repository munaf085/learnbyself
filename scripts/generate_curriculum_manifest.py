"""
Curriculum Architecture Generator for LearnBySelf.
Constructs the complete Java curriculum hierarchy according to the approved 12-module specification.
"""

import json
import os
import re

def slugify(text: str) -> str:
    text = text.lower().replace('&', 'and').replace('+', 'plus').replace('/', ' or ').replace('()', '').replace('`', '')
    text = re.sub(r'[^a-z0-9]+', '-', text).strip('-')
    return text

def create_curriculum():
    basics_modules_raw = [
        {
            "num": "01",
            "title": "Getting Started",
            "slug": "getting-started",
            "desc": "Understand how computers run code, the role of JVM, JDK, JRE, and dissect your first Java program.",
            "lessons": [
                ("What Is Java & Why Is It Used?", "Story of Java, history, WORA design philosophy, and enterprise ubiquity.", ["WORA philosophy", "Platform independence", "Enterprise ecosystem"], ["Explain why Java was created and where it is used today"]),
                ("Why Does Java Run on Different Computers?", "How bytecode solved hardware fragmentation compared to C/C++.", ["Direct machine code vs bytecode", "Portability across hardware", "Write Once Run Anywhere"], ["Explain the mechanics of platform independence"]),
                ("JDK, JRE & JVM", "Deconstructing the three essential software layers of Java.", ["JVM execution engine", "JRE runtime libraries", "JDK developer tools"], ["Differentiate between JDK, JRE, and JVM accurately"]),
                ("Installing Java & Running Your First Program", "Step-by-step guidance on setting up modern Java 21 LTS and VS Code / IntelliJ.", ["JDK installation", "JAVA_HOME path setup", "IDE extensions & workspace"], ["Verify a working local Java development environment"]),
                ("Understanding Your First Java Program", "Write, compile with javac, and run your first Hello World program.", ["Writing Main.java", "Compiling with javac", "Executing with java"], ["Compile and execute a Java program from CLI and IDE"]),
                ("Understanding main()", "Deep dive into public, static, void, main, String[] args.", ["public access", "static entry point", "void return type", "command line args"], ["Deconstruct every keyword in public static void main"]),
                ("From .java → .class → Running the Program", "Tracing source code translation to .class bytecode and CPU execution.", ["Source code (.java)", "Bytecode (.class)", "Class loader & execution engine"], ["Trace the lifecycle of a Java program from text to CPU instructions"]),
                ("Java Program Structure & Basic Syntax", "Class naming conventions, case-sensitivity, curly braces, and statements.", ["Class name matches file name", "Case sensitivity in Java", "Instruction blocks { }"], ["Organize valid Java source files according to naming conventions"]),
                ("Comments, Naming & Clean Java Code", "Single-line, multi-line, and Javadoc comments for clear readable code.", ["Single line //", "Multi-line /* */", "Javadoc /** */ tags"], ["Write clean, maintainable, self-documenting Java code"]),
                ("Guided Practice + First Debugging Challenge", "Interactive syntax error diagnosis and foundational output prediction.", ["Diagnosing compiler errors", "Missing semicolons & braces", "Case mismatch bugs"], ["Identify and fix 5 common beginner compilation errors"])
            ]
        },
        {
            "num": "02",
            "title": "Variables & Data Types",
            "slug": "variables-and-data-types",
            "desc": "Master computer memory, variables, 8 primitive types, type conversion, casting, and scope.",
            "lessons": [
                ("What is a Variable?", "Mental model of named memory boxes holding values.", ["Memory allocation", "Variable name identifiers", "Storing values"], ["Explain variables as named storage locations"]),
                ("Memory & Variables — Mental Model", "How the computer assigns memory addresses to variables.", ["RAM memory slots", "Binary representation", "Stack memory allocation"], ["Visualize how variables reside in computer memory"]),
                ("Primitive vs Reference Types", "Comparing values stored directly vs memory addresses pointing to objects.", ["Value types vs pointer types", "Stack storage vs Heap storage", "Default values"], ["Distinguish primitive data from reference pointers"]),
                ("The 8 Primitive Data Types", "Overview of byte, short, int, long, float, double, char, boolean.", ["Numeric types", "Floating point types", "Character and boolean", "Memory sizes"], ["Classify all 8 primitive types with their bit-sizes"]),
                ("byte, short, int, long", "Integer data types, min/max ranges, and memory efficiency.", ["8-bit byte", "16-bit short", "32-bit int", "64-bit long (L suffix)"], ["Select the optimal integer type based on data boundaries"]),
                ("float & double", "IEEE 754 floating point numbers, precision, and the f/d suffix.", ["32-bit float (F suffix)", "64-bit double", "Precision limitations", "Rounding issues"], ["Work accurately with decimal numbers in calculations"]),
                ("char", "Single characters, ASCII codes, and 16-bit Unicode characters.", ["Single quotes ' '", "ASCII numeric mappings", "Unicode character sets"], ["Manipulate characters and convert between char and int codes"]),
                ("boolean", "True and false logical values in decision making.", ["true and false literals", "Boolean flags", "Conditional conditions"], ["Use boolean variables to track system state"]),
                ("Literals", "Integer, floating, character, string, and boolean literal values.", ["Decimal, hex, binary literals", "Underscores in numbers (1_000_000)", "Escape characters"], ["Write clean literals using modern Java formatting"]),
                ("Variable Declaration & Initialization", "Declaring types, assigning initial values, and local variable rules.", ["Declaration syntax", "Initialization assignment", "Uninitialized local variable error"], ["Declare and initialize variables safely"]),
                ("final Variables / Constants", "Creating immutable constants with the final keyword.", ["final keyword", "Constant naming conventions (UPPER_SNAKE)", "Immutability guarantees"], ["Prevent unintended state mutations using final constants"]),
                ("Type Inference with var", "Local variable type inference introduced in Java 10.", ["var syntax", "Compile-time type resolution", "Best practices for readability"], ["Apply var judiciously for clean local variable code"]),
                ("Type Conversion", "Automatic widening conversion without data loss.", ["Implicit type promotion", "Widening hierarchy (byte -> int -> double)", "Expression evaluation types"], ["Predict automatic type promotions in expressions"]),
                ("Type Casting", "Explicit narrowing conversion and potential truncation.", ["Explicit cast syntax (type)", "Data loss risks", "Fractional truncation"], ["Safely perform explicit type casting when narrowing types"]),
                ("Widening vs Narrowing", "Deep comparison between safe widening and dangerous narrowing.", ["Range compatibility", "Bit-level truncation", "Safe numeric boundaries"], ["Evaluate when to allow widening vs when explicit cast is required"]),
                ("Overflow & Underflow", "What happens when numbers exceed their maximum or minimum boundaries.", ["Two's complement circular wraparound", "Detecting overflow", "Using Math.addExact"], ["Anticipate and prevent integer overflow bugs"]),
                ("Scope & Lifetime", "Block scope, method scope, and variable shadowing.", ["Curly brace block boundaries", "Lifetime of local variables", "Variable shadowing rules"], ["Determine the exact scope and visibility of any variable"]),
                ("Common Variable Bugs", "Uninitialized variables, precision loss, and scope leakage.", ["Compiler error: variable might not have been initialized", "Integer division truncation", "Shadowing bugs"], ["Debug and resolve common variable declaration errors"]),
                ("Output Prediction Practice", "Predicting exact console output from complex variable expressions.", ["Tracing variable assignments step-by-step", "Evaluation order", "Compound expressions"], ["Mentally execute and predict output of multi-variable code"]),
                ("Interview Questions", "Master technical interview questions on Java data types and memory.", ["Why is char 16-bit in Java?", "Can byte be assigned to char directly?", "What is integer caching?"], ["Answer core data type interview questions with authority"])
            ]
        },
        {
            "num": "03",
            "title": "Operators",
            "slug": "operators",
            "desc": "Arithmetic, relational, logical, bitwise, assignment, and ternary operators with precedence rules.",
            "lessons": [
                ("Arithmetic Operators", "Addition, subtraction, multiplication, division, and modulus.", ["+ - * / %", "Integer division vs floating division", "Modulus for remainders"], ["Calculate correct arithmetic results including division truncation"]),
                ("Unary Operators", "Unary plus, minus, logical NOT, bitwise inversion, and increment.", ["+ - ! ~", "Pre-increment ++x vs Post-increment x++", "Pre-decrement --x vs Post-decrement x--"], ["Correctly apply unary operators in standalone and nested expressions"]),
                ("Assignment Operators", "Simple assignment and compound assignment operators.", ["= += -= *= /= %=", "Automatic implicit casting in compound operators", "Chained assignments"], ["Write concise code using compound assignment operators"]),
                ("Relational Operators", "Comparing numeric values with <, <=, >, >=.", ["Comparison semantics", "Strict vs non-strict inequalities", "Boolean evaluation"], ["Formulate correct boundary comparison expressions"]),
                ("Equality Operators", "Comparing primitives (==, !=) vs object reference comparison.", ["== and != on primitives", "Value equality vs reference equality", "Floating point equality caveats"], ["Distinguish primitive equality from object reference equality"]),
                ("Logical Operators", "Logical AND (&&), OR (||), and NOT (!).", ["Truth tables", "Combining multiple conditions", "Boolean algebra basics"], ["Construct robust multi-condition logical expressions"]),
                ("Short-Circuit Evaluation", "How && and || skip right-side evaluation when the outcome is guaranteed.", ["&& short-circuiting on false", "|| short-circuiting on true", "Side-effect avoidance"], ["Leverage short-circuiting to prevent NullPointerExceptions"]),
                ("Bitwise Operators", "Manipulating binary bits directly with &, |, ^, and ~.", ["Bitwise AND &", "Bitwise OR |", "Bitwise XOR ^", "Bitwise NOT ~"], ["Perform bitwise calculations on integer values"]),
                ("Shift Operators", "Left shift (<<), right shift (>>), and unsigned right shift (>>>).", ["Left shift as multiplication by 2^n", "Sign-extending right shift >>", "Zero-fill unsigned right shift >>>"], ["Apply shift operators for low-level bit manipulation"]),
                ("Ternary Operator", "The compact inline conditional operator (condition ? expr1 : expr2).", ["Ternary syntax", "Replacing simple if-else blocks", "Type compatibility of branches"], ["Use ternary operator for concise inline assignments"]),
                ("Operator Precedence", "Order of operator execution and using parentheses for clarity.", ["Precedence hierarchy table", "Associativity (left-to-right vs right-to-left)", "Parentheses grouping"], ["Resolve complex expressions deterministically using precedence rules"]),
                ("Expression Evaluation", "Step-by-step evaluation order of operands and operators.", ["Left-to-right operand evaluation", "Operator binding", "Compound sub-expressions"], ["Evaluate multi-operator expressions with exact precision"]),
                ("Increment/Decrement Pitfalls", "Classic tricky interview puzzles involving i++ + ++i.", ["Postfix evaluation timing", "Prefix immediate update", "Undefined behavior traps"], ["Dissect and solve tricky increment puzzles without hesitation"]),
                ("Output Prediction", "Hands-on challenge predicting output of complex operator chains.", ["Evaluating chained expressions", "Short-circuit tracing", "Operator combination exercises"], ["Accurately predict output of complex operator statements"]),
                ("Debugging Challenges", "Finding bugs caused by operator precedence and assignment in conditions.", ["Accidental assignment (= instead of ==)", "Precedence mistakes in arithmetic", "Unintended short-circuit skips"], ["Identify and fix 6 common operator-related bugs"]),
                ("Interview Questions", "Top operator questions asked in placement rounds.", ["Difference between & and &&", "Why does 10 / 3 yield 3?", "How does >>> differ from >>?"], ["Explain operator nuances clearly during technical interviews"])
            ]
        },
        {
            "num": "04",
            "title": "Input & Output",
            "slug": "input-and-output",
            "desc": "Master console output formatting, Scanner input reading, and stream management.",
            "lessons": [
                ("System.out.print", "Printing text without appending a newline character.", ["System.out stream", "Inline console printing", "Combining sequential prints"], ["Control console output layout without line breaks"]),
                ("println", "Printing formatted text with an automatic trailing newline.", ["Line buffering", "Printing primitives and objects", "Empty println for blank lines"], ["Structure clean multi-line console output"]),
                ("printf", "Formatted printing with format specifiers like %d, %s, %f, %n.", ["Format specifiers (%d, %f, %s, %b, %c)", "Width and precision specifiers (%10.2f)", "Platform-independent %n newline"], ["Format tabular and numeric output professionally with printf"]),
                ("Escape Sequences", "Special characters like \\n, \\t, \\\", and \\\\.", ["Newline \\n", "Tab indentation \\t", "Escaping quotes and backslashes"], ["Use escape sequences to format clean readable console output"]),
                ("Reading Input with Scanner", "Importing java.util.Scanner and reading standard input (System.in).", ["java.util.Scanner import", "Scanner(System.in) initialization", "Closing Scanner safely"], ["Read dynamic interactive user input from the console"]),
                ("Reading Different Data Types", "Using nextInt(), nextDouble(), nextBoolean(), and next().", ["nextInt() for integers", "nextDouble() for decimals", "Input mismatch handling", "Single-word token reading"], ["Parse various primitive data types from user input"]),
                ("next() vs nextLine()", "Understanding token-based reading vs whole-line reading.", ["Delimiter scanning with next()", "Reading full sentences with nextLine()", "Whitespace handling"], ["Choose the correct reading method for single words vs full sentences"]),
                ("Common Scanner Bugs", "The notorious skipped nextLine() bug after nextInt() and how to fix it.", ["Newline leftover in buffer", "Consuming buffer with extra nextLine()", "Preventing input skipping"], ["Solve the classic scanner buffer bug reliably"]),
                ("Formatting Output", "Building clean user-facing console menus and tables.", ["Alignment with format specifiers", "Border art and separator lines", "Structured CLI design"], ["Design clean, professional console user interfaces"]),
                ("Mini Practice", "Interactive input validation and calculating simple user bills.", ["Reading multiple inputs", "Combining math with inputs", "Outputting formatted summary"], ["Build a complete interactive console calculator"]),
                ("Interview Questions", "Technical questions on standard streams and Scanner performance.", ["Difference between print, println, and printf", "Why is Scanner considered slow for competitive programming?", "What is System.out internally?"], ["Answer core Java I/O interview questions with clarity"])
            ]
        },
        {
            "num": "05",
            "title": "Conditional Statements",
            "slug": "conditional-statements",
            "desc": "Boolean decision trees, if-else chains, nested conditions, and modern switch expressions.",
            "lessons": [
                ("Boolean Thinking", "Translating real-world decision trees into boolean logic.", ["Decision making mental model", "Conditions as true/false branches", "State representation"], ["Convert business logic requirements into boolean conditions"]),
                ("if", "Single branch decision making when a condition holds true.", ["if syntax", "Block body vs single statement", "Execution flow"], ["Execute code conditionally using single if statements"]),
                ("if-else", "Binary branching: doing one thing when true, another when false.", ["Two-way branching", "Mutual exclusivity", "Guaranteed single-branch execution"], ["Implement clean two-way decision logic"]),
                ("else-if", "Multi-way branching for sequential condition evaluation.", ["Cascading conditions", "Order of condition evaluation", "Default fallback with final else"], ["Evaluate multiple mutually exclusive criteria sequentially"]),
                ("Nested Conditions", "Placing conditional blocks inside other conditional blocks.", ["Hierarchical decision making", "Indent formatting and readability", "Avoiding excessive nesting"], ["Implement hierarchical logic while keeping code readable"]),
                ("Multiple Conditions", "Combining criteria with logical AND (&&) and logical OR (||).", ["Compound expressions", "Short-circuiting in conditionals", "Boundary validation"], ["Write robust conditions with multiple compound rules"]),
                ("Logical Conditions", "Simplifying complex expressions using De Morgan's laws.", ["!(A && B) == (!A || !B)", "Eliminating redundant flags", "Refactoring nested ifs into compound expressions"], ["Simplify intricate boolean logic for high maintainability"]),
                ("switch", "Traditional multi-way branch selection on discrete values.", ["switch syntax", "Supported types (byte, short, int, char, String, enum)", "Case matching"], ["Apply switch statements for discrete value dispatch"]),
                ("Modern Switch Expressions", "Java 14+ arrow syntax switch with return expressions.", ["Arrow syntax case X ->", "Switch as an expression returning a value", "Exhaustiveness checking"], ["Write clean, error-proof modern switch expressions"]),
                ("case, default, yield", "Handling multiple labels, default fallbacks, and yielding values.", ["Multiple case labels (case 1, 2, 3 ->)", "Mandatory default branch", "yield keyword in block switch expressions"], ["Use yield to return values from complex switch blocks"]),
                ("break", "Controlling fall-through in legacy switch statements.", ["Fall-through behavior", "Missing break bugs", "Intentional fall-through grouping"], ["Prevent accidental fall-through bugs in legacy switch code"]),
                ("Nested Decision Making", "Structuring real-world login, role-based access, and pricing logic.", ["Guard clauses / Early return pattern", "Flattening nested ifs", "Clean code principles"], ["Refactor deeply nested code into clean guard clauses"]),
                ("Common Conditional Bugs", "Dangling else problem, accidental assignment in conditions, and floating comparison.", ["Dangling else ambiguity", "Using == vs .equals for Strings", "Floating point epsilon comparisons"], ["Identify and fix 6 classic conditional statement bugs"]),
                ("Output Prediction", "Predicting exact execution branches in complex nested conditionals.", ["Tracing branch selection", "Switch fall-through prediction", "Compound condition dry runs"], ["Predict console output for multi-branch code segments"]),
                ("Debugging Challenges", "Interactive bug hunting in conditional logic.", ["Fixing incorrect grade boundaries", "Diagnosing skipped else branches", "Correcting logical operator mistakes"], ["Debug real-world branching errors successfully"]),
                ("Interview Questions", "Top conditional statement questions asked in technical interviews.", ["Can switch use float or double in Java?", "How does modern switch differ from legacy switch?", "What is a guard clause?"], ["Answer conditional statement interview questions confidently"])
            ]
        },
        {
            "num": "06",
            "title": "Loops",
            "slug": "loops",
            "desc": "Iteration, for, while, do-while, nested loops, break, continue, and pattern printing.",
            "lessons": [
                ("Why Loops?", "The mental model of repetition and DRY (Don't Repeat Yourself).", ["Automating repetitive work", "Loop termination criteria", "Iterative thinking"], ["Explain the necessity and anatomy of repetitive execution"]),
                ("for", "Definite iteration with initialization, condition, and update.", ["for loop syntax", "Execution sequence step-by-step", "Index variable scope"], ["Write standard for loops for known repetition counts"]),
                ("while", "Indefinite iteration running as long as a condition holds true.", ["while loop syntax", "Pre-test condition check", "Updating condition variables inside loop"], ["Use while loops when iteration count depends on dynamic conditions"]),
                ("do-while", "Guaranteed at-least-once execution with post-condition check.", ["do-while syntax", "Post-test condition check", "Menu-driven CLI loop pattern"], ["Implement interactive loops requiring at least one execution"]),
                ("Loop Anatomy", "Deconstructing initialization, condition, body, and step update.", ["The 4 pillars of any loop", "Tracing state per iteration", "Loop invariant concept"], ["Deconstruct any loop into its fundamental lifecycle steps"]),
                ("Counter & Accumulator", "Tracking counts, totals, running averages, and min/max.", ["Counter pattern (count++)", "Accumulator pattern (sum += val)", "Running statistics"], ["Implement counters and accumulators across dynamic sequences"]),
                ("Nested Loops", "Loops inside loops: multi-dimensional traversal and grid thinking.", ["Outer loop vs inner loop execution order", "Time complexity intuition (O(N^2))", "Grid coordinates (row, col)"], ["Trace and control nested loops for 2D structures"]),
                ("break", "Exiting a loop prematurely upon meeting a condition.", ["Early loop termination", "Search loop optimization", "Labeled break for nested loops"], ["Terminate loops efficiently once a target outcome is reached"]),
                ("continue", "Skipping the rest of the current iteration and moving to the next.", ["Skipping unwanted elements", "Contrast with break", "Labeled continue"], ["Filter iterations cleanly using continue statements"]),
                ("Infinite Loops", "Causes of infinite loops and how to terminate them safely.", ["Missing increment/decrement", "Conditions that never become false", "Intentional while(true) loops with break"], ["Diagnose, fix, and safely implement continuous loops"]),
                ("Loop Control", "Flag variables, compound conditions, and clean loop termination.", ["Boolean flag controls", "Multiple loop exit conditions", "Clean readable loop design"], ["Structure elegant loop controls without convoluted logic"]),
                ("Pattern Problems", "Printing stars, pyramids, inverted triangles, and numbers.", ["Square star patterns", "Right-angled triangles", "Pyramids and diamonds", "Number patterns"], ["Develop strong algorithmic thinking by printing 2D patterns"]),
                ("Number Problems", "Reversing numbers, checking palindromes, Armstrong numbers, and prime numbers.", ["Digit extraction (num % 10, num / 10)", "Reversing integer digits", "Prime checking algorithm"], ["Solve foundational mathematical and digit manipulation problems"]),
                ("Common Loop Bugs", "Off-by-one errors (fencepost error), accidental semicolons after for/while.", ["Off-by-one error (<= vs <)", "Accidental empty body (for(...);)", "Infinite loop bugs"], ["Detect and resolve 5 common loop compilation and logic errors"]),
                ("Dry Run / Output Prediction", "Tracing loop variable values table-by-table on paper and screen.", ["Iteration trace table", "Tracking index and accumulator state", "Complex nested loop outputs"], ["Perform accurate manual dry runs to predict loop outputs"]),
                ("Debugging", "Finding and fixing logic errors in loop conditions and updates.", ["Correcting misplaced increments", "Fixing inverted loop bounds", "Preventing premature breaks"], ["Debug malfunctioning loops systematically"]),
                ("Interview Questions", "Classic interview questions on loops and efficiency.", ["Difference between while and do-while", "What does for(;;) do?", "How to break out of nested loops in Java?"], ["Explain loop mechanics and edge cases during technical interviews"])
            ]
        },
        {
            "num": "07",
            "title": "Methods",
            "slug": "methods",
            "desc": "Modular programming, parameters, return values, call stack, overloading, and pass-by-value.",
            "lessons": [
                ("Why Methods?", "Decomposing complex problems into reusable, testable functions.", ["Code reusability", "Modularity and abstraction", "Single Responsibility Principle intro"], ["Break monolithic code into clean, dedicated helper methods"]),
                ("Method Anatomy", "Modifiers, return type, method name, parameter list, and body.", ["Method declaration syntax", "Method signature definition", "Header vs implementation"], ["Define well-structured methods following Java conventions"]),
                ("Parameters", "Defining input placeholders in method signatures.", ["Formal parameters", "Type declarations in parameter lists", "Multiple parameters"], ["Specify precise parameter contracts for methods"]),
                ("Arguments", "Passing actual values into methods during invocation.", ["Actual arguments", "Positional argument matching", "Type compatibility"], ["Pass correct arguments matching method parameter signatures"]),
                ("Return Values", "Returning results to the caller using the return keyword.", ["Return types (primitives, objects, arrays)", "return statement mechanics", "Unreachable code errors after return"], ["Design methods that compute and return values cleanly"]),
                ("void", "Methods that perform actions without returning a value.", ["void keyword", "Early return in void methods", "Side-effects vs pure functions"], ["Implement void action methods and apply early exit returns"]),
                ("Multiple Parameters", "Working with methods taking 2, 3, or more arguments.", ["Order importance of parameters", "Overly long parameter lists code smell", "Grouping parameters"], ["Coordinate multiple arguments cleanly in method calls"]),
                ("Method Scope", "Variable lifetime and isolation between methods.", ["Local variable isolation", "Shadowing instance variables", "Independent memory per call"], ["Protect method data through strict local scope isolation"]),
                ("Local Variables", "Stack allocation of method variables and default value rules.", ["Stack frame allocation", "Mandatory explicit initialization", "Destruction on method return"], ["Manage local variables safely without scope leakage"]),
                ("Method Calling", "How methods invoke other methods in sequence.", ["Caller and callee relationship", "Chained method invocations", "Flow of control"], ["Trace execution flow across multiple interconnected methods"]),
                ("Call Stack Mental Model", "How the JVM pushes and pops Stack Frames during execution.", ["Stack frame anatomy", "Pushing frames on method entry", "Popping frames on method return", "StackOverflowError intro"], ["Visualize call stack mechanics and trace execution state"]),
                ("Method Overloading", "Multiple methods with the same name but different parameter lists.", ["Overloading rules (number, types, order)", "Compile-time polymorphism", "Return type is NOT part of signature"], ["Design intuitive overloaded APIs with clean signatures"]),
                ("static Methods", "Class-level methods that run without an instantiated object.", ["static keyword", "Calling via ClassName.method()", "Static methods cannot access 'this' directly"], ["Decide when to use static utility methods vs instance methods"]),
                ("Pass-by-Value", "The foundational truth: Java is STRICTLY pass-by-value, always.", ["Pass-by-value concept", "Passing copies of primitive bits", "Why original primitive variables never change"], ["Explain why Java is strictly pass-by-value with zero exceptions"]),
                ("Java's Argument Passing Model", "Passing reference copies: mutating object state vs reassigning references.", ["Passing copies of reference addresses", "Mutating fields through reference copy", "Reassigning reference copy has no caller effect"], ["Master the subtle difference between mutating object state and reassigning references"]),
                ("Recursion Introduction", "Methods that call themselves: base case and recursive step.", ["Recursive mental model", "Mandatory base case to prevent infinite recursion", "Call stack growth in recursion"], ["Write simple, safe recursive methods for factorials and countdowns"]),
                ("Common Method Bugs", "Missing return statements, unreachable code, and signature mismatch.", ["Compiler error: missing return statement", "Unreachable code after return", "Ambiguous method call in overloading"], ["Diagnose and fix 5 common method declaration and calling errors"]),
                ("Practice", "Building a reusable mathematical and string utility library.", ["Implementing math functions (isPrime, gcd, power)", "Writing validation methods", "Unit testing methods manually"], ["Build a robust modular utility library from scratch"]),
                ("Interview Questions", "Top method questions asked in placement rounds.", ["Is Java pass-by-reference?", "Can we overload main() in Java?", "Why can't a static method call a non-static method directly?"], ["Answer core method architecture interview questions authoritatively"])
            ]
        },
        {
            "num": "08",
            "title": "Arrays",
            "slug": "arrays",
            "desc": "Fixed-size homogeneous collections, memory layout, indexing, algorithms, and 2D arrays.",
            "lessons": [
                ("What is an Array?", "Concept of contiguous memory holding multiple elements of the same type.", ["Contiguous memory allocation", "Fixed size property", "Homogeneous data elements"], ["Explain the architecture and purpose of array data structures"]),
                ("Array Memory Model", "Arrays as Heap objects: reference on Stack, elements in contiguous Heap slots.", ["Reference on Stack", "Array object on Heap", "Length metadata field"], ["Visualize array memory representation in Stack and Heap"]),
                ("Declaration & Initialization", "Three ways to declare and initialize arrays in Java.", ["Declaration (int[] arr)", "Allocation with new (new int[5])", "Array literal initialization ({1, 2, 3})"], ["Declare and allocate arrays using idiomatic Java syntax"]),
                ("Indexing", "Zero-based indexing, accessing elements, and array.length.", ["Zero-based indexing (0 to length - 1)", "Reading elements by index", "The length property"], ["Access elements safely using zero-based index offsets"]),
                ("Traversing Arrays", "Iterating through all elements using index-based for loops.", ["Standard for loop traversal", "Forward and backward traversal", "Step-by-step element processing"], ["Iterate through arrays forward and in reverse"]),
                ("for Loop + Arrays", "Accumulating totals, finding averages, and conditional updates.", ["Summing all numbers", "Calculating average", "Counting matching elements"], ["Perform aggregate calculations across array elements"]),
                ("Enhanced for", "The clean for-each loop syntax (for (Type item : array)).", ["for-each syntax", "Read-only traversal caveat", "Eliminating off-by-one errors"], ["Use enhanced for-each loops for clean, safe iteration"]),
                ("Updating Elements", "Modifying array values in-place by index.", ["In-place assignment (arr[i] = val)", "State persistence in Heap", "Overwriting values"], ["Update array elements safely without breaking bounds"]),
                ("Searching", "Linear search algorithm finding target elements and indices.", ["Linear search algorithm", "Early termination upon finding", "Returning -1 when not found"], ["Implement linear search and analyze its performance (O(N))"]),
                ("Min/Max", "Algorithms to find the smallest and largest numbers in an array.", ["Initializing max with arr[0]", "Comparison traversal", "Handling empty arrays"], ["Find minimum and maximum values in any array"]),
                ("Sum/Average", "Calculating totals and floating-point averages without truncation.", ["Accumulator pattern with arrays", "Casting sum to double for accurate average", "Precision preservation"], ["Compute accurate statistical sums and averages"]),
                ("Copying Arrays", "Shallow copies, System.arraycopy, and Arrays.copyOf.", ["Reference assignment vs data copying", "System.arraycopy native method", "Arrays.copyOf utility"], ["Create true independent copies of array data"]),
                ("Arrays Utility Class", "Using java.util.Arrays for toString, sort, binarySearch, and equals.", ["Arrays.toString() for readable printing", "Arrays.sort() for quick sorting", "Arrays.binarySearch()", "Arrays.equals()"], ["Leverage standard library Arrays utility methods effectively"]),
                ("Multidimensional Arrays", "Arrays of arrays: matrices, tables, and 2D grids.", ["2D array declaration (int[][] matrix)", "Rows and columns mental model", "Accessing matrix[row][col]"], ["Represent and traverse 2D grid structures with nested loops"]),
                ("Jagged Arrays", "Arrays with rows of different lengths.", ["Non-rectangular arrays", "Allocating rows independently", "Memory efficiency of jagged arrays"], ["Construct and traverse irregular jagged arrays"]),
                ("Common Array Errors", "Uninitialized elements default values, null references, and index mistakes.", ["Default values (0, 0.0, false, null)", "NullPointerException on uninstantiated arrays", "Fencepost errors"], ["Identify and avoid 5 common array runtime traps"]),
                ("ArrayIndexOutOfBoundsException", "Why this exception happens and how to permanently prevent it.", ["Negative index access", "Accessing index == length", "Boundary guard checks"], ["Diagnose and eliminate index out of bounds exceptions"]),
                ("Output Prediction", "Predicting outputs of array manipulations and reference copies.", ["Tracing reference aliasing", "In-place array modifications", "Passing arrays to methods"], ["Predict console output for array reference operations"]),
                ("Practice Problems", "Reversing an array, checking if sorted, and finding duplicates.", ["Array reversal algorithm", "Sorted verification algorithm", "Duplicate detection"], ["Solve classic algorithmic array interview problems"]),
                ("Interview Questions", "Top array questions asked in technical interviews.", ["Can an array change its size after creation in Java?", "Where are array elements stored in memory?", "What is the difference between length and length()?"], ["Answer technical array interview questions authoritatively"])
            ]
        },
        {
            "num": "09",
            "title": "Strings",
            "slug": "strings",
            "desc": "String immutability, String Constant Pool, core methods, StringBuilder, and performance.",
            "lessons": [
                ("What is a String?", "Strings as objects wrapping a sequence of characters.", ["String class in java.lang", "Object representation of text", "String vs char array"], ["Explain strings as first-class objects in Java"]),
                ("String Memory Model", "Stack reference pointing to Heap String object or String Pool entry.", ["Reference on Stack", "Object on Heap", "Internal byte[]/char[] value storage"], ["Diagram string memory allocation in Stack and Heap"]),
                ("String Literals", "Declaring strings with double quotes vs the 'new' keyword.", ["String literal syntax (\"text\")", "new String(\"text\") constructor", "Memory allocation differences"], ["Choose string literals over new String constructor for optimal memory"]),
                ("String Immutability", "Why Strings cannot be modified after creation: security, caching, thread-safety.", ["Immutability definition", "Why Java Strings are immutable", "Security in network connections and class loading"], ["Explain the profound reasons behind Java String immutability"]),
                ("== vs .equals()", "The most famous Java trap: reference equality vs character content equality.", ["== compares memory addresses", ".equals() compares character sequences", "Why == fails on new String()"], ["Always use .equals() for content comparison and never =="]),
                ("Common String Methods", "Overview of the rich java.lang.String API.", ["Exploring standard String API", "Method chaining", "Non-mutating return values"], ["Navigate and apply standard String utility methods"]),
                ("length()", "Getting the total number of characters in a string.", ["length() method", "Contrast with array.length", "Handling empty strings \"\""], ["Determine string lengths accurately in algorithms"]),
                ("charAt()", "Accessing characters at specific index positions.", ["Zero-based character indexing", "StringIndexOutOfBoundsException", "Character traversal loop"], ["Retrieve characters by index safely"]),
                ("substring()", "Extracting portions of a string with begin and end indices.", ["substring(beginIndex)", "substring(beginIndex, endIndex) exclusive boundary", "Extracting prefixes and suffixes"], ["Extract string slices with correct index boundaries"]),
                ("contains()", "Checking if a string contains a sequence of characters.", ["contains(CharSequence)", "Case sensitivity in search", "Boolean membership check"], ["Verify substring existence cleanly"]),
                ("startsWith() / endsWith()", "Validating file extensions, prefixes, protocols, and URLs.", ["startsWith(prefix)", "endsWith(suffix)", "URL and file path validation"], ["Validate string prefixes and extensions"]),
                ("indexOf()", "Finding the first or last occurrence index of a character or substring.", ["indexOf() and lastIndexOf()", "Returning -1 when not found", "Searching from specific start offsets"], ["Locate substring positions dynamically"]),
                ("replace()", "Replacing characters or character sequences.", ["replace(oldChar, newChar)", "replaceAll(regex)", "Original string remains unchanged"], ["Perform character and substring replacements safely"]),
                ("split()", "Splitting strings by delimiters into an array of tokens.", ["split(delimiter)", "Splitting by comma, space, or regex", "Parsing CSV strings"], ["Tokenize strings into structured arrays"]),
                ("trim() / strip()", "Removing leading and trailing whitespace characters.", ["trim() legacy ASCII whitespace", "strip() modern Unicode whitespace (Java 11+)", "Sanitizing user input"], ["Clean and sanitize user input strings"]),
                ("String Concatenation", "The + operator, String.concat(), and behind-the-scenes StringBuilder.", ["+ operator on strings", "Type conversion during concatenation", "Compiler optimization of string literals"], ["Concatenate strings effectively and avoid performance traps"]),
                ("StringBuilder", "Mutable character sequences for high-performance loops.", ["StringBuilder class", "append(), insert(), delete(), reverse()", "Why StringBuilder is faster in loops"], ["Use StringBuilder to construct strings in loops efficiently"]),
                ("StringBuffer", "Thread-safe synchronized alternative to StringBuilder.", ["StringBuffer synchronization", "Thread-safety guarantees", "Performance comparison with StringBuilder"], ["Distinguish when StringBuffer is needed vs StringBuilder"]),
                ("String Performance", "Memory churn, garbage collection pressure, and optimization.", ["String concatenation inside loops memory leak smell", "Benchmarking + vs StringBuilder", "String interning (intern())"], ["Write high-performance, memory-efficient string processing code"]),
                ("Common String Bugs", "NullPointerException on null strings, ignoring method return values, == traps.", ["Calling methods on null references", "Thinking str.toUpperCase() mutates str", "Comparison traps"], ["Identify and fix 5 common String bugs"]),
                ("Practice", "String reversal, palindrome check, anagram detection, and vowel counting.", ["Reversing strings with and without built-ins", "Palindrome verification algorithm", "Anagram verification"], ["Solve foundational String coding challenges"]),
                ("Interview Questions", "Master top interview questions on String Constant Pool and immutability.", ["What is the String Constant Pool and where is it located?", "Why is String final in Java?", "What does the intern() method do?"], ["Answer String memory and pool questions with complete confidence"])
            ]
        },
        {
            "num": "10",
            "title": "Exception Basics",
            "slug": "exception-basics",
            "desc": "Defensive programming, try-catch-finally, checked vs unchecked exceptions, and throw/throws.",
            "lessons": [
                ("What is an Exception?", "Unexpected runtime events disrupting normal program execution.", ["Normal flow vs exceptional flow", "Defensive programming mindset", "Why programs must handle errors gracefully"], ["Explain the purpose of exception handling in robust software"]),
                ("Errors vs Exceptions", "Comparing unrecoverable system failures with recoverable exceptions.", ["Throwable base class", "Error (OutOfMemoryError, StackOverflowError)", "Exception (recoverable conditions)"], ["Distinguish fatal system errors from recoverable exceptions"]),
                ("Exception Hierarchy", "Throwable → Exception → RuntimeException hierarchy tree.", ["Class hierarchy tree", "RuntimeException branch", "Checked exceptions branch"], ["Navigate the Java exception class hierarchy"]),
                ("try", "Enclosing risky operations inside a protected try block.", ["try block syntax", "Scope of variables declared inside try", "Transfer of control on exception"], ["Safely wrap error-prone operations in try blocks"]),
                ("catch", "Handling specific exception types and extracting error details.", ["catch parameter syntax", "getMessage() and printStackTrace()", "Graceful recovery strategies"], ["Catch and handle specific exceptions cleanly"]),
                ("finally", "Guaranteed cleanup block that executes whether an exception occurs or not.", ["finally block guarantees", "Closing resources (files, scanners)", "finally execution with return statements"], ["Ensure resource cleanup using finally blocks"]),
                ("Multiple Catch", "Catching different exception types in specific order.", ["Ordering from most specific subclass to most general superclass", "Unreachable catch block compiler error", "Multi-catch syntax (catch (A | B e))"], ["Structure multi-catch blocks correctly without unreachable catch errors"]),
                ("throw", "Manually throwing an exception when business validation fails.", ["throw keyword syntax", "Throwing IllegalArgumentException on invalid input", "Failing fast principle"], ["Throw appropriate exceptions when invalid states are detected"]),
                ("throws", "Declaring potential checked exceptions in method signatures.", ["throws keyword in method header", "Passing the handling responsibility to caller", "Documentation of failure modes"], ["Declare checked exceptions properly in method signatures"]),
                ("Checked Exceptions", "Compile-time verified exceptions that MUST be handled or declared.", ["Checked exception definition (IOException, SQLException)", "Mandatory try-catch or throws", "Design philosophy of checked exceptions"], ["Identify and properly handle checked exceptions"]),
                ("Unchecked Exceptions", "Runtime exceptions (subclasses of RuntimeException) caused by logic bugs.", ["Unchecked exception definition (NullPointerException, ArithmeticException)", "Why compiler does not force handling", "Fixing the bug vs catching unchecked exceptions"], ["Differentiate when to fix logic bugs vs when to catch exceptions"]),
                ("Common Java Exceptions", "NullPointerException, ArithmeticException, NumberFormatException, IndexOutOfBounds.", ["ArithmeticException (/ by zero)", "NullPointerException (the billion-dollar mistake)", "NumberFormatException (parsing invalid numbers)"], ["Diagnose and resolve the 5 most frequent Java exceptions"]),
                ("Creating Custom Exceptions", "Extending Exception or RuntimeException for domain errors.", ["Creating custom exception classes", "Inheriting constructors", "Meaningful business domain error messages"], ["Create clean, custom domain exception classes"]),
                ("Debugging Exception Stack Traces", "Reading stack traces from bottom to top to pinpoint root cause.", ["Stack trace structure", "Identifying source line number", "Caused by chained exceptions"], ["Read and debug real-world exception stack traces in seconds"]),
                ("Practice", "Building a resilient bank withdrawal validator with custom exceptions.", ["Input validation", "InsufficientFundsException", "Clean error feedback loop"], ["Build a fault-tolerant program with complete exception handling"]),
                ("Interview Questions", "Top exception handling questions in technical placement rounds.", ["Difference between final, finally, and finalize", "What happens if try has return and finally has return?", "Difference between throw and throws"], ["Answer exception architecture interview questions with mastery"])
            ]
        },
        {
            "num": "11",
            "title": "Packages, Imports & Access Control",
            "slug": "packages-and-access-control",
            "desc": "Code organization, package namespaces, import directives, and the 4 access modifier levels.",
            "lessons": [
                ("What is a Package?", "Namespace containers for organizing related classes and preventing naming collisions.", ["Namespaces in Java", "Directory structure matching package names", "Reverse domain naming convention (com.company.app)"], ["Organize classes into structured package namespaces"]),
                ("Creating Packages", "Declaring packages with the package keyword at the top of the file.", ["package declaration syntax", "Directory hierarchy alignment", "Compiling packages with javac -d ."], ["Create and compile multi-package Java applications"]),
                ("import", "Bringing classes from other packages into scope.", ["import package.ClassName", "Wildcard imports (import package.*)", "java.lang package automatic import"], ["Import external and standard library classes cleanly"]),
                ("Fully Qualified Names", "Using complete package.ClassName to resolve naming collisions.", ["Fully qualified class name syntax", "Resolving conflicting imports (e.g. java.util.Date vs java.sql.Date)", "When FQNs are required"], ["Disambiguate identical class names using fully qualified paths"]),
                ("public", "Unrestricted global access from any class in any package.", ["public modifier on classes", "public modifier on members", "API surface design"], ["Design public entry points and interfaces"]),
                ("private", "Restricting access strictly to the declaring class.", ["private modifier", "Information hiding principle", "Private helper methods"], ["Enforce strict encapsulation using private members"]),
                ("protected", "Access within the same package and by subclasses in other packages.", ["protected modifier", "Inheritance visibility", "Package-level access component"], ["Apply protected visibility for subclass extension"]),
                ("Package-Private", "Default access (no modifier) restricted strictly to classes in the same package.", ["Default modifier (package-private)", "Package-level encapsulation", "Internal implementation shielding"], ["Use package-private access to shield package internals"]),
                ("Access Across Packages", "Complete 4x4 matrix comparing public, protected, package-private, and private.", ["Visibility comparison matrix", "Class-level vs member-level access", "Enforcing architecture boundaries"], ["Master the complete Java access modifier visibility matrix"]),
                ("Naming Conventions", "Standard Java naming conventions for packages, classes, methods, and constants.", ["Package names: lowercase (com.learnbyself.core)", "Class names: PascalCase", "Method/Variable names: camelCase", "Constants: UPPER_SNAKE_CASE"], ["Follow industry-standard Java naming conventions consistently"]),
                ("Practice", "Structuring a multi-package modular library with proper visibility.", ["Creating core and utility packages", "Exposing only public APIs", "Hiding internal helper classes"], ["Architect a clean multi-package project structure"]),
                ("Interview Questions", "Top access modifier and package questions asked in technical interviews.", ["What is default access in Java?", "Can an outer class be declared private or protected?", "Why can't private methods be overridden?"], ["Answer package and visibility interview questions with total clarity"])
            ]
        },
        {
            "num": "12",
            "title": "Java Basics Mini Projects",
            "slug": "mini-projects",
            "desc": "Hands-on console applications integrating variables, operators, conditions, loops, methods, arrays, strings, and exceptions.",
            "lessons": [
                ("Calculator Console App", "Interactive arithmetic calculator with input validation and loop menus.", ["Menu-driven CLI loop", "Input validation", "Modular arithmetic methods"], ["Build a multi-operation console calculator application"]),
                ("Number Guessing Game", "Random number generation, counter tracking, and binary search hints.", ["java.util.Random", "Comparison logic (too high / too low)", "Attempt counter"], ["Implement an interactive number guessing game"]),
                ("ATM Console Application", "Simulating account balance, deposits, withdrawals, and PIN validation.", ["PIN authentication loop", "State management (balance)", "Transaction history array"], ["Build a realistic multi-feature ATM simulation"]),
                ("Student Marks Analyzer", "Reading student grades, computing statistics (average, highest, lowest), and grade report.", ["Array statistics algorithms", "Grade boundary classification", "Formatted report table"], ["Create a student grade reporting system"]),
                ("Billing System", "Item catalog, quantity calculation, discount tiers, and formatted receipts.", ["Arrays for catalog and pricing", "Discount conditional tiers", "Formatted receipt generation"], ["Develop a retail billing and receipt generator"]),
                ("Simple Password Validator", "Checking password rules: length, uppercase, lowercase, numbers, and special characters.", ["String character inspection", "Boolean validation flags", "Detailed rule feedback"], ["Build a robust password strength checking utility"]),
                ("Student Grade Manager", "Storing student records in parallel arrays and searching by student ID.", ["Parallel array data storage", "Linear search by ID", "Record updating and listing"], ["Create a complete in-memory student record manager"]),
                ("Console Quiz Game", "Multiple-choice interactive quiz runner with timer, scoring, and performance summary.", ["2D arrays / parallel arrays for questions and answers", "Interactive score tracking", "Final percentage evaluation"], ["Build an end-to-end interactive CLI quiz platform"])
            ]
        }
    ]

    all_sections = [
        {"id": "sec-basics", "slug": "basics", "title": "Java Basics", "orderIndex": 1, "summary": "Foundational programming from zero: syntax, variables, operators, conditionals, loops, methods, arrays, strings, and exceptions.", "isLocked": False, "totalModules": 12, "totalLessons": 187, "estimatedHours": 35},
        {"id": "sec-oop", "slug": "oop", "title": "Object-Oriented Programming (OOP)", "orderIndex": 2, "summary": "Classes, objects, constructors, encapsulation, inheritance, polymorphism, abstraction, interfaces, composition, and SOLID principles.", "isLocked": False, "totalModules": 7, "totalLessons": 26, "estimatedHours": 25},
        {"id": "sec-collections", "slug": "collections", "title": "Collections Framework", "orderIndex": 3, "summary": "List, Set, Map, Queue, Deque, Iterators, Comparable, and Comparator in depth.", "isLocked": True, "totalModules": 6, "totalLessons": 22, "estimatedHours": 20},
        {"id": "sec-generics", "slug": "generics", "title": "Generics & Type Safety", "orderIndex": 4, "summary": "Generic classes, methods, bounded type parameters, wildcards, and type erasure.", "isLocked": True, "totalModules": 4, "totalLessons": 14, "estimatedHours": 12},
        {"id": "sec-exception-handling", "slug": "exception-handling", "title": "Advanced Exception Handling", "orderIndex": 5, "summary": "Try-with-resources, AutoCloseable, suppressed exceptions, exception chaining, and enterprise resilience.", "isLocked": True, "totalModules": 4, "totalLessons": 12, "estimatedHours": 10},
        {"id": "sec-file-io", "slug": "file-io", "title": "File I/O & NIO.2", "orderIndex": 6, "summary": "File streams, readers/writers, serialization, Paths, Files, and high-performance NIO channel operations.", "isLocked": True, "totalModules": 5, "totalLessons": 16, "estimatedHours": 14},
        {"id": "sec-functional-java", "slug": "functional-java", "title": "Functional Programming & Lambdas", "orderIndex": 7, "summary": "Lambda expressions, functional interfaces (Function, Predicate, Consumer, Supplier), and method references.", "isLocked": True, "totalModules": 4, "totalLessons": 15, "estimatedHours": 12},
        {"id": "sec-streams", "slug": "streams", "title": "Stream API", "orderIndex": 8, "summary": "Intermediate operations, terminal operations, collectors, parallel streams, and stream performance.", "isLocked": True, "totalModules": 5, "totalLessons": 18, "estimatedHours": 15},
        {"id": "sec-multithreading", "slug": "multithreading", "title": "Multithreading & Concurrency", "orderIndex": 9, "summary": "Threads, synchronization, locks, volatile, ThreadPools, ExecutorService, and java.util.concurrent.", "isLocked": True, "totalModules": 6, "totalLessons": 22, "estimatedHours": 22},
        {"id": "sec-jvm-memory", "slug": "jvm-memory", "title": "JVM Architecture & Memory Internals", "orderIndex": 10, "summary": "Class loaders, bytecode execution, Heap vs Stack, Garbage Collection algorithms, and JIT compilation.", "isLocked": True, "totalModules": 5, "totalLessons": 16, "estimatedHours": 15},
        {"id": "sec-jdbc-sql", "slug": "jdbc-sql", "title": "Database Programming with JDBC & SQL", "orderIndex": 11, "summary": "Relational databases, SQL querying, JDBC connections, PreparedStatements, transactions, and connection pools.", "isLocked": True, "totalModules": 5, "totalLessons": 18, "estimatedHours": 18},
        {"id": "sec-spring", "slug": "spring", "title": "Spring Framework Core", "orderIndex": 12, "summary": "Dependency Injection, Inversion of Control, Spring Beans, ApplicationContext, and Spring AOP.", "isLocked": True, "totalModules": 5, "totalLessons": 16, "estimatedHours": 18},
        {"id": "sec-spring-boot", "slug": "spring-boot", "title": "Spring Boot Microservices", "orderIndex": 13, "summary": "Auto-configuration, Spring Initializr, embedded servers, application properties, and actuator.", "isLocked": True, "totalModules": 6, "totalLessons": 20, "estimatedHours": 22},
        {"id": "sec-rest-apis", "slug": "rest-apis", "title": "REST API Development", "orderIndex": 14, "summary": "HTTP methods, status codes, request/response DTOs, validation, error handling, and Swagger/OpenAPI.", "isLocked": True, "totalModules": 5, "totalLessons": 16, "estimatedHours": 16},
        {"id": "sec-backend-engineering", "slug": "backend-engineering", "title": "Enterprise Backend Engineering", "orderIndex": 15, "summary": "Layered architecture (Controller-Service-Repository), Spring Data JPA, caching, and security basics.", "isLocked": True, "totalModules": 6, "totalLessons": 20, "estimatedHours": 24},
        {"id": "sec-dsa", "slug": "dsa", "title": "Data Structures & Algorithms in Java", "orderIndex": 16, "summary": "Big-O notation, recursion, sorting/searching, linked lists, trees, graphs, and placement problem patterns.", "isLocked": True, "totalModules": 8, "totalLessons": 35, "estimatedHours": 40},
        {"id": "sec-projects", "slug": "projects", "title": "Capstone Projects", "orderIndex": 17, "summary": "End-to-end fullstack and backend projects ready for GitHub showcase.", "isLocked": True, "totalModules": 6, "totalLessons": 20, "estimatedHours": 25},
        {"id": "sec-interview-prep", "slug": "interview-prep", "title": "Technical Interview Preparation", "orderIndex": 18, "summary": "Top questions, live coding rounds, system design patterns, and mock interviews.", "isLocked": True, "totalModules": 5, "totalLessons": 25, "estimatedHours": 20}
    ]

    # Build detailed modules for basics
    basics_modules = []
    lesson_counter = 0

    for m_idx, mod_raw in enumerate(basics_modules_raw, 1):
        mod_slug = mod_raw["slug"]
        mod_id = f"mod-{mod_slug}"
        mod_lessons = []

        for l_idx, (l_title, l_summary, subtopics, outcomes) in enumerate(mod_raw["lessons"], 1):
            lesson_counter += 1
            l_slug = slugify(l_title)
            l_id = f"les-{mod_slug}-{l_slug}"

            # Prerequisite: prior lesson if within same module, or last lesson of previous module
            prereqs = []
            if l_idx > 1:
                prereqs.append(f"les-{mod_slug}-{slugify(mod_raw['lessons'][l_idx-2][0])}")
            elif m_idx > 1:
                prev_mod = basics_modules_raw[m_idx-2]
                prereqs.append(f"les-{prev_mod['slug']}-{slugify(prev_mod['lessons'][-1][0])}")

            # Assign practice / interview categories based on lesson title/module
            practice_cats = ["mcq"]
            if any(k in l_title.lower() for k in ["bug", "error", "debugging", "pitfall"]):
                practice_cats.append("debugging")
            if any(k in l_title.lower() for k in ["output", "prediction", "dry run"]):
                practice_cats.append("output_prediction")
            if any(k in l_title.lower() for k in ["program", "practice", "calculator", "game", "validator", "analyzer", "manager", "app"]):
                practice_cats.append("coding")

            interview_cats = ["java_basics"]
            if "interview" in l_title.lower():
                interview_cats.extend(["placement_core", "frequently_asked"])
            if any(k in l_title.lower() for k in ["jvm", "bytecode", "memory", "stack", "pass-by-value", "immutability"]):
                interview_cats.append("jvm_internals")

            diff = "beginner"
            if m_idx in [1, 2, 3, 4] and l_idx <= 10:
                diff = "beginner"
            elif m_idx in [5, 6, 7, 8, 9] or l_idx > 10:
                diff = "easy"
            if m_idx in [10, 11] or "project" in mod_slug:
                diff = "medium"

            est_min = 15
            if "project" in mod_slug:
                est_min = 35
            elif "practice" in l_title.lower() or "interview" in l_title.lower():
                est_min = 20

            mod_lessons.append({
                "id": l_id,
                "slug": l_slug,
                "sectionSlug": "basics",
                "moduleSlug": mod_slug,
                "title": l_title,
                "summary": l_summary,
                "orderIndex": l_idx,
                "difficulty": diff,
                "estimatedMinutes": est_min,
                "subtopics": subtopics,
                "learningOutcomes": outcomes,
                "prerequisites": prereqs,
                "practiceCategories": practice_cats,
                "interviewCategories": interview_cats,
                "isCompleted": False
            })

        basics_modules.append({
            "id": mod_id,
            "slug": mod_slug,
            "sectionSlug": "basics",
            "title": mod_raw["title"],
            "description": mod_raw["desc"],
            "orderIndex": m_idx,
            "estimatedMinutes": sum(l["estimatedMinutes"] for l in mod_lessons),
            "isLocked": False if m_idx == 1 else False,
            "progressPercent": 0,
            "prerequisites": [f"mod-{basics_modules_raw[m_idx-2]['slug']}"] if m_idx > 1 else [],
            "learningObjectives": [
                f"Master all core concepts of {mod_raw['title']}",
                f"Solve hands-on practice problems in {mod_raw['title']}",
                f"Prepare for placement interview questions on {mod_raw['title']}"
            ],
            "lessons": mod_lessons
        })

    # Put modules in Section 1 (Basics)
    all_sections[0]["modules"] = basics_modules
    for sec in all_sections[1:]:
        sec["modules"] = []

    course_data = {
        "id": "course-java-core",
        "slug": "java",
        "languageSlug": "java",
        "schemaVersion": "2.0.0",
        "title": "Java Programming",
        "headline": "Learn Java step-by-step from zero to enterprise-grade placement readiness. Build strong mental models, write clean code, and practice interactively.",
        "summary": "Comprehensive 17-section curriculum designed for self-learners to master Java, OOP, Spring Boot, DSA, and technical interviews.",
        "level": "beginner",
        "estimatedHours": sum(s["estimatedHours"] for s in all_sections),
        "learningPathOrder": 1,
        "progressPercent": 5,
        "prerequisites": ["None — Starts from ground zero"],
        "outcomes": [
            "Write clean, idiomatic Java applying OOP and modern design principles",
            "Understand JVM memory, stack, heap, and garbage collection internals",
            "Build production-grade REST APIs and microservices with Spring Boot",
            "Solve data structure and algorithmic coding challenges with confidence",
            "Ace placement and software engineering technical interview rounds"
        ],
        "sections": all_sections
    }

    # Write data/curriculum/java/course.json
    os.makedirs("data/curriculum/java", exist_ok=True)
    with open("data/curriculum/java/course.json", "w", encoding="utf-8") as f:
        json.dump(course_data, f, indent=2)

    # Write data/curriculum/java/basics/manifest.json
    os.makedirs("data/curriculum/java/basics", exist_ok=True)
    basics_manifest = {
        "sectionId": "sec-basics",
        "sectionSlug": "basics",
        "title": "Java Basics",
        "schemaVersion": "2.0.0",
        "totalModules": len(basics_modules),
        "totalLessons": sum(len(m["lessons"]) for m in basics_modules),
        "estimatedMinutes": sum(m["estimatedMinutes"] for m in basics_modules),
        "modules": basics_modules
    }
    with open("data/curriculum/java/basics/manifest.json", "w", encoding="utf-8") as f:
        json.dump(basics_manifest, f, indent=2)

    print(f"Generated Java curriculum with {len(all_sections)} sections.")
    print(f"Section 'Java Basics' generated with {len(basics_modules)} modules and {lesson_counter} lessons.")

if __name__ == "__main__":
    create_curriculum()
