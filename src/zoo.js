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

const data = require("./data");

const { animals, employees, hours, prices } = data;

function animalsByIds(...ids) {
  if (ids === undefined) return [];
  return animals.filter((animal) => ids.includes(animal.id));
}

function animalsOlderThan(animal, age) {
  const species = animals.find((specie) => specie.name === animal);
  return species.residents.every(
    (residentsAnimal) => residentsAnimal.age >= age
  );
}

function employeeByName(employeeName) {
  if (employeeName === undefined) return {};
  return employees.find(
    (emp) => emp.firstName === employeeName || emp.lastName === employeeName
  );
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return employees.some((employee) => employee.managers.includes(id));
}

function addEmployee(
  id,
  firstName,
  lastName,
  managers = [],
  responsibleFor = []
) {
  const newEmployee = { id, firstName, lastName, managers, responsibleFor };
  data.employees.push(newEmployee);
}

function animalCount(species) {
  if (species === undefined) {
    const namesSpecies = {};
    animals.forEach((animal) => {
      namesSpecies[animal.name] = animal.residents.length;
    });

    return namesSpecies;
  }
  const findAnimal = animals.find((animal) => animal.name === species);
  return findAnimal.residents.length;
}

function entryCalculator(entrants) {
  if (!entrants || entrants === {}) return 0;

  const totalSum = Object.keys(entrants);
  return totalSum.reduce(
    (acc, crrValue) => (acc += prices[crrValue] * entrants[crrValue]),
    0
  );
}

function retrieveLocations() {
  return animals.map((animal) => animal.location);
}

function retrieveAnimalsByLocation(location) {
  return animals.filter((animal) => animal.location === location);
}

function retrieveAnimalsPerLocation(locations) {
  const animalsPerLocation = {};

  locations.forEach((location) => {
    const filteredAnimals = retrieveAnimalsByLocation(location).map(
      (animal) => animal.name
    );

    animalsPerLocation[location] = filteredAnimals;
  });

  return animalsPerLocation;
}

function retrieveAnimalsPerLocationWithNAme(locations, sorted, sex) {
  const animalsPerlocation = {};

  locations.forEach((location) => {
    const filteredAnimals = retrieveAnimalsByLocation(location).map(
      (animal) => {
        const animalName = animal.name;
        const residents = animal.residents
          .filter((resident) => {
            const needFiltering = sex !== undefined;

            return needFiltering ? resident.sex === sex : true;
          })
          .map((resident) => resident.name);

        if (sorted) residents.sort();

        return { [animalName]: residents };
      }
    );
    animalsPerlocation[location] = filteredAnimals;
  });
  return animalsPerlocation;
}
function animalMap(options) {
  const locations = retrieveLocations();

  if (!options) return retrieveAnimalsPerLocation(locations);

  const { includeNames = false, sorted = false, sex } = options;

  if (includeNames) {
    return retrieveAnimalsPerLocationWithNAme(locations, sorted, sex);
  } else {
    return retrieveAnimalsPerLocation(locations);
  }
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
  employeeCoverage,
  addEmployee,
  isManager,
  animalsOlderThan,
  oldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
