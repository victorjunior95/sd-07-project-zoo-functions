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

const { animals, employees, prices, hours } = require('./data'); // incluído todos os arrays dentro de data
const data = require('./data');

function animalsByIds(...ids) { // ... para que considere todos os elementos (IDs) do array animals
  if (ids.length === undefined) return []; // retornando vazio caso não receba nenhum parametro
  return animals.filter((search, index) => search.id === ids[index]);
  // utilizado filter para que retorne um array com objetos.
}

function animalsOlderThan(animal, age) {
  const nomeAnimal = animals.find(search => search.name === animal);
  return nomeAnimal.residents.every(search => search.age >= age);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) return {};
  // como nao foi usado o spread (...), nao foi necessario percorrer o tamanho com o .length
  return employees.find(search => search.firstName === employeeName
  || search.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  let gerente = employees.map(search => search.managers);
  gerente = gerente.reduce((acumulador, item) => {
    item.forEach(elemento => acumulador.push(elemento));
    return acumulador;
  }, []).includes(id);
  return gerente;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  if (species === undefined) {
    const allAnimals = animals.map(search => search.name);
    return allAnimals.reduce((acumulador, item, index) => {
      acumulador[item] = animals[index].residents.length;
      return acumulador;
    }, {});
  }
  const oneAnimal = animals.find(search => search.name === species);
  return oneAnimal.residents.length;
}

function entryCalculator(entrants) {
  if (entrants === undefined || entrants === {}) return 0;
  const calcPrice = Object.keys(entrants);
  return calcPrice.reduce((acumulador, item) => {
    acumulador += entrants[item] * prices[item];
    return acumulador;
  }, 0);
}

function animalMap(options) {
  // seu código aqui
}

function schedule(...dayName) {
  if (dayName.length === 0) {
    dayName = Object.keys(hours);
  }
  return dayName.reduce((acumulador, item) => {
    acumulador[item] = `Open from ${hours[item].open}am until ${hours[item].close - 12}pm`;
    if (item === 'Monday') {
      acumulador[item] = 'CLOSED';
    }
    return acumulador;
  }, {});
}

function oldestFromFirstSpecies(id) {
  const funcionario = employees.find(search => search.id === id);
  const idAnimal = funcionario.responsibleFor[0];
  const animalVelho = animals.find(search => search.id === idAnimal);
  const retorno = animalVelho.residents.reduce((acumulador, item) => {
    if (acumulador.age < item.age) return item;
    return acumulador;
  });
  return Object.values(retorno);
}

function increasePrices(percentage) {
  const pessoa = Object.keys(prices);
  pessoa.forEach((item) => {
    prices[item] += (prices[item] * percentage) / 100;
    prices[item] = Math.round(prices[item] * 100) / 100;
  });
  return prices;
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
