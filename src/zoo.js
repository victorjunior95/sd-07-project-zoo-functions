/*
eslint no-unused-vars: [
  'error',
  {
    'args': 'none',
    'vars': 'local',
    'varsIgnorePattern': 'data'
  }
]
*/

const data = require('./data');

function animalsByIds(...ids) {
  if (ids.length === 0) {
    return [];
  }
  return ids.map(id => data.animals.find(animal => animal.id === id));
}

function animalsOlderThan(name, minimalAge) {
  return data.animals
    .find(animal => animal.name === name)
    .residents.reduce(
      (allIsOlder, { age }) => allIsOlder && age > minimalAge,
      true,
    );
}

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  return data.employees.find(
    ({ firstName, lastName }) =>
      firstName === employeeName || lastName === employeeName,
  );
}

function createEmployee(personalInfo, associatedWith) {
  return Object.assign({}, personalInfo, associatedWith);
}

function isManager(id) {
  if (data.employees
    .find(({ managers }) =>
      managers
      .find(managersId => managersId === id) !== undefined)) {
    return true;
  }
  return false;
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  if (managers === undefined) managers = [];
  if (responsibleFor === undefined) responsibleFor = [];
  data.employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function animalCount(species) {
  if (species === undefined) {
    const animalQtds = data.animals.map(({ name, residents }) => {
      const animal = {};
      animal[name] = residents.reduce(sum => sum + 1, 0);
      return animal;
    });
    return Object.assign({}, ...animalQtds);
  }
  return data.animals
    .find(({ name }) => name === species)
    .residents.reduce(sum => sum + 1, 0);
}

function entryCalculator(entrants) {
  const { prices } = data;
  if (entrants === undefined || Object.keys(entrants).length === 0) {
    return 0;
  }
  const keys = Object.keys(entrants);
  return keys.reduce((total, key) => {
    const number = entrants[key];
    return total + (number * prices[key]);
  }, 0);
}

function animalMap(options) {
  const { animals } = data;
  const animalMap = {};
  if (options === undefined) {
    animals
      .map(({ location }) => location)
      .forEach((location) => {
        if (!{}.hasOwnProperty.call(animalMap, location)) {
          animalMap[location] = [];
        }
      });
    const keys = Object.keys(animalMap);
    const array = keys.map((key) => {
      const object = {};
      object[key] = animals
        .filter(({ location }) => location === key)
        .map(({ name }) => name);
      return object;
    });
    return Object.assign({}, ...array);
  }
  // return animalMap;
}
console.log(animalMap());

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
