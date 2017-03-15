$(document).ready(function(){
  console.log("Ajay");
  alert("Ajay");
  $("#user-email").val('');
  $("#user-pass").val('');
  $("#user-conpass").val('');
  //$("#user-conpass").focus();

  $("#submit-e").click(function(event){
      event.preventDefault();
        var uname = $("#msform #user-email").val();
        var pswd = $("#msform #user-pass").val();
        var fname = $("#msform #user-fname").val();
  		var lname = $("#msform #user-lname").val();
  		var phn = $("#msform #user-phn").val();	
  		var add = $("#msform #user-add").val();	
  		console.log("Hoi");
  		var p = {
  			uname:uname,
  			pass:pswd,
  			fname:fname,
  			lname:lname,
  			phn:phn,
  			add:add	
  		};
        var SERVER_URL = "http://localhost:3000/signup/"+uname +"/" +pswd+"/"+fname+"/"+lname+"/"+phn+"/"+add;
        var jqxhr = $.ajax({url:SERVER_URL})
          .done(function(data){
            console.log("Success from Client");
            console.log(data);
        })
        .fail(function(data){
            console.log( "error", data);
        })
        .always(function(data){
            console.log( "complete" );
        });
        return false;
  });
  $("#loginn").click(function(event){
      event.preventDefault();
      console.log("Ajay");
      window.location = "http://localhost:3000/index.html";
  });
});
//jQuery time
var current_fs, next_fs, previous_fs; //fieldsets
var left, opacity, scale; //fieldset properties which we will animate
var animating; //flag to prevent quick multi-click glitches
$(".next").click(function(event){
	event.preventDefault();
	if(animating) return false;
	animating = true;
	current_fs = $(this).parent();
	next_fs = $(this).parent().next();
	//activate next step on progressbar using the index of next_fs
	$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
	//show the next fieldset
	next_fs.show(); 
	//hide the current fieldset with style
	current_fs.animate({opacity: 0}, {
		step: function(now, mx) {
			//as the opacity of current_fs reduces to 0 - stored in "now"
			//1. scale current_fs down to 80%
			scale = 1 - (1 - now) * 0.2;
			//2. bring next_fs from the right(50%)
			left = (now * 50)+"%";
			//3. increase opacity of next_fs to 1 as it moves in
			opacity = 1 - now;
			current_fs.css({
        'transform': 'scale('+scale+')',
        'position': 'absolute'
      });
			next_fs.css({'left': left, 'opacity': opacity});
		}, 
		duration: 800, 
		complete: function(){
			current_fs.hide();
			animating = false;
		}, 
		//this comes from the custom easing plugin
		easing: 'easeInOutBack'
	});
});

$(".previous").click(function(event){
	event.preventDefault();
	if(animating) return false;
	animating = true;
	
	current_fs = $(this).parent();
	previous_fs = $(this).parent().prev();
	
	//de-activate current step on progressbar
	$("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
	
	//show the previous fieldset
	previous_fs.show(); 
	//hide the current fieldset with style
	current_fs.animate({opacity: 0}, {
		step: function(now, mx) {
			//as the opacity of current_fs reduces to 0 - stored in "now"
			//1. scale previous_fs from 80% to 100%
			scale = 0.8 + (1 - now) * 0.2;
			//2. take current_fs to the right(50%) - from 0%
			left = ((1-now) * 50)+"%";
			//3. increase opacity of previous_fs to 1 as it moves in
			opacity = 1 - now;
			current_fs.css({'left': left});
			previous_fs.css({'transform': 'scale('+scale+')', 'opacity': opacity});
		}, 
		duration: 800, 
		complete: function(){
			current_fs.hide();
			animating = false;
		}, 
		//this comes from the custom easing plugin
		easing: 'easeInOutBack'
	});
});
