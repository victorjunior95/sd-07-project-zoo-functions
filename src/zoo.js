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

const listaAnimal = data.animals;

const listaEmployees = data.employees;

const listaPreco = data.prices;

const listaHorario = data.hours;

function animalsByIds(...ids) {
  const IdAnimal = [];
  if (ids.length === 0) {
    return IdAnimal;
  }
  for (const item = 0; item < ids.length; item + 1) {
    IdAnimal[item] = listaAnimal.find(elemento => elemento.id === ids[item]);
  }
  return IdAnimal;
}

function animalsOlderThan(animal, age) {
  const comparaEspecie = listaAnimal.find(nomeAnimal => nomeAnimal.name === animal);
  const comparaAge = comparaEspecie.residents.every(nomeAnimal => nomeAnimal.age > age);
  return comparaAge;
}

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  const employeeResponseName = listaEmployees.find((elemento) => {
    const name = elemento.firstName === employeeName;
    const finalName = elemento.lastName === employeeName;
    return name || finalName;
  });
  return employeeResponseName;
}

function createEmployee(personalInfo, associatedWith) {
  const newEmployee = {
    id: personalInfo.id,
    firstName: personalInfo.firstName,
    lastName: personalInfo.lastName,
    managers: [associatedWith.managers[0], associatedWith.managers[1]],
    responsibleFor: [
      associatedWith.responsibleFor[0],
      associatedWith.responsibleFor[1],
      associatedWith.responsibleFor[2],
    ],
  };
  return newEmployee;
}

function isManager(id) {
  const filtraManagers = listaEmployees.some((elemento) => {
    let result = false;
    for (let key = 0; key < elemento.managers.length; key + 1) {
      if (elemento.managers[key] === id) {
        result = true;
      }
    }
    return result;
  });
  return filtraManagers;
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  if (managers === undefined) {
    managers = [];
  }
  if (responsibleFor === undefined) {
    responsibleFor = [];
  }
  const lastEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  listaEmployees.push(lastEmployee);
}

function animalCount(species) {
  let resultado;
  const Count = {};
  if (species === undefined) {
    const resulta = listaAnimal.map((elemento) => {
      Count[elemento.name] = elemento.residents.length;
      return Count;
    });
    resultado = resulta[0];
  } else {
    const result = listaAnimal.find(elemento => elemento.name === species);
    resultado = result.residents.length;
  }
  return resultado;
}

function entryCalculator(entrants) {
  let resultado;
  if (entrants === undefined || entrants === {}) {
    resultado = 0;
  } else {
    const { Adult = 0, Child = 0, Senior = 0 } = entrants;
    const adultPreco = listaPreco.Adult * Adult;
    const childPreco = listaPreco.Child * Child;
    const seniorPreco = listaPreco.Senior * Senior;
    resultado = adultPreco + childPreco + seniorPreco;
  }
  return resultado;
}

function animalMap(options) {
  // seu código aqui
}

function schedule(...dayName) {
  let resultado = {};
  if (dayName.length === 0) {
    dayName = Object.keys(listaHorario);
  }
  dayName.forEach((diasemana) => {
    if (diasemana !== 'Monday') {
      resultado = { ...resultado, [diasemana]: `Open from ${listaHorario[diasemana].open}am until ${listaHorario[diasemana].close - 12}pm` };
    } else {
      resultado = { ...resultado, [diasemana]: 'CLOSED' };
    }
  });
  return resultado;
}

// corrigindo teste

function oldestFromFirstSpecies(id) {
  const employee = listaEmployees
    .filter(elemento => elemento.id === id)
    .map(elemento => elemento.responsibleFor[0]);
  const animalResp = listaAnimal
    .filter(elemento => elemento.id === employee[0])
    .map(elemento => elemento.residents.sort((a, b) => a.age - b.age))[0];
  const animalVelho = animalResp.map(elemento => elemento);
  const maisVelho = animalVelho[animalVelho.length - 1];
  return [maisVelho.name, maisVelho.sex, maisVelho.age];
}

function increasePrices(percentage) {
  const adulto = (listaPreco.Adult / 100) * percentage;
  const crianca = (listaPreco.Child / 100) * percentage;
  const idoso = (listaPreco.Senior / 100) * percentage;
  const resultAdult = (listaPreco.Adult + adulto).toFixed(2);
  const resultChild = (listaPreco.Adult + crianca).toFixed(2);
  const resultenior = (listaPreco.Adult + idoso).toFixed(2);

  listaPreco.Adult = parseFloat(resultAdult);
  listaPreco.Child = parseFloat(resultChild);
  listaPreco.Senior = parseFloat(resultenior);
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
