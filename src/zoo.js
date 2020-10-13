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

function animalsByIds(...ids) {
  const { animals } = data;
  if (ids === []) return ids;
  return animals.filter(animal => ids.includes(animal.id));
}

function animalsOlderThan(animal, age) {
  const { animals } = data;
  return animals.find(({ name }) => name === animal)
  .residents.every(({ age: ageSpecie }) => ageSpecie > age);
}

function employeeByName(employeeName) {
  const { employees } = data;
  if (!employeeName) return {};
  return employees.find(pers => pers.firstName === employeeName || pers.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  return { id, firstName, lastName, managers, responsibleFor };
}

function isManager(id) {
  const { employees } = data;
  return employees.some(manager => manager.managers[0] === id || manager.managers[1] === id);
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const { employees } = data;
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor };
  return employees.push(newEmployee);
}

function animalCount(species) {
  // const { animals } = data;
}

function entryCalculator(entrants) {
  // const { prices } = data;
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  const hoursTable = { Tuesday: 'Open from 8am until 6pm', Wednesday: 'Open from 8am until 6pm', Thursday: 'Open from 10am until 8pm', Friday: 'Open from 10am until 8pm', Saturday: 'Open from 8am until 10pm', Sunday: 'Open from 8am until 8pm', Monday: 'CLOSED' };
  if (!dayName) return hoursTable;
  switch (dayName) {
    case 'Tuesday':
      return { Tuesday: 'Open from 8am until 6pm' };
    case 'Wednesday':
      return { Wednesday: 'Open from 8am until 6pm' };
    case 'Thursday':
      return { Thursday: 'Open from 8am until 6pm' };
    case 'Friday':
      return { Friday: 'Open from 8am until 6pm' };
    case 'Saturday':
      return { Saturday: 'Open from 8am until 6pm' };
    case 'Sunday':
      return { Sunday: 'Open from 8am until 6pm' };
    case 'Monday':
      return { Monday: 'CLOSED' };
    default :
      return hoursTable;
  }
}

function oldestFromFirstSpecies(id) {
  const { employees } = data;
  const { animals } = data;
  const { responsibleFor } = employees.find(employee => id === employee.id);
  const { residents } = animals.find(animal => responsibleFor[0] === animal.id);
  const oldestAnimal = residents.sort((firstOne, secondOne) => secondOne.age - firstOne.age)[0];
  return [oldestAnimal.name, oldestAnimal.sex, oldestAnimal.age];
}

function increasePrices(percentage) {
  const { prices } = data;
  let { Adult, Senior, Child } = prices;
  Adult = ((percentage / 100) * prices.Adult) + prices.Adult;
  Senior = ((percentage / 100) * prices.Senior) + prices.Senior;
  Child = ((percentage / 100) * prices.Child) + prices.Child;
  prices.Adult = Math.round(Adult * 100) / 100;
  prices.Senior = Math.round(Senior * 100) / 100;
  prices.Child = Math.round(Child * 100) / 100;
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
