<!-- index.html (Login Page) -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login Page</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body ">
    <video autoplay muted loop>
        <source src="deep01.mp4" type="video/mp4">
        Your browser does not support the video tag.
    </video>
    <div class="container" style="background: transparent;">
        <form action="login" method="post">
            <h2>Login</h2>
            <label class="fo" for="username">Username:</label>
            <input class="io" type="text" id="username" name="username" required>

            <label class="fo"  for="password">Password:</label>
            <input class="io" type="password" id="password" name="password" required>
           
            <button class="button01"><a href="weather.html">login </a> </button>
            <!-- <input type="submit" value="Login" "> -->
        </form>
        <p ><b><i>Don't have an account? <a style="color: blueviolet;" href="register.jsp">Register here</a></p>
    </div>
</body>
</html>
