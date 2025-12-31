const { MongoClient, ObjectId } = require('mongodb');
const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);
const namaDatabase = 'task-manager';

async function main(){
  try {
    await client.connect();
    console.log('Berhasil terhubung ke MongoDB database server');
    const db = client.db(namaDatabase);    
    // cari satu dokumen dalam koleksi pengguna berdasarkan nama 'Ilham'
    const byNama = await db.collection('pengguna').findOne({ nama: 'Ilham'});
    // cari satu dokumen dalam koleksi pengguna berdasarkan id objek tertentu
    const byObjectId = await db.collection('pengguna').findOne({
      _id: new ObjectId("69512d132594840a238ef820")
    });

    // mencari beberapa dokumen dalam koleksi pengguna dengan kriteria usia 28 dan mengubah menjadi array
    const toArray = await db.collection('pengguna').find({ usia: 21 }).toArray();

    // pakai if dengan kondisi salah (tidak akan berfungsi)
    if(byNama && byObjectId &&toArray){
      // tampilkan hasil pencarian berdasarkan nama, object id, dan kriteria usia
      console.log('Data Pengguna ditemukan (berdasarkan nama): ', byNama);
      console.log('Data Pengguna ditemukan (berdasarkan ID Objek): ', byObjectId);
      console.log('Data Pengguna ditemukan (dalam format array): ', toArray);
    }
    else {
      // tampilkan pesan bahwa data pengguna tidak ditemukan
      console.log('Data pengguna tidak ditemukan');
    }
  }
  catch(err){ console.error(err); }
  finally { await client.close(); }
}
// panggil fungsi main dan tangani kesalahan jika ada
main().catch(console.error);