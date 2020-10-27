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
const { animals, employees } = require('./data');

function animalsByIds(...ids) {
  return animals.filter(animal => ids.includes(animal.id));
}

function animalsOlderThan(animal, age) {
  const species = animals.find(anima => anima.name === animal);
  return species.residents.every(resident => resident.age >= age);
}

function employeeByName(employeeName) {
  if (employeeName) {
    return data.employees.find(names => names.firstName === employeeName
      || names.lastName === employeeName);
  }
  return {};
}

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  const newEmployee = { id, firstName, lastName, managers, responsibleFor };
  return newEmployee;
}

function isManager(id) {
  return employees.some(manage => manage.managers.find(ids => ids === id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return employees.push(
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
  if (animalCount.arguments.length === 0) {
    const allAnimals = {};
    animals.forEach((animalGroup) => {
      allAnimals[animalGroup.name] = animalGroup.residents.length;
    });

    return allAnimals;
  }

  return animals.find(animalGroup => animalGroup.name === species).residents.length;
}

function entryCalculator(entrants) {
  if (!entrants) return 0;
  if (!Object.keys(entrants)) return 0;
  const { Adult = 0, Child = 0, Senior = 0 } = entrants;
  return (Adult * 49.99) + (Child * 20.99) + (Senior * 24.99);
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  const scheduleObj = {
    Tuesday: 'Open from 8am until 6pm',
    Wednesday: 'Open from 8am until 6pm',
    Thursday: 'Open from 10am until 8pm',
    Friday: 'Open from 10am until 8pm',
    Saturday: 'Open from 8am until 10pm',
    Sunday: 'Open from 8am until 8pm',
    Monday: 'CLOSED',
  };
  const scheduleDay = {};
  if (!dayName) return scheduleObj;
  scheduleDay[dayName] = scheduleObj[dayName];
  return scheduleDay;
}

function oldestFromFirstSpecies(id) {
  const EmployeObj = employees.find(employeId => employeId.id === id);
  const firstSpecie = animals.find(animal => animal.id === EmployeObj.responsibleFor[0]);

  let maxAge = 0;
  let oldResident;
  const result = [];
  firstSpecie.residents.map((resident) => {
    if (resident.age > maxAge) {
      maxAge = resident.age;
      oldResident = resident;
    }
    return oldResident;
  });
  result[0] = oldResident.name;
  result[1] = oldResident.sex;
  result[2] = oldResident.age;
  return result;
}

function increasePrices(percentage) {
  // seu código aqui
}
// Com ajuda do eric vinicius
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
