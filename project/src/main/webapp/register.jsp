<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!-- register.html (Registration Page) -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registration Page</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <video autoplay muted loop>
        <source src="deep01.mp4" type="video/mp4">
        Your browser does not support the video tag.
    </video>
    <div class="container" style="background: transparent;">
        <form action="Register" method="post">
            <h2>Register</h2>
            <label class="fo"  for="username">name:</label>
            <input class="io" type="text" id="username" name="username" required>
            <label class="fo"  for="username">email:</label>
            <input class="io" type="text" id="email" name="email" required>
            <label class="fo"  for="password">Password:</label>
            <input class="io" type="password" id="password" name="password" required>
            <label class="fo"  for="password">Confirm Password:</label>
            <input class="io" type="password" id="password" name="password" required>
            <button class="button01"><a href="weather.jsp">Register </a> </button>

        </form>

        <p><b><i>Already have an account? <a style="color: blueviolet;" href="login.jsp">Login here</a></p>
    </div>
</body>
</html>
    