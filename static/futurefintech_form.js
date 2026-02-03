// const SURVEY_ID = 1;
const API_BASE = "http://localhost:8001/api/submissions";

const year = "2026";
const surveyJson = {
  "showProgressBar": "true",
  "progressBarLocation": "aboveHeader",
  // "title": "Fellows Survey Form " + year,
  "showQuestionNumbers": "on",
  "pages": [
    /* =========================
    Introduction
    ========================= */
    {
      name: "introduction",
      title: "FutureFinTech Incentive & Reward Scheme",
      elements: [
        {
          type: "html",
          name: "introText",
          html: `
            <div style="max-width: 700px; margin: 0 auto; line-height: 1.6;">
              <p>
                The objective of the <strong>FutureFinTech Incentive & Reward Scheme</strong> is to recognise 
                and encourage contributions that strengthen the FutureFinTech community, increase its impact, 
                and support the development of new activities.
              </p>

              <p>
                This form allows Fellows and Affiliated Researchers to declare their achievements for 
                consideration under the scheme and supports reporting obligations towards funders 
                and institutional stakeholders.
              </p>

              <p>
                The form is cumulative and can be completed progressively over the lifetime of the project 
                as new achievements occur. Cut-off dates for the annual assessment of incentives and 
                rewards will be communicated separately.
              </p>

              <p>
                To ensure fair and transparent assessment, only activities recorded in this form will be 
                taken into account, and Fellows and Affiliated Researchers are responsible for the accuracy 
                and completeness of the information provided.
              </p>
            </div>
          `
        }
      ]
    },
    /* =========================
    Disclaimer
    ========================= */
    {
      name: "disclaimer",
      title: "Data Protection Disclaimer",
      elements: [
        {
          type: "html",
          name: "disclaimerText",
          html: `
            <div style="text-align:justify;">
              <p><strong>DISCLAIMER</strong></p>
              <p>
                The University of Luxembourg (2 place de l’Université, L-4365 Esch-sur-Alzette)
                collects your personal data in the context of the FutureFinTech fellowship scheme
                and the related key performance indicator (KPI) reporting obligations to the
                Luxembourg National Research Fund (“Fonds National de la Recherche” or “FNR”)
                for the FutureFinTech project (the “Project”) in which you participate(d).
              </p>
              <p>
                In particular, the University is required to report to FNR on scientific publications,
                research projects, events attended or organised, and other relevant activities in the
                research field of FutureFinTech.
              </p>

              <p>
                For this fellowship scheme and KPI reporting, the University may collect the following
                personal data from you: first and last name, professional email address, job title/position,
                department, events organised and/or attended, publications (e.g. title and date of publication),
                projects awarded and implemented, PhD candidates supervised (name and title of thesis),
                and titles of research projects conducted in or related to the FutureFinTech research domain.
              </p>

              <p>
                Your personal data will be used exclusively for reporting to the FNR in fulfilment of
                contractual obligations and for the implementation of the FutureFinTech Fellowship
                Incentive and Reward Scheme within the Project. The data collected will only be accessible
                to the team of the University of Luxembourg involved in FNR reporting and to the FNR itself,
                and will be stored by the University and deleted 5 years after the end of the project.
              </p>

              <p>
                The legal basis for the processing of your personal data is the legitimate interest of
                the University of Luxembourg in complying with the reporting requirements imposed by
                the FNR for the Project (Article 6(1)(f) of the General Data Protection Regulation, “GDPR”).
              </p>

              <p>
                You have the right to object to this processing of your data at
                <a href="mailto:futurefintech@uni.lu">futurefintech@uni.lu</a>.
                Please note that exercising this right may result in your contribution to the Project
                not being reported to the FNR and not being taken into account for the FutureFinTech
                Fellowship Incentive and Reward Scheme.
              </p>

              <p>
                You also have the right to access your personal data and to request rectification of
                inaccurate or incomplete information, and, where applicable, to request the deletion
                of your data, in accordance with the GDPR. Information on how to exercise these rights
                is available on the webpage “Your rights – University of Luxembourg”.
              </p>

              <p>
                Any questions may be addressed to the University’s Data Protection Officer (DPO)
                via the DPO4U ticketing system in ServiceNow.
              </p>
            </div>
          `
        },
        {
          type: "checkbox",
          name: "consent",
          title: "Consent",
          isRequired: true,
          choices: ["I have read and understood the data protection disclaimer"],
          validators: [
            {
              type: "expression",
              expression: "{consent} contains 'I have read and understood the data protection disclaimer'",
              text: "You must agree to continue."
            }
          ]
        }
      ]
    },
    /* =========================
    A. Contributor information
    ========================= */
    {
      "name": "contributor_information",
      "title": "A. Contributor Information",
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
          "name": "contributor_type",
          "title": "Contributor Type",
          "isRequired": true,
          "choices": ["Fellow", "Affiliated Researcher"]
        },
        {
          "type": "text",
          "name": "affiliated_fellow_email",
          "title": "Affiliated Fellow Email Address",
          "visibleIf": "{contributor_type} = 'Affiliated Researcher'",
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
          "maxLength": 250,
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
          "name": "has_events",
          "title": "Have you participated in or organised events related to FutureFinTech or the FinTech research area?"
        },
        {
          "type": "paneldynamic",
          "confirmDelete": true,
          "displayMode": "tab",
          "templateTabTitle": "Event {panelIndex}",
          "name": "events",
          "title": "Events",
          "visibleIf": "{has_events} = true",
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
                "FutureFinTech lectures",
                "FutureFinTech x industry (Talks, roundtables, or workshops connecting research and industry)",
                "FutureFinTech forums (Interdisciplinary forums and thematic workshops)",
                "Transversal themes (Workshops or sessions with focus on Trainign and capacity building / Gender/Open science and research transparency)",
                "Working papers",
                "FutureFinTech Federated Conference (F3C)",
                "Conference"
              ]
            },
            { "type": "text", "name": "location", "title": "Location" },
            {
              "type": "dropdown",
              "name": "role",
              "title": "Role",
              "choices": [
                "Attendee",
                "Accepted Paper Presenter",
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
          "name": "has_new_fundings",
          "title": "Have you acquired or significantly contributed to grants or projects related to FutureFinTech or the FinTech research area?"
        },
        {
          "type": "paneldynamic",
          "confirmDelete": true,
          "displayMode": "tab",
          "templateTabTitle": "Grant {panelIndex}",
          "name": "grants",
          "title": "Grants",
          "visibleIf": "{has_new_fundings} = true",
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
            {
              "type": "dropdown",
              "name": "role",
              "title": " Your role in the project",
              "choices": [
                "Principle Investigator",
                "Co-Principal Investigator",
                "Contributor",
                "WP leader"
              ],
              "showOtherItem": true,
              "otherText": "Other",
              "otherPlaceholder": "Please specify"
            },
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
          "name": "has_partnerships",
          "title": "Have you acquired or significantly contributed to industrial partnerships and/or collaborative projects with public bodies in the FinTech area?"
        },
        {
          "type": "paneldynamic",
          "confirmDelete": true,
          "displayMode": "tab",
          "templateTabTitle": "Partnership {panelIndex}",
          "name": "partnerships",
          "title": "Partnerships",
          "visibleIf": "{has_partnerships} = true",
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
              "type": "dropdown",
              "name": "role",
              "title": " Your role in the project",
              "choices": [
                "Principle Investigator",
                "Co-Principal Investigator",
                "Contributor",
                "WP leader"
              ],
              "showOtherItem": true,
              "otherText": "Other",
              "otherPlaceholder": "Please specify"
            },
            {
              "type": "text",
              "name": "acquired_funding",
              "title": "Acquired funding (€)",
              "inputType": "number"
            },
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
          "name": "has_publications",
          "title": "Have you published papers eligible under the FutureFinTech Incentive & Reward Scheme (e.g. Scopus Top 10% journals, top conference proceedings, FT50 journal publications, peer-reviewed law publications)?"
        },
        {
          "type": "paneldynamic",
          "confirmDelete": true,
          "displayMode": "tab",
          "templateTabTitle": "Publication {panelIndex}",
          "name": "publications",
          "title": "Publications",
          "visibleIf": "{has_publications} = true",
          "panelAddText": "Add Publication",
          "templateElements": [
            { "type": "text", "name": "publication_date", "title": "Publication Date", "inputType": "date" },
            { "type": "text", "name": "publication_name", "title": "Title of publication" },
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
          "name": "has_phd_students",
          "title": "Do you supervise or have you supervised PhD students related to FutureFinTech or the FinTech research area?"
        },
        {
          "type": "paneldynamic",
          "confirmDelete": true,
          "displayMode": "tab",
          "templateTabTitle": "PhD Student {panelIndex}",
          "name": "phd_students",
          "title": "PhD Students",
          "visibleIf": "{has_phd_students} = true",
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
          "name": "has_awards",
          "title": "Have you received any awards or distinctions related to FutureFinTech or the FinTech research area?"
        },
        {
          "type": "paneldynamic",
          "confirmDelete": true,
          "displayMode": "tab",
          "templateTabTitle": "Award {panelIndex}",
          "name": "awards",
          "title": "Awards",
          "visibleIf": "{has_awards} = true",
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
          "name": "has_press",
          "title": "Do you have any press or media appearances related to FutureFinTech or the FinTech area to report?"
        },
        {
          "type": "paneldynamic",
          "confirmDelete": true,
          "displayMode": "tab",
          "templateTabTitle": "Press {panelIndex}",
          "name": "press",
          "title": "Press",
          "visibleIf": "{has_press} = true",
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
          "title": "Outline your planned contributions to FutureFinTech for " + year + " (max 150 words).",
          "maxLength": 150,
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
survey.applyTheme({
  "cssVariables": {
    "--primary": "#049DD9",
  },
});

// ----------------------------------
// Helpers
// ----------------------------------

function getSubmissionIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("app");
}

function setSubmissionIdInUrl(submissionId) {
  const url = new URL(window.location.href);
  url.searchParams.set("app", submissionId);
  window.history.replaceState({}, "", url.toString());
}

// Fields to move under "contributor"
const contributorFields = ["email", "name", "surname", "contributor_type", "affiliated_fellow_email", "discipline", "has_awards", "has_phd_students", "has_press", "has_partnerships", "has_events", "has_new_fundings", "has_publications"];

/**
 * Converts flat form data into nested form with "contributor"
 * @param {Object} data - flat form data
 * @returns {Object} - nested form data
 */
function nestContributor(data) {
  const nested = { ...data }; // copy original
  nested.contributor = {};

  contributorFields.forEach(field => {
    if (field in nested) {
      nested.contributor[field] = nested[field];
      delete nested[field]; // remove from top-level
    }
  });

  return nested;
}

/**
 * Flattens nested form data, moving "contributor" fields back to top-level
 * @param {Object} data - nested form data
 * @returns {Object} - flat form data
 */
function flattenContributor(data) {
  if (!data.contributor) return { ...data }; // nothing to flatten

  const flat = { ...data };
  contributorFields.forEach(field => {
    if (field in flat.contributor) {
      flat[field] = flat.contributor[field];
    }
  });

  delete flat.contributor; // remove the nested object
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
    const id = document.getElementById("submissionIdInput").value.trim();
    if (!id) {
      survey.notify("Provide an submission ID.", "error");
      return;
    }
    try {
      await loadSubmission(id, reload = false);
    } catch {
      survey.notify("Invalid submission ID.", "error");
    }
  };
}

// ----------------------------------
// Load existing submission (EDIT)
// ----------------------------------

async function loadSubmission(submissionId, reload = true) {
  try {
    const data = await apiRequest(`${API_BASE}/${submissionId}`, "GET");
    survey.data = flattenContributor(data);
    document.getElementById("submissionIdInput").value = submissionId;
    setSubmissionIdInUrl(submissionId);
  } catch (err) {
    console.error("Failed to load submission", err);
    survey.notify("Unable to load submission #" + submissionId, "error");
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
  const submissionId = getSubmissionIdFromUrl();
  const isUpdate = Boolean(submissionId);

  try {
    survey.currentPage.validate();
    const result = await apiRequest(
      isUpdate
        ? `${API_BASE}/${submissionId}?status=draft`
        : `${API_BASE}?status=draft`,
      isUpdate ? "PUT" : "POST",
      nestContributor(survey.data)
    );

    if (!isUpdate && result.submission_id) {
      window.history.replaceState(
        {},
        "",
        `?app=${result.submission_id}`
      );
    }

    survey.notify("Draft saved successfully", "success");
    document.getElementById("submissionIdInput").value = submissionId;

  } catch (err) {
    survey.notify("Unable to save draft. Ensure the all personal information of contributor are filled.", "error");
    console.error(err);
  }
}

async function saveSubmission(sender) {
  const submissionId = getSubmissionIdFromUrl();
  const isUpdate = Boolean(submissionId);

  try {
    const result = await apiRequest(
      isUpdate ? `${API_BASE}/${submissionId}` : API_BASE,
      isUpdate ? "PUT" : "POST",
      nestContributor(sender.data)
    );

    if (!isUpdate) {
      // Redirect to edit URL returned by backend
      window.location.href = `${result.edit_url}`;
    } else {
      document.getElementById("submissionIdInput").value = submissionId;
      survey.notify("Submission updated successfully.", "success");
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
    // ["body", "contributor", "email"]
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
  saveSubmission(sender);
});

// Optional: auto-save draft
// survey.onValueChanged.add(Survey.FunctionFactory.Instance.create("autoSave", () => {
//   saveSubmission(survey);
// }));

// ----------------------------------
// Init
// ----------------------------------

document.addEventListener("DOMContentLoaded", async () => {
  const submissionId = getSubmissionIdFromUrl();

  if (submissionId) {
    await loadSubmission(submissionId);
  }

  const saveDraftItem = survey.addNavigationItem({
    id: "save-draft",
    title: "Save for later",
    action: () => saveDraft(survey),
    visible: false,
  });

  survey.render(document.getElementById("surveyContainer"));
  survey.onCurrentPageChanged.add(renderTopNav);
  renderTopNav();

  survey.onCurrentPageChanged.add(function(sender) {
    const pageIndex = sender.pages.indexOf(sender.currentPage);
    saveDraftItem.visible = pageIndex >= 2;
  });
});
