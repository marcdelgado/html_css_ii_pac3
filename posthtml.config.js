let literals_global = require('./src/assets/literals/literals_global.json');
let literals_local_ES = require('./src/assets/literals/literals_local_es.json');
let literals_local_CA = require('./src/assets/literals/literals_local_ca.json');
let literals_local_EN = require('./src/assets/literals/literals_local_en.json');

const path = require('path');

literals_local_CA.CA = deepMerge(literals_local_CA.CA, literals_local_ES.ES);
literals_local_EN.EN = deepMerge(literals_local_EN.EN, literals_local_ES.ES);

module.exports = {
  "plugins": {
    "posthtml-include": {
      "root": "./src"
    },
    "posthtml-expressions": {
      "locals": {
        ...literals_global,
        ...literals_local_ES,
        ...literals_local_CA,
        ...literals_local_EN,
      }
    }
  }
};


function deepMerge(obj1, obj2) {
  const output = { ...obj2 }; // Comenzamos con una copia de obj2
  if (!obj1) {
    return output;
  }
  Object.keys(obj1).forEach((key) => {
    if (isObject(obj1[key]) && isObject(obj2[key])) {
      // Si ambos valores son objetos, los fusionamos recursivamente
      output[key] = deepMerge(obj1[key], obj2[key]);
    } else if (Array.isArray(obj1[key]) && Array.isArray(obj2[key])) {
      // Si ambos valores son arrays, fusionamos cada elemento
      output[key] = mergeArrayElements(obj1[key], obj2[key]);
    } else if (obj2.hasOwnProperty(key)) {
      // Si obj2 tiene la clave, preferimos el valor de obj1
      output[key] = obj1[key];
    }
  });
  return output;
}

function isObject(item) {
  return (item && typeof item === 'object' && !Array.isArray(item));
}

function mergeArrayElements(arr1, arr2) {
  const maxLength = Math.max(arr1.length, arr2.length);
  const result = new Array(maxLength);

  for (let i = 0; i < maxLength; i++) {
    if (i < arr1.length && i < arr2.length) {
      // Si ambos arrays tienen un elemento en esta posición, los fusionamos
      result[i] = deepMerge(arr1[i], arr2[i]);
    } else if (i < arr1.length) {
      // Si solo arr1 tiene un elemento en esta posición, lo tomamos directamente
      result[i] = arr1[i];
    } else {
      // Si solo arr2 tiene un elemento en esta posición, lo tomamos directamente
      result[i] = arr2[i];
    }
  }
  return result;
}
