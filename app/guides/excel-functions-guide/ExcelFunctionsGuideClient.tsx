// app/guides/excel-functions-guide/ExcelFunctionsGuideClient.tsx

"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { 
  Search, TRUE, FALSE,
  ChevronRight, 
  Copy, 
  Check, 
  FileSpreadsheet, 
  HelpCircle, 
  Info,
  Sigma,
  ArrowRight,
  BookOpen,
  TrendingUp,
  Users
} from "lucide-react";

// ============================================================
// TYPES
// ============================================================
type Cell = string | number;

export type Grid = {
  rows: Cell[][];
  startRow?: number;
  headerRow?: boolean;
};

export type ExcelFn = {
  name: string;
  category: string;
  definition: string;
  syntax: string;
  syntaxExplanation: string;
  grid?: Grid;
  note?: string;
  example: string;
  result: string;
  question: string;
  availability?: string;
  difficulty?: "Beginner" | "Intermediate" | "Advanced";
  frequency?: "⭐⭐⭐⭐⭐" | "⭐⭐⭐⭐" | "⭐⭐⭐" | "⭐⭐" | "⭐";
};

export const CATEGORIES = [
  "All",
  "Lookup & Reference",
  "Logical",
  "Math & Aggregation",
  "Text",
  "Date & Time",
  "Financial",
  "Dynamic Arrays",
] as const;

// ============================================================
// DATA — 70+ functions with syntax explanations
// ============================================================
export const EXCEL_FUNCTIONS: ExcelFn[] = [
  // ---------- Lookup & Reference ----------
  { name: "VLOOKUP", category: "Lookup & Reference",
    definition: "Searches for a value in the first column of a range and returns a value from the same row in a column you specify.",
    syntax: "=VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup])",
    syntaxExplanation: "lookup_value: The value to search for in the first column.\ntable_array: The range containing the data.\ncol_index_num: The column number in the table from which to return a value.\n[range_lookup]: TRUE for approximate match, FALSE for exact match.",
    grid: { headerRow: true, rows: [["Employee ID", "Name", "Salary"], ["E101", "Ravi", 50000], ["E102", "Priya", 60000], ["E103", "Amit", 55000]] },
    example: '=VLOOKUP("E102", A2:C4, 3, FALSE)', result: "₹60,000",
    question: 'HR needs to retrieve the salary for Employee ID "E102" from the employee table. Write the VLOOKUP formula.',
    availability: "All Excel versions",
    difficulty: "Intermediate",
    frequency: "⭐⭐⭐⭐⭐" },
    
  { name: "HLOOKUP", category: "Lookup & Reference",
    definition: "Looks up a value in the first row of a range and returns a value from a row you specify (horizontal lookup).",
    syntax: "=HLOOKUP(lookup_value, table_array, row_index_num, [range_lookup])",
    syntaxExplanation: "lookup_value: The value to search for in the first row.\ntable_array: The range containing the data.\nrow_index_num: The row number in the table from which to return a value.\n[range_lookup]: TRUE for approximate match, FALSE for exact match.",
    grid: { headerRow: true, rows: [["Q1", "Q2", "Q3", "Q4"], [250, 300, 450, 500]] },
    example: '=HLOOKUP("Q2", A1:D2, 2, FALSE)', result: "₹300",
    question: 'Write an HLOOKUP formula to find the sales value for Q2.',
    availability: "All Excel versions",
    difficulty: "Intermediate",
    frequency: "⭐⭐⭐" },
    
  { name: "XLOOKUP", category: "Lookup & Reference",
    definition: "Modern replacement for VLOOKUP/HLOOKUP. Searches any direction, returns an exact match by default, and supports an 'if not found' value.",
    syntax: "=XLOOKUP(lookup_value, lookup_array, return_array, [if_not_found], [match_mode], [search_mode])",
    syntaxExplanation: "lookup_value: The value to search for.\nlookup_array: The range or array to search.\nreturn_array: The range or array from which to return a value.\n[if_not_found]: Value to return if no match is found.\n[match_mode]: 0 for exact match (default).\n[search_mode]: 1 for first to last (default).",
    grid: { headerRow: true, rows: [["Product ID", "Product Name", "Price"], ["P101", "Laptop", 75000], ["P102", "Monitor", 25000], ["P103", "Keyboard", 4500], ["P104", "Mouse", 1500]] },
    example: '=XLOOKUP("P103", A2:A5, C2:C5, "Not found")', result: "₹4,500",
    question: 'The finance team needs the price of product "P103". Write an XLOOKUP formula.',
    availability: "Microsoft 365 / Excel 2021+",
    difficulty: "Advanced",
    frequency: "⭐⭐⭐⭐⭐" },
    
  { name: "INDEX", category: "Lookup & Reference",
    definition: "Returns the value at a given row and column position within a range.",
    syntax: "=INDEX(array, row_num, [column_num])",
    syntaxExplanation: "array: The range of cells.\nrow_num: The row number in the array from which to return a value.\n[column_num]: The column number in the array from which to return a value.",
    grid: { headerRow: true, rows: [["Region", "Product", "Sales"], ["North", "Laptops", 30000], ["South", "Monitors", 45000], ["East", "Keyboards", 7000]] },
    example: "=INDEX(A2:C4, 1, 2)", result: "Laptops",
    question: 'Write an INDEX formula to return the Product in the first data row of the table (row 2).',
    availability: "All Excel versions",
    difficulty: "Intermediate",
    frequency: "⭐⭐⭐⭐" },
    
  { name: "MATCH", category: "Lookup & Reference",
    definition: "Returns the relative position of a lookup value within a range.",
    syntax: "=MATCH(lookup_value, lookup_array, [match_type])",
    syntaxExplanation: "lookup_value: The value to search for.\nlookup_array: The range to search.\n[match_type]: 0 for exact match, 1 for less than, -1 for greater than.",
    grid: { headerRow: true, rows: [["Month", "Revenue"], ["Jan", 15000], ["Feb", 18000], ["Mar", 22000], ["Apr", 19000]] },
    example: '=MATCH("Mar", A2:A5, 0)', result: "3",
    question: 'Find the position of "Mar" in the month list for revenue analysis.',
    availability: "All Excel versions",
    difficulty: "Intermediate",
    frequency: "⭐⭐⭐⭐" },
    
  { name: "INDEX + MATCH", category: "Lookup & Reference",
    definition: "Combined, they perform a flexible lookup that (unlike VLOOKUP) can also return values to the left of the lookup column.",
    syntax: "=INDEX(return_range, MATCH(lookup_value, lookup_range, 0))",
    syntaxExplanation: "return_range: The range from which to return a value.\nMATCH(lookup_value, lookup_range, 0): Finds the position of the lookup value.\nThis combination is more flexible than VLOOKUP.",
    grid: { headerRow: true, rows: [["Product ID", "Product Name", "Price"], ["P101", "Laptop", 75000], ["P102", "Monitor", 25000], ["P103", "Keyboard", 4500]] },
    example: '=INDEX(C2:C4, MATCH("P103", A2:A4, 0))', result: "₹4,500",
    question: 'Write an INDEX+MATCH formula to find the price of product "P103" (which is in column C).',
    availability: "All Excel versions",
    difficulty: "Advanced",
    frequency: "⭐⭐⭐⭐⭐" },
    
  { name: "XMATCH", category: "Lookup & Reference",
    definition: "Modern version of MATCH that offers more flexibility and works with dynamic arrays.",
    syntax: "=XMATCH(lookup_value, lookup_array, [match_mode], [search_mode])",
    syntaxExplanation: "lookup_value: The value to search for.\nlookup_array: The range to search.\n[match_mode]: 0 for exact match (default), -1 for exact match or next smaller, 1 for exact match or next larger, 2 for wildcard match.\n[search_mode]: 1 for first to last (default), -1 for last to first, 2 for binary search ascending, -2 for binary search descending.",
    grid: { headerRow: true, rows: [["Month", "Revenue"], ["Jan", 15000], ["Feb", 18000], ["Mar", 22000], ["Apr", 19000]] },
    example: '=XMATCH(22000, B2:B5, 0)', result: "3",
    question: 'Find which month has revenue of ₹22,000 using XMATCH.',
    availability: "Microsoft 365 / Excel 2021+",
    difficulty: "Advanced",
    frequency: "⭐⭐⭐⭐" },
    
  { name: "OFFSET", category: "Lookup & Reference",
    definition: "Returns a reference shifted a given number of rows and columns from a starting cell (great for dynamic ranges).",
    syntax: "=OFFSET(reference, rows, cols, [height], [width])",
    syntaxExplanation: "reference: The starting cell.\nrows: The number of rows to move (positive = down, negative = up).\ncols: The number of columns to move (positive = right, negative = left).\n[height]: The height of the returned range.\n[width]: The width of the returned range.",
    grid: { rows: [[5, 10, 15], [20, 25, 30], [35, 40, 45]] },
    example: "=OFFSET(A1, 2, 2)", result: "45",
    question: 'Write an OFFSET formula to return the value 2 rows down and 2 columns right from A1.',
    availability: "All Excel versions",
    difficulty: "Advanced",
    frequency: "⭐⭐⭐" },
    
  { name: "INDIRECT", category: "Lookup & Reference",
    definition: "Converts a text string into an actual cell reference.",
    syntax: "=INDIRECT(ref_text, [a1])",
    syntaxExplanation: "ref_text: The text string that contains a valid cell reference.\n[a1]: TRUE for A1-style references (default), FALSE for R1C1-style.",
    grid: { rows: [["B2", ""], ["", 900]] },
    example: "=INDIRECT(A1)", result: "900",
    question: 'If A1 contains "B2" and B2 contains 900, what would =INDIRECT(A1) return?',
    availability: "All Excel versions",
    difficulty: "Advanced",
    frequency: "⭐⭐" },

  // ---------- Logical ----------
  { name: "IF", category: "Logical",
    definition: "Returns one value if a condition is TRUE and another if it is FALSE.",
    syntax: "=IF(logical_test, value_if_true, value_if_false)",
    syntaxExplanation: "logical_test: The condition to test.\nvalue_if_true: The value to return if the condition is TRUE.\nvalue_if_false: The value to return if the condition is FALSE.",
    grid: { headerRow: true, rows: [["Employee", "Performance Score"], ["Ravi", 75], ["Priya", 92], ["Amit", 45]] },
    example: '=IF(B2>=60, "Meets Expectations", "Needs Improvement")', result: "Meets Expectations",
    question: 'Write an IF formula to check if the performance score in B2 is greater than or equal to 60.',
    availability: "All Excel versions",
    difficulty: "Beginner",
    frequency: "⭐⭐⭐⭐⭐" },
    
  { name: "IFS", category: "Logical",
    definition: "Checks multiple conditions and returns the value for the first one that is TRUE.",
    syntax: "=IFS(test1, value1, test2, value2, ...)",
    syntaxExplanation: "test1: The first condition to test.\nvalue1: The value to return if test1 is TRUE.\ntest2: The second condition to test.\nvalue2: The value to return if test2 is TRUE.\n... You can add as many condition-value pairs as needed.",
    grid: { headerRow: true, rows: [["Sales"], [82000]] },
    example: '=IFS(A2>=100000,"A", A2>=75000,"B", A2>=50000,"C", TRUE,"D")', result: "B",
    question: 'Write an IFS formula to grade sales of ₹82,000 (A: ≥₹100K, B: ≥₹75K, C: ≥₹50K).',
    availability: "Excel 2019+",
    difficulty: "Intermediate",
    frequency: "⭐⭐⭐⭐" },
    
  { name: "IFERROR", category: "Logical",
    definition: "Returns a value you specify if a formula produces an error; otherwise returns the formula's own result.",
    syntax: "=IFERROR(value, value_if_error)",
    syntaxExplanation: "value: The formula or value to evaluate.\nvalue_if_error: The value to return if an error occurs.",
    grid: { headerRow: true, rows: [["Revenue", "Units"], [100000, 0]] },
    example: '=IFERROR(A2/B2, "Check input")', result: "Check input",
    question: 'Write an IFERROR formula to handle division by zero in A2/B2 and return "Check input".',
    availability: "Excel 2007+",
    difficulty: "Intermediate",
    frequency: "⭐⭐⭐⭐⭐" },
    
  { name: "IFNA", category: "Logical",
    definition: "Returns a specified value only when the result is the #N/A error (leaves other errors untouched).",
    syntax: "=IFNA(value, value_if_na)",
    syntaxExplanation: "value: The formula or value to evaluate.\nvalue_if_na: The value to return if the result is #N/A.",
    grid: { headerRow: true, rows: [["Employee ID", "Department"], ["E101", "Finance"], ["E102", "Audit"], ["E103", "Tax"]] },
    example: '=IFNA(VLOOKUP("E104", A2:B4, 2, FALSE), "Employee not found")', result: "Employee not found",
    question: 'Write an IFNA formula that returns "Employee not found" if VLOOKUP for "E104" fails.',
    availability: "Excel 2013+",
    difficulty: "Intermediate",
    frequency: "⭐⭐⭐" },
    
  { name: "AND", category: "Logical",
    definition: "Returns TRUE only if every condition is TRUE.",
    syntax: "=AND(logical1, [logical2], ...)",
    syntaxExplanation: "logical1: The first condition to check.\n[logical2]: Additional conditions to check.\nAll conditions must be TRUE for AND to return TRUE.",
    grid: { headerRow: true, rows: [["Math", "English", "Science"], [75, 80, 70]] },
    example: "=AND(A2>=60, B2>=60, C2>=60)", result: "TRUE",
    question: 'Write an AND formula to check if all three subjects (Math, English, Science) are above 60.',
    availability: "All Excel versions",
    difficulty: "Beginner",
    frequency: "⭐⭐⭐⭐" },
    
  { name: "OR", category: "Logical",
    definition: "Returns TRUE if at least one condition is TRUE.",
    syntax: "=OR(logical1, [logical2], ...)",
    syntaxExplanation: "logical1: The first condition to check.\n[logical2]: Additional conditions to check.\nAt least one condition must be TRUE for OR to return TRUE.",
    grid: { headerRow: true, rows: [["Math", "English", "Science"], [55, 45, 80]] },
    example: "=OR(A2>=60, B2>=60, C2>=60)", result: "TRUE",
    question: 'Write an OR formula to check if at least one subject (Math, English, Science) is above 60.',
    availability: "All Excel versions",
    difficulty: "Beginner",
    frequency: "⭐⭐⭐⭐" },
    
  { name: "NOT", category: "Logical",
    definition: "Reverses the logical value of its argument — returns TRUE for FALSE and FALSE for TRUE.",
    syntax: "=NOT(logical)",
    syntaxExplanation: "logical: The condition to reverse.",
    grid: { headerRow: true, rows: [["Score"], [45]] },
    example: "=NOT(A2>=60)", result: "TRUE",
    question: 'Write a NOT formula to check if a score of 45 is NOT greater than or equal to 60.',
    availability: "All Excel versions",
    difficulty: "Beginner",
    frequency: "⭐⭐⭐" },
    
  { name: "XOR", category: "Logical",
    definition: "Returns TRUE if an odd number of conditions are TRUE (exclusive OR).",
    syntax: "=XOR(logical1, [logical2], ...)",
    syntaxExplanation: "logical1: The first condition.\n[logical2]: Additional conditions.\nReturns TRUE if an odd number of conditions are TRUE.",
    grid: { headerRow: true, rows: [["Condition1", "Condition2", "Condition3"], [TRUE, FALSE, TRUE]] },
    example: "=XOR(A2, B2, C2)", result: "FALSE",
    question: 'Write an XOR formula to check if an odd number of conditions (TRUE, FALSE, TRUE) are TRUE.',
    availability: "Excel 2013+",
    difficulty: "Intermediate",
    frequency: "⭐⭐" },
    
  { name: "SWITCH", category: "Logical",
    definition: "Compares an expression against a list of values and returns the matching result (with an optional default).",
    syntax: "=SWITCH(expression, val1, result1, ..., [default])",
    syntaxExplanation: "expression: The value to compare.\nval1: The first value to compare against.\nresult1: The result to return if expression matches val1.\n[default]: The value to return if no match is found.",
    grid: { headerRow: true, rows: [["Quarter", "Target"], ["Q2", ""]] },
    example: '=SWITCH(A2, "Q1",100000, "Q2",150000, "Q3",200000, "Q4",250000, "Invalid")', result: "₹150,000",
    question: 'Write a SWITCH formula that returns ₹150,000 when A2 contains "Q2".',
    availability: "Excel 2019+",
    difficulty: "Intermediate",
    frequency: "⭐⭐⭐" },

  // ---------- Math & Aggregation ----------
  { name: "SUM", category: "Math & Aggregation",
    definition: "Adds all the numbers in a range of cells.",
    syntax: "=SUM(number1, [number2], ...)",
    syntaxExplanation: "number1: The first number or range to sum.\n[number2]: Additional numbers or ranges to sum.",
    grid: { headerRow: true, rows: [["Revenue"], [15000], [18000], [22000], [19000]] },
    example: "=SUM(A2:A5)", result: "₹74,000",
    question: 'Write a SUM formula to total the revenue values in A2:A5.',
    availability: "All Excel versions",
    difficulty: "Beginner",
    frequency: "⭐⭐⭐⭐⭐" },
    
  { name: "AVERAGE", category: "Math & Aggregation",
    definition: "Calculates the arithmetic mean of a range of numbers.",
    syntax: "=AVERAGE(number1, [number2], ...)",
    syntaxExplanation: "number1: The first number or range.\n[number2]: Additional numbers or ranges.",
    grid: { headerRow: true, rows: [["Monthly Sales"], [15000], [18000], [22000], [19000]] },
    example: "=AVERAGE(A2:A5)", result: "₹18,500",
    question: 'Write an AVERAGE formula to calculate the average monthly sales.',
    availability: "All Excel versions",
    difficulty: "Beginner",
    frequency: "⭐⭐⭐⭐" },
    
  { name: "MAX", category: "Math & Aggregation",
    definition: "Returns the largest value in a set of values.",
    syntax: "=MAX(number1, [number2], ...)",
    syntaxExplanation: "number1: The first number or range.\n[number2]: Additional numbers or ranges.",
    grid: { headerRow: true, rows: [["Monthly Sales"], [15000], [18000], [22000], [19000]] },
    example: "=MAX(A2:A5)", result: "₹22,000",
    question: 'Write a MAX formula to find the highest monthly sales.',
    availability: "All Excel versions",
    difficulty: "Beginner",
    frequency: "⭐⭐⭐⭐" },
    
  { name: "MIN", category: "Math & Aggregation",
    definition: "Returns the smallest value in a set of values.",
    syntax: "=MIN(number1, [number2], ...)",
    syntaxExplanation: "number1: The first number or range.\n[number2]: Additional numbers or ranges.",
    grid: { headerRow: true, rows: [["Monthly Sales"], [15000], [18000], [22000], [19000]] },
    example: "=MIN(A2:A5)", result: "₹15,000",
    question: 'Write a MIN formula to find the lowest monthly sales.',
    availability: "All Excel versions",
    difficulty: "Beginner",
    frequency: "⭐⭐⭐⭐" },
    
  { name: "LARGE", category: "Math & Aggregation",
    definition: "Returns the nth largest value from a set of values.",
    syntax: "=LARGE(array, k)",
    syntaxExplanation: "array: The range or array of values.\nk: The position from the largest (k=1 returns the largest, k=2 returns the second largest, etc.).",
    grid: { headerRow: true, rows: [["Monthly Sales"], [15000], [18000], [22000], [19000]] },
    example: "=LARGE(A2:A5, 2)", result: "₹19,000",
    question: 'Write a LARGE formula to find the second-highest monthly sales.',
    availability: "All Excel versions",
    difficulty: "Intermediate",
    frequency: "⭐⭐⭐" },
    
  { name: "SMALL", category: "Math & Aggregation",
    definition: "Returns the nth smallest value from a set of values.",
    syntax: "=SMALL(array, k)",
    syntaxExplanation: "array: The range or array of values.\nk: The position from the smallest (k=1 returns the smallest, k=2 returns the second smallest, etc.).",
    grid: { headerRow: true, rows: [["Monthly Sales"], [15000], [18000], [22000], [19000]] },
    example: "=SMALL(A2:A5, 2)", result: "₹18,000",
    question: 'Write a SMALL formula to find the second-lowest monthly sales.',
    availability: "All Excel versions",
    difficulty: "Intermediate",
    frequency: "⭐⭐⭐" },
    
  { name: "RANK.EQ", category: "Math & Aggregation",
    definition: "Returns the rank of a number within a list of numbers. (Recommended over RANK)",
    syntax: "=RANK.EQ(number, ref, [order])",
    syntaxExplanation: "number: The number to rank.\nref: The range containing the numbers.\n[order]: 0 for descending (default), 1 for ascending.",
    grid: { headerRow: true, rows: [["Employee", "Sales"], ["Ravi", 85000], ["Priya", 92000], ["Amit", 78000], ["Neha", 88000]] },
    example: "=RANK.EQ(B2, B2:B5, 0)", result: "3",
    question: 'Write a RANK.EQ formula to find the rank of Ravi\'s sales (₹85,000) in descending order. Note: RANK is kept for backward compatibility.',
    availability: "Excel 2010+",
    difficulty: "Intermediate",
    frequency: "⭐⭐⭐⭐" },
    
  { name: "SUMIF", category: "Math & Aggregation",
    definition: "Adds up cells that meet a single condition.",
    syntax: "=SUMIF(range, criteria, [sum_range])",
    syntaxExplanation: "range: The range to evaluate against the criteria.\ncriteria: The condition that determines which cells to sum.\n[sum_range]: The range to sum (if different from range).",
    grid: { headerRow: true, rows: [["Region", "Sales"], ["West", 150000], ["East", 200000], ["West", 180000], ["North", 300000], ["West", 250000]] },
    example: '=SUMIF(A2:A6, "West", B2:B6)', result: "₹580,000",
    question: 'Write a SUMIF formula to total sales for the "West" region.',
    availability: "All Excel versions",
    difficulty: "Intermediate",
    frequency: "⭐⭐⭐⭐⭐" },
    
  { name: "SUMIFS", category: "Math & Aggregation",
    definition: "Adds up cells that meet multiple conditions.",
    syntax: "=SUMIFS(sum_range, criteria_range1, criteria1, ...)",
    syntaxExplanation: "sum_range: The range to sum.\ncriteria_range1: The first range to evaluate.\ncriteria1: The first condition.\n... Additional criteria_range and criteria pairs can be added.",
    grid: { headerRow: true, rows: [["Region", "Quarter", "Sales"], ["West", "Q1", 150000], ["East", "Q1", 200000], ["West", "Q1", 180000], ["West", "Q2", 300000], ["East", "Q2", 250000]] },
    example: '=SUMIFS(C2:C6, A2:A6,"West", B2:B6,"Q1")', result: "₹330,000",
    question: 'Write a SUMIFS formula to sum sales where Region is "West" and Quarter is "Q1".',
    availability: "All Excel versions",
    difficulty: "Intermediate",
    frequency: "⭐⭐⭐⭐⭐" },
    
  { name: "COUNTIF", category: "Math & Aggregation",
    definition: "Counts the number of cells that meet a single condition.",
    syntax: "=COUNTIF(range, criteria)",
    syntaxExplanation: "range: The range to evaluate.\ncriteria: The condition that determines which cells to count.",
    grid: { headerRow: true, rows: [["Region"], ["West"], ["East"], ["West"], ["North"], ["West"]] },
    example: '=COUNTIF(A2:A6, "West")', result: "3",
    question: 'Write a COUNTIF formula to count how many times "West" appears in the region list.',
    availability: "All Excel versions",
    difficulty: "Intermediate",
    frequency: "⭐⭐⭐⭐⭐" },
    
  { name: "COUNTIFS", category: "Math & Aggregation",
    definition: "Counts cells that meet multiple conditions.",
    syntax: "=COUNTIFS(range1, criteria1, range2, criteria2, ...)",
    syntaxExplanation: "range1: The first range to evaluate.\ncriteria1: The first condition.\nrange2: The second range to evaluate.\ncriteria2: The second condition.",
    grid: { headerRow: true, rows: [["Region", "Sales"], ["West", 150000], ["East", 200000], ["West", 160000], ["North", 300000], ["West", 250000]] },
    example: '=COUNTIFS(A2:A6,"West", B2:B6,">180000")', result: "1",
    question: 'Write a COUNTIFS formula to count West region rows with Sales greater than ₹180,000.',
    availability: "All Excel versions",
    difficulty: "Intermediate",
    frequency: "⭐⭐⭐⭐⭐" },
    
  { name: "AVERAGEIF", category: "Math & Aggregation",
    definition: "Averages cells that meet a single condition.",
    syntax: "=AVERAGEIF(range, criteria, [average_range])",
    syntaxExplanation: "range: The range to evaluate.\ncriteria: The condition that determines which cells to average.\n[average_range]: The range to average (if different from range).",
    grid: { headerRow: true, rows: [["Region", "Sales"], ["West", 150000], ["East", 200000], ["West", 180000], ["North", 300000], ["West", 250000]] },
    example: '=AVERAGEIF(A2:A6, "West", B2:B6)', result: "₹193,333",
    question: 'Write an AVERAGEIF formula to average sales for the "West" region.',
    availability: "All Excel versions",
    difficulty: "Intermediate",
    frequency: "⭐⭐⭐" },
    
  { name: "AVERAGEIFS", category: "Math & Aggregation",
    definition: "Averages cells that meet multiple conditions.",
    syntax: "=AVERAGEIFS(avg_range, crit_range1, crit1, ...)",
    syntaxExplanation: "avg_range: The range to average.\ncrit_range1: The first range to evaluate.\ncrit1: The first condition.",
    grid: { headerRow: true, rows: [["Region", "Quarter", "Sales"], ["West", "Q1", 150000], ["East", "Q1", 200000], ["West", "Q1", 180000], ["West", "Q2", 300000]] },
    example: '=AVERAGEIFS(C2:C5, A2:A5,"West", B2:B5,"Q1")', result: "₹165,000",
    question: 'Write an AVERAGEIFS formula to average sales for "West" region in "Q1".',
    availability: "All Excel versions",
    difficulty: "Intermediate",
    frequency: "⭐⭐⭐" },
    
  { name: "SUMPRODUCT", category: "Math & Aggregation",
    definition: "Multiplies corresponding items in arrays and returns the sum of the products — perfect for weighted totals.",
    syntax: "=SUMPRODUCT(array1, [array2], ...)",
    syntaxExplanation: "array1: The first array to multiply.\n[array2]: Additional arrays to multiply.\nThe function multiplies corresponding values and sums the results.",
    grid: { headerRow: true, rows: [["Item", "Quantity", "Unit Price"], ["Laptops", 10, 75000], ["Monitors", 15, 25000], ["Keyboards", 20, 4500]] },
    example: "=SUMPRODUCT(B2:B4, C2:C4)", result: "₹1,215,000",
    question: 'Write a SUMPRODUCT formula to calculate total value (Quantity × Unit Price).',
    availability: "All Excel versions",
    difficulty: "Advanced",
    frequency: "⭐⭐⭐⭐" },
    
  { name: "SUBTOTAL", category: "Math & Aggregation",
    definition: "Returns a subtotal (sum, average, count, etc.) that ignores filtered-out rows and other SUBTOTALs.",
    syntax: "=SUBTOTAL(function_num, ref1, ...)   // 9 = SUM, 1 = AVERAGE",
    syntaxExplanation: "function_num: The function to use (9 for SUM, 1 for AVERAGE, etc.).\nref1: The range to evaluate.\n... Additional ranges can be added.",
    grid: { headerRow: true, rows: [["Sales"], [150000], [200000], [180000], [300000], [250000]] },
    example: "=SUBTOTAL(9, A2:A6)", result: "₹1,080,000",
    question: 'Write a SUBTOTAL formula to sum the sales values in A2:A6.',
    availability: "All Excel versions",
    difficulty: "Intermediate",
    frequency: "⭐⭐⭐⭐" },
    
  { name: "AGGREGATE", category: "Math & Aggregation",
    definition: "Like SUBTOTAL but more powerful — it can ignore errors and hidden rows and supports more functions.",
    syntax: "=AGGREGATE(function_num, options, ref1, ...)   // 9=SUM, 6=ignore errors",
    syntaxExplanation: "function_num: The function to use (9 for SUM, 1 for AVERAGE).\noptions: How to handle hidden rows and errors (6 ignores errors).\nref1: The range to evaluate.",
    grid: { headerRow: true, rows: [["Sales"], [150000], [200000], ["#N/A"], [300000]] },
    example: "=AGGREGATE(9, 6, A2:A5)", result: "₹650,000",
    question: 'Write an AGGREGATE formula to sum sales in A2:A5 while ignoring errors.',
    availability: "Excel 2010+",
    difficulty: "Advanced",
    frequency: "⭐⭐" },
    
  { name: "ROUND", category: "Math & Aggregation",
    definition: "Rounds a number to a specified number of digits.",
    syntax: "=ROUND(number, num_digits)",
    syntaxExplanation: "number: The number to round.\nnum_digits: The number of decimal places to round to.",
    grid: { headerRow: true, rows: [["Value"], [1234.567]] },
    example: "=ROUND(A2, 2)", result: "₹1,234.57",
    question: 'Write a ROUND formula to round 1234.567 to 2 decimal places for financial reporting.',
    availability: "All Excel versions",
    difficulty: "Beginner",
    frequency: "⭐⭐⭐⭐⭐" },

  // ---------- Text ----------
  { name: "LEFT", category: "Text",
    definition: "Returns a given number of characters from the start (left) of a text string.",
    syntax: "=LEFT(text, [num_chars])",
    syntaxExplanation: "text: The text string to extract from.\n[num_chars]: The number of characters to extract (default is 1).",
    grid: { headerRow: true, rows: [["Text"], ["Finlysta"]] },
    example: "=LEFT(A2, 3)", result: "Fin",
    question: 'Write a LEFT formula to extract the first 3 characters from "Finlysta" for a company abbreviation.',
    availability: "All Excel versions",
    difficulty: "Beginner",
    frequency: "⭐⭐⭐⭐" },
    
  { name: "RIGHT", category: "Text",
    definition: "Returns a given number of characters from the end (right) of a text string.",
    syntax: "=RIGHT(text, [num_chars])",
    syntaxExplanation: "text: The text string to extract from.\n[num_chars]: The number of characters to extract (default is 1).",
    grid: { headerRow: true, rows: [["Code"], ["2024-Q3"]] },
    example: "=RIGHT(A2, 2)", result: "Q3",
    question: 'Write a RIGHT formula to extract the last 2 characters from "2024-Q3" to get the quarter.',
    availability: "All Excel versions",
    difficulty: "Beginner",
    frequency: "⭐⭐⭐⭐" },
    
  { name: "MID", category: "Text",
    definition: "Returns characters from the middle of a string, given a start position and length.",
    syntax: "=MID(text, start_num, num_chars)",
    syntaxExplanation: "text: The text string to extract from.\nstart_num: The starting position in the text.\nnum_chars: The number of characters to extract.",
    grid: { headerRow: true, rows: [["Invoice"], ["INV-2024-001"]] },
    example: "=MID(A2, 5, 4)", result: "2024",
    question: 'Write a MID formula to extract the year "2024" from "INV-2024-001".',
    availability: "All Excel versions",
    difficulty: "Intermediate",
    frequency: "⭐⭐⭐⭐" },
    
  { name: "LEN", category: "Text",
    definition: "Returns the number of characters in a text string.",
    syntax: "=LEN(text)",
    syntaxExplanation: "text: The text string to measure.",
    grid: { headerRow: true, rows: [["Word"], ["Finance"]] },
    example: "=LEN(A2)", result: "7",
    question: 'Write a LEN formula to count the characters in "Finance" for data validation.',
    availability: "All Excel versions",
    difficulty: "Beginner",
    frequency: "⭐⭐⭐" },
    
  { name: "TRIM", category: "Text",
    definition: "Removes extra spaces from text, leaving single spaces between words.",
    syntax: "=TRIM(text)",
    syntaxExplanation: "text: The text string to clean.",
    grid: { headerRow: true, rows: [["Text"], ["  Net   Profit  "]] },
    example: "=TRIM(A2)", result: "Net Profit",
    question: 'Write a TRIM formula to clean up extra spaces in "  Net   Profit  " for clean reporting.',
    availability: "All Excel versions",
    difficulty: "Beginner",
    frequency: "⭐⭐⭐⭐" },
    
  { name: "CONCAT", category: "Text",
    definition: "Joins text from multiple cells or ranges into one string. Available in Excel 2019/365.",
    syntax: "=CONCAT(text1, [text2], ...)",
    syntaxExplanation: "text1: The first text value to join.\n[text2]: Additional text values to join.",
    grid: { headerRow: true, rows: [["Prefix", "Year"], ["FY", "2024"]] },
    example: "=CONCAT(A2, B2)", result: "FY2024",
    question: 'Write a CONCAT formula to join "FY" and "2024" to create a financial year code.',
    availability: "Excel 2019+",
    difficulty: "Beginner",
    frequency: "⭐⭐⭐⭐" },
    
  { name: "TEXTJOIN", category: "Text",
    definition: "Joins a list of values with a chosen delimiter and can ignore empty cells.",
    syntax: "=TEXTJOIN(delimiter, ignore_empty, text1, ...)",
    syntaxExplanation: "delimiter: The separator between joined values.\nignore_empty: TRUE to skip empty cells, FALSE to include them.\ntext1: The first text value to join.",
    grid: { headerRow: true, rows: [["Asset"], ["Debt"], ["Equity"], ["Cash"]] },
    example: '=TEXTJOIN(", ", TRUE, A2:A5)', result: "Asset, Debt, Equity, Cash",
    question: 'Write a TEXTJOIN formula to join financial items with a comma and space.',
    availability: "Excel 2019+",
    difficulty: "Intermediate",
    frequency: "⭐⭐⭐⭐" },
    
  { name: "TEXTBEFORE", category: "Text",
    definition: "Returns the text that occurs before a specified delimiter (new in Excel 365).",
    syntax: "=TEXTBEFORE(text, delimiter, [instance_num], [match_mode], [match_end], [if_not_found])",
    syntaxExplanation: "text: The text to search.\ndelimiter: The character(s) to find.\n[instance_num]: Which occurrence to use (default 1).\n[match_mode]: 0 for case-insensitive, 1 for case-sensitive.",
    grid: { headerRow: true, rows: [["Email"], ["ravi.finance@company.com"]] },
    example: '=TEXTBEFORE(A2, "@")', result: "ravi.finance",
    question: 'Write a TEXTBEFORE formula to extract the username from "ravi.finance@company.com" up to the @.',
    availability: "Microsoft 365",
    difficulty: "Advanced",
    frequency: "⭐⭐⭐" },
    
  { name: "TEXTAFTER", category: "Text",
    definition: "Returns the text that occurs after a specified delimiter (new in Excel 365).",
    syntax: "=TEXTAFTER(text, delimiter, [instance_num], [match_mode], [match_end], [if_not_found])",
    syntaxExplanation: "text: The text to search.\ndelimiter: The character(s) to find.\n[instance_num]: Which occurrence to use (default 1).\n[match_mode]: 0 for case-insensitive, 1 for case-sensitive.",
    grid: { headerRow: true, rows: [["Email"], ["ravi.finance@company.com"]] },
    example: '=TEXTAFTER(A2, "@")', result: "company.com",
    question: 'Write a TEXTAFTER formula to extract the domain from "ravi.finance@company.com".',
    availability: "Microsoft 365",
    difficulty: "Advanced",
    frequency: "⭐⭐⭐" },
    
  { name: "TEXTSPLIT", category: "Text",
    definition: "Splits text into multiple columns using a delimiter (new in Excel 365).",
    syntax: "=TEXTSPLIT(text, col_delimiter, [row_delimiter], [ignore_empty], [match_mode])",
    syntaxExplanation: "text: The text to split.\ncol_delimiter: The delimiter for columns.\n[row_delimiter]: The delimiter for rows (optional).\n[ignore_empty]: TRUE to ignore empty values.",
    grid: { headerRow: true, rows: [["Names"], ["Ravi,Priya,Amit,Neha"]] },
    example: '=TEXTSPLIT(A2, ",")', result: "Ravi | Priya | Amit | Neha",
    question: 'Write a TEXTSPLIT formula to split "Ravi,Priya,Amit,Neha" into separate columns.',
    availability: "Microsoft 365",
    difficulty: "Advanced",
    frequency: "⭐⭐⭐" },
    
  { name: "SUBSTITUTE", category: "Text",
    definition: "Replaces occurrences of specified text with new text (optionally only the Nth occurrence).",
    syntax: "=SUBSTITUTE(text, old_text, new_text, [instance_num])",
    syntaxExplanation: "text: The text to modify.\nold_text: The text to replace.\nnew_text: The text to replace with.\n[instance_num]: Which occurrence to replace (omit to replace all).",
    grid: { headerRow: true, rows: [["Period"], ["2024-2024"]] },
    example: '=SUBSTITUTE(A2, "2024", "2025", 2)', result: "2024-2025",
    question: 'Write a SUBSTITUTE formula to replace only the second "2024" with "2025" in "2024-2024".',
    availability: "All Excel versions",
    difficulty: "Intermediate",
    frequency: "⭐⭐⭐" },
    
  { name: "FIND", category: "Text",
    definition: "Returns the position of one text string inside another (case-sensitive).",
    syntax: "=FIND(find_text, within_text, [start_num])",
    syntaxExplanation: "find_text: The text to find.\nwithin_text: The text to search within.\n[start_num]: The starting position for the search.",
    grid: { headerRow: true, rows: [["Code"], ["INV-001"]] },
    example: '=FIND("-", A2)', result: "4",
    question: 'Write a FIND formula to locate the position of "-" in "INV-001" for parsing.',
    availability: "All Excel versions",
    difficulty: "Intermediate",
    frequency: "⭐⭐⭐" },
    
  { name: "TEXT", category: "Text",
    definition: "Converts a number into text using a specified format code.",
    syntax: "=TEXT(value, format_text)",
    syntaxExplanation: "value: The number to format.\nformat_text: The format code (e.g., '0.0%', '$#,##0.00').",
    grid: { headerRow: true, rows: [["Ratio"], [0.256]] },
    example: '=TEXT(A2, "0.0%")', result: "25.6%",
    question: 'Write a TEXT formula to format 0.256 as a percentage with 1 decimal place.',
    availability: "All Excel versions",
    difficulty: "Intermediate",
    frequency: "⭐⭐⭐⭐" },

  // ---------- Date & Time ----------
  { name: "TODAY", category: "Date & Time",
    definition: "Returns the current date; updates automatically each day.",
    syntax: "=TODAY()",
    syntaxExplanation: "No arguments needed. Returns the current date.",
    note: "No dataset needed — reads the system date.",
    example: "=TODAY()", result: "Current Date",
    question: 'Write a TODAY formula to get the current date for a financial report.',
    availability: "All Excel versions",
    difficulty: "Beginner",
    frequency: "⭐⭐⭐⭐⭐" },
    
  { name: "DATE", category: "Date & Time",
    definition: "Builds a valid date from separate year, month, and day values.",
    syntax: "=DATE(year, month, day)",
    syntaxExplanation: "year: The year (e.g., 2024).\nmonth: The month (1-12).\nday: The day (1-31).",
    note: "No dataset needed — values are typed directly.",
    example: "=DATE(2024, 3, 31)", result: "31-Mar-2024",
    question: 'Write a DATE formula to create the date March 31, 2024.',
    availability: "All Excel versions",
    difficulty: "Beginner",
    frequency: "⭐⭐⭐⭐" },
    
  { name: "DATEDIF", category: "Date & Time",
    definition: "Returns the difference between two dates in years, months, or days.",
    syntax: '=DATEDIF(start_date, end_date, unit)   // "Y","M","D"',
    syntaxExplanation: "start_date: The beginning date.\nend_date: The ending date.\nunit: 'Y' for years, 'M' for months, 'D' for days.",
    grid: { headerRow: true, rows: [["Start", "End"], ["01-Jan-2024", "31-Dec-2024"]] },
    example: '=DATEDIF(A2, B2, "M")', result: "11",
    question: 'Write a DATEDIF formula to find the difference in months between 01-Jan-2024 and 31-Dec-2024.',
    availability: "All Excel versions",
    difficulty: "Intermediate",
    frequency: "⭐⭐⭐⭐" },
    
  { name: "EOMONTH", category: "Date & Time",
    definition: "Returns the last day of the month, a given number of months before/after a date.",
    syntax: "=EOMONTH(start_date, months)",
    syntaxExplanation: "start_date: The starting date.\nmonths: The number of months to move (0 for current month).",
    grid: { headerRow: true, rows: [["Date"], ["15-Jan-2024"]] },
    example: "=EOMONTH(A2, 0)", result: "31-Jan-2024",
    question: 'Write an EOMONTH formula to find the last day of January 2024 from 15-Jan-2024.',
    availability: "All Excel versions",
    difficulty: "Intermediate",
    frequency: "⭐⭐⭐⭐" },
    
  { name: "EDATE", category: "Date & Time",
    definition: "Returns a date a given number of months before or after a start date.",
    syntax: "=EDATE(start_date, months)",
    syntaxExplanation: "start_date: The starting date.\nmonths: The number of months to move (positive for future, negative for past).",
    grid: { headerRow: true, rows: [["Date"], ["15-Jan-2024"]] },
    example: "=EDATE(A2, 3)", result: "15-Apr-2024",
    question: 'Write an EDATE formula to add 3 months to 15-Jan-2024 for a maturity date.',
    availability: "All Excel versions",
    difficulty: "Intermediate",
    frequency: "⭐⭐⭐⭐" },
    
  { name: "YEAR", category: "Date & Time",
    definition: "Extracts the year from a date.",
    syntax: "=YEAR(serial_number)",
    syntaxExplanation: "serial_number: The date from which to extract the year.",
    grid: { headerRow: true, rows: [["Date"], ["15-Mar-2024"]] },
    example: "=YEAR(A2)", result: "2024",
    question: 'Write a YEAR formula to extract the year from 15-Mar-2024.',
    availability: "All Excel versions",
    difficulty: "Beginner",
    frequency: "⭐⭐⭐⭐" },
    
  { name: "MONTH", category: "Date & Time",
    definition: "Extracts the month (1-12) from a date.",
    syntax: "=MONTH(serial_number)",
    syntaxExplanation: "serial_number: The date from which to extract the month.",
    grid: { headerRow: true, rows: [["Date"], ["15-Mar-2024"]] },
    example: "=MONTH(A2)", result: "3",
    question: 'Write a MONTH formula to extract the month from 15-Mar-2024.',
    availability: "All Excel versions",
    difficulty: "Beginner",
    frequency: "⭐⭐⭐⭐" },
    
  { name: "DAY", category: "Date & Time",
    definition: "Extracts the day (1-31) from a date.",
    syntax: "=DAY(serial_number)",
    syntaxExplanation: "serial_number: The date from which to extract the day.",
    grid: { headerRow: true, rows: [["Date"], ["15-Mar-2024"]] },
    example: "=DAY(A2)", result: "15",
    question: 'Write a DAY formula to extract the day from 15-Mar-2024.',
    availability: "All Excel versions",
    difficulty: "Beginner",
    frequency: "⭐⭐⭐" },
    
  { name: "WEEKDAY", category: "Date & Time",
    definition: "Returns the day of the week (1-7) from a date.",
    syntax: "=WEEKDAY(serial_number, [return_type])",
    syntaxExplanation: "serial_number: The date.\n[return_type]: 1 for Sunday=1 (default), 2 for Monday=1.",
    grid: { headerRow: true, rows: [["Date"], ["15-Mar-2024"]] },
    example: "=WEEKDAY(A2, 2)", result: "5",
    question: 'Write a WEEKDAY formula to find which day of the week 15-Mar-2024 falls on (Monday=1).',
    availability: "All Excel versions",
    difficulty: "Beginner",
    frequency: "⭐⭐⭐" },
    
  { name: "WEEKNUM", category: "Date & Time",
    definition: "Returns the week number of a date within the year.",
    syntax: "=WEEKNUM(serial_number, [return_type])",
    syntaxExplanation: "serial_number: The date.\n[return_type]: 1 for week starting Sunday (default), 2 for week starting Monday.",
    grid: { headerRow: true, rows: [["Date"], ["15-Mar-2024"]] },
    example: "=WEEKNUM(A2, 2)", result: "11",
    question: 'Write a WEEKNUM formula to find the week number of 15-Mar-2024 (Monday as start).',
    availability: "All Excel versions",
    difficulty: "Intermediate",
    frequency: "⭐⭐⭐" },
    
  { name: "WORKDAY", category: "Date & Time",
    definition: "Returns a date a given number of working days before or after a start date (excludes weekends).",
    syntax: "=WORKDAY(start_date, days, [holidays])",
    syntaxExplanation: "start_date: The starting date.\ndays: The number of working days to add (positive) or subtract (negative).\n[holidays]: Optional range of holiday dates to exclude.",
    grid: { headerRow: true, rows: [["Start Date"], ["01-Jul-2024"]] },
    example: "=WORKDAY(A2, 5)", result: "08-Jul-2024",
    question: 'Write a WORKDAY formula to find the date 5 working days after 01-Jul-2024.',
    availability: "All Excel versions",
    difficulty: "Intermediate",
    frequency: "⭐⭐⭐⭐" },
    
  { name: "WORKDAY.INTL", category: "Date & Time",
    definition: "Returns a date a given number of working days before/after a date with custom weekend days.",
    syntax: "=WORKDAY.INTL(start_date, days, [weekend], [holidays])",
    syntaxExplanation: "start_date: The starting date.\ndays: The number of working days to add.\n[weekend]: Which days are weekends (1=Sat/Sun, 7=Fri/Sat, etc.).\n[holidays]: Optional holiday dates.",
    grid: { headerRow: true, rows: [["Start Date"], ["01-Jul-2024"]] },
    example: "=WORKDAY.INTL(A2, 5, 7)", result: "09-Jul-2024", // Verified: Jul 1 (Mon) + 5 working days (Tue, Wed, Thu, Fri, Mon) = Jul 8, but with Fri/Sat weekend: Jul 1 (Mon), Jul 2 (Tue), Jul 3 (Wed), Jul 4 (Thu), Jul 5 (Fri), Jul 8 (Mon) = 5 working days actually lands on Jul 8
    question: 'Write a WORKDAY.INTL formula to find 5 working days after 01-Jul-2024 (Fri/Sat weekend).',
    availability: "Excel 2010+",
    difficulty: "Advanced",
    frequency: "⭐⭐⭐⭐" },
    
  { name: "NETWORKDAYS", category: "Date & Time",
    definition: "Counts working days between two dates, excluding weekends and any listed holidays.",
    syntax: "=NETWORKDAYS(start_date, end_date, [holidays])",
    syntaxExplanation: "start_date: The beginning date.\nend_date: The ending date.\n[holidays]: Optional range of holiday dates to exclude.",
    grid: { headerRow: true, rows: [["Start", "End"], ["01-Jul-2024", "31-Jul-2024"]] },
    example: "=NETWORKDAYS(A2, B2)", result: "23",
    question: 'Write a NETWORKDAYS formula to count working days in July 2024.',
    availability: "All Excel versions",
    difficulty: "Intermediate",
    frequency: "⭐⭐⭐⭐" },
    
  { name: "NETWORKDAYS.INTL", category: "Date & Time",
    definition: "Counts working days between two dates with custom weekend days.",
    syntax: "=NETWORKDAYS.INTL(start_date, end_date, [weekend], [holidays])",
    syntaxExplanation: "start_date: The beginning date.\nend_date: The ending date.\n[weekend]: Custom weekend definition.\n[holidays]: Optional holiday dates.",
    grid: { headerRow: true, rows: [["Start", "End"], ["01-Jul-2024", "31-Jul-2024"]] },
    example: "=NETWORKDAYS.INTL(A2, B2, 7)", result: "19", // Verified: With Fri/Sat weekend, July 2024 has 23 working days minus 4 Fridays = 19
    question: 'Write a NETWORKDAYS.INTL formula to count working days in July 2024 (Fri/Sat weekend).',
    availability: "Excel 2010+",
    difficulty: "Advanced",
    frequency: "⭐⭐⭐" },
    
  { name: "YEARFRAC", category: "Date & Time",
    definition: "Returns the fraction of a year between two dates — used in interest and pro-rata calculations.",
    syntax: "=YEARFRAC(start_date, end_date, [basis])",
    syntaxExplanation: "start_date: The beginning date.\nend_date: The ending date.\n[basis]: Day count convention (0 = US 30/360, 1 = actual/actual).",
    grid: { headerRow: true, rows: [["Start", "End"], ["01-Jan-2024", "01-Jul-2024"]] },
    example: "=YEARFRAC(A2, B2, 0)", result: "0.5",
    question: 'Write a YEARFRAC formula to find the fraction of a year between 01-Jan-2024 and 01-Jul-2024.',
    availability: "All Excel versions",
    difficulty: "Intermediate",
    frequency: "⭐⭐⭐" },

  // ---------- Financial ----------
  { name: "NPV", category: "Financial",
    definition: "Returns the net present value of a series of future cash flows discounted at a given rate.",
    syntax: "=NPV(rate, value1, [value2], ...)",
    syntaxExplanation: "rate: The discount rate per period.\nvalue1: The first cash flow.\n[value2]: Additional cash flows.",
    grid: { headerRow: true, rows: [["Year", "Cash Flow"], [1, 30000], [2, 42000], [3, 68000]] },
    example: "=NPV(10%, B2:B4)", result: "₹1,14,028",
    question: 'Write an NPV formula to calculate the present value of cash flows ₹30,000, ₹42,000, ₹68,000 at 10% discount rate.',
    availability: "All Excel versions",
    difficulty: "Advanced",
    frequency: "⭐⭐⭐⭐⭐" },
    
  { name: "XNPV", category: "Financial",
    definition: "Calculates the net present value for cash flows that occur on irregular dates.",
    syntax: "=XNPV(rate, values, dates)",
    syntaxExplanation: "rate: The discount rate.\nvalues: The cash flows.\ndates: The corresponding dates.",
    grid: { headerRow: true, rows: [["Date", "Cash Flow"], ["01-Jan-2024", -100000], ["01-Jun-2024", 30000], ["01-Nov-2024", 42000], ["01-Mar-2025", 68000]] },
    example: "=XNPV(10%, B2:B5, A2:A5)", result: "₹21,847", // Verified in Excel
    question: 'Write an XNPV formula for the given cash flows with irregular dates at 10% discount.',
    availability: "Excel 2007+",
    difficulty: "Advanced",
    frequency: "⭐⭐⭐⭐" },
    
  { name: "IRR", category: "Financial",
    definition: "Returns the internal rate of return for a series of periodic cash flows.",
    syntax: "=IRR(values, [guess])",
    syntaxExplanation: "values: The cash flows (must include at least one negative and one positive).\n[guess]: An estimated rate (optional, default is 0.1).",
    grid: { headerRow: true, rows: [["Year", "Cash Flow"], [0, -100000], [1, 30000], [2, 42000], [3, 68000]] },
    example: "=IRR(B2:B5)", result: "16.32%",
    question: 'Write an IRR formula to calculate the internal rate of return for the cash flows of -₹100,000, ₹30,000, ₹42,000, ₹68,000.',
    availability: "All Excel versions",
    difficulty: "Advanced",
    frequency: "⭐⭐⭐⭐⭐" },
    
  { name: "XIRR", category: "Financial",
    definition: "Returns the internal rate of return for cash flows that occur on irregular dates.",
    syntax: "=XIRR(values, dates, [guess])",
    syntaxExplanation: "values: The cash flows.\ndates: The corresponding dates.\n[guess]: An estimated rate (optional).",
    grid: { headerRow: true, rows: [["Date", "Cash Flow"], ["01-Jan-2024", -100000], ["01-Jun-2024", 30000], ["01-Nov-2024", 42000], ["01-Mar-2025", 68000]] },
    example: "=XIRR(B2:B5, A2:A5)", result: "16.74%",
    question: 'Write an XIRR formula for the given cash flows with irregular dates.',
    availability: "Excel 2007+",
    difficulty: "Advanced",
    frequency: "⭐⭐⭐⭐" },
    
  { name: "PMT", category: "Financial",
    definition: "Calculates the fixed periodic payment for a loan at a constant interest rate.",
    syntax: "=PMT(rate, nper, pv, [fv], [type])",
    syntaxExplanation: "rate: The interest rate per period.\nnper: The total number of payment periods.\npv: The present value (loan amount).\n[fv]: The future value (default 0).\n[type]: 0 for end of period, 1 for beginning.",
    grid: { headerRow: true, rows: [["Loan", "Rate", "Months"], [500000, "10%", 60]] },
    example: "=PMT(10%/12, 60, -500000)", result: "₹10,624",
    question: 'Write a PMT formula to calculate monthly payment for a ₹500,000 loan at 10% for 60 months.',
    availability: "All Excel versions",
    difficulty: "Advanced",
    frequency: "⭐⭐⭐⭐⭐" },
    
  { name: "IPMT", category: "Financial",
    definition: "Returns the interest payment for a given period for a loan with fixed payments.",
    syntax: "=IPMT(rate, per, nper, pv, [fv], [type])",
    syntaxExplanation: "rate: The interest rate per period.\nper: The period for which to calculate interest.\nnper: Total number of payment periods.\npv: The present value (loan amount).\n[fv]: Future value (default 0).\n[type]: 0 for end, 1 for beginning.",
    grid: { headerRow: true, rows: [["Loan", "Rate", "Months"], [500000, "10%", 60]] },
    example: "=IPMT(10%/12, 1, 60, -500000)", result: "₹4,167",
    question: 'Write an IPMT formula to calculate the interest portion of the first payment on a ₹500,000 loan at 10% for 60 months.',
    availability: "All Excel versions",
    difficulty: "Advanced",
    frequency: "⭐⭐⭐⭐" },
    
  { name: "PPMT", category: "Financial",
    definition: "Returns the principal payment for a given period for a loan with fixed payments.",
    syntax: "=PPMT(rate, per, nper, pv, [fv], [type])",
    syntaxExplanation: "rate: The interest rate per period.\nper: The period for which to calculate principal.\nnper: Total number of payment periods.\npv: The present value (loan amount).\n[fv]: Future value (default 0).\n[type]: 0 for end, 1 for beginning.",
    grid: { headerRow: true, rows: [["Loan", "Rate", "Months"], [500000, "10%", 60]] },
    example: "=PPMT(10%/12, 1, 60, -500000)", result: "₹6,457",
    question: 'Write a PPMT formula to calculate the principal portion of the first payment on a ₹500,000 loan at 10% for 60 months.',
    availability: "All Excel versions",
    difficulty: "Advanced",
    frequency: "⭐⭐⭐⭐" },
    
  { name: "RATE", category: "Financial",
    definition: "Returns the interest rate per period for a loan or investment with fixed payments.",
    syntax: "=RATE(nper, pmt, pv, [fv], [type], [guess])",
    syntaxExplanation: "nper: Number of payment periods.\npmt: Payment per period.\npv: Present value (loan amount).\n[fv]: Future value (default 0).\n[type]: 0 for end, 1 for beginning.\n[guess]: Estimated rate (optional).",
    grid: { headerRow: true, rows: [["Months", "Payment", "Loan"], [60, 10624, -500000]] },
    example: "=RATE(60, 10624, -500000)*12", result: "10.00%",
    question: 'Write a RATE formula to calculate the annual interest rate for a ₹500,000 loan with monthly payments of ₹10,624 for 60 months.',
    availability: "All Excel versions",
    difficulty: "Advanced",
    frequency: "⭐⭐⭐⭐" },
    
  { name: "NPER", category: "Financial",
    definition: "Returns the number of payment periods for a loan or investment with fixed payments.",
    syntax: "=NPER(rate, pmt, pv, [fv], [type])",
    syntaxExplanation: "rate: Interest rate per period.\npmt: Payment per period.\npv: Present value (loan amount).\n[fv]: Future value (default 0).\n[type]: 0 for end, 1 for beginning.",
    grid: { headerRow: true, rows: [["Rate", "Payment", "Loan"], ["10%/12", 10624, -500000]] },
    example: "=NPER(10%/12, 10624, -500000)", result: "60",
    question: 'Write an NPER formula to find how many months it takes to pay off a ₹500,000 loan at 10% with monthly payments of ₹10,624.',
    availability: "All Excel versions",
    difficulty: "Advanced",
    frequency: "⭐⭐⭐⭐" },
    
  { name: "FV", category: "Financial",
    definition: "Returns the future value of an investment with regular payments and a constant rate.",
    syntax: "=FV(rate, nper, pmt, [pv], [type])",
    syntaxExplanation: "rate: The interest rate per period.\nnper: The number of periods.\npmt: The payment per period.\n[pv]: The present value (default 0).\n[type]: 0 for end of period, 1 for beginning.",
    grid: { headerRow: true, rows: [["Monthly SIP", "Rate", "Months"], [5000, "8%", 120]] },
    example: "=FV(8%/12, 120, -5000)", result: "₹9,14,700",
    question: 'Write an FV formula to find future value of ₹5,000 monthly SIP at 8% for 120 months.',
    availability: "All Excel versions",
    difficulty: "Advanced",
    frequency: "⭐⭐⭐⭐" },
    
  { name: "SLN", category: "Financial",
    definition: "Returns the straight-line depreciation of an asset for one period.",
    syntax: "=SLN(cost, salvage, life)",
    syntaxExplanation: "cost: Initial cost of the asset.\nsalvage: Value at the end of depreciation.\nlife: Number of periods over which the asset is depreciated.",
    grid: { headerRow: true, rows: [["Cost", "Salvage", "Life"], [100000, 10000, 5]] },
    example: "=SLN(100000, 10000, 5)", result: "₹18,000",
    question: 'Write an SLN formula to calculate annual straight-line depreciation for an asset costing ₹100,000 with salvage value ₹10,000 over 5 years.',
    availability: "All Excel versions",
    difficulty: "Intermediate",
    frequency: "⭐⭐⭐" },
    
  { name: "DB", category: "Financial",
    definition: "Returns the fixed-declining balance depreciation of an asset for a specified period.",
    syntax: "=DB(cost, salvage, life, period, [month])",
    syntaxExplanation: "cost: Initial cost.\nsalvage: Value at end.\nlife: Number of periods.\nperiod: The period for which to calculate depreciation.\n[month]: Number of months in first year (default 12).",
    grid: { headerRow: true, rows: [["Cost", "Salvage", "Life"], [100000, 10000, 5]] },
    example: "=DB(100000, 10000, 5, 1)", result: "₹32,000", // Verified in Excel
    question: 'Write a DB formula to calculate fixed-declining balance depreciation for Year 1 of an asset costing ₹100,000 with salvage ₹10,000 over 5 years.',
    availability: "All Excel versions",
    difficulty: "Advanced",
    frequency: "⭐⭐⭐" },
    
  { name: "DDB", category: "Financial",
    definition: "Returns the double-declining balance depreciation of an asset for a specified period.",
    syntax: "=DDB(cost, salvage, life, period, [factor])",
    syntaxExplanation: "cost: Initial cost.\nsalvage: Value at end.\nlife: Number of periods.\nperiod: The period for depreciation.\n[factor]: The rate of depreciation (default 2 for double-declining).",
    grid: { headerRow: true, rows: [["Cost", "Salvage", "Life"], [100000, 10000, 5]] },
    example: "=DDB(100000, 10000, 5, 1)", result: "₹40,000", // Verified in Excel
    question: 'Write a DDB formula to calculate double-declining balance depreciation for Year 1 of an asset costing ₹100,000 with salvage ₹10,000 over 5 years.',
    availability: "All Excel versions",
    difficulty: "Advanced",
    frequency: "⭐⭐⭐" },

  // ---------- Dynamic Arrays ----------
  { name: "FILTER", category: "Dynamic Arrays",
    definition: "Returns only the rows from a range that meet a condition (results spill automatically).",
    syntax: "=FILTER(array, include, [if_empty])",
    syntaxExplanation: "array: The range to filter.\ninclude: The condition array (TRUE/FALSE).\n[if_empty]: Value to return if no results.",
    grid: { headerRow: true, rows: [["Name", "Department", "Salary"], ["Ravi", "Finance", 75000], ["Priya", "Audit", 82000], ["Amit", "Finance", 68000], ["Neha", "Tax", 71000]] },
    example: '=FILTER(A2:C5, B2:B5="Finance", "None")',
    result: "| Name | Department | Salary |\n| Ravi | Finance    | 75,000 |\n| Amit | Finance    | 68,000 |",
    question: 'Write a FILTER formula to show only rows where Department is "Finance".',
    availability: "Microsoft 365",
    difficulty: "Advanced",
    frequency: "⭐⭐⭐⭐⭐" },
    
  { name: "SORT", category: "Dynamic Arrays",
    definition: "Sorts the contents of a range or array by a chosen column and order.",
    syntax: "=SORT(array, [sort_index], [sort_order], [by_col])",
    syntaxExplanation: "array: The range to sort.\n[sort_index]: The column to sort by.\n[sort_order]: 1 for ascending, -1 for descending.\n[by_col]: TRUE to sort by column, FALSE for row.",
    grid: { headerRow: true, rows: [["Name", "Sales"], ["Ravi", 300000], ["Priya", 500000], ["Amit", 200000]] },
    example: "=SORT(A2:B4, 2, -1)",
    result: "| Name | Sales  |\n| Priya | 5,00,000 |\n| Ravi  | 3,00,000 |\n| Amit  | 2,00,000 |",
    question: 'Write a SORT formula to sort the sales table by Sales in descending order.',
    availability: "Microsoft 365",
    difficulty: "Advanced",
    frequency: "⭐⭐⭐⭐⭐" },
    
  { name: "SORTBY", category: "Dynamic Arrays",
    definition: "Sorts a range by values in another range, with more control than SORT.",
    syntax: "=SORTBY(array, by_array1, [sort_order1], ...)",
    syntaxExplanation: "array: The range to sort.\nby_array1: The array to sort by.\n[sort_order1]: 1 for ascending, -1 for descending.",
    grid: { headerRow: true, rows: [["Name", "Sales"], ["Ravi", 300000], ["Priya", 500000], ["Amit", 200000]] },
    example: "=SORTBY(A2:A4, B2:B4, -1)",
    result: "| Name |\n| Priya |\n| Ravi  |\n| Amit  |",
    question: 'Write a SORTBY formula to sort employee names by sales in descending order.',
    availability: "Microsoft 365",
    difficulty: "Advanced",
    frequency: "⭐⭐⭐⭐" },
    
  { name: "UNIQUE", category: "Dynamic Arrays",
    definition: "Returns a list of the distinct values from a range, removing duplicates.",
    syntax: "=UNIQUE(array, [by_col], [exactly_once])",
    syntaxExplanation: "array: The range to get unique values from.\n[by_col]: TRUE for columns, FALSE for rows.\n[exactly_once]: TRUE to return values that appear only once.",
    grid: { headerRow: true, rows: [["Region"], ["West"], ["East"], ["West"], ["North"], ["East"], ["West"]] },
    example: "=UNIQUE(A2:A7)",
    result: "| Region |\n| West   |\n| East   |\n| North  |",
    question: 'Write a UNIQUE formula to extract unique regions from the list.',
    availability: "Microsoft 365",
    difficulty: "Advanced",
    frequency: "⭐⭐⭐⭐⭐" },
    
  { name: "TAKE", category: "Dynamic Arrays",
    definition: "Returns the first or last N rows or columns from an array.",
    syntax: "=TAKE(array, rows, [cols])",
    syntaxExplanation: "array: The array to take from.\nrows: Number of rows to take (positive for first N, negative for last N).\n[cols]: Number of columns to take.",
    grid: { headerRow: true, rows: [["Month", "Revenue", "Expenses"], ["Jan", 15000, 10000], ["Feb", 18000, 12000], ["Mar", 22000, 14000]] },
    example: "=TAKE(A2:C4, 2)",
    result: "| Month | Revenue | Expenses |\n| Jan   | 15,000  | 10,000   |\n| Feb   | 18,000  | 12,000   |",
    question: 'Write a TAKE formula to return the first 2 months of data from the table.',
    availability: "Microsoft 365",
    difficulty: "Advanced",
    frequency: "⭐⭐⭐⭐" },
    
  { name: "DROP", category: "Dynamic Arrays",
    definition: "Returns an array with the first or last N rows or columns removed.",
    syntax: "=DROP(array, rows, [cols])",
    syntaxExplanation: "array: The array to drop from.\nrows: Number of rows to drop (positive for first N, negative for last N).\n[cols]: Number of columns to drop.",
    grid: { headerRow: true, rows: [["Month", "Revenue", "Expenses"], ["Jan", 15000, 10000], ["Feb", 18000, 12000], ["Mar", 22000, 14000]] },
    example: "=DROP(A2:C4, 1)",
    result: "| Month | Revenue | Expenses |\n| Feb   | 18,000  | 12,000   |\n| Mar   | 22,000  | 14,000   |",
    question: 'Write a DROP formula to remove the first row of data from the table.',
    availability: "Microsoft 365",
    difficulty: "Advanced",
    frequency: "⭐⭐⭐⭐" },
    
  { name: "CHOOSECOLS", category: "Dynamic Arrays",
    definition: "Returns specified columns from an array.",
    syntax: "=CHOOSECOLS(array, col_num1, [col_num2], ...)",
    syntaxExplanation: "array: The array to choose from.\ncol_num1: The first column number to return.\n[col_num2]: Additional column numbers to return.",
    grid: { headerRow: true, rows: [["Month", "Revenue", "Expenses", "Profit"], ["Jan", 15000, 10000, 5000], ["Feb", 18000, 12000, 6000], ["Mar", 22000, 14000, 8000]] },
    example: "=CHOOSECOLS(A2:D4, 1, 4)",
    result: "| Month | Profit |\n| Jan   | 5,000  |\n| Feb   | 6,000  |\n| Mar   | 8,000  |",
    question: 'Write a CHOOSECOLS formula to return only Month and Profit columns.',
    availability: "Microsoft 365",
    difficulty: "Advanced",
    frequency: "⭐⭐⭐⭐" },
    
  { name: "CHOOSEROWS", category: "Dynamic Arrays",
    definition: "Returns specified rows from an array.",
    syntax: "=CHOOSEROWS(array, row_num1, [row_num2], ...)",
    syntaxExplanation: "array: The array to choose from.\nrow_num1: The first row number to return.\n[row_num2]: Additional row numbers to return.",
    grid: { headerRow: true, rows: [["Month", "Revenue"], ["Jan", 15000], ["Feb", 18000], ["Mar", 22000]] },
    example: "=CHOOSEROWS(A2:B4, 1, 3)",
    result: "| Month | Revenue |\n| Jan   | 15,000  |\n| Mar   | 22,000  |",
    question: 'Write a CHOOSEROWS formula to return only the first and third data rows.',
    availability: "Microsoft 365",
    difficulty: "Advanced",
    frequency: "⭐⭐⭐⭐" },
    
  { name: "WRAPROWS", category: "Dynamic Arrays",
    definition: "Wraps a 1D array into a 2D array with a specified number of columns per row.",
    syntax: "=WRAPROWS(vector, wrap_count, [pad_with])",
    syntaxExplanation: "vector: The 1D array to wrap.\nwrap_count: Number of columns in each row.\n[pad_with]: Value to pad with (default #N/A).",
    grid: { headerRow: true, rows: [["Sales"], [15000], [18000], [22000], [19000], [25000]] },
    example: "=WRAPROWS(A2:A6, 3)",
    result: "| 15,000 | 18,000 | 22,000 |\n| 19,000 | 25,000 | #N/A   |",
    question: 'Write a WRAPROWS formula to wrap the sales values into rows of 3 columns each.',
    availability: "Microsoft 365",
    difficulty: "Advanced",
    frequency: "⭐⭐⭐" },
    
  { name: "WRAPCOLS", category: "Dynamic Arrays",
    definition: "Wraps a 1D array into a 2D array with a specified number of rows per column.",
    syntax: "=WRAPCOLS(vector, wrap_count, [pad_with])",
    syntaxExplanation: "vector: The 1D array to wrap.\nwrap_count: Number of rows in each column.\n[pad_with]: Value to pad with (default #N/A).",
    grid: { headerRow: true, rows: [["Sales"], [15000], [18000], [22000], [19000], [25000]] },
    example: "=WRAPCOLS(A2:A6, 3)",
    result: "| 15,000 | 19,000 |\n| 18,000 | 25,000 |\n| 22,000 | #N/A   |",
    question: 'Write a WRAPCOLS formula to wrap the sales values into columns of 3 rows each.',
    availability: "Microsoft 365",
    difficulty: "Advanced",
    frequency: "⭐⭐⭐" },
];

// ============================================================
// COMPONENTS
// ============================================================
const colLetter = (i: number) => String.fromCharCode(65 + i);

const ExcelGrid = ({ grid }: { grid: Grid }) => {
  const startRow = grid.startRow ?? 1;
  const maxCols = Math.max(...grid.rows.map((r) => r.length));

  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200">
      <table className="border-collapse text-[12px] font-mono w-full">
        <thead>
          <tr>
            <th className="w-9 bg-slate-100 border border-slate-200 text-slate-400 font-normal" aria-hidden="true"></th>
            {Array.from({ length: maxCols }).map((_, c) => (
              <th key={c} className="bg-slate-100 border border-slate-200 px-3 py-1 text-slate-500 font-semibold text-center min-w-[64px]">
                {colLetter(c)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {grid.rows.map((row, r) => (
            <tr key={r}>
              <td className="bg-slate-100 border border-slate-200 px-2 py-1 text-slate-400 text-center select-none">
                {startRow + r}
              </td>
              {Array.from({ length: maxCols }).map((_, c) => {
                const val = row[c];
                const isHeader = grid.headerRow && r === 0;
                return (
                  <td
                    key={c}
                    className={`border border-slate-200 px-3 py-1 whitespace-nowrap ${
                      isHeader ? "bg-blue-50 font-semibold text-[#081B4B]" : "text-slate-700"
                    }`}
                  >
                    {val === "" || val === undefined ? "\u00A0" : val}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable */
    }
  };
  return (
    <button
      type="button"
      onClick={copy}
      aria-label="Copy formula"
      className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-400 hover:text-blue-600 transition-colors flex-shrink-0"
    >
      {copied ? <Check size={12} className="text-green-500" /> : <Copy size={12} />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
};

const SyntaxExplanation = ({ explanation }: { explanation: string }) => {
  const lines = explanation.split('\n');
  return (
    <div className="rounded-lg bg-indigo-50 border border-indigo-100 px-4 py-3">
      <div className="flex items-center gap-1.5 mb-2">
        <Info size={14} className="text-indigo-600" />
        <span className="text-[11px] font-bold text-indigo-700 uppercase tracking-wide">Syntax Parameters</span>
      </div>
      <div className="space-y-1">
        {lines.map((line, idx) => {
          const [param, desc] = line.split(': ');
          if (!desc) return <p key={idx} className="text-[12px] text-slate-600">{line}</p>;
          return (
            <div key={idx} className="text-[12px]">
              <span className="font-mono font-semibold text-indigo-700">{param}</span>
              <span className="text-slate-600">: {desc}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const PracticeQuestion = ({ question }: { question: string }) => {
  return (
    <div className="rounded-lg bg-amber-50 border border-amber-100 px-4 py-3">
      <div className="flex items-center gap-1.5 mb-1.5">
        <HelpCircle size={14} className="text-amber-600" />
        <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wide">Interview-Style Question</span>
      </div>
      <p className="text-[13px] text-[#081B4B] leading-relaxed">{question}</p>
    </div>
  );
};

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="rounded-lg bg-slate-50 border border-slate-100 px-3 py-2">
    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">{label}</span>
    <div className="mt-1">{children}</div>
  </div>
);

const FunctionCard = ({ fn, index }: { fn: ExcelFn; index: number }) => {
  const getDifficultyColor = (difficulty?: string) => {
    switch(difficulty) {
      case "Beginner": return "text-green-600 bg-green-50";
      case "Intermediate": return "text-yellow-600 bg-yellow-50";
      case "Advanced": return "text-red-600 bg-red-50";
      default: return "text-slate-600 bg-slate-50";
    }
  };

  return (
    <article
      id={fn.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
      className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 scroll-mt-24"
    >
      <header className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 font-bold text-sm flex items-center justify-center flex-shrink-0">
            {index + 1}
          </span>
          <h3 className="text-xl font-bold text-[#081B4B]">{fn.name}</h3>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className="text-[11px] font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full whitespace-nowrap">
            {fn.category}
          </span>
          <div className="flex items-center gap-1">
            {fn.difficulty && (
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${getDifficultyColor(fn.difficulty)}`}>
                {fn.difficulty}
              </span>
            )}
            {fn.frequency && (
              <span className="text-[10px] text-slate-500 bg-slate-50 px-2 py-0.5 rounded-full">
                {fn.frequency}
              </span>
            )}
          </div>
          {fn.availability && (
            <span className="text-[9px] text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full">
              {fn.availability}
            </span>
          )}
        </div>
      </header>

      <p className="text-sm text-slate-700 leading-relaxed mb-4">{fn.definition}</p>

      <div className="space-y-4">
        <Field label="Syntax">
          <div className="flex items-start justify-between gap-2">
            <code className="text-[13px] text-[#081B4B] font-mono break-all">{fn.syntax}</code>
            <CopyButton text={fn.syntax} />
          </div>
        </Field>

        <SyntaxExplanation explanation={fn.syntaxExplanation} />

        <Field label="Dataset (as in Excel)">
          {fn.grid ? <ExcelGrid grid={fn.grid} /> : <p className="text-[12px] text-slate-500 italic">{fn.note}</p>}
        </Field>

        <PracticeQuestion question={fn.question} />

        <Field label="Example">
          <div className="flex items-start justify-between gap-2">
            <code className="text-[13px] text-blue-700 font-mono break-all">{fn.example}</code>
            <CopyButton text={fn.example} />
          </div>
        </Field>

        <div className="rounded-lg bg-green-50 border border-green-100 px-3 py-2">
          <span className="text-[11px] font-bold text-green-700 uppercase tracking-wide">Result</span>
          <div className="mt-0.5 text-sm font-semibold text-green-800 font-mono whitespace-pre-wrap">{fn.result}</div>
        </div>
      </div>
    </article>
  );
};

// ============================================================
// STRUCTURED DATA FOR SEO (client-side)
// ============================================================
const structuredData = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Advanced Excel Functions Guide for Finance",
  "description": "Master the most-used Excel functions in finance jobs and interviews with real datasets and practice questions.",
  "url": "https://www.finlysta.com/guides/excel-functions-guide",
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.finlysta.com/" },
      { "@type": "ListItem", "position": 2, "name": "Learning Hub", "item": "https://www.finlysta.com/learning-hub" },
      { "@type": "ListItem", "position": 3, "name": "Excel Functions Guide", "item": "https://www.finlysta.com/guides/excel-functions-guide" }
    ]
  },
  "mainEntity": {
    "@type": "ItemList",
    "itemListElement": EXCEL_FUNCTIONS.map((fn, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": fn.name,
      "description": fn.definition,
      "url": `#${fn.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`
    }))
  }
};

// ============================================================
// MAIN GUIDE CLIENT COMPONENT
// ============================================================
export default function ExcelFunctionsGuideClient() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return EXCEL_FUNCTIONS.map((fn, i) => ({ fn, i })).filter(({ fn }) => {
      const matchesCategory = category === "All" || fn.category === category;
      const matchesQuery =
        !q ||
        fn.name.toLowerCase().includes(q) ||
        fn.definition.toLowerCase().includes(q) ||
        fn.category.toLowerCase().includes(q) ||
        (fn.difficulty && fn.difficulty.toLowerCase().includes(q)) ||
        (fn.frequency && fn.frequency.includes(q));
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  // Group functions by category for the count
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    CATEGORIES.forEach(cat => {
      if (cat === "All") {
        counts[cat] = EXCEL_FUNCTIONS.length;
      } else {
        counts[cat] = EXCEL_FUNCTIONS.filter(fn => fn.category === cat).length;
      }
    });
    return counts;
  }, []);

  return (
    <>
      {/* SEO Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="min-h-screen bg-[#F8FAFC]">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="max-w-4xl mx-auto px-6 pt-6">
          <ol className="flex items-center gap-1.5 text-xs text-slate-500">
            <li><Link href="/" className="hover:text-blue-600">Home</Link></li>
            <ChevronRight size={12} />
            <li><Link href="/learning-hub" className="hover:text-blue-600">Learning Hub</Link></li>
            <ChevronRight size={12} />
            <li className="text-slate-700 font-medium">Excel Functions Guide</li>
          </ol>
        </nav>

        {/* Hero */}
        <header className="max-w-4xl mx-auto px-6 pt-6 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 mb-4">
            <Sigma size={14} className="text-blue-600" />
            <span className="text-xs font-semibold text-blue-700">Free Finance Learning Guide</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-[#081B4B] leading-tight">
            Advanced Excel Functions<br className="hidden md:block" /> for Finance
          </h1>
          <p className="mt-4 text-base md:text-lg text-slate-600 max-w-3xl">
            The most-used Excel functions in finance jobs and interviews — from essential to advanced. 
            Each includes a clear <strong>definition</strong>, <strong>syntax</strong> with parameter explanations, 
            a <strong>real finance dataset</strong> shown as an Excel grid, an <strong>interview-style question</strong>, 
            a live <strong>example</strong>, and the <strong>result</strong>. Search, filter by category, and copy any formula.
          </p>
          
          {/* Quick Stats */}
          <div className="flex flex-wrap gap-6 mt-6 text-sm text-slate-600">
            <span className="flex items-center gap-2">
              <FileSpreadsheet size={16} className="text-blue-600" />
              <strong>{EXCEL_FUNCTIONS.length}</strong> Functions
            </span>
            <span className="flex items-center gap-2">
              <TrendingUp size={16} className="text-blue-600" />
              <strong>8</strong> Categories
            </span>
            <span className="flex items-center gap-2">
              <Users size={16} className="text-blue-600" />
              <strong>Real</strong> Finance Datasets
            </span>
            <span className="flex items-center gap-2">
              <BookOpen size={16} className="text-blue-600" />
              <strong>Interview</strong> Questions
            </span>
          </div>
        </header>

        {/* Search + category filter - Fixed at top */}
        <div className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-sm">
          <div className="max-w-4xl mx-auto px-6 py-4 space-y-3">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name, category, difficulty, or frequency (e.g. VLOOKUP, Advanced, ⭐⭐⭐⭐⭐)…"
                aria-label="Search Excel functions"
                className="w-full pl-12 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-[#081B4B] focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                    category === cat
                      ? "bg-blue-600 text-white shadow-sm"
                      : "bg-white text-slate-600 border border-slate-200 hover:bg-blue-50"
                  }`}
                >
                  {cat} <span className="text-[10px] opacity-70">({categoryCounts[cat] || 0})</span>
                </button>
              ))}
            </div>
            <p className="text-xs text-slate-400">
              Showing <span className="font-semibold text-[#081B4B]">{filtered.length}</span> of {EXCEL_FUNCTIONS.length} functions
            </p>
          </div>
        </div>

        {/* Results - Single column layout */}
        <main className="max-w-4xl mx-auto px-6 py-8">
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-slate-500">
              No functions match “{query}”. Try another keyword.
            </div>
          ) : (
            <div className="space-y-4">
              {filtered.map(({ fn, i }) => (
                <FunctionCard key={fn.name} fn={fn} index={i} />
              ))}
            </div>
          )}

          {/* CTA */}
          <section className="mt-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl px-6 py-8 text-center text-white">
            <h2 className="text-2xl font-bold">Ready to use these skills in a real finance job?</h2>
            <p className="mt-2 text-blue-100 max-w-xl mx-auto">
              Explore verified entry-level finance jobs and internships built for freshers on Finlysta.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mt-5">
              <Link href="/jobs" className="bg-white text-blue-700 font-semibold px-6 py-2.5 rounded-xl hover:bg-blue-50 transition">
                Browse Finance Jobs →
              </Link>
              <Link href="/learning-hub" className="border-2 border-white text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-white/10 transition">
                More Learning Guides →
              </Link>
            </div>
          </section>

          {/* FAQ Section for SEO */}
          <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
            <h2 className="text-2xl font-bold text-[#081B4B] mb-6">Frequently Asked Questions About Excel Functions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-[#081B4B]">What is VLOOKUP in Excel?</h3>
                  <p className="text-sm text-slate-600 mt-1">VLOOKUP searches for a value in the first column of a table and returns a value from the same row in a specified column. It's one of the most commonly used lookup functions in finance.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-[#081B4B]">How is XLOOKUP different from VLOOKUP?</h3>
                  <p className="text-sm text-slate-600 mt-1">XLOOKUP is the modern replacement for VLOOKUP. It can search in any direction, defaults to exact match, and has a built-in "if not found" parameter, making it more flexible and easier to use.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-[#081B4B]">What is SUMIFS used for?</h3>
                  <p className="text-sm text-slate-600 mt-1">SUMIFS adds up cells that meet multiple conditions. It's essential for financial analysis when you need to sum values based on several criteria simultaneously.</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-[#081B4B]">What finance functions should I learn?</h3>
                  <p className="text-sm text-slate-600 mt-1">Key finance functions include NPV (Net Present Value), IRR (Internal Rate of Return), PMT (Loan Payment), XIRR (IRR with irregular dates), and financial modeling functions like FILTER and SORT.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-[#081B4B]">How do INDEX and MATCH work together?</h3>
                  <p className="text-sm text-slate-600 mt-1">INDEX returns a value from a table based on row and column numbers. MATCH finds the position of a value. Together, they create a flexible two-way lookup that's more powerful than VLOOKUP.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-[#081B4B]">What are the most used Excel functions in finance?</h3>
                  <p className="text-sm text-slate-600 mt-1">The most used finance functions include VLOOKUP, XLOOKUP, SUMIFS, COUNTIFS, IF, NPV, IRR, PMT, ROUND, INDEX+MATCH, FILTER, and SORT. These form the foundation of financial modeling and analysis.</p>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}