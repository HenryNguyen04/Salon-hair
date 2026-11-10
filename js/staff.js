const MAX_STAFF = 10;

let staffs = [];
let nextId = 1;

const staffList = document.getElementById("staffList");
const counter = document.getElementById("counter");
const message = document.getElementById("message");
const nameInput = document.getElementById("nameInput");
const roleInput = document.getElementById("roleInput");
const addBtn = document.getElementById("addBtn");

function render() {
  staffList.innerHTML = "";

  if (staffs.length === 0) {
    staffList.innerHTML = '<p class="empty">Chưa có nhân viên nào.</p>';
  }

  staffs.forEach((s) => {
    const card = document.createElement("div");

    card.className = "staff-card";

    card.innerHTML = `
            <div class="avatar">
                ${s.name.trim().charAt(0).toUpperCase()}
            </div>

            <h3></h3>
            <p></p>

            <button onclick="removeStaff(${s.id})">
                Xóa
            </button>
        `;

    card.querySelector("h3").textContent = s.name;
    card.querySelector("p").textContent = s.role;

    staffList.appendChild(card);
  });

  counter.textContent = `Đang có ${staffs.length}/${MAX_STAFF} nhân viên`;

  addBtn.disabled = staffs.length >= MAX_STAFF;
}

function addStaff() {
  const name = nameInput.value.trim();
  const role = roleInput.value.trim();

  message.textContent = "";

  if (staffs.length >= MAX_STAFF) {
    message.textContent = `Chỉ được tối đa ${MAX_STAFF} nhân viên!`;

    return;
  }

  if (!name || !role) {
    message.textContent = "Vui lòng nhập đầy đủ tên và vị trí.";

    return;
  }

  staffs.push({
    id: nextId++,
    name: name,
    role: role,
  });

  nameInput.value = "";
  roleInput.value = "";

  render();
}

function removeStaff(id) {
  staffs = staffs.filter((s) => s.id !== id);

  message.textContent = "";

  render();
}

addBtn.addEventListener("click", addStaff);

[nameInput, roleInput].forEach((el) => {
  el.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      addStaff();
    }
  });
});
render();
