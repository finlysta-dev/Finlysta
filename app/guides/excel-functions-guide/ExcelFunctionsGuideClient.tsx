// app/guides/excel-functions-guide/ExcelFunctionsGuideClient.tsx

"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Search, 
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
// DATA — 50 functions with syntax explanations
// ============================================================
export const EXCEL_FUNCTIONS: ExcelFn[] = [
  // ---------- Lookup & Reference ----------
  { name: "VLOOKUP", category: "Lookup & Reference",
    definition: "Searches for a value in the first column of a range and returns a value from the same row in a column you specify.",
    syntax: "=VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup])",
    syntaxExplanation: "lookup_value: The value to search for in the first column.\ntable_array: The range containing the data.\ncol_index_num: The column number in the table from which to return a value.\n[range_lookup]: TRUE for approximate match, FALSE for exact match.",
    grid: { headerRow: true, rows: [["Employee", "Salary"], ["Ravi", 50000], ["Priya", 60000], ["Amit", 55000]] },
    example: '=VLOOKUP("Priya", A2:B4, 2, FALSE)', result: "60000",
    question: 'Using the table above, write a formula to find Priya\'s salary.' },
  { name: "HLOOKUP", category: "Lookup & Reference",
    definition: "Looks up a value in the first row of a range and returns a value from a row you specify (horizontal lookup).",
    syntax: "=HLOOKUP(lookup_value, table_array, row_index_num, [range_lookup])",
    syntaxExplanation: "lookup_value: The value to search for in the first row.\ntable_array: The range containing the data.\nrow_index_num: The row number in the table from which to return a value.\n[range_lookup]: TRUE for approximate match, FALSE for exact match.",
    grid: { headerRow: true, rows: [["Q1", "Q2", "Q3"], [100, 200, 300]] },
    example: '=HLOOKUP("Q2", A1:C2, 2, FALSE)', result: "200",
    question: 'Write a formula to find the value for Q2 using HLOOKUP.' },
  { name: "XLOOKUP", category: "Lookup & Reference",
    definition: "Modern replacement for VLOOKUP/HLOOKUP. Searches any direction, returns an exact match by default, and supports an 'if not found' value.",
    syntax: "=XLOOKUP(lookup_value, lookup_array, return_array, [if_not_found], [match_mode], [search_mode])",
    syntaxExplanation: "lookup_value: The value to search for.\nlookup_array: The range or array to search.\nreturn_array: The range or array from which to return a value.\n[if_not_found]: Value to return if no match is found.\n[match_mode]: 0 for exact match (default).\n[search_mode]: 1 for first to last (default).",
    grid: { headerRow: true, rows: [["Product ID", "Price"], ["P101", 250], ["P102", 300], ["P103", 450], ["P104", 500]] },
    example: '=XLOOKUP("P103", A2:A5, B2:B5, "Not found")', result: "450",
    question: 'Write an XLOOKUP formula to find the price of P103.' },
  { name: "INDEX", category: "Lookup & Reference",
    definition: "Returns the value at a given row and column position within a range.",
    syntax: "=INDEX(array, row_num, [column_num])",
    syntaxExplanation: "array: The range of cells.\nrow_num: The row number in the array from which to return a value.\n[column_num]: The column number in the array from which to return a value.",
    grid: { headerRow: true, rows: [["Region", "Product", "Sales"], ["North", "Pen", 300], ["South", "Book", 450], ["East", "Bag", 700]] },
    example: "=INDEX(A2:C4, 3, 2)", result: "Bag",
    question: "Write an INDEX formula to return the Product in row 2 of the table." },
  { name: "MATCH", category: "Lookup & Reference",
    definition: "Returns the relative position of a lookup value within a range.",
    syntax: "=MATCH(lookup_value, lookup_array, [match_type])",
    syntaxExplanation: "lookup_value: The value to search for.\nlookup_array: The range to search.\n[match_type]: 0 for exact match, 1 for less than, -1 for greater than.",
    grid: { headerRow: true, rows: [["Month"], ["Jan"], ["Feb"], ["Mar"], ["Apr"], ["May"]] },
    example: '=MATCH("Mar", A2:A6, 0)', result: "3",
    question: 'Write a MATCH formula to find the position of "Mar" in the list.' },
  { name: "INDEX + MATCH", category: "Lookup & Reference",
    definition: "Combined, they perform a flexible lookup that (unlike VLOOKUP) can also return values to the left of the lookup column.",
    syntax: "=INDEX(return_range, MATCH(lookup_value, lookup_range, 0))",
    syntaxExplanation: "return_range: The range from which to return a value.\nMATCH(lookup_value, lookup_range, 0): Finds the position of the lookup value.\nThis combination is more flexible than VLOOKUP.",
    grid: { headerRow: true, rows: [["Product ID", "Price"], ["P101", 250], ["P102", 300], ["P103", 450], ["P104", 500]] },
    example: '=INDEX(B2:B5, MATCH("P104", A2:A5, 0))', result: "500",
    question: 'Write an INDEX+MATCH formula to find the price of P104.' },
  { name: "OFFSET", category: "Lookup & Reference",
    definition: "Returns a reference shifted a given number of rows and columns from a starting cell (great for dynamic ranges).",
    syntax: "=OFFSET(reference, rows, cols, [height], [width])",
    syntaxExplanation: "reference: The starting cell.\nrows: The number of rows to move (positive = down, negative = up).\ncols: The number of columns to move (positive = right, negative = left).\n[height]: The height of the returned range.\n[width]: The width of the returned range.",
    grid: { rows: [[5, 10, 15], [20, 25, 30], [35, 40, 45]] },
    example: "=OFFSET(A1, 2, 1)", result: "40",
    question: "Write an OFFSET formula to return the value 2 rows down and 2 columns right from A1." },
  { name: "INDIRECT", category: "Lookup & Reference",
    definition: "Converts a text string into an actual cell reference.",
    syntax: "=INDIRECT(ref_text, [a1])",
    syntaxExplanation: "ref_text: The text string that contains a valid cell reference.\n[a1]: TRUE for A1-style references (default), FALSE for R1C1-style.",
    grid: { rows: [["B2", ""], ["", 500]] },
    example: "=INDIRECT(A1)", result: "500",
    question: 'If A1 contains "B2" and B2 contains 900, what would =INDIRECT(A1) return?' },

  // ---------- Logical ----------
  { name: "IF", category: "Logical",
    definition: "Returns one value if a condition is TRUE and another if it is FALSE.",
    syntax: "=IF(logical_test, value_if_true, value_if_false)",
    syntaxExplanation: "logical_test: The condition to test.\nvalue_if_true: The value to return if the condition is TRUE.\nvalue_if_false: The value to return if the condition is FALSE.",
    grid: { headerRow: true, rows: [["Score"], [75]] },
    example: '=IF(A2>=50, "Pass", "Fail")', result: "Pass",
    question: 'Write an IF formula to check if the score in A2 is greater than or equal to 50.' },
  { name: "IFS", category: "Logical",
    definition: "Checks multiple conditions and returns the value for the first one that is TRUE.",
    syntax: "=IFS(test1, value1, test2, value2, ...)",
    syntaxExplanation: "test1: The first condition to test.\nvalue1: The value to return if test1 is TRUE.\ntest2: The second condition to test.\nvalue2: The value to return if test2 is TRUE.\n... You can add as many condition-value pairs as needed.",
    grid: { headerRow: true, rows: [["Score"], [82]] },
    example: '=IFS(A2>=90,"A", A2>=75,"B", A2>=50,"C")', result: "B",
    question: 'Write an IFS formula to grade a score of 82 in cell A2.' },
  { name: "IFERROR", category: "Logical",
    definition: "Returns a value you specify if a formula produces an error; otherwise returns the formula's own result.",
    syntax: "=IFERROR(value, value_if_error)",
    syntaxExplanation: "value: The formula or value to evaluate.\nvalue_if_error: The value to return if an error occurs.",
    grid: { headerRow: true, rows: [["Sales", "Units"], [100, 0]] },
    example: '=IFERROR(A2/B2, "Check input")', result: "Check input",
    question: 'Write an IFERROR formula to handle division by zero in A2/B2.' },
  { name: "IFNA", category: "Logical",
    definition: "Returns a specified value only when the result is the #N/A error (leaves other errors untouched).",
    syntax: "=IFNA(value, value_if_na)",
    syntaxExplanation: "value: The formula or value to evaluate.\nvalue_if_na: The value to return if the result is #N/A.",
    grid: { headerRow: true, rows: [["Name", "Dept"], ["Ravi", "Finance"], ["Priya", "Audit"]] },
    example: '=IFNA(VLOOKUP("Zed", A2:B3, 2, FALSE), "Not found")', result: "Not found",
    question: 'Write an IFNA formula that returns "Not found" if VLOOKUP for "Zed" fails.' },
  { name: "AND", category: "Logical",
    definition: "Returns TRUE only if every condition is TRUE.",
    syntax: "=AND(logical1, [logical2], ...)",
    syntaxExplanation: "logical1: The first condition to check.\n[logical2]: Additional conditions to check.\nAll conditions must be TRUE for AND to return TRUE.",
    grid: { headerRow: true, rows: [["Math", "English"], [60, 70]] },
    example: "=AND(A2>50, B2>50)", result: "TRUE",
    question: 'Write an AND formula to check if both Math and English scores are above 50.' },
  { name: "OR", category: "Logical",
    definition: "Returns TRUE if at least one condition is TRUE.",
    syntax: "=OR(logical1, [logical2], ...)",
    syntaxExplanation: "logical1: The first condition to check.\n[logical2]: Additional conditions to check.\nAt least one condition must be TRUE for OR to return TRUE.",
    grid: { headerRow: true, rows: [["Math", "English"], [40, 70]] },
    example: "=OR(A2>50, B2>50)", result: "TRUE",
    question: 'Write an OR formula to check if either Math or English score is above 50.' },
  { name: "SWITCH", category: "Logical",
    definition: "Compares an expression against a list of values and returns the matching result (with an optional default).",
    syntax: "=SWITCH(expression, val1, result1, ..., [default])",
    syntaxExplanation: "expression: The value to compare.\nval1: The first value to compare against.\nresult1: The result to return if expression matches val1.\n[default]: The value to return if no match is found.",
    grid: { headerRow: true, rows: [["Quarter"], ["Q2"]] },
    example: '=SWITCH(A2, "Q1",100, "Q2",200, "Q3",300, 0)', result: "200",
    question: 'Write a SWITCH formula that returns 200 when A2 contains "Q2".' },

  // ---------- Math & Aggregation ----------
  { name: "SUMIF", category: "Math & Aggregation",
    definition: "Adds up cells that meet a single condition.",
    syntax: "=SUMIF(range, criteria, [sum_range])",
    syntaxExplanation: "range: The range to evaluate against the criteria.\ncriteria: The condition that determines which cells to sum.\n[sum_range]: The range to sum (if different from range).",
    grid: { headerRow: true, rows: [["Region", "Sales"], ["West", 100], ["East", 200], ["West", 150], ["North", 300], ["West", 250]] },
    example: '=SUMIF(A2:A6, "West", B2:B6)', result: "500",
    question: 'Write a SUMIF formula to total sales for the "West" region.' },
  { name: "SUMIFS", category: "Math & Aggregation",
    definition: "Adds up cells that meet multiple conditions.",
    syntax: "=SUMIFS(sum_range, criteria_range1, criteria1, ...)",
    syntaxExplanation: "sum_range: The range to sum.\ncriteria_range1: The first range to evaluate.\ncriteria1: The first condition.\n... Additional criteria_range and criteria pairs can be added.",
    grid: { headerRow: true, rows: [["Region", "Quarter", "Sales"], ["West", "Q1", 100], ["East", "Q1", 200], ["West", "Q1", 150], ["West", "Q2", 300], ["East", "Q2", 250]] },
    example: '=SUMIFS(C2:C6, A2:A6,"West", B2:B6,"Q1")', result: "250",
    question: 'Write a SUMIFS formula to sum sales where Region is "West" and Quarter is "Q1".' },
  { name: "COUNTIF", category: "Math & Aggregation",
    definition: "Counts the number of cells that meet a single condition.",
    syntax: "=COUNTIF(range, criteria)",
    syntaxExplanation: "range: The range to evaluate.\ncriteria: The condition that determines which cells to count.",
    grid: { headerRow: true, rows: [["Region"], ["West"], ["East"], ["West"], ["North"], ["West"]] },
    example: '=COUNTIF(A2:A6, "West")', result: "3",
    question: 'Write a COUNTIF formula to count how many times "West" appears in the list.' },
  { name: "COUNTIFS", category: "Math & Aggregation",
    definition: "Counts cells that meet multiple conditions.",
    syntax: "=COUNTIFS(range1, criteria1, range2, criteria2, ...)",
    syntaxExplanation: "range1: The first range to evaluate.\ncriteria1: The first condition.\nrange2: The second range to evaluate.\ncriteria2: The second condition.",
    grid: { headerRow: true, rows: [["Region", "Sales"], ["West", 100], ["East", 200], ["West", 160], ["North", 300], ["West", 250]] },
    example: '=COUNTIFS(A2:A6,"West", B2:B6,">150")', result: "2",
    question: 'Write a COUNTIFS formula to count West region rows with Sales greater than 150.' },
  { name: "AVERAGEIF", category: "Math & Aggregation",
    definition: "Averages cells that meet a single condition.",
    syntax: "=AVERAGEIF(range, criteria, [average_range])",
    syntaxExplanation: "range: The range to evaluate.\ncriteria: The condition that determines which cells to average.\n[average_range]: The range to average (if different from range).",
    grid: { headerRow: true, rows: [["Region", "Sales"], ["West", 100], ["East", 200], ["West", 150], ["North", 300], ["West", 250]] },
    example: '=AVERAGEIF(A2:A6, "West", B2:B6)', result: "166.67",
    question: 'Write an AVERAGEIF formula to average sales for the "West" region.' },
  { name: "AVERAGEIFS", category: "Math & Aggregation",
    definition: "Averages cells that meet multiple conditions.",
    syntax: "=AVERAGEIFS(avg_range, crit_range1, crit1, ...)",
    syntaxExplanation: "avg_range: The range to average.\ncrit_range1: The first range to evaluate.\ncrit1: The first condition.",
    grid: { headerRow: true, rows: [["Region", "Quarter", "Sales"], ["West", "Q1", 100], ["East", "Q1", 200], ["West", "Q1", 150], ["West", "Q2", 300]] },
    example: '=AVERAGEIFS(C2:C5, A2:A5,"West", B2:B5,"Q1")', result: "125",
    question: 'Write an AVERAGEIFS formula to average sales for "West" region in "Q1".' },
  { name: "SUMPRODUCT", category: "Math & Aggregation",
    definition: "Multiplies corresponding items in arrays and returns the sum of the products — perfect for weighted totals.",
    syntax: "=SUMPRODUCT(array1, [array2], ...)",
    syntaxExplanation: "array1: The first array to multiply.\n[array2]: Additional arrays to multiply.\nThe function multiplies corresponding values and sums the results.",
    grid: { headerRow: true, rows: [["Item", "Qty", "Price"], ["Pen", 2, 100], ["Book", 3, 200], ["Bag", 4, 150]] },
    example: "=SUMPRODUCT(B2:B4, C2:C4)", result: "1400",
    question: 'Write a SUMPRODUCT formula to calculate total value (Qty × Price).' },
  { name: "ROUND", category: "Math & Aggregation",
    definition: "Rounds a number to a specified number of digits.",
    syntax: "=ROUND(number, num_digits)",
    syntaxExplanation: "number: The number to round.\nnum_digits: The number of decimal places to round to.",
    grid: { headerRow: true, rows: [["Value"], [1234.567]] },
    example: "=ROUND(A2, 2)", result: "1234.57",
    question: 'Write a ROUND formula to round 1234.567 to 2 decimal places.' },
  { name: "SUBTOTAL", category: "Math & Aggregation",
    definition: "Returns a subtotal (sum, average, count, etc.) that ignores filtered-out rows and other SUBTOTALs.",
    syntax: "=SUBTOTAL(function_num, ref1, ...)   // 9 = SUM",
    syntaxExplanation: "function_num: The function to use (9 for SUM, 1 for AVERAGE, etc.).\nref1: The range to evaluate.\n... Additional ranges can be added.",
    grid: { headerRow: true, rows: [["Sales"], [100], [200], [150], [300], [250]] },
    example: "=SUBTOTAL(9, A2:A6)", result: "1000",
    question: 'Write a SUBTOTAL formula to sum the values in A2:A6.' },
  { name: "AGGREGATE", category: "Math & Aggregation",
    definition: "Like SUBTOTAL but more powerful — it can ignore errors and hidden rows and supports more functions.",
    syntax: "=AGGREGATE(function_num, options, ref1, ...)   // 9=SUM, 6=ignore errors",
    syntaxExplanation: "function_num: The function to use (9 for SUM).\noptions: How to handle hidden rows and errors (6 ignores errors).\nref1: The range to evaluate.",
    grid: { headerRow: true, rows: [["Sales"], [100], [200], ["#N/A"], [300]] },
    example: "=AGGREGATE(9, 6, A2:A5)", result: "600",
    question: 'Write an AGGREGATE formula to sum A2:A5 while ignoring errors.' },

  // ---------- Text ----------
  { name: "LEFT", category: "Text",
    definition: "Returns a given number of characters from the start (left) of a text string.",
    syntax: "=LEFT(text, [num_chars])",
    syntaxExplanation: "text: The text string to extract from.\n[num_chars]: The number of characters to extract (default is 1).",
    grid: { headerRow: true, rows: [["Text"], ["Finlysta"]] },
    example: "=LEFT(A2, 3)", result: "Fin",
    question: 'Write a LEFT formula to extract the first 3 characters from "Finlysta".' },
  { name: "RIGHT", category: "Text",
    definition: "Returns a given number of characters from the end (right) of a text string.",
    syntax: "=RIGHT(text, [num_chars])",
    syntaxExplanation: "text: The text string to extract from.\n[num_chars]: The number of characters to extract (default is 1).",
    grid: { headerRow: true, rows: [["Code"], ["2024-Q3"]] },
    example: "=RIGHT(A2, 2)", result: "Q3",
    question: 'Write a RIGHT formula to extract the last 2 characters from "2024-Q3".' },
  { name: "MID", category: "Text",
    definition: "Returns characters from the middle of a string, given a start position and length.",
    syntax: "=MID(text, start_num, num_chars)",
    syntaxExplanation: "text: The text string to extract from.\nstart_num: The starting position in the text.\nnum_chars: The number of characters to extract.",
    grid: { headerRow: true, rows: [["Invoice"], ["INV-2024-001"]] },
    example: "=MID(A2, 5, 4)", result: "2024",
    question: 'Write a MID formula to extract "2024" from "INV-2024-001".' },
  { name: "LEN", category: "Text",
    definition: "Returns the number of characters in a text string.",
    syntax: "=LEN(text)",
    syntaxExplanation: "text: The text string to measure.",
    grid: { headerRow: true, rows: [["Word"], ["Finance"]] },
    example: "=LEN(A2)", result: "7",
    question: 'Write a LEN formula to count the characters in "Finance".' },
  { name: "TRIM", category: "Text",
    definition: "Removes extra spaces from text, leaving single spaces between words.",
    syntax: "=TRIM(text)",
    syntaxExplanation: "text: The text string to clean.",
    grid: { headerRow: true, rows: [["Text"], ["  Net   Profit  "]] },
    example: "=TRIM(A2)", result: "Net Profit",
    question: 'Write a TRIM formula to clean up extra spaces in "  Net   Profit  ".' },
  { name: "CONCAT", category: "Text",
    definition: "Joins text from multiple cells or ranges into one string.",
    syntax: "=CONCAT(text1, [text2], ...)",
    syntaxExplanation: "text1: The first text value to join.\n[text2]: Additional text values to join.",
    grid: { headerRow: true, rows: [["Prefix", "Year"], ["FY", "2024"]] },
    example: "=CONCAT(A2, B2)", result: "FY2024",
    question: 'Write a CONCAT formula to join "FY" and "2024".' },
  { name: "TEXTJOIN", category: "Text",
    definition: "Joins a list of values with a chosen delimiter and can ignore empty cells.",
    syntax: "=TEXTJOIN(delimiter, ignore_empty, text1, ...)",
    syntaxExplanation: "delimiter: The separator between joined values.\nignore_empty: TRUE to skip empty cells, FALSE to include them.\ntext1: The first text value to join.",
    grid: { headerRow: true, rows: [["Asset"], ["Debt"], ["Equity"], ["Cash"]] },
    example: '=TEXTJOIN(", ", TRUE, A2:A4)', result: "Debt, Equity, Cash",
    question: 'Write a TEXTJOIN formula to join values with a comma and space.' },
  { name: "SUBSTITUTE", category: "Text",
    definition: "Replaces occurrences of specified text with new text (optionally only the Nth occurrence).",
    syntax: "=SUBSTITUTE(text, old_text, new_text, [instance_num])",
    syntaxExplanation: "text: The text to modify.\nold_text: The text to replace.\nnew_text: The text to replace with.\n[instance_num]: Which occurrence to replace (omit to replace all).",
    grid: { headerRow: true, rows: [["Period"], ["2024-2024"]] },
    example: '=SUBSTITUTE(A2, "2024", "2025", 2)', result: "2024-2025",
    question: 'Write a SUBSTITUTE formula to replace only the second "2024" with "2025".' },
  { name: "FIND", category: "Text",
    definition: "Returns the position of one text string inside another (case-sensitive).",
    syntax: "=FIND(find_text, within_text, [start_num])",
    syntaxExplanation: "find_text: The text to find.\nwithin_text: The text to search within.\n[start_num]: The starting position for the search.",
    grid: { headerRow: true, rows: [["Code"], ["INV-001"]] },
    example: '=FIND("-", A2)', result: "4",
    question: 'Write a FIND formula to locate the position of "-" in "INV-001".' },
  { name: "TEXT", category: "Text",
    definition: "Converts a number into text using a specified format code.",
    syntax: "=TEXT(value, format_text)",
    syntaxExplanation: "value: The number to format.\nformat_text: The format code (e.g., '0.0%', '$#,##0.00').",
    grid: { headerRow: true, rows: [["Ratio"], [0.256]] },
    example: '=TEXT(A2, "0.0%")', result: "25.6%",
    question: 'Write a TEXT formula to format 0.256 as a percentage with 1 decimal place.' },

  // ---------- Date & Time ----------
  { name: "TODAY", category: "Date & Time",
    definition: "Returns the current date; updates automatically each day.",
    syntax: "=TODAY()",
    syntaxExplanation: "No arguments needed. Returns the current date.",
    note: "No dataset needed — reads the system date.",
    example: "=TODAY()", result: "Current Date",
    question: 'Write a TODAY formula to get the current date.' },
  { name: "DATE", category: "Date & Time",
    definition: "Builds a valid date from separate year, month, and day values.",
    syntax: "=DATE(year, month, day)",
    syntaxExplanation: "year: The year (e.g., 2024).\nmonth: The month (1-12).\nday: The day (1-31).",
    note: "No dataset needed — values are typed directly.",
    example: "=DATE(2024, 3, 31)", result: "31-03-2024",
    question: 'Write a DATE formula to create the date March 31, 2024.' },
  { name: "DATEDIF", category: "Date & Time",
    definition: "Returns the difference between two dates in years, months, or days.",
    syntax: '=DATEDIF(start_date, end_date, unit)   // "Y","M","D"',
    syntaxExplanation: "start_date: The beginning date.\nend_date: The ending date.\nunit: 'Y' for years, 'M' for months, 'D' for days.",
    grid: { headerRow: true, rows: [["Start", "End"], ["01-01-2024", "31-12-2024"]] },
    example: '=DATEDIF(A2, B2, "M")', result: "11",
    question: 'Write a DATEDIF formula to find the difference in months between 01-01-2024 and 31-12-2024.' },
  { name: "EOMONTH", category: "Date & Time",
    definition: "Returns the last day of the month, a given number of months before/after a date.",
    syntax: "=EOMONTH(start_date, months)",
    syntaxExplanation: "start_date: The starting date.\nmonths: The number of months to move (0 for current month).",
    grid: { headerRow: true, rows: [["Date"], ["15-01-2024"]] },
    example: "=EOMONTH(A2, 0)", result: "31-01-2024",
    question: 'Write an EOMONTH formula to find the last day of January 2024 from 15-01-2024.' },
  { name: "EDATE", category: "Date & Time",
    definition: "Returns a date a given number of months before or after a start date.",
    syntax: "=EDATE(start_date, months)",
    syntaxExplanation: "start_date: The starting date.\nmonths: The number of months to move (positive for future, negative for past).",
    grid: { headerRow: true, rows: [["Date"], ["15-01-2024"]] },
    example: "=EDATE(A2, 3)", result: "15-04-2024",
    question: 'Write an EDATE formula to add 3 months to 15-01-2024.' },
  { name: "NETWORKDAYS", category: "Date & Time",
    definition: "Counts working days between two dates, excluding weekends and any listed holidays.",
    syntax: "=NETWORKDAYS(start_date, end_date, [holidays])",
    syntaxExplanation: "start_date: The beginning date.\nend_date: The ending date.\n[holidays]: Optional range of holiday dates to exclude.",
    grid: { headerRow: true, rows: [["Start", "End"], ["01-07-2024", "31-07-2024"]] },
    example: "=NETWORKDAYS(A2, B2)", result: "23",
    question: 'Write a NETWORKDAYS formula to count working days in July 2024.' },
  { name: "YEARFRAC", category: "Date & Time",
    definition: "Returns the fraction of a year between two dates — used in interest and pro-rata calculations.",
    syntax: "=YEARFRAC(start_date, end_date, [basis])",
    syntaxExplanation: "start_date: The beginning date.\nend_date: The ending date.\n[basis]: Day count convention (0 = US 30/360).",
    grid: { headerRow: true, rows: [["Start", "End"], ["01-01-2024", "01-07-2024"]] },
    example: "=YEARFRAC(A2, B2, 0)", result: "0.5",
    question: 'Write a YEARFRAC formula to find the fraction of a year between 01-01-2024 and 01-07-2024.' },

  // ---------- Financial ----------
  { name: "NPV", category: "Financial",
    definition: "Returns the net present value of a series of future cash flows discounted at a given rate.",
    syntax: "=NPV(rate, value1, [value2], ...)",
    syntaxExplanation: "rate: The discount rate per period.\nvalue1: The first cash flow.\n[value2]: Additional cash flows.",
    grid: { headerRow: true, rows: [["Year", "Cash Flow"], [1, 3000], [2, 4200], [3, 6800]] },
    example: "=NPV(10%, B2:B4)", result: "≈ 11,307.28",
    question: 'Write an NPV formula to calculate the present value of cash flows at 10% discount rate.' },
  { name: "IRR", category: "Financial",
    definition: "Returns the internal rate of return for a series of periodic cash flows.",
    syntax: "=IRR(values, [guess])",
    syntaxExplanation: "values: The cash flows (must include at least one negative and one positive).\n[guess]: An estimated rate (optional, default is 0.1).",
    grid: { headerRow: true, rows: [["Year", "Cash Flow"], [0, -10000], [1, 3000], [2, 4200], [3, 6800]] },
    example: "=IRR(B2:B5)", result: "≈ 16.3%",
    question: 'Write an IRR formula to calculate the internal rate of return for the cash flows.' },
  { name: "XIRR", category: "Financial",
    definition: "Returns the internal rate of return for cash flows that occur on irregular dates.",
    syntax: "=XIRR(values, dates, [guess])",
    syntaxExplanation: "values: The cash flows.\ndates: The corresponding dates.\n[guess]: An estimated rate (optional).",
    grid: { headerRow: true, rows: [["Date", "Cash Flow"], ["01-01-2024", -10000], ["01-06-2024", 3000], ["01-11-2024", 4200], ["01-03-2025", 6800]] },
    example: "=XIRR(B2:B5, A2:A5)", result: "≈ 16.7%",
    question: 'Write an XIRR formula for the given cash flows with irregular dates.' },
  { name: "PMT", category: "Financial",
    definition: "Calculates the fixed periodic payment for a loan at a constant interest rate.",
    syntax: "=PMT(rate, nper, pv, [fv], [type])",
    syntaxExplanation: "rate: The interest rate per period.\nnper: The total number of payment periods.\npv: The present value (loan amount).\n[fv]: The future value (default 0).\n[type]: 0 for end of period, 1 for beginning.",
    grid: { headerRow: true, rows: [["Loan", "Rate", "Months"], [500000, "10%", 60]] },
    example: "=PMT(10%/12, 60, -500000)", result: "≈ ₹10,624",
    question: 'Write a PMT formula to calculate monthly payment for a ₹500,000 loan at 10% for 60 months.' },
  { name: "FV", category: "Financial",
    definition: "Returns the future value of an investment with regular payments and a constant rate.",
    syntax: "=FV(rate, nper, pmt, [pv], [type])",
    syntaxExplanation: "rate: The interest rate per period.\nnper: The number of periods.\npmt: The payment per period.\n[pv]: The present value (default 0).\n[type]: 0 for end of period, 1 for beginning.",
    grid: { headerRow: true, rows: [["Monthly", "Rate", "Months"], [5000, "8%", 120]] },
    example: "=FV(8%/12, 120, -5000)", result: "≈ ₹9,14,700",
    question: 'Write an FV formula to find future value of ₹5,000 monthly at 8% for 120 months.' },

  // ---------- Dynamic Arrays ----------
  { name: "FILTER", category: "Dynamic Arrays",
    definition: "Returns only the rows from a range that meet a condition (results spill automatically).",
    syntax: "=FILTER(array, include, [if_empty])",
    syntaxExplanation: "array: The range to filter.\ninclude: The condition array (TRUE/FALSE).\n[if_empty]: Value to return if no results.",
    grid: { headerRow: true, rows: [["Name", "Dept"], ["Ravi", "Finance"], ["Priya", "Audit"], ["Amit", "Finance"], ["Neha", "Tax"]] },
    example: '=FILTER(A2:B5, B2:B5="Finance", "None")', result: "Ravi, Amit",
    question: 'Write a FILTER formula to show only rows where Department is "Finance".' },
  { name: "SORT", category: "Dynamic Arrays",
    definition: "Sorts the contents of a range or array by a chosen column and order.",
    syntax: "=SORT(array, [sort_index], [sort_order], [by_col])",
    syntaxExplanation: "array: The range to sort.\n[sort_index]: The column to sort by.\n[sort_order]: 1 for ascending, -1 for descending.\n[by_col]: TRUE to sort by column, FALSE for row.",
    grid: { headerRow: true, rows: [["Name", "Sales"], ["Ravi", 300], ["Priya", 500], ["Amit", 200]] },
    example: "=SORT(A2:B4, 2, -1)", result: "Priya 500, Ravi 300, Amit 200",
    question: 'Write a SORT formula to sort the table by Sales in descending order.' },
  { name: "UNIQUE", category: "Dynamic Arrays",
    definition: "Returns a list of the distinct values from a range, removing duplicates.",
    syntax: "=UNIQUE(array, [by_col], [exactly_once])",
    syntaxExplanation: "array: The range to get unique values from.\n[by_col]: TRUE for columns, FALSE for rows.\n[exactly_once]: TRUE to return values that appear only once.",
    grid: { headerRow: true, rows: [["Region"], ["West"], ["East"], ["West"], ["North"], ["East"], ["West"]] },
    example: "=UNIQUE(A2:A7)", result: "West, East, North",
    question: 'Write a UNIQUE formula to extract unique regions from the list.' },
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
        <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wide">Practice Question</span>
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

const FunctionCard = ({ fn, index }: { fn: ExcelFn; index: number }) => (
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
      <span className="text-[11px] font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full whitespace-nowrap">
        {fn.category}
      </span>
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
        <p className="text-sm font-semibold text-green-800 font-mono mt-0.5">{fn.result}</p>
      </div>
    </div>
  </article>
);

// ============================================================
// STRUCTURED DATA FOR SEO (client-side)
// ============================================================
const structuredData = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Top 50 Advanced Excel Functions for Finance",
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
        fn.category.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

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
            Top 50 Advanced Excel Functions<br className="hidden md:block" /> for Finance
          </h1>
          <p className="mt-4 text-base md:text-lg text-slate-600 max-w-3xl">
            The most-used Excel functions in finance jobs and interviews — each with a clear{" "}
            <strong>definition</strong>, <strong>syntax</strong> with parameter explanations, a <strong>real dataset</strong> shown as an Excel grid, a{" "}
            <strong>practice question</strong>, a live <strong>example</strong>, and the <strong>result</strong>.
            Search, filter by category, and copy any formula.
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
              <strong>Real</strong> Datasets
            </span>
            <span className="flex items-center gap-2">
              <BookOpen size={16} className="text-blue-600" />
              <strong>Practice</strong> Questions
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
    placeholder="Search a function (e.g. VLOOKUP, NPV, SUMIFS)…"
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
                  {cat}
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
                  <p className="text-sm text-slate-600 mt-1">Key finance functions include NPV (Net Present Value), IRR (Internal Rate of Return), PMT (Loan Payment), and XIRR (IRR with irregular dates). These are used in investment analysis and financial modeling.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-[#081B4B]">How do INDEX and MATCH work together?</h3>
                  <p className="text-sm text-slate-600 mt-1">INDEX returns a value from a table based on row and column numbers. MATCH finds the position of a value. Together, they create a flexible two-way lookup that's more powerful than VLOOKUP.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-[#081B4B]">What are the most used Excel functions in finance?</h3>
                  <p className="text-sm text-slate-600 mt-1">The most used finance functions include VLOOKUP, XLOOKUP, SUMIFS, COUNTIFS, IF, NPV, IRR, PMT, ROUND, and INDEX+MATCH. These form the foundation of financial modeling and analysis.</p>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}