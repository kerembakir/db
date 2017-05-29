
var time = Date.now();

function sendRequest(typedIn) {
  console.log(Date.now()-time);
  if (Date.now()-time > 300) {
    $.post("/autocomplete", {typedIn: typedIn}, function(data, status){
      console.log(data)
      document.getElementById('box').value = data
    })
  }
  time = Date.now();
}

$(document).ready(function(){
  $("#input_val").keyup(function(){
    var input = $(this).val();
    if(input.length === 0){
      $('#displayUser').empty();
    } else {
      $.post('/autocomplete', {input: input}, function (results){
        console.log(results);
        $('#displayUser').empty();
        if(results.length !== 0){
          results.forEach(function (result){
            var li = $('<li>');
            li.html(result.firstname + " " + result.lastname);
            $('#displayUser').append(li);
          });
        }
      });
    }
  });
})