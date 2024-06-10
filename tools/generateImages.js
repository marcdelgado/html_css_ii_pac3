const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const galleryDir = path.join(__dirname, '../gallery');
const outputDir = path.join(__dirname, '../src', 'assets', 'images','gallery');
const medidasMaximas = [640, 1280, 2560];

// Asegura que el directorio de salida existe
fs.mkdirSync(outputDir, { recursive: true });

function generateImages() {
  fs.readdir(galleryDir, (err, files) => {
    if (err) {
      console.error("Error al leer el directorio de la galería:", err);
      return;
    }

    files.forEach(file => {
      const filePath = path.join(galleryDir, file);
      if (isImageFile(file)) {
        optimizeOneImage(filePath);
      }
    });
  });
}

function isImageFile(fileName) {
  return /\.(jpe?g|png|webp|gif|bmp)$/i.test(fileName);
}


function optimizeOneImage(filePath) {
  const fileName = path.basename(filePath);
  const fileExt = path.extname(fileName);
  const baseName = fileName.replace(fileExt, '');

  // Obtiene las dimensiones de la imagen original
  sharp(filePath).metadata().then(metadata => {
    medidasMaximas.forEach(size => {
      const outputPath = path.join(outputDir, `${baseName}_${size}.webp`);

      // Comprueba si el archivo de destino ya existe
      fs.access(outputPath, fs.constants.F_OK, (err) => {
        if (err) {  // El archivo no existe
          // Comprueba si el ancho original es mayor que el tamaño objetivo
          if (metadata.width > size) {
            // Procede con el resize solo si es necesario
            sharp(filePath)
              .resize({ width: size })
              .toFormat('webp')
              .toFile(outputPath)
              .then(() => {
                console.log(`Imagen generada: ${outputPath}`);
              })
              .catch(err => {
                console.error(`Error al procesar ${filePath} a ${size}px:`, err);
              });
          } else {
            // Si el tamaño original es menor o igual, copia sin modificar
            //const copyPath = path.join(outputDir, `${baseName}_${metadata.width}.webp`);
            const copyPath = path.join(outputDir, `${baseName}_${size}.webp`);
            fs.copyFile(filePath, copyPath, (err) => {
              if (err) {
                console.error(`Error al copiar el archivo original a ${copyPath}:`, err);
              } else {
                console.log(`Archivo original copiado sin modificar a: ${copyPath}`);
              }
            });
          }
        } else {
          // El archivo ya existe
          console.log(`El archivo ya existe y no se modificará: ${outputPath}`);
        }
      });
    });
  }).catch(err => {
    console.error(`Error al obtener metadatos de ${filePath}:`, err);
  });
}

generateImages();
