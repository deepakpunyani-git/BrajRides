/* Login Page */

$(document).on("click","#loginBtn", function (e) {
  e.preventDefault();
  $("#loginBtn > .loading").show();
  $("#loginBtn > .btn-txt").hide();
  $("#loginBtn").attr('disabled', true);

  $(".error-message").hide();
  var err = 0;

  var usernameOrEmail = $("#usernameOrEmail").val();
  var password = $("#password").val();

  // Validate inputs
  if (!usernameOrEmail || !password) {
    $("#loginBtn > .loading").hide();
    $("#loginBtn > .btn-txt").show();
    ("#loginBtn").removeAttr('disabled')

    $(".error-message").text("All fields are required").show();
    return;
  }

  // Call your login API
  $.ajax({
    type: "POST",
    url: "api/auth/admin-login",
    data: JSON.stringify({ usernameOrEmail: usernameOrEmail, password: password }),
    contentType: "application/json",
    success: function (response) {
      $("#loginBtn > .loading").hide();
      $("#loginBtn > .btn-txt").show();
      $("#loginBtn").removeAttr('disabled')

      if (response.token) {
       // console.log(response.token);
        localStorage.setItem("jwtToken", response.token);
        window.location.href = "/dashboard";
      } else {
        $(".error-message").text("Invalid credentials").show();
      }
    },
    error: function (error) {
      $("#loginBtn > .loading").hide();
      $("#loginBtn > .btn-txt").show();
      $("#loginBtn").removeAttr('disabled')

      $(".error-message").text(error.responseJSON.message).show();
    }
  });
});


 // Handle submission of forgot password form
$('#submitForgotBtn').on('click', function(e) {
  e.preventDefault();
  $("#submitForgotBtn > .loading").show();
  $("#submitForgotBtn > .btn-txt").hide();
  $("#submitForgotBtn").attr('disabled', true);


  $(".error-message").empty().hide();

  var email = $('#forgotEmail').val();
  
  // Validate inputs
  if (!email) {
    $("#submitForgotBtn > .loading").hide();
    $("#submitForgotBtn > .btn-txt").show();
    $("#submitForgotBtn").removeAttr('disabled')
    $(".error-message").text("All fields are required").show();
    return;
  }
  
  // Email validation
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    $("#submitForgotBtn > .loading").hide();
    $("#submitForgotBtn > .btn-txt").show();
    $("#submitForgotBtn").removeAttr('disabled')
      $(".error-message").text("Invalid email format").show();
      return;
  }

  // Call your login API
  $.ajax({
    type: "POST",
    url: "api/forgot-password",
    data: JSON.stringify({ email: email}),
    contentType: "application/json",
    success: function (response) {
      $("#forgotEmailOTP").val(email)
      $('#forgotPasswordForm').hide();
      $('#newPassForm').show();

      $("#submitForgotBtn > .loading").hide();
      $("#submitForgotBtn > .btn-txt").show();
      $("#submitForgotBtn").removeAttr('disabled')
     
    },
    error: function (error) {
      $("#submitForgotBtn > .loading").hide();
      $("#submitForgotBtn > .btn-txt").show();
      $("#submitForgotBtn").removeAttr('disabled')
      $(".error-message").text(error.responseJSON.message).show();
    }
  });
  

});



  
// Handle submission of OTP form (after successful forgot password submission)
$('#submitPasswordBtn').on('click', function(e) {
  e.preventDefault();
  $("#submitPasswordBtn > .loading").show();
  $("#submitPasswordBtn > .btn-txt").hide();
  $("#submitPasswordBtn").attr('disabled', true);

  var otp = $('#otp').val();
  var email = $('#forgotEmailOTP').val();
  var password = $("#newPassword").val();

  if (!otp || !password) {
    $("#submitPasswordBtn > .loading").hide();
    $("#submitPasswordBtn > .btn-txt").show();
    $("#submitPasswordBtn").removeAttr('disabled');
    $(".error-message").text("All fields are required").show();
    return;
  }


  if (password.length<8) {
    $("#submitPasswordBtn > .loading").hide();
    $("#submitPasswordBtn > .btn-txt").show();
    $("#submitPasswordBtn").removeAttr('disabled');
    $(".error-message").text("Please enter a password with 8 or more characters").show();
    return;
  }


    $.ajax({
      type: "POST",
      url: "api/reset-password",
      data: JSON.stringify({ email: email , otp:otp  ,newPassword:password}),
      contentType: "application/json",
      success: function (response) {
        $("#forgotEmailOTP").val(email)
        $('#forgotPasswordForm').hide();
        $('#newPassForm').hide();

        $("#submitPasswordBtn > .loading").hide();
        $("#submitPasswordBtn > .btn-txt").show();
        $("#submitPasswordBtn").removeAttr('disabled');
        showToast('Your password has been changed , you can log in now.', 'success');

        $(".loginFormLink").click();

      },
      error: function (error) {
        $("#submitPasswordBtn > .loading").hide();
        $("#submitPasswordBtn > .btn-txt").show();
        $("#submitPasswordBtn").removeAttr('disabled')
        $(".error-message").text(error.responseJSON.message).show();
      }
    });

});

$('.loginFormLink').on('click', function(e) {
  e.preventDefault();
  $('#forgotPasswordForm').hide();
  $(".error-message").empty().hide();
  $('#newPassForm').hide();
  $('#loginForm').show();

});
  

  // Show forgot password form and hide login form on clicking "Forgot Password"
  $('.forgot-password-link').on('click', function(e) {
    e.preventDefault();
    $('#loginForm').hide();
    $('#newPassForm').hide();
    $(".error-message").empty().hide();
    $('#forgotPasswordForm').show();
});

/* Login Page end */


/* Register Page end */

/* Verify OTP */

$(document).on("click", "#verifyOtpBtn", function (e) {
  e.preventDefault();
  $("#verifyOtpBtn > .loading").show();
  $("#verifyOtpBtn > .btn-txt").hide();
  $("#verifyOtpBtn").attr('disabled', true);

  var otp = $("#otp").val();

  var email = $("#verifyEmail").val();


  if (!otp || !email) {
    $("#verifyOtpBtn > .loading").hide();
    $("#verifyOtpBtn > .btn-txt").show();
    $("#verifyOtpBtn").removeAttr('disabled');
    $(".error-message").text("All fields are required").show();
    return;
  }

    // Email validation
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      $("#registerBtn > .loading").hide();
      $("#registerBtn > .btn-txt").show();
      $("#registerBtn").removeAttr('disabled');
      $(".error-message").text("Invalid email format").show();
      return;
    }
  

  // Call your verify OTP API
  $.ajax({
    type: "POST",
    url: "api/verify-otp",
    data: JSON.stringify({ email: email, otp: otp }),
    contentType: "application/json",
    success: function (response) {
      $("#verifyOtpBtn > .loading").hide();
      $("#verifyOtpBtn > .btn-txt").show();
      $("#verifyOtpBtn").removeAttr('disabled');
      showToast('Registration successful, You can log in now.', 'success');

      window.location.href = "/login";
    },
    error: function (error) {
      $("#verifyOtpBtn > .loading").hide();
      $("#verifyOtpBtn > .btn-txt").show();
      $("#verifyOtpBtn").removeAttr('disabled');
      $(".error-message").text(error.responseJSON.message).show();
    }
  });
});

$(document).on("click", ".resendOtpLink", function (e) {
  e.preventDefault();

  var email = $("#verifyEmail").val();

  if (!email) {
    $(".error-message").text("Email is required").show();
    return;
  }

    // Email validation
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      $("#registerBtn > .loading").hide();
      $("#registerBtn > .btn-txt").show();
      $("#registerBtn").removeAttr('disabled');
      $(".error-message").text("Invalid email format").show();
      return;
    }
  

  // Call your resend OTP API
  $.ajax({
    type: "POST",
    url: "api/resend-otp",
    data: JSON.stringify({ email: email }),
    contentType: "application/json",
    success: function (response) {
      $(".error-message").text('').hide();

      showToast('OTP has been resent. Please check your email.', 'success');

    },
    error: function (error) {
   
      $(".error-message").text(error.responseJSON.message).show();
      }
  });
});


async function TokenCheck(){

    const token = localStorage.getItem('jwtToken');

    if (token) {
      try {
        const response = await fetch('/api/auth/verify-token', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
            'Location':location.pathname

          }
        });
  
        const data = await response.json();


        if(data.redirectTo=='/dashboard'){
          window.location.href = '/dashboard';
          return;
        }
        await populateMenu(data.menu);
        if (!response.ok) {
          throw new Error(data.message);
        }
  
      
      } catch (error) {
        // console.log(error)
        localStorage.removeItem('jwtToken');
        window.location.href = '/login';
      }
    } else {
     localStorage.removeItem('jwtToken');
      window.location.href = '/login';
    }

}

async function TokenCheckExpiry(){

  const token = localStorage.getItem('jwtToken');

  if (token) {
    try {
      const response = await fetch('/api/auth/verify-token-expiry', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
          'Location':location.pathname
        }
      });
     

      if (!response.ok) {
        throw new Error(data.message);
      }

    
    } catch (error) {
      
      localStorage.removeItem('jwtToken');
      //window.location.href = '/';
    }
  } else {
    localStorage.removeItem('jwtToken');
   // window.location.href = '/';
  }


}

function hideModal(modalId) {
  const modalElement = document.getElementById(modalId);
  if (modalElement) {
    const modalInstance = bootstrap.Modal.getInstance(modalElement);
    if (modalInstance) {
      modalInstance.hide();
    }
  }
}

function showToast(message, type) {
  const toastElement = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');
  const toastInstance = new bootstrap.Toast(toastElement);

  toastElement.classList.remove('text-bg-success', 'text-bg-danger');
  toastElement.classList.add(`text-bg-${type}`);
  toastMessage.textContent = message;

  // Ensure that the toast is shown
  toastInstance.show();
}

function populateMenu(menuItems) {
    const menuContainer = document.getElementById('dashboard-menu');
    const ul = document.createElement('ul');
    ul.className = 'navbar-nav navbar-nav-2 d-flex flex-row mx-auto';

    const currentPath = window.location.pathname; // Get the current path
    menuItems.forEach(item => {
      if(item.show == 1){
        const li = document.createElement('li');
        li.className = 'nav-item mx-2';

        const a = document.createElement('a');
        a.className = 'nav-link';
        a.href = item.link;
        a.textContent = item.name;

        // Add 'active' class if the current path matches the menu item link
        if (item.link === currentPath) {
            a.classList.add('active');
        }

        li.appendChild(a);
        ul.appendChild(li);

      }
    });


    menuContainer.innerHTML = ''; // Clear existing menu
    menuContainer.appendChild(ul);
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}



function getSessionId() {
  let sessionId = getCookie('sessionId');
  if (!sessionId) {
      sessionId = 'session-' + Date.now();
      setCookie('sessionId', sessionId, 0.33); // Expires in 8 hours
      localStorage.removeItem('chatMessages');
  }
  return sessionId;
}

function saveMessages(messages) {
  localStorage.setItem('chatMessages', JSON.stringify(messages));
}

 function loadMessages() {
  const savedMessages = localStorage.getItem('chatMessages');
  return savedMessages ? JSON.parse(savedMessages) : [];
}

function setCookie(name, value, hours) {
  const expires = new Date(Date.now() + hours * 60 * 60 * 1000).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/`;
}

function getCookie(name) {
  const cookieArr = document.cookie.split(';');
  for (let i = 0; i < cookieArr.length; i++) {
      const cookiePair = cookieArr[i].trim().split('=');
      if (cookiePair[0] === name) {
          return decodeURIComponent(cookiePair[1]);
      }
  }
  return null;
}


