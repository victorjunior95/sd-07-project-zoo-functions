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
  /* Comentários mantidos para fins didáticos.
  Meu código:
  const animalsId = [];
  ids.forEach(id => animalsId.push(data.animals.find(animal => animal.id === id)));
  return animalsId;*/

  // Solução apresentada pelo instrutor Hamaji:
  return animals.filter(animal => ids.includes(animal.id));
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  return animals
    .find(element => element.name === animal)
    .residents.every(resident => resident.age > age);
}

function employeeByName(employeeName) {
  // seu código aqui
  if (!employeeName) return {};
  const functionary = employees.find(name =>
    name.firstName === employeeName || name.lastName === employeeName);
  return functionary;
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
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
  // seu código aqui
  return employees.some(functionary => functionary.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  const functionary = employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
  return functionary;
}

function animalCount(species) {
  // seu código aqui
  const value = {};
  if (!species) {
    animals.forEach((animal) => {
      value[animal.name] = animal.residents.length;
    });
    return value;
  }
  return animals.find(({ name }) => name === species).residents.length;
}

function entryCalculator(entrants) {
  // seu código aqui
  if (!entrants || entrants.length === 0) return 0;
  const { adult = 0, child = 0, senior = 0 } = entrants;
  const adultValue = prices.Adult * adult;
  const childValue = prices.Child * child;
  const seniorValue = prices.Senior * senior;
  const totalValue = adultValue + seniorValue + childValue;
  return totalValue;
}

function retrieveAvailableLocation() {
  return ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
}

function recoverFilteredAnimalsByLocation(location) {
  return animals.filter(animal => animal.location === location);
}

function recoverAnimalsByLocation(locations) {
  const animalByLocation = {};

  locations.forEach((location) => {
    const filteredAnimals = recoverFilteredAnimalsByLocation(location).map(animal => animal.name);
    if (filteredAnimals.length !== 0) animalByLocation[location] = filteredAnimals;
  });

  return animalByLocation;
}

function recoverAnimalsByLocationWithName(locations, sorted, sex) {
  const animalsByLocation = {};

  locations.forEach((location) => {
    const filteredAnimals = recoverFilteredAnimalsByLocation(location).map((animal) => {
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

    if (filteredAnimals.length !== 0) animalsByLocation[location] = filteredAnimals;
  });

  return animalsByLocation;
}

function animalMap(options = {}) {
  // seu código aqui
  // Todos créditos ao plantão/solução do especialista Oliva.
  const locations = retrieveAvailableLocation();
  const { includeNames = false, sorted = false, sex } = options;

  if (includeNames) {
    return recoverAnimalsByLocationWithName(locations, sorted, sex);
  }
  return recoverAnimalsByLocation(locations);
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
