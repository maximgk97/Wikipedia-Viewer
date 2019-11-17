$(document).ready(function() {
  /* when form is submitted */
  $(".form").submit(function() {
    $("#res").html(" "); // Set InnerHtml of res div as blank to remove previous results if there are any
    callWikipedia();
    return false;
  });
  /* when search button is clicked */
  $("#search").click(function() {
    $("#res").html(" ");
    callWikipedia();
  });

  // Call Wikipedia API via an AJAX request
  function callWikipedia() {
    let search = $("#query").val();
    let url = `http://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=${search}&callback=?`;
    $.ajax({
      url: url,
      type: "POST",
      dataType: "jsonp",
      success: function(result) {
        let data = result.query.pages;
        render(data);
      },
      error: function(err) {
        console.log(err);
        alert("Oops something went wrong! Please try again.");
      }
    });
  }
  // Append search results
  function render(data) {
    let pageurl = "http://en.wikipedia.org/?curid=";
    for (let i in data) {
      $("#res").append(
        "<div id='resultdiv'><a target='_blank' href='" +
          pageurl +
          data[i].pageid +
          "'><h3>" +
          data[i].title +
          "</h3><p>" +
          data[i].extract +
          "</p></a></div>"
      );
    }
  }
});
