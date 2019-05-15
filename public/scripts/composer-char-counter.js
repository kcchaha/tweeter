$(document).ready(() => {
  $("#textInput").on('input', function() {
      let length = $(this).val().length;
      if (length > 139) {
        $(this).val();
      }
      let num = 140 - length;
      $('.counter').text(num);
      if (length > 140) {
        $('span').addClass('returnRed')
      } 
      else {
        $('span').removeClass('returnRed')
      }
  });
});

