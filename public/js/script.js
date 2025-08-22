(() => {
  "use strict";
  const forms = document.querySelectorAll(".needs-validation");
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add("was-validated");
      },
      false
    );
  });
})();

let loaderTimeout;
document.addEventListener("DOMContentLoaded", () => {
  loaderTimeout = setTimeout(() => {
    showLoader();
  }, 100);
});
window.addEventListener("load", () => {
  clearTimeout(loaderTimeout);
  hideLoader();
});
function showLoader() {
  const loader = document.getElementById("loader");
  if (loader) {
    loader.style.display = "flex";
    loader.style.opacity = "1";
  }
}
function hideLoader() {
  const loader = document.getElementById("loader");
  if (loader) {
    loader.style.opacity = "0";
    setTimeout(() => {
      loader.style.display = "none";
    }, 300);
  }
}
