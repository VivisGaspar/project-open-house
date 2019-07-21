database = firebase.database();

$('#logout').on('click', logout);

function logout(event) {
    event.preventDefault();
    firebase
    .auth()
    .signOut()
    .then(function() {
        sessionStorage.clear();
        window.location = '../login.html';
    }, function(error) {
        console.error(error);
    });
}

function handleError(error) {
    alert(error.message);
    console.log(error.code, error.message);
}
