document.addEventListener("DOMContentLoaded", () => {
    // Dropdown Toggle for North America
    document.getElementById("toggleDropdownNorthAmerica").addEventListener("click", function() {
        var dropdown_north_america = document.getElementById("dropdownContentNorthAmerica");
        dropdown_north_america.style.display = (dropdown_north_america.style.display === "none" || dropdown_north_america.style.display === "") ? "block" : "none";
    });

    // Get references to the select elements and other necessary elements
    const countrySelect = document.getElementById("countrySelect");
    const citySelect = document.getElementById("citySelect");
    const searchBtn = document.getElementById("searchBtn");
    const resetBtn = document.getElementById("reset");
    const resultContainer = document.getElementById("resultContainer");
    const resultItems = document.getElementById("resultItems");

    // Function to update city options based on selected country
    function updateCities(country) {
        citySelect.innerHTML = '<option value="">Select City</option>';
        
        if (country) {
            citySelect.disabled = false;
            const cities = cityData[country] || [];
            cities.forEach(city => {
                const option = document.createElement("option");
                option.value = city;
                option.textContent = city;
                citySelect.appendChild(option);
            });
        } else {
            citySelect.disabled = true;
        }
    }

    countrySelect.addEventListener("change", () => {
        const selectedCountry = countrySelect.value;
        updateCities(selectedCountry);
    });

    resetBtn.addEventListener("click", () => {
        document.querySelectorAll("select").forEach(select => select.selectedIndex = 0);
        citySelect.disabled = true;
        resultItems.innerHTML = ''; 
    });

    const refreshBtn = document.getElementById("refreshBtn");
    refreshBtn.addEventListener("click", () => {
        filterResults(); 
    });

    function toggleButtonsVisibility() {
        const buttons = document.querySelectorAll('.filter-button');
        buttons.forEach(button => {
            const filterName = button.getAttribute('data-filter');
            const filterValue = document.getElementById(`${filterName}Select`).value;

            if (filterValue && filterValue !== "") {
                button.classList.add('show'); 
            } else {
                button.classList.remove('show'); 
            }
        });
    }

    function filterResults() {
        const filters = {
            country: countrySelect.value,
            city: citySelect.value,
            propertyType: document.getElementById("propertyTypeSelect").value,
            bedrooms: document.getElementById("bedroomsSelect").value,
            bathrooms: document.getElementById("bathroomsSelect").value,
            priceRange: document.getElementById("priceRangeSelect").value,
            squareFeet: document.getElementById("squareFeetSelect").value,
            yearBuilt: document.getElementById("yearBuiltSelect").value,
            parking: document.getElementById("parkingSelect").value,
            garden: document.getElementById("gardenSelect").value,
            flooring: document.getElementById("flooringSelect").value,
            publicTransport: document.getElementById("publicTransportSelect").value,
            elevator: document.getElementById("elevatorSelect").value,
            furnishing: document.getElementById("furnishingSelect").value,
            view: document.getElementById("viewSelect").value,
            airConditioning: document.getElementById("airConditioningSelect").value,
            heating: document.getElementById("heatingSelect").value,
            pool: document.getElementById("poolSelect").value,
            balcony: document.getElementById("balconySelect").value,
            roof: document.getElementById("roofSelect").value,
            security: document.getElementById("securitySelect").value,
            schools: document.getElementById("schoolsSelect").value,
            internet: document.getElementById("internetSelect").value,
            gym: document.getElementById("gymSelect").value,
            storage: document.getElementById("storageSelect").value,
            shopping: document.getElementById("shoppingSelect").value,
            hospital: document.getElementById("hospitalSelect").value,
            park: document.getElementById("parkSelect").value,
            beach: document.getElementById("beachSelect").value
        };

        const filteredResults = realEstateData.filter(property => {
            return Object.keys(filters).every(key => !filters[key] || property[key] === filters[key]);
        });

        displayResults(filteredResults);
        toggleButtonsVisibility();
    }

    function displayResults(results) {
        resultItems.innerHTML = '';
        if (results.length > 0) {
            results.forEach(property => {
                const resultItem = document.createElement('div');
                resultItem.className = 'result-item';

                resultItem.innerHTML = `
                    <img src="${property.imageUrl}" alt="Property Image">
                    <div>
                        <h4>${property.title}</h4>
                        <p>Country: ${property.country}</p>
                        <p>City: ${property.city}</p>
                        <p>Price: $${property.price}</p>
                        <p>Type: ${property.propertyType}</p>
                        <p>Bedrooms: ${property.bedrooms}</p>
                        <p>Bathrooms: ${property.bathrooms}</p>
                        <p>Size: ${property.squareFeet} sq ft</p>
                    </div>
                `;
                resultItems.appendChild(resultItem);
            });
        } else {
            resultItems.innerHTML = '<p>No results found</p>';
        }
    }

    searchBtn.addEventListener("click", filterResults);
});
