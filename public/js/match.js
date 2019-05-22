const database = firebase.database();
let USER_ID = sessionStorage["USER_ID"];
const collectionUsers = database.ref('users/');
const collectionUser = database.ref('users/' + USER_ID);
console.log(USER_ID)
//Btn controls
$('.match-icon-delete').on('click', function (event) {
	let topCard = $('.js-swiping-card').last();
	swipeEnded(event, 'left', topCard);
});
$('.match-icon-add').on('click', function (event) {
	let topCard = $('.js-swiping-card').last();
	swipeEnded(event, 'right', topCard);
});
if (!USER_ID) window.location.href = "login.html";

getUsersFromDB();

function usersTemplate(name) {
	let template =
		`
		<li>
			<div class="card js-swiping-card">   
				<h1>${name}</h1>
			</div>
		</li> `

	$(".tinder--cards").prepend(template)
}

function getUsersFromDB() {
	collectionUsers.on('value', function (snapshot) {
		const users = snapshot.val();
		Object.keys(users).forEach(key => {
			usersTemplate(users[key].name)
		})
	});
}

//swipe

//Globals

	//deltaThreshold is the swipe distance from the initial place of the card
	const deltaThreshold = 100;
	const deltaX = 0;

function swipeEnded(event, direction, $card) {
	let directionFactor, transform;
	//If the event has a type, then it is triggered from a button and has a given direction
	if (event.type === 'click') {
		directionFactor = direction === 'right' ? -1 : 1;
	}
	//If the event has a deltaX, then it is triggered from a gesture and has a calculated direction
	else if (event.deltaX) {
		directionFactor = event.deltaX >= 0 ? -1 : 1;
	}

	//If the threshold is reached or a trigger clicked, the card is thrown on a side and then disappear
	if (event.deltaX && deltaX > deltaThreshold || event.deltaX && deltaX < -1 * deltaThreshold || direction) {
		transform = 'translate(' + directionFactor * -100 + 'vw, 0) rotate(' + directionFactor * -5 + 'deg)';
		$card
			.delay(100)
			.queue(function () {
				$(this).css('transform', transform).dequeue();
			})
			.delay(300)
			.queue(function () {
				$(this).addClass('done').remove();
			});
	}
	//If the threshold isn't reached, the card goes back to its initial place
	else {
		transform = 'translate(0, 0) rotate(0)';
		$card.css({
			'transform': transform,
		});
	}
}

function swipeLeft(event, $card) {
	var transform;
	deltaX = event.deltaX;
	transform = 'translate(' + deltaX * 0.8 + 'px, 0) rotate(5deg)';
	//translate the card on swipe
	$card.css({
		'transform': transform,
	});
}

function swipeRight(event, $card) {
	var transform;
	deltaX = event.deltaX;
	transform = 'translate(' + deltaX * 0.8 + 'px, 0) rotate(-5deg)';
	//translate the card on swipe
	$card.css({
		'transform': transform,
	});
}

//Events
$('.js-swiping-card').each(function (index, element) {
	var card = element;
	console.log(card)
	//Add hammer events on element
	hammertime = new Hammer(element);

	//Mobile gesture
	hammertime.on('panleft swipeleft', function (event) {
		swipeLeft(event, card);
	});
	hammertime.on('panright swiperight', function (event) {
		swipeRight(event, card);
	});
	hammertime.on('panend', function (event) {
		swipeEnded(event, false, card);
	});
});



// const element = document.querySelector(".match-image")

// let index = 0;

// function getPhotoFromDB(){
// 	const url = "https://api.giphy.com/v1/gifs/trending?&api_key=7Mc3xZd6KslRRtCtWe72NCyO1HeKYRks" 
// 	fetch(url)
// 	.then(resp => resp.json())
// 	.then(resp => getDataFromBD(resp.data))
// }

// function getDataFromBD(data){
// 	const imgUrl = data[index].images.fixed_height.url;
// 	element.innerHTML = `<img src="${imgUrl}">`
// 	index++;
// 	console.log(imgUrl);     
// }

// const hammertime = new Hammer(element);
// hammertime.on('swipe', function(ev) {
// 	console.log(ev);
// 	getPhotoFromDB();
// });


// getPhotoFromDB()


// const database = firebase.database();

// let USER_ID = sessionStorage["USER_ID"];
// if (!USER_ID) window.location.href = "login.html";

// const image = document.getElementById("match-image")
// const about = document.getElementById("match-about")

// let index = 0;

// function getPhotoFromDB(){
// 	const url = "https://api.giphy.com/v1/gifs/trending?&api_key=7Mc3xZd6KslRRtCtWe72NCyO1HeKYRks" 
// 	fetch(url)
// 	.then(resp => resp.json())
// 	.then(resp => getDataFromBD(resp.data))
// }

// function getDataFromBD(data){
// 	const image = data[index].picture;
// 	image.innerHTML = `<img src="${image}">`

// 	const name = data[index].name;
// 	const age = data[index].age;
// 	const about = data[index].about;
// 	const activities = data[index].activities;

// 	about.innerHTML = `
// 	<p class="name-age font-size-g">${name}, ${age}</p>
// 	<p class="about-title font-size-p">SOBRE${name}</p>
// 	<p class="text-about font-size-p">${about}</p>
// 	<section class="activities">
// 		<p class="about-title font-size-p">ATIVIDADES</p>
// 		<div>${activities}</div>
// 	</section>
// 	`
// 	index++;
// 	console.log(imgUrl);
// 	// preciso pegar a foto, distância, nome, idade, resumo e atividades   
// }

// const hammertime = new Hammer(element);
// hammertime.on('swipe', function(ev) {
// 	console.log(ev);
// 	getPhotoFromDB();
// });


// getPhotoFromDB()
