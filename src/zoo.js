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

const { animals } = data;
const { employees } = data;

function animalsByIds(...ids) {
  const out = [];
  ids.forEach(element => out.push(animals.find(animal => animal.id === element)));
  return out;
}

function animalsOlderThan(animal, age) {
  return animals
    .find(element => element.name === animal)
    .residents.every(resident => resident.age > age);
}

function employeeByName(employeeName) {
  const out = {};
  Object.assign(
    out,
    employees.find(
      employee => employee.firstName === employeeName || employee.lastName === employeeName,
    ),
  );
  return out;
}

function createEmployee({ id, firstName, lastName }, { managers, responsibleFor }) {
  return Object.assign({}, { id, firstName, lastName, managers, responsibleFor });
}

function isManager(id) {
  return employees.some(employee => employee.managers.some(manager => manager === id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  if (species === undefined) {
    const out = {};
    animals.forEach(animal => (out[animal.name] = animal.residents.length));
    return out;
  }
  return animals.find(animal => animal.name === species).residents.length;
}

function entryCalculator(entrants = {}) {
  let price = 0;
  Object.keys(entrants).forEach(segment => (price += data.prices[segment] * entrants[segment]));
  return price;
}

function animalMap(options = {}) {
  const out = { NE: [], NW: [], SE: [], SW: [] };
  if (options.includeNames) {
    if (options.sex !== undefined) {
      animals.forEach(({ name, location, residents }) =>
        out[location].push({
          [name]: residents
            .filter(resident => resident.sex === options.sex)
            .map(resident => resident.name),
        }),
      );
    } else {
      animals.forEach(({ name, location, residents }) =>
        out[location].push({ [name]: residents.map(resident => resident.name) }),
      );
    }

    if (options.sorted) {
      Object.keys(out).forEach(element =>
        out[element].forEach(element => element[Object.keys(element)].sort()),
      );
    }
  } else if (options.includeNames === undefined || options.includeNames === false) {
    animals.forEach(({ location, name }) => out[location].push(name));
  }
  return out;
}

function schedule(dayName) {
  const out = {};
  Object.keys(data.hours).forEach(hour => {
    if (data.hours[hour].open === data.hours[hour].close) {
      out[hour] = 'CLOSED';
    } else {
      out[hour] = `Open from ${data.hours[hour].open}am until ${data.hours[hour].close - 12}pm`;
    }
  });
  if (dayName !== undefined) {
    return { [dayName]: out[dayName] };
  }
  return out;
}

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
