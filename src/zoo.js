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
  // o includes buscar o objeto que eu estou indicando
  const filterAnimals = data.animals.filter(objAnimals => ids.includes(objAnimals.id));
  return filterAnimals;
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  const species = data.animals.find(specie => specie.name === animal);
  return species.residents.every(resid => resid.age >= age);
}

function employeeByName(employeeName) {
  // seu código aqui
  if (employeeName === undefined) return {};
  return employees.find(employee =>
    employee.firstName === employeeName ||
    employee.lastName === employeeName,
  );
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  return {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
}

function isManager(id) {
  // o find ele acha o primeiro elemento  e o includes acha o elemente que você deseja.
  const employee = data.employees.find(element => element.managers.includes(id));
  return employee !== undefined;
}

function addEmployee() {
}

function animalCount(species) {
  // seu código aqui
  if (species === undefined) {
    return animals.reduce((animalObj, animal) => {
      animalObj[animal.name] = animal.residents.length;
      return animalObj;
    }, {});
  }

  return animals.find(animal => animal.name === species).residents.length;
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
