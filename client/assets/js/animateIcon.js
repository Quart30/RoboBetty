//on document load method
$( document ).ready(function() {
	var currentIcon = $(".active").attr('id');
	var p = $( "#" + currentIcon );
	var position = p.position();
	if( currentIcon == "1" || currentIcon == "2" || currentIcon == "4"){
		$( "#triangle-up" ).css( "left", position.left + 20 + "px" );
	}
	else{
		$( "#triangle-up" ).css( "left", position.left + 50 + "px" );
	}
});


//on resize method
go();
window.addEventListener('resize', go);

function go(){
	var currentIcon = $(".active").attr('id');
	var p = $( "#" + currentIcon );
	var position = p.position();
	if( currentIcon == "1" || currentIcon == "2" || currentIcon == "4"){
		$( "#triangle-up" ).css( "left", position.left + 20 + "px" );
	}
	else{
		$( "#triangle-up" ).css( "left", position.left + 50 + "px" );
	}
}


//animation function
$( ".nav-icon" ).click(function() {

	var clickedIcon = $(this).attr('id');

	var currentIcon = $(".active").attr('id');

	//if current do nothing
	if( currentIcon == clickedIcon){

	}
	else if ( currentIcon == "1"){

		$( "#1" ).toggleClass( "active", false );

		switch(clickedIcon) {
		    case '2':
		    	var p = $( "#2" );
				var position = p.position();
		        $( "#triangle-up" ).animate({
					left: position.left + 20 + "px",
				}, 2000, function() {
					$( "#2" ).toggleClass( "active", true );
				});
		        break;
		    case '3':
		    	var p = $( "#3" );
				var position = p.position();
		        $( "#triangle-up" ).animate({
					left: position.left + 50 + "px",
				}, 2000, function() {
					$( "#3" ).toggleClass( "active", true );
				});
		        break;
		    case '4':
		    	var p = $( "#4" );
				var position = p.position();
		        $( "#triangle-up" ).animate({
					left: position.left + 20 + "px",
				}, 2000, function() {
					$( "#4" ).toggleClass( "active", true );
				});
		        break;
		    default:
		      	$( "#1" ).toggleClass( "active", true );
		    //default position is keep current class and do nothing when click on active
		} 


	}
	else if ( currentIcon == "2"){

		$( "#2" ).toggleClass( "active", false );

		switch(clickedIcon) {
		    case '1':
		    	var p = $( "#1" );
				var position = p.position();
		        $( "#triangle-up" ).animate({
					left: position.left  + 20 + "px",
				}, 2000, function() {
					$( "#1" ).toggleClass( "active", true );
				});
				
		        break;
		    case '3':
		        var p = $( "#3" );
				var position = p.position();
		        $( "#triangle-up" ).animate({
					left: position.left  + 50 + "px",
				}, 2000, function() {
					$( "#3" ).toggleClass( "active", true );
				});
		        break;
		    case '4':
		        var p = $( "#4" );
				var position = p.position();
		        $( "#triangle-up" ).animate({
					left: position.left  + 20 + "px",
				}, 2000, function() {
					$( "#4" ).toggleClass( "active", true );
				});
		        break;
		    default:
		      	$( "#2" ).toggleClass( "active", true );//default:
				//default position is keep current class and do nothing when click on active
		} 

	}
	else if ( currentIcon == "3"){

		$( "#3" ).toggleClass( "active", false );

		switch(clickedIcon) {
		    case '1':
		        var p = $( "#1" );
				var position = p.position();
		        $( "#triangle-up" ).animate({
					left: position.left  + 20 + "px",
				}, 2000, function() {
					$( "#1" ).toggleClass( "active", true );
				});
		        break;
		    case '2':
		        var p = $( "#2" );
				var position = p.position();
		        $( "#triangle-up" ).animate({
					left: position.left  + 20 + "px",
				}, 2000, function() {
					$( "#2" ).toggleClass( "active", true );
				});
		        break;
		    case '4':
		        var p = $( "#4" );
				var position = p.position();
		        $( "#triangle-up" ).animate({
					left: position.left  + 20 + "px",
				}, 2000, function() {
					$( "#4" ).toggleClass( "active", true );
				});
		        break;
		    default:
		      	$( "#3" ).toggleClass( "active", true );
				//default position is keep current class and do nothing when click on active	
		} 

	}
	else if ( currentIcon == "4"){

		$( "#4" ).toggleClass( "active", false );

		switch(clickedIcon) {
		    case '1':
		        var p = $( "#1" );
				var position = p.position();
		        $( "#triangle-up" ).animate({
					left: position.left  + 20 + "px",
				}, 2000, function() {
					$( "#1" ).toggleClass( "active", true );
				});
		        break;
		    case '2':
		        var p = $( "#2" );
				var position = p.position();
		        $( "#triangle-up" ).animate({
					left: position.left  + 20 + "px",
				}, 2000, function() {
					$( "#2" ).toggleClass( "active", true );
				});
		        break;
		    case '3':
		        var p = $( "#3" );
				var position = p.position();
		        $( "#triangle-up" ).animate({
					left: position.left  + 50 + "px",
				}, 2000, function() {
					$( "#3" ).toggleClass( "active", true );
				});
		        break;
		    default:
		      	$( "#4" ).toggleClass( "active", true );
		      	//default position is keep current class and do nothing when click on active
		} 

	}

});


//If true add this class, else remove
//$( "#foo" ).toggleClass( className, true );