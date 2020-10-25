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
  return data.animals.filter(animal => ids.includes(animal.id));
}

function animalsOlderThan(animal, age) {
  return data.animals.find(species => species.name === animal)
    .residents.every(resident => resident.age >= age);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) return {};
  return data.employees.find(name => name.firstName === employeeName ||
    name.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  return { id, firstName, lastName, managers, responsibleFor };
}

function isManager(id) {
  return data.employees.some(employee => employee.managers.some(manager => manager === id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  if (!species) {
    return data.animals.reduce((accAnimal, animal) => {
      accAnimal[animal.name] = animal.residents.length;
      return accAnimal;
    }, {});
  }
  return data.animals.find(animal => animal.name === species).residents.length;
}


function entryCalculator(entrants) {
  if ((!entrants) || (Object.keys(entrants).length === 0)) {
    return 0;
  }
  const entrantKeys = Object.keys(entrants);
  const entrantValue = Object.values(entrants);
  const result = entrantKeys.reduce((sumAcc, currentValue, index) => {
    const currentCalc = data.prices[currentValue] * entrantValue[index];
    return sumAcc + currentCalc;
  }, 0);
  return result;
}

function retrieveAvailableLocations() {
  return data.animals
  .map(animal => animal.location)
  .reduce((acc, currentValue) => {
    const currentValueAlreadyExistsInAcc = currentValue.includes(acc);
    return currentValueAlreadyExistsInAcc ? acc : [...acc, currentValue];
  });
}

function retrieveFilteredAnimalsByLocation(location) {
  return data.animals.filter(animal => animal.location === location);
}

function retrieveAnimalsPerLocation(locations) {
  const animalsPerLocation = {};
  locations.forEach((location) => {
    const filteredAnimals = retrieveFilteredAnimalsByLocation(location)
      .map(animal => animal.name);
    if (filteredAnimals.length !== 0) animalsPerLocation[location] = filteredAnimals;
  });
  return animalsPerLocation;
}

function retrieveAnimalsPerLocationsWithName(locations, sorted, sex) {
  const animalsPerLocation = {};
  locations.forEach((location) => {
    const filteredAnimals = retrieveFilteredAnimalsByLocation(location)
    .map((animal) => {
      const animalName = animal.name;
      const residents = animal.residents
      .filter((resident) => {
        const needFiltering = sex !== undefined;
        if (needFiltering) {
          return resident.sex === sex;
        } return true;
      }).map(resident => resident.name);
      if (sorted) residents.sort();
      return { [animalName]: residents };
    });
    if (filteredAnimals.length !== 0) animalsPerLocation[location] = filteredAnimals;
  });
  return animalsPerLocation;
}
// Requisito resolvido em aula ao vivo c/ Oliva
function animalMap(options) {
  const locations = retrieveAvailableLocations();
  if (!options) return retrieveAnimalsPerLocation(locations);
  const { includeNames = false, sorted = false, sex } = options;
  if (includeNames) {
    return retrieveAnimalsPerLocationsWithName(locations, sorted, sex);
  } return retrieveAnimalsPerLocation(locations);
}

function scheduleString(param) {
  const result = {};
  Object.entries(param).forEach((obj) => {
    result[obj[0]] = `Open from ${obj[1].open}am until ${obj[1].close - 12}pm`;
    if (obj[1].open === 0) {
      result[obj[0]] = 'CLOSED';
    }
  });
  return result;
}

function schedule(dayName) {
  let result = data.hours;
  if (dayName) {
    result = Object.entries(data.hours).find(elemento => elemento[0] === dayName);
    result = { [result[0]]: result[1] };
  }
  return scheduleString(result);
}

function oldestFromFirstSpecies(id) {
  const firstSpecies = data.employees.find(employee => employee.id === id).responsibleFor[0];
  const oldestSpeciesId = data.animals.find(animal => animal.id === firstSpecies).residents
  .reduce((elementBiggerAge, elementAge) => {
    if (elementAge.age > elementBiggerAge.age) {
      return elementAge;
    }
    return elementBiggerAge;
  });
  return [oldestSpeciesId.name, oldestSpeciesId.sex, oldestSpeciesId.age];
}

function increasePrices(percentage) {
  return Object.keys(data.prices).forEach(key =>
    (data.prices[key] = Math.round((data.prices[key] * ((percentage / 100) + 1)) * 100) / 100),
  );
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
