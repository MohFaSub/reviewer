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


