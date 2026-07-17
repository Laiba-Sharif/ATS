// ==============================================
// ResumeIQ AI
// ATS Scoring Engine
// ==============================================

// Required Sections
const REQUIRED_SECTIONS = [
    "summary",
    "education",
    "experience",
    "skills",
    "projects"
];

// Action verbs
const ACTION_WORDS = [
    "developed",
    "built",
    "created",
    "managed",
    "designed",
    "implemented",
    "improved",
    "optimized",
    "led",
    "achieved",
    "organized",
    "collaborated"
];

// ===============================
// MAIN ATS FUNCTION
// ===============================

function calculateATS(parsedResume, skillResult, jobDescription = "") {

    const result = {

        atsScore: 0,

        grade: "",

        interviewChance: 0,

        keywordScore: 0,

        sectionScore: 0,

        formattingScore: 0,

        experienceScore: 0,

        actionWordScore: 0,

        strengths: [],

        weaknesses: []

    };


    // -------------------------
    // Keyword Score
    // -------------------------

    result.keywordScore = skillResult.skillScore;


    // -------------------------
    // Resume Sections
    // -------------------------

    let sectionCount = 0;

    REQUIRED_SECTIONS.forEach(section => {

        if (parsedResume.sections.includes(section)) {

            sectionCount++;

        }

    });

    result.sectionScore = Math.round(
        (sectionCount / REQUIRED_SECTIONS.length) * 100
    );


    // -------------------------
    // Formatting
    // -------------------------

    result.formattingScore = checkFormatting(parsedResume.fullText);


    // -------------------------
    // Experience
    // -------------------------

    result.experienceScore = detectExperience(parsedResume.fullText);


    // -------------------------
    // Action Verbs
    // -------------------------

    result.actionWordScore = detectActionWords(parsedResume.fullText);


    // -------------------------
    // Final ATS Score
    // -------------------------

    result.atsScore = Math.round(

        (result.keywordScore * 0.35) +

        (result.sectionScore * 0.20) +

        (result.formattingScore * 0.15) +

        (result.experienceScore * 0.15) +

        (result.actionWordScore * 0.15)

    );


    // -------------------------
    // Grade
    // -------------------------

    if (result.atsScore >= 90) {

        result.grade = "A+";

    }

    else if (result.atsScore >= 80) {

        result.grade = "A";

    }

    else if (result.atsScore >= 70) {

        result.grade = "B";

    }

    else if (result.atsScore >= 60) {

        result.grade = "C";

    }

    else {

        result.grade = "Needs Improvement";

    }


    // -------------------------
    // Interview Chance
    // -------------------------

    result.interviewChance = Math.min(
        100,
        result.atsScore + 5
    );


    // -------------------------
    // Strengths
    // -------------------------

    if (result.keywordScore > 80) {

        result.strengths.push("Excellent keyword matching.");

    }

    if (result.sectionScore > 80) {

        result.strengths.push("Resume contains important sections.");

    }

    if (result.actionWordScore > 70) {

        result.strengths.push("Good use of action verbs.");

    }


    // -------------------------
    // Weaknesses
    // -------------------------

    if (result.keywordScore < 70) {

        result.weaknesses.push("Add more job-specific keywords.");

    }

    if (result.sectionScore < 80) {

        result.weaknesses.push("Complete missing resume sections.");

    }

    if (result.actionWordScore < 60) {

        result.weaknesses.push("Use stronger action verbs.");

    }

    if (result.formattingScore < 70) {

        result.weaknesses.push("Improve formatting consistency.");

    }


    return result;

}



// ==============================================
// Formatting
// ==============================================

function checkFormatting(text) {

    let score = 100;

    if (text.length < 400)
        score -= 20;

    if (text.length > 5000)
        score -= 10;

    if (!text.includes("@"))
        score -= 10;

    if (!/\d/.test(text))
        score -= 10;

    return Math.max(score, 40);

}



// ==============================================
// Experience
// ==============================================

function detectExperience(text) {

    text = text.toLowerCase();

    let score = 50;

    if (text.includes("experience"))
        score += 20;

    if (text.includes("intern"))
        score += 10;

    if (text.includes("developer"))
        score += 10;

    if (text.includes("engineer"))
        score += 10;

    return Math.min(score, 100);

}



// ==============================================
// Action Words
// ==============================================

function detectActionWords(text) {

    text = text.toLowerCase();

    let found = 0;

    ACTION_WORDS.forEach(word => {

        if (text.includes(word))

            found++;

    });

    return Math.round(

        (found / ACTION_WORDS.length) * 100

    );

}
window.calculateATS = calculateATS;