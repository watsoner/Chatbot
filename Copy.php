<!DOCTYPE html>
<html>
  <body>
    <?php 
	echo "My first PHP script!"; 
	if (defined('PHP_MAJOR_VERSION') && PHP_MAJOR_VERSION >= 5) 
    {
    echo 'Server has PHP 5 or above!';
    } 
    else 
    {
    echo 'Servers PHP version is lower then PHP5';
    };
	?>
  </body>
</html>