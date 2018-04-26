$( document ).ready(function() {
    console.log( "ready!" );

//create burger
$('input').on('keypress', function (e) {
  console.log('hello world',e);
  if (e.which == 13) {
    if ($('.add-todo').val() != '') {

      var newBurger = {
        name: $('.add-todo').val().trim(),
      };

      // Send the POST request.
      $.ajax("/api/newburger", {
        type: "POST",
        data: newBurger
      }).then(
        function () {
          console.log("created new burger");
          // Reload the page to get the updated list
          location.reload();
        }
      );
    } else {
      alert("Please creat a valid burger name!")
    }
  }
});


//eat a burger
$("document").on("click", ".check", function () {
  var eatBurger = {
    name: $('.check').children()[0].text().trim(),
  };
  $.ajax("/api/eatburger", {
    type: "POST",
    data: eatBurger
  }).then(
    function () {
      console.log("ate burger");
      // Reload the page to get the updated list
      location.reload();
    }
  );

})

});