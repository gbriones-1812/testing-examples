import React, {useState} from "react"; // importamos librería Ract y useState
import * as XLSX from 'xlsx'; // importamos la librería XLSX

const ExcelComponet = () => {
    // Variable de uso de estado para el archivo Excel, 
    // inicializado en null porque no tenemos archivo aún
    const [file,setFile] = useState(null);

    // Variable de uso de estado para los datos del Excel 
    // inicializada con un arreglo vacío, todavía no hay datos
    const [excelData,setExcelData] = useState([]);

    // Manejamos evento para obtener el archivo
    const handleFileChange = (e) => {
        console.log(e.target);
        const selectedFile = e.target.file[0];
        setFile(selectedFile);
    }

    // Prevenimos que el usuario no seleccione archivo y quiera 
    // ejecutar el programa
    const handleFileUpload = (e) => {
        e.preventDefault();
        
        if(file){
            // Si se seleccionó el archivo se procesa 
            try{
                // Variable para leer archivo Excel
                const fileReader = new FileReader(); 

                // Procedemos a leer y tratar el archivo Excel
                fileReader.onload = (e) => {
                    // obtenemos el archivo
                    const data = e.target.result; 
                    
                    // Leemos el excel
                    const excel = XLSX.read(data,{type:'binary'}); 
                    
                    // obtenemos el nombre de la primer hoja
                    const sheetName = excel.SheetNames[0]; 
                    
                    // obtenemos los datos de la hoja
                    const sheet = excel.Sheets[sheetName]; 

                    // transformamos los datos a JSON
                    const jsonData = XLSX.utils.sheet_to_json(sheet,{header:0});

                    // Ya tenemos información
                    setExcelData(jsonData);
                }
                fileReader.readAsBinaryString(file)
            } catch (error) {
                console.error("Error al leer el archivo");
            }
        } else {
            // Si no se seleccionó un archivo se muestra esta alerta
            alert('No has seleccionado un archivo Excel');
        }
    }

    return(
        <div className='container mt-5'>
            <form className='form mx-auto w-50' onSubmit={handleFileUpload}>
                <input type="file" onChange={handleFileChange} className='form-control' accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" />
                <button className='btn btn-success mt-3'>Subir archivo</button>
            </form>
            {(excelData.length > 0) && (
                <div>
                    <table className='table table-dark table-hover table-striped mt-3'>
                        <thead>
                            <tr>
                                {Object.keys(excelData[0]).map((key, index) => (
                                    <th key={index}>{key}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {excelData.map((fila, filaIndex) => (
                                <tr key={filaIndex}>
                                    {Object.values(fila).map((value, colIndex) => (
                                        <td key={colIndex}>{value}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

// exportamos el componente
export default ExcelComponet;