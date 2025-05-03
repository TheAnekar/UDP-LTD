<?php
$host = "localhost";
$db = "ecommerce"; // Replace with your database name
$user = "root";
$pass = "";

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Registration logic
    if (isset($_POST['register'])) {
        $name = $_POST['name'];
        $username = $_POST['username'];
        $email = $_POST['email'];
        $password = $_POST['password'];
        $confirm_password = $_POST['confirm_password'];

        // Passwords must match
        if ($password !== $confirm_password) {
            echo "Passwords do not match.";
            exit;
        }

        // Check if email or username already exists
        $check = $conn->prepare("SELECT id FROM users WHERE email = ? OR username = ?");
        $check->bind_param("ss", $email, $username);
        $check->execute();
        $check->store_result();

        if ($check->num_rows > 0) {
            echo "Email or Username already exists.";
        } else {
            $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
            $stmt = $conn->prepare("INSERT INTO users (name, username, email, password) VALUES (?, ?, ?, ?)");
            $stmt->bind_param("ssss", $name, $username, $email, $hashedPassword);
            if ($stmt->execute()) {
                echo "Registration successful.";
            } else {
                echo "Registration failed.";
            }
            $stmt->close();
        }

        $check->close();

    }

    // Login logic
    elseif (isset($_POST['login'])) {
        $email = $_POST['email'];
        $password = $_POST['password'];

        $stmt = $conn->prepare("SELECT password FROM users WHERE email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $stmt->bind_result($hashedPassword);

        if ($stmt->fetch() && password_verify($password, $hashedPassword)) {
            echo "Login successful.";
        } else {
            echo "Invalid email or password.";
        }

        $stmt->close();
    }
}

$conn->close();
?>
