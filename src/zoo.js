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
<<<<<<< HEAD

=======
>>>>>>> a5bd6dfc13acdfd21c8290b6a3248b5850b6cb1d
const { employees } = require('./data');
const data = require('./data');

function animalsByIds(...ids) {
  return data.animals.filter(animal => ids.includes(animal.id));
}

function animalsOlderThan(animal, age) {
  return data.animals.find(species => species.name === animal)
<<<<<<< HEAD
    .residents.every(resident => resident.age >= age);
=======
  .residents.every(resident => resident.age >= age);
>>>>>>> a5bd6dfc13acdfd21c8290b6a3248b5850b6cb1d
}

function employeeByName(employeeName) {
  if (employeeName === undefined) return {};
  return employees.find(name => name.firstName === employeeName ||
<<<<<<< HEAD
    name.lastName === employeeName);
=======
  name.lastName === employeeName);
>>>>>>> a5bd6dfc13acdfd21c8290b6a3248b5850b6cb1d
}

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  return { id, firstName, lastName, managers, responsibleFor };
}

function isManager(id) {
<<<<<<< HEAD
  return data.employees.some(employee => employee.managers.some(manager => manager === id));  
=======
  return employees.includes(employeId => employeId.managers === id);
>>>>>>> a5bd6dfc13acdfd21c8290b6a3248b5850b6cb1d
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  return data.employees.push({id, firstName, lastName, managers, responsibleFor});
}

function animalCount(species) {
  // seu código aqui
}

function entryCalculator(entrants) {
  // seu código aqui
}

function animalMap(options) {
  if (!options) {
    //retornar
    categorizeAnimalsByLocation()
  }
}

// const objetoInicial = {
  // NE: [],
  // NW: [],
  // SE: [],
  // SW: [],
// }

function categorizeAnimalsByLocation() {
  // return data.animals.reduce((acc, specie) => {
  //   return {
  //     ...acc,
  //     [specie.location]: [
  //       ...acc[specie.location],
  //       specie.name
  //     ]
  //   };
  // }, objetoInicial);

};

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