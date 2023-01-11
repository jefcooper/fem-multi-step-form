/****************************************************************************
 * wizard-form.js
 *
 *  Manage the paging of the multi-page form by setting display on each
 *  section and also updating the current element in a matching step list.
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
const btnChange = document.querySelector("[data-wizard-form-change]");

let currentStep = 0;

// get all the template steps in an indexed array
const steps = getFormSteps();

if (steps.length > 1) {
  btnPrev?.setAttribute("disabled", true);
  btnFinished?.setAttribute("disabled", true);
}

btnNext?.addEventListener("click", (evt) => {
  if (currentStep < steps.length - 1) {
    // check validity before moving on
    if (!wizardForm.reportValidity()) {
      // record failed validation so we can give feedback in form
      wizardForm.setAttribute("data-failed-validation", "");
      return;
    } else {
      wizardForm.removeAttribute("data-failed-validation");
    }

    currentStep += 1;
    showFormStep(currentStep, steps);
  }
  if (currentStep === steps.length - 2) {
    btnNext?.setAttribute("disabled", "");
    btnFinished?.removeAttribute("disabled");
    btnFinished?.focus();
  }
  // if we're at end, then set the button to disabled
  if (currentStep === steps.length - 1) {
    btnNext?.setAttribute("disabled", "");
    btnFinished?.setAttribute("disabled", "");
    btnPrev?.setAttribute("disabled", "");
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
    btnNext.focus();
  }
  if (currentStep === steps.length - 2) {
    btnNext?.setAttribute("disabled", "");
    btnFinished?.removeAttribute("disabled");
  }
  if (currentStep === steps.length - 3) {
    btnFinished?.setAttribute("disabled", "");
    btnNext?.removeAttribute("disabled");
  }
});
btnFinished?.addEventListener("click", (evt) => {
  if (currentStep < steps.length - 1) {
    currentStep += 1;
    btnNext?.setAttribute("disabled", "");
    btnPrev?.setAttribute("disabled", "");
    btnFinished?.setAttribute("disabled", "");
    showFormStep(currentStep, steps);
  }
});
btnChange?.addEventListener("click", (evt) => {
  // go back to page 2
  currentStep = 1;
  showFormStep(currentStep, steps);
  btnFinished?.setAttribute("disabled", "");
  btnNext?.removeAttribute("disabled");
});

// show initial form step
showFormStep(currentStep, steps);
btnNext.focus();

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
      const onShowFn = step.getAttribute("data-wizard-form-on-show");

      if (onShowFn) {
        // call this named function on the global window context
        console.log("Call function: " + onShowFn);
        window[onShowFn]?.();
      }
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

export function wizardFormPopulateConfirmation() {
  console.log("Wizard Form populate confirmation");
}
window.wizardFormPopulateConfirmation = wizardFormPopulateConfirmation;
