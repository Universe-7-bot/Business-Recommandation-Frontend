const companyYes = document.getElementById("companyYes");
const companyNo = document.getElementById("companyNo");
const conditionalFields = document.getElementById("conditionalFields");

companyYes.addEventListener("change", function () {
    conditionalFields.style.display = this.checked ? "block" : "none";
});

companyNo.addEventListener("change", function () {
    conditionalFields.style.display = this.checked ? "none" : "block";
});

const checkboxes = document.querySelectorAll(".sector-checkbox");
checkboxes.forEach(checkbox => {
    checkbox.addEventListener("change", () => {
        const selectedCount = document.querySelectorAll(".sector-checkbox:checked").length;
        if (selectedCount > 4) {
            checkbox.checked = false;
            alert("You can select a maximum of 4 sectors.");
        }
    });
});

document.getElementById("getToKnowForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const preloader = document.getElementById("preloader");
    preloader.style.display = "flex";

    const formData = {
        name: document.getElementById("name").value,
        surname: document.getElementById("surname").value,
        email: document.getElementById("email").value,
        companyCreated: companyYes.checked ? "yes" : "no",
        companyStatus: companyYes.checked ? document.getElementById("companyStatus").value : null,
        businessDescription: companyYes.checked ? document.getElementById("businessDescription").value : null,
        sectors: Array.from(document.querySelectorAll(".sector-checkbox:checked")).map(cb => cb.value),
        geography: document.getElementById("geography").value,
        background: document.getElementById("background").value,
        learningNeeds: document.getElementById("learningNeeds").value,
        tools: document.getElementById("tools").value
    };

    console.log(formData);

    // Send data to the backend
    try {
        const response = await fetch("https://business-recommendation-backend.vercel.app/get-resources", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (data.success) {
            // alert("Form submitted successfully!");
            localStorage.setItem("resourcesData", JSON.stringify(data.resources));
            localStorage.setItem("aiResourcesData", JSON.stringify(data.aiGeneratedResources));

            window.location.href = "resources.html";
        } else {
            alert("Failed to submit form. Please try again.");
        }
    } catch (error) {
        console.error("Error submitting form:", error);
        alert("An error occurred. Please try again.");
    } finally {
        // Hide the preloader if there was an error
        preloader.style.display = "none";
    }
});