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

const { animals, employees, prices } = require('./data');
const data = require('./data');

function animalsByIds(...ids) {
  return animals.filter(animal => ids.includes(animal.id));
}

function animalsOlderThan(animal, age) {
  return animals.find(species => species.name === animal)
  .residents.every(resident => resident.age > age);
}

function employeeByName(employeeName) {
  const employeeObj = {};
  Object.assign(employeeObj, employees.find(employee => employee
    .firstName === employeeName || employee.lastName === employeeName));
  return employeeObj;
}

function createEmployee(personalInfo, associatedWith) {
  return Object.assign(personalInfo, associatedWith);
}

function isManager(id) {
  return employees.some(employee => employee.managers.some(managerId => managerId === id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  if (species === undefined) {
    return animals.reduce((animalsQuantities, animal) => {
      animalsQuantities[animal.name] = animal.residents.length;
      return animalsQuantities;
    }, {});
  }
  return animals.reduce((accumulator, animal) => {
    if (animal.name === species) {
      accumulator = (animal.residents).length;
    }
    return accumulator;
  }, 0);
}

function entryCalculator(entrants) {
  if (!entrants) {
    return 0;
  }
  return Object.keys(entrants).reduce((total, key) =>
  total + (prices[key] * entrants[key]), 0);
}

function animalMap(options) {
  const locationObj = { NE: [], NW: [], SE: [], SW: [] };
  if (options === undefined || options === {} || !options.includeNames) {
    animals.forEach(({ name, location }) => {
      locationObj[location].push(name);
    });
    return locationObj;
  }
  animals.forEach(({ name, location, residents }) => {
    const animalsNames = {};
    animalsNames[name] = residents.reduce((accumulator, { name: residentName, sex }) => {
      const auxiliar = accumulator;
      if (!options.sex) auxiliar.push(residentName);
      else if (options.sex === sex) auxiliar.push(residentName);
      return auxiliar;
    }, []);
    if (options.sorted) animalsNames[name].sort();

    locationObj[location].push(animalsNames);
  });

  return locationObj;
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
