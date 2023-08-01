

var students = [
    { id: 1, name: "anh", age: 12, email: "ags@gmail.com", score: 20 },
    { id: 2, name: "hai", age: 15, email: "bs@gmail.com", score: 23 },
    { id: 3, name: "đạt", age: 13, email: "fs@gmail.com", score: 12 },
    { id: 4, name: "mạnh", age: 24, email: "es@gmail.com", score: 19 },
    { id: 5, name: "nam", age: 43, email: "bs@gmail.com", score: 24 },
    { id: 6, name: "hưng", age: 12, email: "ds@gmail.com", score: 21 },
    { id: 7, name: "tiến", age: 29, email: "cs@gmail.com", score: 27 },
    { id: 8, name: "tùng", age: 19, email: "gs@gmail.com", score: 10 },
    { id: 9, name: "trung", age: 20, email: "is@gmail.com", score: 9 },
    { id: 10, name: "định", age: 33, email: "ks@gmail.com", score: 14 },
    { id: 11, name: "trọng", age: 29, email: "sds@gmail.com", score: 27 },
    { id: 12, name: "sơn", age: 19, email: "gs@gmail.com", score: 18 },
    { id: 13, name: "chính", age: 24, email: "êrs@gmail.com", score: 15 },
    { id: 14, name: "thái", age: 32, email: "dfdf@gmail.com", score: 14 },
];
renderListStudent();
document.getElementById("updatebtn").style.display = "none"

var conditions = {
    keySearch: "",
    perPage: 3,
    currentPage: 1,
    sort: {
        type: "",
        filed: ""
    }
}


function addStudent() {
    var id = Date.now();
    var age = document.getElementById("age").value;
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var score = document.getElementById("score").value;
    var data = { id: id, name: name, age: age ? Number(age) : age, email: email, score: score ? Number(score) : score }

    var isValidate = validate(data);
    if (!isValidate) {
        return
    };

    students.unshift(data);
    renderListStudent();
    clear();
}


function clear() {
    id = "";
    document.getElementById("name").value = "";
    document.getElementById("age").value = "";
    document.getElementById("email").value = "";
    document.getElementById("score").value = "";
}


function filterStudents() {
    var resultStudents = JSON.parse(JSON.stringify(students));

    if (conditions.keyWord) {
        resultStudents = resultStudents.filter((item) => {
            return item.name.includes(conditions.keyWord);
        })
    }

    if (conditions.sort.filed) {
        const numberField = ["age", "score"];
        const stringField = ["name", "email"];
        if (numberField.includes(conditions.sort.filed)) {
            resultStudents = resultStudents.sort((a, b) => {
                if (conditions.sort.type === "ASC") {
                    return a[conditions.sort.filed] - b[conditions.sort.filed]
                }
                if (conditions.sort.type === "DESC") {
                    return b[conditions.sort.filed] - a[conditions.sort.filed]
                }
            })
        }
        if (stringField.includes(conditions.sort.filed)) {
            resultStudents = resultStudents.sort((a, b) => {
                if (conditions.sort.type === "ASC") {
                    return a[conditions.sort.filed].localeCompare(b[conditions.sort.filed])
                }
                if (conditions.sort.type === "DESC") {
                    return b[conditions.sort.filed].localeCompare(a[conditions.sort.filed])
                }
            })
        }
    }
    var totalItem = resultStudents.length;
    renderPageNumber(totalItem);

    document.getElementById("totalitem").innerHTML = `${totalItem} student`;
    
    resultStudents = resultStudents.slice(
        (conditions.currentPage - 1) * conditions.perPage,
        (conditions.currentPage - 1) * conditions.perPage + conditions.perPage
    )

    return resultStudents;
}

function validateEmail(email) {
    return !!String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};
var isValidEmail = validateEmail(email);

function validate({ name, age, email, score }) {
    if (name !== "") {
        if (name.trim().length < 1 || name.trim().length > 20) {
            window.alert("tên không được nhỏ hơn 1, và lớn hơn 20 ký tự")
            return false;
        }
    } else {
        window.alert("chưa nhập tên sinh viên")
        return false;
    }

    if (age !== "") {
        if (age < 10 || age > 80) {
            window.alert("tuổi không được nhỏ hơn 10, và lớn hơn 80")
            return false;
        }
    } else {
        window.alert("chưa nhập tuổi sinh viên")
        return false;
    }

    if (email !== "") {
        if (!isValidEmail) {
            window.alert("email không hợp lệ")
            return false;
        }
    } else {
        window.alert("chưa nhập email ")
        return false;
    }
    if (score !== "") {
        if (score < 1 || score > 30) {
            window.alert("điểm không được nhỏ hơn 1, và lớn hơn 30")
            return false;
        }
    } else {
        window.alert("chưa nhập điểm")
        return false;
    }
    return true;
}


function renderListStudent() {
    const array = filterStudents()
    var data = array.map((student) => {
        data = `<tr>
                    <td>${student.id}</td>
                    <td>${student.name}</td>
                    <td>${student.age}</td>
                    <td>${student.email}</td>
                    <td>${student.score}</td>
                    <td>
                    <button class="btn btn-warning" onclick="editStudent(${student.id})">
                        Edit
                    </button>
                    </td>
                    <td>
                    <button class="btn btn-danger" onclick="deleteStudent(${student.id})">
                        Delete
                    </button>
                    </td>
                </tr> `
        return data;
    })
    document.getElementById("tableStudent").innerHTML = data.join("")

}


function deleteStudent(id) {
    var student = students.find(item => item.id === id);
    students.splice(students.indexOf(student), 1);
    renderListStudent();

}

var idUpdate;
function editStudent(id) {
    idUpdate = id;
    let student = students.find(item => item.id === id);
    document.getElementById("name").value = student.name;
    document.getElementById("age").value = student.age;
    document.getElementById("email").value = student.email;
    document.getElementById("score").value = student.score;

    document.getElementById("updatebtn").style.display = "block";
    document.getElementById("addbtn").style.display = "none";
}


function updateStudent() {
    var student = students.find(item => item.id === idUpdate);

    student.id = student.id;
    student.name = document.getElementById("name").value;
    student.age = document.getElementById("age").value;
    student.email = document.getElementById("email").value;
    student.score = document.getElementById("score").value;
    const params = { name: student.name, age: student.age, email: student.email, score: student.score }
    let isValidate = validate(params);
    if (!isValidate) {
        return
    };

    renderListStudent();
    clear();

    document.getElementById("updatebtn").style.display = "none";
    document.getElementById("addbtn").style.display = "block";
}


function searchStudent() {
    conditions.keySearch = document.getElementById("search").value;
    renderListStudent();
    getElementPage(1);
};


function sort(field, type) {
    conditions.sort.filed = field
    conditions.sort.type = type
    renderListStudent()
    let currentId = field + type;
    let listId = ["nameASC", "nameDESC", "ageASC", "ageDESC", "emailASC", "emailDESC", "scoreASC", "scoreDESC"]
    for (i = 0; i < listId.length; i++) {
        if (currentId === listId[i]) {
            document.getElementById(`${listId[i]}`).style.backgroundColor = "red";
        } else {
            document.getElementById(`${listId[i]}`).style.backgroundColor = "";
        }
    }
}


function renderPageNumber(totalItems) {
    var totalPage = Math.ceil(totalItems / conditions.perPage);
    var data = "";
    for (let i = 1; i <= totalPage; i++) {
        data += `<li ${(i === conditions.currentPage ? 'style="color:red"' : "")} onclick="getElementPage(${i})">${i}</li>`
    }
    document.getElementById("numberPage").innerHTML = data;
}

function getElementPage(i) {
    conditions.currentPage = i
    renderListStudent();
}

