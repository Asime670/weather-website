
document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault(); 
  
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const errorMessage = document.getElementById("error-message");
  
  
  if (username.trim() === "" || password.trim() === "") {
    errorMessage.textContent = "Please fill in all fields.";
    return;
  }
  
  
  if (username === "admin" || (username === "Junior") || (username === 'Faith') || (username === "Tilla") || (username === "Marinus") || (username === 'Randy') && password === "password") {
    errorMessage.style.color = "green";
    errorMessage.textContent = window.location.href = 'WEATHER2.html';
    
  } else {
    errorMessage.style.color = "red";
    errorMessage.textContent = "Invalid username or password.";
  }
});
  