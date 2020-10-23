const { animals, employees, prices, hours } = require('./data');
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
  let response;
  if (ids.length > 1) {
    response = animals.filter((animal, posicao) => animal.id === ids[posicao]);
  }
  if (ids.length === 1) {
    response = [animals.find(animal => animal.id === ids[0])];
  }
  if (ids.length === 0) {
    response = ids;
  }
  return response;
}

function animalsOlderThan(animal, age) {
  return animals.find(animalElement => animalElement.name === animal)
  .residents.every(residentElement => residentElement.age >= age);
}

function employeeByName(employeeName) {
  let response;
  if (employeeName === undefined) {
    response = {};
  } else {
    response = employees.find((element) => {
      let response2;
      if (element.firstName === employeeName || element.lastName === employeeName) {
        response2 = true;
      } else {
        response2 = false;
      }
      return response2;
    });
  }
  return response;
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  let response;
  const managers = employees.find(employee => employee.managers.includes(id));
  if (managers !== undefined) {
    response = true;
  } else {
    response = false;
  }
  return response;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  let response = {};
  if (species === undefined) {
    animals.forEach(animal => (response[animal.name] = animal.residents.length));
  } else {
    response = animals.filter(animal => animal.name === species)
    .reduce((acc, animal) => (acc += animal.residents.length), 0);
  }
  return response;
}

function entryCalculator(entrants = {}) {
  let totalPrice = 0;
  Object.keys(entrants).forEach(entrant => (totalPrice += prices[entrant] * entrants[entrant]));
  return totalPrice;
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
  return data.animals.filter(animal => animal.location === locations);
}
function retrieveAnimalsPerLocation(locations) {
  // Sem parâmetros, retorna animais categorizados por localização
  const animalsPerLocation = {};
  locations.forEach(location => {
    const filteredAnimals = retrieveFilteredAnimalsByLocation(location)
      .map(animal => animal.name);
    if (filteredAnimals.length !== 0) animalsPerLocation[location] = filteredAnimals;
  });
  return animalsPerLocation;
}
function retrieveAnimalsPerLocationsWithName(locations, sorted, sex) {
  const animalsPerLocation = {};
  locations.forEach(location => {
    const filteredAnimals = retrieveFilteredAnimalsByLocation(location)
    .map(animal => {
      const animalName = animal.name;
      const residents = animal.residents
      .filter(resident => {
        const needFiltering = sex !== undefined;
        // return needFiltering ? resident.sex === sex : true;
        let retorno;
        if (needFiltering) {
          retorno = resident.sex === sex;
        } else {
          retorno = true;
        }
        return retorno;
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
  let retorno;
  if (includeNames) {
    retorno = retrieveAnimalsPerLocationsWithName(locations, sorted, sex);
  } else {
    retorno = retrieveAnimalsPerLocation(locations);
  }
  return retorno;
}

function transformDay(objectParam) {
  const retorno = {};
  Object.entries(objectParam).forEach((elemento) => {
    retorno[elemento[0]] = `Open from ${elemento[1].open}am until ${elemento[1].close - 12}pm`;
    if (elemento[1].open === 0) {
      retorno[elemento[0]] = 'CLOSED';
    }
  });
  return retorno;
}

function schedule(dayName) {
  let response = hours;
  if (dayName !== undefined) {
    response = Object.entries(hours).find(elemento => elemento[0] === dayName);
    response = { [response[0]]: response[1] };
  }
  return transformDay(response);
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
}

function increasePrices(percentage) {
  const result = {};
  if (percentage != undefined) {
    Object.entries(prices).forEach((price) => {
      result[price[0]] = Math.round((((price[1] * percentage) / 100) + price[1]) * 100) / 100;
      console.log(result);
    });
  return result;
}

console.log(increasePrices(50));

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
