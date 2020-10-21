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

const { animals, employees, hours, prices } = data;

function animalsByIds(...ids) {
  return animals.filter(({ id }) => ids.includes(id));
}

function animalsOlderThan(animal, age) {
  return animals
    .find(({ name }) => name === animal)
      .residents
        .every(resident => resident.age >= age);
}

function employeeByName(employeeName) {
  const employeeFound = {};
  if (employeeName) {
    return employees
      .find(({ firstName, lastName }) => employeeName === firstName || employeeName === lastName);
  }
  return employeeFound;
}

function createEmployee({ id, firstName, lastName }, { managers, responsibleFor }) {
  return {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
}

function isManager(id) {
  return employees
    .find(({ managers }) => managers.indexOf(id) >= 0)
    !== undefined;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  employees.push(
    {
      id,
      firstName,
      lastName,
      managers,
      responsibleFor,
    },
  );
}

function animalCount(species) {
  if (species) {
    return animals
      .find(({ name }) => name === species)
      .residents.length;
  }
  return animals
    .sort((a, b) => a.name > b.name)
    .reduce((acc, { name, residents }) => ({ ...acc, [name]: residents.length }), {});
}

function entryCalculator(entries = {}) {
  if (Object.keys(entries).length) {
    return Object.entries(entries)
      .reduce((acc, [key, value]) => (acc += data.prices[key] * value), 0);
  }
  return 0;
}

function animalMap({ includeNames = false, sorted = false, sexParam = '' } = {}) {
  const result = animals
    .reduce((acc, { location }) => ({ ...acc, [location]: [] }), {});
  if (!includeNames) {
    animals
      .forEach(({ name, location }) => result[location].push(name));
  } else {
    animals
      .forEach(({ name, location, residents }) => {
        let animalNames = [];
        if (sexParam) {
          animalNames = residents
            .filter(({ sex }) => sex === sexParam)
            .map(resident => resident.name);
        } else {
          animalNames = residents
            .map(resident => resident.name);
        }
        if (sorted) {
          animalNames.sort();
        }
        result[location].push({ [name]: animalNames });
      });
  }
  return result;
}

function schedule(dayName = '') {
  const newSchedule = Object.fromEntries(
    Object.entries(hours).map(([day, { open, close }]) => {
      if (open === close) {
        return [day, 'CLOSED'];
      }
      return [day, `Open from ${open}am until ${close - 12}pm`];
    }),
  );
  if (dayName) {
    return { [dayName]: newSchedule[dayName] };
  }
  return newSchedule;
}

function oldestFromFirstSpecies(employeeId) {
  const animalId = employees.find(employee => employee.id === employeeId)
    .responsibleFor.shift();
  return Object.values(animals.find(({ id }) => id === animalId)
    .residents
      .sort((a, b) => b.age - a.age)
      .shift());
}

function increasePrices(percentage) {
  Object.keys(prices)
    .forEach((price) => {
      prices[price] =
      Math.ceil((prices[price] * (100 + percentage))) / 100;
    });
}

function employeeCoverage(idOrName = '') {
  const result = Object.fromEntries(employees
    .map(({ firstName, lastName, responsibleFor }) => (
      [
        `${firstName} ${lastName}`,
        responsibleFor
          .map(animalId => animals
            .find(({ id }) => id === animalId).name),
      ]
    )));
  if (idOrName) {
    const employee = employees
      .find(({ id, firstName, lastName }) =>
        idOrName === id
        || idOrName === firstName
        || idOrName === lastName);

    return { [`${employee.firstName} ${employee.lastName}`]: result[`${employee.firstName} ${employee.lastName}`] };
  }
  return result;
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
