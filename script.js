// File: script.js

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
  // Tambahkan data tiket lain jika perlu
];

const barcodeInput = document.getElementById("barcodeInput");
const resultDiv = document.getElementById("result");

// --- FUNGSI BARU UNTUK MENYIMPAN RIWAYAT ---
function simpanTransaksi(kode, status) {
  // Ambil data riwayat dari localStorage, jika tidak ada, buat array kosong
  const riwayat = JSON.parse(localStorage.getItem("riwayatTransaksi")) || [];

  // Tambahkan data baru
  riwayat.unshift({
    // unshift agar data baru selalu di paling atas
    kode: kode,
    status: status,
    waktu: new Date().toISOString(), // Simpan waktu scan
  });

  // Simpan kembali ke localStorage
  localStorage.setItem("riwayatTransaksi", JSON.stringify(riwayat));
}
// ---------------------------------------------

barcodeInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();

    const kodeScan = barcodeInput.value.trim();
    const tiketDitemukan = databaseTiket.find(
      (tiket) => tiket.kode_booking === kodeScan
    );
    if (!tiketDitemukan) {
      simpanTransaksi(kodeScan, "Gagal");
      resultDiv.innerHTML = `<div class="ticket invalid">
                    <h2>❌ TIKET TIDAK DITEMUKAN</h2>
                    <p>Kode <strong>${kodeScan}</strong> tidak terdaftar dalam sistem.</p>
                </div>`;
    }

    simpanTransaksi(kodeScan, "Berhasil");
    // Alihkan ke halaman detail.html sambil mengirim kode booking via URL
    window.location.href = `detail.html?kode=${kodeScan}`;

    barcodeInput.value = "";
  }
});
