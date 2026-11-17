const loginForm = document.querySelector(".login-form");
const registerForm = document.querySelector(".register-form");
const showRegister = document.getElementById("showRegister");
const showLogin = document.getElementById("showLogin");
const loginError = document.getElementById("loginError");
const regError = document.getElementById("regError");

showRegister.addEventListener("click", (e) => {
  e.preventDefault();
  loginForm.classList.remove("active");
  registerForm.classList.add("active");
});
showLogin.addEventListener("click", (e) => {
  e.preventDefault();
  registerForm.classList.remove("active");
  loginForm.classList.add("active");
});

async function postJSON(url, body) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok)
    throw new Error(data.message || "Có lỗi xảy ra, vui lòng thử lại.");
  return data;
}

function setMsg(el, text, ok = false) {
  el.textContent = text;
  el.style.color = ok ? "#9ad29a" : "#ff8a80";
}

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const btn = registerForm.querySelector("button[type=submit]");
  const pass = document.getElementById("regPass").value;
  const pass2 = document.getElementById("regPass2").value;

  if (pass.length < 6)
    return setMsg(regError, "Mật khẩu phải có ít nhất 6 ký tự.");
  if (pass !== pass2) return setMsg(regError, "Mật khẩu nhập lại không khớp.");

  btn.disabled = true;
  try {
    await postJSON("/api/register", {
      name: document.getElementById("regName").value,
      email: document.getElementById("regEmail").value,
      phone: document.getElementById("regPhone").value,
      password: pass,
    });
    registerForm.reset();
    setMsg(regError, "");
    // Quay về form đăng nhập
    registerForm.classList.remove("active");
    loginForm.classList.add("active");
    setMsg(loginError, "Đăng ký thành công, hãy đăng nhập.", true);
  } catch (err) {
    setMsg(regError, err.message);
  } finally {
    btn.disabled = false;
  }
});

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const btn = loginForm.querySelector("button[type=submit]");
  btn.disabled = true;
  try {
    await postJSON("/api/login", {
      email: document.getElementById("loginEmail").value,
      password: document.getElementById("loginPass").value,
      remember: document.getElementById("rememberMe").checked,
    });
    window.location.href = "/index.html";
  } catch (err) {
    setMsg(loginError, err.message);
    btn.disabled = false;
  }
});
