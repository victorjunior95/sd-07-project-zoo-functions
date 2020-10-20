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


const { employees } = data;

function animalsByIds(...ids) {
  return data.animals.filter(({ id }) => ids.includes(id));
}

function animalsOlderThan(animal, age) {
  return data.animals
  .find(({ name }) => name === animal)
  .residents
  .every(resident => resident.age >= age);
}

function employeeByName(employeeName) {
  const employee = {};
  if (employeeName) {
    return data.employees
    .find(({ firstName, lastName }) => employeeName === firstName || employeeName === lastName);
  }
  return employee;
}

function createEmployee(personalInfo, associatedWith) {
  return Object.assign({}, personalInfo, associatedWith);
}

function isManager(id) {
  return employees.some(employee => employee.managers.some(manager => manager === id));
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  const { animals } = data;
  if (species === undefined) {
    const out = {};
    animals.forEach(animal => (out[animal.name] = animal.residents.length));
    return out;
  }
  return animals.find(animal => animal.name === species).residents.length;
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

function retrieveAvailableLocations() {
  return ['NE', 'NW', 'SW', 'SE'];
}

function retrieveAnimalsByLocation(locations) {
  const animalsByLocation = {};
  const { animals } = data;

  locations.forEach((location) => {
    const filteredAnimalsByName = animals.filter(animal => animal.location === location)
    .map(animal => animal.name);
    animalsByLocation[location] = filteredAnimalsByName;
  });

  return animalsByLocation;
}

function retrieveAnimalsNameByLocation(locations, sorted, sex) {
  const { animals } = data;
  const animalsNameByLocation = {};

  locations.forEach((location) => {
    const filteredAnimalsName = animals.filter(animal => animal.location === location)
    .map((animal) => {
      const animalName = animal.name;
      const residents = animal.residents
      .filter((resident) => {
        const needFiltering = sex !== undefined;
        return needFiltering ? resident.sex === sex : true;
      })
      .map(resident => resident.name);

      if (sorted) {
        residents.sort();
      }
      return { [animalName]: residents };
    });
    animalsNameByLocation[location] = filteredAnimalsName;
  });

  return animalsNameByLocation;
}

function animalMap(options) {
  // Resolução a partir do plantão do instrutor Gabriel Oliva
  const locations = retrieveAvailableLocations();

  if (!options) {
    return retrieveAnimalsByLocation(locations);
  }

  const { includeNames = false, sorted = false, sex } = options;
  if (includeNames) {
    return retrieveAnimalsNameByLocation(locations, sorted, sex);
  }

  return retrieveAnimalsByLocation(locations);
}

function schedule(dayName) {
  // seu código aqui
}

function oldestFromFirstSpecies(speciesId) {
  const animalId = data.employees.find(employee => employee.id === speciesId)
  .responsibleFor.shift();
  return Object.values(data.animals.find(({ id }) => id === animalId).residents
  .sort((a, b) => b.age - a.age)
  .shift());
}

function increasePrices(percentage) {
  Object.keys(data.prices)
    .forEach((price) => {
      data.prices[price] =
      Math.ceil((data.prices[price] * (100 + percentage))) / 100;
    });
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
