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
  const paramIds = ids.map((id) => {
    const comparingIds = animals.find(animalById => animalById.id === id);
    return comparingIds;
  });
  return paramIds;
}

function animalsOlderThan(animal, age) {
  const getingParamAnimal = animals.find(animalParam => animalParam.name === animal);
  return getingParamAnimal.residents.every(animalsAges => animalsAges.age >= age);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  const allemployeeInfos = data.employees.find(allInfos =>
  allInfos.firstName === employeeName || allInfos.lastName === employeeName);
  return allemployeeInfos;
}

function createEmployee(personalInfo, associatedWith) {
  const newEmployee = {
    ...personalInfo,
    ...associatedWith,
  };
  return newEmployee;
}

function isManager(id) {
  const managerId = employees.some(( {managers} ) => managers.some(manager => manager === id));
  return managerId;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  employees.push(newEmployee);
}

function animalCount(species) {
  if (species === undefined) {
    const allAnimalsObject = animals.reduce((allAnimals, animal) => {
      allAnimals[animal.name] = animal.residents.length;
      return allAnimals;
    }, {});
    return allAnimalsObject;
  }

  const amountSpecie = data.animals.reduce((residentsLength, animalSelected) => {
    if (animalSelected.name === species) {
      residentsLength = (animalSelected.residents).length;
    }
    return residentsLength;
  }, 0);
  return amountSpecie;
}

function entryCalculator(entrants) {
  // if (entrants === undefined || entrants === {}) {
  //   return 0;
  // }
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
