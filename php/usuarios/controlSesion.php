<?php
session_start();

// Assume you have a way to set this when the user logs in
// For example, after a successful login, you might set:
// $_SESSION['userName'] = 'JohnDoe';
// $_SESSION['loggedIn'] = true;

$userLoggedIn = isset($_SESSION['loggedIn']) && $_SESSION['loggedIn'];
$userName = $userLoggedIn ? $_SESSION['userName'] : 'Guest';
?>

<script>
    // Pass PHP variables to JavaScript
    const userLoggedIn = <?php echo json_encode($userLoggedIn); ?>;
    const userName = <?php echo json_encode($userName); ?>;
</script>