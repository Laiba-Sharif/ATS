// ===============================
// Resume Parser
// PDF + DOCX + TXT
// ===============================

async function extractResumeText(file) {

    if (!file) {
        throw new Error("No file selected.");
    }

    const extension = file.name.split(".").pop().toLowerCase();

    switch (extension) {

        case "pdf":
            return await extractPDF(file);

        case "docx":
            return await extractDOCX(file);

        case "txt":
            return await extractTXT(file);

        default:
            throw new Error("Unsupported file type.");
    }
}


// ===============================
// TXT
// ===============================

function extractTXT(file) {

    return new Promise((resolve, reject) => {

        const reader = new FileReader();

        reader.onload = function (e) {

            resolve(e.target.result);

        };

        reader.onerror = reject;

        reader.readAsText(file);

    });

}


// ===============================
// DOCX
// ===============================

async function extractDOCX(file) {

    const arrayBuffer = await file.arrayBuffer();

    const result = await mammoth.extractRawText({

        arrayBuffer: arrayBuffer

    });

    return result.value;

}


// ===============================
// PDF
// ===============================

async function extractPDF(file) {

    const buffer = await file.arrayBuffer();

    const pdf = await pdfjsLib.getDocument({

        data: buffer

    }).promise;

    let text = "";

    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {

        const page = await pdf.getPage(pageNumber);

        const content = await page.getTextContent();

        const pageText = content.items.map(item => item.str).join(" ");

        text += pageText + "\n";

    }

    return text;

}


// ===============================
// Resume Information
// ===============================

function parseResume(text) {

    const data = {

        fullText: text,

        name: "",

        email: "",

        phone: "",

        skills: [],

        sections: []

    };


    // Email

    const email = text.match(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/);

    if (email) {

        data.email = email[0];

    }


    // Phone

    const phone = text.match(/(\+?\d[\d\s\-]{8,15})/);

    if (phone) {

        data.phone = phone[0];

    }


    // Name

    const lines = text.split("\n");

    for (let line of lines) {

        const value = line.trim();

        if (value.length > 2 && value.length < 40) {

            if (!value.includes("@") && !/\d/.test(value)) {

                data.name = value;

                break;

            }

        }

    }


    // Sections

    const sectionNames = [

        "education",

        "experience",

        "projects",

        "skills",

        "summary",

        "objective",

        "certifications",

        "languages",

        "achievements"

    ];

    sectionNames.forEach(section => {

        if (text.toLowerCase().includes(section)) {

            data.sections.push(section);

        }

    });


    return data;

}


// ===============================
// Helper
// ===============================

function cleanResumeText(text) {

    return text

        .replace(/\r/g, "")

        .replace(/\t/g, " ")

        .replace(/\s+/g, " ")

        .trim();

}
window.parseResume = parseResume;