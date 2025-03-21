document.getElementById("toggleDropdown").addEventListener("click", function() {
            var dropdown = document.getElementById("dropdownContent");
            dropdown.style.display = (dropdown.style.display === "none" || dropdown.style.display === "") ? "block" : "none";
        });