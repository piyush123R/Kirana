// import React from "react";
// // import { Card } from "antd";
// // const { Meta } = Card;
// const businessPage = () => {
//   return <div>Welcome in business world</div>;
// };

// export default businessPage;

import React from "react";
import * as XLSX from 'xlsx';

const businessPage = () => {
  const handleJsonToExcelConversion = () => {
    const jsonData = [
      { Name: "John", Age: 25, Color: "Red" },
      { Name: "Jane", Age: 30, Color: "Green" },
      { Name: "Bob", Age: 22, Color: "Blue" },
    ];
    const jsonToExcel = () => {
      const workbook = XLSX.utils.book_new();
      const sheetName = "Sheet1";

      const worksheet = XLSX.utils.json_to_sheet(jsonData, {
        // header: Object.keys(jsonData[0]),
        skipHeader: true,
      });
      const columnColor = {
        Color: { patternType: "solid", fgColor: { rgb: "FFFF00" } },
      };
      worksheet["!cols"] = [{ wch: 10 }, { wch: 10, s: columnColor }];
      XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
      XLSX.writeFile(workbook, "output.xlsx");
    };
    jsonToExcel();
  };

  return (
    <div>
       <button onClick={handleJsonToExcelConversion}>Convert</button>
    </div>
  );
};

export default businessPage;
