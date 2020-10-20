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
  return ids.map(idAnimal => data.animals.find(animals => animals.id === idAnimal));
}

function animalsOlderThan(animal, age) {
  const animalList = data.animals.find(animalName => animalName.name === animal);
  const animalAge = animalList.residents.every(animalName => animalName.age >= age);
  return animalAge;
}
function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  return data.employees.find(({ firstName, lastName }) =>
  firstName === employeeName || lastName === employeeName,
  );
}

function createEmployee(personalInfo, associatedWith) {
  const newEmployee = {
    id: personalInfo.id,
    firstName: personalInfo.firstName,
    lastName: personalInfo.lastName,
    managers: [
      associatedWith.managers[0],
    ],
    responsibleFor: [
      associatedWith.responsibleFor[0],
    ],
  };
  return newEmployee;
}

function isManager(id) {
  if (data.employees.find(({ managers }) =>
    managers.find(manager => manager === id) !== undefined)) {
    return true;
  }
  return false;
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
}

function animalCount(species) {
  // seu código aqui
}

function entryCalculator(entrants) {
  // seu código aqui
}

// const objectInicial = {
//   NE = [],
//   NW = [],
//   SE = [],
//   Sw = [],
// }

function animalMap(options) {
  // return data.animals.reduce((acc, specie) => {
  //   return {
  //     ...acc,[specie.location]: [
  //       ...acc[specie.location],
  //       specie.name
  //     ]
  //   };
  // }, objectInicial);
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
