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
  // seu código aqui
  const result = [];
  if (ids !== undefined) {
    for (let i = 0; i < ids.length; i += 1) {
      data.animals.filter((animal) => {
        if (animal.id === ids[i]) {
          result.push(animal);
          return true;
        }
        return false;
      });
    }
  }
  return result;
}
function animalsOlderThan(animal, age) {
  // seu código aqui
  const lista = data.animals.find(bicho => bicho.name === animal)
  .residents.every(item => item.age >= age);
  return (lista);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) return {};
  // seu código aqui
  return data.employees
  .find(name => name.firstName === employeeName || name.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  return {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
}

function isManager(id) {
    // seu código aqui
  const gerente = data.employees.filter(item => item.managers.includes(id));
  return (gerente.length > 0);
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  const worker = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  data.employees.push(worker);
}

function animalCount(species) {
  const animais = {};
  data.animals.forEach((item) => {
    const linha = item.name;
    const quant = item.residents.length;
    animais[linha] = quant;
  });
  if (species === undefined) {
    return animais;
  }
  return animais[species];
}

function entryCalculator(entrants) {
  // seu código aqui
  if (entrants === undefined || entrants === []) return 0;
  let total = 0;
  const { Adult, Child, Senior } = entrants;
  if (Adult !== undefined) total += (Adult * 49.99);
  if (Child !== undefined) total += (Child * 20.99);
  if (Senior !== undefined) total += (Senior * 24.99);
  return total;
}

function animalMap(options) {
  const local = { NE: [], NW: [], SE: [], SW: [] };
  if (options === undefined) {
    data.animals.forEach((item) => {
    local[item.location].push(item.name);
    });
    return local;
  }
  const { includeNames, sorted, sex } = options;
  data.animals.forEach((animal) => {
  let item = {};
        if (includeNames) {
          item[animal.name] = animal.residents;
        if (sex === 'male'){
          item[animal.name] = item[animal.name].filter((sexo) => {
    if (sex !== undefined) {return (sexo.sex === 'male') } return true });
            } else if (sex === 'female') {
      item[animal.name] = item[animal.name].filter((sexo) => {
        if (sex !== undefined) {return (sexo.sex === 'female'); } return true; });
      }
    item[animal.name] = item[animal.name].map(um => um.name);
    if (sorted === true) {
    item[animal.name] = item[animal.name].sort();
  }
  } else{ item = animal.name; }
      local[animal.location].push(item);
    })
return local;
}

function schedule(dayName) {
  // seu código aqui
  const days = Object.keys(data.hours);
  const times = Object.values(data.hours);
  const timeTable = {};
  days.map((item, i) => {
    timeTable[item] = `Open from ${times[i].open}am until ${times[i].close - 12}pm`;
    timeTable.Monday = 'CLOSED';
    return 0;
  });
  if (dayName === undefined) {
    return timeTable;
  }
  return { [dayName]: timeTable[dayName] };
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
  const especie = data.employees
  .find(item => (item.id === id))
  .responsibleFor[0];
  const resultado = data.animals
  .find(item => item.id === especie)
  .residents
  .sort((a, b) => b.age - a.age)[0];
  return Object.values(resultado);
}

function increasePrices(percentage) {
  // seu código aqui
  // - Ao passar uma porcentagem, incrementa todos os preços, arrendondados em duas casas decimais
  const chaves = Object.keys(data.prices);
  const precos = Object.values(data.prices);
  const porCento = percentage / 100;
  chaves.forEach((item, i) => {
    data.prices[item] =
    parseFloat((Math.round((precos[i] += precos[i] * porCento) * 100) / 100).toFixed(2));
  });
  return data.prices;
}

function returnAnimals(array) {
  const result = [];
  array.forEach((one) => {
    result.push(data.animals.find(um => um.id === one).name);
  });
  return result;
}

function employeeCoverage(idOrName) {
  const wholeCoverage = {};
  data.employees.forEach((item) => {
    const fullName = `${item.firstName} ${item.lastName}`;
    wholeCoverage[fullName] = returnAnimals(item.responsibleFor);
  });
  if (idOrName === undefined) return wholeCoverage;
  let result = {};
  data.employees.forEach((item) => {
    if (item.id === idOrName || item.firstName === idOrName || item.lastName === idOrName) {
      const fullName = `${item.firstName} ${item.lastName}`;
      result = { [fullName]: wholeCoverage[fullName] };
    }
  });
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
