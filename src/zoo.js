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

const { employees } = require('./data');
const data = require('./data');

function animalsByIds(...ids) {
  // seu código aqui
  return data.animals
  .filter((animal) => ids.includes(animal.id));
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
  return employees.push({ id, firstName, lastName, managers, responsibleFor });
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
const locationAnimals = data.animals.map(getLocation)
.filter((element, index, array) => index === array.indexOf(element));

// function nameResidents(param) { 
// retorna array com os nomes dos residents, porém está trazendo quantidade de nomes errado.
//   let result = [];
//   for (let i in param){
//       for (let j in param){
//           result.push(param[i][j].name);
//       }
//   }
//   return result;
// }

function animalMap(options) {
  const result = {};
// const resultIntern = {};
  if (options === undefined) {
    const [NE, NW, SE, SW] = locationAnimals;
    const regionNE = [];
    const regionNW = [];
    const regionSE = [];
    const regionSW = [];
    data.animals.map((animal) => {
      if (animal.location === locationAnimals[0]) {
       return regionNE.push(animal.name);
      }
    });
    data.animals.map((animal) => {
      if (animal.location === locationAnimals[1]) {
       return regionNW.push(animal.name);
      }
    });
    data.animals.map((animal) => {
      if (animal.location === locationAnimals[2]) {
       return regionSE.push(animal.name);
      }
    });
    data.animals.map((animal) => {
      if (animal.location === locationAnimals[3]) {
       return regionSW.push(animal.name);
      }
  });
    result.NE = regionNE;
    result.NW = regionNW;
    result.SE = regionSE;
    result.SW = regionSW;
  } // else {
  // else if (options.includeNames === true){bloco de construção
  // = {
  //   NE: [
  //     { lions: ['Zena', 'Maxwell', 'Faustino', 'Dee'] },
  //     { giraffes: ['Gracia', 'Antone', 'Vicky', 'Clay', 'Arron', 'Bernard'] }
  //   ]
  //  }
  // let residentsNE = data.animals.filter((animal) => { //array de objetos residentes
  //   return animal.location === 'NE';
  // }).map((animal) => {
  //   return animal.residents;
  // });
  // let residentsNW = data.animals.filter((animal) => { //array de objetos residentes
  //   return animal.location === 'NE';
  // }).map((animal) => {
  //   return animal.residents;
  // });

  // let residentsSE = data.animals.filter((animal) => {
  //   return animal.location === 'NE';
  // }).map((animal) => {
  //   return animal.residents;
  // });

  // let residentsSW = data.animals.filter((animal) => {
  //   return animal.location === 'NE';
  // }).map((animal) => {
  //   return animal.residents;
  // });
  // result.NE = nameResidents(residentsNE);
  // Object.assign(resultIntern, namesNE);
  // Object.assign(namesNE, result.NE);
  return result;
}
// const options = { includeNames: true };
// console.log(animalMap());


function schedule(dayName) {
  const workingDays = Object.assign({}, data.hours); 
  const openingHours = (key => workingDays[key] =
    `Open from ${data.hours[key].open}am until ${data.hours[key].close - 12}pm`)
  Object.keys(workingDays).forEach(openingHours)
  workingDays.Monday = 'CLOSED'
  if (dayName === undefined) {
    return workingDays
  } else {
    return {
    [dayName]: workingDays[dayName] //workingDays[dayName] possui o valor para o respectivo dia.
    }
  }
}
// console.log(schedule());

function oldestFromFirstSpecies(id) {
  const firstSpecieForEmployee = employees
  .find((select) => select.id === id).responsibleFor[0];  
  const specie = data.animals
  .find(select => select.id === firstSpecieForEmployee).residents
  let newList = [...specie].sort((a,b) => a.age - b.age)
  const {name, sex, age} = newList[newList.length - 1]
  const list = [name, sex, age];
  return list;
}

const round = (num, places) => { //ref https://metring.com.br/arredondar-numero-em-javascript
	if (!("" + num).includes("e")) {
		return +(Math.round(num + "e+" + places)  + "e-" + places);
	} else {
		let arr = ("" + num).split("e");
		let sig = ""
		if (+arr[1] + places > 0) {
			sig = "+";
		}

		return +(Math.round(+arr[0] + "e" + sig + (+arr[1] + places)) + "e-" + places);
	}
}

// console.log(round(37.485, 2)); expected 37,49 


function increasePrices(percentage) {
  let tax  = (1+(percentage/100));
  const newArray = ['Adult', 'Senior', 'Child'];
  for (let i = 0; i < newArray.length; i += 1) {
    data.prices[newArray[i]] = round((data.prices[newArray[i]] * tax), 2);
  }
  return data.prices
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
