<?php
/**
 * Your Email. All Contact messages will be sent there
 */
$your_email = 'example@example.org';


/* Do not change any code below this line unless you are sure what you are doing. */
$name = $_POST['name'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$message = $_POST['message'];

$errors = array();

if ($name == '')
{
	$errors['name'] = 'Please enter your Name!';
}

if ($phone == '')
{
	$errors['phone'] = 'Please enter your Phone!';
}

if ( ! filter_var($email, FILTER_VALIDATE_EMAIL))
{
	$errors['email'] = 'Please enter a valid Email!';
}
if ($message == '')
{
	$errors['message'] = 'Please enter the Message!';
}

if (count($errors) == 0)
{
	require 'inc/class.phpmailer.php';
	$mail = new PHPMailer;

	$mail->AddAddress($your_email);

	$mail->From = $email;
	$mail->FromName = '';
	$mail->Subject = 'Contact request from http://'.$_SERVER['HTTP_HOST'].'/';
	$mail->Body = "Name: ".$name."\n"."Email: ".$email."\n"."Phone: ".$phone."\n\n"."Message:\n".$message;

	if($mail->Send()) {
		$response = array ('success' => 1);
		echo json_encode($response);
		exit;

	} else {
		$errors['sending'] = 'An error occurred while sending your message! Please try again later.';

	}

}

$response = array ('success' => 0, 'errors' => $errors);
echo json_encode($response);
exit;
