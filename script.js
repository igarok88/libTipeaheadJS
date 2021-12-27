window.addEventListener("DOMContentLoaded", () => {
	var substringMatcher = function (strs) {
		return function findMatches(q, cb) {
			var matches, substringRegex;

			// an array that will be populated with substring matches
			matches = [];

			// regex used to determine if a string contains the substring `q`
			substrRegex = new RegExp(q, "i");

			// iterate through the pool of strings and for any string that
			// contains the substring `q`, add it to the `matches` array
			$.each(strs, function (i, str) {
				if (substrRegex.test(str)) {
					matches.push(str);
				}
			});

			cb(matches);
		};
	};

	var heroes = [];

	var jsonTarget = [];
	//получаем json и обрабатываем его с помощью JS
	let getData = async () => {
		let response = await fetch("https://jsonplaceholder.typicode.com/users");
		let data = await response.json();
		data = data.splice(0, 10);
		getIdAndNameFromJsonArray(data);
	};
	getData();

	//получаем json и обрабатываем его с помощью JQ
	$.ajax({
		url: "https://jsonplaceholder.typicode.com/users",
		type: "GET",
		success: function (jsonArr) {
			$.each(jsonArr, function (i, item) {
				jsonTarget.push(item.name);
			});
		},
	});
	heroes = jsonTarget;
	$("#the-basics .typeahead").typeahead(
		{
			hint: true,
			highlight: true,
			minLength: 1,
		},
		{
			name: "heroes",
			source: substringMatcher(heroes),
		}
	);
});
