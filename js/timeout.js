$( document ).ready(function() {
	console.log("Dom is ready")

var fireRequest = true;

	$("input").keyup(function() {
		console.log('typing');
		var postdata = {
			search: $(this).val(), ajax : true
		}
		console.log(postdata);
if( postdata.search ){
	if( fireRequest){
		fireRequest = false

		$.post('/searchbar', postdata, function(data){
			$ ('#list').empty()
			for (person in data){
				$ ( '#list' ).append ('<option>' + data[person])
			}
		});
		setTimeout(function() {
    			fireRequest = true
			}, 300);
	}
}

});
});
