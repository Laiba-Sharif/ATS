// ==========================================
// ResumeIQ AI - Skills Engine
// ==========================================

// 150+ Skills Database

const skillsDatabase = [

    // Frontend
    "html",
    "html5",
    "css",
    "css3",
    "javascript",
    "typescript",
    "bootstrap",
    "tailwind",
    "sass",
    "scss",
    "jquery",
    "react",
    "nextjs",
    "next.js",
    "vue",
    "angular",

    // Backend
    "node",
    "nodejs",
    "node.js",
    "express",
    "expressjs",
    "php",
    "laravel",
    "python",
    "django",
    "flask",
    "java",
    "spring",
    "c#",
    ".net",

    // Database
    "mysql",
    "mongodb",
    "postgresql",
    "sqlite",
    "firebase",

    // Tools
    "git",
    "github",
    "gitlab",
    "bitbucket",
    "vscode",
    "figma",
    "postman",
    "npm",
    "webpack",
    "vite",

    // APIs
    "rest api",
    "restful api",
    "graphql",
    "json",
    "ajax",

    // Programming
    "c",
    "c++",
    "python",
    "java",
    "php",
    "ruby",
    "go",
    "swift",
    "kotlin",

    // Cloud
    "aws",
    "azure",
    "gcp",
    "docker",
    "kubernetes",

    // AI
    "openai",
    "chatgpt",
    "machine learning",
    "deep learning",
    "tensorflow",
    "pytorch",

    // Office
    "excel",
    "word",
    "powerpoint",

    // Soft Skills
    "communication",
    "leadership",
    "teamwork",
    "problem solving",
    "critical thinking",
    "time management",
    "adaptability",
    "creativity",
    "analytical thinking"
];


// ==========================================
// Extract Skills
// ==========================================

function extractSkills(text) {

    text = text.toLowerCase();

    const foundSkills = [];

    skillsDatabase.forEach(skill => {

        if (text.includes(skill)) {

            foundSkills.push(skill);

        }

    });

    return [...new Set(foundSkills)];
}



// ==========================================
// Compare Resume & Job Description
// ==========================================

function compareSkills(resumeText, jobText) {

    const resumeSkills = extractSkills(resumeText);

    const jobSkills = extractSkills(jobText);

    const matchedSkills = [];

    const missingSkills = [];

    jobSkills.forEach(skill => {

        if (resumeSkills.includes(skill)) {

            matchedSkills.push(skill);

        } else {

            missingSkills.push(skill);

        }

    });

    let score = 0;

    if (jobSkills.length > 0) {

        score = Math.round(
            (matchedSkills.length / jobSkills.length) * 100
        );

    }

    return {

        resumeSkills,

        jobSkills,

        matchedSkills,

        missingSkills,

        skillScore: score

    };

}



// ==========================================
// Top Skills
// ==========================================

function getTopSkills(skills, limit = 10) {

    return skills.slice(0, limit);

}



// ==========================================
// Missing Skills Message
// ==========================================

function generateSkillSuggestion(missingSkills) {

    if (missingSkills.length === 0) {

        return "Excellent! Your resume matches all important skills.";

    }

    return `Add these skills if you have experience: ${missingSkills.join(", ")}`;

}



// ==========================================
// Skills Progress
// ==========================================

function calculateSkillStrength(foundSkills) {

    const total = skillsDatabase.length;

    const percentage = Math.round(

        (foundSkills.length / total) * 100

    );

    return percentage;

}
window.compareSkills = compareSkills;