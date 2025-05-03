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

// Ensure the cart is not empty before proceeding to checkout
if (empty($_SESSION['cart'])) {
    header("Location: order.php");
    exit;
}

// Fetch all products from the database for the checkout
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

// Process order when form is submitted
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Example: Save the order in the database
    $user_id = $_SESSION['user_id'] ?? null; // Assuming the user is logged in
    $order_date = date('Y-m-d H:i:s');

    // Insert the order details
    $stmt = $conn->prepare("INSERT INTO orders (user_id, total_price, order_date) VALUES (?, ?, ?)");
    $stmt->bind_param("ids", $user_id, $total_price, $order_date);

    if ($stmt->execute()) {
        $order_id = $stmt->insert_id;

        // Insert order items
        foreach ($_SESSION['cart'] as $product_id => $quantity) {
            $product_price = $products[$product_id]['price'];
            $stmt = $conn->prepare("INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)");
            $stmt->bind_param("iiid", $order_id, $product_id, $quantity, $product_price);
            $stmt->execute();
        }

        // Clear the cart after successful order
        unset($_SESSION['cart']);
        header("Location: order_confirmation.php?order_id=$order_id");
        exit;
    } else {
        echo "Error: Could not place the order.";
    }
}
?>

<?php
// This PHP section is only for logic and processing, HTML is in the next section
$conn->close();
?>
