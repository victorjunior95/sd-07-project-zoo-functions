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
  if (arguments.length === 0) {
    return [];
  }
  const animalsObj = ids.map(idAtual => data.animals.find(animal => animal.id === idAtual));
  return animalsObj;
}

function animalsOlderThan(animal, age) {
  const animalFinded = data.animals.find(courrentAnimal => courrentAnimal.name === animal);
  return animalFinded.residents.every(courrentResident => courrentResident.age >= age);
}

function employeeByName(employeeName) {
  if (arguments.length === 0) {
    return {};
  }
  return data.employees
  .find(employee => employee.firstName === employeeName
    || employee.lastName === employeeName);
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
  return data.employees.some(employee => employee.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  data.employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function animalCount(species) {
  const object = {};
  if (arguments.length === 0) {
    data.animals.forEach((animal) => {
      object[animal.name] = animal.residents.length;
    });
    return object;
  }
  const animalFinded = data.animals.find(animal => animal.name === species);
  return animalFinded.residents.length;
}

function entryCalculator(...entrants) {
  if (!entrants || Object.entries(entrants).length === 0) {
    return 0;
  }
  let totalValue = 0;
  const { Adult, Senior, Child } = data.prices;
  entrants.forEach((visitant) => {
    if (visitant.Adult) {
      totalValue += visitant.Adult * Adult;
    }
    if (visitant.Senior) {
      totalValue += visitant.Senior * Senior;
    }
    if (visitant.Child) {
      totalValue += visitant.Child * Child;
    }
  });
  return totalValue;
}

function animalMap(options) {
  // seu código aqui
}
function phrase(keys) {
  if (keys === 'Monday') {
    return 'CLOSED'
  } else {
    return `Open from ${data.hours[keys].open}am until ${data.hours[keys].close - 12}pm`;
  }
}

function schedule(dayName) {
  const object = {};
  if (arguments.length === 0) {
    Object.keys(data.hours).forEach((key) => {
      object[key] = phrase(key)
    });
  } else {
    object[dayName] = phrase(dayName);
  }
  return object;
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
