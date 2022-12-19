  const searchFunc = (objId,searchInput) => {
    let searchId = searchInput.value;
    return objId.indexOf(searchId) !== -1;
    };

  const showFilteredAccount = (resultContainer,filteredList,addHTML) => {
    resultContainer.style.display = "block";
    const filteredOne = document.createElement("li");
    filteredOne.innerHTML = addHTML
    filteredList.append(filteredOne);
    };

  export const SearchAddEvent = (searchInputClass,resultContainerClass,filteredListClass,inPatientAllList,addHTMLFunc,setAllFunc,searchTarget)=>{
    const searchInput = document.getElementById(searchInputClass);
    const resultContainer = document.getElementById(resultContainerClass);
    const filteredList = document.getElementById(filteredListClass);
    filteredList != null && searchInput.addEventListener("keyup", () => {
        filteredList.innerHTML = "";
        resultContainer.style.display = "none";
        if (searchInput.value) {
          const filteredAccount = inPatientAllList.filter((x) => searchFunc(x[searchTarget],searchInput));
          if (filteredAccount !== []) {
            filteredAccount.forEach((acc) => {
            const addHTML = addHTMLFunc(acc);
            showFilteredAccount(resultContainer,filteredList,addHTML);
            });
          if(filteredList.childElementCount){
            for(let i = 0; i < filteredList.childElementCount ; i++ ){
              filteredList.children[i].addEventListener('click',(e) =>{
                setAllFunc(e);
                resultContainer.style.display = "none";
                });
              }  
            };
          };
        };
    });
  };