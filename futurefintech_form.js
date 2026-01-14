// const SURVEY_ID = 1;
const API_BASE = "http://127.0.0.1:8000/api/applications";

const surveyJson = {
    "title": "2026 FutureFintech Fellows Survey Form",
    "showQuestionNumbers": "on",
    "pages": [
        /* =========================
        A. Applicant information
        ========================= */
        {
            "name": "applicant_information",
            "title": "A. Applicant Information",
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

        /* =========================
        B. Short Narrative
        ========================= */
        {
            "name": "short_narrative",
            "title": "B. Short Narrative",
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

        /* =========================
        C. Events
        ========================= */
        {
            "name": "events",
            "title": "C. Contributions to FutureFinTech – Events",
            "elements": [
                {
                    "type": "boolean",
                    "name": "events_na",
                    "title": "Not Applicable"
                },
                {
                    "type": "paneldynamic",
                    "name": "events",
                    "title": "Events",
                    "visibleIf": "{events_na} = false",
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
            ]
        },

        /* =========================
        D. Grants
        ========================= */
        {
            "name": "grants_projects",
            "title": "D. Contributions to FutureFinTech – Grants and Projects",
            "elements": [
                {
                    "type": "boolean",
                    "name": "grants_na",
                    "title": "Not applicable"
                },
                {
                    "type": "paneldynamic",
                    "name": "grants",
                    "title": "Grants",
                    "visibleIf": "{grants_na} = false",
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
            ]
        },

        /* =========================
        E. Partnerships and Collaborations
        ========================= */
        {
            "type": "panel",
            "name": "partnerships",
            "title": "E. Partnerships and Collaborative Projects",
            "elements": [
                {
                    "type": "boolean",
                    "name": "partnerships_na",
                    "title": "Not applicable"
                },
                {
                    "type": "paneldynamic",
                    "name": "partnerships",
                    "title": "Partnerships",
                    "visibleIf": "{partnerships_na} = false",
                    "panelAddText": "Add a partnership",
                    "panelRemoveText": "Remove",
                    "valueName": "partnerships",
                    "templateElements": [
                        {
                            "type": "text",
                            "name": "project_name",
                            "title": "Project name"
                        },
                        {
                            "type": "datepicker",
                            "name": "start_date",
                            "title": "Start date",
                            "dateFormat": "yyyy-mm-dd"
                        },
                        {
                            "type": "dropdown",
                            "name": "partnership_type",
                            "title": "Partnership type",
                            "choices": [
                                "Industrial",
                                "Governmental"
                            ]
                        },
                        {
                            "type": "text",
                            "name": "partner",
                            "title": "Partner organization"
                        },
                        {
                            "type": "text",
                            "name": "acquired_funding",
                            "title": "Acquired funding (€)",
                            "inputType": "number"
                        }
                    ]
                }
            ]
        },

        /* =========================
        F. Publications
        ========================= */
        {
            "name": "publications",
            "title": "F. Contributions to FutureFinTech – Publications",
            "elements": [
                {
                    "type": "boolean",
                    "name": "publications_na",
                    "title": "Not Applicable"
                },
                {
                    "type": "paneldynamic",
                    "name": "publications",
                    "title": "Publications",
                    "visibleIf": "{publications_na} = false",
                    "panelAddText": "Add Publication",
                    "templateElements": [
                        { "type": "text", "name": "publication_date", "title": "Publication Date", "inputType": "date" },
                        { "type": "text", "name": "publication_name", "title": "Publication Name" },
                        { "type": "text", "name": "orbilu_link", "title": "OrbiLu Link", "inputType": "url" },
                        { "type": "boolean", "name": "mixed_gender", "title": "Mixed-gender Team Composition" },
                        { "type": "boolean", "name": "mixed_team", "title": "Mixed FDEF-SnT Team Composition" }
                    ]
                }
            ]
        },

        /* =========================
        G. PhD Students Supervised
        ========================= */
        {
            "type": "panel",
            "name": "phd_students",
            "title": "G. Contributions to FutureFinTech – PhD Students Supervised",
            "elements": [
                {
                    "type": "boolean",
                    "name": "phd_students_na",
                    "title": "Not applicable"
                },
                {
                    "type": "paneldynamic",
                    "name": "phd_students",
                    "title": "PhD Students",
                    "visibleIf": "{phd_students_na} = false",
                    "panelAddText": "Add a PhD student",
                    "panelRemoveText": "Remove",
                    "valueName": "phd_students",
                    "templateElements": [
                        {
                            "type": "datepicker",
                            "name": "graduation_date",
                            "title": "Graduation date",
                            "dateFormat": "yyyy-mm-dd"
                        },
                        {
                            "type": "text",
                            "name": "student_name",
                            "title": "Student name"
                        },
                        {
                            "type": "text",
                            "name": "thesis_title",
                            "title": "Thesis title"
                        },
                        {
                            "type": "dropdown",
                            "name": "career_pursued",
                            "title": "Career pursued",
                            "choices": [
                                "Academic",
                                "Industry"
                            ]
                        },
                        {
                            "type": "text",
                            "name": "current_work_location",
                            "title": "Current work location"
                        }
                    ]
                }
            ]
        },

        /* =========================
        H. Awards and Distinctions
        ========================= */
        {
            "type": "panel",
            "name": "awards",
            "title": "H. Contributions to FutureFinTech – Awards and Distinctions",
            "elements": [
                {
                    "type": "boolean",
                    "name": "awards_na",
                    "title": "Not applicable"
                },
                {
                    "type": "paneldynamic",
                    "name": "awards",
                    "title": "Awards",
                    "visibleIf": "{awards_na} = false",
                    "panelAddText": "Add an award",
                    "panelRemoveText": "Remove",
                    "valueName": "awards",
                    "templateElements": [
                        {
                            "type": "datepicker",
                            "name": "award_date",
                            "title": "Award date",
                            "dateFormat": "yyyy-mm-dd"
                        },
                        {
                            "type": "text",
                            "name": "award_title",
                            "title": "Award title"
                        },
                        {
                            "type": "text",
                            "name": "award_subject",
                            "title": "Subject / Topic"
                        },
                        {
                            "type": "text",
                            "name": "award_issuer",
                            "title": "Issuing organization"
                        }
                    ]
                }
            ]
        },

        /* =========================
        I. Press and Media Appearances
        ========================= */
        {
            "type": "panel",
            "name": "press",
            "title": "I. Contributions to FutureFinTech – Press and Media Appearances",
            "elements": [
                {
                    "type": "boolean",
                    "name": "press_na",
                    "title": "Not applicable"
                },
                {
                    "type": "paneldynamic",
                    "name": "press",
                    "title": "Press",
                    "visibleIf": "{press_na} = false",
                    "panelAddText": "Add a press appearance",
                    "panelRemoveText": "Remove",
                    "valueName": "press",
                    "templateElements": [
                        {
                            "type": "datepicker",
                            "name": "appearance_date",
                            "title": "Date of appearance",
                            "dateFormat": "yyyy-mm-dd"
                        },
                        {
                            "type": "text",
                            "name": "press_name",
                            "title": "Media outlet"
                        },
                        {
                            "type": "dropdown",
                            "name": "press_type",
                            "title": "Media type",
                            "choices": [
                                "National",
                                "International"
                            ]
                        },
                        {
                            "type": "text",
                            "name": "appearance_type",
                            "title": "Type of appearance (interview, article, etc.)"
                        },
                        {
                            "type": "text",
                            "name": "subject",
                            "title": "Subject covered"
                        }
                    ]
                }
            ]
        },

        /* =========================
        J. Planned Contributions
        ========================= */
        {
            "name": "planned_contributions",
            "title": "J. Planned Contributions",
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

        /* =========================
        K. Feedback
        ========================= */
        {
            "name": "feedback",
            "title": "K. Feedback",
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
// survey.applyTheme(SurveyTheme.ContrastLight);
// survey.applyTheme(SurveyTheme.LayeredLight);

// ----------------------------------
// Helpers
// ----------------------------------

function getApplicationIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get("app");
}

function setApplicationIdInUrl(applicationId) {
    const url = new URL(window.location.href);
    url.searchParams.set("app", applicationId);
    window.history.replaceState({}, "", url.toString());
}

// Fields to move under "applicant"
const applicantFields = ["email", "name", "surname", "applicant_type", "affiliated_fellow_email", "discipline", "awards_na", "phd_students_na", "press_na", "partnerships_na", "events_na", "grants_na", "publications_na"];

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

function renderTopNav() {
    document.getElementById("startNewBtn").onclick = () => {
        window.location.href = window.location.origin + window.location.pathname;
    };

    document.getElementById("resumeBtn").onclick = async () => {
        const id = document.getElementById("applicationIdInput").value.trim();
        if (!id) {
            survey.notify("Provide an application ID.", "error");
            return;
        }
        try {
            await loadApplication(id, reload=false);
            setApplicationIdInUrl(id);
        } catch {
            survey.notify("Invalid application ID.", "error");
        }
    };
}

// ----------------------------------
// Load existing application (EDIT)
// ----------------------------------

async function loadApplication(applicationId, reload=true) {
    try {
        const data = await apiRequest(`${API_BASE}/${applicationId}`, "GET");
        survey.data = flattenApplicant(data);
        document.getElementById("applicationIdInput").value = applicationId;
    } catch (err) {
        console.error("Failed to load application", err);
        survey.notify("Unable to load application #" + applicationId, "error");
        if (reload) {
            // Reload the page but remove any query parameters
            window.location.href = window.location.origin + window.location.pathname;
        }
    }
}

// ----------------------------------
// Save (CREATE or UPDATE)
// ----------------------------------

async function saveDraft(survey) {
    const applicationId = getApplicationIdFromUrl();
    const isUpdate = Boolean(applicationId);

    try {
        survey.currentPage.validate();
        const result = await apiRequest(
            isUpdate
                ? `${API_BASE}/${applicationId}?status=draft`
                : `${API_BASE}?status=draft`,
            isUpdate ? "PUT" : "POST",
            nestApplicant(survey.data)
        );

        if (!isUpdate && result.application_id) {
            window.history.replaceState(
                {},
                "",
                `?app=${result.application_id}`
            );
        }

        survey.notify("Draft saved successfully", "success");
        document.getElementById("applicationIdInput").value = applicationId;

    } catch (err) {
        survey.notify("Unable to save draft. Ensure the all personal information of applicant are filled.", "error");
        console.error(err);
    }
}

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
            document.getElementById("applicationIdInput").value = applicationId;
            survey.notify("Application updated successfully.", "success");
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
        survey.notify("An unexpected error occurred while saving.", "error");
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

    survey.addNavigationItem({
        id: "save-draft",
        title: "Save for later",
        action: () => saveDraft(survey),
    });

    survey.render(document.getElementById("surveyContainer"));
    survey.onCurrentPageChanged.add(renderTopNav);
    renderTopNav();
});
