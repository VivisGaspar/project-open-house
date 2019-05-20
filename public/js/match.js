const element = document.getElementById("photo")

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
