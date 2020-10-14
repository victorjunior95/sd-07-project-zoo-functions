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

// const { employees, animals } = require('./data');
const { prices, animals } = require('./data');
const data = require('./data');

function animalsByIds(...ids) {
  return animals.filter(animal => ids.includes(animal.id));
}

function animalsOlderThan(nameAnimal, ageAnimal) {
  return data.animals
  .find(animal => animal.name === nameAnimal).residents
  .every(animal => animal.age > ageAnimal);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  return data.employees.find(employee => employee.firstName === employeeName)
    || data.employees.find(employee => employee.lastName === employeeName);
}

function createEmployee(personalInfo, ...associatedWith) {
  const newEmployee = {};
  return Object.assign(newEmployee, personalInfo, ...associatedWith);
}

function isManager(id) {
  const managers = data.employees.map(manager => manager.managers).toString();
  return managers.includes(id);
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  let result = {};
  if (species === undefined) {
    data.animals.forEach((animal) => {
      const { name, residents } = animal;
      result[name] = residents.length;
    });
  } else {
    result = data.animals.find(animal => animal.name === species).residents.length;
  }
  return result;
}

function entryCalculator(entrants) {
  if (!entrants || Object.keys(entrants).length === 0) {
    return 0;
  }
  return Object.keys(entrants)
  .reduce((acc, element) => acc + (entrants[element] * data.prices[element]), 0);
}


// pequenas funções para localização
const getLocation = local => local.location;
// metodo filter para retirar duplicidade
const region = data.animals.map(getLocation)
.filter((element, index, array) => index === array.indexOf(element));
// pegar os residents
// const getResidents = group => group.residents;

// if (options === undefined) ok
// function nameSpecieForRegion() {
//   const regionAnimals = region;
//   const result = {};
//   regionAnimals.forEach((regAnimals) => {
//     const animalsForlocation = data.animals.map(animal => {
//       if (regAnimals === animal.location) {
//       return animal.name;
//     }
//     }).filter(specie => specie !== undefined);
//     result[regionAnimals] = animalsForlocation;
//   });
//   return result;
// }
function animalMap(options) {
  //código aqui
}
// corrigir
// function animalMap(options) {
//   const result = {};
//   const regionAnimals = region;
//   if (options === undefined) {
//     regionAnimals.forEach((regAnimals) => {
//       const animalsForlocation = (data.animals).map((animal) => {
//         if (regAnimals === animal.location) {
//           return animal.name;
//         }
//       }).filter(specie => specie !== undefined);
//       result[regAnimals] = animalsForlocation;
//     });
//   }
//   // if (options.includeNames === true) {
//   //   // result["estou conseguindo!"] = 'gloria!'

//   // }
//   return result;
// }
// console.log(animalMap());


function schedule(dayName) {
  const workingDays = Object.assign({}, data.hours);
  const openingHours = (key => (workingDays[key] =
    `Open from ${data.hours[key].open}am until ${data.hours[key].close - 12}pm`));
  Object.keys(workingDays).forEach(openingHours);
  workingDays.Monday = 'CLOSED';
  if (dayName === undefined) {
    return workingDays;
  }
  return {
    [dayName]: workingDays[dayName], // workingDays[dayName] possui o valor para o respectivo dia.
  };
}

function oldestFromFirstSpecies(id) {
  const firstSpecieForEmployee = data.employees
  .find(select => select.id === id).responsibleFor[0];
  const specie = data.animals
  .find(select => select.id === firstSpecieForEmployee).residents;
  const newList = [...specie].sort((a, b) => a.age - b.age);
  const { name, sex, age } = newList[newList.length - 1];
  const list = [name, sex, age];
  return list;
}

function increasePrices(percentage) {
  let pricePercentage = percentage;
  pricePercentage /= 100;
  const increasedAdultPrice = prices.Adult + (prices.Adult * pricePercentage);
  const increasedChildPrice = prices.Child + (prices.Child * pricePercentage);
  const increasedSeniorPrice = prices.Senior + (prices.Senior * pricePercentage);
  prices.Adult = Math.round(increasedAdultPrice * 100) / 100;
  prices.Child = Math.round(increasedChildPrice * 100) / 100;
  prices.Senior = Math.round(increasedSeniorPrice * 100) / 100;
}

// if (idOrName === undefined) {
//   data.employees
//   .forEach((ids) => {
//     result[`${ids.firstName} ${ids.lastName}`] = ids.responsibleFor
//   .map(idAnimal => data.animals.find(searchId => searchId.id === idAnimal).name);
//   });
// } else {
//   data.employees
// .forEach((ids) => {
//   if (ids.id === idOrName || ids.firstName === idOrName || ids.lastName === idOrName) {
//     result[`${ids.firstName} ${ids.lastName}`] = ids.responsibleFor
//     .map(idAnimal => data.animals.find(searchId => searchId.id === idAnimal).name);
//   }
// });  
// }

function primeiroBloco() {
  const result = {};
  data.employees
    .forEach((ids) => {
      result[`${ids.firstName} ${ids.lastName}`] = ids.responsibleFor //código das espécies que funcionário
    .map(idAnimal => data.animals.find(searchId => searchId.id === idAnimal).name);
    });
  return result;
}
function segundoBloco(idOrName) {
  const result = {};
  data.employees
  .forEach((ids) => {
    if (ids.id === idOrName || ids.firstName === idOrName || ids.lastName === idOrName) {
      result[`${ids.firstName} ${ids.lastName}`] = ids.responsibleFor
      .map(idAnimal => data.animals.find(searchId => searchId.id === idAnimal).name);
    }
  });  
  return result;
}

function employeeCoverage(idOrName) {
  const result = {};
  if (!idOrName) {
    return primeiroBloco()
    // data.employees
    // .forEach((ids) => {
    //   result[`${ids.firstName} ${ids.lastName}`] = ids.responsibleFor //código das espécies que funcionário
    // .map(idAnimal => data.animals.find(searchId => searchId.id === idAnimal).name);
    // });
  } else {
    return segundoBloco(idOrName);
  //   data.employees
  // .forEach((ids) => {
  //   if (ids.id === idOrName || ids.firstName === idOrName || ids.lastName === idOrName) {
  //     result[`${ids.firstName} ${ids.lastName}`] = ids.responsibleFor
  //     .map(idAnimal => data.animals.find(searchId => searchId.id === idAnimal).name);
  //   }
  // });  
  }
    return result;
  }
// console.log(employeeCoverage('4b40a139-d4dc-4f09-822d-ec25e819a5ad'));

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
