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

const animals = data.animals;
const employees = data.employees;
const prices = data.prices;

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
    responsibleFor,
  };
  return newEmployee;
}

function isManager(id) {
  // seu código aqui
  const spreadManagers = [];
  employees.forEach(({ managers }) => {
    managers.forEach(item => spreadManagers.push(item));
  });
  return spreadManagers.some(manager => manager === id);
}


function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  employees.push(newEmployee);
  return employees;
}

// support
const animalNoParameter = () => {
  const animalCountObject = {};
  animals.forEach(({ name, residents }) => {
    animalCountObject[name] = residents.length;
  });
  return animalCountObject;
};

function animalCount(species) {
  // seu código aqui
  let message = animalNoParameter();
  if (species) {
    const found = animals.find(animal => animal.name === species);
    message = found.residents.length;
  }
  return message;
}

function entryCalculator(entrants = 0) {
  // seu código aqui
  if (Object.values(entrants).length === 0) {
    entrants = 0;
  } else if (Object.values(entrants).length > 0) {
    const { Adult = 0, Senior = 0, Child = 0 } = entrants;
    entrants = (Adult * prices.Adult) + (Senior * prices.Senior) + (Child * prices.Child);
  }
  return entrants;
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
