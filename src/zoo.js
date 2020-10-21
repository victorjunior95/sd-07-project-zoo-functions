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

// Funcao animalsByIds:
// Para implementar esta funcao, consultei o repositorio do colega Ygor Fonseca.

const { animals, employees } = require('./data');
const data = require('./data');

function animalsByIds(...ids) {
  const animalsId = [];
  ids.forEach((id) => {
    animalsId.push(animals.find(animal => animal.id === id));
  });
  return animalsId;
}

function animalsOlderThan(animal, age) {
  return animals.find(specie => specie.name === animal)
  .residents.every(resident => resident.age > age);
}

// Funcao animalsByIds:
// Para implementar esta funcao, consultei o repositorio do colega Pedro Marques.

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  return employees.find(
    ({ firstName, lastName }) => firstName === employeeName || lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return Object.assign(personalInfo, associatedWith);
}

// Funcao isManager:
// Para implementar esta funcao, consultei o repositorio do colega Pedro Marques.
function isManager(id) {
  return employees.some(({ managers }) => {
    managers.includes(id);
    return managers.includes(id);
  });
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = {
    id, firstName, lastName, managers, responsibleFor,
  };
  employees.push(newEmployee);
}

// Funcao animalCount:
// Para implementar esta funcao, consultei o repositorio do colega Pedro Marques.
function animalCount(species) {
  let result = {};
  animals.forEach(({ name, residents }) => {
    if (species === undefined) {
      result[name] = residents.length;
    }
    if (species === name) {
      result = residents.length;
    }
  });
  return result;
}

function entryCalculator(entrants) {
  if (entrants === undefined || entrants === {}) {
    return 0;
  }
  const { Senior = 0, Adult = 0, Child = 0 } = entrants;
  const totalValue = (Senior * 24.99) + (Adult * 49.99) + (Child * 20.99);
  return totalValue;
}

function retrieveAvailableLocations() {
  return ['NE', 'E', 'NW', 'SW', 'SE'];
}
function retrieveFilteredAnimalByLocation(location) {
  return animals.filter(animal => animal.location === location);
}
function retrieveAnimalsPerLocation(locations) {
  const animalsPerLocation = {};
  locations.forEach((location) => {
    const filteredAnimals = retrieveFilteredAnimalByLocation(location).map(animal => animal.name);
    if (filteredAnimals.length !== 0) animalsPerLocation[location] = filteredAnimals;
  });
  return animalsPerLocation;
}

function retrieveAnimalsPerLocationWithName(locations, sorted, sex) {
  const animalsPerLocation = {};
  locations.forEach((location) => {
    const filteredAnimals = retrieveFilteredAnimalByLocation(location).map((animal) => {
      const animalName = animal.name;
      const residents = animal.residents
        .filter((resident) => {
          const needFiltering = sex !== undefined;
          // needFiltering ? resident.sex === sex : true; Ternary operator
          if (needFiltering) {
            return resident.sex === sex;
          }
          return true;
        })
        .map(residents => {
          return residents.name;
        });
      if (sorted) residents.sort();
      return { [animalName]: residents };
    });
    if (filteredAnimals.length !== 0) animalsPerLocation[location] = filteredAnimals;
  });
  return animalsPerLocation;
}
// Funcao animalMap:
// Para implementar esta funcao, segui a resolucao do mestre Oliva.
// options === object
// Which options 'options' can have?
// includeNames: bool
// sorted: bool
// sex: string
function animalMap(options) {
  const locations = retrieveAvailableLocations();
  if (!options) return retrieveAnimalsPerLocation(locations);
  const { includeNames = false, sorted = false, sex } = options;
  if (includeNames) return retrieveAnimalsPerLocationWithName(locations, sorted, sex);
  return retrieveAnimalsPerLocation(locations);
}

// Funcao schedule:
// Para implementar esta funcao, consultei o repositorio do colega Ygor Fonseca.
function schedule(dayName) {
  let readebleSchedule = {
    Tuesday: 'Open from 8am until 6pm',
    Wednesday: 'Open from 8am until 6pm',
    Thursday: 'Open from 10am until 8pm',
    Friday: 'Open from 10am until 8pm',
    Saturday: 'Open from 8am until 10pm',
    Sunday: 'Open from 8am until 8pm',
    Monday: 'CLOSED',
  };
  if (dayName === undefined) {
    return readebleSchedule;
  }
  if (dayName !== undefined) {
    const choosedDay = [[dayName, readebleSchedule[dayName]]];
    readebleSchedule = Object.fromEntries(choosedDay);
    return readebleSchedule;
  }
  return readebleSchedule;
}

// Funcao oldestFromFirstSpecies:
// Para implementar esta funcao, consultei o repositorio do colega Pedro Marques.
function oldestFromFirstSpecies(id) {
  const employee = employees.find(({ id: employeeId }) => employeeId === id);
  const animal = animals.find(({ id: animalId }) => animalId === employee.responsibleFor[0]);
  animal.residents.sort((a, b) => b.age - a.age);
  return Object.values(animal.residents[0]);
}

function increasePrices(percentage) {
  const { Adult, Senior, Child } = data.prices;
  const percent = (percentage / 100) + 1;
  Object.assign(data.prices = {
    Adult: Number(((Adult * percent) + 0.001).toFixed(2)),
    Senior: Number(((Senior * percent) + 0.001).toFixed(2)),
    Child: Number(((Child * percent) + 0.001).toFixed(2)),
  });
}

// Funcao employeeCoverage:
// Para implementar esta funcao, consultei o repositorio do colega Ygor Fonseca.
const getAnimalsById = ids => animals.filter(animal => ids.includes(animal.id))
.map(animal => animal.name);

function employeeCoverage(idOrName) {
  let employeesTasks = {
    'Nigel Nelson': ['lions', 'tigers'],
    'Burl Bethea': ['lions', 'tigers', 'bears', 'penguins'],
    'Ola Orloff': ['otters', 'frogs', 'snakes', 'elephants'],
    'Wilburn Wishart': ['snakes', 'elephants'],
    'Stephanie Strauss': ['giraffes', 'otters'],
    'Sharonda Spry': ['otters', 'frogs'],
    'Ardith Azevado': ['tigers', 'bears'],
    'Emery Elser': ['elephants', 'bears', 'lions'],
  };
  if (idOrName !== undefined) {
    const employee = employees.find(employeeObject => employeeObject.id === idOrName ||
    employeeObject.firstName === idOrName ||
    employeeObject.lastName === idOrName);
    employeesTasks = [
      [`${employee.firstName} ${employee.lastName}`, getAnimalsById(employee.responsibleFor)],
    ];
    employeesTasks = Object.fromEntries(employeesTasks);
  }
  return employeesTasks;
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
