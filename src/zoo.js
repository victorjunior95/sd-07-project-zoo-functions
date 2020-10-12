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
  const coleted = [];
  const verify = (idResearched) => {
    coleted.push((data.animals.find(animals => animals.id === idResearched)));
  };
  ids.forEach(verify);
  return coleted;
}

function animalsOlderThan(animal, age) {
  const search = data.animals.find(species => animal === species.name).residents;
  return search.every(ages => ages.age >= age);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  return data.employees.find(employee =>
    employee.firstName === employeeName || employee.lastName === employeeName,
  );
}

function createEmployee(personalInfo, associatedWith) {
  const result = {
    id: personalInfo.id,
    firstName: personalInfo.firstName,
    lastName: personalInfo.lastName,
    managers: associatedWith.managers,
    responsibleFor: associatedWith.responsibleFor,
  };
  return result;
}

function isManager(id) {
  return data.employees.some(person => person.managers.includes(id));
}


function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  data.employees[data.employees.length] = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
}


function animalCount(species) {
  if (species === undefined) {
    const result = {};
    const verify = (iten, index) => {
      const animals = data.animals;
      result[animals[index].name] = iten.residents.length;
    };
    data.animals.forEach(verify);
    return result;
  }
  let count;
  const verifyAnimal = (iten) => {
    if (iten.name === species) {
      count = iten.residents.length;
    }
  };
  data.animals.forEach(verifyAnimal);

  return count;
}


function entryCalculator(entrants) {

}

function animalMap(options) {

}

function schedule(dayName) {
  const day = {};
  const everyDays = {};
  const dates = (iten, index) => {
    const datesZoo = Object.keys(data.hours);
    if (iten.open === 0) {
      everyDays[datesZoo[index]] = 'CLOSED';
    } else {
      everyDays[datesZoo[index]] = `Open from ${iten.open}am until ${iten.close - 12}pm`;
    }
  };
  const infoHours = Object.values(data.hours);
  infoHours.forEach(dates);
  if (dayName === undefined) {
    return everyDays;
  }
  day[dayName] = everyDays[dayName];
  return day;
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
}

function increasePrices(percentage) {
  const adult = Object.values(data.prices)[0] * Number(`0.${percentage}`);
  const resultAdult = Object.values(data.prices)[0] + adult + 0.001;
  const senior = Object.values(data.prices)[1] * Number(`0.${percentage}`);
  const resultSenior = Object.values(data.prices)[1] + senior + 0.001;
  const child = Object.values(data.prices)[2] * Number(`0.${percentage}`);
  const resultChild = Object.values(data.prices)[2] + child + 0.001;
  data.prices.Adult = parseFloat(resultAdult.toFixed(2));
  data.prices.Senior = parseFloat(resultSenior.toFixed(2));
  data.prices.Child = parseFloat(resultChild.toFixed(2));
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
