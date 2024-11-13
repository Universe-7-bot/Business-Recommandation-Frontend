document.addEventListener("DOMContentLoaded", function () {
    const resourcesList = document.getElementById("resourcesList");
    const aiResourcesList = document.getElementById("ai-resources");

    const resourcesData = JSON.parse(localStorage.getItem("resourcesData"));
    const aiResourcesData = JSON.parse(localStorage.getItem("aiResourcesData"));

    function displayResources(resources, container) {
        if (resources && resources.length > 0) {
            resources.forEach(resource => {
                const resourceCard = document.createElement("div");
                resourceCard.className = "col-md-4 mb-4";

                resourceCard.innerHTML = `
                    <div class="card h-100">
                        <div class="card-body">
                            <h5 class="card-title">${resource.fields.Resource}</h5>
                            <p class="card-text"><strong>Geography:</strong> ${resource.fields.Geography}</p>
                            <p class="card-text"><strong>Stage:</strong> ${resource.fields.Stage.join(", ")}</p>
                            <p class="card-text"><strong>Category:</strong> ${resource.fields.Category.join(", ")}</p>
                            <p class="card-text"><strong>Sector:</strong> ${resource.fields.Sector.join(", ")}</p>
                            <p class="card-text"><strong>Score:</strong> ${resource.fields.Score}</p>
                            <p class="card-text"><strong>Description:</strong> ${resource.fields.Description}</p>
                            <a href="${resource.fields["Link to tool"]}" class="btn my-btn" target="_blank">Visit Resource</a>
                        </div>
                    </div>
                `;
                container.appendChild(resourceCard);
            });
        } else {
            container.innerHTML = "<p>No resources found.</p>";
        }
    }

    displayResources(resourcesData, resourcesList);
    displayResources(aiResourcesData.resources, aiResourcesList);
});
