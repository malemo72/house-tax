// A global variable to store the registration details temporarily
let registration = null;

// Function to validate the ID number input
function validateIDNumber(id) {
    const regex = /^\d{6}$/;
    return regex.test(id);
}

// Function to validate the house number input
function validateHouseNumber(house) {
    // The house number must be one of the house numbers that you provided
    const houseNumbers = ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "A10", "B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9", "B10", "C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9", "C10", "D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9", "D10"];
    return houseNumbers.includes(house);
}

// Function to calculate the total tax paid by a house owner
function getTotalTaxPaid(tax) {
    return tax.reduce((total, amount) => total + amount, 0);
}

// Function to check if a house owner is compliant with the tax payment
function isCompliant(tax) {
    const totalTaxPaid = getTotalTaxPaid(tax);
    const currentYearTax = tax[tax.length - 1];
    return totalTaxPaid > 250 && currentYearTax > 1000;
}

// Function to generate a certificate of tax compliance or non-compliance
function generateCertificate(name, id, house, tax) {
    const lastFiveYearsTax = tax.slice(0, -1).join(", ");
    const currentYearTax = tax[tax.length - 1];

    let certificate = `<h2>Certificate of Taxation</h2>
                        <p><span>Name:</span> ${name}</p>
                        <p><span>ID:</span> ${id}</p>
                        <p><span>House:</span> ${house}</p>
                        <p><span>Tax paid in the last 5 years:</span> ksh${lastFiveYearsTax}</p>
                        <p><span>Tax paid in the current year:</span> ksh${currentYearTax}</p>`;

    if (isCompliant(tax)) {
        certificate += `<p><span>Compliance status:</span> Compliant</p>
                        <p>Congratulations! You have paid your tax on time for the last 5 years. You are eligible for a tax rebate of 10%.</p>`;
    } else {
        certificate += `<p><span>Compliance status:</span> Non-compliant</p>
                        <p>Sorry! You have failed to pay your tax on time for the last 5 years. You are liable for a penalty of 20%.</p>
                        <p>You have 7 days to pay your outstanding tax or you will face eviction.</p>`;
    }

    return certificate;
}

// Function to display the result of the registration
function displayRegistrationResult(name, id, house, tax) {
    const result = document.getElementById("result");

    result.innerHTML = `<h2>Registration Result</h2>
                        <p><span>Full name:</span> ${name}</p>
                        <p><span>ID number:</span> ${id}</p>
                        <p><span>House number:</span> ${house}</p>
                        <p><span>Taxation history:</span> ${tax.join(", ")}</p>`;
}

// Function to display the result of the tax payment
function displayTaxPaymentResult(name, id, house, tax) {
    const result = document.getElementById("result");

    result.innerHTML = `<h2>Tax Payment Result</h2>
                        <p><span>Full name:</span> ${name}</p>
                        <p><span>ID number:</span> ${id}</p>
                        <p><span>House number:</span> ${house}</p>
                        <p><span>Taxation history:</span> ${tax.join(", ")}</p>`;

    const certificate = generateCertificate(name, id, house, tax);
    const certificateDiv = document.createElement("div");

    if (isCompliant(tax)) {
        certificateDiv.className = "certificate";
    } else {
        certificateDiv.className = "certificate non-compliance";
    }

    certificateDiv.innerHTML = certificate;
    result.appendChild(certificateDiv);
}

// Function to validate the input and display the registration result
function register() {
    const name = document.getElementById("name").value;
    const id = document.getElementById("id").value;
    const house = document.getElementById("house").value;
    const tax = document.getElementById("taxes").value.split(",").map(Number);

    if (name && id && house && tax) {
        if (validateIDNumber(id) && validateHouseNumber(house)) {
            displayRegistrationResult(name, id, house, tax);
            registration = { name, id, house, tax };
            saveDataToJson(registration);
            alert("Registration successful!");

            const nextPageLink = document.querySelector('a[href="page2.html"]');
            nextPageLink.addEventListener("click", () => {
                alert("You have successfully registered!");
            });
        } else {
            alert("Invalid ID number or house number. Please try again.");
        }
    } else {
        alert("Please fill in all the fields.");
    }
}
// Function to update the tax history and display the tax payment result
function payTax() {
    registration = loadDataFromJson();

    if (!registration) {
        alert("Please register first before paying tax.");
        return;
    }

    const name = registration.name;
    const id = registration.id;
    const house = registration.house;
    const tax = registration.tax;

    const newTax = document.getElementById("tax").value;
    tax.push(parseFloat(newTax));

    displayTaxPaymentResult(name, id, house, tax);
    saveDataToJson({ name, id, house, tax });
    alert("You have successfully paid your House Tax!");
}

// Function to save data to JSON file
function saveDataToJson(data) {
    const jsonData = JSON.stringify(data);
    localStorage.setItem("registration_data", jsonData);
}

// Function to load data from JSON file
function loadDataFromJson() {
    const jsonData = localStorage.getItem("registration_data");
    return jsonData ? JSON.parse(jsonData) : null;
}

// Get the button elements from the HTML file
const registerButton = document.getElementById("register");
const payButton = document.getElementById("pay");
const backButton = document.getElementById("backButton");


// Add event listeners to the button elements
if (registerButton) {
    registerButton.addEventListener("click", register);
}

if (payButton) {
    payButton.addEventListener("click", payTax);
}
if (backButton) {
    backButton.addEventListener("click", () => {
        // Use the browser's built-in back functionality
        window.history.back();
    });
}







//image slider
let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
} 