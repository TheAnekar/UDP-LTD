document.getElementById('show-login').addEventListener('click', function () {
  document.getElementById('login-form').classList.remove('hidden');
  document.getElementById('register-form').classList.add('hidden');
});

document.getElementById('show-register').addEventListener('click', function () {
  document.getElementById('register-form').classList.remove('hidden');
  document.getElementById('login-form').classList.add('hidden');
});
