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

  return ids.map(id => animals.find(animal => animal.id === id));
}


function animalsOlderThan(animal, age) {
  const { animals } = data;

  const animalSpecie = animals.find(species => species.name === animal);

  return animalSpecie.residents.every(resident => resident.age >= age);
}

function employeeByName(employeeName) {
  const { employees } = data;
  if (!employeeName) return {};

  return employees.find(emp => emp.firstName === employeeName || emp.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return Object.assign({}, personalInfo, associatedWith);
}

function isManager(id) {
  const { employees } = data;
  return employees.some(manager => manager.managers.some(mana => mana === id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const { employees } = data;
  const newEmployer = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  employees.push(newEmployer);

  return employees;
}

function animalCount(species) {
  if (species) return (data.animals.find(item => item.name === species)).residents.length;

  let exitObj = { };
  data.animals.forEach((animal) => {
    const obj = { };
    obj[`${animal.name}`] = animal.residents.length;
    exitObj = Object.assign(exitObj, obj);
  });

  return exitObj;
}

function entryCalculator(entrants) {
  const { prices } = data;

  if (!entrants || Object.keys(entrants).length === 0) return 0;

  let exit = 0;
  const keys = Object.keys(entrants);

  for (let i = 0; i < keys.length; i += 1) {
    exit += entrants[`${keys[i]}`] * prices[`${keys[i]}`];
  }

  return exit;
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
