import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Clock, ChevronRight, ChevronLeft, CheckCircle, Target, Lightbulb, BookOpen, Zap, ArrowRight } from 'lucide-react';

const topicContent: Record<string, Record<string, any>> = {
  excel: {
    'pivot-tables': {
      title: 'Pivot Tables',
      level: 'Intermediate',
      duration: '15 min',
      definition: 'A Pivot Table is a powerful data summarization tool that transforms large datasets into meaningful reports automatically. It groups, counts, totals, and averages data without formulas. Think of it as a magic tool that reorganizes raw data into insights - you can see sales by region, product trends, and comparisons instantly.',
      detailedDefinition: [
        'Automatically organizes and summarizes raw data',
        'Groups similar data together (by region, product, month, etc.)',
        'Calculates totals, counts, averages, and other statistics',
        'Creates interactive reports that can be filtered and sliced',
        'Updates instantly when source data changes'
      ],
      whyItMatters: [
        { use: 'Sales Analysis', description: 'See which regions generate the most revenue, which products sell best, and identify your top performers instantly' },
        { use: 'Track Trends', description: 'Monitor monthly or quarterly sales patterns to forecast future performance and plan inventory' },
        { use: 'Create Reports', description: 'Generate professional summaries for management presentations without spending hours in formulas' },
        { use: 'Identify Opportunities', description: 'Quickly spot top and low-performing products, regions, or customers to focus your efforts' }
      ],
      keyConcepts: [
        { term: 'Rows', description: 'The categories that appear vertically (down the left)', example: 'If you put "Product" in Rows, you\'ll see each product listed as a separate row', realUse: 'Use this to list items you want to compare - products, employees, regions, etc.' },
        { term: 'Columns', description: 'The categories that appear horizontally (across the top)', example: 'If you put "Month" in Columns, you\'ll see Jan, Feb, Mar... across the top', realUse: 'Use this to organize data by time periods or other groupings' },
        { term: 'Values', description: 'The numbers that get calculated in the table (the actual data)', example: 'You can sum sales, count transactions, average prices, etc.', realUse: 'This is where your key metrics go - whatever numbers you want to analyze' },
        { term: 'Filters', description: 'Tools to show only specific data you care about', example: 'Filter to show only "Electronics" category or just Q1 data', realUse: 'Narrow down the pivot table to focus on specific regions, products, or time periods' }
      ],
      steps: [
        { step: 'Select your raw data', detail: 'Click any cell in your data range (Excel will auto-detect the data range)' },
        { step: 'Go to Insert tab', detail: 'In the ribbon at the top, click the Insert tab' },
        { step: 'Click Pivot Table', detail: 'You\'ll see "Pivot Table" button in the Insert tab' },
        { step: 'Choose location', detail: 'Select "New Worksheet" to create it on a new sheet' },
        { step: 'Drag fields', detail: 'Drag field names into Rows, Columns, Values, and Filters areas' },
        { step: 'Review results', detail: 'Your pivot table is created - you can now analyze and filter it' }
      ],
      example: {
        goal: 'Analyze Total Sales by Product and Region',
        scenario: 'You have sales data with columns: Date, Product, Region, Sales Amount',
        setup: [
          'Rows → Drag "Product" here (shows products down the left)',
          'Columns → Drag "Region" here (shows regions across the top)',
          'Values → Drag "Sales Amount" here (automatically sums the sales)',
          'Result: See total sales for each product in each region in one table'
        ],
        result: 'A table showing Product names on left, Regions across top, and Total Sales in each cell'
      },
      proTips: [
        { tip: 'Start with clean data', detail: 'Remove blank rows, ensure headers exist, fix spelling inconsistencies' },
        { tip: 'Convert to Table first', detail: 'Select data and press Ctrl+T - this makes pivot tables work better' },
        { tip: 'Refresh after changes', detail: 'If source data changes, right-click pivot table and click "Refresh" to update' },
        { tip: 'Use row/column labels wisely', detail: 'Put high-level categories in Rows, time periods or details in Columns for cleaner views' }
      ],
      practice: 'Create a Pivot Table from sample sales data showing total sales by product category and month',
      nextTopic: 'vlookup',
      prevTopic: null
    },
    'vlookup': {
      title: 'VLOOKUP',
      level: 'Intermediate',
      duration: '12 min',
      definition: 'VLOOKUP (Vertical Lookup) is a formula that searches for a value in the first column of a table and returns a corresponding value from another column. Instead of manually searching spreadsheets, VLOOKUP does this automatically. For example, find an employee name using their ID instantly.',
      detailedDefinition: [
        'Searches for a specific value in the first column of a table',
        'Returns a related value from a column to the right',
        'Works with numbers, text, and dates',
        'Saves time on manual data lookup and matching',
        'Essential for combining data from multiple sheets'
      ],
      whyItMatters: [
        { use: 'Employee Lookups', description: 'Find employee names, salaries, or departments using their ID number instantly' },
        { use: 'Price Matching', description: 'Automatically fill product prices from a price list based on product codes' },
        { use: 'Data Consolidation', description: 'Combine information from two separate reports by matching key identifiers' },
        { use: 'Customer Details', description: 'Auto-fill customer addresses, phone numbers, or credit limits using customer ID' }
      ],
      keyConcepts: [
        { term: 'Lookup Value', description: 'The value you\'re searching for', example: 'Looking for Employee ID "E102" to find their name', realUse: 'This is usually in your main table and you want to find matching information' },
        { term: 'Table Array', description: 'The range where you\'re searching (must include the lookup column)', example: 'The lookup table might be A1:B100 containing IDs and Names', realUse: 'Include the column you\'re searching in AND the column with the answer you want' },
        { term: 'Column Index Number', description: 'Which column from the table array to return (1=first, 2=second, etc.)', example: 'If Table Array is A1:C100, Column Index 2 returns data from column B', realUse: 'Count from left to right in your table to find the right column number' },
        { term: 'Range Lookup', description: 'FALSE for exact match, TRUE for approximate match', example: 'Use FALSE to find exact product code matches, TRUE for price ranges', realUse: 'Almost always use FALSE unless you\'re working with sorted numeric ranges' }
      ],
      steps: [
        { step: 'Click the destination cell', detail: 'This is where you want the result to appear' },
        { step: 'Type the VLOOKUP formula', detail: '=VLOOKUP(lookup_value, table_array, col_index_num, FALSE)' },
        { step: 'Enter lookup value', detail: 'Reference the cell containing what you\'re searching for' },
        { step: 'Select table range', detail: 'Highlight the table with both lookup column and result column' },
        { step: 'Specify column number', detail: 'Count which column has your answer (2 for 2nd column, 3 for 3rd, etc.)' },
        { step: 'Add FALSE and press Enter', detail: 'This ensures exact matches - then press Enter to execute' }
      ],
      example: {
        goal: 'Find employee salary using their ID',
        scenario: 'You have ID in column A, Names in B, Salaries in C. You want to find salary for ID E105',
        setup: [
          '=VLOOKUP(A2, $B$2:$D$100, 3, FALSE)',
          'A2 = the ID you\'re looking up (E105)',
          '$B$2:$D$100 = the table with ID, Name, and Salary',
          '3 = column index (Salary is the 3rd column)',
          'FALSE = find exact match only'
        ],
        result: 'The formula returns the exact salary for employee ID E105'
      },
      proTips: [
        { tip: 'Lock table with $ signs', detail: 'Use $B$2:$D$100 so table doesn\'t change when you copy formula down' },
        { tip: 'Use IFERROR wrapper', detail: '=IFERROR(VLOOKUP(...), "Not Found") hides ugly #N/A errors' },
        { tip: 'Remember: VLOOKUP looks RIGHT', detail: 'Your lookup column must be the FIRST column in your table array' },
        { tip: 'Column index must be positive', detail: 'Can\'t use column to the left of lookup column - you need INDEX/MATCH for that' }
      ],
      practice: 'Use VLOOKUP to find product prices from a price list based on product codes',
      nextTopic: 'conditional-formatting',
      prevTopic: 'pivot-tables'
    }
  },
  sql: {
    'select-queries': {
      title: 'SELECT Queries',
      level: 'Beginner',
      duration: '10 min',
      definition: 'A SELECT query is the fundamental SQL command used to retrieve data from database tables. It\'s like asking the database a specific question and getting back exactly the information you want. You can select columns, filter rows, and sort results.',
      detailedDefinition: [
        'Retrieves data from one or more database tables',
        'Allows you to choose specific columns instead of all data',
        'Filters rows based on conditions (WHERE clause)',
        'Sorts results in ascending or descending order',
        'Limits number of results for performance and clarity'
      ],
      whyItMatters: [
        { use: 'Extract Specific Data', description: 'Get only the columns you need instead of downloading entire tables with unnecessary data' },
        { use: 'Filter Information', description: 'Find all customers from Delhi, orders over ₹5000, or sales from the last 30 days' },
        { use: 'Sort Results', description: 'See top customers by revenue, newest orders first, or alphabetical lists automatically' },
        { use: 'Understand Data', description: 'Query helps you explore and understand the data before analysis' }
      ],
      keyConcepts: [
        { term: 'SELECT', description: 'Specifies which columns to retrieve', example: 'SELECT Name, Email, Phone returns three columns', realUse: 'List specific columns you need - use * only for quick exploration' },
        { term: 'FROM', description: 'Specifies which table contains the data', example: 'FROM Customers looks in the Customers table', realUse: 'Every query needs to know where to get data from' },
        { term: 'WHERE', description: 'Filters rows based on conditions', example: 'WHERE City = "Mumbai" shows only Mumbai customers', realUse: 'Use conditions like =, >, <, !=, AND, OR to narrow results' },
        { term: 'ORDER BY', description: 'Sorts results in ascending or descending order', example: 'ORDER BY Salary DESC shows highest salaries first', realUse: 'Sort by date (newest first), amount (biggest first), or name (A to Z)' }
      ],
      steps: [
        { step: 'Start with SELECT', detail: 'Type SELECT and list the column names you want separated by commas' },
        { step: 'Add FROM clause', detail: 'Type FROM and the table name where data exists' },
        { step: 'Add WHERE (optional)', detail: 'Type WHERE and your condition to filter rows (e.g., City = "Mumbai")' },
        { step: 'Add ORDER BY (optional)', detail: 'Type ORDER BY column name to sort results (add DESC for descending)' },
        { step: 'End with semicolon', detail: 'Add ; at the end to tell database the query is complete' },
        { step: 'Execute the query', detail: 'Press Execute or Run button to see results' }
      ],
      example: {
        goal: 'Get all customers from Mumbai sorted by name',
        scenario: 'You have a Customers table with columns: CustomerID, Name, City, Email',
        setup: [
          'SELECT Name, Email, City',
          'FROM Customers',
          'WHERE City = "Mumbai"',
          'ORDER BY Name ASC;',
          '',
          'This returns: Names, Emails, and Cities of all Mumbai customers in alphabetical order'
        ],
        result: 'A list of Mumbai customers showing Name, Email, and City columns, sorted A-Z by name'
      },
      proTips: [
        { tip: 'Avoid SELECT *', detail: 'Specify exact columns needed - SELECT * downloads unnecessary data and is slow' },
        { tip: 'Use single quotes for text', detail: 'WHERE City = "Mumbai" or WHERE City = \'Mumbai\' both work, be consistent' },
        { tip: 'Test with LIMIT', detail: 'Add LIMIT 10 at end to test query before running on millions of rows' },
        { tip: 'Use aliases for clarity', detail: 'SELECT Name AS CustomerName makes output clearer' }
      ],
      practice: 'Write a query to get all orders over ₹10,000 from the last 30 days with customer names',
      nextTopic: null,
      prevTopic: null
    }
  },
  finance: {
    'profit-loss': {
      title: 'Profit & Loss Statement',
      level: 'Beginner',
      duration: '10 min',
      definition: 'A Profit & Loss (P&L) Statement is a financial report showing company performance over a period. It tracks all money coming in (revenues), going out (expenses), and calculates profit or loss. It\'s a financial scoreboard showing exactly how much the business earned or lost.',
      detailedDefinition: [
        'Shows all revenues (money from sales) earned during a period',
        'Lists all costs of goods sold directly tied to products',
        'Details operating expenses like salaries, rent, and utilities',
        'Calculates profit or loss at multiple levels (Gross, Operating, Net)',
        'Typically prepared monthly, quarterly, and annually'
      ],
      whyItMatters: [
        { use: 'Measure Profitability', description: 'Know if your business is actually making money or losing money - this is critical' },
        { use: 'Identify Cost Issues', description: 'See where money is being spent and which expense categories are highest' },
        { use: 'Compare Over Time', description: 'Track if business is improving month-to-month or quarter-to-quarter' },
        { use: 'Make Decisions', description: 'Use P&L data to decide where to cut costs or increase prices' }
      ],
      keyConcepts: [
        { term: 'Revenue', description: 'Total money from selling products or services', example: 'A retail store gets ₹500,000 from selling clothes', realUse: 'This is the top line - the starting point for all calculations' },
        { term: 'COGS (Cost of Goods Sold)', description: 'Direct costs to produce/purchase items sold', example: 'A store bought the clothes for ₹200,000 - this is the COGS', realUse: 'Only includes costs directly tied to what you sold' },
        { term: 'Gross Profit', description: 'Revenue minus COGS - profit before operating expenses', example: '₹500,000 (revenue) - ₹200,000 (COGS) = ₹300,000 gross profit', realUse: 'Shows profitability of your core business before other costs' },
        { term: 'Net Profit', description: 'Final profit after ALL expenses including operating costs and taxes', example: '₹300,000 gross profit - ₹150,000 expenses = ₹150,000 net profit', realUse: 'The bottom line - actual profit the business keeps' }
      ],
      steps: [
        { step: 'List all revenue', detail: 'Add up total sales, service income, and other revenue sources' },
        { step: 'Calculate COGS', detail: 'Add up direct costs to produce/purchase items sold' },
        { step: 'Get Gross Profit', detail: 'Subtract COGS from Revenue (Revenue - COGS)' },
        { step: 'List operating expenses', detail: 'Add salaries, rent, utilities, marketing, and other operating costs' },
        { step: 'Calculate operating profit', detail: 'Subtract operating expenses from Gross Profit' },
        { step: 'Calculate net profit', detail: 'Subtract taxes and other expenses from Operating Profit' }
      ],
      example: {
        goal: 'Calculate net profit for a retail store for January',
        scenario: 'Small clothing store - calculate P&L for January 2024',
        setup: [
          'Revenue: ₹500,000',
          'COGS: ₹200,000',
          'Gross Profit: ₹300,000',
          '',
          'Operating Expenses:',
          '  Salaries: ₹80,000',
          '  Rent: ₹40,000',
          '  Utilities: ₹10,000',
          '  Marketing: ₹20,000',
          'Total Expenses: ₹150,000',
          '',
          'Net Profit: ₹150,000'
        ],
        result: 'The store made ₹150,000 profit in January - that\'s the bottom line'
      },
      proTips: [
        { tip: 'Compare month-over-month', detail: 'Is profit growing or shrinking? Track trends over 3-6 months' },
        { tip: 'Calculate profit margin', detail: 'Divide Net Profit by Revenue (150,000/500,000 = 30% margin)' },
        { tip: 'Watch for unusual changes', detail: 'If expenses jump up suddenly, investigate why' },
        { tip: 'Focus on net profit', detail: 'Gross profit looks good but net profit is what the owner keeps' }
      ],
      practice: 'Calculate gross profit margin and net profit margin for a retail store',
      nextTopic: null,
      prevTopic: null
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