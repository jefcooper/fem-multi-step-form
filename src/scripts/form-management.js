/****************************************************************************
 * form-management.js
 *
 *  Manage the paging of the multi-page form using <template> sections and
 *  attaching/detaching in the DOM as needed to display the steps.
 *
 ****************************************************************************/

// get the div to contain the form
const formDiv = document.querySelector("[data-form]");
const btnNext = document.querySelector("[data-form-next]");
const btnPrev = document.querySelector("[data-form-previous]");

let currentStep = 0;

// get all the template steps in an indexed array
const steps = getFormSteps();

if (btnNext) {
  btnNext.addEventListener("click", (evt) => {
    if (currentStep < steps.length - 1) {
      currentStep += 1;
      showFormStep(currentStep, formDiv, steps);
    }
  });
}
if (btnPrev) {
  btnPrev.addEventListener("click", (evt) => {
    if (currentStep > 0) {
      currentStep -= 1;
      showFormStep(currentStep, formDiv, steps);
    }
  });
}

console.log("intialized with form steps");
const templateSteps = getFormSteps();

showFormStep(currentStep, formDiv, steps);

function getFormSteps() {
  const steps = Array.from(document.querySelectorAll("[data-form-step]"));

  return steps.map((step) => ({
    stepNumber: Number.parseInt(step.getAttribute("data-form-step"), 10),
    step: step,
  }));
}

function showFormStep(step, form, allSteps) {
  const template = allSteps[step].step;

  const clone = template.content.cloneNode(true);
  form.textContent = "";
  form.appendChild(clone);
}
