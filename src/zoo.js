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
  return data.animals.filter(animal => ids.includes(animal.id));
}

function animalsOlderThan(animal, age) {
  const animals = data.animals.find(({ name }) => name === animal);
  return animals.residents.every(resident => resident.age >= age);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  return data.employees.find(
    employee =>
      employeeName.includes(employee.firstName) ||
      employeeName.includes(employee.lastName),
  );
}

function createEmployee(personalInfo, associatedWith) {
  const newEmployee = { ...personalInfo, ...associatedWith };
  return newEmployee;
}

function isManager(id) {
  return data.employees.some(employee => employee.managers.includes(id));
}

function addEmployee(
  id,
  firstName,
  lastName,
  managers = [],
  responsibleFor = [],
) {
  const newEmployee = { id, firstName, lastName, managers, responsibleFor };
  data.employees.push(newEmployee);
}

function animalCount(species) {
  if (species === undefined) {
    const animalsAndQuatities = {};
    data.animals.forEach((animal) => {
      animalsAndQuatities[animal.name] = animal.residents.length;
    });
    return animalsAndQuatities;
  }
  const givenSpecies = data.animals.find(animal =>
    animal.name.includes(species),
  );
  return givenSpecies.residents.length;
}

function entryCalculator(entrants) {
  if (entrants === undefined || entrants.length === 0) return 0;
  const { Adult = 0, Child = 0, Senior = 0 } = entrants;
  const adultPrice = data.prices.Adult * Adult;
  const childPrice = data.prices.Child * Child;
  const seniorPrice = data.prices.Senior * Senior;
  const total = adultPrice + childPrice + seniorPrice;
  return total;
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  const userSchedule = {};
  if (dayName === undefined) {
    const keys = Object.keys(data.hours);
    keys.forEach(key => {
      if (key === 'Monday') {
        userSchedule[key] = 'CLOSED';
      } else {
        const closingHour = Object.values(data.hours[key])[1];
        const closingHourTwelve = closingHour - 12;
        userSchedule[key] = `Open from ${
          Object.values(data.hours[key])[0]
        }am until ${closingHourTwelve}pm`;
      }
    });
  } else {
    if (dayName === 'Monday') {
      userSchedule[dayName] = 'CLOSED';
    } else {
      const closingHour = Object.values(data.hours[dayName])[1];
      const closingHourTwelve = closingHour - 12;
      userSchedule[dayName] = `Open from ${
        Object.values(data.hours[dayName])[0]
      }am until ${closingHourTwelve}pm`;
    }
  }
  return userSchedule;
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
