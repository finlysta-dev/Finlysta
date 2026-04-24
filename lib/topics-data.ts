export interface TopicContent {
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  order: number;
  learningObjectives: string[];
  prerequisites: string[];
  introduction: string;
  sections: {
    title: string;
    content: string;
    code?: string;
    image?: string;
    imageAlt?: string;
    tips?: string[];
    warning?: string;
  }[];
  examples: {
    title: string;
    scenario: string;
    beforeCode?: string;
    afterCode?: string;
    explanation: string;
    result?: string;
  }[];
  practiceExercises: {
    title: string;
    description: string;
    initialCode?: string;
    expectedOutput?: string;
    hint: string;
    solution: string;
  }[];
  quiz: {
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  }[];
  resources: {
    title: string;
    url: string;
    type: 'video' | 'article' | 'download' | 'exercise';
    description: string;
  }[];
  relatedTopics: string[];
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}

export const topicsData: Record<string, Record<string, TopicContent>> = {
  excel: {
    'pivot-tables': {
      title: 'Pivot Tables',
      slug: 'pivot-tables',
      description: 'Master Excel Pivot Tables to summarize and analyze large datasets',
      longDescription: 'PivotTables are one of Excel\'s most powerful features for data analysis. They allow you to quickly summarize thousands of rows of data into meaningful reports, spot trends, and make data-driven decisions without writing complex formulas.',
      duration: '18 min',
      level: 'Intermediate',
      category: 'excel',
      order: 1,
      learningObjectives: [
        'Create PivotTables from raw data in seconds',
        'Organize data by dragging fields to different areas',
        'Apply filters and slicers for interactive reporting',
        'Create calculated fields for custom metrics',
        'Format PivotTables professionally',
        'Refresh and update PivotTables when source data changes',
        'Create PivotCharts for visual analysis'
      ],
      prerequisites: [
        'Basic Excel navigation and cell selection',
        'Understanding of data organization in tables',
        'Familiarity with copy-paste and basic formatting'
      ],
      introduction: `Imagine you have a spreadsheet with 10,000 rows of sales data. You need to know:
- Total sales by product category
- Sales performance by region
- Monthly sales trends
- Best-selling products

Doing this manually would take hours. With PivotTables, it takes seconds!

A PivotTable is an interactive table that automatically extracts, organizes, and summarizes your data. You can rearrange it dynamically to view your data from different angles - hence the name "Pivot".`,

      sections: [
        {
          title: 'What is a PivotTable?',
          content: `A PivotTable is like a magic lens for your data. It takes raw, messy data and instantly transforms it into clean, organized summaries.

Think of it this way:
- **RAW DATA** = A giant pile of Lego bricks
- **PIVOT TABLE** = A Lego castle built from those bricks

You can reorganize the castle (pivot it) to see different views - a tower, a wall, or a gate - without rebuilding from scratch.

**Real-world example:** A retail manager has daily sales data. With one PivotTable, she can see:
- Today's total sales
- Sales by product category
- Sales by store location
- Best-selling products
- Sales trends over time

All by simply dragging and dropping fields!`,
          image: '/images/excel/pivot-table-overview.png',
          imageAlt: 'Excel PivotTable overview showing data transformation',
          tips: [
            'Start with clean data - no blank rows or columns',
            'Use Excel Tables (Ctrl+T) for data that grows over time',
            'Refresh your PivotTable after changing source data'
          ]
        },
        {
          title: 'Preparing Your Data for PivotTables',
          content: `Before creating a PivotTable, your data needs to be in the right format. This is the most important step!

**Rules for PivotTable-Ready Data:**

1. **Column Headers Required** - Every column must have a unique name
2. **No Blank Rows or Columns** - Delete any empty rows/columns
3. **One Row = One Record** - Each row should represent a single transaction or item
4. **Consistent Data Types** - Don't mix numbers and text in the same column
5. **No Subtotals** - Remove any existing subtotals or summaries

**Example of GOOD data structure:**

| Date | Product | Category | Region | Sales | Quantity |
|------|---------|----------|--------|-------|----------|
| Jan 1 | Laptop | Electronics | North | 1000 | 2 |
| Jan 1 | Mouse | Electronics | North | 25 | 5 |
| Jan 2 | Laptop | Electronics | South | 1000 | 1 |

**Example of BAD data structure (what NOT to do):**

| Date | Product | Sales | | | |
|------|---------|-------|-|-|-|
| Jan 1 | Laptop | 1000 | (blank column!) | | |
| | (blank row!) | | | | |

Pro Tip: Convert your data range to an Excel Table (Ctrl+T). Tables automatically expand when you add new data, and your PivotTable will update automatically!`,
          code: `// Convert to Excel Table:
1. Select your data range (including headers)
2. Press Ctrl+T
3. Check "My table has headers"
4. Click OK`,
          tips: [
            'Use Ctrl+Shift+Down Arrow to quickly select all data',
            'Check for merged cells - unmerge them!',
            'Use Text to Columns if data is poorly formatted'
          ]
        },
        {
          title: 'Creating Your First PivotTable',
          content: `Now for the exciting part - creating your first PivotTable!

**Step-by-Step Instructions:**

**Step 1:** Select any cell inside your data range
**Step 2:** Go to the Insert tab on the ribbon
**Step 3:** Click PivotTable
**Step 4:** Verify the table/range is correct
**Step 5:** Choose where to place the PivotTable:
   - New Worksheet (recommended for beginners)
   - Existing Worksheet (if you want it next to your data)
**Step 6:** Click OK

🎉 Congratulations! You've created an empty PivotTable! Now let's add some data to it.`,

          image: '/images/excel/create-pivottable.gif',
          imageAlt: 'Step by step guide to creating a PivotTable in Excel',
          tips: [
            'Always use New Worksheet - it keeps things clean',
            'The PivotTable Fields pane appears on the right',
            'Don\'t worry if it looks empty - we\'ll add fields next!'
          ]
        },
        {
          title: 'Understanding the PivotTable Fields Pane',
          content: `The PivotTable Fields pane is your control center. It has four areas, each serving a different purpose:

**1. ROWS Area** 
- What goes here becomes row labels
- Example: Product names, Regions, Dates
- Creates a vertical list on the left side

**2. COLUMNS Area**
- What goes here becomes column headers
- Example: Months, Quarters, Years
- Creates horizontal categories across the top

**3. VALUES Area**
- What goes here gets calculated (summed, averaged, counted)
- Example: Sales amount, Quantity, Profit
- This is the data you want to analyze

**4. FILTERS Area**
- What goes here becomes a global filter
- Example: Year, Region, Product Category
- Filters the entire PivotTable

**Think of it this way:** 
- ROWS = "What do I want to see?"
- COLUMNS = "How do I want to group it?"
- VALUES = "What numbers do I want to calculate?"
- FILTERS = "What do I want to limit by?"`,

          image: '/images/excel/pivottable-fields.png',
          imageAlt: 'Excel PivotTable Fields pane showing the four areas',
          tips: [
            'Drag and drop fields between areas to reorganize instantly',
            'Right-click on any field for more options',
            'You can add the same field to multiple areas'
          ]
        },
        {
          title: 'Practical Example: Sales Analysis',
          content: `Let's work through a real example. Imagine you have this sales data:

**Sample Data:**
| Date | Product | Category | Region | Sales | Quantity |
|------|---------|----------|--------|-------|----------|
| Jan 1 | Laptop | Electronics | North | 1000 | 2 |
| Jan 1 | Mouse | Electronics | North | 50 | 5 |
| Jan 2 | Laptop | Electronics | South | 1000 | 1 |
| Jan 2 | Keyboard | Electronics | South | 80 | 2 |
| Jan 3 | Mouse | Electronics | North | 60 | 6 |
| Jan 3 | Laptop | Electronics | East | 1000 | 1 |

**Goal:** Find total sales by product for each region.

**Solution:**

1. Drag "Product" to ROWS area
2. Drag "Region" to COLUMNS area  
3. Drag "Sales" to VALUES area

**Result:**
| Product | North | South | East | Total |
|---------|-------|-------|------|-------|
| Laptop | 1000 | 1000 | 1000 | 3000 |
| Mouse | 110 | 0 | 0 | 110 |
| Keyboard | 0 | 80 | 0 | 80 |

**What we learned:** Laptops sell equally well everywhere, but Mice only sell in the North!`,

          image: '/images/excel/sales-pivottable.png',
          imageAlt: 'Sales analysis PivotTable example showing product sales by region',
          tips: [
            'Double-click any number to see the underlying data',
            'Use the Value Field Settings to change calculation type (Sum, Count, Average)',
            'Right-click and choose "Sort" to organize your data'
          ]
        },
        {
          title: 'Advanced PivotTable Techniques',
          content: `Once you've mastered the basics, try these powerful techniques:

**1. Grouping Dates**
Excel can automatically group dates by month, quarter, or year.
- Right-click on any date in your PivotTable
- Select "Group"
- Choose Month, Quarter, or Year

**2. Calculated Fields**
Add custom calculations without changing your source data.
- Go to PivotTable Analyze → Fields, Items & Sets → Calculated Field
- Formula example: = Sales * 0.1 (10% commission)

**3. Slicers (Interactive Filters)**
Add buttons to filter your PivotTable visually.
- Select your PivotTable
- Go to PivotTable Analyze → Insert Slicer
- Choose fields to filter by

**4. PivotCharts**
Create dynamic charts that update with your PivotTable.
- Select your PivotTable
- Go to PivotTable Analyze → PivotChart
- Choose chart type`,

          code: `// Date Grouping Example
Right-click on "Date" field → Group → Select "Months" and "Years"

// Calculated Field Example
Formula: = 'Sales Amount' * 0.1
Name: "Commission"

// Slicer Setup
1. Insert Slicer
2. Select "Region" and "Product Category"
3. Slicer buttons appear - click to filter!`,

          tips: [
            'Use multiple slicers for dashboard-style reports',
            'Connect one slicer to multiple PivotTables for coordinated filtering',
            'Right-click slicer → Size and Properties to customize appearance'
          ],
          warning: 'Calculated fields use PivotTable totals, not the source data. For row-by-row calculations, add a column to your source data instead.'
        },
        {
          title: 'Formatting Your PivotTable',
          content: `A well-formatted PivotTable is easier to read and more professional.

**Quick Formatting Tips:**

1. **Apply a PivotTable Style**
   - Select your PivotTable
   - Go to Design tab
   - Choose from dozens of pre-built styles

2. **Number Formatting**
   - Right-click on any number
   - Select Number Format
   - Choose Currency, Percentage, or Decimal

3. **Show Values As**
   - Right-click on any value
   - Select Show Values As
   - Options include: % of Grand Total, % of Row Total, Running Total

4. **Remove Subtotals**
   - Right-click on a row field
   - Uncheck "Subtotal" to clean up your report

**Pro Tip:** Use "Tabular Form" for a cleaner look:
- Design → Report Layout → Show in Tabular Form
- Design → Report Layout → Repeat All Item Labels`,

          image: '/images/excel/formatted-pivottable.png',
          imageAlt: 'Professionally formatted PivotTable with styles and number formatting',
          tips: [
            'Save your favorite style as the default',
            'Use banded rows for easier reading',
            'Hide grand totals if they\'re not needed'
          ]
        }
      ],
      examples: [
        {
          title: 'Sales Dashboard Example',
          scenario: 'You manage a retail chain with 50 stores. You need to quickly see which products are selling best in each region.',
          beforeCode: 'Raw data with 10,000+ rows of transactions',
          afterCode: `PivotTable setup:
- ROWS: Product Name
- COLUMNS: Region  
- VALUES: Sum of Sales
- FILTERS: Date (grouped by Month)`,
          explanation: 'By setting up the PivotTable this way, you can instantly see which products are popular in each region. The Date filter lets you analyze monthly trends.',
          result: 'Found that winter coats sell 3x better in Northern regions, allowing targeted inventory management.'
        },
        {
          title: 'Employee Performance Analysis',
          scenario: 'You need to evaluate sales rep performance across different product lines.',
          beforeCode: 'Sales data with rep names, products, and commission rates',
          afterCode: `PivotTable setup:
- ROWS: Sales Rep
- COLUMNS: Product Category
- VALUES: Sum of Commission (calculated field: Sales * 0.15)`,
          explanation: 'This shows total commission earned by each rep for each product category, helping identify specialists.',
          result: 'Discovered that 3 reps generate 80% of high-value product sales - promoted them to premium accounts.'
        }
      ],
      practiceExercises: [
        {
          title: 'Exercise 1: Create Your First PivotTable',
          description: 'Using the provided sales data, create a PivotTable showing total sales by product category.',
          initialCode: 'Sample data includes: Date, Product, Category, Sales, Region',
          expectedOutput: 'A PivotTable with Categories in rows, Sales summed in values',
          hint: 'Drag Category to ROWS, Sales to VALUES',
          solution: '1. Select data → Insert PivotTable → New Worksheet\n2. Drag Category to ROWS\n3. Drag Sales to VALUES'
        },
        {
          title: 'Exercise 2: Add Date Grouping',
          description: 'Add the Date field to your PivotTable and group it by month and quarter.',
          initialCode: 'Same sales data with dates',
          expectedOutput: 'PivotTable showing sales by month, with quarterly subtotals',
          hint: 'Right-click on a date → Group → Select Months and Quarters',
          solution: '1. Add Date to ROWS above Category\n2. Right-click any date → Group\n3. Select Months and Quarters\n4. Click OK'
        },
        {
          title: 'Exercise 3: Create a Calculated Field',
          description: 'Add a calculated field that shows 10% sales tax on all transactions.',
          initialCode: 'PivotTable with Sales field already added',
          expectedOutput: 'New column showing Tax = Sales × 0.10',
          hint: 'PivotTable Analyze → Fields, Items & Sets → Calculated Field',
          solution: '1. PivotTable Analyze tab\n2. Fields, Items & Sets → Calculated Field\n3. Name: "Sales Tax"\n4. Formula: = Sales * 0.10\n5. Add to VALUES'
        }
      ],
      quiz: [
        {
          question: 'Which area of a PivotTable determines what appears as row labels?',
          options: ['Values Area', 'Columns Area', 'Rows Area', 'Filters Area'],
          correctAnswer: 2,
          explanation: 'The ROWS area determines what appears as row labels on the left side of your PivotTable.'
        },
        {
          question: 'What happens when you double-click on a number in a PivotTable?',
          options: [
            'It deletes the number',
            'It creates a new sheet with the underlying data',
            'It formats the number as currency',
            'It sorts the PivotTable'
          ],
          correctAnswer: 1,
          explanation: 'Double-clicking any number in a PivotTable creates a new sheet showing all the source data rows that make up that number.'
        },
        {
          question: 'How do you update a PivotTable when new data is added to the source?',
          options: [
            'Delete and recreate the PivotTable',
            'Click Refresh on the PivotTable Analyze tab',
            'Save and reopen the workbook',
            'It updates automatically'
          ],
          correctAnswer: 1,
          explanation: 'Click the Refresh button on the PivotTable Analyze tab, or right-click the PivotTable and select Refresh.'
        },
        {
          question: 'What is a Slicer used for?',
          options: [
            'To cut data into pieces',
            'To create interactive visual filters',
            'To sort data alphabetically',
            'To remove duplicates'
          ],
          correctAnswer: 1,
          explanation: 'Slicers provide interactive buttons that let you filter PivotTable data visually, making reports more user-friendly.'
        }
      ],
      resources: [
        {
          title: 'Microsoft Official PivotTable Guide',
          url: 'https://support.microsoft.com/en-us/excel',
          type: 'article',
          description: 'Complete official documentation from Microsoft'
        },
        {
          title: 'Practice Dataset - Sales Data',
          url: '/downloads/sales-data.xlsx',
          type: 'download',
          description: 'Download this sample dataset to practice along'
        },
        {
          title: 'Video Tutorial: PivotTables for Beginners',
          url: 'https://youtube.com/watch?v=pivot-tutorial',
          type: 'video',
          description: 'Step-by-step video walkthrough (15 minutes)'
        },
        {
          title: 'Interactive Exercise',
          url: '/exercises/pivot-tables',
          type: 'exercise',
          description: 'Hands-on practice with real-world scenarios'
        }
      ],
      relatedTopics: ['charts-graphs', 'conditional-formatting', 'data-validation'],
      seo: {
        title: 'Excel Pivot Tables Tutorial | Complete Guide for Data Analysis',
        description: 'Master Excel Pivot Tables with our comprehensive guide. Learn to summarize, analyze, and visualize data like a pro. Includes examples, exercises, and pro tips.',
        keywords: ['Excel Pivot Tables', 'data analysis Excel', 'PivotTable tutorial', 'Excel reporting', 'data summarization']
      }
    },
    'vlookup': {
      title: 'VLOOKUP',
      slug: 'vlookup',
      description: 'Master VLOOKUP to find and match data across Excel spreadsheets',
      longDescription: 'VLOOKUP is one of Excel\'s most powerful lookup functions. It allows you to search for a value in one column and return a corresponding value from another column - like a phone book for your data.',
      duration: '15 min',
      level: 'Intermediate',
      category: 'excel',
      order: 2,
      learningObjectives: [
        'Understand VLOOKUP syntax and arguments',
        'Perform exact and approximate matches',
        'Handle errors gracefully with IFERROR',
        'Use VLOOKUP across different worksheets',
        'Combine VLOOKUP with other functions',
        'Troubleshoot common VLOOKUP errors'
      ],
      prerequisites: [
        'Basic Excel formula knowledge',
        'Understanding of cell references',
        'Familiarity with Excel tables'
      ],
      introduction: `Have you ever needed to find information from one table and bring it into another? That's exactly what VLOOKUP does.

**Real-world examples:**
- Find an employee's salary based on their ID
- Look up product prices from a price list
- Match customer names to their order history
- Combine data from two different reports

VLOOKUP stands for "Vertical Lookup" because it searches vertically down a column.`,

      sections: [
        {
          title: 'Understanding VLOOKUP Syntax',
          content: `The VLOOKUP function has four arguments:

=VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup])

Let's break down each part:

**1. lookup_value** (Required)
- The value you want to search for
- Can be a cell reference (A2), text ("John"), or number (1001)

**2. table_array** (Required)
- The range containing your data
- The lookup column MUST be the first column
- Example: $A$2:$D$100

**3. col_index_num** (Required)
- Which column to return from (1 = first column, 2 = second, etc.)
- Example: If you want data from column D, use 4

**4. range_lookup** (Optional, but recommended)
- FALSE = Exact match (use this most of the time)
- TRUE = Approximate match (for finding ranges like tax brackets)`,

          code: `// Basic VLOOKUP Example
=VLOOKUP(A2, $D$2:$E$100, 2, FALSE)

// What it does:
// 1. Takes value from cell A2
// 2. Searches for it in column D (first column of range)
// 3. Returns matching value from column E (second column)
// 4. FALSE means find exact match only`,

          image: '/images/excel/vlookup-syntax.png',
          imageAlt: 'VLOOKUP syntax diagram showing each argument',
          tips: [
            'Always use FALSE for exact matches unless you understand approximate matches',
            'Use absolute references ($A$2:$B$100) so the range doesn\'t shift when copying',
            'The lookup column must be the leftmost column in your range'
          ]
        },
        {
          title: 'Real-World Example: Employee Database',
          content: `Let's work through a practical example. Imagine you have two tables:

**Table 1: Employee IDs (what you have)**
| Employee ID |
|-------------|
| 1001 |
| 1002 |
| 1003 |

**Table 2: Employee Database (what you want to find)**
| Employee ID | Name | Department | Salary |
|-------------|------|------------|--------|
| 1001 | John Smith | Sales | 50000 |
| 1002 | Jane Doe | Marketing | 55000 |
| 1003 | Bob Johnson | IT | 60000 |

**Goal:** Find each employee's name based on their ID.

**Solution:**
=VLOOKUP(A2, $E$2:$H$4, 2, FALSE)

Where:
- A2 contains the Employee ID to look up
- $E$2:$H$4 is your Employee Database (E=ID, F=Name, G=Dept, H=Salary)
- 2 tells Excel to return the 2nd column (Name)
- FALSE means find exact match`,

          image: '/images/excel/vlookup-employee-example.png',
          imageAlt: 'VLOOKUP example showing employee database lookup',
          tips: [
            'Lock the table array with $ signs so it doesn\'t change when copying down',
            'Test with a value you know exists first',
            'Use named ranges to make formulas easier to read'
          ]
        },
        {
          title: 'Common VLOOKUP Errors and Solutions',
          content: `VLOOKUP errors are common, but easy to fix once you know what causes them.

**#N/A Error (Most Common)**
- **Cause:** Value not found in lookup column
- **Fix:** Check for extra spaces, different data types, or missing values

**#REF! Error**
- **Cause:** col_index_num is greater than number of columns
- **Fix:** Count your columns correctly

**#VALUE! Error**
- **Cause:** lookup_value is the wrong data type
- **Fix:** Ensure numbers are stored as numbers, text as text

**Wrong Results**
- **Cause:** Using TRUE (approximate) when you need FALSE (exact)
- **Fix:** Always use FALSE unless you specifically need approximate

**Quick Fix for #N/A Errors:**
=IFERROR(VLOOKUP(A2, $D$2:$E$100, 2, FALSE), "Not Found")`,

          code: `// Error Handling with IFERROR
=IFERROR(VLOOKUP(A2, $D$2:$E$100, 2, FALSE), "Not Found")

// Cleaning data with TRIM (removes extra spaces)
=VLOOKUP(TRIM(A2), $D$2:$E$100, 2, FALSE)

// Converting text to numbers
=VLOOKUP(VALUE(A2), $D$2:$E$100, 2, FALSE)`,

          image: '/images/excel/vlookup-errors.png',
          imageAlt: 'Common VLOOKUP errors and how to fix them',
          tips: [
            'Use TRIM() to remove extra spaces',
            'Use CLEAN() to remove non-printable characters',
            'Use IFERROR to show friendly messages instead of #N/A'
          ],
          warning: '#N/A doesn\'t mean your formula is wrong - it means the value wasn\'t found. Check your data!'
        },
        {
          title: 'VLOOKUP Across Different Worksheets',
          content: `One of VLOOKUP's superpowers is working across different sheets in the same workbook.

**Syntax for another sheet:**
=VLOOKUP(A2, 'SheetName'!$A$2:$B$100, 2, FALSE)

**Example:**
You have:
- Sheet1: Employee IDs (column A)
- Sheet2: Employee Database

Formula in Sheet1:
=VLOOKUP(A2, 'Employee Database'!$A$2:$B$100, 2, FALSE)

**Pro Tip:** While typing the formula, you can click on the other sheet to select the range - Excel will add the sheet name automatically!`,

          code: `// Looking up from "Prices" sheet
=VLOOKUP(A2, Prices!$A$2:$B$100, 2, FALSE)

// Looking up from "2024 Data" sheet (sheet name with space)
=VLOOKUP(A2, '2024 Data'!$A$2:$B$100, 2, FALSE)`,
          tips: [
            'Use single quotes if sheet names have spaces',
            'You can reference sheets in different workbooks too (with both files open)',
            'Named ranges work across sheets too!'
          ]
        },
        {
          title: 'Advanced VLOOKUP Techniques',
          content: `Once you've mastered basic VLOOKUP, try these advanced techniques:

**1. Two-Way Lookup (VLOOKUP + MATCH)**
Find a value at the intersection of a row and column:
=VLOOKUP(A2, $A$2:$D$100, MATCH(B2, $A$1:$D$1, 0), FALSE)

**2. Left Lookup (using INDEX/MATCH instead)**
VLOOKUP can only look to the right. Use INDEX/MATCH for left lookups:
=INDEX($A$2:$A$100, MATCH(B2, $B$2:$B$100, 0))

**3. Multiple Criteria (using helper column)**
Create a helper column that combines criteria:
Column E: =A2&B2
Then: =VLOOKUP(C2&D2, $E$2:$F$100, 2, FALSE)

**4. VLOOKUP with Wildcards**
Find partial matches:
=VLOOKUP("*"&A2&"*", $D$2:$E$100, 2, FALSE)`,

          code: `// Two-Way Lookup
=VLOOKUP(A2, $A$2:$D$100, MATCH(B2, $A$1:$D$1, 0), FALSE)

// Left Lookup (INDEX/MATCH)
=INDEX($A$2:$A$100, MATCH(B2, $B$2:$B$100, 0))

// Wildcard for partial match
=VLOOKUP("*"&A2&"*", $D$2:$E$100, 2, FALSE)`,
          tips: [
            'INDEX/MATCH is more flexible than VLOOKUP - learn it next!',
            'Wildcards are great for searching partial text',
            'Helper columns keep complex formulas readable'
          ]
        }
      ],
      examples: [
        {
          title: 'Product Price Lookup',
          scenario: 'You have a list of product IDs and need to find their prices from a price list.',
          beforeCode: '=VLOOKUP(A2, Prices!$A$2:$B$100, 2, FALSE)',
          afterCode: '=IFERROR(VLOOKUP(A2, Prices!$A$2:$B$100, 2, FALSE), "Product Not Found")',
          explanation: 'The IFERROR wrapper handles missing products gracefully instead of showing #N/A.',
          result: 'Clean, professional-looking results even when products are missing.'
        },
        {
          title: 'Commission Calculator',
          scenario: 'Calculate employee commission based on sales tier.',
          beforeCode: '=VLOOKUP(B2, $E$2:$F$6, 2, TRUE)',
          afterCode: '=VLOOKUP(B2, $E$2:$F$6, 2, TRUE) * B2',
          explanation: 'Using TRUE for approximate match finds the correct commission rate bracket based on sales amount.',
          result: 'Automatically calculates commissions using the correct tiered rates.'
        }
      ],
      practiceExercises: [
        {
          title: 'Exercise 1: Basic VLOOKUP',
          description: 'Use VLOOKUP to find employee names from their IDs.',
          initialCode: '=VLOOKUP(A2, _______, _______, _______)',
          expectedOutput: 'Employee names appear in column B',
          hint: 'Your lookup table is in columns D (ID) and E (Name) with 100 rows',
          solution: '=VLOOKUP(A2, $D$2:$E$100, 2, FALSE)'
        },
        {
          title: 'Exercise 2: Add Error Handling',
          description: 'Add IFERROR to your VLOOKUP to show "Not Found" for missing IDs.',
          initialCode: '=VLOOKUP(A2, $D$2:$E$100, 2, FALSE)',
          expectedOutput: '"Not Found" instead of #N/A for missing IDs',
          hint: 'Wrap your VLOOKUP in IFERROR',
          solution: '=IFERROR(VLOOKUP(A2, $D$2:$E$100, 2, FALSE), "Not Found")'
        }
      ],
      quiz: [
        {
          question: 'What does the "V" in VLOOKUP stand for?',
          options: ['Variable', 'Vertical', 'Value', 'Verify'],
          correctAnswer: 1,
          explanation: 'VLOOKUP stands for "Vertical Lookup" because it searches vertically down a column.'
        },
        {
          question: 'What does the 4th argument (range_lookup) do when set to FALSE?',
          options: ['Finds approximate match', 'Finds exact match', 'Returns multiple values', 'Ignores errors'],
          correctAnswer: 1,
          explanation: 'FALSE tells VLOOKUP to find an exact match. TRUE would find an approximate match.'
        },
        {
          question: 'Which column must the lookup value be in for VLOOKUP to work?',
          options: ['Any column', 'The last column', 'The first column of the table array', 'The middle column'],
          correctAnswer: 2,
          explanation: 'The lookup value must be in the first column of your table array. VLOOKUP cannot look to the left.'
        }
      ],
      resources: [
        {
          title: 'Microsoft VLOOKUP Documentation',
          url: 'https://support.microsoft.com/en-us/vlookup',
          type: 'article',
          description: 'Official Microsoft documentation with examples'
        },
        {
          title: 'Practice Workbook',
          url: '/downloads/vlookup-practice.xlsx',
          type: 'download',
          description: 'Download this workbook with practice exercises'
        },
        {
          title: 'Video: VLOOKUP Tutorial',
          url: 'https://youtube.com/watch?v=vlookup-tutorial',
          type: 'video',
          description: '15-minute video covering everything you need to know'
        }
      ],
      relatedTopics: ['pivot-tables', 'conditional-formatting', 'charts-graphs'],
      seo: {
        title: 'Excel VLOOKUP Tutorial | Complete Guide with Examples',
        description: 'Master Excel VLOOKUP with our comprehensive guide. Learn to find and match data across spreadsheets. Includes real-world examples, error handling, and pro tips.',
        keywords: ['VLOOKUP Excel', 'Excel lookup functions', 'match data Excel', 'VLOOKUP tutorial', 'Excel formulas']
      }
    }
  },
  sql: {
    'sql-joins': {
      title: 'SQL Joins',
      slug: 'sql-joins',
      description: 'Master SQL JOINs to combine data from multiple database tables',
      longDescription: 'SQL JOINs are fundamental to working with relational databases. They allow you to combine rows from two or more tables based on related columns, enabling you to answer complex business questions.',
      duration: '16 min',
      level: 'Intermediate',
      category: 'sql',
      order: 1,
      learningObjectives: [
        'Understand the purpose of SQL JOINs',
        'Use INNER JOIN to match records between tables',
        'Use LEFT JOIN to keep all records from the left table',
        'Apply RIGHT JOIN and FULL JOIN appropriately',
        'Join multiple tables in a single query',
        'Handle NULL values in joined results'
      ],
      prerequisites: [
        'Basic SQL SELECT statements',
        'Understanding of database tables and relationships',
        'Familiarity with WHERE clauses'
      ],
      introduction: `Imagine you have two tables:
- "Customers" table with customer names and IDs
- "Orders" table with order details and customer IDs

How do you find which customer placed which order? You need to JOIN the tables!

SQL JOINs are like connecting puzzle pieces - they match rows from different tables based on a common column (usually an ID).`,

      sections: [
        {
          title: 'Understanding INNER JOIN',
          content: `INNER JOIN returns only the rows that have matching values in both tables.

**Think of it like a Venn diagram** - only the overlapping section is returned.

**When to use:** When you only want records that exist in both tables.

**Example:** Find customers who have placed at least one order.`,

          code: `-- INNER JOIN Syntax
SELECT Customers.CustomerName, Orders.OrderDate
FROM Customers
INNER JOIN Orders ON Customers.CustomerID = Orders.CustomerID;

-- Result: Only customers with orders appear`,
          image: '/images/sql/inner-join.png',
          imageAlt: 'INNER JOIN Venn diagram showing only matching records',
          tips: [
            'Use table aliases to make queries shorter (Customers AS c)',
            'Always specify which table each column comes from when names conflict',
            'INNER JOIN is the most common type of JOIN'
          ]
        },
        {
          title: 'LEFT JOIN Explained',
          content: `LEFT JOIN returns ALL records from the left table, and matching records from the right table. If no match exists, NULL values are shown for the right table.

**Think of it like:** "Give me all customers, and their orders if they have any."

**When to use:** When you want all records from the main table, regardless of matches.

**Example:** List all customers, showing order dates for those who ordered.`,

          code: `-- LEFT JOIN Syntax
SELECT Customers.CustomerName, Orders.OrderDate
FROM Customers
LEFT JOIN Orders ON Customers.CustomerID = Orders.CustomerID;

-- Result: ALL customers appear, with NULL for those without orders`,
          image: '/images/sql/left-join.png',
          imageAlt: 'LEFT JOIN Venn diagram showing all left table records',
          tips: [
            'LEFT JOIN is more common than RIGHT JOIN',
            'Use IS NULL to find records with no matches',
            'The order of tables matters in LEFT JOIN'
          ]
        }
      ],
      examples: [
        {
          title: 'Customer Order Analysis',
          scenario: 'Find all customers and their total order amounts.',
          beforeCode: 'Customers table (ID, Name), Orders table (CustomerID, Amount)',
          afterCode: `SELECT c.Name, SUM(o.Amount) as TotalSpent
FROM Customers c
LEFT JOIN Orders o ON c.ID = o.CustomerID
GROUP BY c.Name`,
          explanation: 'LEFT JOIN ensures all customers appear, even with $0 spent. GROUP BY summarizes each customer\'s total.',
          result: 'Complete list of customers with their total spending, including those who never ordered.'
        }
      ],
      practiceExercises: [
        {
          title: 'Exercise: INNER JOIN',
          description: 'Write a query to show employees and their department names.',
          initialCode: 'Employees (ID, Name, DeptID), Departments (ID, DeptName)',
          expectedOutput: 'Employee names with their department names',
          hint: 'JOIN on DeptID = ID',
          solution: 'SELECT e.Name, d.DeptName FROM Employees e INNER JOIN Departments d ON e.DeptID = d.ID'
        }
      ],
      quiz: [
        {
          question: 'Which JOIN returns all records from the left table?',
          options: ['INNER JOIN', 'RIGHT JOIN', 'LEFT JOIN', 'FULL JOIN'],
          correctAnswer: 2,
          explanation: 'LEFT JOIN returns all records from the left table, with matches from the right table where available.'
        }
      ],
      resources: [
        {
          title: 'SQL JOIN Interactive Tutorial',
          url: 'https://sql-joins.leopard.in.ua/',
          type: 'article',
          description: 'Visual, interactive guide to SQL JOINs'
        }
      ],
      relatedTopics: [],
      seo: {
        title: 'SQL JOINs Tutorial | Complete Guide with Examples',
        description: 'Learn SQL JOINs with our comprehensive guide. INNER JOIN, LEFT JOIN, RIGHT JOIN, and FULL JOIN explained with real-world examples.',
        keywords: ['SQL JOIN', 'database joins', 'INNER JOIN', 'LEFT JOIN', 'combine tables SQL']
      }
    }
  }
};

export function getTopic(category: string, topicSlug: string): TopicContent | null {
  return topicsData[category]?.[topicSlug] || null;
}

export function getAllTopics() {
  const allTopics: { category: string; topic: TopicContent }[] = [];
  for (const [category, topics] of Object.entries(topicsData)) {
    for (const topic of Object.values(topics)) {
      allTopics.push({ category, topic });
    }
  }
  return allTopics;
}
