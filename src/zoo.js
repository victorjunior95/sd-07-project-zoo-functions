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
  const finded = ids.map(an => (ids === [] ? [] : data.animals.find(animal => animal.id === an)));
  return finded;
}

function animalsOlderThan(animal, age) {
  return data.animals.find(an => an.name === animal).residents.every(res => res.age > age);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  return data.employees.find(emp => emp.firstName === employeeName)
    || data.employees.find(emp => emp.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return data.employees.some(emp => emp.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  let count = {};
  if (species === undefined) {
    data.animals.forEach(an => (count[an.name] = an.residents.length));
  } else {
    count = data.animals.filter(an => an.name === species)
      .reduce((increment, an) => (increment += an.residents.length), 0);
  }
  return count;
}

function entryCalculator(entrants) {
  if (typeof entrants !== 'object' || entrants === {}) {
    return 0;
  }
  const visitors = Object.entries(entrants);
  const calc = visitors.reduce((increment, visit) => {
    increment += data.prices[visit[0]] * visit[1];
    return increment;
  }, 0);
  return calc;
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  const opens = Object.entries(data.hours);
  const days = opens
    .reduce((inc, [day, { open, close }]) => {
      inc[day] = `Open from ${open}am until ${close - 12}pm`;
      if (open === 0 && close === 0) {
        inc[day] = 'CLOSED';
      }
      return inc;
    }, {});
  if (dayName) {
    const someday = {};
    someday[dayName] = days[dayName];
    return someday;
  }
  return days;
}

function oldestFromFirstSpecies(id) {
  if (!id) return  null;
  const employee = data.employees.find(emp => emp.id === id);
  const { responsibleFor: [animalId] } = employee;
  const specie = data.animals.find(specime => specime.id === animalId);
  const value = Object.values;
  return specie.residents
    .reduce((old, val) => (value(val)[2] > value(old)[2] ? value(val) : value(old)));
}

function increasePrices(percentage) {
  const price = Object.entries(data.prices).reduce((more, val) => {
    more[val[0]] = parseFloat(Math.ceil(val[1] * (percentage + 100))) / 100;
    return more;
  }, {});
  data.prices = price;
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
