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

function checkEmail(input) {
  const regex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  if (regex.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'Email is not valid');
  }
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

// Check input length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(input, `${getFieldName(input)} must be at least ${min} characters`);
  } else if (input.value.length > max) {
    showError(input, `${getFieldName(input)} must be less than ${max} characters`);
  } else {
    showSuccess(input);
  }
}

// Check passwords match
function checkPasswordsMatch(input1, input2) {
  if (input1.value === input2.value) {
    showSuccess(input2);
  } else {
    showError(input2, 'Password do not match');
  }
}

// Get fieldname
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Event listeners
form.addEventListener('submit', function (event) {
  event.preventDefault(); // submit시 자동 새로고침을 막음

  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  checkEmail(email);
  checkPasswordsMatch(password, password2);
});
