// Here The function all Signp()

function Signp() {
	event.preventDefault();
	let email = document.getElementById('ename').value;
	let password = document.getElementById('pname').value;
	if (password.length >= 8) {
		firebase
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.then((userCredential) => {
				// Signed in
				var email = $('#ename').val();
				var username = $('#fname').val();
				var country_name = $('#country_name').val();
				var city_name = $('#city_name').val();

				var data = {
					email: email,
					username: username,
					country_name: country_name,
					city_name: city_name,
				};

				var database = firebase.database();

				var ref = database.ref('Users');

				ref.push(data);

				Swal.fire({
					position: 'center',
					icon: 'success',
					title: 'Successfully Signup',
					showConfirmButton: true,
					timer: 3400,
				}).then(() => {
					location.reload();
				});

				// ...
			})

			.catch((error) => {
				console.log('nooo');
				Swal.fire({
					position: 'center',
					icon: 'error',
					title: 'Opps! Email Or Username is invalid.',
					showConfirmButton: true,
					timer: 3400,
				});
				var username = $('#fname').val();
				var email = $('#ename').val();
				var country_name = $('#country_name').val();
				var city_name = $('#city_name').val();
				var password = $('#pname').val();
				if (
					username.length > 1 &&
					email.length > 1 &&
					country_name > 1 &&
					city_name > 1 &&
					password.length >= 8
				) {
					Swal.fire({
						position: 'center',
						icon: 'error',
						title: 'Opps! Email Or Username is invalid.',
						showConfirmButton: true,
						timer: 3400,
					});
				}
				// ..
			});
	}
}

// Here I Check The Input Feild If the Empty Click On the Button.
$('#signup').click(function () {
	var username = $('#fname').val();
	var email = $('#ename').val();
	var password = $('#pname').val();
	var country_name = $('#country_name').val();
	var city_name = $('#city_name').val();

	if (email == '') {
		toastr.error('Please Enter Email Feild.');
	} else if (username == '') {
		toastr.error('Please Enter Name Feild.');
	} else if (country_name == '') {
		toastr.error('Please Enter Country Feild.');
	} else if (city_name == '') {
		toastr.error('Please Enter City Feild.');
	} else if (password == '') {
		toastr.error('Please Enter Password Feild.');
	}
});

// Here I Validate The Input Feilds.
$('#sign-up-form-new').validate({
	rules: {
		ename: {
			required: true,
			email: true,
		},
		pname: {
			required: true,
			minlength: 8,
		},
	},
	messages: {
		ename: {
			required: '<p class="chip">Please enter a email address</p>',
			email: '<p class="chip">Please enter a vaild email address</p>',
		},
		pname: {
			required: '<p class="chip">Please provide a password</p>',
			minlength: '<p class="chip">Your password must be at least 8 characters long</p>',
		},
	},
});

// Here I Check if Number In input Feild.
function lettersonly(input) {
	var regex = /[^a-z]/gi;
	input.value = input.value.replace(regex, '');
}