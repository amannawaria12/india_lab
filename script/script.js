$(document).ready(function() {
    // Disable confirm password field by default
    $('#confirm-password').prop('disabled', true);
  
    // Enable confirm password field when password field has a value
    $('#password').on('input', function() {
      if ($(this).val()) {
        $('#confirm-password').prop('disabled', false);
      } else {
        $('#confirm-password').prop('disabled', true);
      }
    });
    
    // Validate that password and confirm password fields match
    $('#password, #confirm-password').on('keyup', function() {
      if ($('#password').val() != $('#confirm-password').val()) {
        $('#confirm-password')[0].setCustomValidity("Passwords do not match");
      } else {
        $('#confirm-password')[0].setCustomValidity("");
      }
    });
    
    // Show the password as we click on the checkbox
    $('#show-password').on('change', function() {
      if ($(this).is(':checked')) {
        $('#password').attr('type', 'text');
        $('#confirm-password').attr('type', 'text');
      } else {
        $('#password').attr('type', 'password');
        $('#confirm-password').attr('type', 'password');
      }
    });
    
    // Load data from JSON file on button click
    $("#load-data").click(function() {
      $.getJSON("assets/data.json", function(data) {
        // Populate form fields with data
        $("#name").val(data.name);
        $("#email").val(data.email);
        $("#phone").val(data.phone);
        $("#password").val(data.password);
        $("#confirm-password").val(data.password);
        $("#work-start-date").val(data["work-start-date"]);
        $("#work-start-time").val(data["work-start-time"]);
        $("#bingo-room").val(data["bingo-room"]);
        $("#age").val(data.age);
        $("#credit-card").val(data["credit-card"]);
        $("#ssn").val(data.ssn);
        $("#male, #female, #other").prop("checked", false); // Uncheck all gender options
        $("#" + data.gender).prop("checked", true); // Check the gender option based on data
        $("#social, #friend").prop("checked", false); // Uncheck all about options
        $.each(data.about, function(index, value) {
          $("#" + value).prop("checked", true); // Check the about options based on data
        });
      });
    });
    
    // Filter options in select2 based on selection in select1
    document.getElementById('select1').addEventListener('change', function() {
      var parentValue = this.value;
      var childSelect = document.getElementById('select2');
      for (var i = 0; i < childSelect.options.length; i++) {
        var option = childSelect.options[i];
        if (option.getAttribute('data-parent') === parentValue) {
          option.style.display = 'block';
        } else {
          option.style.display = 'none';
          if (option.getAttribute('data-parent')) {
            var parentOption = document.querySelector('option[value="' + option.getAttribute('data-parent') + '"]');
            if (parentOption && parentOption.selected) {
              parentOption.selected = false;
              parentOption.dispatchEvent(new Event('change'));
            }
          }
        }
      }
    });
    // Submit form and display alert with user input
    $('form').submit(function(event) {
      event.preventDefault();
      var name = $('#name').val();
      var ccNum = $('#credit-card').val();
      var ssn = $('#ssn').val();
      alert('Welcome ' + name + '! Your credit card number is ' + ccNum + ' and your SSN number is ' + ssn);
    });
});





