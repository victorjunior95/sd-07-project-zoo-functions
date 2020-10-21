const { animals, employees, prices, hours } = require('./data');
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
  const zooAnimal = [];
  ids.forEach((element) => { zooAnimal.push(animals.find(a => a.id === element)); });
  return zooAnimal;
}

function animalsOlderThan(animal, age) {
  const thisBuddy = animals.find(an => an.name === animal);
  const oldBuddy = thisBuddy.residents.every(they => they.age > age);
  return oldBuddy;
}

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  return employees.find(({ firstName, lastName }) =>
  firstName === employeeName || lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return employees.some(employee => employee.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return employees
  .push(createEmployee({ id, firstName, lastName }, { managers, responsibleFor }));
}

function animalCount(species) {
  const ammount = {};
  animals.forEach(({ name, residents }) => (ammount[name] = residents.length));
  return species === undefined ? ammount : ammount[species];
}

function entryCalculator(entrants = {}) {
  const { Adult: A = 0, Senior: S = 0, Child: C = 0 } = entrants;
  return (prices.Adult * A) + (prices.Senior * S) + (prices.Child * C);
}

const local = { NE: [], NW: [], SE: [], SW: [] };

function catLocals() {
  return animals.reduce((acc, animal) => {
    const nameAnimal = animal.name;
    return {
      ...acc,
      [animal.location]: [...acc[animal.location], nameAnimal],
    };
  }, local);
}

function catSexAndSorted(sorted, sex) {
  return animals.reduce((acc, animal) => {
    const nameAnimal = animal.residents
    .filter((resident) => {
      if (sex !== undefined) return resident.sex === sex;
      return true;
    })
    .map(resident => resident.name);

    if (sorted) nameAnimal.sort();

    return {
      ...acc,
      [animal.location]: [...acc[animal.location], { [animal.name]: nameAnimal }],
    };
  }, local);
}

function animalMap(options = {}) {
  const { includeNames = false, sorted = false, sex } = options;

  if (includeNames) {
    return catSexAndSorted(sorted, sex);
  }
  return catLocals();
}

function schedule(dayName) {
// MDN: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries
  const sched = Object.fromEntries(
    Object.entries(hours)
    .map(([key, hour]) => {
      if (key !== 'Monday') {
        return ([key, `Open from ${hour.open}am until ${hour.close - 12}pm`]);
      }
      return ([key, 'CLOSED']);
    }));

  if (!dayName) {
    return sched;
  }
  return ({ [dayName]: sched[dayName] });
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
}

function increasePrices(percentage) {
  Object.entries(prices)
  .forEach(([key, price]) => (data.prices[key] = (Math
  .round((price + (price * (percentage / 100))) * 100) / 100)));
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
