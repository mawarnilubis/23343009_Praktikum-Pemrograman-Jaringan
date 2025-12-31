const { MongoClient, ObjectId } = require('mongodb');

const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);
const namaDatabase = 'task-manager';

async function main(){
  try {
    await client.connect();
    console.log('Berhasil terhubung ke MongoDB database server');
    const db = client.db(namaDatabase);

    // // memperbarui data dengan updateOne
    // const updateOnePromise = db.collection('pengguna').updateOne(
    //   { _id: new ObjectId('69512d132594840a238ef820') },
    // //   { $set: { nama: 'Ahda' } },
    //   { $inc: { usia: 1 } },
    // );

    // updateOnePromise
    //   .then(result => { console.log(result); })
    //   .catch(err => { console.log(err); })
    //   .finally(() => { client.close(); })
    
    // // memperbarui data dengan updateMany
    // db.collection('tugas').updateMany(
    //     { StatusPenyelesaian: false },
    //     { $set: { StatusPenyelesaian: true } }
    // )
    //   .then(result => { console.log(result.modifiedCount); })
    //   .catch(err => { console.error(err); })
    //   .finally(() => { client.close(); } );
    
    const semuaPengguna = await db.collection('pengguna').find({}).toArray();
    let usiaAwal = 21;

    for(let i = 0; i < semuaPengguna.length; i++){
      const user = semuaPengguna[i];

      const usiaUnik = usiaAwal + i;
      await db.collection('pengguna').updateOne(
        { _id: user._id },
        { $set: { usia: usiaUnik } }
      );

    }
  }
  catch(err){
    console.error(err);
  }
}

main();