// List esai dummy
const ESSAYS = [
  { id: "essay01", title: "Energi Terbarukan", gdrive: "https://drive.google.com/file/d/FILE_ID_1/preview" },
  { id: "essay02", title: "AI dan Etika", gdrive: "https://drive.google.com/file/d/FILE_ID_2/preview" },
  { id: "essay03", title: "Masa Depan Transportasi", gdrive: "https://drive.google.com/file/d/FILE_ID_3/preview" },
  { id: "essay04", title: "Krisis Iklim", gdrive: "https://drive.google.com/file/d/FILE_ID_4/preview" },
  { id: "essay05", title: "Teknologi Pendidikan", gdrive: "https://drive.google.com/file/d/FILE_ID_5/preview" },
  { id: "essay06", title: "Cybersecurity Global", gdrive: "https://drive.google.com/file/d/FILE_ID_6/preview" },
  { id: "essay07", title: "Keadilan Sosial", gdrive: "https://drive.google.com/file/d/FILE_ID_7/preview" },
  { id: "essay08", title: "Inovasi Bioteknologi", gdrive: "https://drive.google.com/file/d/FILE_ID_8/preview" },
  { id: "essay09", title: "Transformasi Digital", gdrive: "https://drive.google.com/file/d/FILE_ID_9/preview" },
  { id: "essay10", title: "Perubahan Sosial Global", gdrive: "https://drive.google.com/file/d/FILE_ID_10/preview" }
];

// Data akun reviewer (21 dummy)
const REVIEWERS = [
  { id: "NRP001", name: "Andi" },
  { id: "NRP002", name: "Budi" },
  { id: "NRP003", name: "Citra" },
  { id: "NRP004", name: "Dewi" },
  { id: "NRP005", name: "Eko" },
  { id: "NRP006", name: "Farah" },
  { id: "NRP007", name: "Gilang" },
  { id: "NRP008", name: "Hari" },
  { id: "NRP009", name: "Ika" },
  { id: "NRP010", name: "Joko" },
  { id: "NRP011", name: "Kiki" },
  { id: "NRP012", name: "Lina" },
  { id: "NRP013", name: "Made" },
  { id: "NRP014", name: "Nina" },
  { id: "NRP015", name: "Omar" },
  { id: "NRP016", name: "Putri" },
  { id: "NRP017", name: "Qori" },
  { id: "NRP018", name: "Rudi" },
  { id: "NRP019", name: "Santi" },
  { id: "NRP020", name: "Taufik" },
  { id: "NRP021", name: "Umar" }
];

// Penugasan reviewer berdasarkan NRP
const REVIEWER_ASSIGNMENTS = {
  NRP001: ["essay01", "essay02", "essay03"],
  NRP002: ["essay04", "essay05"],
  NRP003: ["essay06", "essay07"],
  NRP004: ["essay08", "essay09"],
  NRP005: ["essay10"],
  NRP006: ["essay01", "essay04"],
  NRP007: ["essay02", "essay05"],
  NRP008: ["essay03", "essay06"],
  NRP009: ["essay07", "essay08"],
  NRP010: ["essay09", "essay10"],
  NRP011: ["essay01"],
  NRP012: ["essay02"],
  NRP013: ["essay03"],
  NRP014: ["essay04"],
  NRP015: ["essay05"],
  NRP016: ["essay06"],
  NRP017: ["essay07"],
  NRP018: ["essay08"],
  NRP019: ["essay09"],
  NRP020: ["essay10"],
  NRP021: ["essay01", "essay02"]
};

// Simpan penilaian ke localStorage
function saveEvaluation(essayId, scores, comment) {
  const key = `evaluation_${essayId}`;
  const data = {
    scores,
    comment,
    timestamp: new Date().toISOString(),
    reviewerNRP: localStorage.getItem("reviewerNRP") || "unknown"
  };
  localStorage.setItem(key, JSON.stringify(data));
}


// Ambil penilaian dari localStorage
function getEvaluation(essayId) {
  const key = `evaluation_${essayId}`;
  const raw = localStorage.getItem(key);
  return raw ? JSON.parse(raw) : null;
}
