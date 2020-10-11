const { animals, employees } = require('./data');
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
  return animals.filter((animal, index) => animal.id === ids[index]);
}

function animalsOlderThan(animal, age) {
  const animalSpeciesName = animal;
  const animalSpeciesAge = age;
  const findSpecies = animals.find(animalSpecies => animalSpecies.name === animalSpeciesName);
  const checkAge = findSpecies.residents.every(species => (
    species.age >= animalSpeciesAge));
  return checkAge;
}

function employeeByName(employeeName) {
  if (employeeName) {
    return employees.find(employee =>
      employee.firstName === employeeName || employee.lastName === employeeName);
  }
  return {};
}

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  return {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
}

function isManager(id) {
  return employees.some(employee => employee.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
}

function animalCount(species) {
  if (species) {
    return animals.find(animal =>
      animal.name === species).residents.length;
  }
  const allAnimalsName = animals.map(animal => animal.name);
  const allAnimalsNumber = animals.map(animal => animal.residents.length);
  const object = {};
  allAnimalsName.forEach((animal, index) => (
    object[animal] = allAnimalsNumber[index]));
  return object;
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
