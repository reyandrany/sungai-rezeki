# Sungai Rezeki Sdn Bhd

Laman web Sungai Rezeki Sdn Bhd (889171-P). Slogan: **Mekanisasi Solusi Kehadapan**. Kandungan dalam Bahasa Malaysia, pejabat di Bandar Penawar, Johor.

## Stack

- [Vite](https://vite.dev/) 8
- React 19 dan TypeScript
- [React Router](https://reactrouter.com/) 7
- Tailwind CSS 4

## Jalankan

```bash
npm install
npm run dev
```

Pelayan pembangunan biasanya di `http://localhost:5173`.

| Arahan | Fungsi |
| --- | --- |
| `npm run dev` | Pelayan pembangunan |
| `npm run build` | Semak jenis, kemudian bina ke `dist/` |
| `npm run preview` | Pratonton hasil bina |
| `npm run typecheck` | Semak TypeScript tanpa bina |

## Halaman

| Laluan | Kandungan |
| --- | --- |
| `/` | Ringkasan: servis, tiga blok projek, tiga armada, logo pelanggan, alamat pejabat |
| `/tentang-kami` | Misi, visi, dan barisan peneraju |
| `/servis` | Persawitan, agrikultur, pelancongan, F&B, dan lain-lain |
| `/projek` | Daftar 105 projek, boleh ditapis |
| `/aset-kenderaan` | Sepuluh kategori kenderaan, jumlah 115 unit |
| `/anak-syarikat` | Enam entiti kumpulan, dan pelanggan di `#pelanggan` |
| `/hubungi` | Alamat pejabat dan senarai bengkel |
| `/pelanggan` | Dialihkan ke `/anak-syarikat#pelanggan` |

Laman utama lebih ringkas daripada halaman menu. Teks dan angka ada di `src/content/`.

## Foto

Foto dan logo disimpan dalam `public/` supaya laman tetap memaparkan gambar tanpa sambungan ke tapak rasmi. Fon Plus Jakarta Sans masih dimuat dari Google Fonts.

## SEO

`npm run build` menulis cangkerang HTML untuk setiap laluan:

- `dist/<laluan>/index.html`
- `dist/<laluan>.html`

Setiap fail ada tajuk, penerangan, canonical, Open Graph, dan JSON-LD sendiri. `public/sitemap.xml` dan `public/robots.txt` menyenaraikan tujuh URL. `/pelanggan` tidak masuk peta tapak kerana ia hanya lencongan.

URL kanonikal lalai ialah `https://www.sungairezeki.com.my`. Untuk domain lain semasa bina:

```bash
# Windows PowerShell
$env:VITE_SITE_URL = "https://contoh.com"
npm run build
```

Hos folder `dist/`. Pelayan perlu menghantar `index.html` untuk laluan yang tiada fail statik, supaya React Router boleh membuka halaman itu.
