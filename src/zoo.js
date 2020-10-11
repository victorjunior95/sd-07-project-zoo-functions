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
  if (ids.length === 0) {
    return ids;
  }
  const filteredAnimals = [];
  ids.forEach((id) => {
    data.animals.forEach((animal) => {
      if (animal.id === id) {
        filteredAnimals.push(animal);
      }
    });
  });
  return filteredAnimals;
}

function animalsOlderThan(animal, age) {
  const specificAnimal = data.animals.find(element => element.name === animal);
  return specificAnimal.residents.every(element => element.age > age);
}

function employeeByName(employeeName) {
  if (!employeeName) return ({});
  return data.employees
  .find(employee => employee.firstName === employeeName || employee.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
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
  const managersReduce = (acc, element) => acc.concat(element.managers);
  const allManagers = data.employees.reduce(managersReduce, []);
  let managerStatus = false;
  allManagers.forEach((element) => {
    if (element === id) managerStatus = true;
  });
  return managerStatus;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newGuy = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  data.employees.push(newGuy);
}

const namesReducer = (acc, currAnimal) => acc.concat(currAnimal.name);
const popReducer = (acc, currAnimal) => acc.concat(currAnimal.residents.length);

function createAnimalsObj() {
  const returnedObj = {};
  const animalsNames = data.animals.reduce(namesReducer, []);
  const animalspopulation = data.animals.reduce(popReducer, []);
  for (let index = 0; index < animalsNames.length; index += 1) {
    returnedObj[animalsNames[index]] = animalspopulation[index];
  }
  return returnedObj;
}

function animalCount(species) {
  const animalsObj = createAnimalsObj();
  if (species) {
    return animalsObj[species];
  }
  return animalsObj;
}

const checkEntrants = (entrants) => {
  if (!entrants) {
    return false;
  }
  if (Object.keys(entrants).length === 0) {
    return false;
  }
  return true;
};

function entryCalculator(entrants) {
  if (!checkEntrants(entrants)) {
    return 0;
  }
  const keys = ['Adult', 'Child', 'Senior'];
  return keys.reduce((acc, elem) => {
    if (typeof entrants[elem] === 'number') {
      acc += entrants[elem] * data.prices[elem];
    }
    return acc;
  }, 0);
}

const regionMapper = () => {};

function SpeciesByRegion () {
  const mapObj = {};
  const regions = ['NE', 'NW', 'SE', 'SW'];
  data.animals.map(regionMapper);
}
console.log(SpeciesByRegion())
function animalMap(options) {
  if (options.includenames) {
    return namedMap();
  }
  return SpeciesByRegion();
}

const everyDaySchedule = () => {
  const scheduleInfo = {};
  Object.keys(data.hours).forEach((day) => {
    scheduleInfo[day] = `Open from ${data.hours[day].open}am until ${data.hours[day].close - 12}pm`;
    if (data.hours[day].close === 0) {
      scheduleInfo[day] = 'CLOSED';
    }
  });
  return scheduleInfo;
};
console.log(everyDaySchedule())
function schedule(dayName) {
  if (dayName) {
    return todaySchedule(dayName);
  }
  return everyDaySchedule();
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
}

function increasePrices(percentage) {
  const multiplier = 1 + (percentage / 100);
  Object.keys(data.prices)
  .forEach((consumer) => {
    let newValue = data.prices[consumer] * multiplier;
    newValue = Math.round(newValue * 100) / 100;
    data.prices[consumer] = newValue;
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
