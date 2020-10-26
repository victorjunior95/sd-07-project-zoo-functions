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
  return ids.map(idAnimal => data.animals.find(animals => animals.id === idAnimal));
}

function animalsOlderThan(animal, age) {
  const animalList = data.animals.find(animalName => animalName.name === animal);
  const animalAge = animalList.residents.every(animalName => animalName.age >= age);
  return animalAge;
}
function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  return data.employees.find(({ firstName, lastName }) =>
  firstName === employeeName || lastName === employeeName,
  );
}

function createEmployee(personalInfo, associatedWith) {
  const newEmployee = {
    id: personalInfo.id,
    firstName: personalInfo.firstName,
    lastName: personalInfo.lastName,
    managers: [associatedWith.managers[0],
      associatedWith.managers[1]],
    responsibleFor: [associatedWith.responsibleFor[0],
      associatedWith.responsibleFor[1],
      associatedWith.responsibleFor[2]],
  };
  return newEmployee;
}

function isManager(id) {
  if (data.employees.find(({ managers }) =>
    managers.find(manager => manager === id) !== undefined)) {
    return true;
  }
  return false;
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  if (managers === undefined) {
    managers = [];
  }
  if (responsibleFor === undefined) {
    responsibleFor = [];
  }
  const employee = {
    id, firstName, lastName, managers, responsibleFor,
  };
  return data.employees.push(employee);
  // return data.employees.map(add => data.employees.push(employee));
}

function animalCount(species) {
  if (species === undefined) {
    return data.animals.reduce((acummulation, arrayAnimal) =>
    Object.assign(acummulation, { [arrayAnimal.name]: arrayAnimal.residents.length }),
    {});
  } return data.animals.find(residents => residents.name === species).residents.length;
  // Linha 71 a variável Object.assign foi retirada do projeto do
  // Luciono.B, antes o processo estava.
  // V
  // let family;
  // const acc = {};
  // return data.animals.filter(typeAnimal => typeAnimal.name === species)
  // if (species === undefined) {
  //   const count =  data.animals.map((type) => {
  //     acc[type.name] = type.residents.length;
  //     return acc;
  //   });
  //   family = count[0];
  // } else {
  //   const count = data.animals.find(type => type.name === species);
  //   family = count.residents.length;
  // }
}

function entryCalculator(entrants = {}) {
  return (Object.keys(entrants).reduce((sum, currentValue) =>
    sum + (entrants[currentValue] * data.prices[currentValue])
  , 0));
}

// const objectInicial = {
//   NE = [],
//   NW = [],
//   SE = [],
//   Sw = [],
// }

function animalMap(options = {}) {
  const out = { NE: [], NW: [], SE: [], SW: [] };
  if (options.includeNames !== true) {
    data.animals.forEach(({ location, name }) => out[location].push(name));
    return out;
  }
  if (options.sex !== undefined) {
    data.animals.forEach(({ name, location, residents }) =>
      out[location].push({
        [name]: residents
          .filter(resident => resident.sex === options.sex)
          .map(resident => resident.name),
      }),
    );
  } else {
    data.animals.forEach(({ name, location, residents }) =>
      out[location].push({ [name]: residents.map(resident => resident.name) }),
    );
  }
  if (options.sorted) {
    Object.keys(out).forEach(key =>
      out[key].forEach(element => element[Object.keys(element)].sort()),
    );
  }
  return out;
}

function schedule(dayName) {
  const out = {};
  Object.keys(data.hours).forEach(function (hour) {
    if (data.hours[hour].open === data.hours[hour].close) {
      out[hour] = 'CLOSED';
    } else {
      out[hour] = `Open from ${data.hours[hour].open}am until ${data.hours[hour].close - 12}pm`;
    }
  });
  if (dayName !== undefined) {
    return { [dayName]: out[dayName] };
  }
  return out;
}

// acompanhado pelo Platão com o Isaac esqueci o nome do colega.
function oldestFromFirstSpecies(id) {
  const { residents } = data.animals.find(
    animal => animal.id === data.employees.find(element => element.id === id).responsibleFor[0],
  );
  const myAnimal = residents.reduce((acc, animal) => (acc.age > animal.age ? acc : animal));
  return [myAnimal.name, myAnimal.sex, myAnimal.age];
}

function increasePrices(percentage) {
  Object.keys(data.prices).map(
    key => (data.prices[key] = Math.round(data.prices[key] * ((percentage / 100) + 1) * 100) / 100),
  );
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
