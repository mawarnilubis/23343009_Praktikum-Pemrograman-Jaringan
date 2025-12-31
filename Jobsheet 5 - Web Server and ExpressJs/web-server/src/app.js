const express = require('express');
const path = require('path');
const hbs = require('hbs');

const app = express();
const publicDir = path.join(__dirname, '../public');
const viewsDir = path.join(__dirname, '../templates/views');
const partialsDir = path.join(__dirname, '../templates/partials');

// setup handlewars engine dan lokasi folder views
app.set('view engine', 'hbs');
app.set('views', viewsDir);
hbs.registerPartials(partialsDir);

// static dir
app.use(express.static(publicDir));

app.get('', (_, res) => {
    res.render('index', {
        title: 'Aplikasi Cek Cuaca',
        judul: 'Aplikasi Cek Cuaca',
        nama: 'M Ilham'
    });
});

app.get('/bantuan', (_, res) => {
    res.render('bantuan', {
        title: 'Bantuan',
        judul: 'Bantuan',
        nama: 'M Ilham',
        teksBantuan: 'ini adalah teks bantuan'
    });
});

app.get('/infoCuaca', (_, res) => {
    res.send([
        {
            prediksiCuaca: 'Cuaca Sedang Hujan',
            lokasi: 'Padang'
        }
    ]);
});

app.get('/tentang', (_, res) => {
    res.render('tentang', {
        title: 'Tentang',
        judul: 'Tentang Saya',
        nama: 'M Ilham',
    });
});

app.get('/bantuan/*', (_, res) => {
    res.render('404', {
        title: '404',
        judul: '404',
        nama: 'M. Ilham',
        pesanKesalahan: 'Artikel yang dicari tidak ditemukan.'
    });
});

app.get('*', (_, res) => {
    res.render('404', {
        title: '404',
        judul: '404',
        nama: 'M. Ilham',
        pesanKesalahan: 'Halaman tidak ditemukan.'
    });
});



app.listen(4000, () => {
    console.log(`Server berjalan pada port 4000.`);
})