let redirectURL = "";
let isButtonClicked = false;
const now = new Date().toISOString().slice(0, 16);

const getUrl = () => {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
      if (tabs && tabs.length > 0) {
        resolve(tabs[0].url);
      } else {
        reject(new Error("No active tabs found"));
      }
    });
  });
};

const button = document.querySelector(".btn");
const formContainer = document.querySelector(".form-container");
const link = document.querySelector(".link");
const linkContainer = document.querySelector(".link-container");
const copy = document.querySelector(".copy");
const copyText = document.querySelector(".copy-text");
const isCopied = false;
const passCheckBox = document.querySelector("#pass-checkbox");
const dateCheckbox = document.querySelector("#date-checkbox");
const dateInput = document.querySelector("#date-input");
dateInput.setAttribute("min",now)

// to open url in new tab
link.addEventListener("click", function () {
  chrome.tabs.create({ url: redirectURL });
});

copy.addEventListener("click", async function () {
  await navigator.clipboard.writeText(redirectURL);
  copy.classList.add("hidden");
  copyText.classList.remove("hidden");
});

passCheckBox.addEventListener("click",  function (
) {
    const passInput = document.querySelector('#pass-input');
    passInput.classList.toggle("hidden");
})

dateCheckbox.addEventListener("click",  function (
    ) {
        const dateInput = document.querySelector('#date-input');
        dateInput.classList.toggle("hidden");
    })
    
    





button.addEventListener("click", async () => {
    try {
      const url = await getUrl();
      const passCheck = document.querySelector('#pass-checkbox').value;
      const dateCheck = document.querySelector('#date-checkbox').value;

      const pass = document.querySelector('#pass-input').value
      const date = document.querySelector('#date-input').value

      const response = await fetch("https://swiftsnif-student-aman.koyeb.app", {
        method: "POST",
        body: JSON.stringify({ url 
      , ...(pass && passCheck  && {password:pass})
      , ...(date && dateCheck  && {expirationTime:date})

      }),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const { shortId } = await response.json();
      redirectURL = `https://swiftsnif-student-aman.koyeb.app/${shortId}`;
      link.textContent = redirectURL;
      formContainer.classList.add("hidden");
      linkContainer.classList.remove("hidden");
    } catch (err) {
      console.log("something went wrong", err.message);
    }
  });
  