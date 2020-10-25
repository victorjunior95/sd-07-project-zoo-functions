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
  let totalValue = 0;
  if (entrants) {
    Object.keys(entrants).forEach(entrant => (totalValue += prices[entrant] * entrants[entrant]));
  }
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
  const result = {};
  const horary = { ...hours };
  Object.keys(horary).forEach((count) => {
    if (horary[count].open !== horary[count].close) {
      result[count] = `Open from ${horary[count].open}am until ${horary[count].close - 12}pm`;
    } else {
      result[count] = 'CLOSED';
    }
  });
  if (!dayName) return result;
  return { [dayName]: result[dayName] };
}
schedule();
function oldestFromFirstSpecies(id) {
  // seu código aqui
}

function increasePrices(percentage) {
  // seu código aqui
  Object.entries(prices).forEach((element) => {
    prices[element[0]] = Math.ceil(element[1] * (percentage + 100)) / 100;
  });
  return prices;
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
