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
const { animals, employees } = require('./data');
const data = require('./data');

function animalsByIds(...ids) {
  if (typeof ids === 'undefined') {
    return [];
  }
  return animals.filter(animal => ids.includes(animal.id));
}

function animalsOlderThan(animal, age) {
  const animalsAge = animals.find(element => element.name === animal).residents;
  return animalsAge.every(resident => resident.age >= age);
}


function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  return employees.find(employName => (employName
    .firstName === employeeName || employName.lastName === employeeName));
}

const createEmployee = (personalInfo, associatedWith) => {
  const object = { ...personalInfo, ...associatedWith };
  return object;
};

function isManager(id) {
  // seu código aqui=> {
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

function retrieveAvailableLocations() {
  return ['NE', 'NW', 'SW', 'SE'];
}

function retrieveFilteredAnimalsByLocation(location) {
  return animals.filter(animal => animal.location === location);
}

function retrieveAnimalsPerLocation(locations) {
  const animalsPerLocation = {};

  locations.forEach((location) => {
    const filteredAnimals = retrieveFilteredAnimalsByLocation(location)
    .map(animal => animal.name);
    if (filteredAnimals.length !== 0)animalsPerLocation[location] = filteredAnimals;
  });

  return animalsPerLocation;
}

function retrieveAnimalsPerLocationWithName(locations, sorted, sex) {
  const animalsPerLocation = {};

  locations.forEach((location) => {
    const filteredAnimals = retrieveFilteredAnimalsByLocation(location).map((animal) => {
      const animalName = animal.name;
      const residents = animal.residents
        .filter((resident) => {
          const needFiltering = sex !== undefined;
          // return needFiltering ? resident.sex === sex : true;
          if (needFiltering) {
            return resident.sex === sex;
          }
          return true;
        })
        .map(resident => resident.name);

      if (sorted) residents.sort();

      return { [animalName]: residents };
    });

    if (filteredAnimals.length !== 0) animalsPerLocation[location] = filteredAnimals;
  });

  return animalsPerLocation;
}

function animalMap(options) {
  const locations = retrieveAvailableLocations();

  if (!options) return retrieveAnimalsPerLocation(locations);

  const { includeNames = false, sorted = false, sex } = options;

  if (includeNames) {
    return retrieveAnimalsPerLocationWithName(locations, sorted, sex);
  }
  return retrieveAnimalsPerLocation(locations);
}
// código feito em conjunto com o oliva em aula

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
