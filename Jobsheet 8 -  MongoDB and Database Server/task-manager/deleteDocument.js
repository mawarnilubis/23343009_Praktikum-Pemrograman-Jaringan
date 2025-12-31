const { MongoClient, ObjectId } = require('mongodb');

const url = 'mongodb://127.0.0.1:27017';
const client =  new MongoClient(url);
const namaDatabase = 'task-manager';

async function main(){
  try {
    await client.connect();
    console.log('Berhasil terhubung ke MongoDB database server');
    const db = client.db(namaDatabase);

    // db.collection('pengguna').deleteMany({
    //     usia: 26
    // })
    //   .then(result => { console.log(result); } )
    //   .catch(err => { console.error(err); } );
    db.collection('tugas').deleteOne({
        _id: new ObjectId('69512d132594840a238ef822')
    });
  }
  catch(err){
    console.error(err);
  }
}

main();