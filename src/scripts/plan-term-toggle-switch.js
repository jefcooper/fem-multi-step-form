const toggleGroup = document.getElementById("select-plan__term-toggle");
const toggleSwitch = document.getElementById("select-plan__term-toggle-switch");
const toggleFieldset = document.getElementById("select-plan__fieldset");

setPlanType();

toggleSwitch.addEventListener("click", (evt) => {
  setPlanType();
});

function setPlanType() {
  const planType = toggleSwitch.checked ? "yearly" : "monthly";
  const elements = Array.from(document.querySelectorAll("[data-plan-type]"));
  elements.forEach((el) => {
    el.setAttribute("data-plan-type", planType);
  });
}
