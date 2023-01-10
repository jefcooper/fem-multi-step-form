const toggleGroup = document.getElementById("select-plan__term-toggle");
const toggleSwitch = document.getElementById("select-plan__term-toggle-switch");
const toggleFieldset = document.getElementById("select-plan__fieldset");

setPlanType();

toggleSwitch.addEventListener("click", (evt) => {
  setPlanType();
});

function setPlanType() {
  toggleFieldset?.setAttribute(
    "data-plan-type",
    toggleSwitch.checked ? "yearly" : "monthly"
  );
  toggleGroup?.setAttribute(
    "data-plan-type",
    toggleSwitch.checked ? "yearly" : "monthly"
  );
}
