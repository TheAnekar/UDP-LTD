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

// Initialize cart if not already set
if (!isset($_SESSION['cart'])) {
    $_SESSION['cart'] = [];
}

// Handle adding items to cart
if (isset($_GET['add_to_cart'])) {
    $product_id = $_GET['add_to_cart'];
    $quantity = $_GET['quantity'] ?? 1;

    // Check if the product is already in the cart
    if (isset($_SESSION['cart'][$product_id])) {
        $_SESSION['cart'][$product_id] += $quantity;
    } else {
        $_SESSION['cart'][$product_id] = $quantity;
    }

    header("Location: order.php");
    exit;
}

// Handle removing items from the cart
if (isset($_GET['remove_from_cart'])) {
    $product_id = $_GET['remove_from_cart'];
    unset($_SESSION['cart'][$product_id]);

    header("Location: order.php");
    exit;
}

// Handle updating item quantities in the cart
if (isset($_POST['update_cart'])) {
    foreach ($_POST['quantity'] as $product_id => $quantity) {
        if ($quantity > 0) {
            $_SESSION['cart'][$product_id] = $quantity;
        } else {
            unset($_SESSION['cart'][$product_id]);
        }
    }

    header("Location: order.php");
    exit;
}

// Fetch all products from the database
$products = [];
if (!empty($_SESSION['cart'])) {
    $product_ids = implode(',', array_keys($_SESSION['cart']));
    $result = $conn->query("SELECT * FROM products WHERE id IN ($product_ids)");

    while ($row = $result->fetch_assoc()) {
        $products[$row['id']] = $row;
    }
}

$total_price = 0;
foreach ($_SESSION['cart'] as $product_id => $quantity) {
    if (isset($products[$product_id])) {
        $total_price += $products[$product_id]['price'] * $quantity;
    }
}
?>

<?php
// This PHP section is only for logic and processing, HTML is in the next section
$conn->close();
?>
