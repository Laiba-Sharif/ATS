// =====================================
// ResumeIQ AI - Career Recommendation Engine
// =====================================


// Career Database

const careerDatabase = {

    "Frontend Developer": {

        skills: [
            "HTML",
            "CSS",
            "JavaScript",
            "React",
            "Bootstrap",
            "Tailwind CSS"
        ],

        roadmap: [
            "Master HTML5 & CSS3",
            "Improve JavaScript ES6+",
            "Learn React.js",
            "Learn API Integration",
            "Practice Git & GitHub",
            "Build Portfolio Projects"
        ],

        advice:
        "Focus on modern frontend frameworks and build interactive responsive websites."

    },


    "Backend Developer": {

        skills: [
            "Node.js",
            "Express",
            "PHP",
            "Laravel",
            "MySQL",
            "MongoDB"
        ],

        roadmap: [
            "Learn Server Side Programming",
            "Understand Databases",
            "Learn REST APIs",
            "Practice Authentication",
            "Deploy Backend Projects"
        ],

        advice:
        "Improve backend architecture skills and database knowledge."

    },


    "Full Stack Developer": {

        skills:[
            "HTML",
            "CSS",
            "JavaScript",
            "React",
            "Node.js",
            "MongoDB"
        ],

        roadmap:[
            "Master Frontend Development",
            "Learn Backend Development",
            "Database Management",
            "API Development",
            "Deploy Full Stack Applications"
        ],

        advice:
        "Combine frontend and backend skills to create complete applications."

    },


    "UI/UX Designer": {

        skills:[
            "Figma",
            "UI/UX",
            "CSS",
            "Design"
        ],

        roadmap:[
            "Learn Design Principles",
            "Master Figma",
            "Create Wireframes",
            "Build Design Portfolio"
        ],

        advice:
        "Improve user experience design and create strong visual portfolios."

    },


    "Data Analyst": {

        skills:[
            "SQL",
            "Python",
            "Excel",
            "Power BI"
        ],

        roadmap:[
            "Learn Advanced Excel",
            "Master SQL",
            "Learn Data Visualization",
            "Practice Python Data Analysis"
        ],

        advice:
        "Focus on data handling and visualization skills."

    },


    "Mobile App Developer": {

        skills:[
            "Java",
            "JavaScript",
            "React"
        ],

        roadmap:[
            "Learn Mobile Development",
            "Practice App UI Design",
            "Learn APIs",
            "Publish Applications"
        ],

        advice:
        "Build mobile applications and improve app development skills."

    }

};



// =====================================
// Recommend Career
// =====================================


function recommendCareer(resumeSkills){


    let results = [];


    Object.keys(careerDatabase).forEach(career=>{


        let requiredSkills = careerDatabase[career].skills;


        let matched = resumeSkills.filter(skill =>

            requiredSkills.includes(skill)

        );



        let confidence = 0;



        if(requiredSkills.length > 0){

            confidence = Math.round(

                (matched.length / requiredSkills.length) * 100

            );

        }



        if(confidence > 0){

            results.push({

                career,

                confidence,

                matched,

                roadmap:
                careerDatabase[career].roadmap,

                advice:
                careerDatabase[career].advice

            });

        }


    });



    // Highest match first

    results.sort((a,b)=>

        b.confidence - a.confidence

    );



    return results.slice(0,3);

}



// =====================================
// Generate Learning Roadmap HTML
// =====================================


function generateRoadmap(roadmap){


    if(!roadmap) return "";


    return roadmap.map((item,index)=>{


        return `

        <div class="road-step">

            <span>${index+1}</span>

            <p>${item}</p>

        </div>

        `;


    }).join("");

}



// =====================================
// Display Career Data
// =====================================


function displayCareerResults(results){


    let careerBox =
    document.getElementById("careerSuggestions");


    let roadmapBox =
    document.getElementById("learningRoadmap");



    if(!careerBox) return;



    careerBox.innerHTML="";



    results.forEach((item,index)=>{


        careerBox.innerHTML += `


        <div class="career-item">


            <h3>

            ${index===0 ? "⭐ " : ""}

            ${item.career}

            </h3>


            <p>

            Match Confidence:
            <strong>${item.confidence}%</strong>

            </p>


            <p>

            ${item.advice}

            </p>


        </div>


        `;


    });



    if(results.length){


        roadmapBox.innerHTML =

        generateRoadmap(results[0].roadmap);


    }


}



// =====================================
// Export
// =====================================


window.careerEngine = {

    recommendCareer,

    displayCareerResults

};