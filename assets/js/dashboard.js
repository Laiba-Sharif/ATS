// =============================================
// ResumeIQ AI Dashboard
// dashboard.js (PART 1)
// =============================================

// -----------------------------
// Load Report
// -----------------------------

const report = JSON.parse(localStorage.getItem("resumeReport"));

if (!report) {

    alert("No Resume Analysis Found!");

    window.location.href = "upload.html";

}


// -----------------------------
// Shortcuts
// -----------------------------

const parsedResume = report.parsedResume || {};

const atsResult = report.atsResult || {};

const grammarResult = report.grammarResult || {};

const skillResult = report.skillResult || {};


// -----------------------------
// Resume Overview
// -----------------------------

document.getElementById("userName").innerText =
parsedResume.name || "Not Found";

document.getElementById("userEmail").innerText =
parsedResume.email || "Not Found";

document.getElementById("userPhone").innerText =
parsedResume.phone || "Not Found";

document.getElementById("jobRoleText").innerText =
report.jobRole || "Not Selected";

document.getElementById("reportDate").innerText =
report.analyzedAt || "--";


// -----------------------------
// Resume Sections
// -----------------------------

const sectionContainer =
document.getElementById("resumeSections");

sectionContainer.innerHTML = "";

let totalSections = 0;

if (parsedResume.sections && parsedResume.sections.length > 0) {

    parsedResume.sections.forEach(section => {

        totalSections++;

        sectionContainer.innerHTML += `

        <div class="section-tag">

            ✅ ${section}

        </div>

        `;

    });

}
else{

    sectionContainer.innerHTML = `

    <p>No Sections Detected</p>

    `;

}

document.getElementById("sectionCount").innerText =
totalSections;


// -----------------------------
// ATS Score
// -----------------------------

const atsScore = atsResult.atsScore || 0;

document.getElementById("atsScore").innerText =
atsScore + "%";


// -----------------------------
// Interview Chance
// -----------------------------

const interviewChance =
atsResult.interviewChance || 0;

document.getElementById("interviewChance").innerText =
interviewChance + "%";

document.getElementById("chanceBar").style.width =
interviewChance + "%";


// -----------------------------
// Resume Grade
// -----------------------------

document.getElementById("resumeGrade").innerText =
atsResult.grade || "N/A";


// -----------------------------
// Grammar Score
// -----------------------------

const grammarScore =
grammarResult.grammarScore || 0;

document.getElementById("grammarScore").innerText =
grammarScore + "%";

document.getElementById("grammarBar").style.width =
grammarScore + "%";
// =============================================
// ResumeIQ AI Dashboard
// dashboard.js (PART 2)
// =============================================


// -----------------------------
// Matched Skills
// -----------------------------

const matchedSkillsBox =
document.getElementById("matchedSkills");

matchedSkillsBox.innerHTML = "";

if (
    skillResult.matchedSkills &&
    skillResult.matchedSkills.length > 0
) {

    skillResult.matchedSkills.forEach(skill => {

        matchedSkillsBox.innerHTML += `

        <span class="skill-tag matched">

            ${skill}

        </span>

        `;

    });

}
else{

    matchedSkillsBox.innerHTML = `

    <span class="skill-tag">

        No Matched Skills

    </span>

    `;

}



// -----------------------------
// Missing Skills
// -----------------------------

const missingSkillsBox =
document.getElementById("missingSkills");

missingSkillsBox.innerHTML = "";

if (
    skillResult.missingSkills &&
    skillResult.missingSkills.length > 0
) {

    skillResult.missingSkills.forEach(skill => {

        missingSkillsBox.innerHTML += `

        <span class="skill-tag missing">

            ${skill}

        </span>

        `;

    });

}
else{

    missingSkillsBox.innerHTML = `

    <span class="skill-tag matched">

        Excellent! No Missing Skills

    </span>

    `;

}



// -----------------------------
// Grammar Suggestions
// -----------------------------

const grammarBox =
document.getElementById("grammarSuggestions");

grammarBox.innerHTML = "";

if (
    grammarResult.suggestions &&
    grammarResult.suggestions.length > 0
) {

    grammarResult.suggestions.forEach(item => {

        grammarBox.innerHTML += `

        <li>${item}</li>

        `;

    });

}
else{

    grammarBox.innerHTML = `

    <li>

        Excellent Grammar Detected.

    </li>

    `;

}



// -----------------------------
// AI Suggestions
// -----------------------------

const aiSuggestions =
document.getElementById("aiSuggestions");

aiSuggestions.innerHTML = "";

const suggestions = [];


if (
    atsResult.weaknesses &&
    atsResult.weaknesses.length > 0
) {

    atsResult.weaknesses.forEach(item => {

        suggestions.push(item);

    });

}


if (
    skillResult.missingSkills &&
    skillResult.missingSkills.length > 0
) {

    suggestions.push(

        "Add these missing skills: " +

        skillResult.missingSkills.join(", ")

    );

}


if (
    grammarResult.suggestions &&
    grammarResult.suggestions.length > 0
) {

    grammarResult.suggestions.forEach(item => {

        suggestions.push(item);

    });

}


if (suggestions.length === 0) {

    suggestions.push(

        "Excellent Resume! Your ATS profile looks strong."

    );

}


suggestions.forEach(item => {

    aiSuggestions.innerHTML += `

    <div class="suggestion-card">

        <i class="fa-solid fa-lightbulb"></i>

        <p>${item}</p>

    </div>

    `;

});



// -----------------------------
// Resume Improvement
// -----------------------------

const oldResume =
document.getElementById("oldResume");

const newResume =
document.getElementById("newResume");


oldResume.innerText =
report.resumeText || "";


let improvedResume =
report.resumeText || "";


if (
    skillResult.missingSkills &&
    skillResult.missingSkills.length > 0
) {

    improvedResume +=

    "\n\nRecommended Skills:\n\n" +

    skillResult.missingSkills.join(", ");

}


newResume.innerText =
improvedResume;



// =============================================
// ResumeIQ AI Dashboard
// dashboard.js (PART 3)
// =============================================


// -----------------------------
// AI Review
// -----------------------------

const aiBox = document.getElementById("aiTyping");

let aiMessage = "";

// ATS Analysis

if (atsResult.atsScore >= 85) {

    aiMessage +=
    "Excellent Resume! Your ATS score is very strong. ";

}
else if (atsResult.atsScore >= 70) {

    aiMessage +=
    "Your resume is good but still has room for improvement. ";

}
else {

    aiMessage +=
    "Your resume needs improvement to pass ATS systems. ";

}


// Skills

if (skillResult.missingSkills.length > 0) {

    aiMessage +=
    "You should add these important skills: " +

    skillResult.missingSkills.join(", ") +

    ". ";

}
else{

    aiMessage +=
    "Great! No important skills are missing. ";

}


// Grammar

if (grammarResult.grammarScore < 80) {

    aiMessage +=
    "Your resume also contains grammar issues that should be fixed. ";

}
else{

    aiMessage +=
    "Grammar quality looks professional. ";

}


// Final Suggestion

aiMessage +=

"After making these improvements your interview chances will increase significantly.";


// -----------------------------
// ChatGPT Typing Effect
// -----------------------------

let index = 0;

function typeAI() {

    if (index < aiMessage.length) {

        aiBox.innerHTML += aiMessage.charAt(index);

        index++;

        setTimeout(typeAI, 18);

    }

}

aiBox.innerHTML = "";

typeAI();



// -----------------------------
// Career Recommendation
// -----------------------------

const careerBox =
document.getElementById("careerSuggestions");

careerBox.innerHTML = "";


if (

    typeof careerEngine !== "undefined"

) {

    const careers = careerEngine.recommendCareer(

        skillResult.resumeSkills

    );



    if (careers.length > 0) {

        careers.forEach(career => {

            careerBox.innerHTML += `

            <div class="career-card-item">

                <h3>${career.career}</h3>

                <p>

                Match :

                ${career.confidence}%

                </p>

            </div>

            `;

        });

    }

}



// -----------------------------
// Learning Roadmap
// -----------------------------

const roadmapBox =
document.getElementById("learningRoadmap");

roadmapBox.innerHTML = "";


if (

    typeof careerEngine !== "undefined"

) {

    const careers = careerEngine.recommendCareer(

        skillResult.resumeSkills

    );



    if (careers.length > 0) {

        careers[0].roadmap.forEach((step, i) => {

            roadmapBox.innerHTML += `

            <div class="roadmap-step">

                <strong>

                Step ${i + 1}

                </strong>

                <p>

                ${step}

                </p>

            </div>

            `;

        });

    }

}
// =============================================
// ResumeIQ AI Dashboard
// dashboard.js (PART 4)
// =============================================


// -----------------------------
// Download Report
// -----------------------------

const downloadBtn =
document.getElementById("downloadReport");

if (downloadBtn) {

    downloadBtn.addEventListener(

        "click",

        downloadReport

    );

}


function downloadReport() {

    const reportText = `

======================================
ResumeIQ AI Report
======================================

Candidate
--------------------------------------

Name : ${parsedResume.name || "Not Found"}

Email : ${parsedResume.email || "Not Found"}

Phone : ${parsedResume.phone || "Not Found"}

Job Role : ${report.jobRole || "Not Selected"}

Date : ${report.analyzedAt}


======================================
ATS ANALYSIS
======================================

ATS Score :
${atsResult.atsScore}%

Resume Grade :
${atsResult.grade}

Interview Chance :
${atsResult.interviewChance}%


======================================
GRAMMAR
======================================

Grammar Score :
${grammarResult.grammarScore}%


Suggestions

${grammarResult.suggestions.join("\n") || "No Suggestions"}


======================================
MATCHED SKILLS
======================================

${skillResult.matchedSkills.join(", ") || "None"}


======================================
MISSING SKILLS
======================================

${skillResult.missingSkills.join(", ") || "None"}


======================================
AI RECOMMENDATIONS
======================================

${atsResult.weaknesses.join("\n") || "Excellent Resume"}

======================================
Generated By ResumeIQ AI
======================================

`;

    const blob = new Blob(

        [reportText],

        {

            type: "text/plain"

        }

    );

    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);

    link.download = "ResumeIQ_Report.txt";

    link.click();

}



// -----------------------------
// Sidebar Navigation
// -----------------------------

document.querySelectorAll(".sidebar li")

.forEach(item => {

    item.addEventListener("click", () => {

        document

        .querySelectorAll(".sidebar li")

        .forEach(li =>

            li.classList.remove("active")

        );

        item.classList.add("active");

    });

});



// -----------------------------
// Small Dashboard Animation
// -----------------------------

document.querySelectorAll(

".card"

).forEach((card, index) => {

    card.style.opacity = "0";

    card.style.transform =

    "translateY(30px)";

    setTimeout(() => {

        card.style.transition =

        ".5s";

        card.style.opacity = "1";

        card.style.transform =

        "translateY(0px)";

    }, index * 150);

});



// -----------------------------
// Final Console
// -----------------------------

console.log("================================");

console.log("ResumeIQ AI Dashboard Loaded");

console.log(report);

console.log("================================");