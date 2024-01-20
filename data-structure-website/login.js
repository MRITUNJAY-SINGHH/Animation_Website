const handleLogin = () => {
   const emailInput = document.querySelector('.input');
   const passwordInput = document.querySelector('.password');

   const email = emailInput.value;
   const password = passwordInput.value;

   const storedUser = localStorage.getItem('user');
   if (storedUser) {
      const user = JSON.parse(storedUser);

      if (email === user.email && password === user.password) {
         alert('Login successful!');
         localStorage.setItem('isLoggedIn', 'true');
         window.location.href = './index.html';
         return;
      }
   }
   alert('Invalid email or password.');
};

const handleLogout = () => {
   localStorage.removeItem('user');
   localStorage.setItem('isLoggedIn', 'false');
   window.location.href = './index.html';
};

const togglePasswordVisibility = () => {
   const pwFields = document.querySelectorAll('.password');

   pwFields.forEach((password) => {
      const eyeIcon = password.nextElementSibling;
      password.type = password.type === 'password' ? 'text' : 'password';
      eyeIcon.classList.toggle('bx-hide');
      eyeIcon.classList.toggle('bx-show');
   });
};

document.addEventListener('DOMContentLoaded', function () {
   const pwShowHide = document.querySelectorAll('.eye-icon');
   pwShowHide.forEach((eyeIcon) => {
      eyeIcon.addEventListener('click', togglePasswordVisibility);
   });

   const loginForm = document.querySelector('.form.login form');
   loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      handleLogin();
   });
});
