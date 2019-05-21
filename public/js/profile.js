const database = firebase.database();

let USER_ID = sessionStorage['USER_ID'];
if (!USER_ID) window.location.href = 'login.html';

$(document).ready(async function() {

  getStateonApi();

  const db = new Repository(database);
  const user = await db.getUserById(USER_ID);

  $('#logout').on('click', logout);

  $('.picture').html(user.picture);
  $('.name').val(user.name);
  $('.bday').val(user.birthday);
  $('.gender').val(user.gender);
  $('.sign-up-state').val(user.state).change();
  setTimeout(() => {
    $('.sign-up-city').val(user.city).change();
  }, 500);
  $('.email').val(user.email);
  $('#range').val(user.range);
  $('.info-range').html((user.range / 10) + ' km de alcance');
  $('#about').val(user.about);


  $('#save').on('click', function() {
    const newUser = {
      name: $('.name').val(),
      birthday: $('.bday').val(),
      gender: $('.gender').val(),
      state: $('.sign-up-state').val(),
      city: $('.sign-up-city').val(),
      range: $('#range').val(),
      about: $('#about').val()
    }

    db.updateUser(USER_ID, newUser);
  });
});

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
