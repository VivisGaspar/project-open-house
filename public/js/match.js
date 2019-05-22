$('#logout').on('click', logout);
const element = document.getElementById("match-image")
let index = 0;

function getPhotoFromDB(){
	const url = "https://api.giphy.com/v1/gifs/trending?&api_key=7Mc3xZd6KslRRtCtWe72NCyO1HeKYRks" 
	fetch(url)
	.then(resp => resp.json())
	.then(resp => getDataFromBD(resp.data))
}

function getDataFromBD(data){
	const imgUrl = data[index].images.fixed_height.url;
	element.innerHTML = `<img src="${imgUrl}">`
	index++;
	console.log(imgUrl);     
}

const hammertime = new Hammer(element);
hammertime.on('swipe', function(ev) {
	console.log(ev);
	getPhotoFromDB();
});


getPhotoFromDB()


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
