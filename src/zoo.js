/*
eslint no-unused-vars: [
  'error',
  {
    'args': 'none',
    'vars': 'local',
    'varsIgnorePattern': 'data'
  }
]
*/

const data = require('./data');

function animalsByIds(...ids) {
  return data.animals.filter(el => ids.includes(el.id));
}

function animalsOlderThan(animal, age) {
  const getAnimal = data.animals.filter(({ name }) => name === animal);
  const allAges = [];
  getAnimal[0].residents.forEach(eachResident => allAges.push(eachResident.age));
  return allAges.every(cur => cur >= age);
}

function employeeByName(name) {
  const findEmployee = data.employees.filter(el => el.firstName === name || el.lastName === name);
  return typeof name !== 'undefined' ? findEmployee[0] : {};
}

function createEmployee(personalInfo, associatedWith) {
  const newObj = { ...personalInfo, ...associatedWith };
  data.employees.push(newObj);
  return newObj;
}

function isManager(id) {
  const listOfManagers = [];
  data.employees.forEach((each) => {
    each.managers.forEach(inside => listOfManagers.push(inside));
  });
  return listOfManagers.some(item => item === id);
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  if (typeof managers === 'undefined') {
    managers = [];
  }
  if (typeof responsibleFor === 'undefined') {
    responsibleFor = [];
  }
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  data.employees.push(newEmployee);
  return newEmployee;
}

const amoutOfAnimals = (species) => {
  let result;
  data.animals.forEach((animal) => {
    if (animal.name === species) {
      result = animal.residents.length;
    }
  });
  return result;
};

function animalCount(species) {
  let getAnimals = {};
  if (typeof species !== 'undefined') {
    getAnimals = amoutOfAnimals(species);
  } else {
    data.animals.forEach((eachAnimal) => {
      getAnimals[eachAnimal.name] = eachAnimal.residents.length;
    });
  }
  return getAnimals;
}

const sumPrice = (entrants) => {
  const prices = data.prices;
  const values = Object.values(entrants);
  const keys = Object.keys(entrants);

  const replaceKeys = [];

  keys.forEach((key) => {
    replaceKeys.push(key.replace(key, prices[key]));
  });

  const sum = replaceKeys.reduce((acc, cur, idx) => acc + (cur * values[idx]), 0);
  return sum;
};

function entryCalculator(entrants) {
  let result;
  if (
    typeof entrants === 'undefined' ||
    Object.entries(entrants).length === 0
  ) {
    result = 0;
  } else {
    result = sumPrice(entrants);
  }
  return result;
}

function animalMap() {
}

const setHours = (open, close) => {
  let result;
  if (close > 12) {
    close -= 12;
  }
  if (open === 0 && close === 0) {
    result = 'CLOSED';
  } else {
    result = `Open from ${open}am until ${close}pm`;
  }
  return result;
};

function schedule(options) {
  const days = Object.keys(data.hours);
  const hours = Object.values(data.hours);

  const result = {};
  if (typeof options === 'undefined') {
    days.forEach((day, index) => {
      const hour = setHours(hours[index].open, hours[index].close);
      result[day] = hour;
      index += 1;
    });
  } else {
    const hour = setHours(data.hours[options].open, data.hours[options].close);
    result[options] = hour;
  }
  console.log(result);
  return result;
}

schedule('Monday');

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
