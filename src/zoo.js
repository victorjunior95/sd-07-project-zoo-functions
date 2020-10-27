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
const { prices } = data;

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
  const newEmployeeObj = { id, firstName, lastName, managers, responsibleFor };
  employees.push(newEmployeeObj);
  return employees;
}

function animalCount(species) {
  if (species === undefined) {
    const callanimals = {};
    animals.forEach(property => (callanimals[property.name] = property.residents.length));
    return callanimals;
  }
  return animals.find(nameCheck => nameCheck.name === species).residents.length;
}

function entryCalculator(entrants) {
  let returnvalue = 0;
  if (entrants === undefined || entrants === {} || entrants.length === 0) {
    return 0;
  }
  const { Adult, Child, Senior } = prices;
  if (!entrants.Adult === false) {
    returnvalue += entrants.Adult * Adult;
  }
  if (!entrants.Child === false) {
    returnvalue += entrants.Child * Child;
  }
  if (!entrants.Senior === false) {
    returnvalue += entrants.Senior * Senior;
  }
  return returnvalue;
  // return (entrants.Adult * Adult) + (entrants.Child * Child) + (entrants.Senior * Senior);
}
console.log(entryCalculator({ Senior: 2 }));

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
