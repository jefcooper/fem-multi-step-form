/****************************************************************************
 * form-management.js
 *
 *  Manage the paging of the multi-page form using <template> sections and
 *  attaching/detaching in the DOM as needed to display the steps.
 *
 ****************************************************************************/

// get the div to contain the form
const formDiv = document.querySelector("[data-wizard-form]");
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
    showFormStep(currentStep, formDiv, steps);
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
    showFormStep(currentStep, formDiv, steps);
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
showFormStep(currentStep, formDiv, steps);

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
  // get steps from document and sort in numeric order of steps
  // note that these numbers are sparse to allow gaps and reordering
  // for example, may use step numbers 100, 200, 300, etc.
  const steps = Array.from(
    document.querySelectorAll("[data-wizard-form-step]")
  ).sort(
    (a, b) =>
      tryParseInt(a.getAttribute("data-wizard-form-step")) -
      tryParseInt(b.getAttribute("data-wizard-form-step"))
  );

  // re-map steps to have a monotonically increasing step number (idx)
  return steps.map((step, idx) => ({
    stepNumber: idx,
    step: step,
  }));
}

function showFormStep(step, form, allSteps) {
  const template = allSteps[step].step;

  const clone = template.content.cloneNode(true);
  form.textContent = "";
  form.appendChild(clone);
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
