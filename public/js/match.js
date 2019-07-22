const database = firebase.database();

// let USER_ID = sessionStorage['USER_ID'];
// if (!USER_ID) window.location.href = 'login.html';

String.prototype.replaceAll = function(from, to){ 
  return this.split(from).join(to);
}

$(document).ready(async function() {
  $('#logout').on('click', logout);

  const cardAccepted = (cardUserId) => { 
  };
  const cardRejected = (cardUserId) => {
    //do something to the rejected if needed...
  };

  $('.cards').on('click','.match-icon-delete', function(event) {
    cardRejected($(this).data('card-id'));
    const parentLI = $(this).parents('li');
    $(parentLI).remove();
  });
  $('.cards').on('click','.match-icon-add', function(event) {
    cardAccepted($(this).data('card-id'));
    const parentLI = $(this).parents('li');
    $(parentLI).remove();
  });

  getUsersFromDB();
});

function usersTemplate(user) {
  let infoTemplate =
    ` <p class="name-age font-size-g">${user.name}, ${user.age}</p>
      <p class="about-title font-size-m orange">SOBRE ${user.name}</p>
      <p class="text-about font-size-m">${user.about}</p>`;
  
    const cardTemplate = $('template#cardTemplate').html();
    const card = cardTemplate
      .replaceAll('{{INFO}}', infoTemplate)
      .replaceAll('{{PIC}}', `<img class='card-pic' src='${user.picture}'/>`)
      .replaceAll('{{ID}}', user.id);

  $('.cards').prepend(card);
}

async function getUsersFromDB() {
  const db = new Repository(database);
  const users = await db.getUsers();

  Object.keys(users).forEach(key => {
    usersTemplate(users[key]);
  });
}

