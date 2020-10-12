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
  if (ids === undefined) {
    return [];
  }
  return ids.map(id => data.animals.find(animal => animal.id === id));
  // const result = data.animals.filter(element => ids.find((item) => {
  //   // if (element.id === item) {
  //   //   return element;
  //   // }
  //   // return undefined;
  //   return element.id === item;
  // }));
}
function animalsOlderThan(animal, age) {
  const animalType = data.animals.find(element => element.name === animal);
  return animalType.residents.every(elem => elem.age >= age);
}
//  suporte para a função employeeByName(), diminuindo assim sua complexidade.
const fname = employeeName => data.employees.find(name => name.firstName === employeeName);
const lname = employeeName => data.employees.find(name => name.lastName === employeeName);
function employeeByName(employeeName) {
  if (employeeName === undefined) { return {}; }
  return fname(employeeName) || lname(employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  const newEmployee = Object.assign(personalInfo, associatedWith);
  return newEmployee;
}

function isManager(id) {
  const trueManager = data.employees.map(employee => employee.managers.some(item => item === id));
  return trueManager.some(element => element === true);
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  if (species === undefined) {
    const all = {};
    data.animals.forEach(item => (all[item.name] = item.residents.length));
    return all;
  }
  const animalSpecie = data.animals.find(element => element.name === species).residents.length;
  return animalSpecie;
}

// console.log(animalCount());

function entryCalculator(entrants) {
  if (entrants === undefined || entrants === {}) {
    return 0;
  }
  let sum = 0;
  Object.keys(entrants).forEach(element => (sum += data.prices[element] * entrants[element]));
  return sum;
}

function animalMap(options = {}) {
  const all = { NE: [], NW: [], SE: [], SW: [] };
  if (options.includeNames !== true) {
    data.animals.forEach(({ location, name }) => all[location].push(name));
    return all;
  }
  if (options.sex !== undefined) {
    data.animals.forEach(({ name, location, residents }) =>
      all[location].push({
        [name]: residents
          .filter(element => element.sex === options.sex)
          .map(element => element.name),
      }),
      );
  } else {
    data.animals.forEach(({ name, location, residents }) =>
      all[location].push({ [name]: residents.map(element => element.name) }),
    );
  }
  if (options.sorted) {
    Object.keys(all).forEach(key =>
      all[key].forEach(element => element[Object.keys(element)].sort()),
    );
  }
  return all;
}

function schedule(dayName) {
  const all = {};
  Object.keys(data.hours).forEach(function (element) {
    if (data.hours[element].open === data.hours[element].close) {
      all[element] = 'CLOSED';
    } else {
      all[element] = `Open from ${data.hours[element].open}am until ${data.hours[element].close - 12}pm`;
    }
  });
  if (dayName !== undefined) {
    return { [dayName]: all[dayName] };
  }
  return all;
}

function oldestFromFirstSpecies(id) {
  const { residents } = data.animals.find(
    name => name.id === data.employees.find(element => element.id === id).responsibleFor[0],
  );
  const OlderAnimal = residents.reduce((acc, animal) => (acc.age > animal.age ? acc : animal));
  return [OlderAnimal.name, OlderAnimal.sex, OlderAnimal.age];
}

function increasePrices(percentage) {
  Object.keys(data.prices).map(
    element => (data.prices[element] = Math.round(data.prices[element]
      * ((percentage / 100) + 1) * 100) / 100),
  );
  console.log(data.prices);
}

function employeeCoverage(idOrName) {
//   if (idOrName === undefined) {
//     const all = {};
//     data.employees.forEach(
//       employeeSelected =>
//         (all[
//           `${employeeSelected.firstName} ${employeeSelected.lastName}`
//         ] = employeeSelected.responsibleFor.map(
//           isresponsible => data.animals.find(animal => animal.id === isresponsible).name,
//         )),
//         );
//     return all;
//   }
//   const employeer = data.employees.find(
//     employeeSelected =>
//       employeeSelected.firstName === idOrName ||
//       employeeSelected.lastName === idOrName ||
//       employeeSelected.id === idOrName,
//   );
//   const responsible = employeer.responsibleFor.map(
//     isresponsible => data.animals.find(animal => animal.id === isresponsible).name,
//   );
//   return { [`${employeer.firstName} ${employeer.lastName}`]: responsible };
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
//  Referência bibliográfica.
//  https://github.com/tryber/sd-07-project-zoo-functions/pull/17/files
