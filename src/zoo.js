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

const { employees } = require('./data');
const data = require('./data');

function animalsByIds(...ids) {
  // seu código aqui
  return data.animals
  .filter(animal => animal.id === ids[0]) // retorno []
  .concat(data.animals.filter(animal => animal.id === ids[1]));
}

function animalsOlderThan(nameAnimal, ageAnimal) {
  return data.animals
  .find(animal => animal.name === nameAnimal).residents
  .every(animal => animal.age > ageAnimal);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  return data.employees.find(employee => employee.firstName === employeeName)
    || data.employees.find(employee => employee.lastName === employeeName);
}

function createEmployee(personalInfo, ...associatedWith) {
  const newEmployee = {};
  return Object.assign(newEmployee, personalInfo, ...associatedWith);
}

function isManager(id) {
  const managers = data.employees.map(manager => manager.managers).toString();
  return managers.includes(id);
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  let result = {};
  if (species === undefined) {
    data.animals.forEach((animal) => {
      const { name, residents } = animal;
      result[name] = residents.length;
    });
  } else {
    result = data.animals.find(animal => animal.name === species).residents.length;
  }
  return result;
}

function entryCalculator(entrants) {
  if (!entrants || Object.keys(entrants).length === 0) {
    return 0;
  }
  return Object.keys(entrants)
  .reduce((acc, element) => acc + (entrants[element] * data.prices[element]), 0);
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
