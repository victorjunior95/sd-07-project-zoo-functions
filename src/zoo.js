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

const { animals, employees, prices, hours } = require('./data');
const data = require('./data');

function animalsByIds(...ids) {
  return animals.filter(animal => ids.includes(animal.id));
}

function animalsOlderThan(animal, age) {
  const species = animals.find(specie => specie.name === animal);
  return species.residents.every(resident => resident.age > age);
}

function employeeByName(employeeName) {
  const x = employeeName;
  if (employeeName === undefined) {
    return {};
  }
  return employees.find(employee => employee.firstName === x || employee.lastName === x);
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
  const person = employees.find(employee => employee.id === id);
  if (person.managers.length === 1) {
    return true;
  }
  return false;
}

function addEmployee(
  id,
  firstName,
  lastName,
  managers = [],
  responsibleFor = [],
) {
  return employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  if (species === undefined) {
    const counter = {};
    animals.forEach((animal) => {
      counter[animal.name] = animal.residents.length;
    });
    return counter;
  }
  const animal = animals.find(specie => specie.name === species);
  return animal.residents.length;
}

function entryCalculator(entrants) {
  if (entrants === undefined || Object.keys(entrants).length === 0) {
    return 0;
  }
  let price = 0;
  const keys = Object.keys(entrants);
  keys.forEach((key) => {
    price += entrants[key] * prices[key];
  });
  return price;
}


function retrieveAvailableLocations() {
  return ['NW', 'NE', 'E', 'SE', 'SW'];
}

function retrieveAnimalsPerLocation(location) {
  const animalsPerLocation = {};
  location.forEach((where) => {
    const filteredAnimals = animals
    .filter(animal => animal.location === where)
    .map(animal => animal.name);
    if (filteredAnimals.length !== 0) animalsPerLocation[where] = filteredAnimals;
  });
  return animalsPerLocation;
}

function retrieveAnimalsPerLocationWithName(location, sorted, sex) {
  const animalsPerLocation = {};
  location.forEach((where) => {
    const filteredAnimals = animals
    .filter(animal => animal.location === where)
    .map((animal) => {
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
    if (filteredAnimals.length !== 0) animalsPerLocation[where] = filteredAnimals;
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


function schedule(dayName) {
  const calendar = {};
  Object.keys(hours).forEach((day) => {
    if (hours[day].open !== 0 && hours[day].close !== 0) {
      calendar[day] = `Open from ${hours[day].open}am until ${hours[day].close - 12}pm`;
    } else {
      calendar[day] = 'CLOSED';
    }
  });
  if (dayName === undefined) {
    return calendar;
  }
  return { [dayName]: calendar[dayName] };
}

function oldestFromFirstSpecies(id) {
  const employeePerId = employees.find(employee => employee.id === id);
  const animalResponsible = animals.find(animal => animal.id === employeePerId.responsibleFor[0]);
  const oldestSpecie = animalResponsible.residents
  .reduce((previous, curr) => {
    if (previous.age < curr.age) {
      return curr;
    }
    return previous;
  });
  return [oldestSpecie.name, oldestSpecie.sex, oldestSpecie.age];
}

function increasePrices(percentage) {
  const factor = percentage / 100;
  prices.Adult = Math.round((prices.Adult + (prices.Adult * factor)) * 100) / 100;
  prices.Senior = Math.round((prices.Senior + (prices.Senior * factor)) * 100) / 100;
  prices.Child = Math.round((prices.Child + (prices.Child * factor)) * 100) / 100;
}

function employeeCoverage(idOrName) {
  //  FUNCTION
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
