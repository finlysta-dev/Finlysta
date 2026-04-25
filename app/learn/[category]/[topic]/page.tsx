import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Clock, ChevronRight, ChevronLeft, CheckCircle, Target, Lightbulb, BookOpen, Zap, ArrowRight } from 'lucide-react';

const topicContent: Record<string, Record<string, any>> = {
  excel: {
    'pivot-tables': {
      title: 'Pivot Tables',
      level: 'Intermediate',
      duration: '15 min',
      definition: 'A Pivot Table is a powerful data summarization tool that transforms large datasets into meaningful reports automatically. It groups, counts, totals, and averages data without formulas.',
      detailedDefinition: [
        'Automatically organizes and summarizes raw data',
        'Groups similar data together (by region, product, month, etc.)',
        'Calculates totals, counts, averages, and other statistics',
        'Creates interactive reports that can be filtered and sliced',
        'Updates instantly when source data changes'
      ],
      whyItMatters: [
        { use: 'Sales Analysis', description: 'See which regions generate the most revenue, which products sell best' },
        { use: 'Track Trends', description: 'Monitor monthly or quarterly sales patterns to forecast future performance' },
        { use: 'Create Reports', description: 'Generate professional summaries for management presentations' },
        { use: 'Identify Opportunities', description: 'Quickly spot top and low-performing products, regions, or customers' }
      ],
      keyConcepts: [
        { term: 'Rows', description: 'Categories that appear vertically', example: 'Products, Regions', realUse: 'List items you want to compare' },
        { term: 'Columns', description: 'Categories that appear horizontally', example: 'Months, Quarters', realUse: 'Organize data by time periods' },
        { term: 'Values', description: 'Numbers that get calculated', example: 'Sales, Quantity', realUse: 'Key metrics you want to analyze' },
        { term: 'Filters', description: 'Show only specific data', example: 'Region = "North"', realUse: 'Focus on specific segments' }
      ],
      steps: [
        { step: 'Select your raw data', detail: 'Click any cell in your data range' },
        { step: 'Go to Insert tab', detail: 'In the ribbon at the top, click the Insert tab' },
        { step: 'Click Pivot Table', detail: 'Click the PivotTable button' },
        { step: 'Choose location', detail: 'Select "New Worksheet"' },
        { step: 'Drag fields', detail: 'Drag fields into Rows, Columns, Values areas' },
        { step: 'Review results', detail: 'Analyze your summarized data' }
      ],
      example: { goal: 'Analyze Sales by Product and Region', scenario: 'Sales data with Product, Region, Sales Amount', setup: ['Rows → Product', 'Columns → Region', 'Values → Sum of Sales'], result: 'Total sales for each product in each region' },
      proTips: [{ tip: 'Use clean data', detail: 'No blank rows or columns' }, { tip: 'Convert to Table', detail: 'Press Ctrl+T' }, { tip: 'Refresh after changes', detail: 'Right-click and Refresh' }],
      practice: 'Create a Pivot Table showing total sales by product category',
      nextTopic: 'vlookup',
      prevTopic: null
    },
    'vlookup': {
      title: 'VLOOKUP',
      level: 'Intermediate',
      duration: '12 min',
      definition: 'VLOOKUP searches for a value in the first column of a table and returns a corresponding value from another column.',
      detailedDefinition: [
        'Searches for a specific value in the first column',
        'Returns a related value from a column to the right',
        'Works with numbers, text, and dates',
        'Essential for combining data from multiple sheets'
      ],
      whyItMatters: [
        { use: 'Employee Lookups', description: 'Find employee names, salaries using ID number' },
        { use: 'Price Matching', description: 'Fill product prices from a price list' },
        { use: 'Data Consolidation', description: 'Combine information from two reports' },
        { use: 'Customer Details', description: 'Auto-fill customer addresses using ID' }
      ],
      keyConcepts: [
        { term: 'Lookup Value', description: 'Value you\'re searching for', example: 'Employee ID', realUse: 'What you want to find' },
        { term: 'Table Array', description: 'Range where you\'re searching', example: 'A1:B100', realUse: 'Lookup table location' },
        { term: 'Column Index', description: 'Which column to return', example: '2 for second column', realUse: 'Where your answer is' },
        { term: 'Range Lookup', description: 'FALSE for exact match', example: 'FALSE', realUse: 'Use FALSE most of the time' }
      ],
      steps: [
        { step: 'Click destination cell', detail: 'Where you want the result' },
        { step: 'Type =VLOOKUP(', detail: 'Start the formula' },
        { step: 'Enter lookup value', detail: 'Select the cell with value to search' },
        { step: 'Select table range', detail: 'Highlight the lookup table' },
        { step: 'Enter column number', detail: 'Which column to return' },
        { step: 'Type FALSE and )', detail: 'Close the formula and press Enter' }
      ],
      example: { goal: 'Find employee salary using ID', scenario: 'ID in A2, table in B2:D100', setup: ['=VLOOKUP(A2, $B$2:$D$100, 3, FALSE)'], result: 'Returns the salary for that employee ID' },
      proTips: [{ tip: 'Lock table with $', detail: 'Use $B$2:$D$100 so range doesn\'t shift' }, { tip: 'Use IFERROR', detail: 'Hide #N/A errors' }, { tip: 'Lookup column first', detail: 'Put lookup column as first column' }],
      practice: 'Use VLOOKUP to find product prices from a price list',
      nextTopic: 'conditional-formatting',
      prevTopic: 'pivot-tables'
    },
    'conditional-formatting': {
      title: 'Conditional Formatting',
      level: 'Beginner',
      duration: '8 min',
      definition: 'Conditional Formatting automatically applies formatting to cells based on rules you set, helping you spot trends and outliers instantly.',
      detailedDefinition: [
        'Applies colors, icons, or formatting based on rules',
        'Helps visualize data patterns',
        'Updates automatically when data changes',
        'Can highlight duplicates, top values, or custom conditions'
      ],
      whyItMatters: [
        { use: 'Highlight Targets', description: 'Show sales above goal in green' },
        { use: 'Flag Issues', description: 'Mark overdue dates in red' },
        { use: 'Find Duplicates', description: 'Identify duplicate entries quickly' },
        { use: 'Visualize Data', description: 'Add data bars and color scales' }
      ],
      keyConcepts: [
        { term: 'Highlight Cell Rules', description: 'Format cells greater than, less than, equal to', example: 'Greater than 1000', realUse: 'Compare to thresholds' },
        { term: 'Top/Bottom Rules', description: 'Highlight top 10 items, above average', example: 'Top 10%', realUse: 'Find best/worst performers' },
        { term: 'Data Bars', description: 'Add bars inside cells', example: 'Bar length shows value', realUse: 'Compare magnitude visually' },
        { term: 'Color Scales', description: '2-3 color gradient', example: 'Red to green', realUse: 'Show distribution' }
      ],
      steps: [
        { step: 'Select cells', detail: 'Choose the range you want to format' },
        { step: 'Go to Home tab', detail: 'Click Conditional Formatting' },
        { step: 'Choose rule type', detail: 'Select from Highlight Cells, Top/Bottom, etc.' },
        { step: 'Set condition', detail: 'Enter value or formula' },
        { step: 'Choose format', detail: 'Select color, bold, or icon' },
        { step: 'Click OK', detail: 'Apply the formatting' }
      ],
      example: { goal: 'Highlight sales above ₹10,000', scenario: 'Sales data in column A', setup: ['Rule → Greater Than', 'Value → 10000', 'Format → Green Fill'], result: 'All sales over 10,000 appear in green' },
      proTips: [{ tip: 'Use Manage Rules', detail: 'Edit or delete existing rules' }, { tip: 'Apply in order', detail: 'Rules run top to bottom' }, { tip: 'Use formulas', detail: 'Create complex conditions' }],
      practice: 'Highlight all duplicate entries in a column',
      nextTopic: 'data-validation',
      prevTopic: 'vlookup'
    },
    'data-validation': {
      title: 'Data Validation',
      level: 'Beginner',
      duration: '10 min',
      definition: 'Data Validation controls what users can enter into a cell by creating rules and dropdown lists, preventing data entry errors.',
      detailedDefinition: [
        'Creates dropdown lists for consistent data entry',
        'Restricts numbers to valid ranges',
        'Prevents duplicate entries',
        'Shows input messages to guide users'
      ],
      whyItMatters: [
        { use: 'Data Consistency', description: 'Ensure all entries follow the same format' },
        { use: 'Error Prevention', description: 'Stop incorrect data before it enters' },
        { use: 'User Guidance', description: 'Show helpful input messages' },
        { use: 'Data Quality', description: 'Maintain clean, usable data' }
      ],
      keyConcepts: [
        { term: 'List', description: 'Create dropdown from values', example: 'Yes, No, Maybe', realUse: 'Standardize entries' },
        { term: 'Whole Number', description: 'Restrict to number range', example: '1-100', realUse: 'Age, quantity limits' },
        { term: 'Date', description: 'Limit dates between ranges', example: 'After today', realUse: 'Booking dates' },
        { term: 'Custom Formula', description: 'Advanced validation', example: '=ISNUMBER(A1)', realUse: 'Complex rules' }
      ],
      steps: [
        { step: 'Select cells', detail: 'Choose cells to validate' },
        { step: 'Data → Validation', detail: 'Open Data Validation dialog' },
        { step: 'Choose Allow type', detail: 'List, Number, Date, etc.' },
        { step: 'Enter criteria', detail: 'Set your rules' },
        { step: 'Add Input Message', detail: 'Optional guidance text' },
        { step: 'Set Error Alert', detail: 'Custom error message' }
      ],
      example: { goal: 'Create dropdown with month names', scenario: 'Need consistent month entries', setup: ['Allow → List', 'Source → January, February, March'], result: 'Users can only select from the month list' },
      proTips: [{ tip: 'Use named ranges', detail: 'Manage lists easily' }, { tip: 'Copy validation', detail: 'Use Paste Special' }, { tip: 'Circle invalid', detail: 'Find existing errors' }],
      practice: 'Create a dropdown list for product categories',
      nextTopic: 'charts-graphs',
      prevTopic: 'conditional-formatting'
    },
    'charts-graphs': {
      title: 'Charts & Graphs',
      level: 'Beginner',
      duration: '14 min',
      definition: 'Charts and graphs help you visualize data and identify trends at a glance, making complex data easy to understand.',
      detailedDefinition: [
        'Transforms numbers into visual representations',
        'Helps identify trends and patterns',
        'Makes data easier to present',
        'Supports data-driven decision making'
      ],
      whyItMatters: [
        { use: 'Present Data', description: 'Show data visually to stakeholders' },
        { use: 'Identify Trends', description: 'Spot patterns quickly' },
        { use: 'Compare Performance', description: 'Visual comparisons across categories' },
        { use: 'Create Reports', description: 'Professional-looking dashboards' }
      ],
      keyConcepts: [
        { term: 'Column Chart', description: 'Compare values across categories', example: 'Sales by product', realUse: 'Category comparisons' },
        { term: 'Line Chart', description: 'Show trends over time', example: 'Monthly sales', realUse: 'Time series data' },
        { term: 'Pie Chart', description: 'Show proportions', example: 'Market share', realUse: 'Part-to-whole relationships' },
        { term: 'Bar Chart', description: 'Horizontal comparisons', example: 'Long category names', realUse: 'Ranked data' }
      ],
      steps: [
        { step: 'Select data', detail: 'Highlight cells to chart' },
        { step: 'Insert → Chart', detail: 'Choose chart type' },
        { step: 'Customize', detail: 'Add titles and labels' },
        { step: 'Format', detail: 'Change colors and styles' },
        { step: 'Position', detail: 'Move chart to desired location' }
      ],
      example: { goal: 'Create monthly sales trend', scenario: 'Monthly sales data', setup: ['Select Months and Sales', 'Insert → Line Chart', 'Add title "Monthly Sales"'], result: 'Line chart showing sales trends over months' },
      proTips: [{ tip: 'Use Alt+F1', detail: 'Quick chart' }, { tip: 'Switch row/column', detail: 'Change perspective' }, { tip: 'Use recommended', detail: 'Let Excel suggest chart type' }],
      practice: 'Create a column chart showing sales by product category',
      nextTopic: 'macros',
      prevTopic: 'data-validation'
    },
    'macros': {
      title: 'Macros',
      level: 'Advanced',
      duration: '20 min',
      definition: 'Macros automate repetitive tasks in Excel using VBA (Visual Basic for Applications), saving time and reducing errors.',
      detailedDefinition: [
        'Records your actions to replay later',
        'Automates repetitive tasks',
        'Can be edited for complex automation',
        'Saves hours of manual work'
      ],
      whyItMatters: [
        { use: 'Automate Reports', description: 'Generate daily reports automatically' },
        { use: 'Save Time', description: 'Eliminate repetitive work' },
        { use: 'Reduce Errors', description: 'Consistent execution every time' },
        { use: 'Standardize Outputs', description: 'Create uniform reports' }
      ],
      keyConcepts: [
        { term: 'Record Macro', description: 'Record actions for playback', example: 'Formatting steps', realUse: 'Capture repetitive tasks' },
        { term: 'Run Macro', description: 'Execute recorded macro', example: 'Play back formatting', realUse: 'Apply automation' },
        { term: 'VBA Editor', description: 'Edit macro code', example: 'Visual Basic editor', realUse: 'Customize automation' },
        { term: 'Button', description: 'Assign macro to button', example: 'Click to run', realUse: 'Easy access' }
      ],
      steps: [
        { step: 'Enable Developer tab', detail: 'File → Options → Customize Ribbon → Check Developer' },
        { step: 'Record Macro', detail: 'Developer → Record Macro' },
        { step: 'Name macro', detail: 'Give it a descriptive name' },
        { step: 'Perform actions', detail: 'Do the tasks you want to automate' },
        { step: 'Stop Recording', detail: 'Click Stop Recording' },
        { step: 'Run Macro', detail: 'Developer → Macros → Run' }
      ],
      example: { goal: 'Automate report formatting', scenario: 'Format sales report daily', setup: ['Record Macro → Apply formatting (bold headers, borders, colors) → Stop → Save'], result: 'One-click formatting for any report' },
      proTips: [{ tip: 'Save as .xlsm', detail: 'Enable macro storage' }, { tip: 'Use relative references', detail: 'Flexible macro' }, { tip: 'Test on backup', detail: 'Avoid data loss' }],
      practice: 'Record a macro that formats a sales report with bold headers and currency',
      nextTopic: 'sumifs',
      prevTopic: 'charts-graphs'
    },
    'sumifs': {
      title: 'SUMIFS',
      level: 'Intermediate',
      duration: '10 min',
      definition: 'SUMIFS adds values that meet multiple conditions, allowing you to sum data based on one or more criteria.',
      detailedDefinition: [
        'Sums values meeting multiple conditions',
        'Can use up to 127 condition pairs',
        'Works with numbers, dates, and text',
        'More flexible than SUMIF'
      ],
      whyItMatters: [
        { use: 'Regional Sales', description: 'Sum sales by region AND product' },
        { use: 'Date Ranges', description: 'Calculate totals for specific periods' },
        { use: 'Multi-condition', description: 'Complex business logic' },
        { use: 'Dynamic Reports', description: 'Create interactive summaries' }
      ],
      keyConcepts: [
        { term: 'Sum Range', description: 'Range to sum', example: 'Sales column', realUse: 'What to add up' },
        { term: 'Criteria Range', description: 'Range to evaluate', example: 'Product column', realUse: 'Where to check condition' },
        { term: 'Criteria', description: 'The condition to meet', example: '="Product A"', realUse: 'What to look for' },
        { term: 'Multiple Conditions', description: 'Add up to 127 pairs', example: 'Product AND Region', realUse: 'Complex filtering' }
      ],
      steps: [
        { step: 'Type =SUMIFS(', detail: 'Start the formula' },
        { step: 'Select sum range', detail: 'Numbers to add' },
        { step: 'Select criteria range 1', detail: 'First column to check' },
        { step: 'Enter criteria 1', detail: 'First condition' },
        { step: 'Add more criteria', detail: 'Repeat for additional conditions' },
        { step: 'Close parentheses', detail: 'Press Enter' }
      ],
      example: { goal: 'Sum sales for Product A in North region', scenario: 'Sales data with Product and Region', setup: ['=SUMIFS(Sales, Product, "A", Region, "North")'], result: 'Total sales for Product A in North region' },
      proTips: [{ tip: 'Use wildcards', detail: '* and ? for partial matches' }, { tip: 'Use cell references', detail: 'Dynamic criteria' }, { tip: 'Works with dates', detail: 'Use >, < operators' }],
      practice: 'Calculate total sales for Q1 2024 for Electronics category',
      nextTopic: 'index-match',
      prevTopic: 'macros'
    },
    'index-match': {
      title: 'INDEX MATCH',
      level: 'Advanced',
      duration: '15 min',
      definition: 'INDEX MATCH is a powerful combination that overcomes VLOOKUP limitations by looking left, right, up, or down to find matching values.',
      detailedDefinition: [
        'Can look up values from any column',
        'Faster than VLOOKUP on large datasets',
        'More flexible and powerful',
        'No column index number to maintain'
      ],
      whyItMatters: [
        { use: 'Left Lookups', description: 'Find values left of lookup column' },
        { use: 'Performance', description: 'Faster on large spreadsheets' },
        { use: 'Flexibility', description: 'Horizontal or vertical lookups' },
        { use: 'Dynamic Ranges', description: 'Works with changing column positions' }
      ],
      keyConcepts: [
        { term: 'INDEX', description: 'Returns value at position', example: 'INDEX(A:A, 5)', realUse: 'Get value by row number' },
        { term: 'MATCH', description: 'Finds position of value', example: 'MATCH("A", A:A, 0)', realUse: 'Find row number' },
        { term: 'Combine', description: 'INDEX(range, MATCH())', example: 'INDEX(B:B, MATCH(A2, A:A, 0))', realUse: 'Two-way lookup' },
        { term: '0 for exact', description: 'Use 0 in MATCH', example: 'MATCH(value, range, 0)', realUse: 'Exact matches only' }
      ],
      steps: [
        { step: 'Start with =INDEX(', detail: 'Begin the INDEX function' },
        { step: 'Select return range', detail: 'Column with your answer' },
        { step: 'Add MATCH(', detail: 'Start the MATCH function' },
        { step: 'Select lookup value', detail: 'What to find' },
        { step: 'Select lookup range', detail: 'Where to search' },
        { step: 'Add ,0) and close', detail: 'Use 0 for exact match, double close parentheses' }
      ],
      example: { goal: 'Find employee name by ID (left lookup)', scenario: 'ID in B, Name in A', setup: ['=INDEX(A:A, MATCH(D2, B:B, 0))'], result: 'Returns name even though Name is left of ID' },
      proTips: [{ tip: 'Use 0 for exact', detail: 'Always use 0 in MATCH' }, { tip: 'Faster than VLOOKUP', detail: 'Better performance' }, { tip: 'Column insert safe', detail: 'No column index to update' }],
      practice: 'Use INDEX MATCH to find product price where price is left of product name',
      nextTopic: null,
      prevTopic: 'sumifs'
    }
  },
  sql: {
    'sql-joins': {
      title: 'SQL Joins',
      level: 'Intermediate',
      duration: '12 min',
      definition: 'SQL JOINs combine rows from two or more tables based on related columns, enabling you to answer complex business questions.',
      detailedDefinition: [
        'Combines data from multiple tables',
        'Uses common columns to match records',
        'Essential for relational databases',
        'Four main types: INNER, LEFT, RIGHT, FULL'
      ],
      whyItMatters: [
        { use: 'Data Integration', description: 'Combine customer and order data' },
        { use: 'Business Reports', description: 'Create comprehensive reports' },
        { use: 'Data Analysis', description: 'Analyze relationships between tables' },
        { use: 'Efficiency', description: 'Avoid data duplication, normalize tables' }
      ],
      keyConcepts: [
        { term: 'INNER JOIN', description: 'Returns matching records only', example: 'Customers with orders', realUse: 'Records in both tables' },
        { term: 'LEFT JOIN', description: 'All from left, matches from right', example: 'All customers, orders if any', realUse: 'Keep all left records' },
        { term: 'ON Clause', description: 'Specifies match condition', example: 'ON Customers.ID = Orders.CustomerID', realUse: 'How to join' },
        { term: 'Alias', description: 'Short table names', example: 'C, O', realUse: 'Shorter queries' }
      ],
      steps: [
        { step: 'SELECT columns', detail: 'Choose columns to display' },
        { step: 'FROM first table', detail: 'Specify main table' },
        { step: 'JOIN second table', detail: 'INNER JOIN or LEFT JOIN' },
        { step: 'ON condition', detail: 'Define matching columns' },
        { step: 'Add WHERE if needed', detail: 'Filter results' },
        { step: 'ORDER BY', detail: 'Sort output' }
      ],
      example: { goal: 'Show customer names with their orders', scenario: 'Customers and Orders tables', setup: ['SELECT Name, OrderDate FROM Customers INNER JOIN Orders ON Customers.ID = Orders.CustomerID'], result: 'List of customers and their order dates' },
      proTips: [{ tip: 'Use table aliases', detail: 'FROM Customers C' }, { tip: 'LEFT JOIN more common', detail: 'Keeps all left records' }, { tip: 'Check for NULLs', detail: 'LEFT JOIN creates NULLs' }],
      practice: 'Write a query showing all customers and their order totals',
      nextTopic: 'select-queries',
      prevTopic: null
    },
    'select-queries': {
      title: 'SELECT Queries',
      level: 'Beginner',
      duration: '10 min',
      definition: 'SELECT queries retrieve data from database tables, allowing you to choose specific columns, filter rows, and sort results.',
      detailedDefinition: [
        'Retrieves data from one or more tables',
        'Filters rows with WHERE clause',
        'Sorts results with ORDER BY',
        'Limits rows for performance'
      ],
      whyItMatters: [
        { use: 'Data Retrieval', description: 'Get exactly what you need from databases' },
        { use: 'Filtering', description: 'Find specific records' },
        { use: 'Sorting', description: 'Organize results logically' },
        { use: 'Performance', description: 'Minimize data transfer' }
      ],
      keyConcepts: [
        { term: 'SELECT', description: 'Specifies columns', example: 'SELECT Name, Email', realUse: 'Choose output columns' },
        { term: 'FROM', description: 'Specifies table', example: 'FROM Customers', realUse: 'Data source' },
        { term: 'WHERE', description: 'Filters rows', example: 'WHERE City = "Mumbai"', realUse: 'Limit results' },
        { term: 'ORDER BY', description: 'Sorts results', example: 'ORDER BY Name', realUse: 'Organize output' }
      ],
      steps: [
        { step: 'Write SELECT', detail: 'List columns after SELECT' },
        { step: 'Write FROM', detail: 'Specify table name' },
        { step: 'Add WHERE', detail: 'Optional filter condition' },
        { step: 'Add ORDER BY', detail: 'Optional sorting' },
        { step: 'Add LIMIT', detail: 'Optional row limit' },
        { step: 'Execute query', detail: 'Run to see results' }
      ],
      example: { goal: 'Find customers from Mumbai', scenario: 'Customers table', setup: ['SELECT * FROM Customers WHERE City = "Mumbai" ORDER BY Name'], result: 'All Mumbai customers sorted by name' },
      proTips: [{ tip: 'Avoid SELECT *', detail: 'Name specific columns' }, { tip: 'Use single quotes', detail: 'For text values' }, { tip: 'Test with LIMIT', detail: 'First test with LIMIT 10' }],
      practice: 'Get all orders over ₹10,000 from the last 30 days',
      nextTopic: 'group-by',
      prevTopic: 'sql-joins'
    },
    'group-by': {
      title: 'GROUP BY',
      level: 'Intermediate',
      duration: '10 min',
      definition: 'GROUP BY groups rows that have the same values into summary rows, used with aggregate functions like COUNT, SUM, AVG.',
      detailedDefinition: [
        'Groups rows by column values',
        'Used with aggregate functions',
        'Creates summary reports',
        'HAVING filters groups'
      ],
      whyItMatters: [
        { use: 'Summarize Data', description: 'Total sales by product' },
        { use: 'Count Records', description: 'Number of orders per customer' },
        { use: 'Averages', description: 'Average price by category' },
        { use: 'Reports', description: 'Create summary reports' }
      ],
      keyConcepts: [
        { term: 'GROUP BY', description: 'Groups identical values', example: 'GROUP BY Product', realUse: 'Combine matching rows' },
        { term: 'COUNT', description: 'Counts rows per group', example: 'COUNT(*)', realUse: 'Row count in group' },
        { term: 'SUM', description: 'Adds values per group', example: 'SUM(Sales)', realUse: 'Total per group' },
        { term: 'HAVING', description: 'Filters groups', example: 'HAVING SUM(Sales) > 1000', realUse: 'Group-level filtering' }
      ],
      steps: [
        { step: 'Write SELECT', detail: 'Include GROUP BY column' },
        { step: 'Add aggregate', detail: 'COUNT, SUM, or AVG' },
        { step: 'Write FROM', detail: 'Specify table' },
        { step: 'Add GROUP BY', detail: 'List grouping columns' },
        { step: 'Add HAVING', detail: 'Optional group filter' },
        { step: 'Add ORDER BY', detail: 'Sort results' }
      ],
      example: { goal: 'Total sales by product', scenario: 'Sales order table', setup: ['SELECT Product, SUM(Sales) FROM Orders GROUP BY Product ORDER BY SUM(Sales) DESC'], result: 'Products listed with their total sales, highest first' },
      proTips: [{ tip: 'All non-aggregates in GROUP BY', detail: 'Every column in SELECT must be in GROUP BY' }, { tip: 'Use HAVING', detail: 'For group filters, not WHERE' }, { tip: 'Use aliases', detail: 'Make output clearer' }],
      practice: 'Find number of orders per customer, show only customers with >5 orders',
      nextTopic: 'subqueries',
      prevTopic: 'select-queries'
    },
    'subqueries': {
      title: 'Subqueries',
      level: 'Advanced',
      duration: '14 min',
      definition: 'A subquery is a query nested inside another query, allowing you to use the result of one query in another query.',
      detailedDefinition: [
        'Query inside another query',
        'Can be used in SELECT, FROM, WHERE',
        'Returns single value or list',
        'Powerful for complex filtering'
      ],
      whyItMatters: [
        { use: 'Comparative Analysis', description: 'Find employees earning above average' },
        { use: 'List Matching', description: 'Customers who ordered specific products' },
        { use: 'Exists Testing', description: 'Check existence of related records' },
        { use: 'Complex Logic', description: 'Multi-step filtering' }
      ],
      keyConcepts: [
        { term: 'IN', description: 'Checks if value exists in subquery', example: 'WHERE ID IN (SELECT...)', realUse: 'List matching' },
        { term: 'EXISTS', description: 'Checks if subquery returns rows', example: 'WHERE EXISTS (SELECT 1...)', realUse: 'Existence check' },
        { term: 'Scalar', description: 'Returns single value', example: '(SELECT AVG(Sales))', realUse: 'Used in comparisons' },
        { term: 'Correlated', description: 'References outer query', example: 'WHERE Sales > (SELECT AVG FROM same table)', realUse: 'Row-by-row comparison' }
      ],
      steps: [
        { step: 'Write outer query', detail: 'Main query structure' },
        { step: 'Add WHERE condition', detail: 'Use IN or EXISTS' },
        { step: 'Write subquery', detail: 'Enclose in parentheses' },
        { step: 'Ensure single column', detail: 'Subquery returns one column' },
        { step: 'Test separately', detail: 'Test subquery alone first' },
        { step: 'Combine', detail: 'Put subquery in main query' }
      ],
      example: { goal: 'Find customers who placed orders', scenario: 'Customers and Orders tables', setup: ['SELECT * FROM Customers WHERE CustomerID IN (SELECT DISTINCT CustomerID FROM Orders)'], result: 'Only customers who have placed at least one order' },
      proTips: [{ tip: 'Test subquery first', detail: 'Ensure it works alone' }, { tip: 'Use EXISTS for performance', detail: 'Faster than IN' }, { tip: 'Avoid deep nesting', detail: 'Hard to read and maintain' }],
      practice: 'Find products that cost more than the average product price',
      nextTopic: 'window-functions',
      prevTopic: 'group-by'
    },
    'window-functions': {
      title: 'Window Functions',
      level: 'Advanced',
      duration: '16 min',
      definition: 'Window functions perform calculations across a set of rows related to the current row, without collapsing them like GROUP BY.',
      detailedDefinition: [
        'Calculates across related rows',
        'Does not collapse rows',
        'Adds ranking, running totals',
        'Partitions data into groups'
      ],
      whyItMatters: [
        { use: 'Ranking', description: 'Rank products by sales' },
        { use: 'Running Totals', description: 'Cumulative sales over time' },
        { use: 'Comparisons', description: 'Compare row to previous row' },
        { use: 'Percentages', description: 'Percent of total calculation' }
      ],
      keyConcepts: [
        { term: 'ROW_NUMBER', description: 'Unique sequential number', example: 'ROW_NUMBER() OVER(...)', realUse: 'Add row numbers' },
        { term: 'RANK', description: 'Rank with gaps', example: 'RANK() OVER(...)', realUse: 'Rank with ties' },
        { term: 'OVER()', description: 'Defines window', example: 'OVER(ORDER BY Sales)', realUse: 'Set calculation range' },
        { term: 'PARTITION BY', description: 'Group within window', example: 'OVER(PARTITION BY Category)', realUse: 'Grouped calculations' }
      ],
      steps: [
        { step: 'Choose function', detail: 'ROW_NUMBER, RANK, SUM, etc.' },
        { step: 'Add OVER clause', detail: 'Define window' },
        { step: 'Use PARTITION BY', detail: 'Optional grouping' },
        { step: 'Use ORDER BY', detail: 'Order within window' },
        { step: 'Reference in SELECT', detail: 'Include in output' },
        { step: 'Execute query', detail: 'See results with additional column' }
      ],
      example: { goal: 'Rank products by sales', scenario: 'Products with sales amounts', setup: ['SELECT Product, Sales, RANK() OVER (ORDER BY Sales DESC) as SalesRank FROM Products'], result: 'Products ranked from highest to lowest sales' },
      proTips: [{ tip: 'PARTITION BY creates groups', detail: 'Reset calculation per group' }, { tip: 'ORDER BY matters', detail: 'Affects ranking order' }, { tip: 'Combine functions', detail: 'Use multiple window functions' }],
      practice: 'Calculate running total of sales by date for each product category',
      nextTopic: null,
      prevTopic: 'subqueries'
    }
  },
  powerbi: {
    'data-modeling': {
      title: 'Data Modeling',
      level: 'Intermediate',
      duration: '15 min',
      definition: 'Data modeling creates relationships between tables in Power BI, allowing you to build a semantic model that reflects business logic.',
      detailedDefinition: ['Connects tables via relationships', 'Creates star schema', 'Enables cross-filtering', 'Improves performance'],
      whyItMatters: [
        { use: 'Connect Data', description: 'Link sales to products and customers' },
        { use: 'Single Source', description: 'Create one version of truth' },
        { use: 'Cross-filtering', description: 'Enable interactive reports' },
        { use: 'Performance', description: 'Optimize query speed' }
      ],
      keyConcepts: [
        { term: 'Relationships', description: 'Connect tables via common columns', example: 'Sales[ProductID] → Products[ProductID]', realUse: 'Link tables' },
        { term: 'Star Schema', description: 'Fact and dimension tables', example: 'One fact, multiple dimensions', realUse: 'Optimal model' },
        { term: 'Cardinality', description: 'One-to-many, many-to-many', example: 'One product, many sales', realUse: 'Relationship type' },
        { term: 'Filter Direction', description: 'How filters flow', example: 'Single or both directions', realUse: 'Control filtering' }
      ],
      steps: [
        { step: 'Load tables', detail: 'Import all needed tables' },
        { step: 'Open Model view', detail: 'Switch to diagram view' },
        { step: 'Create relationships', detail: 'Drag between columns' },
        { step: 'Set cardinality', detail: 'One-to-many typically' },
        { step: 'Configure filters', detail: 'Single direction usually' },
        { step: 'Validate model', detail: 'Test with visuals' }
      ],
      example: { goal: 'Connect sales to products', scenario: 'Sales and Products tables', setup: ['Drag Sales[ProductID] → Products[ProductID]', 'Set one-to-many', 'Single direction filter'], result: 'Products filter sales, but not vice versa' },
      proTips: [{ tip: 'Use star schema', detail: 'Fact in middle, dimensions around' }, { tip: 'Hide foreign keys', detail: 'Clean up report view' }, { tip: 'Mark date tables', detail: 'For time intelligence' }],
      practice: 'Build a model linking sales, products, customers, and dates',
      nextTopic: 'dax-functions',
      prevTopic: null
    },
    'dax-functions': {
      title: 'DAX Functions',
      level: 'Advanced',
      duration: '18 min',
      definition: 'DAX (Data Analysis Expressions) is a formula language for Power BI that allows you to create custom calculations and measures.',
      detailedDefinition: ['Creates calculated columns and measures', 'Performs row and filter context calculations', 'Enables time intelligence', 'Similar to Excel formulas' ],
      whyItMatters: [
        { use: 'Custom Metrics', description: 'Create year-over-year comparisons' },
        { use: 'Running Totals', description: 'Calculate cumulative values' },
        { use: 'Dynamic KPIs', description: 'Build interactive measures' },
        { use: 'Filter Control', description: 'Apply conditional logic' }
      ],
      keyConcepts: [
        { term: 'CALCULATE', description: 'Changes filter context', example: 'CALCULATE(SUM(Sales), YEAR = 2024)', realUse: 'Apply filters' },
        { term: 'SUMX', description: 'Iterator over table rows', example: 'SUMX(Sales, Quantity * Price)', realUse: 'Row-by-row calculation' },
        { term: 'FILTER', description: 'Returns filtered table', example: 'FILTER(Products, Price > 100)', realUse: 'Conditional filtering' },
        { term: 'ALL', description: 'Removes filters', example: 'CALCULATE(SUM(Sales), ALL(Products))', realUse: 'Ignore product filters' }
      ],
      steps: [
        { step: 'Go to Modeling tab', detail: 'Click New Measure' },
        { step: 'Name measure', detail: 'Descriptive name' },
        { step: 'Write formula', detail: 'Start with SUM or CALCULATE' },
        { step: 'Use CALCULATE', detail: 'For filter context changes' },
        { step: 'Add conditions', detail: 'Use FILTER when needed' },
        { step: 'Format measure', detail: 'Set number format' }
      ],
      example: { goal: 'Sales for current year', scenario: 'Sales table with dates', setup: ['Total Sales CY = CALCULATE(SUM(Sales[Amount]), YEAR(Sales[Date]) = YEAR(TODAY()))'], result: 'Shows only current year sales' },
      proTips: [{ tip: 'Use variables', detail: 'VAR for complex logic' }, { tip: 'Understand context', detail: 'Row vs filter context' }, { tip: 'Test measures', detail: 'Verify in table visual' }],
      practice: 'Create a measure that shows sales growth compared to previous month',
      nextTopic: 'visualizations',
      prevTopic: 'data-modeling'
    },
    'visualizations': {
      title: 'Visualizations',
      level: 'Beginner',
      duration: '12 min',
      definition: 'Visualizations turn data into charts and graphs in Power BI, making insights easy to understand and share.',
      detailedDefinition: ['Creates interactive charts', 'Supports drill-down', 'Customizable formatting', 'Supports many chart types'],
      whyItMatters: [
        { use: 'Interactive Dashboards', description: 'Create engaging reports' },
        { use: 'Data Presentation', description: 'Present data clearly' },
        { use: 'Pattern Discovery', description: 'Spot trends quickly' },
        { use: 'User Exploration', description: 'Enable self-service analytics' }
      ],
      keyConcepts: [
        { term: 'Bar Chart', description: 'Compare values cross-categories', example: 'Sales by Product', realUse: 'Category comparison' },
        { term: 'Line Chart', description: 'Show trends over time', example: 'Sales over months', realUse: 'Time series' },
        { term: 'Map', description: 'Geographic visualization', example: 'Sales by city', realUse: 'Location data' },
        { term: 'Matrix', description: 'Cross-tabulation', example: 'Products vs Regions', realUse: 'Multi-dimensional' }
      ],
      steps: [
        { step: 'Select visual', detail: 'Choose from Visualizations pane' },
        { step: 'Add fields', detail: 'Drag to Axis, Values, Legend' },
        { step: 'Format visual', detail: 'Adjust colors, labels, titles' },
        { step: 'Add slicers', detail: 'For filtering' },
        { step: 'Arrange layout', detail: 'Position on report page' },
        { step: 'Test interactivity', detail: 'Click and filter' }
      ],
      example: { goal: 'Sales by region bar chart', scenario: 'Sales data with regions', setup: ['Axis: Region', 'Values: Sales', 'Add data labels', 'Customize colors'], result: 'Bar chart showing sales by region' },
      proTips: [{ tip: 'Use consistent colors', detail: 'Same color for same measures' }, { tip: 'Remove clutter', detail: 'Simplify visuals' }, { tip: 'Add tooltips', detail: 'Extra information on hover' }],
      practice: 'Create a dashboard with sales by product, region, and month',
      nextTopic: 'power-query',
      prevTopic: 'dax-functions'
    },
    'power-query': {
      title: 'Power Query',
      level: 'Intermediate',
      duration: '14 min',
      definition: 'Power Query transforms and cleans data before loading to Power BI, handling data preparation tasks automatically.',
      detailedDefinition: ['Cleans and transforms data', 'Combines multiple sources', 'Records transformation steps', 'Uses M language' ],
      whyItMatters: [
        { use: 'Data Cleaning', description: 'Remove errors, handle missing values' },
        { use: 'Combine Files', description: 'Merge multiple Excel files' },
        { use: 'Transform Data', description: 'Change formats, add columns' },
        { use: 'Reusable Steps', description: 'Apply same transformations' }
      ],
      keyConcepts: [
        { term: 'Applied Steps', description: 'Recorded transformations', example: 'Each action is a step', realUse: 'Audit transformations' },
        { term: 'M Language', description: 'Power Query formula language', example: '= Table.SelectRows()', realUse: 'Advanced transformations' },
        { term: 'Merge', description: 'Combine queries like SQL JOIN', example: 'Merge Sales and Products', realUse: 'Join tables' },
        { term: 'Append', description: 'Stack rows from multiple queries', example: 'Jan Sales + Feb Sales', realUse: 'Combine months' }
      ],
      steps: [
        { step: 'Get Data', detail: 'Select data source' },
        { step: 'Transform', detail: 'Remove columns, filter rows' },
        { step: 'Change types', detail: 'Set correct data types' },
        { step: 'Add columns', detail: 'Create calculated columns' },
        { step: 'Group/Summarize', detail: 'Aggregate data' },
        { step: 'Load to model', detail: 'Load transformed data' }
      ],
      example: { goal: 'Clean sales data', scenario: 'Raw sales CSV', setup: ['Remove blank rows', 'Change date to Date type', 'Replace nulls with 0', 'Add Total column'], result: 'Clean, analysis-ready dataset' },
      proTips: [{ tip: 'Rename steps', detail: 'Keep transformations readable' }, { tip: 'Use Group By', detail: 'For aggregation' }, { tip: 'Reference queries', detail: 'Avoid duplication' }],
      practice: 'Combine monthly sales files into a single clean table',
      nextTopic: null,
      prevTopic: 'visualizations'
    }
  },
  python: {
    'python-basics': {
      title: 'Python Basics',
      level: 'Beginner',
      duration: '15 min',
      definition: 'Python is a programming language for data analysis and automation, helping you process data and automate repetitive tasks.',
      detailedDefinition: ['Readable syntax', 'Dynamic typing', 'Rich ecosystem', 'Cross-platform' ],
      whyItMatters: [
        { use: 'Automation', description: 'Automate Excel and file processing' },
        { use: 'Data Cleaning', description: 'Clean and transform datasets' },
        { use: 'Analysis', description: 'Perform statistical analysis' },
        { use: 'Visualization', description: 'Create charts and plots' }
      ],
      keyConcepts: [
        { term: 'Variables', description: 'Store data values', example: 'x = 5', realUse: 'Hold values' },
        { term: 'Lists', description: 'Store multiple items', example: 'items = [1,2,3]', realUse: 'Collections' },
        { term: 'Loops', description: 'Repeat actions', example: 'for i in range(5):', realUse: 'Iteration' },
        { term: 'Functions', description: 'Reusable code blocks', example: 'def add(a,b):', realUse: 'Code organization' }
      ],
      steps: [
        { step: 'Install Python', detail: 'Download from python.org' },
        { step: 'Choose IDE', detail: 'VS Code, PyCharm, or Jupyter' },
        { step: 'Create file', detail: 'New .py file' },
        { step: 'Write code', detail: 'Start with print("Hello")' },
        { step: 'Run script', detail: 'Execute in terminal' },
        { step: 'Build', detail: 'Add more functionality' }
      ],
      example: { goal: 'Calculate average', scenario: 'List of numbers', setup: ['numbers = [10, 20, 30]', 'average = sum(numbers) / len(numbers)', 'print(average)'], result: 'Prints 20.0' },
      proTips: [{ tip: 'Use descriptive names', detail: 'Not x, use total_sales' }, { tip: 'Comment code', detail: 'Explain complex logic' }, { tip: 'Start simple', detail: 'Build gradually' }],
      practice: 'Write a script that reads a CSV file and prints first 5 rows',
      nextTopic: 'pandas',
      prevTopic: null
    },
    'pandas': {
      title: 'Pandas',
      level: 'Intermediate',
      duration: '20 min',
      definition: 'Pandas is a Python library for data manipulation and analysis, providing DataFrame objects similar to Excel.',
      detailedDefinition: ['DataFrame for tabular data', 'Powerful filtering and grouping', 'Handles missing data', 'Reads many file formats' ],
      whyItMatters: [
        { use: 'Data Import', description: 'Read CSV, Excel, SQL data' },
        { use: 'Data Cleaning', description: 'Handle missing values' },
        { use: 'Analysis', description: 'Group, filter, transform' },
        { use: 'Export', description: 'Save to various formats' }
      ],
      keyConcepts: [
        { term: 'DataFrame', description: '2D table like Excel', example: 'df = pd.read_csv("file.csv")', realUse: 'Main data structure' },
        { term: 'Series', description: 'Single column', example: 'df["Sales"]', realUse: 'Column data' },
        { term: 'GroupBy', description: 'Group for aggregation', example: 'df.groupby("Product")["Sales"].sum()', realUse: 'Summary statistics' },
        { term: 'Merge', description: 'Combine DataFrames', example: 'pd.merge(df1, df2, on="ID")', realUse: 'Join tables' }
      ],
      steps: [
        { step: 'Import pandas', detail: 'import pandas as pd' },
        { step: 'Load data', detail: 'df = pd.read_csv("data.csv")' },
        { step: 'Preview', detail: 'df.head() to see first rows' },
        { step: 'Clean', detail: 'Handle missing, filter rows' },
        { step: 'Analyze', detail: 'Group, aggregate, calculate' },
        { step: 'Export', detail: 'df.to_csv("output.csv")' }
      ],
      example: { goal: 'Total sales by product', scenario: 'Sales CSV with Product and Sales', setup: ['import pandas as pd', 'df = pd.read_csv("sales.csv")', 'summary = df.groupby("Product")["Sales"].sum()', 'print(summary)'], result: 'Displays total sales per product' },
      proTips: [{ tip: 'Use df.info()', detail: 'See data types' }, { tip: 'Use df.describe()', detail: 'Statistical summary' }, { tip: 'Vectorized operations', detail: 'Avoid loops, use pandas methods' }],
      practice: 'Read an Excel file, filter rows where Sales > 1000, and save as new CSV',
      nextTopic: 'data-visualization',
      prevTopic: 'python-basics'
    },
    'data-visualization': {
      title: 'Data Visualization',
      level: 'Intermediate',
      duration: '18 min',
      definition: 'Create charts and graphs using Python libraries like matplotlib and seaborn, making data insights clear.',
      detailedDefinition: ['Matplotlib for basic plots', 'Seaborn for statistical visuals', 'Highly customizable', 'Save as images' ],
      whyItMatters: [
        { use: 'Data Exploration', description: 'Visualize patterns quickly' },
        { use: 'Presentation', description: 'Create professional charts' },
        { use: 'Analysis', description: 'Identify outliers and trends' },
        { use: 'Reporting', description: 'Include in reports and presentations' }
      ],
      keyConcepts: [
        { term: 'Matplotlib', description: 'Base plotting library', example: 'import matplotlib.pyplot as plt', realUse: 'Basic plots' },
        { term: 'Line Plot', description: 'Show trends over time', example: 'plt.plot(x, y)', realUse: 'Time series' },
        { term: 'Bar Plot', description: 'Compare categories', example: 'plt.bar(categories, values)', realUse: 'Category comparison' },
        { term: 'Seaborn', description: 'Statistical visuals', example: 'sns.barplot(data=df, x="Product", y="Sales")', realUse: 'Advanced styling' }
      ],
      steps: [
        { step: 'Import libraries', detail: 'import matplotlib.pyplot as plt' },
        { step: 'Prepare data', detail: 'Get x and y values' },
        { step: 'Create plot', detail: 'plt.plot(x, y) or plt.bar()' },
        { step: 'Customize', detail: 'Add title, labels, legend' },
        { step: 'Show/save', detail: 'plt.show() or plt.savefig()' },
        { step: 'Close', detail: 'plt.close() to free memory' }
      ],
      example: { goal: 'Line chart of monthly sales', scenario: 'Months and sales numbers', setup: ['months = ["Jan", "Feb", "Mar"]', 'sales = [100, 150, 120]', 'plt.plot(months, sales)', 'plt.title("Monthly Sales")', 'plt.show()'], result: 'Line chart showing sales trend' },
      proTips: [{ tip: 'Use figsize', detail: 'plt.figure(figsize=(10,6))' }, { tip: 'Add grid', detail: 'plt.grid(True)' }, { tip: 'Save before show', detail: 'plt.savefig() before plt.show()' }],
      practice: 'Create a bar chart showing sales by product category with custom colors',
      nextTopic: 'numpy',
      prevTopic: 'pandas'
    },
    'numpy': {
      title: 'NumPy',
      level: 'Intermediate',
      duration: '14 min',
      definition: 'NumPy provides efficient numerical computing in Python, handling large arrays and mathematical operations.',
      detailedDefinition: ['N-dimensional arrays', 'Mathematical functions', 'Linear algebra', 'Random number generation' ],
      whyItMatters: [
        { use: 'Fast Calculations', description: 'Vectorized operations' },
        { use: 'Array Processing', description: 'Multi-dimensional data' },
        { use: 'Math Functions', description: 'Built-in mathematical operations' },
        { use: 'Random Data', description: 'Generate random numbers' }
      ],
      keyConcepts: [
        { term: 'Array', description: 'Grid of values', example: 'arr = np.array([1,2,3])', realUse: 'Numerical data' },
        { term: 'Shape', description: 'Dimensions of array', example: '(3,4) for 3x4 matrix', realUse: 'Array dimensions' },
        { term: 'Broadcasting', description: 'Operations on different shapes', example: 'arr + 5', realUse: 'Scalar operations' },
        { term: 'Vectorization', description: 'Operations on entire arrays', example: 'arr * 2', realUse: 'Element-wise operations' }
      ],
      steps: [
        { step: 'Import numpy', detail: 'import numpy as np' },
        { step: 'Create array', detail: 'arr = np.array([1,2,3])' },
        { step: 'Perform math', detail: 'arr.mean(), arr.std()' },
        { step: 'Reshape', detail: 'arr.reshape(3,1)' },
        { step: 'Index', detail: 'arr[0], arr[1:3]' },
        { step: 'Use methods', detail: 'np.sum(arr), np.max(arr)' }
      ],
      example: { goal: 'Calculate statistics', scenario: 'Array of numbers', setup: ['import numpy as np', 'arr = np.array([10,20,30,40,50])', 'mean = arr.mean()', 'std = arr.std()', 'print(f"Mean: {mean}, Std: {std}")'], result: 'Calculates and prints mean and standard deviation' },
      proTips: [{ tip: 'Use np.random', detail: 'Generate random arrays' }, { tip: 'Axis parameter', detail: 'Control row/column operations' }, { tip: 'Avoid loops', detail: 'Use vectorized operations' }],
      practice: 'Create a 3x3 matrix of random numbers and calculate its transpose',
      nextTopic: null,
      prevTopic: 'data-visualization'
    }
  },
  finance: {
    'profit-loss': {
      title: 'Profit & Loss Statement',
      level: 'Beginner',
      duration: '10 min',
      definition: 'A Profit & Loss (P&L) Statement shows company performance over a period, tracking revenues, costs, and expenses.',
      detailedDefinition: ['Shows revenues and expenses', 'Calculates profit/loss', 'Monthly, quarterly, annual', 'Key for decision making'],
      whyItMatters: [{ use: 'Measure Profitability', description: 'Know if business is making money' }, { use: 'Identify Costs', description: 'See where money is spent' }, { use: 'Track Trends', description: 'Compare over time' }, { use: 'Make Decisions', description: 'Guide business choices' }],
      keyConcepts: [
        { term: 'Revenue', description: 'Money from sales', example: '₹500,000', realUse: 'Top line' },
        { term: 'COGS', description: 'Cost of goods sold', example: '₹200,000', realUse: 'Direct costs' },
        { term: 'Gross Profit', description: 'Revenue - COGS', example: '₹300,000', realUse: 'Core profit' },
        { term: 'Net Profit', description: 'Profit after ALL expenses', example: '₹150,000', realUse: 'Bottom line' }
      ],
      steps: [{ step: 'List revenue', detail: 'Total all income' }, { step: 'Calculate COGS', detail: 'Direct costs' }, { step: 'Get Gross Profit', detail: 'Revenue - COGS' }, { step: 'List expenses', detail: 'Operating costs' }, { step: 'Calculate Net Profit', detail: 'Gross Profit - Expenses' }],
      example: { goal: 'Calculate net profit', scenario: 'Retail store', setup: ['Revenue: ₹500,000', 'COGS: ₹200,000', 'Gross Profit: ₹300,000', 'Expenses: ₹150,000', 'Net Profit: ₹150,000'], result: 'Net profit of ₹150,000' },
      proTips: [{ tip: 'Compare month-over-month', detail: 'Track trends' }, { tip: 'Calculate margins', detail: 'Profit/Revenue' }, { tip: 'Watch changes', detail: 'Investigate unusual fluctuations' }],
      practice: 'Calculate gross profit margin and net profit margin for a retail store',
      nextTopic: 'balance-sheet',
      prevTopic: null
    },
    'balance-sheet': {
      title: 'Balance Sheet',
      level: 'Beginner',
      duration: '12 min',
      definition: 'A Balance Sheet shows a company\'s assets, liabilities, and equity at a specific point in time.',
      detailedDefinition: ['Assets = Liabilities + Equity', 'Snapshot at a date', 'Shows financial health', 'Used by investors and creditors'],
      whyItMatters: [{ use: 'Financial Health', description: 'Evaluate if assets > liabilities' }, { use: 'Investment', description: 'Assess company value' }, { use: 'Lending', description: 'Banks check balance sheets' }, { use: 'Track Growth', description: 'Compare over time' }],
      keyConcepts: [
        { term: 'Assets', description: 'What company owns', example: 'Cash, inventory, buildings', realUse: 'Resources' },
        { term: 'Liabilities', description: 'What company owes', example: 'Loans, payables', realUse: 'Debts' },
        { term: 'Equity', description: 'Owner\'s stake', example: 'Shareholder capital', realUse: 'Net worth' },
        { term: 'Equation', description: 'Assets = Liabilities + Equity', example: '₹300k = ₹150k + ₹150k', realUse: 'Must balance' }
      ],
      steps: [{ step: 'List assets', detail: 'Total all assets' }, { step: 'List liabilities', detail: 'Total all debts' }, { step: 'Calculate equity', detail: 'Assets - Liabilities' }, { step: 'Verify balance', detail: 'Check equation' }],
      example: { goal: 'Create balance sheet', scenario: 'Retail store', setup: ['Assets: ₹300k', 'Liabilities: ₹150k', 'Equity: ₹150k', 'Check: ₹300k = ₹150k + ₹150k'], result: 'Balance sheet balances correctly' },
      proTips: [{ tip: 'Check the date', detail: 'Snapshot at specific date' }, { tip: 'Compare over time', detail: 'Look at trends' }, { tip: 'Calculate ratios', detail: 'Current ratio, debt-to-equity' }],
      practice: 'Create a balance sheet using sample financial data and calculate debt-to-equity ratio',
      nextTopic: 'cash-flow',
      prevTopic: 'profit-loss'
    },
    'cash-flow': {
      title: 'Cash Flow Statement',
      level: 'Intermediate',
      duration: '14 min',
      definition: 'The Cash Flow Statement tracks how cash moves in and out of a business, divided into operating, investing, and financing activities.',
      detailedDefinition: ['Shows actual cash movement', 'Operating, investing, financing', 'Reconciles net income to cash', 'Assesses liquidity'],
      whyItMatters: [{ use: 'Liquidity', description: 'Can company pay bills' }, { use: 'Investment Quality', description: 'Strong cash flow indicates health' }, { use: 'Growth Planning', description: 'Plan for expansion' }, { use: 'Dividends', description: 'Capacity to pay dividends' }],
      keyConcepts: [
        { term: 'Operating', description: 'Cash from daily operations', example: 'Customer payments', realUse: 'Core business cash' },
        { term: 'Investing', description: 'Buying/selling assets', example: 'Equipment purchase', realUse: 'Growth investments' },
        { term: 'Financing', description: 'Cash from investors/creditors', example: 'Bank loans', realUse: 'Capital raising' },
        { term: 'Free Cash Flow', description: 'Operating CF - CapEx', example: 'Cash available for investors', realUse: 'Valuation metric' }
      ],
      steps: [{ step: 'Start with net income', detail: 'From P&L' }, { step: 'Add non-cash expenses', detail: 'Depreciation' }, { step: 'Adjust working capital', detail: 'AR, AP, inventory' }, { step: 'Calculate Operating CF', detail: 'Core cash flow' }, { step: 'Add investing/financing', detail: 'Other activities' }],
      example: { goal: 'Calculate operating cash flow', scenario: 'Company data', setup: ['Net Income: ₹100k', '+ Depreciation: ₹20k', '- Increase AR: ₹10k', '+ Decrease Inventory: ₹5k', '= Operating CF: ₹115k'], result: 'Operating cash flow ₹115,000' },
      proTips: [{ tip: 'Focus on Operating CF', detail: 'Core business health' }, { tip: 'Compare to net income', detail: 'Should be similar or higher' }, { tip: 'Watch negative trends', detail: 'Possible problems' }],
      practice: 'Calculate free cash flow given operating cash flow of ₹200,000 and capital expenditures of ₹50,000',
      nextTopic: 'financial-ratios',
      prevTopic: 'balance-sheet'
    },
    'financial-ratios': {
      title: 'Financial Ratios',
      level: 'Intermediate',
      duration: '12 min',
      definition: 'Financial ratios analyze relationships between financial statement numbers, helping evaluate company performance and health.',
      detailedDefinition: ['Compare relationships', 'Enable company comparisons', 'Identify trends', 'Investment decisions'],
      whyItMatters: [{ use: 'Performance', description: 'Measure profitability' }, { use: 'Risk', description: 'Assess liquidity and solvency' }, { use: 'Investment', description: 'Compare companies' }, { use: 'Credit', description: 'Banks use ratios' }],
      keyConcepts: [
        { term: 'Liquidity', description: 'Pay short-term debts', example: 'Current Ratio = CA/CL', realUse: 'Ability to pay bills' },
        { term: 'Profitability', description: 'Generate profit', example: 'Gross Margin = GP/Revenue', realUse: 'Efficiency' },
        { term: 'Leverage', description: 'Use of debt', example: 'Debt-to-Equity', realUse: 'Financial risk' },
        { term: 'Efficiency', description: 'Use assets', example: 'Inventory Turnover', realUse: 'Operational efficiency' }
      ],
      steps: [{ step: 'Get statements', detail: 'Income statement, balance sheet' }, { step: 'Identify accounts', detail: 'Find needed numbers' }, { step: 'Apply formulas', detail: 'Calculate ratios' }, { step: 'Compare', detail: 'Industry benchmarks' }, { step: 'Analyze trends', detail: 'Multiple periods' }],
      example: { goal: 'Calculate key ratios', scenario: 'Company financials', setup: ['Gross Margin: 40%', 'Current Ratio: 2.0', 'Debt-to-Equity: 0.67', 'Interpretation: Healthy liquidity, manageable debt'], result: 'Company shows healthy financial position' },
      proTips: [{ tip: 'Use industry benchmarks', detail: 'Compare to averages' }, { tip: 'Look at trends', detail: 'Single ratio not enough' }, { tip: 'Consider full picture', detail: 'Use multiple ratios' }],
      practice: 'Calculate current ratio, gross margin, and debt-to-equity for a company',
      nextTopic: 'budgeting',
      prevTopic: 'cash-flow'
    },
    'budgeting': {
      title: 'Budgeting',
      level: 'Beginner',
      duration: '10 min',
      definition: 'Budgeting creates a financial plan for future periods, estimating expected revenues and expenses to control spending and achieve goals.',
      detailedDefinition: ['Forecasts future performance', 'Sets spending limits', 'Provides benchmarks', 'Helps allocate resources'],
      whyItMatters: [{ use: 'Financial Control', description: 'Prevents overspending' }, { use: 'Goal Setting', description: 'Establishes targets' }, { use: 'Performance', description: 'Measure actual vs budget' }, { use: 'Allocation', description: 'Direct resources efficiently' }],
      keyConcepts: [
        { term: 'Revenue Budget', description: 'Income forecast', example: '₹100k per month', realUse: 'Sales targets' },
        { term: 'Expense Budget', description: 'Spending plan', example: 'Salaries, rent, marketing', realUse: 'Cost control' },
        { term: 'Variance', description: 'Actual vs budget difference', example: '+₹10k favorable', realUse: 'Performance measure' },
        { term: 'Rolling Forecast', description: 'Continuously updated', example: 'Add quarter as each passes', realUse: 'Dynamic planning' }
      ],
      steps: [{ step: 'Review history', detail: 'Past performance' }, { step: 'Estimate revenue', detail: 'Sales forecast' }, { step: 'Estimate expenses', detail: 'Cost projections' }, { step: 'Build budget', detail: 'Create spreadsheet' }, { step: 'Get approval', detail: 'Management sign-off' }, { step: 'Track vs budget', detail: 'Monitor monthly' }],
      example: { goal: 'Create monthly budget', scenario: 'Small business', setup: ['Revenue: ₹100k', 'Expenses: ₹95k', 'Profit: ₹5k', 'Track variances monthly'], result: 'Budget shows ₹5,000 monthly profit target' },
      proTips: [{ tip: 'Be realistic', detail: 'Not overly optimistic' }, { tip: 'Include contingency', detail: 'Buffer for unexpected' }, { tip: 'Review regularly', detail: 'Update as needed' }],
      practice: 'Create a quarterly budget for a small retail store with seasonal sales',
      nextTopic: 'forecasting',
      prevTopic: 'financial-ratios'
    },
    'forecasting': {
      title: 'Forecasting',
      level: 'Advanced',
      duration: '14 min',
      definition: 'Forecasting uses historical data and statistical methods to predict future financial performance, helping organizations plan for growth.',
      detailedDefinition: ['Predicts future outcomes', 'Uses statistical methods', 'Identifies trends and seasonality', 'Supports strategic planning'],
      whyItMatters: [{ use: 'Strategic Planning', description: 'Inform long-term strategy' }, { use: 'Cash Management', description: 'Anticipate needs' }, { use: 'Capacity Planning', description: 'Plan production and staffing' }, { use: 'Investor Communication', description: 'Share expectations' }],
      keyConcepts: [
        { term: 'Time Series', description: 'Data over time intervals', example: 'Monthly sales for 3 years', realUse: 'Identify patterns' },
        { term: 'Trend', description: 'Long-term direction', example: '5% annual growth', realUse: 'Baseline projection' },
        { term: 'Seasonality', description: 'Regular patterns', example: 'Higher Dec sales', realUse: 'Adjust forecasts' },
        { term: 'Moving Average', description: 'Smooths fluctuations', example: '3-month average', realUse: 'Simple forecasting' }
      ],
      steps: [{ step: 'Gather history', detail: '3-5 years data' }, { step: 'Choose method', detail: 'Moving average, regression' }, { step: 'Create model', detail: 'Build mathematical model' }, { step: 'Validate', detail: 'Test on historical data' }, { step: 'Generate forecast', detail: 'Predict future' }, { step: 'Update regularly', detail: 'Refresh with new data' }],
      example: { goal: 'Sales forecast using moving average', scenario: '6 months sales data', setup: ['Jan100, Feb110, Mar105, Apr115, May120, Jun125', '3-month average for July: (115+120+125)/3 = 120'], result: 'July forecast: ₹120,000' },
      proTips: [{ tip: 'Use multiple methods', detail: 'Combine forecasts' }, { tip: 'Include confidence', detail: 'Show range of outcomes' }, { tip: 'Consider external', detail: 'Economic indicators' }],
      practice: 'Forecast next quarter\'s sales using moving average with provided historical data',
      nextTopic: null,
      prevTopic: 'budgeting'
    }
  }
};

export default function TopicPage({ params }: { params: { category: string; topic: string } }) {
  const { category, topic } = params;
  const content = topicContent[category]?.[topic];
  
  if (!content) {
    notFound();
  }
  
  const getLevelBadge = () => {
    switch(content.level) {
      case 'Beginner': return 'bg-green-100 text-green-700';
      case 'Intermediate': return 'bg-amber-100 text-amber-700';
      case 'Advanced': return 'bg-rose-100 text-rose-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between">
            <Link href="/learn" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition">
              <ChevronLeft size={18} />
              <span className="text-sm">Back to Topics</span>
            </Link>
            <span className="text-sm text-gray-400 hidden sm:block">{content.title}</span>
            <div className="w-20"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        
        {/* Title Section */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <h1 className="text-3xl font-bold text-gray-900">{content.title}</h1>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getLevelBadge()}`}>
              {content.level}
            </span>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <Clock size={14} />
              {content.duration}
            </span>
          </div>
        </div>

        {/* Section 1: What is it? */}
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen size={18} className="text-blue-600" />
            <h2 className="text-lg font-bold text-gray-900">What is {content.title}?</h2>
          </div>
          <div className="bg-blue-50 rounded-lg p-5 mb-4">
            <p className="text-gray-800 leading-relaxed">{content.definition}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-5">
            <h3 className="font-semibold text-gray-900 mb-3 text-sm">Key Components:</h3>
            <ul className="space-y-2">
              {content.detailedDefinition?.map((item: string, idx: number) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle size={16} className="text-blue-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600 text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Section 2: Why it matters */}
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <Target size={18} className="text-emerald-600" />
            <h2 className="text-lg font-bold text-gray-900">Why it matters</h2>
          </div>
          <div className="grid gap-3">
            {content.whyItMatters?.map((item: any, idx: number) => (
              <div key={idx} className="bg-white rounded-lg border border-gray-200 p-4">
                <h3 className="font-semibold text-gray-800 mb-1">{item.use}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Key Concepts */}
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <Zap size={18} className="text-purple-600" />
            <h2 className="text-lg font-bold text-gray-900">Key Concepts</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {content.keyConcepts?.map((concept: any, idx: number) => (
              <div key={idx} className="bg-white rounded-lg border border-gray-200 p-4">
                <h3 className="font-bold text-gray-900 mb-1">{concept.term}</h3>
                <p className="text-gray-600 text-sm mb-2">{concept.description}</p>
                <p className="text-gray-500 text-xs">Example: {concept.example.substring(0, 60)}...</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Steps */}
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <Target size={18} className="text-orange-600" />
            <h2 className="text-lg font-bold text-gray-900">How to use</h2>
          </div>
          <div className="space-y-3">
            {content.steps?.map((step: any, idx: number) => (
              <div key={idx} className="flex items-start gap-3 bg-white rounded-lg border border-gray-200 p-4">
                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 text-sm">{step.step}</h3>
                  <p className="text-gray-600 text-sm mt-1">{step.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5: Example */}
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen size={18} className="text-cyan-600" />
            <h2 className="text-lg font-bold text-gray-900">Example</h2>
          </div>
          <div className="bg-gray-900 rounded-lg p-5">
            <div className="text-white text-sm mb-2">Goal: {content.example?.goal}</div>
            <div className="space-y-1 mb-3">
              {content.example?.setup?.map((line: string, idx: number) => (
                line && line !== '' && (
                  <div key={idx} className="font-mono text-white text-sm">
                    {line}
                  </div>
                )
              ))}
            </div>
            <div className="text-white text-sm pt-2 border-t border-gray-700">Result: {content.example?.result}</div>
          </div>
        </section>

        {/* Section 6: Pro Tips */}
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb size={18} className="text-amber-600" />
            <h2 className="text-lg font-bold text-gray-900">Pro Tips</h2>
          </div>
          <div className="bg-amber-50 rounded-lg p-5">
            <ul className="space-y-2">
              {content.proTips?.map((tip: any, idx: number) => (
                <li key={idx} className="flex items-start gap-2 text-gray-700 text-sm">
                  <span className="text-amber-500">•</span>
                  <span><strong>{tip.tip}:</strong> {tip.detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Section 7: Practice */}
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <Target size={18} className="text-emerald-600" />
            <h2 className="text-lg font-bold text-gray-900">Practice</h2>
          </div>
          <div className="bg-emerald-50 rounded-lg p-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <span className="text-gray-800 text-sm">{content.practice}</span>
              <button disabled className="px-4 py-1.5 bg-gray-400 text-white text-sm font-medium rounded-lg cursor-not-allowed">
                Coming Soon
              </button>
            </div>
          </div>
        </section>

        {/* Navigation */}
        <div className="flex items-center justify-between gap-4 pt-6 border-t border-gray-200">
          {content.prevTopic ? (
            <Link
              href={`/learn/${category}/${content.prevTopic}`}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition text-sm"
            >
              <ChevronLeft size={16} />
              Previous
            </Link>
          ) : (
            <div></div>
          )}
          
          {content.nextTopic ? (
            <Link
              href={`/learn/${category}/${content.nextTopic}`}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition text-sm font-medium"
            >
              Next: {content.nextTopic.split('-').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
              <ChevronRight size={16} />
            </Link>
          ) : (
            <Link
              href="/learn"
              className="flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition text-sm font-medium"
            >
              All Topics
              <ChevronRight size={16} />
            </Link>
          )}
        </div>

      </div>
    </div>
  );
}