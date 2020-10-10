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
const [lions, tigers, bears, penguins, otters, frogs, snakes, elephants, giraffes] = animals;

function animalsByIds(...ids) {
  // seu código aqui
  const { animals } = data;
  const result = [];
  ids.forEach((idCode) => {
    const search = animals.find((id, index) => animals[index].id === idCode);
    if (search !== undefined) {
      result.push(search);
    }
    return result;
  })
  return result;
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  const { animals } = data;
  const searchAnimal = animals.find((name, index) => animals[index].name === animal);
  const { residents } = searchAnimal;
  const result = residents.every((resident) => resident.age > age);
  return result;
}

function employeeByName(employeeName) {
  // seu código aqui
  const { employees } = data;
  let result = {};
  let search = employees.find((firstName, index) => employees[index].firstName === employeeName);
    if (search === undefined) {
      search = employees.find((lastName, index) => employees[index].lastName === employeeName);
      if (search !== undefined) {
        result = search;
      }
    } else {
      result = search;
    }
  return result;
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  const { managers, responsibleFor } = associatedWith;
  personalInfo.managers = managers;
  personalInfo.responsibleFor = responsibleFor;
  return personalInfo;
}

function isManager(id) {
  // seu código aqui
  const { employees } = data;
  const result = employees.some((employee) => {
    const managersArray = employee.managers;
    if (managersArray.some((idCode) => idCode === id) === true) {
      return true;
    }
  })
  return result;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  const { employees } = data;
  const newEmployee = {};
  newEmployee.id = id;
  newEmployee.firstName = firstName;
  newEmployee.lastName = lastName;
  newEmployee.managers = managers;
  newEmployee.responsibleFor = responsibleFor;
  return employees.push(newEmployee);
}

function animalCount(species) {
  // seu código aqui
  const { animals } = data;
  const [lions, tigers, bears, penguins, otters, frogs, snakes, elephants, giraffes] = animals;
  let result = {};
  const search = animals.find((animal) => animal.name === species);
  if (search === undefined) {
    result.lions = lions.residents.length;
    result.tigers = tigers.residents.length;
    result.bears = bears.residents.length;
    result.penguins = penguins.residents.length;
    result.otters = otters.residents.length;
    result.frogs = frogs.residents.length;
    result.snakes = snakes.residents.length;
    result.elephants = elephants.residents.length;
    result.giraffes = giraffes.residents.length;
  } else {
    result = search.residents.length;
  }
  return result;
}

function entryCalculator(entrants) {
  // seu código aqui
  const { prices } = data;
  let result = 0;
  if (entrants === undefined) {
    return result;
  }
  if (entrants.hasOwnProperty('Adult')) {
    const adultsNumber = entrants.Adult * 49.99;
    result += adultsNumber;
  }
  if (entrants.hasOwnProperty('Senior')) {
    const seniorsNumber = entrants.Senior * 24.99;
    result += seniorsNumber;
  }
  if (entrants.hasOwnProperty('Child')) {
    const childsNumber = entrants.Child * 20.99;
    result += childsNumber;
  }
  return result;
}

function animalMap(options) {
  // seu código aqui
  const { animals } = data;
  const result = {};
  result.NE = [];
  result.NW = [];
  result.SE = [];
  result.SW = [];
  if (typeof options === 'object') {
    if (options.includeNames === true) {
      animals.forEach((animal) => {
        const obj = {}
        result[`${animal.location}`].push(obj);
        obj[`${animal.name}`] = [];
        let residentsArray = animal.residents;
        if (options.sex === 'female') {
          residentsArray = residentsArray.filter((resident) => resident.sex === 'female');
        }
        residentsArray.forEach((resident) => obj[`${animal.name}`].push(resident.name));
        if (options.sorted === true) {
          obj[`${animal.name}`].sort();
        }
      })
    } else {
      animals.forEach((animal) => {
        result[`${animal.location}`].push(animal.name);
      })  
    }
  } else {
    animals.forEach((animal) => {
      result[`${animal.location}`].push(animal.name);
    })
  }
  return result;
}

function schedule(dayName) {
  // seu código aqui
  const { hours } = data;
  const workingPeriod = {};
  Object.entries(hours).forEach((day) => workingPeriod[`${day[0]}`] = `Open from ${day[1].open}am until ${day[1].close - 12}pm`)
  workingPeriod.Monday = 'CLOSED';
  if (dayName === undefined) {
    return workingPeriod;
  }
  const weekDayWorkingPeriod = {};
  weekDayWorkingPeriod[`${dayName}`] = workingPeriod[`${dayName}`];
  return weekDayWorkingPeriod;
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
  const { animals, employees } = data;
  const employee = employees.find((employee) => employee.id === id);
  const employeeFirstAnimal = animals.find((animal) => employee.responsibleFor[0] === animal.id)
  let oldestAnimal = undefined;
  let oldestAnimalAge = 0;
  employeeFirstAnimal.residents.forEach((resident) => {
    if (resident.age > oldestAnimalAge) {
      oldestAnimalAge = resident.age;
      oldestAnimal = resident;
    }
  })
  const { name, sex, age } = oldestAnimal;
  const result = [name, sex, age];
  return result;
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
