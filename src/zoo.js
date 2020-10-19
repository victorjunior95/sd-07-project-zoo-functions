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

// const { animals } = require('./data');
const { animals, employees, prices } = require('./data');
const data = require('./data');

function animalsByIds(...ids) {
  const arrayEmpty = [];
  if (ids !== undefined) {
    return animals.filter(animal => animal.id === ids[0] || animal.id === ids[1]);
  }
  return arrayEmpty;
}

function animalsOlderThan(animal, age) {
  return animals.filter(anima => anima.name === animal)
    .every((resident, index) => resident.residents[index].age > age);
}

function employeeByName(employeeName) {
  const objectEmpty = {};
  if (employeeName !== undefined) {
    return employees.filter((employee, index) =>
      employee.firstName === employeeName || employee.lastName === employeeName)[0];
  }
  return objectEmpty;
}


function createEmployee(personalInfo, associatedWith) {
  return Object.assign(personalInfo, associatedWith);
}

function isManager(id) {
  let arrayResul = [];
  arrayResul = employees.map(employee => employee.managers.includes(id));
  if (arrayResul.includes(true)) {
    return true;
  }
  return false;
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  if (managers === undefined || responsibleFor === undefined) {
    employees.push({ id, firstName, lastName, managers: [], responsibleFor: [] });
    return employees;
  }
  employees.push({ id, firstName, lastName, managers, responsibleFor });
  return employees;
}

function animalCount(species) {
  const arrayObjectAnimals = {};

  if (species !== undefined) {
    return animals.filter(animal => (animal.name === species))
      .map(animal => animal.residents.length)[0];
  }
  animals.forEach(({ name, residents }) => {
    arrayObjectAnimals[name] = residents.length;
  });
  return arrayObjectAnimals;
}

function entryCalculator(entrants) {
  const returnZero = 0;

  if (entrants === undefined || Object.keys(entrants).length === 0) {
    return returnZero;
  }

  return Object.entries(entrants).reduce((acc, curr) => acc + (prices[curr[0]] * curr[1]), 0);
}

function animalMap(options) {
  // seu código aqui
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

// console.log(schedule('Friday'));
function OldestAnimal(id) {
  let arrayWithAnimal = '';
  arrayWithAnimal = animals.filter(animal => animal.id === id)
    .map(resident => resident.residents)[0].sort((a, b) => b.age - a.age)[0];
  return Object.values(arrayWithAnimal);
}

function oldestFromFirstSpecies(id) {
  let firstAnimal = '';
  let arrayWithData = [];
  firstAnimal = employees.find(employee => employee.id === id).responsibleFor[0];
  arrayWithData = OldestAnimal(firstAnimal);
  return arrayWithData;
}
// console.log(oldestFromFirstSpecies('9e7d4524-363c-416a-8759-8aa7e50c0992'));
const twoDecimal = (value, percent) => Math.round(value * percent * 100) / 100;
function increasePrices(percentage) {
  const { Adult, Senior, Child } = data.prices;
  const percent = 1 + (percentage / 100);
  data.prices.Adult = parseFloat(twoDecimal(Adult, percent));
  data.prices.Senior = parseFloat(twoDecimal(Senior, percent));
  data.prices.Child = parseFloat(twoDecimal(Child, percent));
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

console.log(employeeCoverage());
//  console.log(employeeCoverage());
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
