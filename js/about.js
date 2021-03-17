// Show Popup
$(document).ready(function () {
  setTimeout(function () {
    Popup();
  }, 5000);
});
function Popup() {
  $(".modal").addClass("show");
}
function closeModal() {
  $(".modal").removeClass("show");
}

// Show Popup Bottom
$("#footer_popup").slideBox({
  position: "bottom",
  appearsFrom: "bottom",
  slideDuration: 500,
  target: "#content_left_comment",
});

// Scroll Form
$(".move_form").click(function () {
  $("html,body").animate(
    {
      scrollTop: $(".content_left_form").offset().top,
    },
    "slow"
  );
});
