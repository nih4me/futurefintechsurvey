// const SURVEY_ID = 1;

const surveyJson = {
    "title": "2026 FutureFintech Fellows Survey Form",
    "showQuestionNumbers": "on",
    "pages": [
        {
            "name": "applicant_information",
            "title": "1. Applicant Information",
            "elements": [
                {
                    "type": "text",
                    "name": "email",
                    "title": "Email",
                    "isRequired": true,
                    "inputType": "email",
                    "validators": [
                        {
                            "type": "regex",
                            "regex": "^[A-Za-z0-9._%+-]+@uni\\.lu$",
                            "text": "Only email addresses ending with @uni.lu are accepted."
                        }
                    ]
                },
                {
                    "type": "text",
                    "name": "name",
                    "title": "Name",
                    "isRequired": true
                },
                {
                    "type": "text",
                    "name": "surname",
                    "title": "Surname",
                    "isRequired": true
                },
                {
                    "type": "radiogroup",
                    "name": "applicant_type",
                    "title": "Applicant Type",
                    "isRequired": true,
                    "choices": ["Fellow", "Affiliated Researcher"]
                },
                {
                    "type": "text",
                    "name": "affiliated_fellow_email",
                    "title": "Affiliated Fellow Email Address",
                    "visibleIf": "{applicant_type} = 'Affiliated Researcher'",
                    "isRequired": true,
                    "inputType": "email",
                    "validators": [
                        {
                            "type": "regex",
                            "regex": "^[A-Za-z0-9._%+-]+@uni\\.lu$",
                            "text": "Only email addresses ending with @uni.lu are accepted."
                        }
                    ]
                },
                {
                    "type": "radiogroup",
                    "name": "discipline",
                    "title": "Discipline",
                    "isRequired": true,
                    "choices": ["Finance and Economics", "Technology", "Law"]
                }
            ]
        },
        {
            "name": "short_narrative",
            "title": "2. Short Narrative",
            "elements": [
                {
                    "type": "comment",
                    "name": "narrative",
                    "title": "Provide a short narrative (max 250 words) highlighting your contributions and impact in FinTech.",
                    "isRequired": true,
                    "maxLength": 250
                }
            ]
        },
        {
            "name": "events",
            "title": "3. Contributions to FutureFinTech – Events",
            "elements": [
                {
                    "type": "paneldynamic",
                    "name": "events_list",
                    "title": "FinTech-related Events",
                    "panelAddText": "Add Event",
                    "panelRemoveText": "Remove",
                    "templateElements": [
                        { "type": "text", "name": "date", "title": "Date", "inputType": "date" },
                        { "type": "text", "name": "event_name", "title": "Event Name" },
                        {
                            "type": "dropdown",
                            "name": "event_type",
                            "title": "Event Type",
                            "choices": [
                                "FutureFinTech Lecture",
                                "Working Papers",
                                "Conference",
                                "FutureFinTech Federated Conference (F3C)",
                                "FutureFinTech Annual Event",
                                "Other"
                            ]
                        },
                        { "type": "text", "name": "location", "title": "Location" },
                        {
                            "type": "dropdown",
                            "name": "role",
                            "title": "Role",
                            "choices": [
                                "Attendee",
                                "Presenter, Moderator or Session Chair",
                                "Speaker",
                                "Keynote Speaker",
                                "Organizer",
                                "Co-Organizer",
                                "Reviewer",
                                "Committee Member",
                                "Track Chair",
                                "Programme Chair",
                                "Conference Chair"
                            ]
                        }
                    ]
                },
                {
                    "type": "boolean",
                    "name": "events_na",
                    "title": "Not Applicable"
                }
            ]
        },
        {
            "name": "grants_projects",
            "title": "3. Contributions to FutureFinTech – Grants and Projects",
            "elements": [
                {
                    "type": "paneldynamic",
                    "name": "grants_list",
                    "panelAddText": "Add Project",
                    "templateElements": [
                        { "type": "text", "name": "project_name", "title": "Project Name" },
                        { "type": "text", "name": "start_date", "title": "Project Start Date", "inputType": "date" },
                        { "type": "text", "name": "end_date", "title": "Project End Date", "inputType": "date" },
                        {
                            "type": "dropdown",
                            "name": "funder",
                            "title": "Funder",
                            "choices": ["EU", "IAS", "FNR", "Other"]
                        },
                        { "type": "text", "name": "funding_programme", "title": "Funding Programme" },
                        { "type": "boolean", "name": "mixed_gender", "title": "Mixed-gender Grant" },
                        { "type": "boolean", "name": "mixed_team", "title": "Mixed FDEF-SnT Team Composition" }
                    ]
                },
                { "type": "boolean", "name": "grants_na", "title": "Not Applicable" }
            ]
        },
        {
            "name": "publications",
            "title": "3. Contributions to FutureFinTech – Publications",
            "elements": [
                {
                    "type": "paneldynamic",
                    "name": "publications_list",
                    "panelAddText": "Add Publication",
                    "templateElements": [
                        { "type": "text", "name": "publication_date", "title": "Publication Date", "inputType": "date" },
                        { "type": "text", "name": "publication_name", "title": "Publication Name" },
                        { "type": "text", "name": "orbilu_link", "title": "OrbiLu Link", "inputType": "url" },
                        { "type": "boolean", "name": "mixed_gender", "title": "Mixed-gender Team Composition" },
                        { "type": "boolean", "name": "mixed_team", "title": "Mixed FDEF-SnT Team Composition" }
                    ]
                },
                { "type": "boolean", "name": "publications_na", "title": "Not Applicable" }
            ]
        },
        {
            "name": "planned_contributions",
            "title": "4. Planned Contributions",
            "elements": [
                {
                    "type": "comment",
                    "name": "planned_contributions",
                    "title": "Outline your planned contributions to FutureFinTech for 2025 (max 150 words).",
                    "isRequired": true,
                    "maxLength": 150
                }
            ]
        },
        {
            "name": "feedback",
            "title": "5. Feedback",
            "elements": [
                {
                    "type": "rating",
                    "name": "form_intuitive",
                    "title": "How intuitive did you find the form?",
                    "isRequired": true,
                    "rateMin": 1,
                    "rateMax": 5
                },
                {
                    "type": "rating",
                    "name": "form_easy",
                    "title": "How easy was it to insert the information?",
                    "rateMin": 1,
                    "rateMax": 5
                },
                {
                    "type": "comment",
                    "name": "suggestions",
                    "title": "Do you have any suggestions for future calls or improvements?"
                }
            ]
        }
    ]
};

const survey = new Survey.Model(surveyJson);

// function saveSurveyResults(url, json) {
//     fetch(url, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json;charset=UTF-8'
//         },
//         body: JSON.stringify(json)
//     })
//     .then(response => {
//         if (response.ok) {
//             // Handle success
//         } else {
//             // Handle error
//         }
//     })
//     .catch(error => {
//         // Handle error
//     });
// }

function alertResults(sender) {
    const results = JSON.stringify(sender.data);
    alert(results);
    // saveSurveyResults(
    //     "https://web-service.com/" + SURVEY_ID,
    //     sender.data
    // )
}

survey.onComplete.add(alertResults);

document.addEventListener("DOMContentLoaded", function () {
    survey.render(document.getElementById("surveyContainer"));
});