const form = document.getElementById("applyForm");
const errorBox = document.getElementById("cError");

function showError(msg) {
  errorBox.classList.remove("ok");
  errorBox.textContent = msg;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const val = (id) => document.getElementById(id).value.trim();
  const position = form.querySelector('input[name="position"]:checked');
  const types = form.querySelectorAll('input[name="type"]:checked');

  if (
    !val("fName") ||
    !val("fAddress") ||
    !val("fCity") ||
    !val("fPhone") ||
    !val("fEmail")
  ) {
    return showError("Vui lòng điền đầy đủ các mục có dấu *.");
  }
  if (!/^0\d{9}$/.test(val("fPhone").replace(/\s/g, ""))) {
    return showError("Số điện thoại cần có 10 chữ số và bắt đầu bằng 0.");
  }
  if (!/^\S+@\S+\.\S+$/.test(val("fEmail"))) {
    return showError("Email chưa đúng định dạng.");
  }
  if (
    !document.getElementById("fLegal").checked ||
    !document.getElementById("fAge").checked
  ) {
    return showError("Bạn cần xác nhận cả hai điều kiện ứng tuyển.");
  }
  if (!position) return showError("Vui lòng chọn vị trí ứng tuyển.");
  if (types.length === 0) return showError("Vui lòng chọn hình thức làm việc.");

  const data = {
    name: val("fName"),
    address: val("fAddress"),
    city: val("fCity"),
    phone: val("fPhone"),
    email: val("fEmail"),
    social: val("fSocial"),
    position: position.value,
    types: [...types].map((t) => t.value),
  };
  console.log("Hồ sơ ứng tuyển:", data);

  errorBox.classList.add("ok");
  errorBox.textContent = "Đã nhận hồ sơ. Chúng tôi sẽ liên hệ bạn sớm.";
  form.reset();
});
