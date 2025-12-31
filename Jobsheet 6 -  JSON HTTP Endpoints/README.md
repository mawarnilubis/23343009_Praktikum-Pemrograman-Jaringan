# Jobsheet 6 – JSON HTTP Endpoints

Dari jobsheet ini, saya memperoleh pengalaman langsung dalam **membangun dan mengelola JSON HTTP Endpoints menggunakan Express.js**. Materi yang dipelajari mencakup cara membuat endpoint dinamis untuk mengirim dan menerima data dalam format **JSON**, penerapan konsep **query string (req.query)**, serta integrasi API eksternal (Mapbox dan Weatherstack) untuk menampilkan data cuaca secara real-time.

## Bagian Latihan

Saya secara bertahap:

1. **Mempelajari konsep JSON HTTP Endpoints**, yaitu URL pada aplikasi web yang mengirim dan menerima data dalam format JSON melalui protokol HTTP.  

2. **Menggunakan `req.query` pada Express.js** untuk mengambil parameter dari URL seperti `?address=padang`, dan mengembalikan respons JSON secara dinamis.  

3. **Membuat endpoint `/infoCuaca`** yang memberikan respons berbeda tergantung pada ada/tidaknya parameter alamat (`address`).  

4. **Menerapkan modul `postman-request`** untuk menghubungkan aplikasi Node.js dengan API eksternal.  

5. **Membuat dua modul utilitas**:
   - `geocode.js` → mengakses **Mapbox API** untuk mendapatkan koordinat (`latitude`, `longitude`, dan `location`).
   - `prediksiCuaca.js` → mengakses **Weatherstack API** untuk menampilkan deskripsi cuaca, suhu, visibilitas, dan indeks UV.  

6. **Menggabungkan kedua modul tersebut** di dalam `app.js`, sehingga hasil pencarian lokasi dapat ditampilkan dalam format JSON dinamis, berisi:
   ```json
   {
     "prediksiCuaca": "Cuaca cerah dengan suhu 30 derajat",
     "lokasi": "Padang, Indonesia",
     "address": "padang"
   }

7. **Mengintegrasikan Frontend menggunakan Fetch API** dengan menambahkan form pencarian di index.hbs agar pengguna dapat memasukkan lokasi dan melihat hasil cuaca tanpa perlu refresh halaman.

8. **Menambahkan gaya tampilan (CSS)** untuk memperindah form input dan tombol pencarian, serta menampilkan pesan hasil pencarian secara interaktif.

9. **Melakukan validasi input** pengguna sehingga ketika kolom pencarian kosong, akan muncul pesan:
   ```js
   Kamu harus memasukkan lokasi yang ingin dicari

10. **Menyesuaikan tampilan halaman bantuan dan tentang**, menjadikannya lebih informatif dan interaktif sesuai dengan tujuan masing-masing halaman.

# Kesimpulan

Dari jobsheet ini, saya memahami bahwa JSON HTTP Endpoints merupakan komponen penting dalam membangun aplikasi web modern berbasis API.
Saya belajar bagaimana membuat endpoint dinamis di Express.js, menggunakan req.query untuk membaca input dari pengguna, serta menghubungkan Node.js dengan layanan API eksternal seperti Mapbox dan Weatherstack.
Selain itu, saya juga berhasil mengintegrasikan frontend dan backend menggunakan Fetch API, menambahkan validasi input, serta mempercantik tampilan menggunakan CSS.

Dengan latihan ini, saya berhasil membangun aplikasi web interaktif yang menampilkan kondisi cuaca berdasarkan lokasi pengguna dalam format JSON, sekaligus memahami alur kerja antara frontend, backend, dan API secara menyeluruh.
