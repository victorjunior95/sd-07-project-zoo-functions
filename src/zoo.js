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

const { animals, employees } = require('./data');
const data = require('./data');

function animalsByIds(...ids) {
  const retorno = [];
  if (ids === undefined) {
    return [];
  }
  ids.forEach(numRef =>
    retorno.push(animals.find(animal => animal.id === numRef)),
  );
  return retorno;
}

// console.log(animals.find((nome)=>nome.name==='lions').residents.every(idade=>idade.age>=7));
function animalsOlderThan(animal, age) {
  return animals
    .find(nome => nome.name === animal)
    .residents.every(idade => idade.age >= age);
}

function employeeByName(employeeName) {
  // seu código aqui
  if (employeeName === undefined) {
    return {};
  }
  return Object.assign(
    ...employees.filter(
      nome =>
        nome.firstName === employeeName || nome.lastName === employeeName,
    ),
  );
}

function createEmployee(personalInfo, associatedWith) {
  const newObjectProprieties = Object.assign({}, personalInfo, associatedWith);
  return newObjectProprieties;
}

function isManager(id) {
  const retorno;
  retorno = employees.some(employee=>employee.managers.includes(id));
  return retorno;
}
function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  // seu código aqui
}

function animalCount(species) {
  // seu código aqui
}

function entryCalculator(entrants) {
  // seu código aqui
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  // seu código aqui
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
