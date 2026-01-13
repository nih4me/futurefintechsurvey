// const SURVEY_ID = 1;
const API_BASE = "http://127.0.0.1:8000/api/applications";

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
                    "name": "events",
                    "title": "FinTech-related Events",
                    "panelAddText": "Add Event",
                    "panelRemoveText": "Remove",
                    "templateElements": [
                        { "type": "text", "name": "event_date", "title": "Date", "inputType": "date" },
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
                    "name": "grants",
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
                    "name": "publications",
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

// ----------------------------------
// Helpers
// ----------------------------------

function getApplicationIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get("app");
}

// Fields to move under "applicant"
const applicantFields = ["email", "name", "surname", "applicant_type", "discipline", "events_na", "grants_na", "publications_na"];

/**
 * Converts flat form data into nested form with "applicant"
 * @param {Object} data - flat form data
 * @returns {Object} - nested form data
 */
function nestApplicant(data) {
    const nested = { ...data }; // copy original
    nested.applicant = {};
    
    applicantFields.forEach(field => {
        if (field in nested) {
            nested.applicant[field] = nested[field];
            delete nested[field]; // remove from top-level
        }
    });

    return nested;
}

/**
 * Flattens nested form data, moving "applicant" fields back to top-level
 * @param {Object} data - nested form data
 * @returns {Object} - flat form data
 */
function flattenApplicant(data) {
    if (!data.applicant) return { ...data }; // nothing to flatten

    const flat = { ...data };
    applicantFields.forEach(field => {
        if (field in flat.applicant) {
            flat[field] = flat.applicant[field];
        }
    });

    delete flat.applicant; // remove the nested object
    return flat;
}

async function apiRequest(url, method, data = null) {
    const options = {
        method,
        headers: { "Content-Type": "application/json" }
    };

    if (data) {
        options.body = JSON.stringify(data);
    }

    const response = await fetch(url, options);

    if (!response.ok) {
        const errorData = await response.json();
        throw { status: response.status, data: errorData };
    }

    return response.json();
}

// ----------------------------------
// Load existing application (EDIT)
// ----------------------------------

async function loadApplication(applicationId) {
    try {
        const data = await apiRequest(`${API_BASE}/${applicationId}`, "GET");
        survey.data = flattenApplicant(data);
    } catch (err) {
        console.error("Failed to load application", err);
        alert("Unable to load application. The link may be invalid.");
        // Reload the page but remove any query parameters
        window.location.href = window.location.origin + window.location.pathname;
    }
}

// ----------------------------------
// Save (CREATE or UPDATE)
// ----------------------------------

async function saveApplication(sender) {
    const applicationId = getApplicationIdFromUrl();
    const isUpdate = Boolean(applicationId);

    try {
        const result = await apiRequest(
            isUpdate ? `${API_BASE}/${applicationId}` : API_BASE,
            isUpdate ? "PUT" : "POST",
            nestApplicant(sender.data)
        );

        if (!isUpdate) {
            // Redirect to edit URL returned by backend
            window.location.href = `${result.edit_url}`;
        } else {
            alert("Application updated successfully.");
        }

    } catch (err) {
        handleValidationErrors(err, sender);
    }
}

// ----------------------------------
// Map FastAPI validation errors → SurveyJS
// ----------------------------------

function handleValidationErrors(err, survey) {
    if (err.status !== 422 || !err.data?.detail) {
        alert("An unexpected error occurred while saving.");
        console.error(err);
        return;
    }

    // Clear previous errors
    survey.getAllQuestions().forEach(q => q.clearErrors());

    err.data.detail.forEach(error => {
        // Example FastAPI error path:
        // ["body", "applicant", "email"]
        const path = error.loc.slice(1).join(".");
        const question = survey.getQuestionByName(path);

        if (question) {
            question.addError(error.msg);
        }
    });

    survey.focusFirstError();
}

// ----------------------------------
// SurveyJS Hooks
// ----------------------------------

survey.onComplete.add(sender => {
    saveApplication(sender);
});

// Optional: auto-save draft
// survey.onValueChanged.add(Survey.FunctionFactory.Instance.create("autoSave", () => {
//   saveApplication(survey);
// }));

// ----------------------------------
// Init
// ----------------------------------

document.addEventListener("DOMContentLoaded", async () => {
    const applicationId = getApplicationIdFromUrl();

    if (applicationId) {
        await loadApplication(applicationId);
    }

    survey.render(document.getElementById("surveyContainer"));
});
