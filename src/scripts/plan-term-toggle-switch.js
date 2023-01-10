const toggleSwitch = document.getElementById("plan-term-toggle-switch");
const toggleFieldset = document.getElementById("plan-selection__fieldset");

setPlanType();

toggleSwitch.addEventListener("click", (evt) => {
  setPlanType();
});

function setPlanType() {
  toggleFieldset?.setAttribute(
    "data-plan-type",
    toggleSwitch.checked ? "yearly" : "monthly"
  );
}
