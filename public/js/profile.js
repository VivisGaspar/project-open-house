database = firebase.database();

let USER_ID = sessionStorage['USER_ID'];
if (!USER_ID) window.location.href = 'login.html';

$(document).ready(async function() {

  getStateonApi();

  const db = new Repository(database);
  const user = await db.getUserById(USER_ID);
  $('#activities').on('click', function() {
    window.location = 'activities.html';
  });

  $('#slider-value').html($('#range').val());

  $('#range').on('input', function() {
    const value = $(this).val();
    $('#slider-value').text(value);
  });

  $('.picture').attr('src', user.picture);
  $('.name').val(user.name);
  $('.bday').val(user.birthday);
  $('.gender').val(user.gender);
  $('.sign-up-state').val(user.state).change();
  setTimeout(() => {
    $('.sign-up-city').val(user.city).change();
  }, 500);
  $('.email').val(user.email);
  $('#range').val(user.range);
  $('.info-range #slider-value').text(user.range);
  $('#about').val(user.about);
  $('#logout').on('click', logout);

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
    window.location.reload();
  });

  $('#cancel').on('click', function() {
    window.location.reload();
  })
});