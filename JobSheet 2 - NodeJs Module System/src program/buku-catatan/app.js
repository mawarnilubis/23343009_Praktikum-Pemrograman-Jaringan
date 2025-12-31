const yargs = require('yargs');
const catatan = require('./catatan.js');

// kustomisasi versi yargs
yargs.version('10.1.0');

/* =========================
   COMMAND: TAMBAH CATATAN
========================= */
yargs.command({
    command: 'tambah',
    describe: 'Menambahkan catatan baru',
    builder: {
        judul: {
            describe: 'Judul catatan',
            demandOption: true,
            type: 'string'
        },
        isi: {
            describe: 'Isi catatan',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        catatan.tambahCatatan(argv.judul, argv.isi);
    }
});

/* =========================
   COMMAND: HAPUS CATATAN
========================= */
yargs.command({
    command: 'hapus',
    describe: 'Menghapus catatan',
    builder: {
        judul: {
            describe: 'Judul catatan yang dihapus',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        catatan.hapusCatatan(argv.judul);
    }
});

/* =========================
   COMMAND: BACA SEMUA
========================= */
yargs.command({
    command: 'read_all',
    describe: 'Menampilkan semua catatan',
    handler() {
        catatan.bacaSemua();
    }
});

/* =========================
   COMMAND: BACA SATU CATATAN
========================= */
yargs.command({
    command: 'read',
    describe: 'Menampilkan satu catatan',
    builder: {
        judul: {
            describe: 'Judul catatan',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        catatan.bacaJudul(argv.judul);
    }
});

/* =========================
   COMMAND: BUAT catatan.txt
========================= */
yargs.command({
    command: 'export_txt',
    describe: 'Mengekspor semua catatan ke file catatan.txt',
    handler() {
        catatan.buatCatatanTxt();
    }
});

// parsing argumen
yargs.parse();
