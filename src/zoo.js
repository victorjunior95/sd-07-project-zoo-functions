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
  const { includesNames, sorted, sex } = options;

    data.animals.forEach((animal) => {
      let item ={};
       if (includesNames){
         item[animal.name] = animal.residents
        if (sex === 'male'){
        item[animal.name] = item[animal.name].filter((sexo) => {if (sex !== undefined) {return (sexo.sex === 'male')} return true});
     
    } else if (sex === 'female'){
      item[animal.name] = item[animal.name].filter((sexo) => {if (sex !== undefined) {return (sexo.sex === 'female')}return true});
    }
    item[animal.name] = item[animal.name].map (um => um.name);
    
    if (sorted === true){
    item[animal.name] = item[animal.name].sort();
  } 
  }
      local[animal.location].push(item);
      // console.log(item)
    })
    console.table(local)
    return local;
}
console.log (animalMap({includesNames: true, sorted: true}))

function schedule(dayName) {
  // seu código aqui
}

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
