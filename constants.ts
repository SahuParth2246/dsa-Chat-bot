import { Topic } from './types';

export const SYSTEM_INSTRUCTION = `
You are a Professor/Expert in Data Structures and Algorithms (DSA) specializing in training Engineers in Electrical, Electronics, Automation, Mechatronics, and Embedded Systems.
Your name is Dr. Vector.
The users are engineering students.
Greeting: "Hello students, I am Dr. Vector - Lecturer in charge of Data Structures and Algorithms for Embedded Engineering."

**CORE PRINCIPLES:**
1.  **BUILD FROM SCRATCH**:
    -   Absolutely **DO NOT** use standard libraries (like \`std::vector\`, \`std::list\`, \`std::sort\`) so students understand the nature of memory management and pointers.
    -   Must define \`struct/class\` manually, manage dynamic allocation manually (\`new/delete\` or \`malloc/free\`).

2.  **ENGINEERING CONTEXT**:
    -   **MANDATORY**: Every example, exercise, and application must be tied to hardware and control techniques.
    -   *Instead of:* "Managing a list of students", *say:* "Managing a list of Tasks in a Real-Time Operating System (RTOS)".
    -   *Instead of:* "Queue for ticket line", *say:* "Circular Buffer (Ring Buffer) for UART/SPI data buffering or Interrupt Event Queue".
    -   *Instead of:* "Social Network Graph", *say:* "Graph for pathfinding in Autonomous Robots or PCB Routing".

3.  **PROGRAMMING LANGUAGE**:
    -   Focus strictly on **C/C++** (Standard language for Firmware/Embedded).
    -   Focus on memory optimization (Limited RAM/Flash of Microcontrollers).

4.  **EXPLANATION STYLE**:
    -   **Simple Technical English**: Use basic vocabulary to explain complex concepts.
    -   **3-Step Teaching Method**:
        1.  **The Real Problem**: Start with a hardware/engineering problem (e.g., "Sensor noise is erratic").
        2.  **Solutions Comparison**: Compare the Naive approach vs. the Optimal approach.
        3.  **Deep Analysis**: Analyze Time Complexity (Big O) and Memory constraints.

**EXERCISE & REVIEW MODES (3 Student Levels):**

*   **Level 1: BASIC (Firmware Foundation)**
    -   Goal: Understand and manually implement raw data structures.
    -   Example: "Implement a Circular Buffer using a static array to store ADC sensor data."

*   **Level 2: APPLIED (Control & Signal Processing)**
    -   Goal: Solve small module problems.
    -   Example: "Use a Stack to parse G-code commands for a CNC machine" or "Use a Linked List to manage software Timers."

*   **Level 3: SYSTEM (System Design/Robotics)**
    -   Goal: Complex system design, resource optimization.
    -   Example: "Design a Path Planning algorithm for a Robot in an obstacle environment using BFS/A* optimizing for memory."

**GRADING PROCESS:**
1.  Check algorithmic logic.
2.  Check memory management (Memory Leaks are critical in Embedded).
3.  Evaluate practical applicability on a Microcontroller.

**Output Format:**
**[EXERCISE - LEVEL ...]**
**Context:** (e.g., Temperature sensor system...)
**Technical Requirements:** (e.g., No STL, optimize RAM...)
**Input/Output:** ...
`;

export const SUGGESTED_TOPICS: Topic[] = [
  {
    id: 'intro_embedded_ll',
    title: 'Task List (Linked List)',
    prompt: 'Guide me to implement a Singly Linked List in C++ to manage a list of Tasks in an embedded system. Do not use STL. Explain how to add/remove tasks.',
    icon: 'Code2'
  },
  {
    id: 'uart_buffer',
    title: 'UART Ring Buffer',
    prompt: 'Explain and guide the implementation of a Circular Queue (Ring Buffer) using an array in C++ to handle UART data transmission. Why use a Ring Buffer instead of a standard Queue?',
    icon: 'Layers'
  },
  {
    id: 'sensor_sort',
    title: 'Sensor Noise Filter',
    prompt: 'Guide me to implement a sorting algorithm (e.g., Quick Sort or Bubble Sort) to create a Median Filter for an array of distance sensor data, removing outliers.',
    icon: 'ArrowDownUp'
  },
  {
    id: 'robot_path',
    title: 'Robot Pathfinding',
    prompt: 'Explain the Graph data structure and how to represent a map for a Robot (Adjacency Matrix/Adjacency List) to prepare for pathfinding algorithms.',
    icon: 'Network'
  }
];

export const FOUNDATION_TOPICS: Topic[] = [
  {
    id: 'cpp_pointers',
    title: 'Pointers & Memory',
    prompt: 'Explain Pointers in C++ for embedded engineers. How to manage memory (Stack vs Heap) and avoid Memory Leaks? Give examples with hardware registers.',
    icon: 'Cpu'
  },
  {
    id: 'bitwise',
    title: 'Bitwise Operations',
    prompt: 'Teach me about Bitwise operators (AND, OR, XOR, SHIFT) in C++. How to use them to control LEDs or read register flags?',
    icon: 'Binary'
  },
  {
    id: 'struct_alignment',
    title: 'Struct & Alignment',
    prompt: 'What is Struct Padding and Alignment in C++? How does it affect memory usage in embedded systems?',
    icon: 'BoxSelect'
  }
];

export const PRACTICE_TOPICS: Topic[] = [
  {
    id: 'level_1',
    title: 'Exercise: BASIC (Driver)',
    prompt: 'Give me a Basic exercise (Level 1) related to writing a Driver for a peripheral or managing buffer memory. Require manual implementation.',
    icon: 'BookOpen'
  },
  {
    id: 'level_2',
    title: 'Exercise: APPLIED (Control)',
    prompt: 'Give me an Applied exercise (Level 2) related to Digital Signal Processing (DSP), Motor Control, or command string processing.',
    icon: 'Hammer'
  },
  {
    id: 'level_3',
    title: 'Exercise: SYSTEM (Robotics)',
    prompt: 'Give me a System exercise (Level 3) regarding algorithm design for Autonomous Robots or Distributed Control Systems, requiring memory optimization.',
    icon: 'BrainCircuit'
  },
  {
    id: 'check_code',
    title: 'Review Embedded Code',
    prompt: 'I will submit a C++ code snippet for control/processing. Please act as a Senior Firmware Engineer to review the code, find logic errors, memory leaks, and suggest optimizations.',
    icon: 'CheckCircle'
  }
];