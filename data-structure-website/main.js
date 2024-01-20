// AOS initialization
AOS.init({
   offset: 200,
   delay: 250,
   duration: 800,
   easing: 'ease-in',
   once: false,
   mirror: false,
   anchorPlacement: 'top-button',
});

// Hamburger menu
const icon = document.querySelector('.nav-icon');
const headerEL = document.querySelector('.header');

icon.addEventListener('click', () => {
   headerEL.classList.toggle('active');
});

document.addEventListener('DOMContentLoaded', function () {
   // Event listener for eye icon click (Toggle password visibility)
   const pwShowHide = document.querySelectorAll('.eye-icon');

   pwShowHide.forEach((eyeIcon) => {
      eyeIcon.addEventListener('click', () => {
         let pwFields =
            eyeIcon.parentElement.parentElement.querySelectorAll('.password');

         pwFields.forEach((password) => {
            if (password.type === 'password') {
               password.type = 'text';
               eyeIcon.classList.replace('bx-hide', 'bx-show');
               return;
            }
            password.type = 'password';
            eyeIcon.classList.replace('bx-show', 'bx-hide');
         });
      });
   });

   // Event listener for form submission
   const signupForm = document.querySelector('.form.login form');
   signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      handleSignup();
   });

   // Function to handle form submission
   const handleSignup = () => {
      const emailInput = document.querySelector('.input');
      const passwordInputs = document.querySelectorAll('.password');

      // Get user input
      const email = emailInput.value;
      const password = passwordInputs[0].value;
      const confirmPassword = passwordInputs[1].value;

      // Validate the inputs
      if (
         email.trim() === '' ||
         password.trim() === '' ||
         confirmPassword.trim() === ''
      ) {
         alert('Please fill in all fields.');
         return;
      }

      if (password !== confirmPassword) {
         alert('Passwords do not match.');
         return;
      }

      // Store user information in local storage
      const user = {
         email,
         password,
      };
      localStorage.setItem('user', JSON.stringify(user));

      // Navigate to login page
      window.location.href = './Login.html';
   };
});
