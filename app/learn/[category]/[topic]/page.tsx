import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Clock, ChevronRight, ChevronLeft, CheckCircle, Target, Hourglass, Lightbulb } from 'lucide-react';

// Complete topic content - ALL topics included
const topicContent: Record<string, Record<string, any>> = {
  excel: {
    'pivot-tables': {
      title: 'Pivot Tables',
      level: 'Intermediate',
      duration: '15 min',
      definition: 'A Pivot Table is a tool in Excel that helps you summarize and analyze large datasets quickly.\n\nIt allows you to group, filter, and reorganize data to find insights like sales by region, product performance, and trends over time.',
      whyItMatters: [
        'Analyze sales by region or product',
        'Track monthly or yearly trends',
        'Create reports for managers',
        'Identify top and low-performing items'
      ],
      keyConcepts: [
        { term: 'Rows', explanation: 'What you want to see (Products, Regions)' },
        { term: 'Columns', explanation: 'How to group data (Months, Quarters)' },
        { term: 'Values', explanation: 'What to calculate (Sales, Quantity)' },
        { term: 'Filters', explanation: 'Limit data (Region, Category)' }
      ],
      steps: [
        'Select your dataset',
        'Go to Insert → Pivot Table',
        'Choose "New Worksheet"',
        'Drag fields into Rows, Columns, and Values'
      ],
      example: { goal: 'Analyze sales by region', setup: ['Rows → Product', 'Columns → Region', 'Values → Sales'] },
      proTips: ['Use clean data (no blank rows)', 'Convert data to Table (Ctrl + T)', 'Refresh Pivot Table after updates'],
      practice: 'Create a Pivot Table showing total sales by category',
      nextTopic: 'vlookup',
      prevTopic: null
    },
    'vlookup': {
      title: 'VLOOKUP',
      level: 'Intermediate',
      duration: '12 min',
      definition: 'VLOOKUP searches for a value in the first column of a table and returns a matching value from another column.\n\nIt helps you find data across different sheets without manual searching.',
      whyItMatters: [
        'Find employee names using their ID numbers',
        'Match product prices from a price list',
        'Combine data from two different reports',
        'Auto-fill customer addresses from customer database'
      ],
      keyConcepts: [
        { term: 'Lookup Value', explanation: 'What you want to find (Employee ID, Product Code)' },
        { term: 'Table Array', explanation: 'Where to search (your lookup table range)' },
        { term: 'Column Index', explanation: 'Which column to return (2 = second column)' },
        { term: 'Range Lookup', explanation: 'FALSE = exact match, TRUE = approximate' }
      ],
      steps: [
        'Click where you want the result',
        'Type =VLOOKUP(',
        'Select the cell with value to look up',
        'Select your lookup table range',
        'Type the column number to return',
        'Type FALSE and close parenthesis )'
      ],
      example: { goal: 'Find employee name using their ID', setup: ['Lookup Value → A2 (Employee ID)', 'Table Array → $D$2:$E$100 (ID, Name)', 'Column Index → 2 (Name column)', 'Range Lookup → FALSE'] },
      proTips: ['Lock table array with $ signs', 'Use IFERROR to hide #N/A errors', 'VLOOKUP only looks RIGHT'],
      practice: 'Use VLOOKUP to find product prices from a price list',
      nextTopic: 'conditional-formatting',
      prevTopic: 'pivot-tables'
    },
    'conditional-formatting': {
      title: 'Conditional Formatting',
      level: 'Beginner',
      duration: '8 min',
      definition: 'Conditional Formatting automatically applies colors, icons, or formatting to cells based on rules you set.\n\nIt helps you spot trends, outliers, and important data points instantly.',
      whyItMatters: [
        'Highlight sales above target in green',
        'Flag overdue dates in red',
        'Find duplicate entries quickly',
        'Visualize data with color scales and bars'
      ],
      keyConcepts: [
        { term: 'Highlight Cell Rules', explanation: 'Format cells greater than, less than, equal to' },
        { term: 'Top/Bottom Rules', explanation: 'Highlight top 10 items, above average' },
        { term: 'Data Bars', explanation: 'Add bars inside cells to show value magnitude' },
        { term: 'Color Scales', explanation: '2-3 color gradient for ranges' }
      ],
      steps: [
        'Select the cells you want to format',
        'Go to Home → Conditional Formatting',
        'Choose a rule type',
        'Set your condition value',
        'Pick a format (color, bold, icon)'
      ],
      example: { goal: 'Highlight sales above ₹10,000', setup: ['Rule → Greater Than', 'Value → 10000', 'Format → Green Fill'] },
      proTips: ['Use Manage Rules to edit rules', 'Apply rules in order', 'Use formulas for complex conditions'],
      practice: 'Highlight all duplicate entries in a column',
      nextTopic: 'data-validation',
      prevTopic: 'vlookup'
    },
    'data-validation': {
      title: 'Data Validation',
      level: 'Beginner',
      duration: '10 min',
      definition: 'Data Validation controls what users can enter into a cell by creating rules and dropdown lists.\n\nIt prevents data entry errors and ensures consistency across your spreadsheet.',
      whyItMatters: [
        'Create dropdown lists for consistent data entry',
        'Restrict numbers to valid ranges (1-100)',
        'Prevent duplicate entries',
        'Show helpful input messages to users'
      ],
      keyConcepts: [
        { term: 'List', explanation: 'Create dropdown from values or range' },
        { term: 'Whole Number', explanation: 'Restrict to number range (1-100)' },
        { term: 'Date', explanation: 'Limit dates between ranges' },
        { term: 'Custom Formula', explanation: 'Advanced validation with formulas' }
      ],
      steps: [
        'Select cells to validate',
        'Data → Data Validation',
        'Choose Allow type',
        'Enter your criteria',
        'Add Input Message (optional)',
        'Set Error Alert style'
      ],
      example: { goal: 'Create dropdown with month names', setup: ['Allow → List', 'Source → January, February, March', 'Input Message → "Select a month"'] },
      proTips: ['Use named ranges for lists', 'Copy validation with Paste Special', 'Circle Invalid Data to find errors'],
      practice: 'Create a dropdown list for product categories',
      nextTopic: 'charts-graphs',
      prevTopic: 'conditional-formatting'
    },
    'charts-graphs': {
      title: 'Charts & Graphs',
      level: 'Beginner',
      duration: '14 min',
      definition: 'Charts and graphs help you visualize data and identify trends at a glance.\n\nThey make complex data easy to understand and present.',
      whyItMatters: [
        'Present data visually to stakeholders',
        'Identify trends and patterns quickly',
        'Compare performance across categories',
        'Create professional reports'
      ],
      keyConcepts: [
        { term: 'Column Chart', explanation: 'Compare values across categories' },
        { term: 'Line Chart', explanation: 'Show trends over time' },
        { term: 'Pie Chart', explanation: 'Show proportions of a whole' },
        { term: 'Bar Chart', explanation: 'Horizontal comparison of values' }
      ],
      steps: [
        'Select your data range',
        'Go to Insert → Charts',
        'Choose chart type',
        'Customize with Chart Tools',
        'Add titles and labels'
      ],
      example: { goal: 'Create a sales trend chart', setup: ['Data → Months and Sales', 'Chart Type → Line Chart', 'Title → "Monthly Sales Trend"'] },
      proTips: ['Use Alt+F1 for quick chart', 'Switch row/column for different view', 'Use recommended charts feature'],
      practice: 'Create a column chart showing sales by product category',
      nextTopic: 'macros',
      prevTopic: 'data-validation'
    },
    'macros': {
      title: 'Macros',
      level: 'Advanced',
      duration: '20 min',
      definition: 'Macros automate repetitive tasks in Excel using VBA (Visual Basic for Applications).\n\nThey save time by recording and playing back your actions.',
      whyItMatters: [
        'Automate daily report generation',
        'Save hours of manual work',
        'Reduce human errors',
        'Create consistent outputs'
      ],
      keyConcepts: [
        { term: 'Record Macro', explanation: 'Record your actions to replay later' },
        { term: 'Run Macro', explanation: 'Execute recorded or written macros' },
        { term: 'VBA Editor', explanation: 'Where you can edit macro code' },
        { term: 'Button', explanation: 'Assign macros to buttons for easy access' }
      ],
      steps: [
        'Enable Developer tab in settings',
        'Click Record Macro',
        'Perform your actions',
        'Click Stop Recording',
        'Run macro anytime'
      ],
      example: { goal: 'Automate report formatting', setup: ['Record → Apply formatting', 'Stop → Save macro', 'Run on any report'] },
      proTips: ['Save as .xlsm for macros', 'Use relative references', 'Test on backup data first'],
      practice: 'Record a macro that formats a sales report with bold headers and currency',
      nextTopic: 'sumifs',
      prevTopic: 'charts-graphs'
    },
    'sumifs': {
      title: 'SUMIFS',
      level: 'Intermediate',
      duration: '10 min',
      definition: 'SUMIFS adds values that meet multiple conditions.\n\nIt helps you sum data based on one or more criteria.',
      whyItMatters: [
        'Sum sales by region AND product',
        'Calculate totals for specific date ranges',
        'Sum values meeting multiple conditions',
        'Create dynamic reports'
      ],
      keyConcepts: [
        { term: 'Sum Range', explanation: 'The range to sum' },
        { term: 'Criteria Range', explanation: 'Range to evaluate' },
        { term: 'Criteria', explanation: 'The condition to meet' },
        { term: 'Multiple Conditions', explanation: 'Add up to 127 condition pairs' }
      ],
      steps: [
        'Type =SUMIFS(',
        'Select sum range',
        'Select criteria range 1',
        'Enter criteria 1',
        'Add more criteria as needed',
        'Close parenthesis'
      ],
      example: { goal: 'Sum sales for Product A in North region', setup: ['Sum Range → Sales column', 'Criteria 1 → Product = "A"', 'Criteria 2 → Region = "North"'] },
      proTips: ['Use wildcards * and ? for partial matches', 'Can use cell references for criteria', 'Works with dates, numbers, text'],
      practice: 'Calculate total sales for Q1 2024 for Electronics category',
      nextTopic: 'index-match',
      prevTopic: 'macros'
    },
    'index-match': {
      title: 'INDEX MATCH',
      level: 'Advanced',
      duration: '15 min',
      definition: 'INDEX MATCH is a powerful combination that overcomes VLOOKUP limitations.\n\nIt can look left, right, up, or down to find matching values.',
      whyItMatters: [
        'Look up values from any column (not just left)',
        'Faster than VLOOKUP on large datasets',
        'More flexible and powerful',
        'No column index number to update'
      ],
      keyConcepts: [
        { term: 'INDEX', explanation: 'Returns value at position in range' },
        { term: 'MATCH', explanation: 'Finds position of lookup value' },
        { term: 'Combine', explanation: 'INDEX(range, MATCH(lookup, column, 0))' }
      ],
      steps: [
        'Start with =INDEX(',
        'Select return range',
        'Use MATCH to find row number',
        'MATCH(lookup, lookup range, 0)',
        'Close parentheses'
      ],
      example: { goal: 'Find employee name from any column', setup: ['INDEX(Name column, MATCH(ID, ID column, 0))', 'Works even if Name is left of ID'] },
      proTips: ['Use 0 for exact match in MATCH', 'Faster than VLOOKUP on large data', 'More flexible - can do horizontal lookups'],
      practice: 'Use INDEX MATCH to find product price from a table where price is left of product name',
      nextTopic: null,
      prevTopic: 'sumifs'
    }
  },
  sql: {
    'sql-joins': {
      title: 'SQL Joins',
      level: 'Intermediate',
      duration: '12 min',
      definition: 'SQL JOINs combine rows from two or more tables based on a related column between them.\n\nThey help you answer business questions that require data from multiple tables.',
      whyItMatters: [
        'Match customer names to their orders',
        'Combine sales data with product details',
        'Find customers who haven\'t ordered',
        'Build complete business reports'
      ],
      keyConcepts: [
        { term: 'INNER JOIN', explanation: 'Returns only matching records from both tables' },
        { term: 'LEFT JOIN', explanation: 'Returns ALL records from left table' },
        { term: 'RIGHT JOIN', explanation: 'Returns ALL records from right table' },
        { term: 'ON Clause', explanation: 'Specifies which columns to match on' }
      ],
      steps: [
        'SELECT columns you want',
        'FROM first table',
        'INNER/LEFT JOIN second table',
        'ON matching column condition',
        'Add WHERE filter if needed'
      ],
      example: { goal: 'Show customer names with their orders', setup: ['SELECT Customers.Name, Orders.OrderDate', 'FROM Customers', 'INNER JOIN Orders ON Customers.ID = Orders.CustomerID'] },
      proTips: ['Use table aliases (C, O) to write less code', 'LEFT JOIN is used more often than RIGHT JOIN', 'Check for NULLs when using LEFT JOIN'],
      practice: 'Write a query showing all products and their category names',
      nextTopic: 'select-queries',
      prevTopic: null
    },
    'select-queries': {
      title: 'SELECT Queries',
      level: 'Beginner',
      duration: '10 min',
      definition: 'SELECT queries retrieve data from database tables.\n\nThey are the foundation of all SQL data retrieval.',
      whyItMatters: [
        'Get specific columns from tables',
        'Filter data with WHERE clause',
        'Sort results with ORDER BY',
        'Limit results for performance'
      ],
      keyConcepts: [
        { term: 'SELECT', explanation: 'Specifies which columns to return' },
        { term: 'FROM', explanation: 'Specifies which table to query' },
        { term: 'WHERE', explanation: 'Filters rows based on conditions' },
        { term: 'ORDER BY', explanation: 'Sorts the results' }
      ],
      steps: [
        'Start with SELECT column1, column2',
        'Add FROM table_name',
        'Add WHERE condition (optional)',
        'Add ORDER BY column (optional)',
        'End with semicolon'
      ],
      example: { goal: 'Get all customers from Mumbai', setup: ['SELECT * FROM Customers', 'WHERE City = "Mumbai"', 'ORDER BY Name'] },
      proTips: ['Use * sparingly - name specific columns', 'Use single quotes for text values', 'Use LIMIT to test queries'],
      practice: 'Write a query to get all orders over ₹10,000 from the last 30 days',
      nextTopic: 'group-by',
      prevTopic: 'sql-joins'
    },
    'group-by': {
      title: 'GROUP BY',
      level: 'Intermediate',
      duration: '10 min',
      definition: 'GROUP BY groups rows that have the same values into summary rows.\n\nIt is used with aggregate functions like COUNT, SUM, AVG.',
      whyItMatters: [
        'Calculate total sales by product',
        'Count orders by customer',
        'Find average price by category',
        'Create summary reports'
      ],
      keyConcepts: [
        { term: 'GROUP BY', explanation: 'Groups rows with same values' },
        { term: 'COUNT', explanation: 'Counts rows in each group' },
        { term: 'SUM', explanation: 'Adds values in each group' },
        { term: 'HAVING', explanation: 'Filters groups (like WHERE for groups)' }
      ],
      steps: [
        'Write SELECT with aggregate function',
        'Add GROUP BY column',
        'Optionally add HAVING condition',
        'Order results if needed'
      ],
      example: { goal: 'Total sales by product', setup: ['SELECT Product, SUM(Sales) as TotalSales', 'FROM Orders', 'GROUP BY Product', 'ORDER BY TotalSales DESC'] },
      proTips: ['Every non-aggregate column must be in GROUP BY', 'Use HAVING for group filters', 'Use meaningful aliases'],
      practice: 'Find the number of orders per customer and show only customers with more than 5 orders',
      nextTopic: 'subqueries',
      prevTopic: 'select-queries'
    },
    'subqueries': {
      title: 'Subqueries',
      level: 'Advanced',
      duration: '14 min',
      definition: 'A subquery is a query nested inside another query.\n\nIt allows you to use the result of one query in another query.',
      whyItMatters: [
        'Find employees earning above average',
        'Get customers with highest orders',
        'Compare individual to company metrics',
        'Complex data analysis'
      ],
      keyConcepts: [
        { term: 'IN', explanation: 'Checks if value exists in subquery result' },
        { term: 'EXISTS', explanation: 'Checks if subquery returns any rows' },
        { term: 'ANY/ALL', explanation: 'Compares value to subquery results' },
        { term: 'Scalar', explanation: 'Subquery that returns single value' }
      ],
      steps: [
        'Write outer query first',
        'Add WHERE condition with IN/EXISTS',
        'Write subquery in parentheses',
        'Ensure subquery returns correct data type'
      ],
      example: { goal: 'Find customers who placed orders', setup: ['SELECT * FROM Customers', 'WHERE CustomerID IN (SELECT DISTINCT CustomerID FROM Orders)'] },
      proTips: ['Subqueries can be slow - consider JOINs', 'Use EXISTS instead of IN for better performance', 'Can nest multiple levels'],
      practice: 'Find products that cost more than the average product price',
      nextTopic: 'window-functions',
      prevTopic: 'group-by'
    },
    'window-functions': {
      title: 'Window Functions',
      level: 'Advanced',
      duration: '16 min',
      definition: 'Window functions perform calculations across a set of rows related to the current row.\n\nUnlike GROUP BY, they do not collapse rows.',
      whyItMatters: [
        'Calculate running totals',
        'Rank products by sales',
        'Find percentage of total',
        'Compare row to previous row'
      ],
      keyConcepts: [
        { term: 'ROW_NUMBER', explanation: 'Assigns unique number to each row' },
        { term: 'RANK', explanation: 'Assigns rank with gaps' },
        { term: 'DENSE_RANK', explanation: 'Assigns rank without gaps' },
        { term: 'OVER()', explanation: 'Defines window of rows' }
      ],
      steps: [
        'Choose window function',
        'Add OVER clause',
        'Use PARTITION BY for groups',
        'Use ORDER BY for sequence',
        'Reference in SELECT'
      ],
      example: { goal: 'Rank products by sales', setup: ['SELECT Product, Sales, RANK() OVER (ORDER BY Sales DESC) as SalesRank', 'FROM Products'] },
      proTips: ['PARTITION BY creates groups', 'ORDER BY determines sequence', 'Can use multiple window functions'],
      practice: 'Calculate a running total of sales by date for each product category',
      nextTopic: null,
      prevTopic: 'subqueries'
    }
  },
  powerbi: {
    'data-modeling': {
      title: 'Data Modeling',
      level: 'Intermediate',
      duration: '15 min',
      definition: 'Data modeling creates relationships between tables in Power BI.\n\nIt allows you to build a semantic model that reflects business logic.',
      whyItMatters: [
        'Connect sales to products and customers',
        'Create single source of truth',
        'Enable cross-filtering between tables',
        'Improve performance'
      ],
      keyConcepts: [
        { term: 'Relationships', explanation: 'Connect tables via common columns' },
        { term: 'Cardinality', explanation: 'One-to-many, many-to-many relationships' },
        { term: 'Star Schema', explanation: 'Fact and dimension tables' },
        { term: 'Filters', explanation: 'How filters flow between tables' }
      ],
      steps: [
        'Load your tables',
        'Open Model view',
        'Drag between columns to create relationships',
        'Set cardinality correctly',
        'Configure cross-filter direction'
      ],
      example: { goal: 'Connect sales to products', setup: ['Sales[ProductID] → Products[ProductID]', 'One-to-many relationship', 'Single direction filter'] },
      proTips: ['Use star schema when possible', 'Hide foreign key columns', 'Mark date tables for time intelligence'],
      practice: 'Build a model linking sales, products, customers, and dates',
      nextTopic: 'dax-functions',
      prevTopic: null
    },
    'dax-functions': {
      title: 'DAX Functions',
      level: 'Advanced',
      duration: '18 min',
      definition: 'DAX (Data Analysis Expressions) is a formula language for Power BI.\n\nIt allows you to create custom calculations and measures.',
      whyItMatters: [
        'Create year-over-year comparisons',
        'Calculate running totals',
        'Build dynamic KPIs',
        'Filter data conditionally'
      ],
      keyConcepts: [
        { term: 'CALCULATE', explanation: 'Changes filter context' },
        { term: 'SUMX', explanation: 'Iterates over table rows' },
        { term: 'FILTER', explanation: 'Returns filtered table' },
        { term: 'ALL', explanation: 'Removes filters' }
      ],
      steps: [
        'Go to Modeling tab',
        'Click New Measure',
        'Write DAX formula',
        'Use CALCULATE for context changes',
        'Format as needed'
      ],
      example: { goal: 'Total sales for current year', setup: ['Total Sales CY = CALCULATE(SUM(Sales[Amount]), YEAR(Sales[Date]) = YEAR(TODAY()))'] },
      proTips: ['Use variables for complex logic', 'Understand filter context', 'Test measures in visuals'],
      practice: 'Create a measure that shows sales growth compared to previous month',
      nextTopic: 'visualizations',
      prevTopic: 'data-modeling'
    },
    'visualizations': {
      title: 'Visualizations',
      level: 'Beginner',
      duration: '12 min',
      definition: 'Visualizations turn data into charts and graphs in Power BI.\n\nThey make insights easy to understand and share.',
      whyItMatters: [
        'Create interactive dashboards',
        'Present data clearly',
        'Spot patterns quickly',
        'Enable data exploration'
      ],
      keyConcepts: [
        { term: 'Bar Chart', explanation: 'Compare values across categories' },
        { term: 'Line Chart', explanation: 'Show trends over time' },
        { term: 'Map', explanation: 'Geographic data visualization' },
        { term: 'Matrix', explanation: 'Cross-tabulation of data' }
      ],
      steps: [
        'Select visualization from Visualizations pane',
        'Drag fields to appropriate wells',
        'Customize formatting',
        'Add slicers for filtering',
        'Arrange on report page'
      ],
      example: { goal: 'Sales by region bar chart', setup: ['Axis → Region', 'Values → Sales', 'Add data labels', 'Customize colors'] },
      proTips: ['Use consistent colors', 'Remove clutter', 'Add titles and tooltips'],
      practice: 'Create a dashboard with sales by product, region, and month',
      nextTopic: 'power-query',
      prevTopic: 'dax-functions'
    },
    'power-query': {
      title: 'Power Query',
      level: 'Intermediate',
      duration: '14 min',
      definition: 'Power Query transforms and cleans data before loading to Power BI.\n\nIt handles data preparation tasks automatically.',
      whyItMatters: [
        'Remove unnecessary columns',
        'Handle missing values',
        'Combine multiple files',
        'Transform data formats'
      ],
      keyConcepts: [
        { term: 'Applied Steps', explanation: 'Sequence of transformations' },
        { term: 'M Language', explanation: 'Power Query formula language' },
        { term: 'Merge', explanation: 'Combine queries like SQL JOIN' },
        { term: 'Append', explanation: 'Stack rows from multiple queries' }
      ],
      steps: [
        'Get Data from source',
        'Transform data in Power Query Editor',
        'Remove columns, filter rows',
        'Change data types',
        'Load to model'
      ],
      example: { goal: 'Clean sales data', setup: ['Remove blank rows', 'Change date type to Date', 'Replace nulls with 0', 'Add total column'] },
      proTips: ['Rename applied steps', 'Use Group By for aggregation', 'Reference queries for efficiency'],
      practice: 'Combine monthly sales files into a single table and clean the data',
      nextTopic: null,
      prevTopic: 'visualizations'
    }
  },
  python: {
    'python-basics': {
      title: 'Python Basics',
      level: 'Beginner',
      duration: '15 min',
      definition: 'Python is a programming language for data analysis and automation.\n\nIt helps you process data and automate repetitive tasks.',
      whyItMatters: [
        'Automate Excel and file processing',
        'Clean and transform data',
        'Build data pipelines',
        'Create visualizations'
      ],
      keyConcepts: [
        { term: 'Variables', explanation: 'Store data values' },
        { term: 'Lists', explanation: 'Store multiple items' },
        { term: 'Loops', explanation: 'Repeat actions' },
        { term: 'Functions', explanation: 'Reusable code blocks' }
      ],
      steps: [
        'Install Python and IDE',
        'Create .py file',
        'Write print("Hello")',
        'Run the script',
        'Build from there'
      ],
      example: { goal: 'Calculate average of numbers', setup: ['numbers = [10, 20, 30, 40, 50]', 'average = sum(numbers) / len(numbers)', 'print(average)'] },
      proTips: ['Use descriptive variable names', 'Comment your code', 'Start simple'],
      practice: 'Write a script that reads a CSV file and prints the first 5 rows',
      nextTopic: 'pandas',
      prevTopic: null
    },
    'pandas': {
      title: 'Pandas',
      level: 'Intermediate',
      duration: '20 min',
      definition: 'Pandas is a Python library for data manipulation and analysis.\n\nIt provides DataFrame objects similar to Excel.',
      whyItMatters: [
        'Read CSV, Excel, SQL data',
        'Filter and group data',
        'Handle missing values',
        'Merge datasets'
      ],
      keyConcepts: [
        { term: 'DataFrame', explanation: '2D table like Excel sheet' },
        { term: 'Series', explanation: 'Single column of data' },
        { term: 'GroupBy', explanation: 'Group data for aggregation' },
        { term: 'Merge', explanation: 'Combine DataFrames like SQL JOIN' }
      ],
      steps: [
        'import pandas as pd',
        'df = pd.read_csv("file.csv")',
        'df.head() to preview',
        'Clean and transform',
        'Export results'
      ],
      example: { goal: 'Group sales by product', setup: ['import pandas as pd', 'df = pd.read_csv("sales.csv")', 'summary = df.groupby("Product")["Sales"].sum()', 'print(summary)'] },
      proTips: ['Use df.info() to see data types', 'Use df.describe() for statistics', 'Use vectorized operations not loops'],
      practice: 'Read an Excel file, filter rows where Sales > 1000, and save as new CSV',
      nextTopic: 'data-visualization',
      prevTopic: 'python-basics'
    },
    'data-visualization': {
      title: 'Data Visualization',
      level: 'Intermediate',
      duration: '18 min',
      definition: 'Create charts and graphs using Python libraries like matplotlib and seaborn.\n\nVisualizations make data insights clear.',
      whyItMatters: [
        'Create professional charts',
        'Customize every visual element',
        'Save charts as images',
        'Build dashboards'
      ],
      keyConcepts: [
        { term: 'Matplotlib', explanation: 'Base plotting library' },
        { term: 'Seaborn', explanation: 'Statistical visualizations' },
        { term: 'Line Plot', explanation: 'Show trends over time' },
        { term: 'Bar Plot', explanation: 'Compare categories' }
      ],
      steps: [
        'import matplotlib.pyplot as plt',
        'Prepare your data',
        'Create figure and axes',
        'Plot your chart',
        'Customize and show/save'
      ],
      example: { goal: 'Line chart of monthly sales', setup: ['plt.plot(months, sales)', 'plt.title("Monthly Sales")', 'plt.xlabel("Month")', 'plt.ylabel("Sales")', 'plt.show()'] },
      proTips: ['Use plt.figure(figsize=(10,6)) for size', 'Add grid with plt.grid(True)', 'Save with plt.savefig("chart.png")'],
      practice: 'Create a bar chart showing sales by product category with custom colors',
      nextTopic: 'numpy',
      prevTopic: 'pandas'
    },
    'numpy': {
      title: 'NumPy',
      level: 'Intermediate',
      duration: '14 min',
      definition: 'NumPy provides efficient numerical computing in Python.\n\nIt handles large arrays and mathematical operations.',
      whyItMatters: [
        'Fast mathematical operations',
        'Work with multi-dimensional arrays',
        'Linear algebra operations',
        'Random number generation'
      ],
      keyConcepts: [
        { term: 'Array', explanation: 'Grid of values' },
        { term: 'Shape', explanation: 'Dimensions of array' },
        { term: 'Broadcasting', explanation: 'Operations on different shaped arrays' },
        { term: 'Vectorization', explanation: 'Operations on entire arrays' }
      ],
      steps: [
        'import numpy as np',
        'arr = np.array([1, 2, 3])',
        'Perform calculations',
        'Use array methods',
        'Reshape as needed'
      ],
      example: { goal: 'Calculate array statistics', setup: ['arr = np.array([10, 20, 30, 40, 50])', 'mean = arr.mean()', 'std = arr.std()', 'print(f"Mean: {mean}, Std: {std}")'] },
      proTips: ['Use np.random for random data', 'Use axis parameter for row/column operations', 'Avoid loops - use vectorized operations'],
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
      definition: 'A Profit & Loss statement shows a company\'s revenues, costs, and expenses over a period.\n\nIt tells you if a business is making profit or loss.',
      whyItMatters: [
        'Track if business is profitable',
        'Identify where money is spent',
        'Compare performance over time',
        'Make informed business decisions'
      ],
      keyConcepts: [
        { term: 'Revenue', explanation: 'Money from sales' },
        { term: 'COGS', explanation: 'Direct cost of goods sold' },
        { term: 'Gross Profit', explanation: 'Revenue - COGS' },
        { term: 'Net Profit', explanation: 'Final profit after ALL expenses' }
      ],
      steps: [
        'List all revenue sources',
        'Calculate total revenue',
        'List all costs and expenses',
        'Calculate total expenses',
        'Net Profit = Revenue - Expenses'
      ],
      example: { goal: 'Calculate net profit', setup: ['Revenue → ₹500,000', 'COGS → ₹200,000', 'Operating Expenses → ₹150,000', 'Net Profit → ₹150,000'] },
      proTips: ['Compare P&L month-over-month', 'Calculate margins', 'Watch for unusual changes'],
      practice: 'Calculate gross profit margin for a retail store',
      nextTopic: 'balance-sheet',
      prevTopic: null
    },
    'balance-sheet': {
      title: 'Balance Sheet',
      level: 'Beginner',
      duration: '12 min',
      definition: 'A Balance Sheet shows a company\'s assets, liabilities, and equity at a point in time.\n\nIt follows the formula: Assets = Liabilities + Equity.',
      whyItMatters: [
        'See what company owns and owes',
        'Evaluate financial health',
        'Calculate ratios like debt-to-equity',
        'Track changes over time'
      ],
      keyConcepts: [
        { term: 'Assets', explanation: 'What company owns (cash, inventory, equipment)' },
        { term: 'Liabilities', explanation: 'What company owes (loans, accounts payable)' },
        { term: 'Equity', explanation: 'Owner\'s stake in company' },
        { term: 'Formula', explanation: 'Assets = Liabilities + Equity' }
      ],
      steps: [
        'List all assets (current then long-term)',
        'Sum to get Total Assets',
        'List all liabilities',
        'Sum to get Total Liabilities',
        'Calculate Equity = Assets - Liabilities'
      ],
      example: { goal: 'Check if balance sheet balances', setup: ['Assets: ₹1,000,000', 'Liabilities: ₹400,000', 'Equity: ₹600,000', 'Assets = Liabilities + Equity ✓'] },
      proTips: ['Balance sheet must always balance', 'Compare to previous periods', 'Look at working capital'],
      practice: 'Calculate current ratio (Current Assets / Current Liabilities) from a balance sheet',
      nextTopic: 'cash-flow',
      prevTopic: 'profit-loss'
    },
    'cash-flow': {
      title: 'Cash Flow Statement',
      level: 'Intermediate',
      duration: '14 min',
      definition: 'The Cash Flow Statement tracks how cash moves in and out of a business.\n\nProfit doesn\'t equal cash - this shows actual liquidity.',
      whyItMatters: [
        'Understand where cash comes from',
        'See how cash is used',
        'Evaluate ability to pay bills',
        'Spot cash flow problems early'
      ],
      keyConcepts: [
        { term: 'Operating', explanation: 'Cash from daily operations' },
        { term: 'Investing', explanation: 'Cash from buying/selling assets' },
        { term: 'Financing', explanation: 'Cash from loans, investors, dividends' },
        { term: 'Net Change', explanation: 'Total change in cash position' }
      ],
      steps: [
        'Start with net income',
        'Add back non-cash expenses (depreciation)',
        'Adjust for working capital changes',
        'Add investing and financing activities',
        'Calculate net cash change'
      ],
      example: { goal: 'Calculate operating cash flow', setup: ['Net Income: ₹100,000', '+ Depreciation: ₹10,000', '- Increase in AR: ₹5,000', '= Operating CF: ₹105,000'] },
      proTips: ['Positive operating cash flow is healthy', 'Watch for negative trends', 'Compare to net income'],
      practice: 'Calculate free cash flow (Operating CF - Capital Expenditures)',
      nextTopic: 'financial-ratios',
      prevTopic: 'balance-sheet'
    },
    'financial-ratios': {
      title: 'Financial Ratios',
      level: 'Intermediate',
      duration: '12 min',
      definition: 'Financial ratios analyze relationships between financial statement numbers.\n\nThey help evaluate company performance and health.',
      whyItMatters: [
        'Compare companies of different sizes',
        'Track performance over time',
        'Identify strengths and weaknesses',
        'Make investment decisions'
      ],
      keyConcepts: [
        { term: 'Liquidity Ratios', explanation: 'Ability to pay short-term debts' },
        { term: 'Profitability Ratios', explanation: 'How well company generates profit' },
        { term: 'Efficiency Ratios', explanation: 'How well company uses assets' },
        { term: 'Leverage Ratios', explanation: 'How much debt company uses' }
      ],
      steps: [
        'Get financial statements',
        'Identify needed numbers',
        'Apply ratio formula',
        'Compare to industry benchmarks',
        'Analyze trends'
      ],
      example: { goal: 'Calculate current ratio', setup: ['Current Assets: ₹500,000', 'Current Liabilities: ₹250,000', 'Current Ratio = 500,000 / 250,000 = 2.0', 'Healthy ratio (above 1.0)'] },
      proTips: ['Compare to industry averages', 'Look at trends over time', 'No single ratio tells full story'],
      practice: 'Calculate gross profit margin and net profit margin from a P&L statement',
      nextTopic: 'budgeting',
      prevTopic: 'cash-flow'
    },
    'budgeting': {
      title: 'Budgeting',
      level: 'Beginner',
      duration: '10 min',
      definition: 'A budget plans future revenues and expenses.\n\nIt helps control spending and achieve financial goals.',
      whyItMatters: [
        'Control spending before it happens',
        'Set financial targets',
        'Identify potential shortfalls',
        'Measure actual vs planned performance'
      ],
      keyConcepts: [
        { term: 'Revenue Budget', explanation: 'Planned sales and income' },
        { term: 'Expense Budget', explanation: 'Planned costs and spending' },
        { term: 'Variance', explanation: 'Difference between actual and budget' },
        { term: 'Rolling Forecast', explanation: 'Regularly updated budget' }
      ],
      steps: [
        'Review historical data',
        'Estimate future revenues',
        'Estimate future expenses',
        'Build budget spreadsheet',
        'Track actual vs budget monthly'
      ],
      example: { goal: 'Create simple monthly budget', setup: ['Revenue: ₹100,000', 'Expenses: ₹70,000', 'Profit: ₹30,000', 'Review variances each month'] },
      proTips: ['Be realistic, not optimistic', 'Include contingency', 'Review and adjust regularly'],
      practice: 'Create a quarterly budget for a small business with seasonal sales',
      nextTopic: 'forecasting',
      prevTopic: 'financial-ratios'
    },
    'forecasting': {
      title: 'Forecasting',
      level: 'Advanced',
      duration: '14 min',
      definition: 'Forecasting predicts future financial performance.\n\nIt uses historical data and statistical methods.',
      whyItMatters: [
        'Plan for future growth',
        'Anticipate cash needs',
        'Set realistic targets',
        'Prepare for scenarios'
      ],
      keyConcepts: [
        { term: 'Time Series', explanation: 'Data points over time' },
        { term: 'Trend', explanation: 'Long-term direction' },
        { term: 'Seasonality', explanation: 'Regular patterns' },
        { term: 'Regression', explanation: 'Relationship between variables' }
      ],
      steps: [
        'Gather historical data',
        'Choose forecast method',
        'Create forecast model',
        'Validate with historical data',
        'Update as new data arrives'
      ],
      example: { goal: 'Simple sales forecast', setup: ['Last 12 months sales', 'Calculate average growth', 'Project next 3 months', 'Adjust for seasonality'] },
      proTips: ['Use multiple methods', 'Include confidence intervals', 'Regularly update forecasts'],
      practice: 'Forecast next quarter\'s sales using moving average or linear regression',
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
  
  return (
    <div className="min-h-screen bg-white">
      {/* Top Bar */}
      <div className="border-b border-gray-100 bg-white sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between text-sm">
            <Link href="/learn" className="text-gray-500 hover:text-gray-900 flex items-center gap-1">
              <ChevronLeft size={16} />
              All Topics
            </Link>
            <div className="flex items-center gap-2 text-gray-400">
              <span className="capitalize">{category}</span>
              <span>/</span>
              <span className="text-gray-900 font-medium">{content.title}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        
        {/* Title + Meta */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{content.title}</h1>
          <div className="flex items-center gap-3 text-gray-500">
            <span>{content.level}</span>
            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
            <span className="flex items-center gap-1">
              <Clock size={14} />
              {content.duration}
            </span>
          </div>
        </div>
        
        {/* Definition */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">What is {content.title}?</h2>
          <div className="bg-gray-50 rounded-xl p-5">
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {content.definition}
            </p>
          </div>
        </section>
        
        {/* Why it matters */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Why it matters</h2>
          <div className="space-y-2">
            {content.whyItMatters.map((item: string, idx: number) => (
              <div key={idx} className="flex items-center gap-2 text-gray-700">
                <CheckCircle size={16} className="text-emerald-500 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>
        
        {/* Key Concepts */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Key Concepts</h2>
          <div className="space-y-3">
            {content.keyConcepts.map((concept: any, idx: number) => (
              <div key={idx} className="flex flex-wrap items-baseline gap-2 p-3 bg-gray-50 rounded-lg">
                <span className="font-semibold text-gray-900 min-w-[100px]">{concept.term}</span>
                <span className="text-gray-600">→</span>
                <span className="text-gray-600">{concept.explanation}</span>
              </div>
            ))}
          </div>
        </section>
        
        {/* Steps */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">How to {content.title.includes('Statement') ? 'analyze' : 'use'}</h2>
          <div className="space-y-3">
            {content.steps.map((step: string, idx: number) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                <span className="text-gray-700">{step}</span>
              </div>
            ))}
          </div>
        </section>
        
        {/* Example */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Example</h2>
          <div className="bg--900 rounded-xl p-5">
            <div className="text-gray-400 text-sm mb-3">Goal: {content.example.goal}</div>
            <div className="space-y-2">
              {content.example.setup.map((line: string, idx: number) => (
                <div key={idx} className="font-mono text-emerald-400 text-sm">
                  {line}
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Pro Tips */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Pro Tips</h2>
          <div className="bg-blue-50 rounded-xl p-5">
            <div className="flex items-start gap-2 mb-3">
              <Lightbulb size={18} className="text-blue-600 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-blue-800 font-medium">Quick tips to save time</span>
            </div>
            <ul className="space-y-2">
              {content.proTips.map((tip: string, idx: number) => (
                <li key={idx} className="text-gray-700 text-sm flex items-start gap-2">
                  <span className="text-blue-500">•</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </section>
        
        {/* Practice */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Practice</h2>
          <div className="bg-emerald-50 rounded-xl p-5">
  <div className="flex items-center gap-3 mb-3">
    <Target size={18} className="text-emerald-600" />
    <span className="text-gray-800 font-medium">{content.practice}</span>
  </div>
  <div className="flex items-center justify-between flex-wrap gap-4">
    <p className="text-sm text-gray-600 flex items-center gap-2">
      <Hourglass size={14} className="text-amber-500" />
      Interactive practice coming soon
    </p>
    <button 
      disabled
      className="px-4 py-2 bg-gray-300 text-gray-500 text-sm font-medium rounded-lg cursor-not-allowed flex items-center gap-1"
    >
      Coming Soon
      <ChevronRight size={14} />
    </button>
  </div>
</div>
        </section>
        
        {/* Navigation */}
        <div className="flex items-center justify-between gap-4 pt-6 border-t border-gray-100">
          {content.prevTopic ? (
            <Link
              href={`/learn/${category}/${content.prevTopic}`}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition text-sm font-medium"
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