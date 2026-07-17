// =====================================
// ResumeIQ AI - Smart AI Suggestion Engine
// =====================================


// ================================
// AI Typing Effect
// ================================

function typeWriter(element, text, speed = 25){

    if(!element) return;

    element.innerHTML = "";

    let index = 0;


    function typing(){

        if(index < text.length){

            element.innerHTML += text.charAt(index);

            index++;

            setTimeout(typing, speed);

        }

    }


    typing();

}



// ================================
// Generate AI Resume Review
// ================================


function generateAIReview(data){


    let message = `

🤖 ResumeIQ AI Analysis Complete

Your resume has been successfully analyzed.

ATS Score:
${data.atsScore || 0}%

Skill Match:
${data.skillMatch || 0}%

`;



    if(data.missingSkills && data.missingSkills.length){


        message += `

Missing Skills:

`;

        data.missingSkills.forEach(skill=>{

            message += `• ${skill}\n`;

        });


    }



    message += `


Resume Improvement Advice:

• Add measurable achievements in your experience section.

• Include relevant technical skills.

• Improve your professional summary.

• Add projects with technologies used.


Career Advice:

Focus on building projects and improving your industry skills.

`;



    return message;


}



// ================================
// AI Suggestions Generator
// ================================


function generateAISuggestions(data){


    let suggestions=[];



    if(data.missingSkills && data.missingSkills.length){


        suggestions.push({

            title:"Missing Skills",

            text:

            "Consider adding: " +

            data.missingSkills.join(", ")

        });


    }



    suggestions.push({

        title:"Resume Summary",

        text:

        "Create a strong professional summary highlighting your skills and achievements."

    });



    suggestions.push({

        title:"Experience Section",

        text:

        "Use numbers and results instead of only listing responsibilities."

    });



    suggestions.push({

        title:"ATS Optimization",

        text:

        "Use keywords from the job description naturally in your resume."

    });



    return suggestions;


}



// ================================
// Resume Improvement Generator
// ================================


function improveResume(resumeText){


    if(!resumeText){

        return {

            old:"No resume data found",

            improved:"Upload resume to generate improvement."

        };

    }



    return {


        old: resumeText.substring(0,300) + "...",



        improved:

        `

Results-driven professional with strong technical skills and practical experience.

Skilled in developing efficient solutions, improving user experience,

and applying modern technologies to deliver high-quality projects.

`

    };


}



// ================================
// Career Advice
// ================================


function generateCareerAdvice(career){


    return `

Based on your resume, you are suitable for ${career}.

Improve your skills, create real-world projects,

and keep your portfolio updated.

`;

}



// ================================
// Display AI Suggestions
// ================================


function displayAISuggestions(list){


    let box = document.getElementById("aiSuggestions");


    if(!box) return;



    box.innerHTML="";



    list.forEach(item=>{


        box.innerHTML += `


        <div class="suggestion-card">


            <h3>

            🤖 ${item.title}

            </h3>


            <p>

            ${item.text}

            </p>


        </div>


        `;


    });



}



// ================================
// Main AI Analyzer
// ================================


function runAIAnalysis(data){


    let reviewBox =
    document.getElementById("aiTyping");



    let review =
    generateAIReview(data);



    typeWriter(reviewBox, review);



    let suggestions =
    generateAISuggestions(data);



    displayAISuggestions(suggestions);



    let improvement =
    improveResume(data.resumeText);



    let oldBox =
    document.getElementById("oldResume");


    let newBox =
    document.getElementById("newResume");



    if(oldBox)

    oldBox.innerText = improvement.old;



    if(newBox)

    newBox.innerText = improvement.improved;



}



// ================================
// Export
// ================================


window.aiEngine = {


    runAIAnalysis,

    generateAISuggestions,

    improveResume,

    typeWriter

};