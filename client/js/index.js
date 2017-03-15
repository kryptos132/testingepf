$(document).ready(function(){
  console.log("Ajay");
  $("#login-password").val('');
  $('#login-username').val("");
  $("#login-username").focus();
  $("#log").click(function(event){
      event.preventDefault();
        var uname = $("#login-username").val() ;
        var pswd = $("#login-password").val() ;
        var SERVER_URL = "http://localhost:3000/login/" +uname+'/'+pswd ;
        var jqxhr = $.ajax(SERVER_URL)
          .done(function(data){
            var uname = $("#login-username").val();
            var pswd = $("#login-password").val();
            console.log("Success from Client");
            console.log(data);
            window.location = "http://localhost:3000/home.html";
            alert("Success");
        })
        .fail(function(){
            console.log( "error", data );
        })
        .always(function(){
            console.log( "complete" );
        });
  });
});
$(window, document, undefined).ready(function() {
  $('input').blur(function() {
    var $this = $(this);
    if ($this.val())
      $this.addClass('used');
    else
      $this.removeClass('used');
  });
  var $ripples = $('.ripples');
  $ripples.on('click.Ripples', function(e) {
    var $this = $(this);
    var $offset = $this.parent().offset();
    var $circle = $this.find('.ripplesCircle');
    var x = e.pageX - $offset.left;
    var y = e.pageY - $offset.top;
    $circle.css({
      top: y + 'px',
      left: x + 'px'
    });
    $this.addClass('is-active');
  });
  $ripples.on('animationend webkitAnimationEnd mozAnimationEnd oanimationend MSAnimationEnd', function(e) {
  	$(this).removeClass('is-active');
  });
});