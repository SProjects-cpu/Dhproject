<?php
header('Content-Type: application/json');

// Retrieve the ingredient from the query parameters
$ingredient = isset($_GET['ingredient']) ? $_GET['ingredient'] : '';
$appId = '56e084c6';  // Replace with your actual App ID
$appKey = 'a8070dface4fd56392a3eccfa07bdc5b';  // Replace with your actual App Key

// Validate the ingredient input
if (empty($ingredient)) {
    echo json_encode(['error' => 'Ingredient parameter is required.']);
    exit;
}

// Prepare the API URL
$apiUrl = "https://api.edamam.com/search?q=" . urlencode($ingredient) . "&app_id=" . $appId . "&app_key=" . $appKey;

// Use cURL to fetch data from the API
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $apiUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);

if (curl_errno($ch)) {
    http_response_code(500);
    echo json_encode(['error' => 'Unable to fetch data from Edamam API: ' . curl_error($ch)]);
    curl_close($ch);
    exit;
}

curl_close($ch);

// Return the API response
echo $response;
?>
