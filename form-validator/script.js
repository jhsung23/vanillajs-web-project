// querySelector로 해당 id의 DOM을 가져온다.
const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// Show input error message
function showError(input, message) {
  // input의 부모 요소 가져오기
  const formControl = input.parentElement; // div
  // formControl의 클래스 이름 변경
  formControl.className = 'form-control error';
  // formControl 내부에서 small이라는 태그 가져오기
  const small = formControl.querySelector('small');
  // small 태그의 텍스트 변경
  small.innerText = message;
}

// Show success outline
function showSuccess(input) {
  // input의 부모 요소 가져오기
  const formControl = input.parentElement; // div
  // formControl의 클래스 이름 변경
  formControl.className = 'form-control success';
}

function isValidEmail(email) {
  const regex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  return regex.test(String(email).toLowerCase());
}

// Check required fields
function checkRequired(inputArray) {
  inputArray.forEach(function (input) {
    if (input.value.trim() === '') {
      console.log(input.id);
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}

// Get fieldname
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Event listeners
form.addEventListener('submit', function (event) {
  event.preventDefault(); // submit시 자동 새로고침을 막음

  checkRequired([username, email, password, password2]);

  // ****** target of refactoring ******
  //   if (username.value === '') {
  //     showError(username, 'Username is required');
  //   } else {
  //     showSuccess(username);
  //   }

  //   if (email.value === '') {
  //     showError(email, 'Email is required');
  //   } else if (!isValidEmail(email.value)) {
  //     showError(email, 'Email is not valid');
  //   } else {
  //     showSuccess(email);
  //   }

  //   if (password.value === '') {
  //     showError(password, 'Password is required');
  //   } else {
  //     showSuccess(password);
  //   }

  //   if (password2.value === '') {
  //     showError(password2, 'Confirm password is required');
  //   } else {
  //     showSuccess(password2);
  //   }
});
