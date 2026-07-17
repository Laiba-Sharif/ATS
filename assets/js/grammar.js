// ==========================================
// ResumeIQ AI
// Grammar & Resume Quality Checker
// ==========================================


// Weak words

const weakWords = [

    "good",
    "nice",
    "hardworking",
    "responsible",
    "helped",
    "worked",
    "tried",
    "some",
    "various",
    "many"

];


// Action words

const strongWords = [

    "developed",
    "designed",
    "implemented",
    "created",
    "optimized",
    "managed",
    "led",
    "achieved",
    "improved",
    "built"

];



// ==========================================
// Main Grammar Function
// ==========================================

function analyzeGrammar(text) {

    const report = {

        grammarScore: 100,

        issues: [],

        suggestions: [],

        weakWords: [],

        repeatedWords: [],

        longSentences: []

    };


    text = text.trim();

    if (text.length === 0) {

        report.grammarScore = 0;

        report.issues.push("Resume is empty.");

        return report;

    }


    //------------------------------------
    // Multiple Spaces
    //------------------------------------

    if (/\s{2,}/.test(text)) {

        report.grammarScore -= 5;

        report.issues.push("Multiple spaces detected.");

    }


    //------------------------------------
    // Weak Words
    //------------------------------------

    weakWords.forEach(word => {

        const regex = new RegExp("\\b" + word + "\\b", "gi");

        const matches = text.match(regex);

        if (matches) {

            report.weakWords.push({

                word,

                count: matches.length

            });

            report.grammarScore -= matches.length;

        }

    });


    //------------------------------------
    // Long Sentences
    //------------------------------------

    const sentences = text.split(/[.!?]/);

    sentences.forEach(sentence => {

        const words = sentence.trim().split(/\s+/);

        if (words.length > 35) {

            report.longSentences.push(sentence.trim());

            report.grammarScore -= 3;

        }

    });


    //------------------------------------
    // Repeated Words
    //------------------------------------

    const words = text
        .toLowerCase()
        .replace(/[^\w\s]/g, "")
        .split(/\s+/);

    for (let i = 0; i < words.length - 1; i++) {

        if (

            words[i] === words[i + 1] &&
            words[i].length > 2

        ) {

            report.repeatedWords.push(words[i]);

            report.grammarScore -= 2;

        }

    }


    //------------------------------------
    // Email Check
    //------------------------------------

    if (!text.includes("@")) {

        report.grammarScore -= 5;

        report.issues.push("Email address not found.");

    }


    //------------------------------------
    // Phone Check
    //------------------------------------

    if (!/\d{10,}/.test(text.replace(/\D/g, ""))) {

        report.grammarScore -= 5;

        report.issues.push("Phone number not found.");

    }


    //------------------------------------
    // Strong Action Verbs
    //------------------------------------

    let actionCount = 0;

    strongWords.forEach(word => {

        if (text.toLowerCase().includes(word))

            actionCount++;

    });

    if (actionCount < 3) {

        report.suggestions.push(

            "Use more action verbs like Developed, Built, Created, Implemented."

        );

        report.grammarScore -= 5;

    }


    //------------------------------------
    // Suggestions
    //------------------------------------

    if (report.weakWords.length > 0) {

        report.suggestions.push(

            "Replace weak words with stronger action verbs."

        );

    }

    if (report.longSentences.length > 0) {

        report.suggestions.push(

            "Break long sentences into smaller ones."

        );

    }

    if (report.repeatedWords.length > 0) {

        report.suggestions.push(

            "Remove repeated words."

        );

    }


    //------------------------------------
    // Minimum Score
    //------------------------------------

    if (report.grammarScore < 0)

        report.grammarScore = 0;


    return report;

}
window.analyzeGrammar = analyzeGrammar;