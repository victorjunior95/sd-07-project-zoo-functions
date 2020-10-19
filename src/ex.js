const data = require('./data');

const employeeCoverage = (idOrName) => {
  // seu código aqui
  let listAni = {};
  let listEmp = {};
  const { animals, employees } = data;

  // const employeeList = employees.map(employee => `${employee.firstName} ${employee.lastName}`);

  // let animalsIds = employees.map(employee => employee.responsibleFor);

  animals.forEach(animal => {
    listAni[animal.name] = animal.id;
  });

  employees.forEach(employee => {
    let emp = `${employee.firstName} ${employee.lastName}`;
    listEmp[emp] = employee.responsibleFor;
  });

  const entriesAnimals = Object.entries(listAni);
  const entriesEmployees = Object.entries(listEmp);
  // console.log(entriesAnimals);
  // console.log(entriesEmployees);

  let retorno = entriesEmployees.reduce((acc, curr) => {
    console.log(acc)
    curr[1].map((element, i) => {
      console.log(curr[1])
      console.log(element);
      
      //   entriesAnimals.filter(id => {
      //     console.log(id)
      //     if (id[1] === element) {
      //       console.log(i)
      //       acc[curr[0]] = (entriesAnimals[i][0]);
      //       console.log(acc);
      //     }
      // })
    })

    return acc;
  }, {})


  // // lógica lorena
  // valuesEmployees.map(array => {
  //   array.forEach(id => {
  //     keysAnimals.forEach(key => {
  //       valuesAnimals.forEach(value => {
  //         if (value === id) {
  //           return id === key
  //         }
  //       })
  //     })
  //   })
  // })
  return retorno;
}

console.log(employeeCoverage());