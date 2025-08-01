// List esai dummy (tidak berubah)
const ESSAYS = [
  { id: "essay01", title: "Energi Terbarukan", gdrive: "https://drive.google.com/file/d/FILE_ID_1/preview" },
  // ... (data esai lainnya tetap sama)
];

// Data akun reviewer (tidak berubah)
const REVIEWERS = [
  { id: "NRP001", name: "Andi" },
  // ... (data reviewer lainnya tetap sama)
];

// Penugasan reviewer (tidak berubah)
const REVIEWER_ASSIGNMENTS = {
  NRP001: ["essay01", "essay02", "essay03"],
  // ... (data penugasan lainnya tetap sama)
};

/* ========== SISTEM PENYIMPANAN NILAI YANG DIPERBAIKI ========== */
const STORAGE_KEY = 'ESSAY_EVALUATIONS_v2';

// Fungsi untuk mendapatkan semua evaluasi
function getAllEvaluations() {
  const evaluations = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  return evaluations;
}

// Fungsi untuk menyimpan evaluasi
function saveEvaluation(essayId, scores, comment) {
  const evaluations = getAllEvaluations();
  const reviewerNRP = localStorage.getItem("reviewerNRP") || "unknown";
  
  evaluations[essayId] = {
    scores,
    comment,
    reviewerNRP,
    timestamp: new Date().toISOString()
  };
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(evaluations));
  return true;
}

// Fungsi untuk mendapatkan evaluasi spesifik
function getEvaluation(essayId) {
  const evaluations = getAllEvaluations();
  return evaluations[essayId] || null;
}

// Fungsi untuk mendapatkan evaluasi oleh reviewer tertentu
function getEvaluationsByReviewer(nrp) {
  const evaluations = getAllEvaluations();
  return Object.entries(evaluations)
    .filter(([_, eval]) => eval.reviewerNRP === nrp)
    .reduce((acc, [essayId, eval]) => {
      acc[essayId] = eval;
      return acc;
    }, {});
}

// Fungsi untuk menghapus evaluasi (untuk debug)
function clearAllEvaluations() {
  localStorage.removeItem(STORAGE_KEY);
}

/* ========== FUNGSI BANTU ========== */
// Dapatkan esai yang ditugaskan ke reviewer
function getAssignedEssays(nrp) {
  const assignedIds = REVIEWER_ASSIGNMENTS[nrp] || [];
  return ESSAYS.filter(essay => assignedIds.includes(essay.id));
}

// Dapatkan semua evaluasi dalam format array untuk tabel
function getAllEvaluationsForTable() {
  const evaluations = getAllEvaluations();
  return ESSAYS.map(essay => {
    const evaluation = evaluations[essay.id] || {};
    const totalScore = evaluation.scores ? Object.values(evaluation.scores).reduce((a, b) => a + b, 0) : null;
    
    return {
      id: essay.id,
      title: essay.title,
      ...evaluation,
      totalScore
    };
  });
}
