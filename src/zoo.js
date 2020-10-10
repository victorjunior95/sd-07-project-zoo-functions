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
  return data.animals.filter(animal => ids.includes(animal.id));
}

function animalsOlderThan(animal, ageAnimal) {
  const { residents } = data.animals.find(({ name }) => name === animal);
  return residents.every(({ age }) => age >= ageAnimal);
}

function includesNames(name, { firstName, lastName }) {
  return name.includes(firstName) || name.includes(lastName);
}

function employeeByName(...employeeName) {
  const person = data.employees.filter(employee => includesNames(employeeName, employee));
  if (person.length > 0) return person[0];
  return {};
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
}

function isManager(id) {
  return data.employees.some(({ managers }) => managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  // seu código aqui
}

const searchNameEspecies = (species) => data.animals.find(({ name }) => name === species

const listOfAnimals = () => {
  const speciesZoo = {};
  data.animals.forEach(({ name, residents, }) => {
    speciesZoo[name] = residents.length;
  });
  return speciesZoo;
};

function animalCount(species) {
  if (species) {
    const { residents } = searchNameEspecies(species);
    return residents.length;
  }
  return listOfAnimals();
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
