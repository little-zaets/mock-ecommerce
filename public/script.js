//retrieve DOM elements
let menu = document.querySelector("#nav-menu");
let toggle = document.querySelector("#menu-toggle");
let submit = document.querySelector("#submit-button");
let fullName = document.querySelector("#name");
let phone = document.querySelector("#phone");
let email = document.querySelector("#email");

//responsive menu toggle
toggle.addEventListener("click", toggle = () => {
	if (menu.hasAttribute("class", "show")) {
		menu.removeAttribute("class", "show");
	}
	else {
		menu.setAttribute("class", "show");
	}
})

//retrieve api info
const retrieve = async (url) => {
	try {
		const fetched = await fetch(url, {
			headers: {
				"Content-Type": "application/json",
			},
			method: "POST",
			body: JSON.stringify({
				name: fullName.value,
				phone: phone.value,
				email: email.value,
			}),
		});
		console.log(fetched);
		const data = await fetched.json();
		if (!data) {
			throw new Error("Something went wrong: ");
		} else {
			return data;
		}
	} catch (error) {
		console.log("Something went wrong...");
		console.log(error);
	}
};

//form 
const submitForm = async () => {
	const url = "https://jsonplaceholder.typicode.com/users";
	try {
		const submission = await retrieve(url);
		if (submission) {
			console.log(submission);
			fullName.value = "";
			phone.value = "";
			email.value = "";
			submit.value = "Sent!";
		}
	} catch (error) {
		console.log("Something went wrong...");
		console.log(error);
	}
};

submit.addEventListener("click", async (e) => {
	e.preventDefault();
	await submitForm();
});
