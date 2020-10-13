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

const animalsByIds = (...ids) => animals.filter(animal => ids.includes(animal.id));

function animalsOlderThan(animal, age) {
  const foundAnimals = animals.find(element => element.name === animal);
  const residentAnimals = foundAnimals.residents;
  return residentAnimals.every(element => element.age >= age);
}

function employeeByName(employeeName) {
  if (!employeeName) {
    return {};
  }
  return employees
    .find(employee =>
    employee.firstName.includes(employeeName) ||
    employee.lastName.includes(employeeName));
}

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  const newEmployee = ({ id, firstName, lastName, managers, responsibleFor });
  return newEmployee;
}

function isManager(id) {
  return employees.some(({ managers }) => managers.includes(id));
}

const addEmployee = (id, firstName, lastName, managers = [], responsibleFor = []) => {
  employees.push({ id, firstName, lastName, managers, responsibleFor });
};

function animalCount(species) {
  if (!species) {
    return animals.reduce((acc, item) => {
      acc[item.name] = item.residents.length
      return acc;
    }, {});
  }
  return animals.find((animal) => animal.name === species).residents.length;
}

function entryCalculator(entrants) {
  if (!entrants || Object.keys(entrants).length === 0) {
    return 0;
  }
  return Object.keys(entrants).reduce((acc, current) =>
    acc + (entrants[current] * data.prices[current]), 0);
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  // seu código aqui
}

function oldestFromFirstSpecies(id) {
  const findEmployee = employees.find((employee) => employee.id === id);
  const searchAnimal = findEmployee.responsibleFor[0];
  const findAnimal = animals.find((animal) => animal.id === searchAnimal);
  const oldestAnimal = findAnimal.residents.sort((a, b) => b.age - a.age)[0];
  return [oldestAnimal.name, oldestAnimal.sex, oldestAnimal.age];
}

console.log(oldestFromFirstSpecies('4b40a139-d4dc-4f09-822d-ec25e819a5ad'));

function increasePrices(percentage) {
  Object.keys(prices).forEach((key) => {
    prices[key] += (prices[key] * percentage) / 100.00;
    prices[key] = Math.round(prices[key] * 100) / 100;
  });
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
