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
}


function addEmployee(id, firstName, lastName, managers, responsibleFor) {

}
function animalCount(species) {
}


function entryCalculator(entrants) {
  const { prices } = data;
  let value = 0;
  for (let i in entrants) {
    value += entrants[i] * prices[i];
  }
  return value;
}
// console.log(entryCalculator({}));
// console.log(entryCalculator({ 'Child': 1, 'Senior': 1 }));

const namesResidentsLocation = (name, sex) => {
  const array = [];
  const arrayAll = [];

  animals
    .find(animal => animal.name === name)
    .residents.forEach((info) => {
      arrayAll.push(info.name);
      if (info.sex === sex) {
        array.push(info.name);
      }
    });
  if (sex) {
    return array;
  } else {
    return arrayAll;
  }
};
// console.log(namesResidentsLocation('lions'));

const nameAnimals = (region, sort = false, sex) => {
  const array = [];
  let object;

  animals
    .filter(animal => animal.location === region)
    .forEach(animal => {
      object = {};
      object[animal.name] = namesResidentsLocation(animal.name, sex);
      if (sort) {
        object[animal.name] = namesResidentsLocation(animal.name, sex).sort();
      }
      array.push(object);
    });

  return array;
};
// console.log(nameAnimals('NE'));


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

function oldestFromFirstSpecies(id) {
  // seu código aqui
}

function increasePrices(percentage) {
  //
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
