const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
};

export const GenerateCourseLayout_AI = model.startChat({
    generationConfig,
    history: [
        {
            role: "user",
            parts: [
                { text: "Generate A Course Tutorial on the Following Detail with field as Course Name, Description, Along with Chapter Name, about, Duration:  Category: 'Programming', Topic: 'Python', Level: Basic, Duration: 1 hour, NoOfChapters: 5, in JSON Format." },
            ],
        },
        {
            role: "model",
            parts: [
                { text: "```json\n{\n  \"course\": {\n    \"courseName\": \"Introduction to Python Programming\",\n    \"description\": \"This course provides a beginner-friendly introduction to Python programming. You'll learn the fundamental concepts and syntax of Python, enabling you to write simple programs and understand basic programming logic.\",\n    \"category\": \"Programming\",\n      \"topic\": \"Python\",\n      \"level\": \"Basic\",\n    \"duration\": \"1 hour\",\n     \"noOfChapters\": 5,\n    \"chapters\": [\n      {\n        \"chapterName\": \"Chapter 1: Getting Started with Python\",\n        \"about\": \"This chapter covers the basics of setting up your Python environment and writing your first program. You will learn how to install Python and a suitable code editor, as well as how to run basic Python code.\",\n        \"duration\": \"10 minutes\"\n      },\n      {\n        \"chapterName\": \"Chapter 2: Variables and Data Types\",\n        \"about\": \"In this chapter, you will learn about variables and different data types in Python, such as integers, floats, strings, and booleans. You'll also explore how to use operators with these data types.\",\n        \"duration\": \"15 minutes\"\n      },\n        {\n        \"chapterName\": \"Chapter 3: Basic Input and Output\",\n        \"about\": \"This chapter focuses on how to interact with the user by getting input and displaying output using Python's built-in functions like `input()` and `print()`.\",\n         \"duration\": \"15 minutes\"\n      },\n        {\n        \"chapterName\": \"Chapter 4: Control Flow with Conditionals\",\n         \"about\": \"Here, you will learn about conditional statements (if, elif, else) which allow your program to execute different code blocks depending on specific conditions.\",\n         \"duration\": \"10 minutes\"\n      },\n      {\n        \"chapterName\": \"Chapter 5: Introduction to Loops\",\n         \"about\": \"This chapter introduces basic looping structures, such as for loops and while loops, which allow you to repeat actions. You'll learn how and when to use these.\",\n        \"duration\": \"20 minutes\"\n      }\n    ]\n  }\n}\n```\n" },
            ],
        },
    ],
});

export const GenerateChapterContent_AI = model.startChat({
    generationConfig,
    history: [
        {
            role: "user",
            parts: [
                { text: "Explain the concept in Detail on Topic: Python, Chapter: Chapter 1: Data Structures in Python, in JSON Format with list of array with field as title, explanation on given chapter in detail, Code Example (Code field in <precode> format) if applicable.\n\n" },
            ],
        },
        {
            role: "model",
            parts: [
                { text: "```json\n{\n  \"chapter\": {\n    \"title\": \"Chapter 1: Data Structures in Python\",\n    \"sections\": [\n      {\n        \"title\": \"Introduction to Data Structures\",\n        \"explanation\": \"Data structures are fundamental building blocks in programming that organize and store data in a specific way. The choice of data structure significantly impacts the efficiency of algorithms. Python offers built-in data structures that cater to various needs, along with the flexibility to create custom ones. This chapter will explore the core built-in data structures in Python.\",\n        \"code_example\": null\n      },\n      {\n        \"title\": \"Lists\",\n        \"explanation\": \"Lists are ordered, mutable (changeable) collections of items. They can contain items of different data types (integers, strings, other lists, etc.). Lists are defined using square brackets `[]`. They support various operations like appending, inserting, removing, slicing, and iterating.\",\n        \"code_example\": {\n            \"description\": \"Examples of list creation and operations\",\n            \"code\": \"<precode>\\n# Creating a list\\nmy_list = [1, 2, 'apple', 3.14, [4, 5]]\\nprint(my_list)\\n\\n# Accessing elements (indexing)\\nprint(my_list[0])   # Output: 1\\nprint(my_list[2])   # Output: apple\\nprint(my_list[-1])  # Output: [4, 5] (last element)\\n\\n# Modifying elements\\nmy_list[1] = 10\\nprint(my_list) # Output: [1, 10, 'apple', 3.14, [4, 5]]\\n\\n# Adding elements\\nmy_list.append(6)\\nprint(my_list) # Output: [1, 10, 'apple', 3.14, [4, 5], 6]\\n\\nmy_list.insert(2, 'banana')\\nprint(my_list) # Output: [1, 10, 'banana', 'apple', 3.14, [4, 5], 6]\\n\\n# Removing elements\\nmy_list.remove('apple')\\nprint(my_list) # Output: [1, 10, 'banana', 3.14, [4, 5], 6]\\n\\npopped_item = my_list.pop(3)\\nprint(popped_item) # Output: 3.14\\nprint(my_list)   # Output: [1, 10, 'banana', [4, 5], 6]\\n\\n# Slicing\\nprint(my_list[1:4]) # Output: [10, 'banana', [4, 5]]\\n\\n# Iterating over a list\\nfor item in my_list:\\n    print(item)\\n\\n# List length\\nprint(len(my_list)) # Output: 5\\n</precode>\"\n        }\n      },\n      {\n        \"title\": \"Tuples\",\n        \"explanation\": \"Tuples are ordered, immutable (unchangeable) collections of items. Similar to lists, they can contain items of different types. Tuples are defined using parentheses `()`. Immutability ensures that data remains consistent. They are often used for representing fixed records or when data integrity is critical.\",\n        \"code_example\": {\n             \"description\": \"Examples of tuple creation and operations\",\n             \"code\": \"<precode>\\n# Creating a tuple\\nmy_tuple = (1, 2, 'apple', 3.14)\\nprint(my_tuple)\\n\\n# Accessing elements (indexing)\\nprint(my_tuple[0])   # Output: 1\\nprint(my_tuple[2])   # Output: apple\\n\\n# Tuple packing and unpacking\\nx, y, z, w = my_tuple\\nprint(x,y,z,w) # Output: 1 2 apple 3.14\\n\\n# Attempting to modify a tuple (will raise an error)\\n# my_tuple[0] = 10 # This will cause a TypeError\\n\\n# Tuple concatenation\\ntuple1 = (1, 2)\\ntuple2 = (3, 4)\\ncombined_tuple = tuple1 + tuple2\\nprint(combined_tuple) # Output: (1, 2, 3, 4)\\n\\n# Length of a tuple\\nprint(len(my_tuple))  # Output: 4\\n\\n# Count occurrences of an item\\nmy_tuple_repeated = (1, 2, 1, 3)\\nprint(my_tuple_repeated.count(1)) # Output: 2\\n</precode>\"\n        }\n      },\n      {\n        \"title\": \"Sets\",\n        \"explanation\": \"Sets are unordered collections of unique items. They do not allow duplicate values. Sets are defined using curly braces `{}` or the `set()` constructor. They are primarily used for membership testing, removing duplicates, and performing set operations like union, intersection, and difference.\",\n        \"code_example\": {\n          \"description\":\"Examples of set creation and operations\",\n          \"code\": \"<precode>\\n# Creating a set\\nmy_set = {1, 2, 3, 4, 2}  # Duplicates are automatically removed\\nprint(my_set) # Output: {1, 2, 3, 4}\\n\\nmy_set2 = set([1, 2, 3, 4, 4, 5])\\nprint(my_set2) # Output: {1, 2, 3, 4, 5}\\n\\n# Adding and removing elements\\nmy_set.add(5)\\nprint(my_set) # Output: {1, 2, 3, 4, 5}\\n\\nmy_set.remove(3)\\nprint(my_set) # Output: {1, 2, 4, 5}\\n\\n# Set operations\\nset1 = {1, 2, 3}\\nset2 = {3, 4, 5}\\n\\nunion_set = set1 | set2 # or set1.union(set2)\\nprint(union_set) # Output: {1, 2, 3, 4, 5}\\n\\nintersection_set = set1 & set2 # or set1.intersection(set2)\\nprint(intersection_set) # Output: {3}\\n\\ndifference_set = set1 - set2 # or set1.difference(set2)\\nprint(difference_set) # Output: {1, 2}\\n\\n# Membership testing\\nprint(2 in my_set) # Output: True\\nprint(6 in my_set) # Output: False\\n</precode>\"\n        }\n      },\n      {\n        \"title\": \"Dictionaries\",\n        \"explanation\": \"Dictionaries are unordered collections of key-value pairs. Keys must be unique and immutable (strings, numbers, or tuples). Dictionaries are defined using curly braces `{}` with key-value pairs separated by colons `:`. They provide efficient lookup of values based on their associated keys. They are highly versatile for representing mappings and associations.\",\n        \"code_example\": {\n            \"description\": \"Examples of dictionary creation and operations\",\n            \"code\": \"<precode>\\n# Creating a dictionary\\nmy_dict = {'name': 'Alice', 'age': 30, 'city': 'New York'}\\nprint(my_dict)\\n\\n# Accessing values\\nprint(my_dict['name'])  # Output: Alice\\nprint(my_dict.get('age'))  # Output: 30\\nprint(my_dict.get('country', 'Unknown')) # Output: Unknown (default value if key doesn't exist)\\n\\n# Modifying values\\nmy_dict['age'] = 31\\nprint(my_dict) # Output: {'name': 'Alice', 'age': 31, 'city': 'New York'}\\n\\n# Adding new key-value pairs\\nmy_dict['occupation'] = 'Engineer'\\nprint(my_dict) # Output: {'name': 'Alice', 'age': 31, 'city': 'New York', 'occupation': 'Engineer'}\\n\\n# Removing elements\\npopped_value = my_dict.pop('city')\\nprint(popped_value) # Output: New York\\nprint(my_dict) # Output: {'name': 'Alice', 'age': 31, 'occupation': 'Engineer'}\\n\\ndel my_dict['occupation']\\nprint(my_dict) # Output: {'name': 'Alice', 'age': 31}\\n\\n# Iterating over a dictionary\\nfor key, value in my_dict.items():\\n    print(key, ':', value)\\n\\n# Getting all keys\\nprint(my_dict.keys())\\n\\n# Getting all values\\nprint(my_dict.values())\\n</precode>\"\n         }\n      },\n       {\n        \"title\": \"Conclusion\",\n        \"explanation\": \"Understanding these fundamental data structures is crucial for writing efficient and effective Python code. Each structure has its strengths and weaknesses, making it suitable for different tasks. Choosing the appropriate data structure for a given problem is an important skill in software development. In the following chapters, we'll delve deeper into using these structures with algorithms and exploring more advanced data structures.\",\n         \"code_example\": null\n      }\n\n    ]\n  }\n}\n```\n" },
            ],
        },
    ],
});

// const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
// console.log(result.response.text());
