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
  if (ids.length === 0) {
    return ids;
  }
  const filteredAnimals = [];
  ids.forEach((id) => {
    data.animals.forEach((animal) => {
      if (animal.id === id) {
        filteredAnimals.push(animal);
      }
    });
  });
  return filteredAnimals;
}

function animalsOlderThan(animal, age) {
  const specificAnimal = data.animals.find(element => element.name === animal);
  return specificAnimal.residents.every(element => element.age > age);
}

function employeeByName(employeeName) {
  if (!employeeName) return ({});
  return data.employees
  .find(employee => employee.firstName === employeeName || employee.lastName === employeeName);
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
  const managersReduce = (acc, element) => acc.concat(element.managers);
  const allManagers = data.employees.reduce(managersReduce, []);
  let managerStatus = false;
  allManagers.forEach((element) => {
    if (element === id) managerStatus = true;
  });
  return managerStatus;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newGuy = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  data.employees.push(newGuy);
}

function animalCount(species) {
  // seu código aqui
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
