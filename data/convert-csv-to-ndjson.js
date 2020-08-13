const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');

let json = ''

fs.createReadStream(path.resolve(__dirname, 'openfoodfacts.csv')).pipe(csv.parse({ headers: true, delimiter: '\t' }))
  .on('error', error => console.error(error))
  .on('data', row => {
    let randomPrice = parseFloat((Math.random() + Math.floor(Math.random() * 99)).toFixed(2)); // random decimal price up 
    let product = {
      _type: 'product',
      _id: row.code,
      name: row.product_name,
      price: randomPrice, // randon price because csv file does not have this column
      imageUrl: row.image_url
    }
    json += `${JSON.stringify(product)}\n`;
  })
  .on('end', (rowCount) => {
    fs.writeFile('data/products.ndjson', json, function(err) {
      if (err) return console.log(err);
      console.log(`${rowCount} records converted to ndjson`);      
    })
  })

  
