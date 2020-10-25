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

const { animals, hours } = require('./data');
const { employees } = require('./data');
const { prices } = require('./data');
const data = require('./data');

function animalsByIds(...ids) {
  return animals.filter(animal => ids.includes(animal.id));
}

function animalsOlderThan(animal, age) {
  const bichos = animals.filter(elements => elements.name === animal);
  return bichos[0].residents.every(resident => resident.age >= age);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  return employees.find(EE => EE.firstName === employeeName || EE.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return employees.some((manager, index) => manager.managers[index] === id);
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function animalCount(species) {
  const speciesAndQuantities = {};
  animals.forEach(animal => (speciesAndQuantities[(animal.name)] = animal.residents.length));
  if (species === undefined) {
    return speciesAndQuantities;
  }
  const amount = animals.find(element => species === element.name);
  return amount.residents.length;
}

function entryCalculator(...entrants) {
  // Referencia: Thadeu Castelo Branco Ramos
  const { Adult, Senior, Child } = prices;
  let total = 0;
  entrants.map((amountOfPerson) => {
    if (amountOfPerson.Adult) {
      total += amountOfPerson.Adult * Adult;
    }
    if (amountOfPerson.Senior) {
      total += amountOfPerson.Senior * Senior;
    }
    if (amountOfPerson.Child) {
      total += amountOfPerson.Child * Child;
    }
    return total;
  });
  return total;
}

// Animal map feito via plantão/Luz do oliva

function retrieveAvailableLocations() {
  return ['N', 'S', 'E', 'W', 'NW', 'NE', 'SE', 'SW'];
}

function retrieveFilteredAnimalsByLocations(location) {
  return animals.filter(animal => animal.location === location);
}

function retrieveAnimalsPerLocation(locations) {
  const animalsPerLocation = {};

  locations.forEach((location) => {
    const filteredAnimals = retrieveFilteredAnimalsByLocations(location)
    .map(animal => animal.name);
    if (filteredAnimals.length !== 0) animalsPerLocation[location] = filteredAnimals;
  });
  return animalsPerLocation;
}

function retrieveAnimalsPerLocationWithName(locations, sorted, sex) {
  const animalsPerLocation = {};

  locations.forEach((location) => {
    const filteredAnimals = retrieveFilteredAnimalsByLocations(location).map((animal) => {
      const animalName = animal.name;
      const residents = animal.residents
        .filter((resident) => {
          const needFiltering = sex !== undefined;

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

// Fim animal map

function openingHours(dayName) {
  const openingSchedule = {};
  Object.keys(hours).forEach((day) => {
    if (hours[day].open > 0) {
      openingSchedule[day] = `Open from ${hours[day].open}am until ${hours[day].close - 12}pm`;
    } else {
      openingSchedule[day] = 'CLOSED';
    }
  });
  if (dayName) {
    const day = {};
    day[dayName] = openingSchedule[dayName];
    return day;
  }
  return openingSchedule;
}

function schedule(dayName) {
  if (!dayName) {
    return openingHours();
  }
  return openingHours(dayName);
}

function oldestFromFirstSpecies(id) {

}

function increasePrices(percentage) {
  const { Adult, Senior, Child } = prices;
  data.prices.Adult = Math.round((Adult + ((Adult * percentage) / 100)) * 100) / 100;
  data.prices.Senior = Math.round((Senior + ((Senior * percentage) / 100)) * 100) / 100;
  data.prices.Child = Math.round((Child + ((Child * percentage) / 100)) * 100) / 100;
  return prices;
}

function employeeCoverage(idOrName) {
  const animalsByEmployee = {};
  employees.forEach((employee) => {
    const { firstName, lastName } = employee;
    animalsByEmployee[`${firstName} ${lastName}`] = '';
  });
  return animalsByEmployee;
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
