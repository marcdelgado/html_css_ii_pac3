const fs = require('fs');
const path = require('path');

// Directorio de las plantillas y destino de los archivos
const templatesDir = path.join(__dirname, '../src');
const outputDir = path.join(__dirname, '../src', 'routes');

// Idiomas definidos
const languages = ['ES', 'CA', 'EN'];

// Lee los archivos del directorio de plantillas
fs.readdir(templatesDir, (err, files) => {
  if (err) {
    console.error("No se pudo leer el directorio de plantillas:", err);
    return;
  }

  files.forEach(file => {
    // Asegura que solo procesa archivos .html
    if (path.extname(file) === '.html') {
      // Crea un archivo por cada idioma
      languages.forEach(lang => {
        const newFileName = `${path.basename(file, '.html')}_${lang.toLowerCase()}.html`;
        const newFilePath = path.join(outputDir, newFileName);

        const content = `<scope with="${lang}">\n    <include src="${file}"></include>\n</scope>`;
        //const content = `<include src="pages/${file}" locals="${lang}"></include>\n`;

        // Escribe el nuevo archivo con el contenido adecuado
        fs.writeFile(newFilePath, content, err => {
          if (err) {
            console.error(`Error al escribir el archivo ${newFileName}:`, err);
          } else {
            console.log(`Archivo creado: ${newFilePath}`);
          }
        });
      });
    }
  });
});
