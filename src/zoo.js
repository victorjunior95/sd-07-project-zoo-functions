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

const data = require("./data");
const { animals } = data;

function animalsByIds(...ids) {
  const { animals } = data;
  return animals.filter((animal, index) => animal.id === ids[index]);
}
// console.log(animalsByIds())

function animalsOlderThan(animal, age) {
  const { animals } = data;
  const myAnimal = animals.find((animalName) => animalName.name === animal);
  const compareResult = myAnimal.residents.every(
    (animalGroup) => animalGroup.age > age
  );
  return compareResult;
}
// console.log(animalsOlderThan('otters', 7));

function employeeByName(employeeName) {
  const { employees } = data;
  let object = {};
  if (employeeName) {
    object = employees.filter(
      (objectEmployer) =>
        objectEmployer.firstName === employeeName ||
        objectEmployer.lastName === employeeName
    )[0];
  }
  return object;
}
// console.log(employeeByName());

const personalInfo = {
  id: "7ed1c9bb-8570-44f6-b718-0666b869573a",
  firstName: "John",
  lastName: "Doe",
};

const associatedWith = {
  managers: [
    "c5b83cb3-a451-49e2-ac45-ff3f54fbe7e1",
    "9e7d4524-363c-416a-8759-8aa7e50c0992",
  ],
  responsibleFor: [
    "0938aa23-f153-4937-9f88-4858b24d6bce",
    "89be95b3-47e4-4c5b-b687-1fabf2afa274",
    "bb2a76d8-5fe3-4d03-84b7-dba9cfc048b5",
  ],
};

function createEmployee(personalInfo, associatedWith) {
  // let object = {};
  // for(i in personalInfo) {
  //   object[i] = personalInfo[i];
  // }
  // for(i in associatedWith) {
  //   object[i] = associatedWith[i];
  // }
  // return object;
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  return { id, firstName, lastName, managers, responsibleFor };
}
// console.log(createEmployee(personalInfo, associatedWith));

function isManager(id) {
  const { employees } = data;
  return employees.some((employer, index) => employer.managers[index] === id);
}
// console.log(isManager('c5b83cb3-a451-49e2-ac45-ff3f54fbe7e1'))

function addEmployee(
  id,
  firstName,
  lastName,
  managers = [],
  responsibleFor = []
) {
  const { employees } = data;
  const newEmployee = { id, firstName, lastName, managers, responsibleFor };
  employees.push(newEmployee);
  return employees;
}
// console.log(addEmployee('4141da1c-a6ed-4cf7-90c4-99c657ba4ef3', 'Jane', 'Doe'));
// console.log(data.employees.length);

function animalCount(species) {
  const { animals } = data;
  let object = {};
  animals.forEach((animal) => (object[animal.name] = animal.residents.length));
  return species === undefined ? object : object[species];
}
// console.log(animalCount("lions"));

function entryCalculator(entrants) {
  const { prices } = data;
  let value = 0;
  for (i in entrants) {
    // console.log(i)
    // console.log(entrants[i])
    value += entrants[i] * prices[i];
  }
  return value;
}
// console.log(entryCalculator({}));
// console.log(entryCalculator({ 'Child': 1, 'Senior': 1 }));

// const noParamAnimalMap = () => {
//   const { animals } = data;
//   const location = ["NE", "NW", "SE", "SW"];
//   let object = {};
//   location.forEach((local) => {
//     object[local] = animals
//       .filter((animal) => animal.location === local)
//       .map((animalObject) => animalObject.name);
//   });
//   return object;
// };
// // console.log(noParamAnimalMap());

// // Função que define a estrutura ao ser chamado dos nomes e arrays dos animais
// const typeAnimal = (name, animalsNames) => {
//   let newObject = {};
//   newObject[name] = animalsNames;
//   return newObject;
// };
// // console.log(typeAnimal(0, []));

// // Array filtrado pela localização contendo separadamente todas as informações dos residentes
// const arrayResidentsAnimals = () => {
//   const { animals } = data;
//   const location = ["NE", "NW", "SE", "SW"];
//   let arrayInformations = [];
//   location.forEach((local) => {
//     animals
//       .filter((animal) => animal.location === local)
//       .map((animal) => arrayInformations.push(animal.residents));
//   });
//   return arrayInformations;
// };
// // console.log(arrayResidentsAnimals());

// const namesAnimals = (index, sort, sex) => {
//   let objectNames = {};
//   if (sort !== true && sex) {
//     for (let i = 0; i < arrayResidentsAnimals().length; i += 1) {
//       const names = arrayResidentsAnimals()
//         [i].filter((name) => name.sex === sex)
//         .map((animal) => animal.name);
//       objectNames[i] = names;
//     }
//   } else if (sort === true && sex) {
//     for (let i = 0; i < arrayResidentsAnimals().length; i += 1) {
//       const names = arrayResidentsAnimals()
//         [i].filter((name) => name.sex === sex)
//         .map((animal) => animal.name);
//       objectNames[i] = names.sort();
//     }
//   } else if (sort === true) {
//     for (let i = 0; i < arrayResidentsAnimals().length; i += 1) {
//       const names = arrayResidentsAnimals()[i].map((name) => name.name);
//       objectNames[i] = names.sort();
//     }
//   } else {
//     for (let i = 0; i < arrayResidentsAnimals().length; i += 1) {
//       const names = arrayResidentsAnimals()[i].map((name) => name.name);
//       objectNames[i] = names;
//     }
//   }
//   return objectNames[index];
// };
// // console.log(sortAnimalsNames(0, false, "male"));

// let count = -1;
// const includeNames = (sort, sex) => {
//   const { animals } = data;
//   const location = ["NE", "NW", "SE", "SW"];
//   let object = {};
//   location.forEach((local) => {
//     object[local] = animals
//       .filter((animal) => animal.location === local)
//       .map((animal) => typeAnimal(animal.name, namesAnimals(count += 1, sort, sex)));
//   });
//   return object;
// };
// console.log(includeNames().NE);
// console.log(includeNames(true).NE);

// function animalMap(options) {
// let result;
// // options === undefined ? result = noParamAnimalMap() : result = includeNames();
// if(options === undefined) {
//   result = noParamAnimalMap();
// } else {
//   if(options.includeNames) {
//     if(options.sorted) {
//       result = includeNames(true);
//     }
//     if(options.sex === 'female') {
//       result = includeNames(true, 'female')
//     }
//   }
// }

// else if(options.includeNames === true && Object.keys(options).length === 1) {
//   result = includeNames();
// } else if(options.includeNames === true && options.sorted === true && Object.keys(options).length === 2) {
//   result = includeNames(true);
// } else if(options.includeNames === true && options.sex === 'female') {
//   result = includeNames(false, 'female');
// } else if(options.includeNames === true && options.sex === 'female' && options.sorted === true) {
//   result = includeNames(true, 'female');
// } else if(options.includeNames === true && options.sex === 'male') {
//   result = includeNames(false, 'male');
// } else if(options.includeNames === true && options.sex === 'male' && options.sorted === true) {
//   result = includeNames(true, 'male');
// } else {
//   result = noParamAnimalMap();
// }
// return result;

// }
// console.log(animalMap().NE[0]);
// console.log(animalMap({ includeNames: true }).NE);
// console.log(animalMap({ includeNames: true, sorted: true }).NE);
// console.log(animalMap({ includeNames: true, sex: 'female', sorted: true }).NE);
// console.log(animalMap({ includeNames: true, sex: 'male', sorted: true }).NE);
// console.log(animalMap({ sex: 'female' }).NE[0]);

const namesResidentsLocation = (name, sex) => {
  let array = [];
  let arrayAll = [];

  animals
    .find((animal) => animal.name === name)
    .residents.forEach((info) => {
      arrayAll.push(info.name);
      if (info.sex === sex) {
        array.push(info.name);
      }
    });
  if (sex) {
    return array;
  } else {
    return arrayAll;
  }
};
// console.log(namesResidentsLocation('lions'));

const nameAnimals = (region, sort = false, sex) => {
  let array = [];
  let object;

  animals
    .filter((animal) => animal.location === region)
    .forEach((animal) => {
      object = {};
      object[animal.name] = namesResidentsLocation(animal.name, sex);
      if (sort) {
        object[animal.name] = namesResidentsLocation(animal.name, sex).sort();
      }
      array.push(object);
    });

  return array;
};
// console.log(nameAnimals("NE"));

function animalMap(options) {
  const location = ["NE", "NW", "SE", "SW"];
  let object = {};

  location.forEach(
    (local) =>
      (object[local] = animals
        .filter((animal) => animal.location === local)
        .map((objectAnimal) => objectAnimal.name))
  );

  if (options !== undefined && options.includeNames !== undefined) {
    location.forEach(
      (local) =>
        (object[local] = nameAnimals(local, options.sorted, options.sex))
    );
  }
  return object;
}
// console.log(animalMap());
// console.log(animalMap({ includeNames: true }).NE);
// console.log(animalMap({ includeNames: true, sorted: true }).NE);
// console.log(animalMap({ includeNames: true, sex: 'female', sorted: false}).NE);
console.log(animalMap({ sex: 'female' }).NE[0]);

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
