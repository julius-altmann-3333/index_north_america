document.getElementById("toggleDropdownNorthAmerica").addEventListener("click", function() {
    var dropdown_north_america = document.getElementById("dropdownContentNorthAmerica");
    dropdown_north_america.style.display = (dropdown_north_america.style.display === "none" || dropdown_north_america.style.display === "") ? "block" : "none";
});