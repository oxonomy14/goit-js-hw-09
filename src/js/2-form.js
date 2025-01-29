const STORAGE_KEY = 'feedback-form-state';

const refs = {
  form: document.querySelector('.feedback-form'),
};

const formData = {
  email: '',
  message: '',
};

// Зберігаємо значення

refs.form.addEventListener('input', e => {
  // console.log(e.currentTargettarget);
  const email = e.currentTarget.elements.email.value; // currentTarget - елемент на якому подія стається. Маючи посилання на форму, ми можемо дістати значення з поточних input
  const message = e.currentTarget.elements.message.value;
  //console.log(email, message);
  const formData = { email, message }; // створюємо об'єкт і кладемо ці два значення
  //console.log(formData);
  saveToLS(STORAGE_KEY, formData);
});

//  Завантаження під час відкриття сторінки

initPage();

function initPage() {
  const formData = loadFromLS(STORAGE_KEY);
  refs.form.elements.email.value = formData?.email || ''; // ? - якщо властивості немає - то і не бери її
  refs.form.elements.message.value = formData?.message || '';
}

// під час submit - виводити інформацію

refs.form.addEventListener('submit', e => {
  e.preventDefault();
  if (
    !e.currentTarget.elements.email.value ||
    !e.currentTarget.elements.message.value
  ) {
    alert('Fill please all fields');
    return;
  }
  const email = e.currentTarget.elements.email.value;
  const message = e.currentTarget.elements.message.value;

  const formData = { email, message };
  console.log(formData);
  localStorage.removeItem(STORAGE_KEY);
  refs.form.reset();
});

// функції для LocalStorage

function saveToLS(key, value) {
  const jsonData = JSON.stringify(value);
  localStorage.setItem(key, jsonData);
}

function loadFromLS(key) {
  const body = localStorage.getItem(key);
  try {
    const data = JSON.parse(body);
    return data;
  } catch {
    return body;
  }
}
