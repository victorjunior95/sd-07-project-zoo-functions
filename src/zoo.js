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
  const { animals } = data;
  return ids.map(id => animals.find(item => item.id === id));
}

function animalsOlderThan(animal, age) {
  const { animals: animalList } = data;
  const { residents } = animalList.find(animalItem => animalItem.name === animal);
  return residents.every(resident => resident.age > age);
}

function employeeByName(employeeName) {
  const { employees } = data;
  const employeeData = employees.find(({ firstName, lastName }) =>
    firstName === employeeName || lastName === employeeName);
  return employeeData === undefined ? {} : employeeData;
}

function createEmployee(personalInfo, associatedWith) {
  return {
    ...personalInfo,
    ...associatedWith,
  };
}

function isManager(id) {
  const { employees } = data;
  return employees.some(employee => employee.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const { employees } = data;
  const employee = createEmployee({ id, firstName, lastName }, { managers, responsibleFor });
  employees.push(employee);
}

function animalCount(species) {
  const { animals } = data;
  const animalsData = {};
  if (species === undefined) {
    animals.forEach(({ name, residents }) => {
      animalsData[name] = residents.length;
    });
    return animalsData;
  }
  return animals.find(({ name }) => name === species).residents.length;
}

function entryCalculator(entrants) {
  if (entrants === undefined || Object.keys(entrants).length === 0) return 0;
  const { prices } = data;
  return Object.entries(entrants).reduce((acc, curr) => acc + (prices[curr[0]] * curr[1]), 0);
}

const animalMapClean = () => ({
  NE: [],
  NW: [],
  SE: [],
  SW: [],
});

const animalMapUndefined = () => {
  const { animals } = data;
  const animalsByRegion = animalMapClean();

  animals.forEach(({ location, name }) => {
    animalsByRegion[location].push(name);
  });
  return animalsByRegion;
};

const animalMapIncludeNames = (_) => {
  const { animals } = data;
  const animalsByRegion = animalMapClean();

  animals.forEach(({ location, name, residents }) => {
    const animalObject = {};
    animalObject[name] = residents.map(resident => resident.name);
    animalsByRegion[location].push(animalObject);
  });
  return animalsByRegion;
};

const animalMapSex = (_, options) => {
  if (!Object.prototype.hasOwnProperty.call(options, 'includeNames')) {
    return animalMapUndefined();
  }
  const { animals } = data;
  const animalsByRegion = animalMapClean();

  animals.forEach(({ location, name, residents }) => {
    const animalObject = {};
    animalObject[name] = residents.filter(resident => resident.sex === options.sex)
    .map(resident => resident.name);
    animalsByRegion[location].push(animalObject);
  });

  return animalsByRegion;
};

const animalMapSorted = (animalsByRegion, options) => {
  if (!Object.prototype.hasOwnProperty.call(options, 'includeNames')) {
    return animalMapUndefined();
  }

  Object.values(animalsByRegion).forEach((region) => {
    region.forEach((animal) => {
      animal[Object.keys(animal)[0]].sort();
    });
  });
  return animalsByRegion;
};

function animalMap(options = {}) {
  const possibleOptions = ['includeNames', 'sex', 'sorted'];
  const optionsFunctions = [animalMapIncludeNames, animalMapSex, animalMapSorted];
  let animalsByRegion = animalMapUndefined();

  possibleOptions.forEach((opt, index) => {
    if (Object.prototype.hasOwnProperty.call(options, opt)) {
      animalsByRegion = optionsFunctions[index](animalsByRegion, options);
    }
  });

  return animalsByRegion;
}

const formatTime = hour => (((hour + 11) % 12) + 1);

const fullSchedule = () => {
  const { hours } = data;
  const scheduleObject = {};
  Object.entries(hours).forEach((hour) => {
    const [day, { open, close }] = hour;
    scheduleObject[day] = `Open from ${open}am until ${formatTime(close)}pm`;
  });
  return scheduleObject;
};

const scheduleDay = (dayName) => {
  const { hours } = data;
  const scheduleObject = {};
  const [day, { open, close }] = Object.entries(hours).find(hour => hour[0] === dayName);
  scheduleObject[day] = `Open from ${open}am until ${formatTime(close)}pm`;
  return scheduleObject;
};

function schedule(dayName) {
  let scheduleObject = {};
  if (dayName === undefined) scheduleObject = fullSchedule();
  else scheduleObject = scheduleDay(dayName);
  if (Object.prototype.hasOwnProperty.call(scheduleObject, 'Monday')) {
    scheduleObject.Monday = 'CLOSED';
  }
  return scheduleObject;
}

function oldestFromFirstSpecies(id) {
  const { animals, employees } = data;
  const animalId = employees.find(employee => employee.id === id).responsibleFor[0];
  const animalSpecies = animals.find(animal => animal.id === animalId);
  const { name, sex, age } = animalSpecies.residents.sort((a, b) => b.age - a.age)[0];
  return [name, sex, age];
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
