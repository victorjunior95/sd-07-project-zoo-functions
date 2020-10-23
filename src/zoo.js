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
// comit inicial


const data = require('./data');

const { employees } = data;
const { animals } = data;

function animalsByIds(...ids) {
  // seu código aqui
  const animalids = animals.filter((animal, index) => animal.id === ids[index]);
  return animalids;
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  const animalNameRef = animals.find(animalNameCheck => (animalNameCheck.name === animal));
  const animalAgecheck = animalNameRef.residents.every(ageRef => (ageRef.age > age));
  return animalAgecheck;
}

function employeeByName(employeeName) {
  if (employeeName === undefined) return {};
  const nameCheck = employees.find(
    employeer => (employeer.firstName === employeeName || employeer.lastName === employeeName));
  return nameCheck;
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return employees.some((manager, index) => (manager.managers[index] === id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  let newEmployeeObj = { id, firstName, lastName, managers, responsibleFor };
  employees.push(newEmployeeObj);
  return employees;
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
