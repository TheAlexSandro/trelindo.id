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

const barcodeInput = document.getElementById("barcodeInput");
const resultDiv = document.getElementById("result");

function simpanTransaksi(kode, status) {
  const riwayat = JSON.parse(localStorage.getItem("riwayatTransaksi")) || [];
  riwayat.unshift({
    kode: kode,
    status: status,
    waktu: new Date().toISOString(),
  });

  localStorage.setItem("riwayatTransaksi", JSON.stringify(riwayat));
}--

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
      return;
    }

    simpanTransaksi(kodeScan, "Berhasil");
    window.location.href = `detail.html?kode=${kodeScan}`;

    barcodeInput.value = "";
  }
});
