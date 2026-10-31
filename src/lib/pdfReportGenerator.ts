import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { DetectionRecord } from "@/types/detection";

export interface GeneratePdfOptions {
  fileName?: string;
}

export function buildDetectionPdf(record: DetectionRecord): jsPDF {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const isFresh = record.label.toLowerCase().includes("segar");
  const isStale =
    record.label.toLowerCase().includes("basi") ||
    record.label.toLowerCase().includes("rusak") ||
    record.label.toLowerCase().includes("tidak");

  // Colors
  const brandDark: [number, number, number] = [32, 92, 54]; // #205C36
  const brandPrimary: [number, number, number] = [114, 217, 76]; // #72D94C
  const textDark: [number, number, number] = [29, 43, 33]; // #1D2B21
  const textMuted: [number, number, number] = [101, 114, 104]; // #657268

  // Header Background Bar
  doc.setFillColor(...brandDark);
  doc.rect(0, 0, 210, 36, "F");

  // Accent Line
  doc.setFillColor(...brandPrimary);
  doc.rect(0, 36, 210, 2.5, "F");

  // Header Title
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("FRESHGUARD AI", 14, 16);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(234, 248, 227);
  doc.text("LAPORAN RESMI HASIL PENGUJIAN KESEGARAN MAKANAN", 14, 23);
  doc.text("Sistem Sensor IoT ESP32-S3 & Model Klasifikasi AI Random Forest", 14, 28);

  // Report Reference in Header
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.setTextColor(255, 255, 255);
  doc.text("KODE DOKUMEN:", 196, 16, { align: "right" });
  doc.setFont("courier", "bold");
  doc.setFontSize(10);
  doc.setTextColor(...brandPrimary);
  doc.text(`RPT-${record.id}`, 196, 22, { align: "right" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(234, 248, 227);
  doc.text(`Waktu Cetak: ${new Date().toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}`, 196, 28, { align: "right" });

  // Section 1: Ringkasan Pengujian
  let currentY = 48;
  doc.setTextColor(...textDark);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("1. Informasi Sampel & Klasifikasi AI", 14, currentY);

  currentY += 4;
  autoTable(doc, {
    startY: currentY,
    theme: "grid",
    head: [["Parameter", "Keterangan"]],
    body: [
      ["ID Record Perangkat", record.id],
      ["Waktu Deteksi Sensor", record.formattedDateTime],
      ["Tipe Makanan", record.foodType],
      [
        "Hasil Klasifikasi AI",
        isFresh
          ? `${record.label.toUpperCase()} (Kondisi Kesegaran Baik)`
          : isStale
          ? `${record.label.toUpperCase()} (Terindikasi Mengalami Pembusukan)`
          : record.label,
      ],
      ["Metode Inferensi", "Machine Learning Random Forest Classifier via ESP32-S3"],
    ],
    headStyles: {
      fillColor: brandDark,
      textColor: [255, 255, 255],
      fontStyle: "bold",
      fontSize: 9,
    },
    bodyStyles: {
      textColor: textDark,
      fontSize: 8.5,
      cellPadding: 2.8,
    },
    alternateRowStyles: {
      fillColor: [247, 250, 245],
    },
    columnStyles: {
      0: { fontStyle: "bold", cellWidth: 55 },
      1: { cellWidth: 125 },
    },
    margin: { left: 14, right: 14 },
  });

  // Section 2: Hasil Pembacaan Sensor
  const table1 = doc as unknown as { lastAutoTable: { finalY: number } };
  currentY = table1.lastAutoTable.finalY + 10;
  doc.setTextColor(...textDark);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("2. Data Parameter Sensor Fisik", 14, currentY);

  currentY += 4;
  const phDisplay = record.ph !== null ? record.ph.toFixed(2) : "—";
  const vocDisplay = record.voc !== null ? `${record.voc}` : "—";
  const sulfurDisplay = record.sulfur !== null ? `${record.sulfur}` : "—";

  autoTable(doc, {
    startY: currentY,
    theme: "striped",
    head: [["Sensor", "Parameter Terukur", "Nilai Numerik", "Interpretasi Teknis"]],
    body: [
      [
        "Sensor pH (Probe Elektrode)",
        "Tingkat Keasaman (pH)",
        phDisplay,
        record.ph !== null
          ? record.ph < 6.5
            ? "Cenderung asam (potensi fermentasi asam laktat/mikroba)"
            : record.ph > 7.5
            ? "Cenderung basa (potensi pelepasan senyawa amina bebas)"
            : "Rentang keasaman normal/netral"
          : "Data tidak tersedia",
      ],
      [
        "Sensor VOC (MS1100)",
        "Senyawa Organik Volatil",
        vocDisplay,
        record.voc !== null
          ? record.voc < 50
            ? "Konsentrasi emisi gas organik volatil rendah"
            : record.voc < 120
            ? "Peningkatan emisi senyawa volatil terdeteksi"
            : "Konsentrasi gas volatil tinggi (emisi dekomposisi)"
          : "Data tidak tersedia",
      ],
      [
        "Sensor Gas Sulfur",
        "Kadar Senyawa Belerang (H2S)",
        sulfurDisplay,
        record.sulfur !== null
          ? record.sulfur < 40
            ? "Emisi gas belerang rendah (stabil)"
            : record.sulfur < 80
            ? "Peningkatan emisi gas belerang dari perombakan protein"
            : "Emisi gas sulfur tinggi (indikator kuat bau busuk)"
          : "Data tidak tersedia",
      ],
    ],
    headStyles: {
      fillColor: brandDark,
      textColor: [255, 255, 255],
      fontStyle: "bold",
      fontSize: 8.5,
    },
    bodyStyles: {
      textColor: textDark,
      fontSize: 8,
      cellPadding: 2.8,
    },
    columnStyles: {
      0: { fontStyle: "bold", cellWidth: 42 },
      1: { cellWidth: 40 },
      2: { fontStyle: "bold", cellWidth: 26, halign: "center" },
      3: { cellWidth: 72 },
    },
    margin: { left: 14, right: 14 },
  });

  // Section 3: Ringkasan Analisis AI & Evaluasi Mutu
  const table2 = doc as unknown as { lastAutoTable: { finalY: number } };
  currentY = table2.lastAutoTable.finalY + 10;
  doc.setTextColor(...textDark);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("3. Ringkasan Analisis AI & Karakteristik Sensorik", 14, currentY);

  currentY += 6;
  doc.setFillColor(247, 250, 245);
  doc.setDrawColor(227, 234, 225);
  doc.roundedRect(14, currentY, 182, 38, 3, 3, "FD");

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(...textDark);

  const analysisLines = [
    `• Berdasarkan hasil pembacaan simultan probe pH (${phDisplay}), sensor VOC MS1100 (${vocDisplay}), dan sensor Sulfur (${sulfurDisplay}),`,
    `  model Machine Learning Random Forest mengklasifikasikan sampel makanan (${record.foodType}) berstatus: ${record.label.toUpperCase()}.`,
    `• Gas Sulfur (H2S) dan VOC merupakan senyawa kunci yang dilepaskan ketika mikroorganisme mengurai protein dan karbohidrat.`,
    `• Pembacaan diproses langsung oleh mikrokontroler ESP32-S3 dan disinkronkan secara real-time ke Firebase Realtime Database.`,
  ];

  let lineY = currentY + 7;
  analysisLines.forEach((line) => {
    doc.text(line, 18, lineY);
    lineY += 6.5;
  });

  // Section 4: Signature / Validation Box
  currentY += 46;
  doc.setDrawColor(227, 234, 225);
  doc.line(14, currentY, 196, currentY);

  currentY += 8;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.setTextColor(...brandDark);
  doc.text("FRESHGUARD AI VERIFICATION SYSTEM", 14, currentY);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(...textMuted);
  doc.text("Dokumen ini dihasilkan secara otomatis oleh sistem monitoring cerdas FRESHGUARD AI.", 14, currentY + 5);
  doc.text("Data bersumber langsung dari sensor ESP32-S3 yang terhubung ke Firebase Realtime Database.", 14, currentY + 9);

  // Digital Stamp Box on Right
  doc.setFillColor(234, 248, 227);
  doc.setDrawColor(...brandPrimary);
  doc.roundedRect(146, currentY - 2, 50, 18, 2, 2, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(...brandDark);
  doc.text("VERIFIED BY AI", 171, currentY + 4, { align: "center" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(6.5);
  doc.text("Random Forest Model", 171, currentY + 9, { align: "center" });
  doc.text("ESP32-S3 Automated Test", 171, currentY + 13, { align: "center" });

  // Footer Bottom Page Number
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(...textMuted);
  doc.text("Halaman 1 dari 1 — FRESHGUARD AI Food Freshness Monitoring System", 105, 287, { align: "center" });

  return doc;
}

export function downloadDetectionPdf(record: DetectionRecord, fileName?: string): void {
  const doc = buildDetectionPdf(record);
  const name = fileName || `Laporan-Freshguard-AI-${record.foodType}-${record.id}.pdf`;
  doc.save(name);
}

export function getDetectionPdfDataUri(record: DetectionRecord): string {
  const doc = buildDetectionPdf(record);
  return doc.output("datauristring");
}

export function getDetectionPdfBlobUrl(record: DetectionRecord): string {
  const doc = buildDetectionPdf(record);
  const blob = doc.output("blob");
  return URL.createObjectURL(blob);
}
