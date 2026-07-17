// ==============================================
// ResumeIQ AI
// upload.js (PART 1)
// ==============================================

// ------------------------------
// DOM Elements
// ------------------------------

const fileInput = document.getElementById("resumeFile");
const chooseBtn = document.getElementById("chooseBtn");
const dropZone = document.getElementById("dropZone");

const resumeTextArea = document.getElementById("resumeText");
const jobDescription = document.getElementById("jobDescription");
const jobRole = document.getElementById("jobRole");

const selectedFile = document.getElementById("selectedFile");

const analyzeBtn = document.getElementById("analyzeBtn");

const progressFill = document.getElementById("progressFill");
const progressText = document.getElementById("progressText");

const loadingScreen = document.getElementById("loadingScreen");
const loadingStatus = document.getElementById("loadingStatus");


// ------------------------------
// Global Variables
// ------------------------------

let uploadedFile = null;
let extractedResumeText = "";


// ------------------------------
// Default Job Descriptions
// ------------------------------

const defaultJD = {

    "Frontend Developer": `
Frontend Developer

Required Skills

HTML
CSS
JavaScript
Bootstrap
React
Git
Responsive Design
REST API
Problem Solving
Communication
`,

    "Backend Developer": `
Backend Developer

PHP
Laravel
Node.js
Express
REST API
MySQL
MongoDB
Git
Authentication
API Development
`,

    "Full Stack Developer": `
HTML
CSS
JavaScript
React
Node.js
Express
MongoDB
MySQL
REST API
Git
`,

    "UI/UX Designer": `
Figma
Adobe XD
Wireframe
Prototype
Responsive Design
User Research
Typography
Color Theory
`
};


// ------------------------------
// Choose Resume Button
// ------------------------------

chooseBtn.addEventListener("click", () => {

    fileInput.click();

});


// ------------------------------
// File Selected
// ------------------------------

fileInput.addEventListener("change", handleFile);


// ------------------------------
// Drag Events
// ------------------------------

dropZone.addEventListener("dragover", (e) => {

    e.preventDefault();

    dropZone.classList.add("dragging");

});

dropZone.addEventListener("dragleave", () => {

    dropZone.classList.remove("dragging");

});

dropZone.addEventListener("drop", (e) => {

    e.preventDefault();

    dropZone.classList.remove("dragging");

    if (e.dataTransfer.files.length > 0) {

        uploadedFile = e.dataTransfer.files[0];

        handleResume(uploadedFile);

    }

});


// ------------------------------
// Handle File
// ------------------------------

function handleFile(e) {

    uploadedFile = e.target.files[0];

    if (!uploadedFile) return;

    handleResume(uploadedFile);

}


// ------------------------------
// Read Resume
// ------------------------------

async function handleResume(file) {

    try {

        updateProgress(10, "Reading Resume...");

        selectedFile.innerHTML = `
        <i class="fa-solid fa-file"></i>
        ${file.name}
        <span>Uploading...</span>
        `;

        extractedResumeText = await extractResumeText(file);

        extractedResumeText = cleanResumeText(extractedResumeText);

        resumeTextArea.value = extractedResumeText;

        selectedFile.innerHTML = `
        <i class="fa-solid fa-circle-check"></i>
        ${file.name}
        <span>Ready</span>
        `;

        updateProgress(30, "Resume Loaded Successfully");

    }

    catch (error) {

        alert(error.message);

    }

}


// ------------------------------
// Job Role Auto Fill
// ------------------------------

jobRole.addEventListener("change", () => {

    if (jobDescription.value.trim() !== "") return;

    const role = jobRole.value;

    if (defaultJD[role]) {

        jobDescription.value = defaultJD[role];

    }

});


// ------------------------------
// Progress Bar
// ------------------------------

function updateProgress(percent, message) {

    progressFill.style.width = percent + "%";

    progressText.innerText = message;

}
// ==============================================
// ResumeIQ AI
// upload.js (PART 2)
// ==============================================


// ------------------------------
// Analyze Resume
// ------------------------------

analyzeBtn.addEventListener("click", analyzeResume);


// ------------------------------
// Main Function
// ------------------------------

async function analyzeResume() {

    let resumeText = resumeTextArea.value.trim();

    if (resumeText === "") {

        alert("Please upload or paste your resume.");

        return;

    }

    showLoading();

    try {

        // STEP 1
        loadingStep(10, "Reading Resume...");
        await delay(700);

        // STEP 2
        loadingStep(20, "Extracting Information...");
        await delay(700);

        const parsedResume = parseResume(resumeText);

        // STEP 3
        loadingStep(35, "Detecting Skills...");
        await delay(700);

        const skillResult = compareSkills(
            resumeText,
            jobDescription.value
        );

        // STEP 4
        loadingStep(55, "Calculating ATS Score...");
        await delay(700);

        const atsResult = calculateATS(
            parsedResume,
            skillResult,
            jobDescription.value
        );

        // STEP 5
        loadingStep(75, "Checking Grammar...");
        await delay(700);

        const grammarResult = analyzeGrammar(
            resumeText
        );

        // STEP 6
        loadingStep(90, "Preparing Dashboard...");
        await delay(800);

        // Save everything

        const report = {

            parsedResume,

            skillResult,

            atsResult,

            grammarResult,

            resumeText,

            jobDescription:

                jobDescription.value,

            jobRole:

                jobRole.value,

            analyzedAt:

                new Date().toLocaleString()

        };

        localStorage.setItem(

            "resumeReport",

            JSON.stringify(report)

        );

        loadingStep(

            100,

            "Analysis Complete"

        );

        await delay(1000);

        window.location.href =

            "dashboard.html";

    }

    catch (error) {

        hideLoading();

        console.error(error);

        alert(

            "Something went wrong."

        );

    }

}



// ------------------------------
// Loading Screen
// ------------------------------

function showLoading() {

    loadingScreen.style.display = "flex";

}



function hideLoading() {

    loadingScreen.style.display = "none";

}



// ------------------------------
// Loading Progress
// ------------------------------

function loadingStep(

    percent,

    message

) {

    progressFill.style.width =

        percent + "%";

    progressText.innerText =

        message;

    loadingStatus.innerText =

        message;

}



// ------------------------------
// Delay
// ------------------------------

function delay(ms) {

    return new Promise(resolve => {

        setTimeout(resolve, ms);

    });

}