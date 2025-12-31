const fs = require('fs');

// const book = {
//     judul: 'Pemrograman Jaringan',
//     penulis: 'Mawarni Lubis'
// };

// const bookJSON = JSON.stringify(book);
// fs.writeFileSync('1-jsontest.json', bookJSON);

const dataBuffer = fs.readFileSync('1-jsontest.json');
const dataJSON = dataBuffer.toString();
const data = JSON.parse(dataJSON);
console.log(data.judul);
