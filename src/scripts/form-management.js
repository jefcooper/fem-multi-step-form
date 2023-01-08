/****************************************************************************
 * form-management.js
 *
 *  Manage the paging of the multi-page form using <template> sections and
 *  attaching/detaching in the DOM as needed to display the steps.
 *
 ****************************************************************************/

// get the div to contain the form
const wizardForm = document.querySelector("[data-wizard-form]");
const stepIndicatorList = Array.from(
  document.querySelector("[data-wizard-steps]").children
);
const btnNext = document.querySelector("[data-wizard-form-next]");
const btnPrev = document.querySelector("[data-wizard-form-previous]");
const btnFinished = document.querySelector("[data-wizard-form-finished]");

let currentStep = 0;

// get all the template steps in an indexed array
const steps = getFormSteps();

if (steps.length > 1) {
  btnPrev?.setAttribute("disabled", true);
  btnFinished?.setAttribute("disabled", true);
}

btnNext?.addEventListener("click", (evt) => {
  if (currentStep < steps.length - 1) {
    currentStep += 1;
    showFormStep(currentStep, steps);
  }
  // if we're at end, then set the button to disabled
  if (currentStep === steps.length - 1) {
    btnNext?.setAttribute("disabled", "");
    btnFinished?.removeAttribute("disabled");
  }
  if (currentStep === 1) {
    btnPrev?.removeAttribute("disabled");
  }
});
btnPrev?.addEventListener("click", (evt) => {
  if (currentStep > 0) {
    currentStep -= 1;
    showFormStep(currentStep, steps);
  }
  // if we're at start, then disable btnPrev
  if (currentStep === 0) {
    btnPrev?.setAttribute("disabled", "");
  }
  if (currentStep === steps.length - 2) {
    btnNext?.removeAttribute("disabled");
    btnFinished?.setAttribute("disabled", "");
  }
});

// show initial form step
showFormStep(currentStep, steps);

/**
 * getFormSteps
 *
 *  Query all elements in the document containing the [data-wizard-form-step]
 *  data attribute.  The value of this attribute is a number indicating
 *  the relative page order.  e.g. <template data-form-step='300'>
 *
 * @returns map
 */
function getFormSteps() {
  // all direct children of the wizard form are tabs in the form
  return Array.from(wizardForm.children);
}

function showFormStep(stepNumber, allSteps) {
  allSteps.forEach((step, idx) => {
    if (idx === stepNumber) {
      step.style.display = "grid";
    } else {
      step.style.display = "none";
    }
  });
  if (stepNumber < stepIndicatorList.length) {
    stepIndicatorList.forEach((indicator, idx) => {
      if (idx == stepNumber) {
        indicator.setAttribute("aria-current", "step");
      } else {
        indicator.removeAttribute("aria-current");
      }
    });
  }
}

/**
 * tryParseInt
 *
 * A variation on Number.parseInt() that takes a default value
 * in case the format of the number is invalid.
 *
 * @param {string} value
 * @param {Number} defaultValue
 * @returns Number
 */
function tryParseInt(value, defaultValue) {
  const parsedValue = Number.parseInt(value, 10);

  if (Number.isNaN(parsedValue)) {
    return defaultValue || 0;
  } else {
    return parsedValue;
  }
}
