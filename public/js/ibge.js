function getStateonApi() {
  let estados = '';
  const url = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados'
  fetch(url)
    .then(resp => resp.json())
    .then(function(resp) {
      resp = resp.sort(sortRulesForEstado);
      resp.forEach(function(element) {
          estados += `<option data-state='${element.nome}' value='${element.id}'>
            ${element.nome}
          </option>`;
      })
      $('.sign-up-state').html(estados);

      getCityonApi(resp[0].id);

      $('.sign-up-state').change(function() {
        getCityonApi($('.sign-up-state').val());
      });
    });
}

function getCityonApi(valState) {
  let cidade = '';
  let urlCitys = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${valState}/municipios`

  fetch(urlCitys)
    .then(resp => resp.json())
    .then(resp => {
      resp.forEach(element => {
        cidade += `<option value='${element.nome}'>${element.nome}</option>`
        $('.sign-up-city').html(cidade);
      });
    });
};

const sortRulesForEstado = (a,b) => {
  if(a.nome < b.nome) return -1;
  if(a.nome > b.nome) return 1;
  return 0;
}