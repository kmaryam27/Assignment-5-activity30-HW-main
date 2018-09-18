let state = {
  employeeList: employeeData,
  commandList : commandData,

  cleanPage: function(){
    this.commandList.forEach(e => $(e.headerDiv).addNewClass(' nonVisible'));
  },

  myCommand: function(cmd){
    return String((this.commandList.find(e => e.command === cmd)).headerDiv);
  },

  checkName: function(inputName){
    return this.employeeList.some(e => (inputName.toUpperCase() === (e.name).toUpperCase()));
  },

  lookupName: function(inputName){
    return this.employeeList.filter(e => inputName.toUpperCase() === e.name.toUpperCase());
  },

  containName: function(str){
    return this.employeeList.filter(e => e.name.toUpperCase().includes(str.toUpperCase()));
  },

  checkObj: function(inputName, inputNum, inputPhone){
    return this.employeeList.some(e =>((inputName.toUpperCase() === e.name.toUpperCase())&&(inputNum == e.officeNum)&&(inputPhone == e.phoneNum)))
  },

  checkObjSecondElement: function(inputName, inputNum, inputPhone){
    return this.employeeList.filter(e =>((inputName.toUpperCase() === e.name.toUpperCase())&&(inputNum != e.officeNum)&&(inputPhone != e.phoneNum))||
                                  ((inputName.toUpperCase() !== e.name.toUpperCase())&&(inputNum == e.officeNum)&&(inputPhone != e.phoneNum))||
                                  ((inputName.toUpperCase() !== e.name.toUpperCase())&&(inputNum != e.officeNum)&&(inputPhone == e.phoneNum)));
  },

  checkObjTheirdElement: function(inputName, inputNum, inputPhone){
    return this.employeeList.filter(e =>((inputName.toUpperCase() === e.name.toUpperCase())&&(inputNum == e.officeNum)&&(inputPhone != e.phoneNum))||
                                  ((inputName.toUpperCase() === e.name.toUpperCase())&&(inputNum != e.officeNum)&&(inputPhone == e.phoneNum))||
                                  ((inputName.toUpperCase() !== e.name.toUpperCase())&&(inputNum == e.officeNum)&&(inputPhone == e.phoneNum)));
  },

  checkAddElement: function(inputName, inputNum, inputPhone){
    return this.employeeList.filter(e => ((inputName.toUpperCase() === e.name.toUpperCase())&&(inputNum == e.officeNum)&&(inputPhone == e.phoneNum)));
  },

  addNewEmployee: function(employee){
    this.employeeList.push(employee);
  },

  removeEmployee: function(i){
    this.employeeList.splice(i,1);
  }
}


/******************************************************clean content div for input new data*/
  const cleanContent = () => {
    $('#content').empty();
    $('#content').addNewClass('centerContent');
  }

/******************************************************clean Page on load */
$('header').addNewClass(' nonVisible');
state.cleanPage();
cleanContent();

/********************************************************add click event for aside btns */
let commandSelected = document.querySelectorAll('aside section div');

commandSelected.forEach(element => {
    element.style.cursor = "pointer";/**********pointer */

    element.addEventListener('click', function(){
    event.preventDefault();
   
    $('#welcomeDiv').addNewClass('nonVisible');
    $('#mainContent').addNewClass('newbgcolor');
    

    state.cleanPage();
    cleanContent();
    
    
    let cmd = element.getAttribute('id');

    switch(cmd){
      case 'print'://if client types print
        $('#content').toggleClass('centerContent');
        $('#content').printAll(state.employeeList);
      break;
    default:
        let myCmd = state.myCommand(cmd);
        $(myCmd).toggleClass('nonVisible');
        break;
      }
    });
});
//***************************************************************Verify */

$('#verifySubmit').on('click', function(){
  event.preventDefault();
  cleanContent();
  
  const inputName = $('#verifyInput').val();
  let checkEmployee = 'Employee Not Found';
    
  state.checkName(inputName)?checkEmployee = 'Employee Found':null;
  $('#content').printAll(checkEmployee);
});

/****************************************************************Lookup */
$('#lookupSubmit').on('click', function(){
  event.preventDefault();
  cleanContent();

  const inputName = $('#lookupInput').val();
  const eList = state.lookupName(inputName);
  (eList.length > 0)?$('#content').printAll(eList): $('#content').printAll('Employee Not Found');
});

/****************************************************************Contains */
$('#containsSubmit').on('click', function(){
  event.preventDefault();
  cleanContent();

  const str = $('#containsInput').val();
  const eList = state.containName(str);
  (eList.length > 0)?$('#content').printAll(eList): $('#content').printAll('Employee Not Found');
      
});
/****************************************************************update */
$('#updateSubmit').on('click', function(){
  event.preventDefault();
  cleanContent();

  const inputName = $('#updateNameInput').val();
  const inputNum = $('#updateNumInput').val();
  const inputPhone = $('#updatePhoneInput').val();
  let eList =[];
  
  switch (true) {
    case (state.checkObj(inputName, inputNum, inputPhone)):
        $('#content').printAll('Employee already exist');
      break;
  
    default:
        eList = state.checkObjSecondElement(inputName, inputNum, inputPhone);

        switch(eList.length){
          case 1:
            eList[0].name = inputName;
            eList[0].phoneNum = inputPhone;
            eList[0].officeNum = inputNum;
            $('#content').printAll(eList);
        break;
        default:
          eList = state.checkObjTheirdElement(inputName, inputNum, inputPhone);
      
            switch(true){
              case(eList.length === 1):
                eList[0].name = inputName;
                eList[0].phoneNum = inputPhone;
                eList[0].officeNum = inputNum;
                $('#content').printAll(eList);
              break;
              case(eList.length> 1):
                $('#content').printAll('more than one Employee with this information for update');
              break;
              default:
                $('#content').printAll('Employee Not Found');
                break;
            }
            break;
        }

      break;
  }
 
});
/*******************************************************************add */
$('#addSubmit').on('click', function(){
  event.preventDefault();
  cleanContent();

  const inputName = $('#addNameInput').val();
  const   inputNum = $('#addNumInput').val();
  const inputPhone = $('#addPhoneInput').val();

      const employee = {
      name: inputName,
      phoneNum: inputPhone,
      officeNum: inputNum
    };
    const eList = state.checkAddElement(inputName,inputNum,inputPhone);
    switch(true){
      case(eList.length > 0):
        $('#content').printAll('Employee added before');
      break;
      default:
        eList.push(employee);
        state.addNewEmployee(employee);
        $('#content').printAll(eList);
        break;
    }
});
/***********************************************************************delete */
$('#deleteSubmit').on('click', function(){
  event.preventDefault();
  cleanContent();

  const inputName = $('#deleteInput').val();
  switch (true) {
    case (state.lookupName(inputName).length > 0):
          let i = 0;
          let employeeCounter = 0;
          while ( i < state.employeeList.length) {
            switch (true) {
              case ((inputName.toUpperCase() === (state.employeeList[i].name).toUpperCase()))://related to i
                employeeCounter ++;
                state.removeEmployee(i);
                break;
              default:
                i++;
                break;
            }       
          } 
            $('#content').printAll(`${employeeCounter} Employee Deleted`); 
      break;
  
    default:
        $('#content').printAll('Employee Not Found');
      break;
  }
  
     
});
/**************************************************************************arrange  is not for HW*/
$('#arrangeSubmit').on('click', function(){
  event.preventDefault();
  cleanContent();
  

  const field = $('#arrangeCombo').val();
  switch (true) {
    case  (field == 0):
      state.employeeList.sort(function(a, b){
        let nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase();
        switch (true) {
          case (nameA < nameB) :
               return -1;
            break;
            case (nameA > nameB) :
                return 1;
            break;
        
          default:
            return 0;
            break;
        }
  });
      break;
  
    default:
    state.employeeList.sort(function(a, b){
      return a.officeNum-b.officeNum;
    });
      break;
  }
 
  $('#content').printAll(state.employeeList);
});
