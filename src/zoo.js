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
const { prices } = require('./data');

function animalsByIds(...ids) {
  if (typeof ids === 'undefined') {
    return [];
  }
  return data.animals.filter(animal => ids.includes(animal.id));
}

function animalsOlderThan(name, age) {
  const nameOfAnimal = data.animals.filter(animalName => animalName.name === name);
  const ageOfAnimals = nameOfAnimal[0].residents.every(animalAge => animalAge.age >= age);
  return ageOfAnimals;
}

function employeeByName(employeeName) {
  const nameOfEmployee = (employeeByName === 'undefined') ? {} :
  data.employees.find(empName => (empName.firstName || empName.lastName));
  return nameOfEmployee;
}

function createEmployee(personalInfo, associatedWith) {
  const { id, lastName, firstName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  const newEmployee = { id, lastName, firstName, managers, responsibleFor };
  return newEmployee;
}

function isManager(id) {
  return data.employees.some(isHimOrHerManager => isHimOrHerManager
    .managers.includes(id)); // usamos o include para checar se há o item ID dentro de managers
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  if (species === undefined) {
    return data.animals.reduce((acc, curr) => {
      acc[curr.name] = curr.residents.length;
      return acc;
    }, {});
  }
  const specificAnimal = data.animals
  .find(specieOfAnimal => specieOfAnimal
    .name.includes(species));
  return specificAnimal.residents.length;
}

function entryCalculator(entrants = 0) {
  if (entrants === undefined) {
    return (entrants === 0);
  } else if (entrants === {}) {
    return (entrants === 0);
  }
  const { Adult = 0, Child = 0, Senior = 0 } = entrants;
  const value = (prices.Adult * Adult) + (prices.Child * Child) + (prices.Senior * Senior);
  return value;
}

function animalMap(options) {
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
