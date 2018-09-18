const $ = function (sel) {
    const nodeList = document.querySelectorAll(sel);
  
    const text = (content) => {
      nodeList.forEach(e => e.textContent = content);
    }
  
    const toggleClass = (className) => {
      nodeList.forEach(e => e.classList.toggle(className));
  
    }

    const addNewClass = (newClass) => {
    //  nodeList.forEach(e => (!e.classList.some(ce => String(ce) === newClass))?e.className += newClass : 0);/**nodeList is not compeletely array so has not some  map and ...*/
      let i = 0;
      while(i < nodeList.length){
        let classNode = nodeList[i].classList;
        let checkClass = false;
        let j = 0;
        while(j < classNode.length){
          (String(classNode[j]) === newClass)?checkClass = true: null;
          j++;
        }
        (checkClass === false)?nodeList[i].className +=  newClass: null;
        i++;
      }
   
    }
  
    const on = (action, cb) => {
      nodeList.forEach(e => {
        e.addEventListener(action, cb);
      });
    }
  
    const val = (content) => {
      let contentVal;
        (content === undefined)? contentVal = nodeList[0].value: contentVal = nodeList[0].value = content; 
        return contentVal;  
    }
  
    const html = (content) => {
      nodeList.forEach(e => e.innerHTML = content);    
    }

    const empty = () => {
      nodeList.forEach(e => e.innerHTML = '');     
  }

    const printAll = (employeeList) => {
      (Array.isArray(employeeList))?
      employeeList.map(e => {render(`${e.name}`);render(`#${e.officeNum}`);render(`${e.phoneNum}`);breakLine();}):render(employeeList);
    }

    const breakLine = () => {
      nodeList.forEach(e => e.appendChild(document.createElement('br')));
    }

    const render = (...props) => {
      props.forEach(e => append(e));
    }
  
    const append = content => {
      const p = document.createElement('p');
      p.textContent = content;
      nodeList.forEach(e => e.appendChild(p));
    }
  
  
    const publicAPI = {
      text: text,
      toggleClass: toggleClass,
      on: on,
      val: val,
      html: html,
      empty: empty,
      printAll: printAll,
      render: render,
      addNewClass: addNewClass
    }
  
    return publicAPI;
  
  }
  