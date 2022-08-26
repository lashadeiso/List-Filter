const container = document.querySelector(".container");
const studentName = document.querySelector(".name");
const studentSurname = document.querySelector(".surname");
const studentAge = document.querySelector(".age");
const studentEmail = document.querySelector(".email");
const studentMobileNumber = document.querySelector(".mobile-number");
const studentImg = document.querySelector(".img");
const submitBTN = document.querySelector(".form-wrapper");
const section2 = document.querySelector(".section-2");
const studentList = document.querySelector(".students-list");
const filterBtn = document.querySelector(".filter");
const allCheckBox = document.querySelectorAll(".check-box");
let arr = [];

function checkedValue(checkBoxColl) {
  let checkValueArr = [];
  checkBoxColl.forEach((item) => {
    item.checked && checkValueArr.push(item.value);
  });
  return checkValueArr;
}

filterBtn.addEventListener("click", () => {
  let visiblArr = checkedValue(allCheckBox);
  document.querySelectorAll(".st").forEach((item) => {
    if (item.classList.contains("hide-item")) {
      item.classList.remove("hide-item");
    }
  });

  document.querySelectorAll(".st").forEach((item) => {
    let itemN = item.className.split(" ")[1];
    if (visiblArr.includes(itemN) === false) {
      item.classList.add("hide-item");
    }
  });
});

function inputValidation(
  stName,
  stSurname,
  stAge,
  stEmail,
  stMobileNumber,
  stImg
) {
  stName.value.trim() === ""
    ? stName.classList.add("error-input")
    : stName.classList.remove("error-input");
  stSurname.value.trim() === ""
    ? stSurname.classList.add("error-input")
    : stSurname.classList.remove("error-input");
  stAge.value.trim() === ""
    ? stAge.classList.add("error-input")
    : stAge.classList.remove("error-input");
  stEmail.value.trim() === ""
    ? stEmail.classList.add("error-input")
    : stEmail.classList.remove("error-input");
  stMobileNumber.value.trim() === ""
    ? stMobileNumber.classList.add("error-input")
    : stMobileNumber.classList.remove("error-input");
  stImg.value === ""
    ? stImg.classList.add("error-input")
    : stImg.classList.remove("error-input");
}

function clearInputs(stName, stSurname, stAge, stEmail, stMobileNumber, stImg) {
  (stName.value = ""),
    (stSurname.value = ""),
    (stAge.value = ""),
    (stEmail.value = ""),
    (stMobileNumber.value = ""),
    (stImg.value = "");
}

class studentInfo {
  constructor(stName, stSurname, stAge, stEmail, stMobileNumber) {
    this.stName = stName.value.trim();
    this.stSurname = stSurname.value.trim();
    this.stAge = stAge.value.trim();
    this.stEmail = stEmail.value.trim();
    this.stMobileNumber = stMobileNumber.value.trim();
  }
}

submitBTN.addEventListener("submit", (e) => {
  e.preventDefault();
  arr = [];
  inputValidation(
    studentName,
    studentSurname,
    studentAge,
    studentEmail,
    studentMobileNumber,
    studentImg
  );

  if (!document.querySelector(".error-input")) {
    let studentItem = new studentInfo(
      studentName,
      studentSurname,
      studentAge,
      studentEmail,
      studentMobileNumber
    );

    arr.push(studentItem);

    arr.forEach((item) => {
      // ---------------------------------------------Img Upload------------------
      let reader = new FileReader();
      reader.readAsDataURL(studentImg.files[0]);

      reader.onload = function () {
        let trEl = document.createElement("tr");
        trEl.classList.add("student-item");
        let stImg = document.createElement("img");
        stImg.classList.add("student-img");
        stImg.setAttribute("src", reader.result);
        trEl.appendChild(stImg);
        trEl.innerHTML += `
        <td class='st name'>${item.stName}</td>
        <td class='st surname'>${item.stSurname}</td>
        <td class='st age'>${item.stAge}</td>
        <td class='st email'>${item.stEmail}</td>
        <td class='st mob-number'>${item.stMobileNumber}</td>`;
        studentList.appendChild(trEl);
      };
    });

    clearInputs(
      studentName,
      studentSurname,
      studentAge,
      studentEmail,
      studentMobileNumber,
      studentImg
    );
  }
});
