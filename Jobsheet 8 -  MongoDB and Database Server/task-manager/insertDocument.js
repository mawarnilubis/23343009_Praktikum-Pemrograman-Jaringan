// import module
const { MongoClient, ObjectId } = require('mongodb');

// define url mongo yg akan dikoneksikan
const url = 'mongodb://127.0.0.1:27017';

// buat instance mongodb client
const client = new MongoClient(url);

// nama db yg digunakan
const namaDatabase = 'task-manager';

// instance objectId, untuk generate identifier unik dokumen mongodb
const id = new ObjectId();

// cetak objectid
console.log({id});

// cetak hexa dari object id
console.log({hexaId: id.id});

// cetak panjang objectId
console.log({hexaLen: id.id.length});

// cetak timestamp kapan objectId dibuat
console.log({timestamp: id.getTimestamp()});

// cetak panjang objectId dalam string hexa
console.log({strHexaLen: id.toHexString().length});

// fungsi async operasi mongodb
async function main(){
    try {
        await client.connect();
        console.log("Berhasil terhubung ke MongoDB database server");
        
        // pilih db dengan nama yg didefinisikan
        const db = client.db(namaDatabase);

        // pilih collection pengguna dalam database
        const clPengguna = db.collection('pengguna');

        // pilih collection tugas
        const clTugas = db.collection('tugas');

        // input 1 data ke dalam collection pengguna
        const insertPengguna = await clPengguna.insertOne({
            _id: id,
            nama: 'Ilham',
            usia: 21
        });
        console.log('Memasukkan data pengguna ke koleksi => ', insertPengguna);
        
        //input banyak data ke koleksi tugas
        const insertTugas = await clTugas.insertMany([
            {
                Deskripsi: 'Membersihkan rumah',
                StatusPenyelesaian: true
            },
            {
                Deskripsi: 'Mengerjakan tugas kuliah',
                StatusPenyelesaian: false
            },
            {
                Deskripsi: 'Memberikan bimbingan',
                StatusPenyelesaian: false
            }
        ]);
        console.log('Memasukkan data Tugas ke koleksi => ', insertTugas);

        return 'Data selesai dimasukkan'
    }
    catch(err){
        console.error(err);
    }
    finally {
        client.close();
    }
}


main().then(console.log).catch(console.error);