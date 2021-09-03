// Here I Creat The Variable Of Api

const weatherApi = {
	key: "fc224f111456a84b1a97e566bf1abc40",
	baseUrl: "https://api.openweathermap.org/data/2.5/weather",
};

firebase.auth().onAuthStateChanged((user) => {
	if (user) {
		var ref = firebase.database().ref("Users");

		// ref.once('value', function (snapshot) {
		// 	console.log(snapshot.val());
		// });

		ref
			.orderByChild("email")
			.equalTo(user.email)
			.on("child_added", function (snapshot) {
				var city_name = snapshot.val().city_name;
				console.log(city_name);

				var country_name = snapshot.val().country_name;
				console.log(country_name);

				getWeatherReport(city_name);

				// Get Weather Report
				function getWeatherReport(city) {
					fetch(
							`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`
						)
						.then((weather) => {
							return weather.json();
						})
						.then(showWeatherReport)
						.catch((error) => {
							document.querySelector(".weather-body").style.display = "none";
							Swal.fire({
								position: "center",
								icon: "error",
								title: "Please Enter Correct City And Country",
								showConfirmButton: true,
								timer: 8000,
							});
							console.log("nooo");
						});
				}

				// Show Weather Report
				function showWeatherReport(weather) {
					console.log(weather);

					let city = document.getElementById("city");
					city.innerText = `${weather.name}, ${weather.sys.country}`;

					let temperature = document.getElementById("temp");
					temperature.innerHTML = `${Math.round(weather.main.temp)}&deg;C`;

					let minMaxTemp = document.getElementById("min-max");
					minMaxTemp.innerHTML = `${Math.floor(
						weather.main.temp_min
					)}&deg;C (min)/ ${Math.ceil(weather.main.temp_max)}&deg;C (max) `;

					let weatherType = document.getElementById("weather");
					weatherType.innerText = `${weather.weather[0].main}`;

					let date = document.getElementById("date");
					let todayDate = new Date();
					date.innerText = dateManage(todayDate);

					if (weatherType.textContent == "Clear") {
						document.body.style.backgroundImage = "url('images/clear.jpg')";
					} else if (weatherType.textContent == "Clouds") {
						document.body.style.backgroundImage = "url('images/cloud.jpg')";
					} else if (weatherType.textContent == "Haze") {
						document.body.style.backgroundImage = "url('images/cloud.jpg')";
					} else if (weatherType.textContent == "Rain") {
						document.body.style.backgroundImage = "url('images/rain.jpg')";
					} else if (weatherType.textContent == "Snow") {
						document.body.style.backgroundImage = "url('images/snow.jpg')";
					} else if (weatherType.textContent == "Thunderstorm") {
						document.body.style.backgroundImage =
							"url('images/thunderstorm.jpg')";
					}
				}

				// Date manage
				function dateManage(dateArg) {
					let days = [
						"Sunday",
						"Monday",
						"Tuesday",
						"Wednesday",
						"Thursday",
						"Friday",
						"Saturday",
					];

					let months = [
						"January",
						"February",
						"March",
						"April",
						"May",
						"June",
						"July",
						"August",
						"September",
						"October",
						"November",
						"December",
					];

					let year = dateArg.getFullYear();
					let month = months[dateArg.getMonth()];
					let date = dateArg.getDate();
					let day = days[dateArg.getDay()];

					return `${date} ${month} (${day}), ${year}`;
				}
			});
	}
});

var logout = document.getElementById("logout");

logout.addEventListener("click", (e) => {
	e.preventDefault();
	firebase
		.auth()
		.signOut()
		.then(() => {
			location.reload("index.html");
		});
});

firebase.auth().onAuthStateChanged((user) => {
	if (user) {
		console.log(user.email + " is logged in!");
	} else {
		window.location.href = "index.html";
	}
});

// Here The get full object value of database.
// ref
// 	.orderByChild('email')
// 	.equalTo(user.email)
// 	.once('value', function (snapshot) {
// 		console.log(snapshot.val());
// 	});



console.log("hello")
console.log("Con")
console.log("dmdjhdd")