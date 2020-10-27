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
const { hours } = data;

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
}
function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  let returnvalue = {};
  const daylist = hours;
  if (dayName === undefined) {
    Object.keys(daylist).forEach(property => (
      returnvalue[property] = `Open from ${hours[property].open}am until ${hours[property].close - 12}pm`
    ));
    returnvalue.Monday = 'CLOSED';
    return returnvalue;
  }
  if (dayName === 'Monday') {
    returnvalue = {};
    returnvalue.Monday = 'CLOSED';
  }
  if (dayName !== 'Monday') {
    returnvalue = {};
    returnvalue[dayName] = `Open from ${hours[dayName].open}am until ${hours[dayName].close - 12}pm`;
  }
  return returnvalue;
}

function oldestFromFirstSpecies(id) {
  const employeeolder = employees.find(employeer => employeer.id === id).responsibleFor[0];
  const animalsort = animals.find(
    animalsorting => animalsorting.id === employeeolder).residents.sort((beastA, beastB) => beastB.age - beastA.age);
    return Object.values(animalsort[0]);

}

function increasePrices(percentage) {
  const taxes = Object.keys(prices);
  taxes.forEach(property =>
    (prices[property] = Math.ceil(prices[property] * (100 + percentage)) / 100));
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
