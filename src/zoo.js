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
const { prices, animals, employees } = require('./data');
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

// pequenas funções
// filtrar localização.
const getLocation = local => local.location;
// filtrar names das especies
// const getNameSpecies = species => species.name;
// extrair localização das espécies sem duplicidade.
const region = data.animals.map(getLocation)
.filter((element, index, array) => index === array.indexOf(element));
// extrair os residents por espécie.
// const getResidents = group => group.residents;

function nameSpecieForRegion(region) {
  const result = {};
  const reg = region;
    reg.forEach((regAnimals) => {
      const animalsForlocation = (data.animals).map((animal) => {
        if (regAnimals === animal.location) {
          return animal.name;
        }
      }).filter(specie => specie !== undefined);
      result[regAnimals] = animalsForlocation;
    });
  return result;
}
// console.log(nameSpecieForRegion(region));

function nameResidents(region, sorted, sex) {
  const animalsPerLocationWithName = {};
  const reg = region;
  reg.forEach((location) => {
    const animalsfull = data.animals
      .filter(animal => animal.location === location)
      .map((animal) => {
        const nameKey = animal.name;
        const nameValues = animal.residents
          .filter((resident) => {
            const isFilteringSex = sex !== undefined;
            return isFilteringSex ? resident.sex === sex : true;
          })
          .map(resident => resident.name);
        if (sorted) nameValues.sort();
      //  console.log(nameValues.join());
        return { [nameKey]: nameValues };
      });
    animalsPerLocationWithName[location] = animalsfull;
  });
  return animalsPerLocationWithName;
}
// console.log(nameResidents(region, true));

// const options = { includeNames: true, sorted: true };
function animalMap(options) {
  if (!options) return nameSpecieForRegion(region);
  const { includeNames, sorted, sex } = options;
  if (!includeNames) return nameSpecieForRegion(region);
   return nameResidents(region, sorted, sex);
}
console.log(animalMap());

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

// primeira tentativa para função employeeCoverage
// retorna nome do animal por id
const idAnimals = ids => animals.find(searchId => searchId.id === ids).name;
// console.log(idAnimals('0938aa23-f153-4937-9f88-4858b24d6bce'));
// a função employeesBySpecies, retorna todos func e respectvas especies
// function employeesBySpecies() {
//   const result = {};
//   data.employees
//     .forEach((ids) => {
//       result[`${ids.firstName} ${ids.lastName}`] = ids.responsibleFor
//       .map(idAnimals);
//     });
//   return result;
// }
// a função employeeByType, retorna somente 1 funcionário e respec especie
// function employeeByType(idOrName) {
//   const result = {};
//   data.employees
//   .forEach((ids) => {
//     if (ids.id === idOrName || ids.firstName === idOrName || ids.lastName === idOrName) {
//       result[`${ids.firstName} ${ids.lastName}`] = ids.responsibleFor
//       .map(idAnimals);
//     }
//   });
//   return result;
// }
// a função employeesBySpecies, retorna o func e o id das especies
// function employeesBySpecies() {
//   const result = {};
//   data.employees
//     .forEach((ids) => {
//     });
//   return result;
// }
// segunda tentativa para função employeeCoverage
// function employeeByType(idOrName) {
//   const result = {};
//   data.employees
//   .forEach((ids) => {
//     if (ids.id === idOrName || ids.firstName === idOrName || ids.lastName === idOrName) {
//       result[`${ids.firstName} ${ids.lastName}`] = ids.responsibleFor
//       .map(idAnimals);
//     } else if (!idOrName) {
//       result[`${ids.firstName} ${ids.lastName}`] = ids.responsibleFor
//       .map(idAnimals);
//     }
//   });
//   return result;
// }

function employeeCoverage(idOrName) {
  const result = {};
  employees.forEach((employee) => {
    result[`${employee.firstName} ${employee.lastName}`] =
      employee.responsibleFor.map(idAnimals);
  });

  const searchEmployee = (condition) => {
    const employeeDetails = data.employees.find(employee => employee.firstName === condition
      || employee.lastName === condition
      || employee.id === condition);
    return `${employeeDetails.firstName} ${employeeDetails.lastName}`;
  };

  if (idOrName === undefined) return result;
  return { [searchEmployee(idOrName)]: result[searchEmployee(idOrName)] };
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
