var XLSX = require("xlsx"); // librería XLSX

// Función que se encarga de transformar los datos 
// de un archivo Excel a JSON
const ExcelToJson = () =>{

    // Variable con el path del archivo excel a transformar 
    const excel = XLSX.readFile("/Users/gonzalobrions/GitHub/testing-examples/excel-to-json/Formato_CargaMasiva_2025.xlsx");
    
    // Regresa un array con el nombre de las hojas del archivo excel
    var Sheetname = excel.SheetNames; 

    // Variable en la que almacenamos los datos que obtenemos 
    // de la hoja del archivo Excel que se indica 
    // mediante utils.sheet_to_json() convierte la información 
    // de las filas y columnas en JSON, recibe como parámetro 
    // la hoja u hoja del archivo Excel que indicamos mediante el índice
    let dataJson = XLSX.utils.sheet_to_json(excel.Sheets[Sheetname[0]]);
    
    // Se imprimen los datos ya transformados en JSON
    console.log(dataJson);
} 

// Llamada a la función
ExcelToJson();