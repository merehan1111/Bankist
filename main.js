'use strict';
// Data
  const account1 = {
    owner: 'Jonas Schmedtmann',
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, // %
    pin: 1111,
  };
  
  const account2 = {
    owner: 'Jessica Davis',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
  };
  
  const account3 = {
    owner: 'Steven Thomas Williams',
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
  };
  
  const account4 = {
    owner: 'Sarah Smith',
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4444,
  };
  
  const accounts = [account1, account2, account3, account4];
  
  /////////////////////////////////////////////////
  // Elements
  const labelWelcome = document.querySelector('.welcome');
  const labelDate = document.querySelector('.date');
  const labelBalance = document.querySelector('.balance__value');
  const labelSumIn = document.querySelector('.summary__value--in');
  const labelSumOut = document.querySelector('.summary__value--out');
  const labelSumInterest = document.querySelector('.summary__value--interest');
  const labelTimer = document.querySelector('.timer');
  
  const containerApp = document.querySelector('.app');
  const containerMovements = document.querySelector('.movements');
  
  const btnLogin = document.querySelector('.login__btn');
  const btnTransfer = document.querySelector('.form__btn--transfer');
  const btnLoan = document.querySelector('.form__btn--loan');
  const btnClose = document.querySelector('.form__btn--close');
  const btnSort = document.querySelector('.btn--sort');
  
  const inputLoginUsername = document.querySelector('.login__input--user');
  const inputLoginPin = document.querySelector('.login__input--pin');
  const inputTransferTo = document.querySelector('.form__input--to');
  const inputTransferAmount = document.querySelector('.form__input--amount');
  const inputLoanAmount = document.querySelector('.form__input--loan-amount');
  const inputCloseUsername = document.querySelector('.form__input--user');
  const inputClosePin = document.querySelector('.form__input--pin');
  
  /////////////////////////////////////////////////
  // Functions
  
      // Functions
      
      const displayMovements = function (movements, sort = false) {
        containerMovements.innerHTML = '';
      
        const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;
      
        movs.forEach(function (mov, i) {
          const type = mov > 0 ? 'deposit' : 'withdrawal';
      
          const html = `
            <div class="movements__row">
              <div class="movements__type movements__type--${type}">${
            i + 1
          } ${type}</div>
              <div class="movements__value">${mov}€</div>
            </div>
          `;
      
          containerMovements.insertAdjacentHTML('afterbegin', html);
        });
      };
      
  
  
  const calcDisplayBalance = function(acc){
    
    acc.balance =acc.movements.reduce(function(acc , cur){
        return acc+cur;
        
    } ,0);
    labelBalance.textContent=`${acc.balance}EUR`;
  }

const createUsernames=function(accs){
    accs.forEach(function(acc)
    {
        acc.user=acc.owner. toLowerCase().split(' ').map(function(names){
            return names[0];
        }).join('');


    });
};
const upDateUi =function(acc)
{
  //displayMovent 
  displayMovements(acc.movements);
  //dissumary
  calcDisplaySummary(acc);
  //displayBalance
  calcDisplayBalance(acc);
}

createUsernames(accounts);
console.log(accounts);
const calcDisplaySummary = function(acc)
{
    const incomes =acc.movements
    .filter(mov=>mov>0)
    .reduce((acc , mov)=>acc+mov);
    labelSumIn.textContent=`${incomes}`;
    const out = acc.movements
    .filter(mov=> mov<0)
    .reduce((acc , mov)=>acc+mov);
    labelSumOut.textContent=`${Math.abs(out)}€`;
    const interest = acc.movements
    .filter(mov=>mov>0)
    .map(deposit=>(deposit*acc.interestRate)/100)
    .filter((int , i , arr)=>{
        return int>0;

    })
    .reduce((acc , int)=>acc+int,0);
    labelSumInterest.textContent=`${interest}`


}

let currentAcount;
btnLogin.addEventListener('click' , function(e){
  e.preventDefault();
  currentAcount=accounts.find(acc=>acc.user === inputLoginUsername.value);
  console.log(currentAcount);
  if(currentAcount.pin ===Number(inputLoginPin.value))
  {
    //displayMessage
    labelWelcome.textContent=`Welcom back ${currentAcount.owner.split(' ')[0]}`;
    containerApp.style.opacity=100;
    //displayMovent 
    upDateUi(currentAcount)
    inputLoginUsername.value=inputLoginPin.value='';

  }
  
});
let sorted=false;
btnSort.addEventListener('click' , function(e){
  e.preventDefault();
  displayMovements(currentAcount.movements , !sorted)
  sorted= !sorted
 
});

btnTransfer.addEventListener('click' , function(e){
  e.preventDefault();
  const amount =Number(inputTransferAmount.value);
  const resciverAcc =accounts.find(acc=>acc.user === inputTransferTo.value);
  inputTransferTo.value=inputTransferAmount.value='';
  
  if(amount > 0 &&
    resciverAcc && currentAcount.balance >= amount && resciverAcc.user !== currentAcount.user)
  {
    currentAcount.movements.push(-amount);
    resciverAcc.movements.push(amount);
    upDateUi(currentAcount);
  
  }
});
btnClose.addEventListener('click' , function(e){

  e.preventDefault();
  if(inputCloseUsername.value === currentAcount.user && Number( inputClosePin.value)=== currentAcount.pin)
  {

      const index = accounts.findIndex(acc =>acc.user=== currentAcount.user);
      console.log(index);
      accounts.splice(index , 1);
      containerApp.style.opacity=0;
  }
  inputCloseUsername.value=inputClosePin.value='';

});
btnLoan.addEventListener('click' ,function(e){
  e.preventDefault();
  const amount=Number(inputLoanAmount.value);
  if(amount >0 && currentAcount.movements.some(mov=>mov>=amount*0.1)){
    currentAcount.movements.push(amount);
    upDateUi(currentAcount);
  };
  inputLoanAmount='';
});


// const checkDogs=function(jualisDog ,katysDog)
// {
//     const correctjualiDog =jualisDog.slice();
//     correctjualiDog.splice(0,1);
//     correctjualiDog.splice(-2);
//     console.log(correctjualiDog);
//     const dogData =[...correctjualiDog ,...katysDog] ;
//     console.log(dogData);
//     dogData.forEach(function(dog , i){
//         if(dog >3)
//         {
//             console.log(`the dog number ${i} and is ${dog}years old`);
//         }
//         else
//         {
//             console.log(`the dog number ${i}  is still adult`)

//         }

//     })

// }
// checkDogs([3,5,2 ,12 ,7] ,[4,1,15,8,3]);
// const movements= [430, 1000, 700, 50, 90];
// const uerTousd =1.1;
// const movementUsd =movements.map(function(mov){
//     return mov*uerTousd;
// });
// console.log(movements);
// console.log(movementUsd);
// const user ='mererhan emad ibrahim';
// const userName = user.split(' ').map(function(names){
//     return names[0];
// }).join('');
// console.log(userName);
// const movement= [430, -1000, 700, -50, 90];
// const deposit=movement.filter(function(fil){
//     return fil>0;
// });
// console.log(deposit);
//  const depo=[];
//  for(const de of movement) if(de>0) depo.push(de);
//  console.log(depo);
//  const balance =movement.reduce(function(acc , cur , i , arr){
//     console.log(`${i}:${acc}`);
//     return acc+cur;

//  },0);
//  console.log(balance);

//  let balance2=0;
//  for(const move of movement) balance2 +=move;
//  console.log(balance2);
// const max = movement.reduce(function(acc , cur){
//     if(acc >cur)
//     return acc;
//     else 
//     return cur;
// }, movement[0]);
// console.log(max);
// const calcAverageHumanAge=function(ages)
// {
    
//     const humanAges = ages.map(function(age){
//         if(age <=2)
//         {
//             return 2 * age;
//         }
//         else 
//         {
//             return 16 +age *4;
//         }
       
//     });
//     console.log(humanAges);
//     const adultDog = humanAges.filter(age => age >=18);
//     console.log(adultDog);
//     const avergeDo =adultDog.reduce(function(adultDog ,age){
//         return (adultDog+age)/adultDog+length;
//     } ); console.log(avergeDo);

   
    
// }
// calcAverageHumanAge([5 ,2 ,1 ,8 ,12]);
// const findaccount = movements.find(mov=>mov<0)
// console.log(findaccount);
// //quantity
// console.log(movement.includes(90));
// const anyDeposit = movement.some(mov=> mov>0);
// console.log(anyDeposit);
// const everyDeposit = movement.every(mov=>mov>0);
// console.log(everyDeposit);
// const arr=[1,[1,5,9],[8,[7,9]],[[4,6],9]];
// console.log(arr.flat(2));
// console.log(movement);
// movement.sort((a,b)=>b-a)
// console.log(movement);


  