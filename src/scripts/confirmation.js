const confirmationEl = document.getElementById("confirmation");

const newH1 = document.createElement("h1");

function createConfirmationNode(formEl) {
  // get the form element data
  const formData = new FormData(formEl);

  // for debugging, list all entries
  formData.forEach((val, key) => {
    console.log("form data, key: " + key + "=" + val);
  });

  const div = document.createElement("div");
  div.classList.add("confirmation-group");

  // Arcade (Monthly)
  const para = div.appendChild(document.createElement("p"));
  const optionSpan = para.appendChild(document.createElement("span"));
  optionSpan.appendChild(
    document.createTextNode(formData.get("plan") || "arcade")
  );

  const termSpan = para.appendChild(document.createElement("span"));
  termSpan.appendChild(
    document.createTextNode(
      formData.get("plan-yearly") === "on" ? "yearly" : "monthly"
    )
  );

  div.appendChild(para);

  return div;
}

function populateConfirmation() {
  const formEl = document.getElementById("wizard-form"); // get the form we intend to modify
  const docEl = document.getElementById("confirmation"); // get the node that will hold the text

  if (docEl) {
    docEl.innerText = ""; // first clear any content, this is fastest method
    docEl.appendChild(createConfirmationNode(formEl));
  }
}

window.populateConfirmation = populateConfirmation;
