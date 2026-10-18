export interface EducationArticle {
  slug: string;
  title: string;
  shortDescription: string;
  readTime: string;
  category: string;
  imageUrl: string;
  imageAlt: string;
  imageCaption: string;
  reviewDate: string;
  summaryPoints: string[];
  content: {
    intro: string;
    sections: {
      heading: string;
      body: string[];
      listItems?: string[];
      callout?: {
        type: "warning" | "tip" | "info";
        title: string;
        message: string;
      };
    }[];
    practicalTips: string[];
  };
  references: {
    title: string;
    organization: string;
    url?: string;
  }[];
  relatedSlugs: string[];
}

export const EDUCATION_ARTICLES: EducationArticle[] = [
  {
    slug: "tanda-tanda-makanan-mulai-basi",
    title: "Tanda-Tanda Makanan Mulai Basi",
    shortDescription: "Kenali perubahan sensorik fisik seperti aroma, tekstur, dan pembentukan gas tanpa membahayakan kesehatan Anda.",
    readTime: "4 menit baca",
    category: "Identifikasi & Keamanan",
    imageUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Sayuran dan bahan makanan segar di atas meja dapur",
    imageCaption: "Mengenali tanda fisik pembusukan penting untuk mencegah konsumsi makanan rusak.",
    reviewDate: "19 Oktober 2026",
    summaryPoints: [
      "Perubahan aroma, tekstur lembek/berlendir, dan gas adalah indikator utama pembusukan.",
      "Makanan berbahaya tidak selalu menunjukkan perubahan fisik yang tampak atau tercium.",
      "Jangan pernah mencicipi makanan untuk memastikan apakah makanan masih aman.",
    ],
    content: {
      intro:
        "Mengetahui kondisi bahan makanan sebelum dikonsumsi merupakan langkah utama dalam menjaga kesehatan keluarga. Pembusukan makanan terjadi akibat aktivitas mikrobiologis dan reaksi biokimia alami yang dapat mengubah kualitas fisik maupun rasa makanan.",
      sections: [
        {
          heading: "1. Perubahan Aroma (Bau Tak Sedap)",
          body: [
            "Aroma masam, tengik, apak, atau bau sulfur menyengat merupakan sinyal kuat bahwa bakteri pembusuk atau ragi telah berkembang biak. Pembentukan senyawa organik volatil (VOC) selama perombakan protein dan lemak menghasilkan aroma yang khas pada makanan basi."
          ],
          callout: {
            type: "warning",
            title: "Peringatan Keamanan",
            message: "Jangan pernah mencicipi makanan yang aromanya meragukan hanya untuk memastikan keamanannya. Menelan sejumlah kecil toksin bakteri dapat memicu keracunan makanan."
          }
        },
        {
          heading: "2. Perubahan Tekstur dan Lendir",
          body: [
            "Lapisan tipis lendir yang licin pada permukaan daging, unggas, tahu, atau sisa masakan olahan menandakan populasi bakteri telah mencapai tahap tinggi. Kehilangan elastisitas alami dan tekstur yang menjadi sangat lembek atau berair juga merupakan tanda kerusakan jaringan makanan."
          ]
        },
        {
          heading: "3. Perubahan Warna dan Timbulnya Jamur",
          body: [
            "Warna yang memudar, munculnya bintik kehijauan, kehitaman, atau lapisan keputihan seperti beludru menandakan koloni jamur atau jamur kapang. Jamur memiliki struktur hifa yang dapat menembus jauh ke dalam lapisan makanan lembut, bukan hanya di permukaannya."
          ]
        },
        {
          heading: "4. Pembentukan Gas dan Kemasan Menggembung",
          body: [
            "Bakteri anaerob dan ragi memproduksi gas karbon dioksida selama metabolisme fermentasi pembusukan. Jika wadah tertutup atau kemasan tampak menggembung dan mengeluarkan desisan gas berbau tajam saat dibuka, makanan tersebut sudah tidak layak konsumsi."
          ]
        },
        {
          heading: "5. Bahaya Tak Kasat Mata: Patogen Tanpa Tanda Fisik",
          body: [
            "Penting untuk dipahami bahwa bakteri patogen berbahaya seperti Salmonella, E. coli, dan Listeria dapat berkembang biak tanpa menghasilkan bau busuk, lendir, atau perubahan rasa yang nyata. Oleh karena itu, kepatuhan terhadap durasi dan suhu penyimpanan jauh lebih andal daripada sekadar penilaian fisik."
          ]
        }
      ],
      practicalTips: [
        "Terapkan aturan praktis: Bila ragu, buang makanan tersebut (When in doubt, throw it out).",
        "Gunakan indra penciuman dan penglihatan dari jarak aman tanpa menghirup spora jamur secara langsung.",
        "Jangan memotong bagian berjamur dari makanan bertekstur lunak (seperti roti atau saus) lalu memakan sisanya.",
        "Catat tanggal pembuatan atau penyimpanan pada setiap wadah makanan di lemari es."
      ]
    },
    references: [
      {
        title: "Pedoman Pengolahan dan Penyimpanan Pangan Rumah Tangga",
        organization: "Badan Pengawas Obat dan Makanan (BPOM) RI",
      },
      {
        title: "Food Safety Basics: Signs of Spoilage",
        organization: "World Health Organization (WHO)",
      },
      {
        title: "FoodKeeper App and Guidelines",
        organization: "United States Department of Agriculture (USDA)",
      }
    ],
    relatedSlugs: ["mengapa-makanan-bisa-basi", "cara-menyimpan-makanan-matang-dengan-benar"]
  },
  {
    slug: "cara-menyimpan-makanan-matang-dengan-benar",
    title: "Cara Menyimpan Makanan Matang dengan Benar",
    shortDescription: "Panduan praktis menjaga suhu penyimpanan, pemilihan wadah tertutup, dan teknik pendinginan cepat untuk hidangan siap santap.",
    readTime: "5 menit baca",
    category: "Panduan Penyimpanan",
    imageUrl: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Makanan matang tersusun rapi di wadah kaca tertutup di dalam kulkas",
    imageCaption: "Wadah tertutup dan pembagian porsi dangkal mempercepat proses pendinginan aman.",
    reviewDate: "19 Oktober 2026",
    summaryPoints: [
      "Jangan biarkan makanan matang pada suhu ruang lebih dari 2 jam (atau 1 jam jika suhu di atas 32 derajat Celcius).",
      "Gunakan wadah bersih, tertutup rapat, dan bertingkat dangkal untuk mempercepat pendinginan.",
      "Pertahankan suhu kulkas di bawah 4 derajat Celcius dan freezer sekitar -18 derajat Celcius.",
    ],
    content: {
      intro:
        "Menyimpan makanan matang dengan benar merupakan pertahanan paling efektif terhadap pertumbuhan mikroba penyebab penyakit. Memahami dinamika suhu dan kelembapan lemari pendingin dapat memperpanjang masa kesegaran sekaligus mencegah keracunan makanan.",
      sections: [
        {
          heading: "Aturan Dua Jam (The 2-Hour Rule)",
          body: [
            "Bakteri berkembang biak paling cepat pada zona bahaya suhu (Danger Zone) antara 5 derajat Celcius hingga 60 derajat Celcius. Pada rentang ini, jumlah sel bakteri dapat berlipat ganda setiap 20 menit.",
            "Segera masukkan makanan matang ke dalam lemari pendingin dalam waktu maksimal 2 jam setelah selesai dimasak. Jika suhu ruangan tergolong panas (di atas 32 derajat Celcius), batas waktu pendinginan diperketat menjadi maksimal 1 jam."
          ],
          callout: {
            type: "warning",
            title: "Zona Bahaya Suhu",
            message: "Membiarkan makanan mendingin semalaman di atas kompor atau meja makan adalah penyebab utama kontaminasi bakteri toksigenik seperti Bacillus cereus."
          }
        },
        {
          heading: "Teknik Pendinginan Cepat dengan Wadah Dangkal",
          body: [
            "Menaruh panci besar berisi kuah panas langsung ke kulkas dapat menaikkan suhu internal kulkas dan memicu pemanasan makanan di sekitarnya.",
            "Bagi masakan berkuah, nasi, atau semur ke dalam beberapa wadah dangkal bersih (kedalaman kurang dari 5 cm). Luas permukaan yang lebih besar memungkinkan pelepasan panas secara merata dan cepat."
          ]
        },
        {
          heading: "Pengaturan Suhu Lemari Pendingin",
          body: [
            "Pastikan kompartemen pendingin utama (chiller) stabil pada suhu 4 derajat Celcius atau lebih rendah.",
            "Untuk pembekuan jangka panjang, pastikan kompartemen freezer beroperasi pada suhu -18 derajat Celcius atau lebih dingin. Periksa karet penutup pintu kulkas secara berkala untuk menjaga stabilitas suhu."
          ]
        },
        {
          heading: "Mencegah Kontaminasi Silang",
          body: [
            "Simpan makanan matang di rak bagian atas lemari es, jauh di atas daging mentah, ikan, atau unggas yang belum diolah.",
            "Pastikan semua wadah tertutup rapat menggunakan penutup kedap udara atau lapisan pembungkus yang aman untuk pangan (food grade)."
          ]
        }
      ],
      practicalTips: [
        "Gunakan termometer kulkas independen untuk memantau suhu lemari pendingin secara akurat.",
        "Jangan menumpuk wadah terlalu padat agar sirkulasi udara dingin di dalam kulkas tetap lancar.",
        "Beri label nama masakan dan tanggal penyimpanan pada penutup wadah.",
        "Hangatkan kembali sisa makanan hingga mencapai suhu internal minimal 74 derajat Celcius sebelum disajikan kembali."
      ]
    },
    references: [
      {
        title: "Pedoman Keamanan Pangan Bagi Pengolah Makanan Rumah Tangga",
        organization: "Direktorat Standarisasi Pangan Olahan BPOM",
      },
      {
        title: "Refrigeration and Food Safety Guidance",
        organization: "USDA Food Safety and Inspection Service",
      }
    ],
    relatedSlugs: ["berapa-lama-sisa-makanan-dapat-disimpan", "mengapa-makanan-bisa-basi"]
  },
  {
    slug: "berapa-lama-sisa-makanan-dapat-disimpan",
    title: "Berapa Lama Sisa Makanan Dapat Disimpan?",
    shortDescription: "Tinjauan estimasi durasi aman penyimpanan berbagai kelompok hidangan matang di chiller dan freezer berstandar.",
    readTime: "4 menit baca",
    category: "Durasi & Batas Waktu",
    imageUrl: "https://images.unsplash.com/photo-1547496502-affa22d38842?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Berbagai wadah penyimpanan makanan berlabel tanggal di rak pendingin",
    imageCaption: "Pemberian label tanggal masuk lemari pendingin memudahkan pemantauan durasi aman.",
    reviewDate: "19 Oktober 2026",
    summaryPoints: [
      "Sebagian besar makanan matang dapat bertahan 3 hingga 4 hari di lemari pendingin suhu 4 derajat Celcius.",
      "Durasi penyimpanan bergantung erat pada jenis makanan, kadar air, kandungan asam, dan higienitas penanganan.",
      "Pembekuan pada suhu -18 derajat Celcius menghentikan pertumbuhan mikroba namun dapat mempengaruhi tekstur seiring waktu.",
    ],
    content: {
      intro:
        "Banyak orang bingung menentukan apakah sisa makanan beberapa hari lalu masih layak dikonsumsi. Memahami tabel pedoman waktu penyimpanan membantu Anda meminimalkan pemborosan makanan (food waste) tanpa mengorbankan keselamatan pencernaan.",
      sections: [
        {
          heading: "Pedoman Umum: Aturan 3 Hingga 4 Hari",
          body: [
            "Secara umum, makanan matang yang disimpan dalam wadah tertutup pada suhu 4 derajat Celcius atau lebih rendah aman dikonsumsi dalam kurun waktu 3 sampai 4 hari.",
            "Setelah hari keempat, risiko pertumbuhan mikroorganisme patogen pembawa penyakit meningkat pesat, meskipun aroma dan penampilan makanan mungkin tampak belum berubah drastis."
          ]
        },
        {
          heading: "Tabel Estimasi Berdasarkan Kelompok Makanan",
          body: [
            "Nasi matang: 2 sampai 3 hari di chiller (karena spora Bacillus cereus tahan terhadap pemanasan awal).",
            "Sayuran berkuah dan tumisan: 2 sampai 3 hari di chiller.",
            "Olahan daging ayam, sapi, dan ikan matang: 3 sampai 4 hari di chiller; 2 sampai 6 bulan di freezer.",
            "Sup dan kuah kental: 3 sampai 4 hari di chiller; 2 sampai 3 bulan di freezer."
          ],
          callout: {
            type: "info",
            title: "Pengaruh Asam dan Gula",
            message: "Masakan dengan kadar asam tinggi seperti sayur asam atau makanan dengan kadar rempah dan garam pekat cenderung memiliki stabilitas mikrobiologis sedikit lebih lama, namun tetap harus diperlakukan secara hati-hati."
          }
        },
        {
          heading: "Kapan Makanan Harus Dibuang?",
          body: [
            "Buang sisa makanan jika telah berada di suhu ruang lebih dari batas aman, jika terdapat lendir atau bau yang tidak wajar, atau jika Anda ragu kapan makanan tersebut pertama kali dimasak.",
            "Jangan pernah memperpanjang batas konsumsi makanan dengan memanaskannya berulang kali setiap hari."
          ]
        }
      ],
      practicalTips: [
        "Selalu gunakan prinsip FIFO (First In, First Out) dalam mengelola isi kulkas.",
        "Bekukan makanan pada hari pertama jika Anda sudah mengetahui makanan tersebut tidak akan dihabiskan dalam 2 hari ke depan.",
        "Hanya ambil porsi yang hendak dimakan dan hangatkan secukupnya untuk menghindari pemanasan sisa berkali-kali."
      ]
    },
    references: [
      {
        title: "Leftovers and Food Safety: How long can you keep leftovers?",
        organization: "USDA Food Safety Inspection Service",
      },
      {
        title: "Pencegahan Keracunan Pangan Akibat Bakteri Bacillus Cereus",
        organization: "Pusat Riset Mikrobiologi Terapan BRIN / BPOM",
      }
    ],
    relatedSlugs: ["cara-menyimpan-makanan-matang-dengan-benar", "tanda-tanda-makanan-mulai-basi"]
  },
  {
    slug: "mengapa-makanan-bisa-basi",
    title: "Mengapa Makanan Bisa Basi?",
    shortDescription: "Eksplorasi faktor mikrobiologis, enzimatis, oksidasi lemak, kelembapan, dan suhu lingkungan yang memicu dekomposisi bahan pangan.",
    readTime: "5 menit baca",
    category: "Sains Pangan",
    imageUrl: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Proses biokimia pada bahan pangan alami dengan mikroskop latar",
    imageCaption: "Interaksi antara mikroba, enzim endogen, dan oksigen merupakan pemicu utama pembusukan.",
    reviewDate: "19 Oktober 2026",
    summaryPoints: [
      "Mikroorganisme (bakteri, kapang, khamir) mendegradasi nutrisi makanan menjadi senyawa metabolit berbau busuk.",
      "Enzim endogen alami dalam jaringan makanan terus aktif dan memecah protein serta karbohidrat.",
      "Oksidasi lemak menghasilkan senyawa radikal dan keton yang menyebabkan aroma tengik.",
    ],
    content: {
      intro:
        "Pembusukan pangan adalah proses dekomposisi alami yang tidak terelakkan dalam siklus organik. Namun, dengan memahami faktor-faktor penentunya, kita dapat mengendalikan laju kerusakan tersebut secara signifikan.",
      sections: [
        {
          heading: "1. Peran Mikroorganisme (Bakteri, Jamur, Ragi)",
          body: [
            "Mikroorganisme membutuhkan nutrisi, air, kehangatan, dan waktu untuk berkembang biak. Bakteri pembusuk mencerna protein, karbohidrat, dan lemak pada makanan menjadi senyawa sederhana.",
            "Proses metabolisme bakteri menghasilkan produk sampingan seperti asam organik, amonia, senyawa belerang (hidrogen sulfida), dan berbagai senyawa volatil lainnya yang kita kenali sebagai bau busuk."
          ]
        },
        {
          heading: "2. Aktivitas Enzimatis Endogen",
          body: [
            "Semua bahan pangan segar membawa enzim biologis alami di dalam jaringannya. Setelah bahan dipanen atau disembelih, enzim tersebut tetap bekerja menguraikan struktur sel.",
            "Sebagai contoh, enzim pektinase pada buah memecah dinding sel sehingga buah melunak dan menjadi lembek secara progresif."
          ]
        },
        {
          heading: "3. Reaksi Kimia dan Oksidasi",
          body: [
            "Kontak antara lemak tak jenuh dengan oksigen di udara memicu reaksi autooksidasi yang menghasilkan senyawa aldehida dan keton. Ini adalah biang keladi bau tengik pada makanan berminyak atau berlemak tinggi.",
            "Oksidasi juga memicu perubahan warna menjadi kecokelatan pada potongan buah apel atau kentang yang dibiarkan terbuka."
          ]
        },
        {
          heading: "4. Faktor Lingkungan: Suhu dan Aktivitas Air (Aw)",
          body: [
            "Air bebas dalam makanan (water activity) menentukan seberapa mudah mikroorganisme dapat bertumbuh. Makanan basah seperti nasi atau sayur berkuah jauh lebih cepat basi dibandingkan biskuit kering.",
            "Suhu lingkungan yang hangat mempercepat laju reaksi kimia dan pembelahan sel mikroba secara eksponensial."
          ]
        }
      ],
      practicalTips: [
        "Kurangi kelembapan berlebih pada wadah dengan menggunakan tisu dapur kering di dasar kotak sayuran.",
        "Kombinasikan kontrol suhu dingin dengan penutupan kedap udara untuk meminimalkan paparan oksigen.",
        "Pahami bahwa setiap tipe makanan memiliki laju pembusukan unik tergantung komposisi nutrisi dan nilai aktivitas airnya."
      ]
    },
    references: [
      {
        title: "Prinsip Dasar Mikrobiologi dan Kerusakan Bahan Pangan",
        organization: "Departemen Ilmu dan Teknologi Pangan IPB",
      },
      {
        title: "Food Spoilage and Preservation Mechanisms",
        organization: "Food and Agriculture Organization (FAO)",
      }
    ],
    relatedSlugs: ["memahami-hasil-sensor-ph-dan-voc", "tanda-tanda-makanan-mulai-basi"]
  },
  {
    slug: "memahami-hasil-sensor-ph-dan-voc",
    title: "Memahami Hasil Sensor pH, VOC, dan Alat FRESHGUARD AI",
    shortDescription: "Pelajari cara kerja alat FRESHGUARD AI berbasis mikrokontroler ESP32-S3, sensor pH & VOC, serta model AI Random Forest dalam mendeteksi kesegaran makanan.",
    readTime: "5 menit baca",
    category: "Teknologi & AI",
    imageUrl: "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Pengukuran sensor laboratorium dan pemrosesan komputasi digital",
    imageCaption: "Alat FRESHGUARD AI memadukan mikrokontroler ESP32-S3, sensor pH dan VOC, serta model AI Random Forest.",
    reviewDate: "19 Oktober 2026",
    summaryPoints: [
      "Alat FRESHGUARD AI menggunakan mikrokontroler ESP32-S3 untuk membaca data sensor pH dan VOC secara presisi.",
      "Data pembacaan sensor dimasukkan ke model Machine Learning Random Forest untuk mengklasifikasikan kesegaran makanan (Segar atau Basi).",
      "Hasil klasifikasi dan nilai pengukuran langsung dikirimkan secara otomatis ke Firebase Realtime Database.",
    ],
    content: {
      intro:
        "Perangkat FRESHGUARD AI dirancang khusus untuk mendeteksi pembusukan makanan secara objektif dan otomatis. Dengan memanfaatkan mikrokontroler ESP32-S3, probe sensor pH, sensor gas Volatile Organic Compounds (VOC), dan kecerdasan buatan model Random Forest, alat ini mampu memberikan hasil deteksi kondisi makanan secara real-time.",
      sections: [
        {
          heading: "1. Arsitektur Alat FRESHGUARD AI Berbasis ESP32-S3",
          body: [
            "Perangkat keras FRESHGUARD AI ditenagai oleh mikrokontroler ESP32-S3 yang memiliki performa komputasi tinggi serta konektivitas nirkabel Wi-Fi yang stabil.",
            "ESP32-S3 bertugas mengontrol proses akuisisi sinyal analog dari sensor pH dan sensor VOC, melakukan pra-pemrosesan data, serta menjalankan atau menghubungkan data ke inferensi model kecerdasan buatan."
          ],
          callout: {
            type: "info",
            title: "Peran ESP32-S3",
            message: "Mikrokontroler ESP32-S3 memproses pembacaan sensor secara langsung dan mengunggah hasil klasifikasi ke Firebase Realtime Database secara instan."
          }
        },
        {
          heading: "2. Fungsi Sensor pH dalam Pengujian Makanan",
          body: [
            "Sensor pH mengukur konsentrasi ion hidrogen untuk menentukan tingkat keasaman atau kebasaan pada sampel makanan.",
            "Saat makanan mulai membusuk oleh aktivitas bakteri asam laktat atau fermentasi karbohidrat, nilai pH umumnya mengalami penurunan (menjadi lebih asam). Sebaliknya, pada bahan pangan berprotein tinggi seperti daging atau ikan, pelepasan senyawa amina dapat menaikkan nilai pH.",
            "Perubahan nilai pH ini menjadi salah satu fitur kunci yang diolah oleh model AI untuk mengenali tanda awal dekomposisi."
          ]
        },
        {
          heading: "3. Fungsi Sensor VOC (Volatile Organic Compounds)",
          body: [
            "Sensor gas VOC mendeteksi partikel senyawa organik volatil yang menguap ke udara di sekitar wadah makanan.",
            "Selama proses pembusukan, mikroorganisme menghasilkan berbagai metabolit gas seperti etanol, aseton, ester, senyawa sulfur, dan amonia. Sensor gas mengubah konsentrasi molekul-molekul gas ini menjadi nilai hambatan listrik yang terbaca sebagai nilai numerik VOC.",
            "Kombinasi nilai VOC yang meningkat bersamaan dengan pergeseran pH memberikan indikasi kuat mengenai kondisi keutuhan makanan."
          ]
        },
        {
          heading: "4. Klasifikasi Cerdas dengan Model AI Random Forest",
          body: [
            "Data pH dan VOC yang diambil dari sensor tidak hanya dilihat sebagai angka mentah, melainkan dimasukkan ke dalam model kecerdasan buatan Random Forest.",
            "Random Forest adalah algoritma Machine Learning berbasis ensemble learning yang menggabungkan banyak pohon keputusan (decision trees) untuk menghasilkan prediksi dengan tingkat akurasi tinggi dan ketahanan terhadap noise sensor.",
            "Model Random Forest memetakan pola hubungan non-linear antara pH, VOC, dan tipe makanan untuk menghasilkan keputusan klasifikasi akhir apakah makanan berstatus 'Segar' atau 'Basi'."
          ]
        },
        {
          heading: "5. Sinkronisasi Data Otomatis ke Firebase Realtime Database",
          body: [
            "Setelah model Random Forest selesai melakukan inferensi, ESP32-S3 langsung mengirimkan paket data yang berisi status label (Segar/Basi), nilai pH, nilai VOC, dan tipe makanan ke Firebase Realtime Database.",
            "Website FRESHGUARD AI mendeteksi penambahan data ini secara langsung (real-time listener) dan seketika memperbarui tampilan dasbor pengguna tanpa perlu me-refresh halaman."
          ]
        }
      ],
      practicalTips: [
        "Pastikan probe sensor dibersihkan dengan air steril dan dikeringkan secara perlahan sebelum pengujian sampel berikutnya.",
        "Posisikan sensor gas VOC pada jarak yang stabil di atas sampel makanan agar penyerapan uap gas konsisten.",
        "Perhatikan indikator koneksi di website untuk memastikan perangkat ESP32-S3 dan website terhubung dengan lancar ke Firebase."
      ]
    },
    references: [
      {
        title: "Random Forest Classifier for Food Freshness Detection Using Electronic Nose",
        organization: "IEEE Sensors Journal",
      },
      {
        title: "ESP32-S3 Technical Reference and IoT Sensor Integration",
        organization: "Espressif Systems Documentation",
      },
      {
        title: "Application of pH and Gas Sensors in Smart Food Packaging Systems",
        organization: "Journal of Food Engineering",
      }
    ],
    relatedSlugs: ["tanda-tanda-makanan-mulai-basi", "mengapa-makanan-bisa-basi"]
  }
];

export function getEducationArticleBySlug(slug: string): EducationArticle | undefined {
  return EDUCATION_ARTICLES.find((article) => article.slug === slug);
}

export function getRelatedArticles(currentSlug: string): EducationArticle[] {
  const current = getEducationArticleBySlug(currentSlug);
  if (!current) return EDUCATION_ARTICLES.slice(0, 2);
  return current.relatedSlugs
    .map((slug) => getEducationArticleBySlug(slug))
    .filter((a): a is EducationArticle => a !== undefined);
}
