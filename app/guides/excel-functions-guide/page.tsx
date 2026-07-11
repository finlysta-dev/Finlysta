// app/guides/excel-functions-guide/page.tsx

import ExcelFunctionsGuideClient from "./ExcelFunctionsGuideClient";

export const metadata = {
  title: "Top 50 Advanced Excel Functions for Finance | Finlysta Guide",
  description: "Master the most-used Excel functions in finance jobs and interviews. Learn VLOOKUP, XLOOKUP, SUMIFS, NPV, PMT and more with real datasets and practice questions.",
  keywords: "Excel functions, finance Excel, VLOOKUP, XLOOKUP, SUMIFS, NPV, PMT, financial modeling, Excel guide, finance interview",
  openGraph: {
    title: "Top 50 Advanced Excel Functions for Finance",
    description: "Master the most-used Excel functions in finance jobs and interviews with real datasets and practice questions.",
    type: "website",
    url: "https://www.finlysta.com/guides/excel-functions-guide",
  },
  alternates: {
    canonical: "https://www.finlysta.com/guides/excel-functions-guide",
  }
};

export default function ExcelFunctionsGuidePage() {
  return <ExcelFunctionsGuideClient />;
}