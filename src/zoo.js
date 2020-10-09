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
  return ids.map(id => data.animals.find(animal => animal.id === id));
}

function animalsOlderThan(animal, age) {
  return data.animals
  .find(({ name }) => name === animal)
  .residents.every(({ age: ageOfAnimal }) => ageOfAnimal > age);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) return {};

  return data.employees
  .find(({ firstName, lastName }) => firstName === employeeName || lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  return { id, firstName, lastName, managers, responsibleFor };
}

function isManager(id) {
  return data.employees.some(({ managers }) => managers[0] === id || managers[1] === id);
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = { id, firstName, lastName, managers, responsibleFor };
  data.employees.push(newEmployee);
}

function animalCount(species) {
  if (species !== undefined) {
    return data.animals
    .find(({ name }) => name === species).residents.length;
  }

  return data.animals.reduce((acc, { name, residents }) => {
    acc[name] = residents.length;
    return acc;
  }, {});
}

function entryCalculator(entrants) {
  if (entrants === undefined || entrants === {}) return 0;
  let total = 0;
  const keys = Object.keys(entrants);
  for (let index = 0; index < keys.length; index += 1) {
    total += entrants[keys[index]] * data.prices[keys[index]];
  }
  return total;
}

function animalMap(options) {
  const locationObject = { NE: [], NW: [], SE: [], SW: [] };
  if (options === undefined || options === {} || !options.includeNames) {
    data.animals.forEach(({ name, location }) => {
      locationObject[location].push(name);
    });
    return locationObject;
  }

  data.animals.forEach(({ name, location, residents }) => {
    const namesOfAnimals = {};
    namesOfAnimals[name] = residents.reduce((acc, { name: residentName, sex }) => {
      const auxArray = acc;
      if (!options.sex) auxArray.push(residentName);
      else if (options.sex === sex) auxArray.push(residentName);
      return auxArray;
    }, []);
    if (options.sorted) namesOfAnimals[name].sort();

    locationObject[location].push(namesOfAnimals);
  });

  return locationObject;
}

const mountLegibleSchedule = (keys) => {
  const returnObject = {};
  for (let index = 0; index < keys.length; index += 1) {
    const { open, close } = data.hours[keys[index]];
    if (open === 0 && close === 0) {
      returnObject[keys[index]] = 'CLOSED';
    } else {
      returnObject[keys[index]] = `Open from ${open}am until ${close - 12}pm`;
    }
  }
  return returnObject;
};

function schedule(dayName) {
  const objectsKeys = Object.keys(data.hours);
  const scheduleObject = mountLegibleSchedule(objectsKeys);

  if (dayName === undefined) return scheduleObject;

  const oneDayObject = {};
  oneDayObject[dayName] = scheduleObject[dayName];
  return oneDayObject;
}

function oldestFromFirstSpecies(id) {
  const { responsibleFor } = data.employees.find(employee => employee.id === id);
  const { age, name, sex } = data.animals
  .find(animal => animal.id === responsibleFor[0])
  .residents.sort((a, b) => b.age - a.age)[0];
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
