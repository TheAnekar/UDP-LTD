<?php
session_start();

// Database connection
$host = "localhost";
$db = "ecommerce";
$user = "root"; // default for XAMPP
$pass = "";     // default password is blank

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Message to be displayed
$message = "";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Sanitize input
    $action = $_POST['action'] ?? ''; // Use null coalescing operator to prevent undefined index warnings

    if ($action === 'register') {
        // Registration logic
        $name = $_POST['name'];
        $username = $_POST['username']; // Keep username in registration
        $email = $_POST['email'];
        $password = $_POST['password'];
        $confirm_password = $_POST['confirm_password'];

        // Validate fields
        if ($password !== $confirm_password) {
            $message = "Passwords do not match!";
        } else {
            // Check if username or email already exists
            $check = $conn->prepare("SELECT id FROM users WHERE username=? OR email=?");
            $check->bind_param("ss", $username, $email);
            $check->execute();
            $check->store_result();

            if ($check->num_rows > 0) {
                $message = "Username or email is already in use!";
            } else {
                $hashed_password = password_hash($password, PASSWORD_DEFAULT);
                $stmt = $conn->prepare("INSERT INTO users (name, username, email, password) VALUES (?, ?, ?, ?)");
                $stmt->bind_param("ssss", $name, $username, $email, $hashed_password);

                if ($stmt->execute()) {
                    // Redirect to login page with success message
                    header("Location: ../login.html?success=1");
                    exit;
                } else {
                    $message = "Registration failed. Please try again.";
                }
            }
        }
    } elseif ($action === 'login') {
        // Login logic
        if (isset($_POST['email']) && isset($_POST['password'])) {
            $email = $_POST['email'];
            $password = $_POST['password'];

            // Login based on email
            $stmt = $conn->prepare("SELECT id, password FROM users WHERE email=?");
            $stmt->bind_param("s", $email);
            $stmt->execute();
            $stmt->store_result();

            if ($stmt->num_rows === 1) {
                $stmt->bind_result($user_id, $hashed_password);
                $stmt->fetch();

                if (password_verify($password, $hashed_password)) {
                    $_SESSION['user_id'] = $user_id;
                    // Redirect to the main page (main.html)
                    header("Location: ../Main.html");
                    exit;
                } else {
                    $message = "Incorrect password.";
                }
            } else {
                $message = "User not found.";
            }
        } else {
            $message = "Please fill in both email and password.";
        }
    }
}
?>

<!-- Show error/success message in the same page -->
<?php if (!empty($message)) : ?>
    <div style="color: red; font-weight: bold;"><?= htmlspecialchars($message) ?></div>
<?php endif; ?>

<?php if (isset($_GET['success'])) : ?>
    <div style="color: green; font-weight: bold;">Registration successful! You can now log in.</div>
<?php endif; ?>
