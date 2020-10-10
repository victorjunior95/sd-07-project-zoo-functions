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


/* PRIMEIRO COMMIT */
function animalsByIds(...ids) {
  const animalById = animalId => data.animals.filter(({ id }) => id === animalId);
  let animalsList = [];
  if (ids.length > 0) {
    animalsList = ids.reduce((acc, id) => [...acc, ...animalById(id)], []);
  }
  return animalsList;
}

function animalsOlderThan(animal, age) {
  return data.animals
    .find(({ name }) => name === animal)
    .residents
    .every(resident => resident.age >= age);
}

function employeeByName(employeeName) {
  const employeeFound = {};
  if (employeeName) {
    return data.employees
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
  return data.employees
    .find(({ managers }) =>
    managers.indexOf(id) >= 0) !== undefined;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  data.employees.push(
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
    return data.animals
      .find(({ name }) => name === species)
      .residents.length;
  }
  return data.animals
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

function animalMap({ includeNames = false, sorted = false, sex = '' } = {}) {
  const result = data.animals
    .reduce((acc, { location }) => ({ ...acc, [location]: [] }), {});
  if (!includeNames) {
    data.animals
      .forEach(({ name, location }) => result[location].push(name));
  } else {
    data.animals
      .forEach(({ name, location, residents }) => {
        let animalNames = [];
        if (sex) {
          animalNames = residents
            .filter(resident => resident.sex === sex)
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
    Object.entries(data.hours).map(([day, { open, close }]) => {
      if (!open && !close) {
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
