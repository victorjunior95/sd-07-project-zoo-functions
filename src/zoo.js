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

const { animals, employees, prices, hours } = require('./data');
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
// console.log(createEmployee);

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

function speciesNQuantities() {
  const nameNQntts = {};
  animals.forEach(animal => (nameNQntts[animal.name] = animal.residents.length));
  return nameNQntts;
}
function animalCount(species) {
  if (!species) {
    return speciesNQuantities();
  }
  const specie = animals.find(specieName => specieName.name === species).residents.length;
  return specie;
}
// console.log(animalCount('snakes'))


function entryCalculator(entrants) {
  if (!entrants || Object.keys(entrants).length === 0) return 0;

  const { Adult = 0, Senior = 0, Child = 0 } = entrants;
  const ticketsBill = (prices.Adult * Adult) + (prices.Senior * Senior) + (prices.Child * Child);

  return ticketsBill;
}

function animalMap(options) {
  // seu código aqui
}
function legibleSchedule() {
  const objectReturned = {};
  const dias = Object.keys(hours);
  dias.forEach((msg) => {
    if (msg !== 'Monday') {
      objectReturned[msg] = `Open from ${hours[msg].open}am until ${hours[msg].close - 12}pm`;
    } else {
      objectReturned[msg] = 'CLOSED';
    }
  });
  return objectReturned;
}
function schedule(dayName) {
  if (!dayName) return legibleSchedule();

  return { [dayName]: legibleSchedule()[dayName] };
}

function oldestFromFirstSpecies(id) {
  // Extract value of a property as array - Ref: https://bityli.com/ZuNyD
  const employeeById = employees.filter(employee => employee.id === id);
  const animalsUnderGuard = employeeById.map((speciesId, index) => speciesId.responsibleFor[index]);
  const findSpecie = animals.filter(animal => animal.id.includes(animalsUnderGuard));
  const animalsBySpecie = findSpecie.map(element => element.residents);
  const oldest = animalsBySpecie.map(animal => animal.sort((a, b) => b.age - a.age)[0]);
  const extracting = oldest.reduce((acc, obj) => [...acc, Object.values(obj)]);
  return [extracting.name, extracting.sex, extracting.age];
}

function increasePrices(percentage) {
  const increase = 1 + (percentage / 100);
  prices.Adult = Math.round(prices.Adult * increase * 100) / 100;
  prices.Senior = Math.round(prices.Senior * increase * 100) / 100;
  prices.Child = Math.round(prices.Child * increase * 100) / 100;
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
