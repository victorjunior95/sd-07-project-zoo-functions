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

const { animals, employees, prices } = require('./data');
const data = require('./data');

function animalsByIds(...ids) {
  const speciesById = animals.filter(animal => ids.includes(animal.id));
  return speciesById;
}

function animalsOlderThan(animal, age) {
  const choosenSpecies = animals.find(species => species.name === animal);
  const testsAge = choosenSpecies.residents.every(testAge => testAge.age >= age);
  return testsAge;
}

function employeeByName(employeeName) {
  if (employeeName === undefined) return {};
  const EmployeeObject = data.employees.find(
    name => name.firstName === employeeName ||
    name.lastName === employeeName);
  return EmployeeObject;
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  const testsManager = data.employees.some(test => test.managers.includes(id));
  return testsManager;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = { id, firstName, lastName, managers, responsibleFor };
  return employees.push(newEmployee);
}
// console.log(addEmployee('39800c14-4b76-454a-858d-2f8d168146a7', 'John', 'Doe'));
// console.log(employees);

const nameNQntts = {};
function createObject(item) {
  nameNQntts[item.name] = item.residents.length;
}
function animalCount(species) {
  if (species === undefined) {
    animals.forEach(createObject);
    return nameNQntts;
  }
  const specie = animals.find(specieName => specieName.name === species).residents.length;
  return specie;
}
// console.log(animalCount('snakes'))


function entryCalculator(entrants) {
  //  Verify if object is empty - https:// bityli.com/ycBY1

  if (entrants === undefined || Object.keys(entrants).length === 0) return 0;
  const { Adult = 0, Senior = 0, Child = 0 } = entrants;
  const ticketsBill = (prices.Adult * Adult) + (prices.Senior * Senior) + (prices.Child * Child);
  return ticketsBill;
}
// const entrants = { 'Adult': 2, 'Child': 3, 'Senior': 1 };
//     console.log(entryCalculator(entrants));

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
