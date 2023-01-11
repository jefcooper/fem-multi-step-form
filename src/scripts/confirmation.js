/******************************************************************************
 * confirmation
 *
 * Build the confirmation div dynamically, based on the form data collected in
 * the current session.  The form element is retrieved by id and its form data
 * queried and used in creating the div content.
 *
 ******************************************************************************/

const confirmationEl = document.getElementById("confirmation");
const summaryPlanEl = document.querySelector("[data-summary-plan]");
const summaryAddOnsEl = document.querySelector("[data-summary-add-ons]");
const summaryTotalEl = document.querySelector("[data-summary-total]");

function populateConfirmation() {
  const formEl = document.getElementById("wizard-form"); // get the form we intend to modify
  const docEl = document.getElementById("confirmation"); // get the node that will hold the text

  if (docEl) {
    const formData = new FormData(formEl);
    createConfirmation(formData);

    //docEl.innerText = ""; // first clear any content, this is fastest method
    //docEl.appendChild(confirmationDiv);
  }
}

window.populateConfirmation = populateConfirmation;

/*
*************** grey ******************
* Arcade (Yearly)              $90/yr
* Change
* -----------------------------------
* Online service              +$10/yr
* Larger storage              +$20/yr
***************************************

Total (per year)              $120/yr

        <div class="summary">
          <div class="summary__detail">
            <div class="summary__selected-plan" data-summary-plan>
              <p class="summary__plan heading--5">Arcade (Yearly)</p>
              <p class="summary__price heading--6">$90/yr</p>
              <button type="button" class="summary__change btn">Change</button>
            </div>
            <div class="summary__add-ons" data-summary-add-ons>
              <p class="summary__option">Online service</p>
              <p class="summary__option-price">+10/yr</p>
              <p class="summary__option">Larger storage</p>
              <p class="summary__option-price">+20/yr</p>
            </div>
          </div>
          <div class="summary__total" data-summary-total>
            <p class="summary__total-plan">Total (per year)</p>
            <p class="summary__total-price">$120/yr</p>
          </div>
        </div>
*/

const pricing = {
  arcade: {
    monthly: 9,
    yearly: 90,
  },
  advanced: {
    monthly: 12,
    yearly: 120,
  },
  pro: {
    monthly: 15,
    yearly: 150,
  },
};
const optionPricing = {
  "option-games": {
    monthly: 1,
    yearly: 10,
  },
  "option-storage": {
    monthly: 2,
    yearly: 20,
  },
  "option-theme": {
    monthly: 2,
    yearly: 20,
  },
};
function createConfirmation(formData) {
  // for debugging, list all entries
  formData.forEach((val, key) => {
    console.log("form data, key: " + key + "=" + val);
  });

  // Pricing calculations
  const plan = formData.get("plan") || "arcade";
  const term = formData.has("plan-yearly") ? "yearly" : "monthly";
  const planPrice = pricing[plan][term];

  let totalPrice = planPrice;
  if (formData.has("option-games")) {
    totalPrice += optionPricing["option-games"][term];
  }
  if (formData.has("option-storage")) {
    totalPrice += optionPricing["option-storage"][term];
  }
  if (formData.has("option-theme")) {
    totalPrice += optionPricing["option-theme"][term];
  }

  // data-summary-plan
  /*
  <div class="summary__selected-plan" data-summary-plan>
    <p class="summary__plan heading--5">Arcade (Yearly)</p>
    <p class="summary__price heading--6">$90/yr</p>
    <button type="button" class="summary__change btn">Change</button>
  </div>
  */

  // clear the summary element of all children
  summaryPlanEl.innerText = "";

  const planText = capitalize(plan) + " (" + capitalize(term) + ")";
  new Element("p")
    .text(planText)
    .class("summary__plan")
    .class("heading--5")
    .addTo(summaryPlanEl);

  new Element("p")
    .text(formatPrice(planPrice, term))
    .class("summary__price")
    .class("heading--6")
    .addTo(summaryPlanEl);

  new Element("button")
    .text("Change")
    .class("summary__change")
    .class("btn")
    .attribute("type", "button")
    .addTo(summaryPlanEl);

  summaryAddOnsEl.innerText = "";

  // online service
  if (formData.has("option-games")) {
    new Element("p")
      .text("Online service")
      .class("summary__option")
      .addTo(summaryAddOnsEl);

    new Element("p")
      .text(formatOptionPrice(optionPricing["option-games"][term], term))
      .class("summary__option-price")
      .addTo(summaryAddOnsEl);
  }

  // larger storage
  if (formData.has("option-storage")) {
    new Element("p")
      .text("Larger storage")
      .class("summary__option")
      .addTo(summaryAddOnsEl);

    new Element("p")
      .text(formatOptionPrice(optionPricing["option-storage"][term], term))
      .class("summary__option-price")
      .addTo(summaryAddOnsEl);
  }

  // profile
  if (formData.has("option-theme")) {
    new Element("p")
      .text("Customizable profile")
      .class("summary__option")
      .addTo(summaryAddOnsEl);

    new Element("p")
      .text(formatOptionPrice(optionPricing["option-theme"][term], term))
      .class("summary__option-price")
      .addTo(summaryAddOnsEl);
  }

  summaryTotalEl.innerText = "";

  new Element("p")
    .text("Total (per " + term + ")")
    .class("summary__total-plan")
    .addTo(summaryTotalEl);

  new Element("p")
    .text("+" + formatPrice(totalPrice, term))
    .class("summary__total-price")
    .addTo(summaryTotalEl);
}

function capitalize(str) {
  if (str && str.length < 1) return;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function formatOptionPrice(price, term) {
  let total = price;

  if (term === "yearly") {
    price *= 10;
  }
  return "+" + formatPrice(total, term);
}
function formatPrice(price, term) {
  const result = [];
  result.push("$");
  result.push(price);
  if (term === "yearly") {
    result.push("/yr");
  } else {
    result.push("/mo");
  }
  return result.join("");
}

/**
 * Element - fluent element factory
 */
class Element {
  constructor(tag) {
    this.el = document.createElement(tag);
  }
  text(val) {
    this.el.appendChild(document.createTextNode(val));
    return this;
  }
  class(val) {
    this.el.classList.add(val);
    return this;
  }
  attribute(key, val) {
    this.el.setAttribute(key, val);
    return this;
  }
  addTo(parent) {
    parent.appendChild(this.el);
  }
}
