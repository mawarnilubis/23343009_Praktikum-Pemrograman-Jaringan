# Jobsheet 9 - Socket Programming
# Latihan

Dari latihan pada jobsheet ini, saya memperoleh pengalaman langsung dalam membangun aplikasi komunikasi real-time menggunakan Socket Programming berbasis WebSocket dengan Socket.IO. Saya mempelajari bagaimana server dan client dapat saling terhubung, sehingga memungkinkan pertukaran data dua arah secara langsung tanpa harus melakukan request berulang seperti pada HTTP biasa.

Melalui implementasi aplikasi ruang obrolan (chat room), saya memahami penggunaan event socket.on dan socket.emit untuk menangani komunikasi berbasis peristiwa (event-based communication), pengelolaan pengguna dalam suatu room, serta mekanisme broadcast pesan ke seluruh client yang berada dalam room yang sama. Selain itu, saya juga mempelajari penggunaan namespace dan room pada Socket.IO untuk memisahkan komunikasi antar kelompok pengguna.

# Tugas

## 1. Perbandingan Implementasi `socket.on` pada Sisi Server dan Client

Tabel berikut menunjukkan perbedaan penerapan metode `socket.on` antara bagian server dan client dalam aplikasi chat.

| Kriteria                | Server (`src/index.js`)                                                  | Client (`public/js/chat.js`)                          |
| :---------------------- | :----------------------------------------------------------------------- | :---------------------------------------------------- |
| **Platform**            | Node.js                                                                  | Browser                                               |
| **Fungsi Utama**        | Mengelola event dari client, mengatur pengguna, mendistribusikan pesan. | Menerima event dari server, memperbarui antarmuka.    |
| **Event yang Ditangani**| `join`, `kirimPesan`, `kirimLokasi`, `disconnect`                        | `pesan`, `locationMessage`, `roomData`                |
| **Peran**               | Memproses input client dan mengeksekusi logika bisnis.                   | Memproses data server dan merender ke tampilan.       |
| **Implementasi**        | `socket.on("kirimPesan", (pesan, callback) => {...})`                    | `socket.on("pesan", (message) => {...})`              |
| **Operasi**             | Validasi input, broadcasting, manajemen user, update room.               | Rendering template, pembaruan sidebar, auto-scroll.   |
| **Jenis Data**          | Data mentah dari pengguna.                                               | Data terformat dari server.                           |
| **Hasil**               | Mengirim event ke semua client di room yang sama.                        | Memodifikasi DOM, menampilkan pesan dan lokasi.       |

---

## 2. Investigasi Alur Data Melalui Console Browser

Berikut hasil analisis tampilan console saat aplikasi chat berjalan.

| Output Console                                                         | Penyebab                                                                                     | Bagian Kode Terkait                                                                       |
| :--------------------------------------------------------------------- | :------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------- |
| **Objek Pesan Admin**<br>`{username: "Admin", text: "Selamat datang!", ...}` | Client menerima event pesan sambutan dari server dan menampilkannya di console.              | `socket.on("pesan", (message) => { console.log(message); })`                              |
| **Objek Pesan Pengguna**<br>`{username: "randi", text: "test", ...}`  | Server mendistribusikan pesan ke semua client dalam room, kemudian client mencetaknya.       | `socket.on("pesan", (message) => { console.log(message); })`                              |
| **Konfirmasi**<br>`"Pesan berhasil dikirim"`                           | Callback dari event `kirimPesan` dijalankan setelah server memproses dan menyebarkan pesan. | `socket.emit("kirimPesan", pesan, (error) => { console.log("Pesan berhasil dikirim"); })` |

**Rangkaian Proses:**

1. Client bergabung ke room, server mengirim pesan sambutan, client menampilkan objek di console.
2. Client mengirim pesan melalui `socket.emit`, server memprosesnya, callback dieksekusi (muncul log konfirmasi).
3. Server mendistribusikan pesan ke room, setiap client menerima event dan mencetak objek pesan.

---

## 3. Penjelasan Library yang Digunakan dalam `chat.html`

Aplikasi ini menggunakan tiga library eksternal untuk fungsi tertentu.

### Mustache

Library templating untuk merender HTML secara dinamis berdasarkan data yang diterima.

- **Kegunaan:** Mengganti variabel template seperti `{{username}}` dan `{{message}}` dengan data aktual.
- **Contoh Implementasi:**
```javascript
  Mustache.render(messageTemplate, {
    username: message.username,
    message: message.text,
    createdAt: moment(message.createdAt).format("H:mm"),
  });
```

### Moment

Library untuk manipulasi dan formatting waktu.

- **Kegunaan:** Mengubah timestamp pesan menjadi format yang mudah dibaca (jam:menit).
- **Contoh:** `moment(message.createdAt).format("H:mm")`.

### Qs

Library untuk parsing query string dari URL.

- **Kegunaan:** Mengekstrak parameter `username` dan `room` dari URL (contoh: `/chat.html?username=xxx&room=yyy`) saat client bergabung.
- **Contoh:** `const { username, room } = Qs.parse(location.search, { ignoreQueryPrefix: true });`.

---

## 4. Struktur Elements, Templates, dan Options dalam `chat.js`

Bagian ini menjelaskan komponen-komponen penting yang diinisialisasi dalam script client.

| Komponen      | Deskripsi                                                                  | Relasi File                                          |
| :------------ | :------------------------------------------------------------------------- | :--------------------------------------------------- |
| **Elements**  | Referensi ke elemen DOM (form, input, button) untuk manipulasi JavaScript. | `chat.html`                                          |
| **Templates** | Mengambil template Mustache dari tag script untuk rendering dinamis.       | `chat.html`                                          |
| **Options**   | Parsing data `username` dan `room` dari query string URL.                  | `index.html` (input awal) & `chat.html` (penggunaan) |

---

## 5. Fungsi Modul `messages.js` dan `users.js`

Kedua file ini merupakan utility module yang mendukung operasi server.

| Modul           | Deskripsi Fungsi                                                          | Alur Penggunaan                                                                             |
| :-------------- | :------------------------------------------------------------------------ | :------------------------------------------------------------------------------------------ |
| **messages.js** | Membuat objek pesan standar yang berisi username, text, dan timestamp.    | `index.js` (generate pesan) -> `chat.js` (receive) -> `chat.html` (display).                |
| **users.js**    | Mengelola data pengguna: menambah, mengambil, mendapatkan list, menghapus. | `index.js` (manage user) -> `chat.js` (receive update) -> `chat.html` (tampil di sidebar). |

---

## 6. Mekanisme Fitur Pengiriman Lokasi

Fitur ini memungkinkan pengguna membagikan koordinat geografis mereka ke room chat.

**Tahapan Proses:**

1. **Browser:** Mengakses Geolocation API untuk mendapatkan koordinat (`navigator.geolocation.getCurrentPosition`).
2. **Client:** Mengirim koordinat ke server via event (`socket.emit("kirimLokasi", coords)`).
3. **Server:** Menerima koordinat, membuat URL Google Maps, lalu broadcasting (`io.to(room).emit("LocationMessage")`).
4. **Client Penerima:** Menangkap event dan merender link lokasi menggunakan template (`socket.on("LocationMessage")`).

---

## 7. Perbandingan Perintah Eksekusi: `npm run start` vs `npm run dev`

Kedua perintah ini memiliki karakteristik berbeda untuk menjalankan aplikasi.

### `npm run start`

- **Eksekusi:** `node src/index.js`.
- **Karakteristik:** Menjalankan server tanpa monitoring perubahan file. Perlu restart manual jika ada perubahan kode.
- **Penggunaan:** Environment produksi atau testing final.

### `npm run dev`

- **Eksekusi:** `nodemon src/index.js`.
- **Karakteristik:** Menggunakan **nodemon** yang otomatis me-restart server setiap kali mendeteksi perubahan file.
- **Penggunaan:** Environment development untuk mempercepat proses coding dan testing.

---

## 8. Metode Socket Lainnya dalam Aplikasi

Selain `socket.on`, aplikasi menggunakan beberapa metode socket penting lainnya.

| Metode Socket             | Lokasi Penggunaan | Fungsi                                                                  |
| :------------------------ | :---------------- | :---------------------------------------------------------------------- |
| `socket.emit()`           | Client & Server   | Mengirim event ke pihak lawan (client ke server atau sebaliknya).       |
| `socket.broadcast.emit()` | Server            | Mengirim event ke semua client selain pengirim.                         |
| `socket.join()`           | Server            | Menambahkan socket pengguna ke dalam room spesifik.                     |
| `io.to().emit()`          | Server            | Broadcasting event khusus ke semua anggota dalam room tertentu.         |
| `socket.on("disconnect")` | Server            | Menangani event saat pengguna terputus dari server (menutup browser).   |

---

## 9. Implementasi Konsep Real-time Bidirectional Event-based Communication

Penjelasan tentang konsep komunikasi dua arah yang diimplementasikan dalam aplikasi chat ini.

- **Komunikasi Dua Arah:** Client dan server dapat saling bertukar data secara langsung tanpa memerlukan refresh halaman (berbeda dengan HTTP request konvensional).
- **Berbasis Event:** Komunikasi terjadi berdasarkan event spesifik seperti `join`, `pesan`, atau `kirimLokasi`.

**Penerapan dalam Kode:**

1. **Client Mengirim Data:**
   - `socket.emit("kirimPesan", ...)`
   - `socket.emit("join", ...)`
   
2. **Server Memproses dan Merespons:**
   - `socket.on("kirimPesan", ...)`
   - `io.to(user.room).emit("pesan", ...)`
   
3. **Client Menerima dan Memperbarui UI:**
   - `socket.on("pesan", ...)`
   - `socket.on("roomData", ...)`

Konsep ini memungkinkan pengalaman chat yang responsif dan real-time tanpa delay.
