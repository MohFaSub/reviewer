// Versi yang lebih robust dengan error handling dan validasi
const ESSAYS = [
  { 
    id: "essay01", 
    title: "Energi Terbarukan", 
    gdrive: "https://drive.google.com/file/d/FILE_ID_1/preview" 
  },
  // ... (tambahkan esai lainnya di sini)
];

const REVIEWERS = [
  { 
    id: "NRP001", 
    name: "Andi" 
  },
  // ... (tambahkan reviewer lainnya di sini)
];

const REVIEWER_ASSIGNMENTS = {
  NRP001: ["essay01", "essay02", "essay03"],
  // ... (tambahkan penugasan lainnya di sini)
};

/* ========== ENHANCED STORAGE SYSTEM ========== */
const STORAGE_KEY = 'ESSAY_EVALUATIONS_v3'; // Changed version

function getAllEvaluations() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch (error) {
    console.error("Error reading evaluations:", error);
    return {};
  }
}

function saveEvaluation(essayId, scores = {}, comment = "") {
  if (!essayId || !isValidEssayId(essayId)) {
    console.error("Invalid essay ID");
    return false;
  }

  try {
    const evaluations = getAllEvaluations();
    const reviewerNRP = localStorage.getItem("reviewerNRP") || "unknown";
    
    evaluations[essayId] = {
      scores: validateScores(scores),
      comment: comment.substring(0, 500), // Limit comment length
      reviewerNRP,
      timestamp: new Date().toISOString()
    };
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(evaluations));
    return true;
  } catch (error) {
    console.error("Error saving evaluation:", error);
    return false;
  }
}

function getEvaluation(essayId) {
  if (!essayId) return null;
  return getAllEvaluations()[essayId] || null;
}

function getEvaluationsByReviewer(nrp) {
  if (!nrp) return {};
  
  const evaluations = getAllEvaluations();
  return Object.entries(evaluations)
    .filter(([_, eval]) => eval.reviewerNRP === nrp)
    .reduce((acc, [essayId, eval]) => ({ ...acc, [essayId]: eval }), {});
}

/* ========== HELPER FUNCTIONS ========== */
function isValidEssayId(id) {
  return ESSAYS.some(essay => essay.id === id);
}

function validateScores(scores) {
  const validScores = {};
  for (const [key, value] of Object.entries(scores)) {
    const num = Number(value);
    if (!isNaN(num) {
      validScores[key] = Math.max(0, num);
    }
  }
  return validScores;
}

function getAssignedEssays(nrp) {
  if (!nrp) return [];
  
  const assignedIds = REVIEWER_ASSIGNMENTS[nrp] || [];
  return ESSAYS.filter(essay => assignedIds.includes(essay.id));
}

function getAllEvaluationsForTable() {
  const evaluations = getAllEvaluations();
  return ESSAYS.map(essay => {
    const evaluation = evaluations[essay.id] || {};
    const totalScore = evaluation.scores ? 
      Object.values(evaluation.scores).reduce((a, b) => a + b, 0) : 
      null;
    
    return {
      id: essay.id,
      title: essay.title,
      ...evaluation,
      totalScore,
      status: evaluation.scores ? "completed" : "pending"
    };
  });
}

// Debug functions
function clearAllEvaluations() {
  localStorage.removeItem(STORAGE_KEY);
}

function seedDummyData() {
  const dummyEvaluation = {
    scores: {
      plagiarisme: 30,
      judul: 5,
      kata: 5,
      sitasi: 8,
      ejaan: 7,
      format: 10,
      sistematika: 7,
      data: 9
    },
    comment: "Karya yang bagus, tetapi perlu perbaikan di bagian metodologi",
    reviewerNRP: "NRP001",
    timestamp: new Date().toISOString()
  };
  
  saveEvaluation("essay01", dummyEvaluation.scores, dummyEvaluation.comment);
}

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    ESSAYS,
    REVIEWERS,
    REVIEWER_ASSIGNMENTS,
    getAllEvaluations,
    saveEvaluation,
    getEvaluation,
    getEvaluationsByReviewer,
    getAssignedEssays,
    getAllEvaluationsForTable,
    clearAllEvaluations,
    seedDummyData
  };
}
