<?php
/**
 * Your Email. All Contact messages will be sent there
 */
$your_email = 'example@example.org';

/**
 * Products list. You can change the way you get them in following array
 */
$products_list = array(
	1 => array('title' => 'Mobile Phone One', 'price' => 149),
	2 => array('title' => 'Mobile Phone Two', 'price' => 199),
	3 => array('title' => 'Mobile Phone Three', 'price' => 249),
	4 => array('title' => 'Mobile Phone Four', 'price' => 399),
);

/* Do not change any code below this line unless you are sure what you are doing. */
$name = $_POST['name'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$products = $_POST['products'];
$products_result = array();

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

if (empty($products) OR ( ! is_array($products)))
{
	$errors['products'] = 'Please select Items!';
}

if (count($errors) == 0)
{

	foreach ($products as $product_id => $product_count)
	{
		if (isset($products_list[$product_id])) {
			$products_result[$product_id] = array(
				'count' => $product_count,
				'title' => $products_list[$product_id]['title'],
				'price' => $products_list[$product_id]['price'],
			);
		}
	}

	if (count($products_result) > 0)
	{
		require 'inc/class.phpmailer.php';
		$mail = new PHPMailer;

		$mail->AddAddress($your_email);

		$mail->From = $email;
		$mail->FromName = '';
		$mail->Subject = 'Purchase request from http://'.$_SERVER['HTTP_HOST'].'/';


		$body = "Name: ".$name."\n"."Email: ".$email."\n"."Phone: ".$phone."\n\n"."Products:\n";
		foreach ($products_result as $product_id => $product)
		{
			if (empty($_POST['products'][$product_id]) OR $_POST['products'][$product_id] == 0)
			{
				continue;
			}
			$body .= $product['title'].": ".$_POST['products'][$product_id]."x$".$product['price']."\n";
			$total += $_POST['products'][$product_id]*$product['price'];
		}
		$body .= "Total: $".$total;

		$mail->Body = $body;

		if($mail->Send()) {
			$response = array ('success' => 1);
			echo json_encode($response);
			exit;

		} else {
			$errors['sending'] = 'An error occurred while sending your message! Please try again later.';

		}
	}
	else
	{
		$errors['sending'] = 'An error occurred while sending your message! Please try again later.';
	}


}

$response = array ('success' => 0, 'errors' => $errors);
echo json_encode($response);
exit;
