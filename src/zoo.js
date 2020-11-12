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
  let species = [];
  if (ids.length > 0) {
    species = data.animals.filter(animal => ids.includes(animal.id));
    return species;
  }
  return species;
}

function animalsOlderThan(animal, age) {
  let animalsAge;
  for (let i = 0; i < data.animals.length; i += 1) {
    if (data.animals[i].name === animal) {
      animalsAge = data.animals[i].residents.every(animalAge => animalAge.age > age);
    }
  }
  return animalsAge;
}

function employeeByName(employeeName) {
  let employeeObj = {};
  if (typeof employeeName === 'undefined') {
    return employeeObj;
  }
  employeeObj = data.employees.find(
    employee =>
      employee.firstName === employeeName || employee.lastName === employeeName,
  );
  return employeeObj;
}

function createEmployee(personalInfo, associatedWith) {
  return Object.assign(personalInfo, associatedWith);
}

function isManager(id) {
  const managerId = data.employees.some(employeeId => employeeId.managers.includes(id));
  return managerId;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const employeeObjct = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  data.employees.push(employeeObjct);
}

function animalCount(species) {
  if (typeof species === 'undefined') {
    const qntdAnimais = {};
    data.animals.forEach(function (animalName) {
      qntdAnimais[animalName.name] = animalName.residents.length;
    });
    return qntdAnimais;
  }
  const counter = data.animals.find(aniimal => aniimal.name === species).residents.length;
  return counter;
}

function entryCalculator(entrants) {
  if (typeof entrants === 'undefined' || Object.keys(entrants).length === 0) return 0;
  const idades = Object.keys(entrants);
  let preço = 0;
  idades.forEach(function (categoria) {
    preço += entrants[categoria] * data.prices[categoria];
  });
  return preço;
}

function getAvailableLocations() {
  const locations = [];
  data.animals.forEach(animal => locations.push(animal.location));
  locations.splice(0, locations.length, ...(new Set(locations)));
  return locations;
}

function retrieveFilteredAnimalsByLocation(location) {
  return data.animals.filter(animal => animal.location === location);
}

function getAnimalsPerLocation(locations) {
  const animalsPerLocation = {};
  locations.forEach((location) => {
    const filteredAnimals = retrieveFilteredAnimalsByLocation(location)
      .map(animal => animal.name);

    if (filteredAnimals.length !== 0) animalsPerLocation[location] = filteredAnimals;
  });
  return animalsPerLocation;
}

function getAnimalsPerLocationWithName(locations, sorted, sex) {
  const animalsPerLocation = {};

  locations.forEach((location) => {
    const filteredAnimals = retrieveFilteredAnimalsByLocation(location).map((animal) => {
      const animalName = animal.name;
      const residents = animal.residents
        .filter((resident) => {
          const filterCall = sex !== undefined;
          return filterCall ? resident.sex === sex : true;
        })
        .map(resident => resident.name);
      if (sorted) residents.sort();
      return { [animalName]: residents };
    });
    if (filteredAnimals.length !== 0) animalsPerLocation[location] = filteredAnimals;
  });

  return animalsPerLocation;
}

function animalMap(options = {}) {
  const locations = getAvailableLocations();
  const { includeNames = false, sorted = false, sex } = options;
  return includeNames
    ? getAnimalsPerLocationWithName(locations, sorted, sex)
    : getAnimalsPerLocation(locations);
}


function schedule(dayName) {
  const keys = Object.keys(data.hours);
  const dayTimes = {};
  const nameTimes = {};
  keys.forEach(function (key) {
    const result =
      key !== 'Monday'
        ? (dayTimes[key] = `Open from ${data.hours[key].open}am until ${
            data.hours[key].close - 12
          }pm`)
        : (dayTimes[key] = 'CLOSED');
    return result;
  });
  if (!dayName) {
    return dayTimes;
  }
  nameTimes[dayName] = dayTimes[dayName];
  return nameTimes;
}

function oldestFromFirstSpecies(id) {
  let convertToArray;
  data.employees.forEach((employee) => {
    if (employee.id === id) {
      const oldestAnimal = employee.responsibleFor[0];
      data.animals.forEach((atualAnimal) => {
        if (atualAnimal.id === oldestAnimal) {
          convertToArray = Object.values(
            atualAnimal.residents.reduce((acc, cur) => (cur.age > acc.age ? cur : acc)),
          );
        }
      });
    }
  });
  return convertToArray;
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
