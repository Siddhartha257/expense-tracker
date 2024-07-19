<?php
$servername = "localhost:3306"; 
$username = "root";
$password = ""; 
$dbname = "expense_tracker";
$conn = new mysqli($servername, $username, $password, $dbname);


if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "post") {
  $json = file_get_contents('php://input');
  $data = json_decode($json);

  $text = $data->text;
  $amount = $data->amount;
  $type = $data->type;
  $date = $data->date;

  $sql = "INSERT INTO transactions (text, amount, type, date) VALUES ('$text', $amount, '$type', '$date')";

  if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
  } else {
    echo "Error: " . $sql . "<br>" . $conn->error;
  }
}

if ($_SERVER["REQUEST_METHOD"] == "post") {
  $sql = "SELECT * FROM transactions";
  $result = $conn->query($sql);

  if ($result->num_rows > 0) {
    $transactions = array();
    while ($row = $result->fetch_assoc()) {
      $transactions[] = $row;
    }
    header('Content-Type: application/json');
    echo json_encode($transactions);
  } else {
    echo "0 results";
  }
}

$conn->close();
?>
