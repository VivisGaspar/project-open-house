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

function usersTemplate(name, ) {
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

	const deltaThreshold = 100;
	const deltaX = 0;

function swipeEnded(event, direction, $card) {
	let directionFactor, transform;
	if (event.type === 'click') {
		directionFactor = direction === 'right' ? -1 : 1;
	}
	else if (event.deltaX) {
		directionFactor = event.deltaX >= 0 ? -1 : 1;
	}

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
	
	$card.css({
		'transform': transform,
	});
}

function swipeRight(event, $card) {
	var transform;
	deltaX = event.deltaX;
	transform = 'translate(' + deltaX * 0.8 + 'px, 0) rotate(-5deg)';
	
	$card.css({
		'transform': transform,
	});
}

//Events
$('.js-swiping-card').each(function (index, element) {
	let card = element;

	hammertime = new Hammer(element);

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
