database = firebase.database();

$(document).ready(function() {
  getStateonApi();
  
  $('.sign-up-button').on('click', signUpClick);
  $('.sign-in-button').on('click', signInClick);
  $('.forgot-password').on('click', resetPassword);
  // $('.form-check-input').on('click', authPersistence);
  $('.sign-in-google').on('click', authGoogle);
  $('.sign-in-facebook').on('click', authFacebook);
  
  
  $('.sign-in').on('click', function() {
    $('.section-sign-up').css('display', 'none');
    $('.section-sign-in').css('display', 'flex');
    $(".sign-up").removeClass('active');
    $('.sign-in').addClass('active');
  });
  $('.sign-up').on('click', function() {
    $('.section-sign-up').css('display', 'flex');
    $('.section-sign-in').css('display', 'none');
    $(".sign-up").addClass('active');
    $(".sign-in").removeClass('active');
  });
});

function signUpClick(event) {
  event.preventDefault();
  
  let name = $('.sign-up-name').val().toUpperCase();
  let birthday = $('.sign-up-birthday').val();
  let gender = $('.sign-up-gender').val();
  let state = $('.sign-up-state').val();
  let city = $('.sign-up-city').val();
  let email = $('.sign-up-email').val();
  let password = $('.sign-up-password').val();
  
  createUser(name, birthday, gender, state, city, email, password);
}

function signInClick(event) {
  event.preventDefault();
  
  let email = $('.sign-in-email').val();
  let password = $('.sign-in-password').val();
  
  loginUserAuth(email, password);
}

function createUser(name, birthday, gender, state, city, email, password) {
  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then(function(response) {
    if (response.operationType === 'signIn') {
      var userId = response.user.uid;
      
      createUserInDB(userId, name, birthday, gender, state, city, email);
      signInRedirect(userId);
    }
  })
  .catch(function(error) { handleError(error); });
}

function loginUserAuth(email, password) {
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then(function(response) {
    if (response.operationType === 'signIn') {
      var userId = response.user.uid;
      sessionStorage['USER_ID'] = userId;
      signInRedirect(userId);
    }
  })
  .catch(function(error) { handleError(error); });
}

function createUserInDB(id, name, birthday, gender, state, city, email) {
  sessionStorage.setItem('USER_ID', id);
  database.ref('users/' + id).set({
    name: name,
    birthday: birthday,
    gender: gender,
    state: state,
    city: city,
    email: email,
    picture: 'images/avatar.png',
    range: '50',
    about: '',
    age: calculateAge(birthday)
  });
}

function signInRedirect(userId) {
  window.location = '../match.html';
}

function authFacebook(){
  let provider = new firebase.auth.FacebookAuthProvider();
  signIn(provider);
}

function authGoogle(){
  let provider = new firebase.auth.GoogleAuthProvider();
  signIn(provider);
}

function signIn(provider) {
  firebase.auth()
  .signInWithPopup(provider)
  .then(function (result) {
    let token = result.credential.accessToken;
    let user = result.user;
    let userId = result.user.uid;
    sessionStorage['USER_ID'] = userId;
    signInRedirect(userId);
  }).catch(function (error) {
    handleError(error);  
  });
}

// function authPersistence() {
//   firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
//   .then(function() {
//     console.log('persistence')
//     let email = $('.sign-in-email').val();
//     let password = $('.sign-in-password').val();
//     return firebase.auth().signInWithEmailAndPassword(email, password);
//   })
//   .catch(function(error){
//     handleError(error);
//   });
// }

function resetPassword() {
  let auth = firebase.auth();
  let emailAddress = $('.sign-in-email').val();
  
  auth.sendPasswordResetEmail(emailAddress).then(function() {
    alert('E-mail para redefinição de senha enviado com sucesso');
  }).catch(function(error) {
    handleError(error);
  });
}

function handleError(error) {
  alert(error.message);
  console.log(error.code, error.message);
}

function calculateAge(birthday){
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const birthYear = birthday.substr(0,4);
  
  return (currentYear - parseInt(birthYear));
}