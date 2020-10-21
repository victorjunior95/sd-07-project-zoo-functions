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

const { animals, employees, hours } = require('./data');
const data = require('./data');

function animalsByIds(...ids) {
  const retorno = [];
  if (ids === undefined) {
    return [];
  }
  ids.forEach(numRef =>
    retorno.push(animals.find(animal => animal.id === numRef)),
  );
  return retorno;
}

// console.log(animals.find((nome)=>nome.name==='lions').residents.every(idade=>idade.age>=7));
function animalsOlderThan(animal, age) {
  return animals
    .find(nome => nome.name === animal)
    .residents.every(idade => idade.age >= age);
}

function employeeByName(employeeName) {
  // seu código aqui
  if (employeeName === undefined) {
    return {};
  }
  return Object.assign(
    ...employees.filter(
      nome =>
        nome.firstName === employeeName || nome.lastName === employeeName,
    ),
  );
}

function createEmployee(personalInfo, associatedWith) {
  const newObjectProprieties = Object.assign({}, personalInfo, associatedWith);
  return newObjectProprieties;
}

function isManager(id) {
  let retorno = false;
  retorno = employees.some(employee => employee.managers.includes(id));
  return retorno;
}
function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  if (managers === undefined) {
    managers = [];
  }
  if (responsibleFor === undefined) {
    responsibleFor = [];
  }
  const newEmployee = { id, firstName, lastName, managers, responsibleFor };
  // for (const index in newEmployee) {
  //   newEmployee[index] = (newEmployee[index] !== undefined) ? newEmployee[index] : [];
  // }
  // for (const index of Object.keys(newEmployee)) {
  //   if (newEmployee[index] === undefined) {
  //     newEmployee[index] = [];
  //   }
  // }
  employees.push(newEmployee);
}

function animalCount(species) {
  if (species === undefined) {
    const retorno = {};
    animals.forEach(
      animal => (retorno[`${animal.name}`] = `${animal.residents.length}`),
    );
    return retorno;
  }
  return animals.find(animal => animal.name === species).residents.length;
}

function entryCalculator(entrants) {
  if (entrants === undefined || entrants === {}) {
    return 0;
  }
  const { Adult = 0, Senior = 0, Child = 0 } = entrants;
  const resultado = (Adult * 49.99) + (Senior * 24.99) + (Child * 20.99);
  return resultado;
}

const options = { includeNames: true, sex: 'female', sorted: true }

function animalMap(options) {
  const locations = ['NE', 'NW', 'SE', 'SW'];
  if(options === undefined) {
    const retorno = {};
    locations.forEach((location => retorno[location]=animals.filter(animal=>animal.location===location).map(animalName=>animalName.name)));
    return retorno;
  }
} 

function schedule(dayName) {
  const arrayOfReturn = {};
  const arrayofEntries = Object.entries(hours);
  // console.log(arrayofEntries);
  arrayofEntries.forEach((valor) => {
    if (valor[1].open === valor[1].close) {
      arrayOfReturn[valor[0]] = 'CLOSED';
    } else {
      arrayOfReturn[valor[0]] = `Open from ${valor[1].open}am until ${
        valor[1].close - 12
      }pm`;
    }
  });
  let result = arrayOfReturn;
  if (dayName === undefined) {
    return result;
  } else {
    return result.find(value => value[0] === dayName);
  }
}

console.log(schedule());

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
