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
    return [];
  }
  const animalById = data.animals.filter((animal, index) => animal.id === ids[index]);
  return animalById;
}

function animalsOlderThan(animal, age) {
  let minAge = false;
  const animalName = data.animals.find(species => species.name === animal);
  animalName.residents.forEach((resident) => {
    if (resident.age >= age) {
      minAge = true;
    }
  });
  return minAge;
}

function employeeByName(employeeName = '') {
  const employee = employeeName;
  const askedEmployee = data.employees.find((eachEmployee) => {
    return eachEmployee.firstName === employeeName || eachEmployee.lastName === employeeName;
  });

  if (employee.length === 0) {
    return {}
  }
  return askedEmployee;
}

function createEmployee(personalInfo, associatedWith) {
  const newEmployee = Object.assign({}, personalInfo, associatedWith);
  return newEmployee;
}

function isManager(id) {
  let manager = false;
  const managersIds = data.employees.map(employee => employee.managers);
  managersIds.forEach((ids, index) => {
    if (ids[index] === id) {
      manager = true;
    }
  });
  return manager;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = {
    id: id,
    firstName: firstName,
    lastName: lastName,
    managers: managers,
    responsibleFor: responsibleFor
  }
  data.employees.push(newEmployee);
}

function animalCount(species = '') {
  const allAnimals = {}
  if (species.length === 0) {
    data.animals.forEach((animal) => {
      let propName = animal.name;
      let quantityAnimals = animal.residents.length;
      allAnimals[propName] = `${quantityAnimals}`;
    });
    return allAnimals;
  }

  const allResidents = data.animals.find((animal) => {
    return animal.name === species;
  });
  return allResidents.residents.length;
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
