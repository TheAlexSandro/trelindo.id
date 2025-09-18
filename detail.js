// File: detail.js

// Database tiket harus ada di sini juga agar bisa mencari data
const databaseTiket = [
    {
        kode_booking: "8997218380432",
        nama_penumpang: "Budi Santoso",
        kereta_api: "Argo Bromo Anggrek",
        tujuan_asal: "Surabaya",
        tujuan_akhir: "Jakarta",
        jam_berangkat: "08:00",
        jam_tiba: "17:30",
        jumlah_penumpang: "1 Dewasa",
    },
    {
        kode_booking: "8998866632287",
        nama_penumpang: "Citra Lestari",
        kereta_api: "Taksaka",
        tujuan_asal: "Yogyakarta",
        tujuan_akhir: "Jakarta",
        jam_berangkat: "09:15",
        jam_tiba: "16:45",
        jumlah_penumpang: "2 Dewasa",
    },
];

window.onload = function() {
    const detailCard = document.getElementById('detail-tiket-card');
    
    // Ambil parameter 'kode' dari URL
    const params = new URLSearchParams(window.location.search);
    const kodeTiket = params.get('kode');

    if (!kodeTiket) {
        detailCard.innerHTML = "<h2>Error: Kode tiket tidak ditemukan.</h2>";
        return;
    }

    // Cari tiket di database
    const tiket = databaseTiket.find(t => t.kode_booking === kodeTiket);

    if (tiket) {
        // Jika tiket ditemukan, tampilkan detailnya
        detailCard.innerHTML = 
            `<div class="ticket-header-success">
                <i class="fa-solid fa-circle-check"></i>
                <h2>Validasi Berhasil</h2>
            </div>
            <div class="ticket-info">
                <div class="tujuan">
                    <span>${tiket.tujuan_asal}</span>
                    <i class="fa-solid fa-arrow-right"></i>
                    <span>${tiket.tujuan_akhir}</span>
                </div>
                <div class="detail-item">
                    <span><i class="fa-solid fa-train"></i> Kereta Api</span>
                    <strong>${tiket.kereta_api}</strong>
                </div>
                <div class="detail-item">
                    <span><i class="fa-solid fa-calendar-day"></i> Jadwal</span>
                    <strong>${tiket.jam_berangkat} - ${tiket.jam_tiba}</strong>
                </div>
                <div class="detail-item">
                    <span><i class="fa-solid fa-user"></i> Penumpang</span>
                    <strong>${tiket.nama_penumpang} (${tiket.jumlah_penumpang})</strong>
                </div>
                <div class="detail-item">
                    <span><i class="fa-solid fa-barcode"></i> Kode Booking</span>
                    <strong>${tiket.kode_booking}</strong>
                </div>
            </div>`
        ;
    } else {
        // Jika kode di URL tidak valid
        detailCard.innerHTML = 
            `<div class="ticket-header-fail">
                <i class="fa-solid fa-circle-xmark"></i>
                <h2>Tiket Tidak Valid</h2>
                <p>Kode booking <strong>${kodeTiket}</strong> tidak ditemukan.</p>
            </div>`
        ;
    }
};

// Tambahkan sedikit CSS di style.css untuk styling halaman detail
/* Buka file style.css dan tambahkan kode di bawah ini di bagian paling akhir */