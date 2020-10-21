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
  const arrayEmpty = [];
  if (ids !== undefined) {
    return animals.filter(animal => animal.id === ids[0] || animal.id === ids[1]);
  }
  return arrayEmpty;
}

function animalsOlderThan(animal, age) {
  const { animals } = data;
  return animals.filter(anima => anima.name === animal)
  .every((resident, index) => resident.residents[index].age > age);
}
function employeeByName(employeeName) {
  const { employees } = data;
  let object = {};
  if (employeeName) {
    object = employees.filter(
      objectEmployer =>
        objectEmployer.firstName === employeeName ||
        objectEmployer.lastName === employeeName)[0];
  }
  return object;
}

function createEmployee(personalInfo, associatedWith) {
  return Object.assign(personalInfo, associatedWith);
}

function isManager(id) {
  const { employees } = data;
  return employees.some(({ managers }) => managers.some(manager => manager === id));
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {

}
function animalCount(species) {
  const { animals } = data;
  if (species === undefined) {
    return animals
      .reduce((acc, { name, residents }) =>
      ({ ...acc, [`${name}`]: residents.length }), {});
  }
  return animals
    .find(({ name }) => name === species)
    .residents.length;
}
function entryCalculator(entrants) {
  const { prices } = data;
  const returnZero = 0;

  if (entrants === undefined || Object.keys(entrants).length === 0) {
    return returnZero;
  }

  return Object.entries(entrants).reduce((acc, curr) => acc + (prices[curr[0]] * curr[1]), 0);
}

function animalMap(options) {
}

function schedule(dayName) {
  let cronogramaLegivel = {
    Friday: 'Open from 10am until 8pm',
    Monday: 'CLOSED',
    Saturday: 'Open from 8am until 10pm',
    Sunday: 'Open from 8am until 8pm',
    Thursday: 'Open from 10am until 8pm',
    Tuesday: 'Open from 8am until 6pm',
    Wednesday: 'Open from 8am until 6pm',
  };
  if (dayName === undefined) {
    return cronogramaLegivel;
  }
  if (dayName !== undefined) {
    const Entrie = [[dayName, cronogramaLegivel[dayName]]];
    cronogramaLegivel = Object.fromEntries(Entrie);
  }
  return cronogramaLegivel;
}

function oldestFromFirstSpecies(id) {
  const animalIds = data.employees.find(employeeId => employeeId.id === id).responsibleFor;

  const animalsData = data.animals.find(animalId => animalId.id === animalIds[0]);

  return Object.values(animalsData.residents.reduce((a, b) => (a.age > b.age ? a : b)));
}

function increasePrices(percentage) {
  const factor = ((percentage / 100) + 1);

  const ticketValue = data.prices;

  ticketValue.Adult = (Math.round(data.prices.Adult * factor * 100) / 100);
  ticketValue.Child = (Math.round(data.prices.Child * factor * 100) / 100);
  ticketValue.Senior = (Math.round(data.prices.Senior * factor * 100) / 100);

  return ticketValue;
}


function employeeCoverage(idOrName) {
  const result = Object.fromEntries(data.employees
    .map(({ firstName, lastName, responsibleFor }) => (
      [
        `${firstName} ${lastName}`,
        responsibleFor
          .map(animalId => data.animals
            .find(({ id }) => id === animalId).name),
      ]
    )));
  if (idOrName) {
    const employee = data.employees
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
