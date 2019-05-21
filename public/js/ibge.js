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