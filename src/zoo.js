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
const {
  animals,
  employees,
  prices,
  hours,
} = require('./data');

function animalsByIds(...ids) {
  return data.animals.filter((animal => ids.includes(animal.id)));
}

function animalsOlderThan(animal, age) {
  return animals.find(sel => sel.name === animal).residents.every(res => res.age > age);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  return employees.find(emp => emp.firstName === employeeName || emp.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  const {
    id,
    firstName,
    lastName,
  } = personalInfo;
  const {
    managers,
    responsibleFor,
  } = associatedWith;
  return {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
}

function isManager(id) {
  return employees.some(emp => emp.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function animalCount(species) {
  const obj = {};
  if (species === undefined) {
    animals.forEach((animal) => {
      obj[animal.name] = animal.residents.length;
    });
    return obj;
  }
  return animals.find(animal => animal.name === species).residents.length;
}

function entryCalculator(entrants = 0) {
  let aux = 0;
  Object.keys(entrants).forEach((entrant, i) => {
    aux += prices[entrant] * Object.values(entrants)[i];
  });
  return aux;
}

function retrieveAvaliableLocations() {
  return ['NE', 'E', 'NW', 'SW', 'SE'];
}

function retriveAnimalsByLocation(location) {
  return animals.filter(animal => animal.location === location);
}

function retrieveAnimalsPerLocation(locations) {
  const animalsPerLocation = {};

  locations.forEach((location) => {
    const filteredAnimals = retriveAnimalsByLocation(location).map(animal => animal.name);
    if (filteredAnimals.length !== 0) animalsPerLocation[location] = filteredAnimals;
  });
  return animalsPerLocation;
}

function retriveAnimalsPerLocationWithName(locations, sorted, sex) {
  const animalsPerLocation = {};

  locations.forEach((location) => {
    const filteredAnimals = retriveAnimalsByLocation(location).map((animal) => {
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
  const locations = retrieveAvaliableLocations();

  if (!options) return retrieveAnimalsPerLocation(locations);

  const { includeNames = false, sorted = false, sex } = options;

  if (includeNames) {
    return retriveAnimalsPerLocationWithName(locations, sorted, sex);
  }
  return retrieveAnimalsPerLocation(locations);
}

function schedule(dayName) {
  const obj = {};
  Object.keys(hours).forEach((day) => {
    if (day === 'Monday') {
      obj[day] = 'CLOSED';
    } else {
      const openHr = hours[day].open;
      const closeHr = hours[day].close - 12;
      obj[day] = `Open from ${openHr}am until ${closeHr}pm`;
    }
  });
  if (!dayName) {
    return obj;
  }
  return { [dayName]: obj[dayName] };
}

function oldestFromFirstSpecies(id) {
  const animalId = employees.find(elem => elem.id === id).responsibleFor[0];
  return (animals.find(animal => animal.id === animalId).residents)
  .map(elem => Object.values(elem))
  .sort((a, b) => b[2] - a[2])[0];
}

function increasePrices(percentage) {
  Object.keys(prices).forEach((price) => {
    prices[price] = Math.round((prices[price] + (prices[price] * percentage * 0.01)) * 100) / 100;
  });
}

function employeeCoverage(idOrName) {
  const employeeCoverageObject = {};
  let employeeFilterByPersonal;

  if (!idOrName) {
    employeeFilterByPersonal = employees;
  } else {
    employeeFilterByPersonal = employees.filter((({ id, firstName, lastName }) =>
      id === idOrName ||
      firstName === idOrName ||
      lastName === idOrName));
  }

  employeeFilterByPersonal.forEach((employee) => {
    const animalsManager = employee.responsibleFor.map((managedAnimals) => {
      const findManagedAnimal = animals.find(animal => animal.id === managedAnimals).name;
      return findManagedAnimal;
    });
    employeeCoverageObject[`${employee.firstName} ${employee.lastName}`] = animalsManager;
  });

  return employeeCoverageObject;
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

// https://github.com/tryber/sd-06-project-zoo-functions/pull/73/files4
// https://github.com/tryber/sd-06-project-zoo-functions/pull/96/files
