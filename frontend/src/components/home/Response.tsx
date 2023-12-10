import React, { useState } from "react";
import TerminalContainer from "../TerminalContainer";

const Response: React.FC<{
  text?: string;
  fileName?: string;
  issues?: {
    issue: string;
    fix: string;
    source: string;
    priority: string;
    problem: string;
  }[];
}> = ({
  fileName = "document.pdf",
  issues = [
    {
      issue: `Bill of Lading Number: OCE123456789`,
      fix: `OCE17891265`,
      source: "ETC_2.pdf",
      priority: "High.",
      problem: "Incorrect lading number.",
    },
    {
      issue: `Tariff Code: 123456789`,
      fix: `17891265`,
      source: "ETC_2.pdf",
      priority: "High.",
      problem: "Incorrect tariff Code.",
    },
    {
      issue: `Bill of Lading: [Attach B/L]`,
      fix: `[Attach B/L]`,
      source: "ETC_15.pdf",
      priority: "low",
      problem: "Attach bill of lading to this document.",
    },
    {
      issue: `Commercial Invoice: [Attach Invoice]`,
      fix: `[Attach Invoice]`,
      source: "ETC_18.pdf",
      priority: "low",
      problem: "Attach an invoice to this document.",
    },
    {
      issue: `Bill of Lading: [Attach Packing List]`,
      fix: `[Attach Packing List]`,
      source: "ETC_23.pdf",
      priority: "low",
      problem: "Attach packing list to this document.",
    },
    {
      issue: `Certificate of Origin: [Attach Certificate]`,
      fix: `[Attach Certificate]`,
      source: "ETC_14.pdf",
      priority: "low",
      problem: "Attach certificate of origin to this document.",
    },
  ],
  text = `Customs Clearance Document
  Shipment Details:
  Shipment Reference Number: ABC987654
  Port of Entry: Harbor City Port
  Arrival Date: September 15, 2023
  Exporter Details:
  Exporter Name: XYZ Global Trading
  Address: 123 Export Street, Exportville, EX 54321
  Contact Person: Alice Johnson
  Contact Email: alice.johnson@xyzglobal.com
  Contact Phone: +1 555 224 3708
  Importer Details:
  Importer Name: ABC Imports Inc.
  Address: 456 Import Lane, Importland, IM 98765
  Contact Person: Bob Smith
  Contact Email: bob.smith@abcimports.com
  Contact Phone: +1 987 654 3210
  Shipment Contents:
  Description of Goods: Electronics and Accessories
  Quantity: 500 units
  Weight: 1200 kg
  Value: $50,000
  Shipping Details:
  Carrier/Vessel Name: Ocean Star
  Bill of Lading Number: OCE123456789
  Container Number: ABCD9876543
  Customs Information:
  Tariff Code: 123456789
  Country of Origin: China
  Commodity Classification: Electronic Devices
  Documentation:
  Commercial Invoice: [Attach Invoice]
  Packing List: [Attach Packing List]
  Certificate of Origin: [Attach Certificate]
  Bill of Lading: [Attach B/L]
  Customs Declarations:
  Declared Value: $50,000
  Declared Quantity: 500 units
  Declared Weight: 1200 kg
  Additional Declarations: Fragile items, handle with care.
  Customs Fees and Duties:
  Duty Calculation: $10,000
  Other Fees: $1,200
  Total Amount Due: $11,200
  Customs Clearance Status:
  Customs Inspection: Cleared
  Customs Clearance Officer: Officer Jackson
  Clearance Date: January 18, 2023
  `,
}) => {
  return (
    <TerminalContainer>
      <div className="flex flex-col text-gray-400">
        <strong className="mb-2">Recomendations for {fileName}</strong>

        <div className="flex flex-col gap-4 w-full">
          {issues.map((issue, i) => {
            const txt = text.substring(
              text.indexOf(issue.issue) > 200
                ? text.indexOf(issue.issue) - 200
                : 0,
              text.indexOf(issue.issue) + issue.issue.length + 200
            );

            return (
              <TextBlock
                key={i}
                issue={issue}
                txt={txt}
                hasDots={text.indexOf(issue.issue) > 200}
              />
            );
          })}
        </div>
      </div>
    </TerminalContainer>
  );
};

export const TextBlock: React.FC<{
  issue: {
    issue: string;
    fix: string;
    source: string;
    problem: string;
    priority: string;
  };
  txt: string;
  hasDots: boolean;
}> = ({ issue, txt, hasDots }) => {
  const [issueActive, setIssueActive] = useState(false);

  return (
    <div className="p-4 rounded-lg bg-gray-50 border">
      <p>
        {hasDots ? "..." : ""}
        {txt.split(issue.issue)[0]}
        <span
          className={`${
            issue.priority === "High." ? "bg-primary-600" : "bg-primary-500"
          } px-2 text-white rounded-full relative cursor-pointer group`}
          onClick={() => setIssueActive(!issueActive)}
        >
          {issue.issue}

          {issueActive && (
            <div
              className={`absolute left-[50%] -translate-x-[50%] bottom-20 bg-gray-50 rounded-lg border-2 border-primary-700 p-4 min-w-[500px] max-w-[800px] shadow-2xl flex flex-col`}
            >
              <strong
                className={`${
                  issue.priority === "High."
                    ? "text-primary-600"
                    : "text-primary-500"
                } text-lg mb-2`}
              >
                {issue.priority === "High." ? "Critical!" : "Warning"}
              </strong>

              <small className="text-primary-600 mt-2">
                Problem: <span className="underline">{issue.problem}</span>
              </small>

              <p className="text-gray-400 underline mb-1 mt-2">Fix:</p>

              <p className="text-gray-400">{issue.fix}</p>

              <small className="text-accent mt-2">
                Source: <span className="underline">{issue.source}</span>
              </small>
            </div>
          )}
        </span>
        {txt.split(issue.issue)[1]}...
      </p>
    </div>
  );
};

export default Response;
