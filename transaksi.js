window.onload = function() {
    const riwayatContainer = document.getElementById('riwayat-list');
    const riwayat = JSON.parse(localStorage.getItem('riwayatTransaksi')) || [];

    if (riwayat.length === 0) {
        riwayatContainer.innerHTML = '<p style="text-align: center; color: #777;">Belum ada riwayat transaksi.</p>';
        return;
    }

    let html = '<ul>';
    riwayat.forEach(item => {
        const waktu = new Date(item.waktu).toLocaleString('id-ID');
        if (item.status === 'Berhasil') {
            html += 
                `<li class="riwayat-item berhasil">
                    <span class="status">BERHASIL</span>
                    <span class="kode">Kode: <strong>${item.kode}</strong></span>
                    <span class="waktu">${waktu}</span>
                    <a href="detail.html?kode=${item.kode}" class="lihat-detail">Lihat Detail</a>
                </li>`
            ;
        } else {
            html += 
                `<li class="riwayat-item gagal">
                    <span class="status">GAGAL</span>
                    <span class="kode">Kode: <strong>${item.kode}</strong></span>
                    <span class="waktu">${waktu}</span>
                </li>`
            ;
        }
    });
    html += '</ul>';

    riwayatContainer.innerHTML = html;
};


// Tambahkan sedikit CSS di style.css untuk styling halaman transaksi
/* Buka file style.css dan tambahkan kode di bawah ini di bagian paling akhir */