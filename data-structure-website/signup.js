const handleSignup = () => {
   const emailInput = document.querySelector('.input');
   const passwordInputs = document.querySelectorAll('.password');

   const email = emailInput.value;
   const password = passwordInputs[0].value;
   const confirmPassword = passwordInputs[1].value;

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

   const user = {
      email,
      password,
   };
   localStorage.setItem('user', JSON.stringify(user));
   alert('Successfully registered! Redirecting to login page.');

   setTimeout(() => {
      window.location.href = './Login.html';
   }, 2000);
};

document.addEventListener('DOMContentLoaded', function () {
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

   const signupForm = document.querySelector('.form.login form');
   signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      handleSignup();
   });
});
