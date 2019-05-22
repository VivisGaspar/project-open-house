var database = firebase.database();

$(document).ready(function() {
  getStateonApi();

  $('.sign-up').on('click', signUpClick);
  $('.sign-in').on('click', signInClick);

  $('.sign-in').on('click', function() {
    $('.section-sign-up').css('display', 'none');
    $('.section-sign-in').show();
  });
  $('.sign-up').on('click', function() {
    $('.section-sign-up').show();
    $('.section-sign-in').css('display', 'none');
  });

  // $('.sign-up-button').on('click', signUpClick);
  // $('.sign-in-button').on('click', signInClick);

  // $('.sign-in').on('click', function() {
  //   $('.section-sign-up').css('display', 'none');
  //   $('.section-sign-in').show();
  // });
  // $('.sign-up').on('click', function() {
  //   $('.section-sign-up').show();
  //   $('.section-sign-in').css('display', 'none');
  // });
  // $(".sign-in").click(function(){
  //   $(".section-sign-up").addClass('hidden');
  //   $('.section-sign-in').removeClass('hidden');
  //   $(".sign-up").removeClass('active');
  //   $('.sign-in').addClass('active');
  // });
  // $(".sign-up").click(function(){
  //   $(".section-sign-up").removeClass('hidden');
  //   $(".section-sign-in").addClass('hidden');
  //   $(".sign-up").addClass('active');
  //   $(".sign-in").removeClass('active');
  // }); 
 
});

function signUpClick(event) {
  event.preventDefault();

  let name = $('.sign-up-name').val();
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

  var email = $('.sign-in-email').val();
  var password = $('.sign-in-password').val();

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
  database.ref('users/' + id).set({
    name: name,
    birthday: birthday,
    gender: gender,
    state: state,
    city: city,
    email: email,
    picture: '../images/avatar.png',
    range: '50',
    about: ''
  });
}

function signInRedirect(userId) {
  window.location = '../profile.html';
}

function handleError(error) {
  alert(error.message);
  console.log(error.code, error.message);
}

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

function getStateonApi() {
  let estado = '';
  const url = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados'
  fetch(url)
    .then(resp => resp.json())
    .then(function(resp) {
      resp.forEach(function(element) {
        estado += `<option value='${element.id}' data-state='${element.nome}']'>${element.nome}</option>`
      })
      $('.sign-up-state').html(estado);

      getCityonApi(resp[0].id);

      $('.sign-up-state').change(function() {
        getCityonApi($('.sign-up-state').val());
      });
    }
    )
}

function getCityonApi(valState) {
  let cidade = '';
  let urlCitys = `http://servicodados.ibge.gov.br/api/v1/localidades/estados/${valState}/municipios`

  fetch(urlCitys)
    .then(resp => resp.json())
    .then(resp => resp.forEach(element => {
      cidade += `<option value='${element.nome}'>${element.nome}</option>`
      $('.sign-up-city').html(cidade);
    }
    )
    );
}

