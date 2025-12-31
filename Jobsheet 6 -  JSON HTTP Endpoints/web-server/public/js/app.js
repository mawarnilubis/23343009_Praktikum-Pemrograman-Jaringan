window.addEventListener('DOMContentLoaded', () => {
    const weatherform = document.querySelector('form');
    const search = document.querySelector('input');
    const pesanSatu = document.querySelector('#pesan-1');
    const pesanDua = document.querySelector('#pesan-2');
    
    // pesanSatu.textContent = 'From Javascript';
    
    weatherform.addEventListener('submit', async (e) => {
        e.preventDefault();
        const location = search.value;
    
        pesanSatu.textContent = 'Sedang mencari lokasi...';
        pesanDua.textContent = '';
    
            try {
                const response = await fetch(`http://localhost:4000/infoCuaca?address=${location}`);
                const data = await response.json();

                if (data.err) pesanSatu.textContent = data.err;
                else {
                    pesanSatu.textContent = data.lokasi;
                    pesanDua.textContent = data.prediksiCuaca;
                }
            } catch (error) {
                pesanSatu.textContent = 'Terjadi kesalahan. Tidak dapat mengambil data.';
                pesanDua.textContent = '';
                console.error(error);
            }
    });
});