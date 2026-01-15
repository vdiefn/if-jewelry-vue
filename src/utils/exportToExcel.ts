import ExcelJs from "exceljs";

export const exportToExcel = async <T extends Record<string, string | number>>(
    data: T[],
    columns:{ header: string; key: string }[],
    fileName: string,
    sheetName: string
) => {
    const workbook = new ExcelJs.Workbook();
    const worksheet = workbook.addWorksheet(sheetName);

    worksheet.columns = columns;

    data.forEach((item) => {
        worksheet.addRow(item);
    });

    const content = await workbook.xlsx.writeBuffer();
    const blobData = new Blob([content], {
        type: "application/vnd.ms-excel;charset=utf-8;",
    });
    const link = document.createElement("a");
    link.download = `${fileName}.xlsx`;
    link.href = URL.createObjectURL(blobData);
    link.click();
    URL.revokeObjectURL(link.href);
};
