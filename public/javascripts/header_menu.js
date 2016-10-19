/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function openPopUp(event) {
  event.stopPropagation();
  document.getElementById("dn-h-usermenu").classList.toggle("show");
}
// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  document.getElementById("dn-h-usermenu").classList.remove("show");
}

