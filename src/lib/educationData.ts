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
    title: "Memahami Hasil Sensor pH dan VOC",
    shortDescription: "Penjelasan ilmiah cara kerja parameter pH dan sensor VOC pada perangkat pendeteksi kesegaran makanan serta batasannya.",
    readTime: "5 menit baca",
    category: "Teknologi Sensor",
    imageUrl: "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Pengukuran sensor laboratorium dan antarmuka analitik digital",
    imageCaption: "Sensor fisik memberikan indikasi pembacaan parameter kimiawi di sekitar sampel makanan.",
    reviewDate: "19 Oktober 2026",
    summaryPoints: [
      "Nilai pH mencerminkan tingkat keasaman atau kebasaan yang dapat bergeser selama aktivitas mikroba.",
      "Sensor VOC mendeteksi konsentrasi gas organik volatil yang teruapkan dari pembusukan bahan pangan.",
      "Hasil pembacaan sensor adalah indikator teknis klasifikasi perangkat, bukan jaminan mutlak ketiadaan patogen berbahaya.",
    ],
    content: {
      intro:
        "Perangkat FRESHGUARD AI memanfaatkan kombinasi probe pengukur pH dan sensor gas Volatile Organic Compounds (VOC) untuk memantau perubahan kimiawi pada sampel makanan. Memahami arti angka-angka ini membantu Anda menafsirkan data deteksi dengan bijak.",
      sections: [
        {
          heading: "1. Apa yang Diukur oleh Nilai pH?",
          body: [
            "pH (potensial Hidrogen) adalah skala logaritmik dari 0 hingga 14 yang menunjukkan keasaman atau kebasaan suatu bahan. Angka 7 bersifat netral, angka di bawah 7 bersifat asam, dan di atas 7 bersifat basa.",
            "Pada makanan seperti nasi atau susu, fermentasi asam laktat oleh bakteri dapat menurunkan nilai pH (membuatnya lebih asam). Sebaliknya, pada pembusukan daging atau ikan yang kaya protein, pelepasan amonia dan amina dapat menaikkan nilai pH menjadi lebih basa."
          ]
        },
        {
          heading: "2. Apa itu VOC (Volatile Organic Compounds)?",
          body: [
            "VOC adalah senyawa kimia berbasis karbon yang mudah menguap ke udara pada suhu ruangan. Ketika mikroba menguraikan karbohidrat dan protein pada makanan, berbagai gas seperti etanol, aseton, trimetilamina, dan senyawa sulfur dilepaskan.",
            "Sensor gas logam oksida (MOS) pada perangkat mendeteksi perubahan resistansi listrik saat berinteraksi dengan molekul gas tersebut, lalu menghasilkan nilai numerik konsentrasi VOC."
          ]
        },
        {
          heading: "3. Faktor yang Mempengaruhi Pembacaan Sensor",
          body: [
            "Jenis bahan makanan: Setiap hidangan memiliki matriks kimiawi awal yang berbeda. Misalnya, sayur asam secara alami memiliki pH rendah (3.5 - 4.5) tanpa berarti makanan tersebut rusak.",
            "Kondisi lingkungan: Suhu ruangan, kelembapan relatif, dan sirkulasi udara dapat mempengaruhi sensitivitas sensor gas VOC.",
            "Jarak dan posisi probe: Jarak sensor dari permukaan makanan serta waktu kontak mempengaruhi stabilitas angka yang terbaca.",
            "Kalibrasi perangkat: Drift sensor dari waktu ke waktu membutuhkan kalibrasi berkala agar tetap akurat."
          ]
        },
        {
          heading: "4. Batasan Kritis: Pembacaan Sensor vs Keamanan Pangan",
          body: [
            "Nilai sensor dan label 'Segar' yang dihasilkan adalah hasil inferensi komputasi dari parameter terbatas. Sensor tidak dapat menguji keberadaan spora botulisme, enterotoksin stafilokokus, pestisida, atau virus bawaan pangan.",
            "Oleh karena itu, jangan pernah menjadikan hasil deteksi sensor sebagai jaminan tunggal bahwa makanan aman untuk dikonsumsi bila penanganan makanan sebelumnya tidak memenuhi standar kebersihan."
          ],
          callout: {
            type: "warning",
            title: "Batasan Penggunaan",
            message: "Data sensor merupakan alat bantu monitoring eksperimental. Keputusan konsumsi harus selalu memprioritaskan prinsip higienitas pangan dan kehati-hatian."
          }
        }
      ],
      practicalTips: [
        "Lihat tren nilai dalam konteks tipe makanan yang sedang diperiksa, bukan membandingkan angka mutlak antar makanan yang berbeda.",
        "Pastikan probe sensor bersih dari sisa residu pengujian sebelumnya sebelum melakukan pengukuran baru.",
        "Gunakan informasi sensor sebagai pelengkap observasi fisik dan catatan durasi penyimpanan makanan."
      ]
    },
    references: [
      {
        title: "Application of Electronic Nose and MOS Sensors in Food Freshness Monitoring",
        organization: "Journal of Food Engineering & Sensors",
      },
      {
        title: "Standard Operating Procedures for Food Quality Sensor Measurements",
        organization: "International Organization for Standardization (ISO)",
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
