
/*
eslint no-unused-vars: [
  "error",
  {
    "args": "none",
    "vars": "local",
    "varsIgnorePattern": "data"
  }
]
*/

const { animals, hours } = require('./data');
const { employees } = require('./data');
const { prices } = require('./data');
const { data } = require('./data');


function animalsByIds(...ids) {
  if (ids.length === 0) return [];
  return animals.filter((busca, index) => busca.id === ids[index]);
}

function animalsOlderThan(animal, age) {
  const nomes = animals.find(busca => busca.name === animal);
  // o metodo find vai me retornar o objeto correspondente a condição
  return nomes.residents.every(idade => idade.age >= age);
  // every vai aplicar para todos os elementos dentro daquele objeto a seguinte condição
  // e se todos os elementos cumprirem aquela condiçao me retorna true se nao false
  /*
   OUTRA FORMA
   let v = true DEVE SE ATRIBUIR PARA INCREMNTAR NO FOR EACH
   nomes.residents.forEach((element) => {
    if (element.age < age) {
      v = false;
    }
  });
  return v
  */
}

function employeeByName(employeeName) {
  if (typeof employeeName === 'undefined') return {};
  return employees.find(nome =>
    (nome.firstName === employeeName) || (nome.lastName === employeeName));
  // find encontra os elementos que atendem à expressão solicitada que
  // sejam descendentes do seletor.
  // filter, por outro lado, filtra e devolve todos
  // os elementos que coincidam com o seletor e também a expressão filtrada.
  // outra diferençaa é que o filter me retorna um  objeto dentro de um array
  // e o find me devolve uma copia identica do objeto selecionado
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
  // vai criar um objeto,  contendo as informaçoes passadas
  // para cada duas informaços forma um objeto,
  // essas duas informaços nao precisao ter um tamanho especificado e irao formar
  // um unico objeto contendo as duas informaçoes juntas
}

function isManager(id) {
  // find me retorna o objeto todo
  // com o map eu consigo buscar todos os arrays managers
  const funcionario = employees.find(busca => busca.id === id);
  if (funcionario.managers.length > 0) return true;
  return false;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
/*
const vazio = {}
animals.forEach(elemento => {
  vazio[elemento.name] = elemento.residents.length
})
*/
  if (typeof species === 'undefined') {
    return animals.reduce((acumulador, item) => {
      acumulador[item.name] = item.residents.length;
    // desta forma o acumulador recebe os nomes dos animais
    // desta forma acumulador.item.name ele tenta buscar os nomes mais ainda
    // nao tem nada no acumulador para ser buscado
    // o acumulador sempre recebe ele mesmo e o proximo item
      return acumulador;
    }, {});
  }
  const umaEspecie = animals.find(busca => busca.name === species);
  return umaEspecie.residents.length;
}

function entryCalculator(entrants) {
  if (typeof entrants === 'undefined') return 0;
  const { Adult = 0, Child = 0, Senior = 0 } = entrants;
  // desse modo eu preciso passar os mesmos nomes das variaveis internas
  const precoAdulto = prices.Adult * Adult;
  const precoIdoso = prices.Senior * Senior;
  const precoCrianca = prices.Child * Child;
  const total = precoAdulto + precoIdoso + precoCrianca;
  return total;
}

function animalMap(options) {
  // seu código aqui
}

function schedule(...dayName) {
  // map reduce e filter so funcionam com arrays e não objetos
  const objeto = {};
  if (dayName.length === 0) {
    dayName = Object.keys(hours);
  }
  dayName.forEach((elemento) => {
    objeto[elemento] = `Open from ${hours[elemento].open}am until ${hours[elemento].close - 12}pm`;
    if (elemento === 'Monday') {
      objeto[elemento] = 'CLOSED';
    }
  });
  return objeto;
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
}

function increasePrices(percentage) {
  // seu código aqui
}

function employeeCoverage(idOrName) {
  // seu código aqui
}

module.exports = {
  entryCalculator,
  schedule,
  animalCount,
  animalMap,
  animalsByIds,
  employeeByName,
  employeeCoverage,
  addEmployee,
  isManager,
  animalsOlderThan,
  oldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
console.log(schedule('Tuesday'));
