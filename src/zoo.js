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

const data = require('./data');
const { animals } = require('./data');
const { employees } = require('./data');

function animalsByIds(...ids) {
  const idAnimal = animals.filter(justId => ids.includes(justId.id));
  return idAnimal;
} // feito com a ajuda do Murilo Wolf no plantão
// https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/contains

function animalsOlderThan(animal, age) {
  const theAnimal = animals.find(element => element.name === animal);
  const aboutAge = theAnimal.residents.every(older => older.age >= age);
  return aboutAge;
}

function employeeByName(employeeName) {
  if (employeeName === undefined) return {};
  const employee = employees.find(justName =>
    justName.firstName === employeeName || justName.lastName === employeeName);
  return employee;
}

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  // cria as propriedades e acrescenta os valores associados a elas;
  const { managers, responsibleFor } = associatedWith;
  return { id, firstName, lastName, managers, responsibleFor }; // une todas as informações;
}

function isManager(id) {
  const manager = employees.some((justManager, index) => justManager.managers[index] === id);
  return manager;
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  let addManagers = managers;
  let addResponsible = responsibleFor;
  if(managers === undefined || responsibleFor === undefined) {
    addManagers = [];
    addResponsible = [];
  };
  const newEmployee = { 
    id, 
    firstName, 
    lastName, 
    managers: addManagers, 
    responsibleFor: addResponsible
  };
  
  return employees.push(newEmployee);
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
