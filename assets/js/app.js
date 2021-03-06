// Helper function to get form data in the supported format
function getFormDataString(formEl) {
  var formData = new FormData(formEl),
      data = [];

  for (var keyValue of formData) {
    data.push(encodeURIComponent(keyValue[0]) + "=" + encodeURIComponent(keyValue[1]));
  }

  return data.join("&");
}

// Fetch the form element
var formEl = document.getElementById("contact-form");
var submitBtn = document.getElementById("submit-btn");

// Override the submit event
formEl.addEventListener("submit", function (e) {
  e.preventDefault();

  //if (grecaptcha) {
    //var recaptchaResponse = grecaptcha.getResponse();
    //if (!recaptchaResponse) { // reCAPTCHA not clicked yet
      //return false;
    //}
  //}

  submitBtn.setAttribute("disabled", "true");
  var request = new XMLHttpRequest();

  request.addEventListener("load", function () {
    if (request.status === 200) {
      document.getElementById("email-success").style.display = "block";
    } else {
      document.getElementById("email-failure").style.display = "block";
      submitBtn.removeAttribute("disabled");
    }
  });

  request.open(formEl.method, formEl.action);
  request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  request.send(getFormDataString(formEl));
});
