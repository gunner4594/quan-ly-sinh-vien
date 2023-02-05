function emailIsvalid(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function save() {
    let fullname = document.getElementById('fullname').value;
    let mssv = document.getElementById('mssv').value;
    let email = document.getElementById('email').value;
    let phone = document.getElementById('phone').value;
    let address = document.getElementById('address').value;
    let gender = '';
    if (document.getElementById('male').checked) {
        gender = document.getElementById('male').value;
    } else if (document.getElementById('famale').checked) {
        gender = document.getElementById('famale').value;
    }

    if (fullname === '') {
        // fullname = ''
        document.getElementById('name-error').innerHTML = 'Vui lòng nhập họ và tên!';
    } else if (fullname.trim().length < 2) {
        fullname = '';
        document.getElementById('name-error').innerHTML = 'Vui lòng nhập hơn 2 kí tự!';
    } else if (fullname.trim().length > 50) {
        fullname = '';
        document.getElementById('name-error').innerHTML = 'Tên không vượt quá 50 kí tự!';
    } else {
        document.getElementById('name-error').innerHTML = '';
    }

    if (mssv === '') {
        // mssv = '';
        document.getElementById('mssv-error').innerHTML = 'Vui lòng nhập MSSV!';
    } else if (mssv.trim().length != 6) {
        mssv = '';
        document.getElementById('mssv-error').innerHTML = 'MSSV phải bao gồm 6 số!';
    } else {
        document.getElementById('mssv-error').innerHTML = '';
    }

    if (email === '') {
        // email = '';
        document.getElementById('email-error').innerHTML = 'Vui lòng nhập email!';
    } else if (!emailIsvalid(email)) {
        email = '';
        document.getElementById('email-error').innerHTML = 'Email không đúng định dạng!';
    } else {
        document.getElementById('email-error').innerHTML = '';
    }

    if (phone === '') {
        // phone = '';
        document.getElementById('phone-error').innerHTML = 'Vui lòng nhập số điện thoại!';
    } else if (phone.trim().length > 11) {
        phone = '';
        document.getElementById('phone-error').innerHTML = 'Số điện thoại không đúng!';
    } else {
        document.getElementById('phone-error').innerHTML = '';
    }

    if (address === '') {
        // address = '';
        document.getElementById('address-error').innerHTML = 'Vui lòng nhập địa chỉ!';
    } else {
        document.getElementById('address-error').innerHTML = '';
    }

    if (gender === '') {
        // gender = '';
        document.getElementById('gender-error').innerHTML = 'Vui lòng chọn giới tính!';
    } else {
        document.getElementById('gender-error').innerHTML = '';
    }

    if (fullname && mssv && email && phone && address && gender) {
        let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : [];
        let student = {
            fullname: fullname,
            mssv: mssv,
            email: email,
            phone: phone,
            address: address,
            gender: gender
        }

        let index = students.findIndex((c) => c.mssv === student.mssv);
        if (index >= 0) {
            students.splice(index, 1, student)
        } else {
            students.push(student)
        }
        localStorage.setItem('students', JSON.stringify(students));
        this.renderListStudent()
        this.clear()
    }
}

function renderListStudent() {
    let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : [];
    if (students.length === 0) {
        document.getElementById('list-student').style.display = 'none';
        return false;
    }
    document.getElementById('list-student').style.display = 'block';
    let tableContent = `  <tr>
            <td width="20">STT</td>
            <td>Họ và tên</td>
            <td width="50">MSSV</td>
            <td>Email</td>
            <td>Điện thoại</td>
            <td>Giới tính</td>
            <td>Địa chỉ</td>
            <td>Hành động</td>
        </tr>`;

    students.forEach((student, index) => {
        let studentId = index;
        let genderLabel = parseInt(student.gender) === 1 ? 'Nam' : 'Nữ';
        index++;
        tableContent += `<tr>
            <td>${index}</td>
            <td>${student.fullname}</td>
            <td>${student.mssv}</td>
            <td>${student.email}</td>
            <td>${student.phone}</td>
            <td>${genderLabel}</td>
            <td>${student.address}</td>
            <td>
               <a href="#" onclick="editStudent(${studentId})">Edit</a> | <a href="#" onclick="deleteStudent(${studentId})">Delete</a>
            </td>
            </tr>`
    })
    document.getElementById('grid-students').innerHTML = tableContent;
}

function clear () {
    document.getElementById('fullname').value = '';
    document.getElementById('mssv').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('address').value = '';
    document.getElementById('male').checked = '';
    document.getElementById('famale').checked = '';
}

function deleteStudent(id) {
    let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : [];
    students.splice(id, 1);
    localStorage.setItem('students', JSON.stringify(students));
    renderListStudent()
}

function editStudent(id) {
    let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : [];
    document.getElementById('fullname').value = students[id].fullname;
    document.getElementById('mssv').value = students[id].mssv;
    document.getElementById('email').value = students[id].email;
    document.getElementById('phone').value = students[id].phone;
    document.getElementById('address').value = students[id].address;
}






