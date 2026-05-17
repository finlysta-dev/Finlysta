import { notFound } from 'next/navigation';
import Link from 'next/link';
import { 
  Clock, ChevronRight, ChevronLeft, CheckCircle, Target, 
  Lightbulb, BookOpen, Zap, ArrowRight, Play, Star, 
  GraduationCap, Award, Sparkles, Users, BarChart3,
  FileSpreadsheet, Database, Landmark, PieChart, MessageCircle,
  TrendingUp, Code, Download, FileText, HelpCircle, AlertCircle,
  Briefcase, Brain, ChartLine, DollarSign, Percent, Calculator
} from 'lucide-react';

const topicContent: Record<string, Record<string, any>> = {
  'finance-fundamentals': {
    'profit-loss-statement': {
      title: 'Profit & Loss Statement',
      seoTitle: 'Profit & Loss Statement Explained for Beginners',
      seoDescription: 'Learn how companies track revenue, expenses, and profitability using real-world financial statement examples.',
      level: 'Beginner',
      duration: '12 min',
      category: 'Finance Fundamentals',
      definition: 'A Profit & Loss (P&L) Statement shows company performance over a period, tracking revenues, costs, and expenses.',
      whatYouWillLearn: [
        'Understand revenue and expenses',
        'Calculate gross profit and net profit',
        'Analyze profit margins',
        'Read real P&L statements',
        'Identify business profitability trends'
      ],
      whoShouldLearn: [
        'Finance students', 'BCom students', 'MBA aspirants',
        'Financial analysts', 'Accounting beginners', 'Startup founders'
      ],
      detailedDefinition: [
        'Shows revenues and expenses over time',
        'Calculates net profit or loss',
        'Available monthly, quarterly, or annually',
        'Essential for business decision making'
      ],
      whyItMatters: [
        { use: 'Measure Profitability', description: 'Know if your business is making money' },
        { use: 'Track Trends', description: 'Compare performance over different periods' },
        { use: 'Identify Cost Drivers', description: 'See where money is being spent' },
        { use: 'Make Decisions', description: 'Guide business strategy and investments' }
      ],
      keyConcepts: [
        { term: 'Revenue', description: 'Money from sales and services', example: 'Sales, fees, interest income' },
        { term: 'COGS', description: 'Direct costs of goods sold', example: 'Raw materials, manufacturing' },
        { term: 'Gross Profit', description: 'Revenue minus COGS', example: 'Shows core profitability' },
        { term: 'Operating Expenses', description: 'Indirect business costs', example: 'Rent, salaries, marketing' },
        { term: 'Net Profit', description: 'Final profit after all expenses', example: 'The "bottom line"' }
      ],
      formulas: [
        { name: 'Gross Profit Formula', formula: 'Gross Profit = Revenue - COGS', description: 'Measures core business profitability' },
        { name: 'Net Profit Formula', formula: 'Net Profit = Revenue - Total Expenses', description: 'Final earnings after all costs' },
        { name: 'Gross Profit Margin', formula: 'Gross Margin = (Gross Profit / Revenue) × 100', description: 'Percentage of revenue after COGS' },
        { name: 'Net Profit Margin', formula: 'Net Margin = (Net Profit / Revenue) × 100', description: 'Overall profitability percentage' }
      ],
      steps: [
        { step: 'List all revenue', detail: 'Include all income sources' },
        { step: 'Calculate COGS', detail: 'Sum all direct product costs' },
        { step: 'Calculate Gross Profit', detail: 'Revenue - COGS' },
        { step: 'List all expenses', detail: 'Include operating and non-operating' },
        { step: 'Calculate Net Profit', detail: 'Gross Profit - Total Expenses' }
      ],
      example: {
        goal: 'Calculate net profit for a retail store',
        setup: [
          'Revenue: ₹500,000',
          'COGS: ₹200,000',
          'Gross Profit: ₹300,000',
          'Expenses: ₹150,000',
          'Net Profit: ₹150,000'
        ],
        result: 'Net profit of ₹150,000 (30% profit margin)'
      },
      realWorldExample: {
        company: 'Apple Inc.',
        description: 'Apple reports billions in revenue but also large operating expenses.',
        insight: 'In 2023, Apple\'s gross margin was 43.3%, showing strong pricing power.'
      },
      commonMistakes: [
        { mistake: 'Confusing revenue with profit', correction: 'Revenue is total income, profit is what remains' },
        { mistake: 'Ignoring operating expenses', correction: 'All business costs matter for profitability' },
        { mistake: 'Misreading gross margin', correction: 'Compare to industry averages' },
        { mistake: 'Comparing different periods', correction: 'Compare same length periods' }
      ],
      interviewQuestions: [
        { question: 'Difference between gross profit and net profit?', answer: 'Gross profit is revenue minus COGS; net profit subtracts all expenses.' },
        { question: 'Why is P&L important for investors?', answer: 'Shows profitability trends and helps predict future performance.' },
        { question: 'What are operating expenses?', answer: 'Costs not tied to production like rent, salaries, marketing.' },
        { question: 'How to calculate profit margin?', answer: 'Net Profit / Revenue × 100' }
      ],
      careers: ['Financial Analyst', 'FP&A Analyst', 'Investment Banking', 'Equity Research', 'Business Analyst', 'Accountant'],
      faqs: [
        { q: 'What is a profit and loss statement?', a: 'Summarizes revenues, costs, and expenses over a period.' },
        { q: 'What is included in a P&L?', a: 'Revenue, COGS, gross profit, operating expenses, net profit.' },
        { q: 'Difference between P&L and balance sheet?', a: 'P&L shows performance over time; balance sheet shows position at a point.' },
        { q: 'How often are P&L prepared?', a: 'Monthly, quarterly, or annually.' },
        { q: 'Why is net profit important?', a: 'Shows earnings available to shareholders.' }
      ],
      proTips: [
        { tip: 'Compare period-over-period', detail: 'Track growth or decline month to month' },
        { tip: 'Calculate profit margins', detail: 'Reveal efficiency' },
        { tip: 'Watch for anomalies', detail: 'Investigate unusual fluctuations' }
      ],
      practice: 'Calculate gross profit margin from given financial data',
      nextTopic: 'balance-sheet',
      prevTopic: null,
      updatedDate: '2024-01-15'
    },
    'balance-sheet': {
      title: 'Balance Sheet',
      seoTitle: 'Balance Sheet Explained: Assets, Liabilities & Equity',
      seoDescription: 'Master the balance sheet equation and learn how to analyze company financial health.',
      level: 'Beginner',
      duration: '14 min',
      category: 'Finance Fundamentals',
      definition: 'A Balance Sheet shows a company\'s assets, liabilities, and equity at a specific point in time.',
      whatYouWillLearn: [
        'Understand the balance sheet equation',
        'Identify assets and liabilities',
        'Calculate owner\'s equity',
        'Analyze financial health',
        'Read corporate balance sheets'
      ],
      whoShouldLearn: [
        'Finance students', 'Investors', 'Small business owners',
        'Credit analysts', 'Accountants', 'MBA students'
      ],
      detailedDefinition: [
        'Assets = Liabilities + Equity',
        'Snapshot at a specific date',
        'Shows financial health',
        'Used by investors and creditors'
      ],
      whyItMatters: [
        { use: 'Financial Health', description: 'See if assets exceed liabilities' },
        { use: 'Investment Decisions', description: 'Assess company value' },
        { use: 'Lending Decisions', description: 'Banks check balance sheets' },
        { use: 'Track Growth', description: 'Compare balance sheets over time' }
      ],
      keyConcepts: [
        { term: 'Assets', description: 'What the company owns', example: 'Cash, inventory, buildings' },
        { term: 'Liabilities', description: 'What the company owes', example: 'Loans, accounts payable' },
        { term: 'Equity', description: 'Owner\'s stake', example: 'Shareholder capital' },
        { term: 'Accounting Equation', description: 'Assets = Liabilities + Equity', example: 'Always balances' }
      ],
      formulas: [
        { name: 'Accounting Equation', formula: 'Assets = Liabilities + Equity', description: 'Foundation of double-entry accounting' },
        { name: 'Working Capital', formula: 'Working Capital = Current Assets - Current Liabilities', description: 'Measures short-term liquidity' },
        { name: 'Debt-to-Equity Ratio', formula: 'D/E = Total Liabilities / Shareholder Equity', description: 'Measures financial leverage' },
        { name: 'Current Ratio', formula: 'Current Ratio = Current Assets / Current Liabilities', description: 'Measures ability to pay short-term debts' }
      ],
      steps: [
        { step: 'List all assets', detail: 'Include current and long-term assets' },
        { step: 'Calculate total assets', detail: 'Sum all asset accounts' },
        { step: 'List all liabilities', detail: 'Include current and long-term debt' },
        { step: 'Calculate total liabilities', detail: 'Sum all liability accounts' },
        { step: 'Calculate equity', detail: 'Assets - Liabilities' }
      ],
      example: {
        goal: 'Create a basic balance sheet',
        setup: ['Assets: ₹500,000', 'Liabilities: ₹200,000', 'Equity: ₹300,000'],
        result: 'Balance sheet balances correctly'
      },
      realWorldExample: {
        company: 'Reliance Industries',
        description: 'Reliance\'s balance sheet shows significant assets in refining and digital services.',
        insight: 'Investors analyze debt-to-equity ratio to assess financial risk.'
      },
      commonMistakes: [
        { mistake: 'Forgetting intangible assets', correction: 'Include patents and goodwill' },
        { mistake: 'Misclassifying liabilities', correction: 'Separate current from long-term' },
        { mistake: 'Not balancing the equation', correction: 'Verify Assets = Liabilities + Equity' }
      ],
      interviewQuestions: [
        { question: 'What is the accounting equation?', answer: 'Assets = Liabilities + Equity' },
        { question: 'What is working capital?', answer: 'Current assets minus current liabilities' },
        { question: 'What does high debt-to-equity indicate?', answer: 'Higher financial risk' }
      ],
      careers: ['Financial Analyst', 'Credit Analyst', 'Investment Banker', 'Accountant', 'Auditor'],
      faqs: [
        { q: 'What is a balance sheet?', a: 'Shows assets, liabilities, and equity at a specific date.' },
        { q: 'What are current assets?', a: 'Assets convertible to cash within one year.' },
        { q: 'What is retained earnings?', a: 'Cumulative profits reinvested in the business.' }
      ],
      proTips: [
        { tip: 'Check the date', detail: 'Balance sheet is a snapshot at a specific point' },
        { tip: 'Calculate ratios', detail: 'Current ratio, debt-to-equity reveal health' },
        { tip: 'Compare over time', detail: 'Track financial progress' }
      ],
      practice: 'Calculate debt-to-equity ratio from sample data',
      nextTopic: 'cash-flow-statement',
      prevTopic: 'profit-loss-statement',
      updatedDate: '2024-01-15'
    },
    'cash-flow-statement': {
      title: 'Cash Flow Statement',
      seoTitle: 'Cash Flow Statement Explained: Operating, Investing & Financing',
      seoDescription: 'Learn how to analyze cash flow statements and understand company liquidity.',
      level: 'Intermediate',
      duration: '16 min',
      category: 'Finance Fundamentals',
      definition: 'The Cash Flow Statement tracks how cash moves in and out of a business over time.',
      whatYouWillLearn: [
        'Understand three sections of cash flow',
        'Calculate operating cash flow',
        'Analyze investing activities',
        'Evaluate financing activities',
        'Assess company liquidity'
      ],
      whoShouldLearn: ['Finance students', 'Investors', 'Business owners', 'Financial analysts', 'Accountants'],
      detailedDefinition: [
        'Shows actual cash movement',
        'Three sections: Operating, Investing, Financing',
        'Reconciles net income to cash',
        'Assesses liquidity and solvency'
      ],
      whyItMatters: [
        { use: 'Liquidity Assessment', description: 'Can the company pay its bills?' },
        { use: 'Investment Quality', description: 'Strong cash flow indicates health' },
        { use: 'Growth Planning', description: 'Plan for expansion' },
        { use: 'Dividend Capacity', description: 'Ability to pay dividends' }
      ],
      keyConcepts: [
        { term: 'Operating CF', description: 'Cash from daily operations', example: 'Customer payments' },
        { term: 'Investing CF', description: 'Cash from buying/selling assets', example: 'Equipment purchases' },
        { term: 'Financing CF', description: 'Cash from investors/creditors', example: 'Loans, stock issuance' },
        { term: 'Free Cash Flow', description: 'Operating CF - CapEx', example: 'Cash for investors' }
      ],
      formulas: [
        { name: 'Operating Cash Flow', formula: 'OCF = Net Income + Non-cash Expenses ± Working Capital Changes', description: 'Cash from core operations' },
        { name: 'Free Cash Flow', formula: 'FCF = Operating CF - Capital Expenditures', description: 'Cash available for investors' }
      ],
      steps: [
        { step: 'Start with net income', detail: 'From the income statement' },
        { step: 'Add back non-cash expenses', detail: 'Depreciation, amortization' },
        { step: 'Adjust working capital', detail: 'AR, AP, inventory changes' },
        { step: 'Calculate operating CF', detail: 'Core business cash generation' }
      ],
      example: {
        goal: 'Calculate operating cash flow',
        setup: ['Net Income: ₹100,000', '+ Depreciation: ₹20,000', '- Increase AR: ₹10,000', '= Operating CF: ₹110,000'],
        result: 'Operating cash flow of ₹110,000'
      },
      realWorldExample: {
        company: 'Amazon',
        description: 'Amazon generates strong operating cash flow despite low net income due to efficient working capital management.',
        insight: 'Operating cash flow is often a better measure of business health than net income.'
      },
      commonMistakes: [
        { mistake: 'Confusing net income with cash flow', correction: 'Net income includes non-cash items' },
        { mistake: 'Ignoring working capital changes', correction: 'AR, AP affect cash flow' }
      ],
      interviewQuestions: [
        { question: 'What are the three sections of cash flow statement?', answer: 'Operating, Investing, Financing' },
        { question: 'What is free cash flow?', answer: 'Cash available after capital expenditures' }
      ],
      careers: ['Financial Analyst', 'FP&A', 'Treasury Analyst', 'Investment Banking'],
      faqs: [
        { q: 'Why is cash flow important?', a: 'Shows actual cash available for operations.' },
        { q: 'What is negative cash flow?', a: 'More cash going out than coming in.' }
      ],
      proTips: [
        { tip: 'Focus on Operating CF', detail: 'Most important for business health' },
        { tip: 'Compare to net income', detail: 'Should be similar or higher' }
      ],
      practice: 'Calculate free cash flow from given data',
      nextTopic: 'financial-ratios',
      prevTopic: 'balance-sheet',
      updatedDate: '2024-01-15'
    },
    'financial-ratios': {
      title: 'Financial Ratios',
      seoTitle: 'Financial Ratios Guide: Liquidity, Profitability & Leverage',
      seoDescription: 'Master key financial ratios used by analysts to evaluate company performance.',
      level: 'Intermediate',
      duration: '15 min',
      category: 'Finance Fundamentals',
      definition: 'Financial ratios analyze relationships between financial statement numbers to evaluate performance.',
      whatYouWillLearn: [
        'Calculate liquidity ratios',
        'Understand profitability ratios',
        'Analyze leverage ratios',
        'Compare efficiency ratios',
        'Evaluate company performance'
      ],
      whoShouldLearn: ['Finance students', 'Investors', 'Credit analysts', 'Bankers', 'Business owners'],
      detailedDefinition: [
        'Compare relationships between accounts',
        'Enable company comparisons',
        'Identify trends over time',
        'Support investment decisions'
      ],
      whyItMatters: [
        { use: 'Performance Measurement', description: 'Evaluate profitability and efficiency' },
        { use: 'Risk Assessment', description: 'Measure liquidity and solvency' },
        { use: 'Investment Analysis', description: 'Compare companies' }
      ],
      keyConcepts: [
        { term: 'Liquidity Ratios', description: 'Ability to pay short-term debts', example: 'Current Ratio = CA/CL' },
        { term: 'Profitability Ratios', description: 'Ability to generate profit', example: 'Gross Margin = GP/Revenue' },
        { term: 'Leverage Ratios', description: 'Use of debt financing', example: 'Debt-to-Equity Ratio' },
        { term: 'Efficiency Ratios', description: 'How well assets are used', example: 'Inventory Turnover' }
      ],
      formulas: [
        { name: 'Current Ratio', formula: 'Current Ratio = Current Assets / Current Liabilities', description: 'Measures short-term liquidity' },
        { name: 'Debt-to-Equity', formula: 'D/E = Total Liabilities / Shareholder Equity', description: 'Measures financial leverage' },
        { name: 'Gross Margin', formula: 'Gross Margin = Gross Profit / Revenue × 100', description: 'Profitability after COGS' },
        { name: 'ROE', formula: 'ROE = Net Profit / Shareholder Equity × 100', description: 'Return on equity' }
      ],
      steps: [
        { step: 'Gather financial statements', detail: 'Income statement and balance sheet' },
        { step: 'Identify needed accounts', detail: 'Find the numbers you need' },
        { step: 'Apply ratio formulas', detail: 'Calculate each ratio' },
        { step: 'Compare to benchmarks', detail: 'Industry averages or historical data' }
      ],
      example: {
        goal: 'Calculate key financial ratios',
        setup: ['Current Assets: ₹200,000', 'Current Liabilities: ₹100,000', 'Current Ratio = 2.0'],
        result: 'Healthy liquidity position'
      },
      realWorldExample: {
        company: 'HDFC Bank',
        description: 'Banks analyze debt-to-equity ratios before approving loans.',
        insight: 'A ratio below 1 indicates more equity than debt.'
      },
      commonMistakes: [
        { mistake: 'Using single ratio', correction: 'Use multiple ratios together' },
        { mistake: 'Not comparing to industry', correction: 'Industry benchmarks matter' }
      ],
      interviewQuestions: [
        { question: 'What does current ratio measure?', answer: 'Ability to pay short-term debts' },
        { question: 'What is a good debt-to-equity ratio?', answer: 'Generally below 1, varies by industry' }
      ],
      careers: ['Financial Analyst', 'Credit Analyst', 'Investment Banker', 'Equity Research'],
      faqs: [
        { q: 'What is a good current ratio?', a: 'Generally 1.5-3.0' },
        { q: 'What does ROE measure?', a: 'Return on shareholder investment' }
      ],
      proTips: [
        { tip: 'Use industry benchmarks', detail: 'Compare to industry averages' },
        { tip: 'Look at trends', detail: 'Single ratio is not enough' }
      ],
      practice: 'Calculate current ratio, gross margin from sample data',
      nextTopic: 'budgeting-basics',
      prevTopic: 'cash-flow-statement',
      updatedDate: '2024-01-15'
    },
    'budgeting-basics': {
      title: 'Budgeting Basics',
      seoTitle: 'Budgeting Basics: Create Effective Financial Plans',
      seoDescription: 'Learn how to create and manage budgets for personal and business finance.',
      level: 'Beginner',
      duration: '10 min',
      category: 'Finance Fundamentals',
      definition: 'Budgeting creates a financial plan for future periods, estimating expected revenues and expenses.',
      whatYouWillLearn: [
        'Create revenue and expense budgets',
        'Understand variance analysis',
        'Track budget vs actual',
        'Implement rolling forecasts'
      ],
      whoShouldLearn: ['Students', 'Small business owners', 'Finance professionals', 'Households'],
      detailedDefinition: [
        'Forecasts future financial performance',
        'Sets spending limits and targets',
        'Provides benchmarks for evaluation',
        'Helps allocate resources effectively'
      ],
      whyItMatters: [
        { use: 'Financial Control', description: 'Prevents overspending' },
        { use: 'Goal Setting', description: 'Establishes clear targets' },
        { use: 'Performance Evaluation', description: 'Measure actual vs budget' }
      ],
      keyConcepts: [
        { term: 'Revenue Budget', description: 'Income forecast', example: 'Sales projections' },
        { term: 'Expense Budget', description: 'Spending plan', example: 'Salaries, rent' },
        { term: 'Variance Analysis', description: 'Actual vs budget differences', example: 'Favorable variance' }
      ],
      formulas: [
        { name: 'Budget Variance', formula: 'Variance = Actual - Budget', description: 'Difference between actual and planned' },
        { name: 'Variance Percentage', formula: 'Variance % = (Actual - Budget) / Budget × 100', description: 'Percentage difference' }
      ],
      steps: [
        { step: 'Review historical data', detail: 'Look at past performance' },
        { step: 'Estimate revenue', detail: 'Create sales forecast' },
        { step: 'Estimate expenses', detail: 'Project all costs' },
        { step: 'Track monthly', detail: 'Monitor actual vs budget' }
      ],
      example: {
        goal: 'Create a monthly budget',
        setup: ['Revenue: ₹100,000', 'Expenses: ₹95,000', 'Profit: ₹5,000'],
        result: 'Budget showing ₹5,000 monthly profit'
      },
      proTips: [
        { tip: 'Be realistic', detail: 'Don\'t be overly optimistic' },
        { tip: 'Include contingency', detail: 'Buffer for unexpected' },
        { tip: 'Review regularly', detail: 'Update as conditions change' }
      ],
      nextTopic: 'forecasting-methods',
      prevTopic: 'financial-ratios',
      updatedDate: '2024-01-15'
    },
    'forecasting-methods': {
      title: 'Forecasting Methods',
      seoTitle: 'Forecasting Methods: Predict Financial Performance',
      seoDescription: 'Learn statistical methods to forecast future financial performance.',
      level: 'Advanced',
      duration: '18 min',
      category: 'Finance Fundamentals',
      definition: 'Forecasting uses historical data and statistical methods to predict future financial performance.',
      whatYouWillLearn: [
        'Use time series analysis',
        'Identify trends and seasonality',
        'Apply moving averages',
        'Create accurate forecasts'
      ],
      whoShouldLearn: ['Financial analysts', 'Business planners', 'Investors', 'MBA students'],
      detailedDefinition: [
        'Predicts future outcomes',
        'Uses statistical methods',
        'Identifies trends and seasonality',
        'Supports strategic planning'
      ],
      keyConcepts: [
        { term: 'Time Series', description: 'Data over time intervals', example: 'Monthly sales' },
        { term: 'Trend', description: 'Long-term direction', example: '5% annual growth' },
        { term: 'Seasonality', description: 'Regular repeating patterns', example: 'Higher December sales' },
        { term: 'Moving Average', description: 'Smooths fluctuations', example: '3-month average' }
      ],
      formulas: [
        { name: 'Moving Average', formula: 'MA = (Period1 + Period2 + Period3) / 3', description: 'Simple moving average' }
      ],
      steps: [
        { step: 'Gather historical data', detail: '3-5 years of data' },
        { step: 'Choose method', detail: 'Moving average, regression' },
        { step: 'Create model', detail: 'Build the forecast' },
        { step: 'Generate forecast', detail: 'Predict future periods' }
      ],
      example: {
        goal: 'Sales forecast using moving average',
        setup: ['Jan 100, Feb 110, Mar 105, Apr 115, May 120, Jun 125', 'July forecast: (115+120+125)/3 = 120'],
        result: 'July forecast: ₹120,000'
      },
      proTips: [
        { tip: 'Use multiple methods', detail: 'Combine forecasts' },
        { tip: 'Include confidence intervals', detail: 'Show range of outcomes' }
      ],
      nextTopic: 'working-capital',
      prevTopic: 'budgeting-basics',
      updatedDate: '2024-01-15'
    },
    'working-capital': {
      title: 'Working Capital',
      seoTitle: 'Working Capital Management: Optimize Business Liquidity',
      seoDescription: 'Learn how to manage working capital for better business liquidity and efficiency.',
      level: 'Intermediate',
      duration: '12 min',
      category: 'Finance Fundamentals',
      definition: 'Working Capital measures a company\'s operational liquidity by comparing current assets to current liabilities.',
      whatYouWillLearn: [
        'Calculate working capital',
        'Understand cash conversion cycle',
        'Optimize inventory levels',
        'Manage receivables and payables'
      ],
      whoShouldLearn: ['Finance managers', 'Business owners', 'Accountants', 'Treasury analysts'],
      detailedDefinition: [
        'Current Assets - Current Liabilities',
        'Measures short-term financial health',
        'Indicates ability to pay bills',
        'Essential for daily operations'
      ],
      keyConcepts: [
        { term: 'Current Assets', description: 'Assets convertible to cash within a year', example: 'Cash, inventory, AR' },
        { term: 'Current Liabilities', description: 'Debts due within a year', example: 'AP, short-term debt' },
        { term: 'Cash Conversion Cycle', description: 'Days to convert inventory to cash', example: '45 days' }
      ],
      formulas: [
        { name: 'Working Capital', formula: 'WC = Current Assets - Current Liabilities', description: 'Measures liquidity' },
        { name: 'Working Capital Ratio', formula: 'WCR = Current Assets / Current Liabilities', description: 'Liquidity ratio' }
      ],
      steps: [
        { step: 'Calculate current assets', detail: 'Sum all current assets' },
        { step: 'Calculate current liabilities', detail: 'Sum all current liabilities' },
        { step: 'Compute working capital', detail: 'CA - CL' }
      ],
      example: {
        goal: 'Calculate working capital',
        setup: ['Current Assets: ₹300,000', 'Current Liabilities: ₹150,000'],
        result: 'Working Capital = ₹150,000'
      },
      proTips: [
        { tip: 'Monitor regularly', detail: 'Track changes month-to-month' },
        { tip: 'Optimize inventory', detail: 'Reduce excess inventory' },
        { tip: 'Manage receivables', detail: 'Collect payments faster' }
      ],
      nextTopic: 'capital-budgeting',
      prevTopic: 'forecasting-methods',
      updatedDate: '2024-01-15'
    },
    'capital-budgeting': {
      title: 'Capital Budgeting',
      seoTitle: 'Capital Budgeting: Evaluate Investment Decisions',
      seoDescription: 'Learn how to evaluate long-term investment decisions using NPV, IRR, and payback period.',
      level: 'Advanced',
      duration: '16 min',
      category: 'Finance Fundamentals',
      definition: 'Capital Budgeting evaluates long-term investment decisions to determine which projects provide the best returns.',
      whatYouWillLearn: [
        'Calculate Net Present Value (NPV)',
        'Understand Internal Rate of Return (IRR)',
        'Apply payback period analysis',
        'Make investment decisions'
      ],
      whoShouldLearn: ['Finance professionals', 'Investment analysts', 'CFA candidates', 'MBA students'],
      detailedDefinition: [
        'Evaluates major investment decisions',
        'Uses techniques like NPV and IRR',
        'Considers time value of money',
        'Essential for strategic growth'
      ],
      keyConcepts: [
        { term: 'NPV', description: 'Net Present Value', example: 'Sum of discounted cash flows' },
        { term: 'IRR', description: 'Internal Rate of Return', example: 'Rate where NPV = 0' },
        { term: 'Payback Period', description: 'Time to recover investment', example: '3 years' }
      ],
      formulas: [
        { name: 'Net Present Value', formula: 'NPV = Σ CFt / (1+r)^t - Initial Investment', description: 'Value of future cash flows today' }
      ],
      steps: [
        { step: 'Estimate cash flows', detail: 'Project all inflows and outflows' },
        { step: 'Determine discount rate', detail: 'Company cost of capital' },
        { step: 'Calculate NPV', detail: 'Discount all cash flows' },
        { step: 'Make decision', detail: 'Accept if NPV > 0' }
      ],
      example: {
        goal: 'Evaluate project using NPV',
        setup: ['Initial Investment: ₹100,000', 'Annual Cash Flow: ₹30,000 for 5 years', 'Discount Rate: 10%', 'NPV = ₹13,723'],
        result: 'Accept project; NPV positive'
      },
      proTips: [
        { tip: 'Use multiple methods', detail: 'NPV and IRR together' },
        { tip: 'Consider risk', detail: 'Adjust discount rate for risk' }
      ],
      nextTopic: null,
      prevTopic: 'working-capital',
      updatedDate: '2024-01-15'
    }
  }
};

const getCategoryInfo = (categorySlug: string) => {
  const categories: Record<string, { name: string; icon: any; color: string; bg: string }> = {
    'finance-fundamentals': { name: 'Finance Fundamentals', icon: Landmark, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    'advanced-excel': { name: 'Advanced Excel', icon: FileSpreadsheet, color: 'text-blue-600', bg: 'bg-blue-50' },
    'financial-analysis': { name: 'Financial Analysis', icon: TrendingUp, color: 'text-amber-600', bg: 'bg-amber-50' },
    'financial-reporting': { name: 'Financial Reporting', icon: PieChart, color: 'text-cyan-600', bg: 'bg-cyan-50' },
    'powerbi': { name: 'Power BI', icon: BarChart3, color: 'text-orange-600', bg: 'bg-orange-50' },
    'business-communication': { name: 'Business Communication', icon: MessageCircle, color: 'text-purple-600', bg: 'bg-purple-50' }
  };
  return categories[categorySlug] || { name: 'Learn', icon: BookOpen, color: 'text-gray-600', bg: 'bg-gray-50' };
};

export default function TopicPage({ params }: { params: { category: string; topic: string } }) {
  const { category, topic } = params;
  const content = topicContent[category]?.[topic];
  const categoryInfo = getCategoryInfo(category);
  const CategoryIcon = categoryInfo.icon;
  
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

  const getLevelIcon = () => {
    switch(content.level) {
      case 'Beginner': return '🌱';
      case 'Intermediate': return '📈';
      case 'Advanced': return '🚀';
      default: return '📚';
    }
  };

  // Only show flow diagram for P&L statement
  const showFlowDiagram = category === 'finance-fundamentals' && topic === 'profit-loss-statement';

  return (
    <>
      <head>
        <title>{content.seoTitle || `${content.title} - Finlysta`}</title>
        <meta name="description" content={content.seoDescription || `Learn ${content.title} with Finlysta.`} />
        <meta property="og:title" content={content.seoTitle || content.title} />
        <meta property="og:description" content={content.seoDescription} />
      </head>

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        
        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-100 py-3">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-2 text-sm">
              <Link href="/" className="text-gray-500 hover:text-gray-700">Home</Link>
              <ChevronRight size={14} className="text-gray-400" />
              <Link href="/learn" className="text-gray-500 hover:text-gray-700">Learn</Link>
              <ChevronRight size={14} className="text-gray-400" />
              <Link href={`/learn/${category}`} className="text-gray-500 hover:text-gray-700">{categoryInfo.name}</Link>
              <ChevronRight size={14} className="text-gray-400" />
              <span className="text-gray-900 font-medium">{content.title}</span>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 lg:py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Main Content */}
            <div className="flex-1">
              
              {/* Hero Section */}
              <div className="mb-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-xl ${categoryInfo.bg} flex items-center justify-center`}>
                    <CategoryIcon size={24} className={categoryInfo.color} />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">{content.title}</h1>
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${getLevelBadge()}`}>
                        <span>{getLevelIcon()}</span>
                        <span>{content.level}</span>
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mt-2 max-w-2xl">
                      {content.seoDescription || `Learn ${content.title} with real-world examples.`}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1"><Clock size={14} />{content.duration}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                  <span className="flex items-center gap-1"><GraduationCap size={14} />Self-paced</span>
                </div>
              </div>

              {/* Flow Diagram - Only for P&L */}
              {showFlowDiagram && (
                <section className="mb-10 bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                  <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <ChartLine size={20} className="text-orange-500" />
                    P&L Flow Diagram
                  </h2>
                  <div className="bg-gray-50 rounded-xl p-6">
                    <div className="space-y-3 font-mono">
                      <div className="flex items-center justify-between py-2 px-4 bg-green-50 rounded-lg">
                        <span className="text-green-700 font-semibold">Revenue</span>
                        <span className="text-green-600">↓</span>
                      </div>
                      <div className="flex items-center justify-between py-2 px-4 bg-red-50 rounded-lg">
                        <span className="text-red-700 font-semibold">COGS</span>
                        <span className="text-red-600">↓</span>
                      </div>
                      <div className="flex items-center justify-between py-3 px-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                        <span className="text-blue-800 font-bold">Gross Profit</span>
                        <span className="text-blue-600">Revenue - COGS</span>
                      </div>
                      <div className="flex items-center justify-between py-2 px-4 bg-red-50 rounded-lg">
                        <span className="text-red-700 font-semibold">Operating Expenses</span>
                        <span className="text-red-600">↓</span>
                      </div>
                      <div className="flex items-center justify-between py-3 px-4 bg-emerald-50 rounded-lg border-l-4 border-emerald-500">
                        <span className="text-emerald-800 font-bold">Net Profit</span>
                        <span className="text-emerald-600">Gross Profit - Expenses</span>
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {/* What You'll Learn */}
              <section className="mb-10 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Brain size={20} className="text-blue-600" />
                  <h2 className="text-xl font-bold text-gray-900">What You'll Learn</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-3">
                  {content.whatYouWillLearn?.map((item: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-emerald-500" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Who Should Learn */}
              <section className="mb-10 bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Users size={20} className="text-purple-600" />
                  <h2 className="text-xl font-bold text-gray-900">Who Should Learn This</h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {content.whoShouldLearn?.map((item: string, idx: number) => (
                    <span key={idx} className="px-3 py-1.5 bg-purple-50 text-purple-700 rounded-full text-sm">{item}</span>
                  ))}
                </div>
              </section>

              {/* What is it */}
              <section className="mb-10">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                    <BookOpen size={16} className="text-blue-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">What is {content.title}?</h2>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-5">
                  <p className="text-gray-800 leading-relaxed text-lg">{content.definition}</p>
                </div>
                <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Sparkles size={16} className="text-blue-500" />
                    Key Components:
                  </h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    {content.detailedDefinition?.map((item: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle size={16} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-600 text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Formulas */}
              <section className="mb-10">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                    <Calculator size={16} className="text-purple-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Key Formulas</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {content.formulas?.map((formula: any, idx: number) => (
                    <div key={idx} className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition">
                      <h3 className="font-bold text-gray-900 mb-2">{formula.name}</h3>
                      <div className="bg-gray-50 rounded-lg p-3 mb-2 font-mono text-sm text-gray-800">
                        {formula.formula}
                      </div>
                      <p className="text-gray-500 text-xs">{formula.description}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Why it matters */}
              <section className="mb-10">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                    <Target size={16} className="text-emerald-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Why it matters</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {content.whyItMatters?.map((item: any, idx: number) => (
                    <div key={idx} className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition">
                      <h3 className="font-semibold text-gray-800 mb-1">{item.use}</h3>
                      <p className="text-gray-600 text-sm">{item.description}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Key Concepts */}
              <section className="mb-10">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                    <Zap size={16} className="text-purple-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Key Concepts</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {content.keyConcepts?.map((concept: any, idx: number) => (
                    <div key={idx} className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-sm transition">
                      <h3 className="font-bold text-gray-900 mb-1">{concept.term}</h3>
                      <p className="text-gray-600 text-sm mb-2">{concept.description}</p>
                      <p className="text-gray-400 text-xs border-t border-gray-100 pt-2 mt-2">📌 {concept.example}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Steps */}
              <section className="mb-10">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
                    <Target size={16} className="text-orange-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">How to Use</h2>
                </div>
                <div className="space-y-3">
                  {content.steps?.map((step: any, idx: number) => (
                    <div key={idx} className="flex items-start gap-4 bg-white rounded-xl border border-gray-100 p-4 hover:shadow-sm transition">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                        {idx + 1}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">{step.step}</h3>
                        <p className="text-gray-500 text-sm mt-1">{step.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Real World Example */}
              <section className="mb-10">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-cyan-100 flex items-center justify-center">
                    <Briefcase size={16} className="text-cyan-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Real Company Example</h2>
                </div>
                <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl p-6 border-l-4 border-cyan-500">
                  <h3 className="font-bold text-gray-900 mb-2">{content.realWorldExample?.company}</h3>
                  <p className="text-gray-700 text-sm mb-3">{content.realWorldExample?.description}</p>
                  <p className="text-cyan-700 text-sm font-medium">💡 Insight: {content.realWorldExample?.insight}</p>
                </div>
              </section>

              {/* Common Mistakes */}
              <section className="mb-10">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center">
                    <AlertCircle size={16} className="text-red-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Common Mistakes to Avoid</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {content.commonMistakes?.map((mistake: any, idx: number) => (
                    <div key={idx} className="bg-red-50 rounded-xl p-4 border-l-4 border-red-400">
                      <p className="text-red-800 text-sm font-medium mb-1">❌ {mistake.mistake}</p>
                      <p className="text-red-600 text-xs">✓ {mistake.correction}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Interview Questions */}
              <section className="mb-10">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                    <HelpCircle size={16} className="text-amber-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Interview Questions</h2>
                </div>
                <div className="space-y-3">
                  {content.interviewQuestions?.map((item: any, idx: number) => (
                    <div key={idx} className="bg-white rounded-xl border border-gray-100 p-4">
                      <p className="font-semibold text-gray-800 mb-2">📌 {item.question}</p>
                      <p className="text-gray-600 text-sm">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Careers */}
              <section className="mb-10">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center">
                    <Briefcase size={16} className="text-indigo-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Careers That Use This Skill</h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {content.careers?.map((career: string, idx: number) => (
                    <span key={idx} className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-full text-sm">{career}</span>
                  ))}
                </div>
              </section>

              {/* Pro Tips */}
              <section className="mb-10">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                    <Lightbulb size={16} className="text-amber-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Pro Tips</h2>
                </div>
                <div className="bg-amber-50 rounded-xl p-6">
                  <ul className="space-y-3">
                    {content.proTips?.map((tip: any, idx: number) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="text-amber-500 text-lg leading-5">•</span>
                        <div>
                          <span className="font-semibold text-gray-800">{tip.tip}:</span>
                          <span className="text-gray-600 ml-1">{tip.detail}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              {/* FAQs */}
              <section className="mb-10">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                    <HelpCircle size={16} className="text-blue-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Frequently Asked Questions</h2>
                </div>
                <div className="space-y-3">
                  {content.faqs?.map((faq: any, idx: number) => (
                    <div key={idx} className="bg-white rounded-xl border border-gray-100 p-4">
                      <p className="font-semibold text-gray-800 mb-2">🔹 {faq.q}</p>
                      <p className="text-gray-600 text-sm">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Related Lessons */}
              <section className="mb-10">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                    <BookOpen size={16} className="text-emerald-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Related Lessons</h2>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {content.prevTopic && (
                    <Link href={`/learn/${category}/${content.prevTopic}`} className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-100 hover:shadow-md transition group">
                      <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">←</div>
                      <div>
                        <p className="text-xs text-gray-500">Previous Lesson</p>
                        <p className="font-medium text-gray-800 group-hover:text-[#FFD700] transition">
                          {content.prevTopic.split('-').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                        </p>
                      </div>
                    </Link>
                  )}
                  {content.nextTopic && (
                    <Link href={`/learn/${category}/${content.nextTopic}`} className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-100 hover:shadow-md transition group">
                      <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">→</div>
                      <div>
                        <p className="text-xs text-gray-500">Next Lesson</p>
                        <p className="font-medium text-gray-800 group-hover:text-[#FFD700] transition">
                          {content.nextTopic.split('-').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                        </p>
                      </div>
                    </Link>
                  )}
                </div>
              </section>

              {/* Navigation */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-gray-200">
                {content.prevTopic ? (
                  <Link href={`/learn/${category}/${content.prevTopic}`} className="flex items-center gap-2 px-5 py-2.5 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition text-sm font-medium w-full sm:w-auto justify-center">
                    <ChevronLeft size={16} />
                    Previous Lesson
                  </Link>
                ) : (<div></div>)}
                
                {content.nextTopic ? (
                  <Link href={`/learn/${category}/${content.nextTopic}`} className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-gray-900 rounded-xl transition hover:shadow-md text-sm font-medium w-full sm:w-auto justify-center group">
                    Next Lesson: {content.nextTopic.split('-').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                    <ChevronRight size={16} className="group-hover:translate-x-0.5 transition" />
                  </Link>
                ) : (
                  <Link href="/learn" className="flex items-center gap-2 px-5 py-2.5 bg-gray-600 hover:bg-gray-700 text-white rounded-xl transition text-sm font-medium w-full sm:w-auto justify-center">
                    All Topics
                    <ArrowRight size={16} />
                  </Link>
                )}
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="lg:w-80 space-y-6">
              <div className="sticky top-24">
                {/* On This Page */}
                <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                  <h3 className="font-semibold text-gray-900 mb-3">On This Page</h3>
                  <ul className="space-y-2 text-sm">
                    <li><a href="#what-is" className="text-gray-600 hover:text-[#FFD700] transition">What is it?</a></li>
                    <li><a href="#why-matters" className="text-gray-600 hover:text-[#FFD700] transition">Why it matters</a></li>
                    <li><a href="#key-concepts" className="text-gray-600 hover:text-[#FFD700] transition">Key Concepts</a></li>
                    <li><a href="#formulas" className="text-gray-600 hover:text-[#FFD700] transition">Formulas</a></li>
                    <li><a href="#examples" className="text-gray-600 hover:text-[#FFD700] transition">Examples</a></li>
                    <li><a href="#interview-questions" className="text-gray-600 hover:text-[#FFD700] transition">Interview Questions</a></li>
                    <li><a href="#faq" className="text-gray-600 hover:text-[#FFD700] transition">FAQs</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}