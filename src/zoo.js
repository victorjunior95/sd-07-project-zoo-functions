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
const { animals, prices } = require('./data');

// a "especie" não é o nome, é o objeto todo ?!
function animalsByIds(...ids) {
  return data.animals.filter(({ id }) => ids.includes(id));
}

// Tentar novamente mudar o nome da entrada do Age
function animalsOlderThan(animal, ages) {
  return data.animals
    .find(({ name }) => name === animal)
    .residents.every(({ age: animalAge }) => animalAge >= ages);
}

function employeeByName(employeeName) {
  return (
    data.employees.find(
      ({ firstName, lastName }) => employeeName === firstName || employeeName === lastName) || {}
  );
}

// Essa é tão fácil quanto aberto era o enunciado
function createEmployee(personalInfo, associatedWith) {
  return {
    ...personalInfo,
    ...associatedWith,
  };
}

function isManager(id) {
  return data.employees.some(employeeId => employeeId.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // erro no teste unitário que a entrada tem que estar zerada?
  data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  if (typeof species === 'undefined') {
    // console.log(acc);
    return data.animals.reduce((acc, { name, residents }) => {
      acc[name] = residents.length;
      return acc;
    }, {});
  }

  return data.animals.find(({ name }) => name === species).residents.length;
}
// animalCount();

function entryCalculator(entrants) {
  if (entrants === undefined || Object.keys(entrants).length === 0) return 0;

  const { Adult = 0, Senior = 0, Child = 0 } = entrants;
  const totalAdult = data.prices.Adult * Adult;
  const totalSenior = data.prices.Senior * Senior;
  const totalChild = data.prices.Child * Child;

  return totalAdult + totalSenior + totalChild;
}

function retrieveAvailableLocations() {
  return ['N', 'S', 'E', 'W', 'NE', 'NW', 'SW', 'SE'];
}

function retrieveAnimalsPerLocations(locations) {
  const animalsPerLocation = {};

  locations.forEach((location) => {
    const filteredAnimals = animals.filter(animal => animal.location === location);
    const animalsName = filteredAnimals.map(animal => animal.name);

    if (animalsName.length !== 0) {
      animalsPerLocation[location] = animalsName;
    }
  });

  return animalsPerLocation;
}

function retrieveAnimalsPerLocationsWithName(locations, sorted, sex) {
  const animalsPerLocation = {};

  locations.forEach((location) => {
    const filteredAnimals = animals
    .filter(animal => animal.location === location)
    .map((animal) => {
      const animalName = animal.name;
      const res = animal.residents
      .filter((resident) => {
        const needFiltering = sex !== undefined;
        return needFiltering ? resident.sex === sex : true;
        // if (needFiltering) {
        //   return resident.sex === sex;
        // } else {
        //   return true;
        // }
      })
      .map(residents => residents.name);

      if (sorted) res.sort();

      return { [animalName]: res };
    });
    if (filteredAnimals.length !== 0) animalsPerLocation[location] = filteredAnimals;
    return filteredAnimals;
  });

  return animalsPerLocation;
}

function animalMap(options) {
  const locations = retrieveAvailableLocations();
  if (!options) return retrieveAnimalsPerLocations(locations);
  const { includeNames = false, sorted = false, sex } = options;
  if (includeNames) {
    return retrieveAnimalsPerLocationsWithName(locations, sorted, sex);
  }
  return retrieveAnimalsPerLocations(locations);
}

function schedule(dayName) {
  const hours = Object.keys(data.hours);
  const dayTime = {};
  const nameTime = {};
  hours.forEach(function (key) {
    const result = key !== 'Monday' ? dayTime[key] = `Open from ${data.hours[key].open}am until ${data.hours[key].close - 12}pm` : dayTime[key] = 'CLOSED';
    return result;
  });
  if (!dayName) {
    return dayTime;
  }
  nameTime[dayName] = dayTime[dayName];
  return nameTime;
}

function oldestFromFirstSpecies(id) {
  const animalManagedByEmployeeId = data.employees.find(
    ({ id: employeeId }) => employeeId === id).responsibleFor[0];

  const findAnimalById = data.animals
    .find(({ id: animalId }) => animalId === animalManagedByEmployeeId)
    .residents.sort(({ age: ageA }, { age: ageB }) => ageB - ageA);

  return Object.values(findAnimalById[0]);
}

function increasePrices(percentage) {
  Object.keys(prices).map(
    key => (prices[key] = Math.round(prices[key] * ((percentage / 100) + 1) * 100) / 100),
  );
}

function employeeCoverage(idOrName) {
  // complicado
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
