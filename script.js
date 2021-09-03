var input_element = document.querySelectorAll('input');
// Loop even each DOM object
for (let i = 0; i < input_element.length; i++) {
	input_element[i].addEventListener('keyup', (e) => {
		input_element[i].setAttribute('value', input_element[i].value);
	});
}

const sign_in_btn = document.querySelector('#sign-in-btn');
const sign_up_btn = document.querySelector('#sign-up-btn');
const container = document.querySelector('.container');

sign_up_btn.addEventListener('click', () => {
	container.classList.add('sign-up-mode');
});

sign_in_btn.addEventListener('click', () => {
	/
	container.classList.remove('sign-up-mode');
});

// Here When User Login With his Account Then This funtion is Call.

function login() {
	event.preventDefault();
	let email = document.getElementById('username').value;
	let password = document.getElementById('password').value;

	firebase
		.auth()
		.signInWithEmailAndPassword(email, password)
		.then((userCredential) => {
			location.replace('welcome.html');
		})

		.catch((error) => {
			var name = $('#username').val();
			var password = $('#password').val();
			if (name.length > 1 && password.length >= 8) {
				Swal.fire({
					position: 'center',
					icon: 'error',
					title: 'Opps! Email and Password not match.',
					showConfirmButton: true,
					timer: 3400,
				});
			}
		});
}

// Here I Check The Input Feild If the Empty Click On the Button.

$('#submit').click(function () {
	var name = $('#username').val();
	var password = $('#password').val();

	if (name == '') {
		toastr.error('Please Enter Email Feild.');
	} else if (password.length >= 1 && password.length < 8) {
		toastr.warning('Your password is to short.');
	} else if (password == '') {
		toastr.error('Please Enter Password Feild.');
	}
});

// Here I Validate The Input Feilds.
$('#sign-up-form').validate({
	rules: {
		email: {
			required: true,
			email: true,
		},
		password: {
			required: true,
			minlength: 8,
		},
	},
	messages: {
		email: {
			required: '<p class="chip">Please enter a email address</p>',
			email: '<p class="chip">Please enter a vaild email address</p>',
		},
		password: {
			required: '<p class="chip">Please provide a password</p>',
			minlength: '<p class="chip">Your password must be at least 8 characters long</p>',
		},
	},
});