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

function animalsByIds(ids) {
  // seu código aqui

}

// support animalsOlderThan
const countAnimals = (allResidents, idade) => {
  const final = allResidents.reduce((count, { age }) => {
    if (age >= idade) {
      count += 1;
    }
    return count;
  }, 0);
  return final;
};

function animalsOlderThan(animal, age) {
  // seu código aqui
  const chosenAnimal = data.animals.filter(({ name }) => name === animal);
  const allResidents = chosenAnimal[0].residents;

  if (countAnimals(allResidents, age) === allResidents.length) {
    return true;
  }
  return false;
}

// support employee
const checkNames = (employeeName) => {
  const message = data.employees.filter(({ firstName, lastName }) => {
    if (firstName === employeeName || lastName === employeeName) {
      return true;
    }
    return false;
  });
  return message;
};
function employeeByName(employeeName) {
  // seu código aqui
  let message = [{}];
  if (employeeName) {
    message = checkNames(employeeName);
  }
  return message[0];
}


function createEmployee({ id, firstName, lastName }, { managers, responsibleFor }) {
  // seu código aqui
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor
  }
  return newEmployee
}

function isManager(id) {
  // seu código aqui
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  // seu código aqui
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
