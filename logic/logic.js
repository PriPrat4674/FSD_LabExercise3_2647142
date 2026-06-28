const views = {
  landing: document.getElementById("landing-view"),
  wizard: document.getElementById("wizard-view"),
  dashboard: document.getElementById("dashboard-view"),
};

const themeToggleBtn = document.getElementById("theme-toggle");
const sunIcon = document.getElementById("theme-toggle-sun");
const moonIcon = document.getElementById("theme-toggle-moon");
const btnStartWizard = document.getElementById("btn-start-wizard");
const greetingEl = document.getElementById("dynamic-greeting");
const contrastBtn = document.getElementById("btn-contrast-toggle");
const cursorGlow = document.getElementById("cursor-glow");
const tutorialModal = document.getElementById("tutorial-modal");
const errorSummaryEl = document.getElementById("error-summary");
const badgeRow = document.getElementById("badge-row");
const regDateField = document.getElementById("registration-date-auto");

// dynamic time based greeting
function updateGreeting() {
  const hours = new Date().getHours();
  let greeting = "Good Evening!";

  if (hours < 12) {
    greeting = "Good morning!";
  } else if (hours < 17) {
    greeting = "Good Afternoon!";
  }

  if (greetingEl) greetingEl.textContent = greeting;
}

// theme management system
function initTheme() {
  const isDark =
    localStorage.getItem("theme") === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  if (isDark) {
    document.documentElement.classList.add("dark");
    moonIcon.classList.remove("hidden");
    sunIcon.classList.add("hidden");
  } else {
    document.documentElement.classList.remove("dark");
    moonIcon.classList.add("hidden");
    sunIcon.classList.remove("hidden");
  }
}

themeToggleBtn.addEventListener("click", () => {
  const isCurrentlyDark = document.documentElement.classList.contains("dark");
  if (isCurrentlyDark) {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
    sunIcon.classList.remove("hidden");
    moonIcon.classList.add("hidden");
  } else {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
    sunIcon.classList.add("hidden");
    moonIcon.classList.remove("hidden");
  }
});

// high contrast mode toggle
if (localStorage.getItem("highContrast") === "1") {
  document.documentElement.classList.add("high-contrast");
  contrastBtn.setAttribute("aria-pressed", "true");
}
contrastBtn.addEventListener("click", () => {
  const isHC = document.documentElement.classList.toggle("high-contrast");
  contrastBtn.setAttribute("aria-pressed", String(isHC));
  localStorage.setItem("highContrast", isHC ? "1" : "0");
});

// cursor glow effect
document.addEventListener("mousemove", (e) => {
  cursorGlow.style.left = `${e.clientX}px`;
  cursorGlow.style.top = `${e.clientY}px`;
  cursorGlow.style.opacity = "1";
});
document.addEventListener("mouseleave", () => {
  cursorGlow.style.opacity = "0";
});

// ripple effect (delegated to any .ripple-btn)
document.addEventListener("click", (e) => {
  const btn = e.target.closest(".ripple-btn");
  if (!btn) return;
  const rect = btn.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const span = document.createElement("span");
  span.className = "ripple-span";
  span.style.width = span.style.height = `${size}px`;
  span.style.left = `${e.clientX - rect.left - size / 2}px`;
  span.style.top = `${e.clientY - rect.top - size / 2}px`;
  btn.appendChild(span);
  setTimeout(() => span.remove(), 600);
});

// tutorial video modal
document.getElementById("btn-open-tutorial").addEventListener("click", () => {
  tutorialModal.classList.remove("hidden");
});
document.getElementById("btn-close-tutorial").addEventListener("click", () => {
  tutorialModal.classList.add("hidden");
});
tutorialModal.addEventListener("click", (e) => {
  if (e.target === tutorialModal) tutorialModal.classList.add("hidden");
});

function switchView(targetViewKey) {
  Object.keys(views).forEach((key) => {
    if (key === targetViewKey) {
      views[key].classList.remove("hidden");
    } else {
      views[key].classList.add("hidden");
    }
  });
}

btnStartWizard.addEventListener("click", () => {
  switchView("wizard");
});

// 3D Tilt / Parallax Effect
const heroCard = document.getElementById("hero-card");

heroCard.addEventListener("mousemove", (e) => {
  const rect = heroCard.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  const distanceX = x - centerX;
  const distanceY = y - centerY;
  const rotateY = (distanceX / centerX) * 15;
  const rotateX = (-distanceY / centerY) * 15;
  heroCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});

heroCard.addEventListener("mouseleave", () => {
  heroCard.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
});

let currentStep = 1;
const totalSteps = 6;

const btnNext = document.getElementById("btn-next");
const btnPrev = document.getElementById("btn-prev");
const progressFill = document.getElementById("progress-fill");
const currentStepText = document.getElementById("current-step-text");
const progressPercentage = document.getElementById("progress-percentage");

// Step 1 variables
const fullNameInput = document.getElementById("full-name");
const firstNameAuto = document.getElementById("first-name-auto");
const lastNameAuto = document.getElementById("last-name-auto");
const nameCounter = document.getElementById("name-counter");
const dobInput = document.getElementById("dob-input");
const ageDisplay = document.getElementById("age-display");
const dobError = document.getElementById("dob-error");
const emailInput = document.getElementById("email-input");
const emailError = document.getElementById("email-error");
const passwordInput = document.getElementById("password-input");
const confirmPasswordInput = document.getElementById("confirm-password-input");
const confirmTick = document.getElementById("confirm-tick");
const strengthLabel = document.getElementById("strength-label");
const btnTogglePassword = document.getElementById("btn-toggle-password");

// Step 2 variables
const phoneInput = document.getElementById("phone-number");
const phoneError = document.getElementById("phone-error");
const addressInput = document.getElementById("address-input");
const addressCounter = document.getElementById("address-counter");

// Step 3 variables
const profilePicUpload = document.getElementById("profile-pic-upload");
const profilePicPreview = document.getElementById("profile-pic-preview");
const profilePicPlaceholder = document.getElementById(
  "profile-pic-placeholder",
);
const resumeUpload = document.getElementById("resume-upload");
const resumeSkeleton = document.getElementById("resume-skeleton");
const extractedData = document.getElementById("extracted-data");
const resumeFallback = document.getElementById("resume-fallback");
const aiSummaryText = document.getElementById("ai-summary-text");
const skillsExtracted = document.getElementById("skills-extracted");
const educationExtracted = document.getElementById("education-extracted");
const experienceExtracted = document.getElementById("experience-extracted");
const certificationsExtracted = document.getElementById(
  "certifications-extracted",
);
const skillsLabel = document.getElementById("skills-label");
const educationLabel = document.getElementById("education-label");
const experienceLabel = document.getElementById("experience-label");
const certificationsLabel = document.getElementById("certifications-label");
let profilePicDataUrl = null;
let resumeUploadedFlag = false;

// Step 4 variables
const jobSelector = document.getElementById("job-selector");
const jobsContainer = document.getElementById("selected-jobs-container");
const noJobsText = document.getElementById("no-jobs-text");
let selectedJobs = [];

function calcAge(dobStr) {
  const dob = new Date(dobStr);
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const hadBirthday =
    today.getMonth() > dob.getMonth() ||
    (today.getMonth() === dob.getMonth() && today.getDate() >= dob.getDate());
  if (!hadBirthday) age--;
  return age;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(email);
}

function getPasswordChecks(pwd) {
  return {
    length: pwd.length >= 8 && pwd.length <= 20,
    upper: /[A-Z]/.test(pwd),
    lower: /[a-z]/.test(pwd),
    digit: /[0-9]/.test(pwd),
    special: /[^A-Za-z0-9]/.test(pwd),
  };
}

function isStrongPassword(pwd) {
  const c = getPasswordChecks(pwd);
  return c.length && c.upper && c.lower && c.digit && c.special;
}

const PASSWORD_RULE_LABELS = {
  length: "8–20 characters",
  upper: "1 uppercase letter",
  lower: "1 lowercase letter",
  digit: "1 digit",
  special: "1 special character",
};

function updatePasswordUI() {
  const pwd = passwordInput.value;
  const checks = getPasswordChecks(pwd);

  document.querySelectorAll("#password-rules li").forEach((li) => {
    const rule = li.dataset.rule;
    const passed = checks[rule];
    li.textContent = (passed ? "✔ " : "○ ") + PASSWORD_RULE_LABELS[rule];
    li.classList.toggle("text-emerald-600", passed);
    li.classList.toggle("dark:text-emerald-400", passed);
    li.classList.toggle("text-slate-500", !passed);
  });

  const passedCount = Object.values(checks).filter(Boolean).length;
  const segs = document.querySelectorAll(".strength-seg");
  let level = 0;
  let color = "#ef4444";
  let label = "Weak";
  if (passedCount >= 5) {
    level = 3;
    color = "#10b981";
    label = "Strong";
  } else if (passedCount >= 3) {
    level = 2;
    color = "#f59e0b";
    label = "Medium";
  } else if (passedCount >= 1) {
    level = 1;
  }
  segs.forEach((seg, i) => {
    seg.style.background = i < level ? color : "#334155";
  });
  strengthLabel.textContent = pwd
    ? `Password strength: ${label}`
    : "Password strength: —";

  updateConfirmTick();
}

function updateConfirmTick() {
  const match =
    passwordInput.value && passwordInput.value === confirmPasswordInput.value;
  confirmTick.classList.toggle("hidden", !match);
}

btnTogglePassword.addEventListener("click", () => {
  const showing = passwordInput.type === "text";
  passwordInput.type = showing ? "password" : "text";
  btnTogglePassword.setAttribute(
    "aria-label",
    showing ? "Show password" : "Hide password",
  );
});

// validations and errors
function getStepErrors(step) {
  const errors = [];
  switch (step) {
    case 1: {
      const name = fullNameInput.value.trim();
      if (!name || name.length < 3) {
        errors.push({
          id: "full-name",
          msg: "Full name is required (min 3 characters).",
        });
      }
      if (!dobInput.value) {
        errors.push({ id: "dob-input", msg: "Date of birth is required." });
      } else if (calcAge(dobInput.value) < 18) {
        errors.push({
          id: "dob-input",
          msg: "You must be at least 18 years old.",
        });
      }
      if (!isValidEmail(emailInput.value.trim())) {
        errors.push({ id: "email-input", msg: "Enter a valid email address." });
      }
      if (!isStrongPassword(passwordInput.value)) {
        errors.push({
          id: "password-input",
          msg: "Password does not meet all requirements.",
        });
      }
      if (
        !confirmPasswordInput.value ||
        confirmPasswordInput.value !== passwordInput.value
      ) {
        errors.push({
          id: "confirm-password-input",
          msg: "Passwords do not match.",
        });
      }
      return errors;
    }
    case 2: {
      const phone = phoneInput.value.trim();
      if (!phone || !/^\+?\d{7,15}$/.test(phone)) {
        errors.push({ id: "phone-number", msg: "Enter a valid phone number." });
      }
      return errors;
    }
    case 3: {
      const sectionsFilled = [
        skillsExtracted,
        educationExtracted,
        experienceExtracted,
        certificationsExtracted,
      ].some((el) => el.value.trim());
      if (!resumeUploadedFlag && !sectionsFilled) {
        errors.push({
          id: "resume-upload",
          msg: "Upload a resume or fill at least one section manually.",
        });
      }
      return errors;
    }
    case 4: {
      if (selectedJobs.length === 0) {
        errors.push({
          id: "job-selector",
          msg: "Select at least one target role.",
        });
      }
      return errors;
    }
    case 5: {
      [1, 2, 3, 4].forEach((s) => errors.push(...getStepErrors(s)));
      return errors;
    }
    default:
      return errors;
  }
}

function renderErrorSummary(errors) {
  if (errors.length === 0) {
    errorSummaryEl.classList.add("hidden");
    errorSummaryEl.innerHTML = "";
    return;
  }
  errorSummaryEl.classList.remove("hidden");
  errorSummaryEl.innerHTML = errors
    .map((e) => `<div>• ${e.msg}</div>`)
    .join("");
}

function refreshStepValidation() {
  const errors = getStepErrors(currentStep);
  renderErrorSummary(errors);
  btnNext.disabled = errors.length > 0;
  btnNext.setAttribute("aria-disabled", String(errors.length > 0));
  return errors;
}

function attemptNext() {
  const errors = refreshStepValidation();
  if (errors.length > 0) {
    showToast(errors[0].msg, "warning");
    const activeStepEl = document.getElementById(`step-${currentStep}`);
    if (activeStepEl) {
      activeStepEl.classList.add("animate-pulse", "border-rose-500/50");
      setTimeout(
        () =>
          activeStepEl.classList.remove("animate-pulse", "border-rose-500/50"),
        500,
      );
    }
    const firstInvalid = document.getElementById(errors[0].id);
    if (firstInvalid && firstInvalid.offsetParent !== null) {
      firstInvalid.scrollIntoView({ behavior: "smooth", block: "center" });
      firstInvalid.focus();
    }
    return false;
  }
  return true;
}

//badges for the gamification
const milestonesAwarded = new Set();
const BADGES = {
  25: "First Steps",
  50: "Halfway Hero",
  75: "Almost There",
  100: "Application Master",
};
function checkMilestones(percent) {
  Object.keys(BADGES).forEach((m) => {
    const milestone = Number(m);
    if (percent >= milestone && !milestonesAwarded.has(milestone)) {
      milestonesAwarded.add(milestone);
      const badge = document.createElement("span");
      badge.className =
        "px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-400 text-xs font-bold";
      badge.textContent = `🏅 ${BADGES[milestone]}`;
      badgeRow.appendChild(badge);
      showToast(`Milestone unlocked: ${BADGES[milestone]}`, "success");
    }
  });
}

function updateWizardUI() {
  document.querySelectorAll(".wizard-step").forEach((stepEl, index) => {
    if (index + 1 === currentStep) {
      stepEl.classList.remove("hidden");
      requestAnimationFrame(() => stepEl.classList.add("step-active"));
    } else {
      stepEl.classList.add("hidden");
      stepEl.classList.remove("step-active");
    }
  });

  const percent = Math.round((currentStep / totalSteps) * 100);
  progressFill.style.width = `${percent}%`;
  progressFill.setAttribute("aria-valuenow", String(percent));
  progressPercentage.textContent = `${percent}%`;
  currentStepText.textContent = currentStep;
  checkMilestones(percent);

  btnPrev.classList.toggle("hidden", currentStep === 1);
  btnNext.textContent =
    currentStep === totalSteps - 1 ? "Submit Application" : "Next Step";

  if (currentStep === 5) {
    document.getElementById("review-name").textContent =
      fullNameInput.value || "Not provided";
    document.getElementById("review-email").textContent =
      emailInput.value || "Not provided";
    document.getElementById("review-phone").textContent =
      phoneInput.value || "Not provided";

    const reviewRolesContainer = document.getElementById("review-roles");
    reviewRolesContainer.innerHTML = "";
    if (selectedJobs.length === 0) {
      reviewRolesContainer.innerHTML =
        '<span class="text-sm text-slate-500 italic">No roles selected.</span>';
    } else {
      selectedJobs.forEach((job) => {
        const badge = document.createElement("span");
        badge.className =
          "px-2 py-1 rounded-md bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs font-medium";
        badge.textContent = job;
        reviewRolesContainer.appendChild(badge);
      });
    }
  }

  refreshStepValidation();
}

function goToStep(step) {
  currentStep = step;
  updateWizardUI();
  document
    .getElementById(`step-${step}`)
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
}
document.querySelectorAll("[data-edit-step]").forEach((btn) => {
  btn.addEventListener("click", () => goToStep(Number(btn.dataset.editStep)));
});

// navigation listeners
btnPrev.addEventListener("click", () => {
  if (currentStep > 1) {
    currentStep--;
    updateWizardUI();
  }
});

btnNext.addEventListener("click", () => {
  if (!attemptNext()) return;
  if (currentStep < totalSteps - 1) {
    currentStep++;
    updateWizardUI();
  } else {
    triggerSuccessSequence();
  }
});

// splitting name , DOB, email and password
fullNameInput.addEventListener("input", (e) => {
  let rawValue = e.target.value.replace(/[^a-zA-Z\s]/g, "");
  e.target.value = rawValue;
  nameCounter.textContent = rawValue.length;

  const nameParts = rawValue.trim().split(/\s+/);
  firstNameAuto.value = nameParts[0] && nameParts[0] !== "" ? nameParts[0] : "";
  lastNameAuto.value = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";

  refreshStepValidation();
  saveDraft();
});

dobInput.addEventListener("change", () => {
  if (!dobInput.value) {
    ageDisplay.textContent = "--";
    dobError.textContent = "";
  } else {
    const age = calcAge(dobInput.value);
    ageDisplay.textContent = age >= 0 ? age : "--";
    dobError.textContent = age < 18 ? "Must be at least 18 years old." : "";
  }
  refreshStepValidation();
  saveDraft();
});

emailInput.addEventListener("input", () => {
  const valid = isValidEmail(emailInput.value.trim());
  emailError.textContent =
    emailInput.value && !valid ? "Enter a valid email address." : "";
  refreshStepValidation();
  saveDraft();
});

passwordInput.addEventListener("input", () => {
  updatePasswordUI();
  refreshStepValidation();
  saveDraft();
});

confirmPasswordInput.addEventListener("input", () => {
  updateConfirmTick();
  refreshStepValidation();
  saveDraft();
});

// --- STEP 2: phone + address ---
phoneInput.addEventListener("input", () => {
  const valid = /^\+?\d{7,15}$/.test(phoneInput.value.trim());
  phoneError.textContent =
    phoneInput.value && !valid
      ? "Enter a valid phone number (7-15 digits)."
      : "";
  refreshStepValidation();
  saveDraft();
});
phoneInput.addEventListener("blur", () => {
  if (phoneInput.value.trim()) showToast("Phone number updated.", "success");
});

addressInput.addEventListener("input", (e) => {
  if (e.target.value.length > 100) {
    e.target.value = e.target.value.substring(0, 100);
    showToast("Maximum address length reached.", "warning");
  }
  addressCounter.textContent = e.target.value.length;
  saveDraft();
});

// profile picture preview and resume parsing
profilePicUpload.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (ev) => {
    profilePicDataUrl = ev.target.result;
    profilePicPreview.src = profilePicDataUrl;
    profilePicPreview.classList.remove("hidden");
    profilePicPlaceholder.classList.add("hidden");
    saveDraft();
  };
  reader.readAsDataURL(file);
});

function parseResumeText(text) {
  const sections = {
    skills: "",
    education: "",
    experience: "",
    certifications: "",
  };
  const patterns = {
    skills:
      /skills\s*:?\s*\n?([\s\S]*?)(?=\n\s*\n|education|experience|certifications|$)/i,
    education:
      /education\s*:?\s*\n?([\s\S]*?)(?=\n\s*\n|skills|experience|certifications|$)/i,
    experience:
      /(?:experience|work history)\s*:?\s*\n?([\s\S]*?)(?=\n\s*\n|skills|education|certifications|$)/i,
    certifications:
      /certifications?\s*:?\s*\n?([\s\S]*?)(?=\n\s*\n|skills|education|experience|$)/i,
  };
  Object.keys(patterns).forEach((key) => {
    const m = text.match(patterns[key]);
    if (m) sections[key] = (m[1] || "").trim().slice(0, 300);
  });
  return sections;
}

function renderExtractedData(sections) {
  extractedData.classList.remove("hidden");
  const fieldMap = {
    skills: [skillsExtracted, skillsLabel, "Extracted Skills"],
    education: [educationExtracted, educationLabel, "Education"],
    experience: [experienceExtracted, experienceLabel, "Previous Experience"],
    certifications: [
      certificationsExtracted,
      certificationsLabel,
      "Certifications",
    ],
  };
  let anyFound = false;
  Object.keys(fieldMap).forEach((key) => {
    const [textarea, label, baseLabel] = fieldMap[key];
    if (sections[key]) {
      textarea.value = sections[key];
      textarea.readOnly = true;
      label.classList.remove("text-rose-500");
      label.textContent = baseLabel;
      anyFound = true;
    } else {
      textarea.value = "";
      textarea.readOnly = false;
      textarea.placeholder = "Not found — fill manually";
      label.classList.add("text-rose-500");
      label.textContent = `${baseLabel} (not found)`;
    }
  });

  resumeFallback.classList.toggle("hidden", anyFound);

  const skillsList = sections.skills
    ? sections.skills
        .split(/[,•\n]/)
        .map((s) => s.trim())
        .filter(Boolean)
        .slice(0, 5)
        .join(", ")
    : null;
  aiSummaryText.textContent = skillsList
    ? `Candidate with experience in ${skillsList}. Resume parsed automatically — review extracted sections below.`
    : "Could not confidently summarize this resume — please review and complete the sections manually.";
}

resumeUpload.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;

  resumeSkeleton.classList.remove("hidden");
  extractedData.classList.add("hidden");
  resumeFallback.classList.add("hidden");

  const reader = new FileReader();
  reader.onload = (ev) => {
    const text = ev.target.result;
    setTimeout(() => {
      resumeSkeleton.classList.add("hidden");
      const parsed = parseResumeText(text);
      renderExtractedData(parsed);
      resumeUploadedFlag = true;
      refreshStepValidation();
      saveDraft();
      showToast("Resume parsed successfully!", "success");
    }, 800);
  };
  reader.readAsText(file);
});

[
  skillsExtracted,
  educationExtracted,
  experienceExtracted,
  certificationsExtracted,
].forEach((el) => {
  el.addEventListener("input", () => {
    refreshStepValidation();
    saveDraft();
  });
});

// --- STEP 4: multi-select pills + undo toast ---
jobSelector.addEventListener("change", (e) => {
  const selectedRole = e.target.value;
  if (selectedRole && !selectedJobs.includes(selectedRole)) {
    selectedJobs.push(selectedRole);
    renderPills();
    refreshStepValidation();
    saveDraft();
  }
  jobSelector.value = "";
});

function renderPills() {
  jobsContainer.innerHTML = "";
  if (selectedJobs.length === 0) {
    jobsContainer.appendChild(noJobsText);
    return;
  }
  selectedJobs.forEach((job) => {
    const pill = document.createElement("div");
    pill.className =
      "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600/20 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-sm font-medium transition-transform transform hover:scale-105";
    pill.innerHTML = `
      ${job}
      <button class="remove-job-btn ml-1 text-emerald-600 dark:text-emerald-400 hover:text-rose-500 focus:outline-none" data-job="${job}" aria-label="Remove ${job}">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
      </button>
    `;
    jobsContainer.appendChild(pill);
  });

  document.querySelectorAll(".remove-job-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const jobToRemove = e.currentTarget.getAttribute("data-job");
      const removedIndex = selectedJobs.indexOf(jobToRemove);
      selectedJobs = selectedJobs.filter((j) => j !== jobToRemove);
      renderPills();
      refreshStepValidation();
      saveDraft();
      showUndoToast(jobToRemove, removedIndex);
    });
  });
}

function showUndoToast(job, index) {
  const toast = document.createElement("div");
  toast.className =
    "pointer-events-auto px-4 py-3 rounded-xl border backdrop-blur-md shadow-lg transform transition-all duration-300 translate-y-10 opacity-0 flex items-center gap-3 bg-slate-800/90 border-slate-700 text-slate-200";
  toast.innerHTML = `<span class="text-sm">Job role removed</span><button class="undo-btn text-amber-400 font-semibold text-sm">Undo</button>`;
  toastContainer.appendChild(toast);
  requestAnimationFrame(() =>
    toast.classList.remove("translate-y-10", "opacity-0"),
  );

  function dismiss() {
    toast.classList.add("opacity-0", "translate-y-2");
    setTimeout(() => toast.remove(), 300);
  }

  toast.querySelector(".undo-btn").addEventListener("click", () => {
    if (!selectedJobs.includes(job)) {
      selectedJobs.splice(index, 0, job);
      renderPills();
      refreshStepValidation();
      saveDraft();
    }
    dismiss();
  });

  setTimeout(dismiss, 5000);
}

// global toast system
const toastContainer = document.getElementById("toast-container");

function showToast(message, type = "success") {
  const toast = document.createElement("div");

  const colorClasses =
    type === "success"
      ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-700 dark:text-emerald-400"
      : type === "warning"
        ? "bg-amber-500/10 border-amber-500/20 text-amber-700 dark:text-amber-400"
        : "bg-rose-500/10 border-rose-500/20 text-rose-700 dark:text-rose-400";

  toast.className = `pointer-events-auto px-4 py-3 rounded-xl border backdrop-blur-md shadow-lg transform transition-all duration-300 translate-y-10 opacity-0 flex items-center gap-2 ${colorClasses}`;

  toast.innerHTML = `
    <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${type === "success" ? "M5 13l4 4L19 7" : "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"}"></path>
    </svg>
    <span class="text-sm font-medium">${message}</span>
  `;

  toastContainer.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.remove("translate-y-10", "opacity-0");
  });

  setTimeout(() => {
    toast.classList.add("opacity-0", "translate-y-2");
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// success sequence and dashboard
function gatherFinalData() {
  return {
    fullName: fullNameInput.value || "Anonymous Architect",
    firstName: firstNameAuto.value || "A",
    email: emailInput.value || "-",
    phone: phoneInput.value || "-",
    dob: dobInput.value || "-",
    age: dobInput.value ? calcAge(dobInput.value) : "-",
    jobs: selectedJobs,
    profilePic: profilePicDataUrl,
    resumeSummary: aiSummaryText.textContent,
    appId: `APP-2026-${Math.floor(Math.random() * 90000) + 10000}`,
    registrationDate: regDateField.value,
  };
}

function renderDashboard(finalData) {
  document.getElementById("dash-name").textContent = finalData.fullName;
  document.getElementById("dash-email").textContent = finalData.email;
  document.getElementById("dash-id").textContent = finalData.appId;
  document.getElementById("dash-reg-date").textContent =
    `Registered: ${finalData.registrationDate}`;
  document.getElementById("dash-initials").textContent = finalData.firstName
    .charAt(0)
    .toUpperCase();

  const dashAvatarImg = document.getElementById("dash-avatar-img");
  const dashAvatarFallback = document.getElementById("dash-avatar-fallback");
  if (finalData.profilePic) {
    dashAvatarImg.src = finalData.profilePic;
    dashAvatarImg.classList.remove("hidden");
    dashAvatarFallback.classList.add("hidden");
  } else {
    dashAvatarImg.classList.add("hidden");
    dashAvatarFallback.classList.remove("hidden");
  }

  const dashRoles = document.getElementById("dash-roles");
  dashRoles.innerHTML = "";
  if (finalData.jobs.length === 0) {
    dashRoles.innerHTML =
      '<span class="text-sm text-slate-500 italic">No roles selected.</span>';
  } else {
    finalData.jobs.forEach((job) => {
      const badge = document.createElement("span");
      badge.className =
        "px-2 py-1 rounded-md bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs";
      badge.textContent = job;
      dashRoles.appendChild(badge);
    });
  }

  document.getElementById("dash-resume-summary").textContent =
    finalData.resumeSummary || "No resume uploaded.";

  switchView("dashboard");
}

function triggerSuccessSequence() {
  currentStep = 6;
  updateWizardUI();

  btnPrev.classList.add("hidden");
  btnNext.classList.add("hidden");

  const duration = 2000;
  const end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: ["#10b981", "#f59e0b", "#34d399"],
    });
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: ["#10b981", "#f59e0b", "#34d399"],
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
  localStorage.removeItem("wizardDraft");

  setTimeout(() => {
    const finalData = gatherFinalData();
    localStorage.setItem("registrationData", JSON.stringify(finalData));
    renderDashboard(finalData);
  }, 2500);
}

// auto save and draft restore engine
function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
}

const saveDraft = debounce(() => {
  if (currentStep === totalSteps) return;

  const draftData = {
    step: currentStep,
    fullName: fullNameInput.value,
    dob: dobInput.value,
    email: emailInput.value,
    password: passwordInput.value,
    confirmPassword: confirmPasswordInput.value,
    phone: phoneInput.value,
    address: addressInput.value,
    jobs: selectedJobs,
    profilePic: profilePicDataUrl,
  };

  localStorage.setItem("wizardDraft", JSON.stringify(draftData));
}, 1000);

document.addEventListener("DOMContentLoaded", () => {
  updateGreeting();
  initTheme();
  regDateField.value = new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  updateWizardUI();

  const savedDraft = localStorage.getItem("wizardDraft");
  const draftPrompt = document.getElementById("draft-prompt");

  if (savedDraft) {
    draftPrompt.classList.remove("hidden");
  }

  document.getElementById("btn-restore-draft").addEventListener("click", () => {
    const data = JSON.parse(savedDraft);

    fullNameInput.value = data.fullName || "";
    dobInput.value = data.dob || "";
    emailInput.value = data.email || "";
    passwordInput.value = data.password || "";
    confirmPasswordInput.value = data.confirmPassword || "";
    phoneInput.value = data.phone || "";
    addressInput.value = data.address || "";

    if (data.jobs && data.jobs.length > 0) {
      selectedJobs = data.jobs;
      renderPills();
    }
    if (data.profilePic) {
      profilePicDataUrl = data.profilePic;
      profilePicPreview.src = profilePicDataUrl;
      profilePicPreview.classList.remove("hidden");
      profilePicPlaceholder.classList.add("hidden");
    }

    fullNameInput.dispatchEvent(new Event("input"));
    dobInput.dispatchEvent(new Event("change"));
    emailInput.dispatchEvent(new Event("input"));
    passwordInput.dispatchEvent(new Event("input"));
    confirmPasswordInput.dispatchEvent(new Event("input"));
    phoneInput.dispatchEvent(new Event("input"));

    currentStep = data.step || 1;
    updateWizardUI();

    draftPrompt.classList.add("hidden");
    showToast("Draft restored successfully.", "success");
  });

  document.getElementById("btn-discard-draft").addEventListener("click", () => {
    localStorage.removeItem("wizardDraft");
    draftPrompt.classList.add("hidden");
    showToast("Draft discarded.", "warning");
  });
});
