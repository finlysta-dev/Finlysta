import { NextResponse } from "next/server";
import * as XLSX from "xlsx";

function normalizeNumber(value: unknown): number | null {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  if (typeof value === "number") {
    return Number.isFinite(value) ? value : null;
  }

  const cleaned = String(value)
    .replace(/₹/g, "")
    .replace(/,/g, "")
    .replace(/\$/g, "")
    .replace(/%/g, "")
    .trim();

  const number = Number(cleaned);

  return Number.isFinite(number) ? number : null;
}

function normalizeText(value: unknown): string {
  return String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}

function findSalesSheet(workbook: XLSX.WorkBook) {
  const exactSheet = workbook.SheetNames.find(
    (name) => normalizeText(name) === "sales data"
  );

  if (exactSheet) {
    return exactSheet;
  }

  for (const sheetName of workbook.SheetNames) {
    const sheet = workbook.Sheets[sheetName];

    const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(
      sheet,
      {
        defval: "",
      }
    );

    if (!rows.length) continue;

    const columns = Object.keys(rows[0]).map(normalizeText);

    const hasRevenue = columns.includes("revenue");
    const hasCustomer = columns.includes("customer");
    const hasRegion = columns.includes("region");

    if (hasRevenue && hasCustomer && hasRegion) {
      return sheetName;
    }
  }

  return null;
}

function findLabeledNumber(
  workbook: XLSX.WorkBook,
  labels: string[]
) {
  const normalizedLabels = labels.map(normalizeText);

  for (const sheetName of workbook.SheetNames) {
    const sheet = workbook.Sheets[sheetName];

    if (!sheet || !sheet["!ref"]) continue;

    const range = XLSX.utils.decode_range(sheet["!ref"]);

    for (let row = range.s.r; row <= range.e.r; row++) {
      for (let col = range.s.c; col <= range.e.c; col++) {
        const address = XLSX.utils.encode_cell({
          r: row,
          c: col,
        });

        const cell = sheet[address];

        if (!cell) continue;

        const text = normalizeText(cell.v);

        if (!normalizedLabels.includes(text)) {
          continue;
        }

        // Check cells to the right.
        for (let offset = 1; offset <= 5; offset++) {
          const valueAddress = XLSX.utils.encode_cell({
            r: row,
            c: col + offset,
          });

          const valueCell = sheet[valueAddress];

          if (!valueCell) continue;

          const number = normalizeNumber(valueCell.v);

          if (number !== null) {
            return {
              sheet: sheetName,
              cell: valueAddress,
              value: number,
            };
          }
        }

        // Check cells below.
        for (let offset = 1; offset <= 5; offset++) {
          const valueAddress = XLSX.utils.encode_cell({
            r: row + offset,
            c: col,
          });

          const valueCell = sheet[valueAddress];

          if (!valueCell) continue;

          const number = normalizeNumber(valueCell.v);

          if (number !== null) {
            return {
              sheet: sheetName,
              cell: valueAddress,
              value: number,
            };
          }
        }
      }
    }
  }

  return null;
}

function roundNumber(value: number) {
  return Math.round(value * 100) / 100;
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        {
          success: false,
          evaluated: false,
          error: "No Excel file was uploaded.",
        },
        { status: 400 }
      );
    }

    /*
     * Filename does NOT matter.
     *
     * We only validate the file extension.
     */

    const fileName = file.name.toLowerCase();

    if (
      !fileName.endsWith(".xlsx") &&
      !fileName.endsWith(".xls")
    ) {
      return NextResponse.json(
        {
          success: false,
          evaluated: false,
          error: "Please upload a valid Excel file (.xlsx or .xls).",
        },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    let workbook: XLSX.WorkBook;

    try {
      workbook = XLSX.read(buffer, {
        type: "buffer",
        cellDates: true,
      });
    } catch {
      return NextResponse.json(
        {
          success: false,
          evaluated: false,
          error:
            "The uploaded file could not be read as an Excel workbook. Please check that the file is not corrupted.",
        },
        { status: 400 }
      );
    }

    if (!workbook.SheetNames.length) {
      return NextResponse.json(
        {
          success: false,
          evaluated: false,
          error: "The workbook does not contain any worksheets.",
        },
        { status: 400 }
      );
    }

    /*
     * Find the original dataset.
     *
     * This does NOT depend on the user's filename
     * or answer sheet name.
     */

    const salesSheetName = findSalesSheet(workbook);

    if (!salesSheetName) {
      return NextResponse.json(
        {
          success: false,
          evaluated: false,
          error:
            "We could not find the sales dataset in your workbook. Make sure your completed workbook still contains the original sales data.",
        },
        { status: 400 }
      );
    }

    const salesSheet = workbook.Sheets[salesSheetName];

    const salesData = XLSX.utils.sheet_to_json<
      Record<string, unknown>
    >(salesSheet, {
      defval: "",
    });

    if (!salesData.length) {
      return NextResponse.json(
        {
          success: false,
          evaluated: false,
          error: "The sales dataset appears to be empty.",
        },
        { status: 400 }
      );
    }

    /*
     * ----------------------------------------
     * TASK 1 — TOTAL REVENUE
     * ----------------------------------------
     */

    const correctTotalRevenue = roundNumber(
      salesData.reduce((total, row) => {
        return total + (normalizeNumber(row["Revenue"]) ?? 0);
      }, 0)
    );

    const submittedTotalRevenue = findLabeledNumber(workbook, [
      "total revenue",
      "total sales",
      "revenue total",
      "grand total revenue",
    ]);

    const results: Array<{
      number: number;
      title: string;
      status: "correct" | "incorrect" | "not_found";
      submitted?: number;
      expected?: number;
      difference?: number;
      location?: {
        sheet: string;
        cell: string;
      };
      message: string;
    }> = [];

    if (!submittedTotalRevenue) {
      results.push({
        number: 1,
        title: "Calculate Total Revenue",
        status: "not_found",
        expected: correctTotalRevenue,
        message:
          'We could not find your answer. Add a label such as "Total Revenue" next to your calculated result and submit again.',
      });
    } else {
      const difference = roundNumber(
        Math.abs(
          submittedTotalRevenue.value -
            correctTotalRevenue
        )
      );

      const correct = difference <= 0.01;

      results.push({
        number: 1,
        title: "Calculate Total Revenue",
        status: correct ? "correct" : "incorrect",
        submitted: roundNumber(
          submittedTotalRevenue.value
        ),
        expected: correctTotalRevenue,
        difference,
        location: {
          sheet: submittedTotalRevenue.sheet,
          cell: submittedTotalRevenue.cell,
        },
        message: correct
          ? "Correct! Your total revenue is accurate."
          : "Your total revenue does not match the expected result.",
      });
    }

    /*
     * ----------------------------------------
     * CURRENT MVP
     * ----------------------------------------
     *
     * The workbook evaluator currently has
     * one fully automated task.
     *
     * We deliberately do NOT mark the other
     * four tasks as incorrect because they
     * have not been evaluated yet.
     */

    const evaluatedResults = results.filter(
      (result) => result.status !== "not_found"
    );

    const correctResults = evaluatedResults.filter(
      (result) => result.status === "correct"
    );

    const score =
      evaluatedResults.length > 0
        ? Math.round(
            (correctResults.length /
              evaluatedResults.length) *
              100
          )
        : null;

    return NextResponse.json({
      success: true,
      evaluated: evaluatedResults.length > 0,
      fileName: file.name,
      sheetUsed: salesSheetName,

      /*
       * null means "not enough evaluated tasks"
       * and MUST NOT be displayed as 0%.
       */
      score,

      evaluatedTasks: evaluatedResults.length,

      totalTasks: 5,

      results,

      message:
        evaluatedResults.length === 0
          ? "Your workbook was received, but we could not identify an answer to evaluate."
          : "Your workbook was evaluated successfully.",
    });
  } catch (error) {
    console.error("Evaluation error:", error);

    return NextResponse.json(
      {
        success: false,
        evaluated: false,
        error:
          "Something went wrong while evaluating your workbook. Please try again.",
      },
      { status: 500 }
    );
  }
}