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

const { animals } = require('./data');
const { employees } = require('./data');
const data = require('./data');


function animalsByIds(...ids) {
  const animalsIds = [...ids];
  const animalArray = [];
  animalsIds.forEach((element) => {
    animals.forEach((animalList) => {
      if (element === animalList.id) {
        animalArray.push(animalList);
      }
    });
  });
  return animalArray;
}

function animalsOlderThan(animal, age) {
  const animalName = animals.filter(element => element.name === animal);
  const validate = animalName[0].residents.every(animalAge => animalAge.age >= age);
  return validate;
}

function employeeByName(empName = {}) {
  const empSearch = employees.filter(emp => empName === emp.firstName || empName === emp.lastName);
  return empSearch.length === 0 ? {} : empSearch[0];
}

function createEmployee(personalInfo, associatedWith) {
}

function isManager(id) {
  const isManageer = employees.some((element) => {
    const objects = Object.values(element.managers);
    return objects.some(elementMan => elementMan === id);
  });
  return isManageer;
}
function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
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
