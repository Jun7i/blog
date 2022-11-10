---
title: Diet app project
date: 2022-09-01
tags:
 - diet app
categories: 
 - Website
---

## view.html
```html
<!DOCTYPE html>
<!-- Zejun Li -->
<html>

<head>
	<link rel="stylesheet" href="capstone.css">
	<title>view</title>
	<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
	<script type="text/javascript">


	</script>
</head>

<body>

	<div class="header">
		<div class="headerText">
			Diet <span>App</span>
		</div>
		<span class="headerHome" onclick="showAllFood()">home</span>
	</div>
	<div class='searchBar'>
		<br>
		<label for="foodName">Food name:</label> <input type="text" id="name">
		<br>
		<button type="button" id="search" onClick="showAllFood()">Search</button>
	</div>

	<div id='divToChange'></div>
	<div id='pie'></div>
	<script type="text/javascript">
		function showAllFood() {
			var food = document.getElementById('name').value;
			var ajax = new XMLHttpRequest();
			ajax.open('GET', 'controller.php?tableName=foodtbl&substring='
				+ food, true);
			ajax.send();
			ajax.onreadystatechange = function () {
				if (ajax.readyState == 4 && ajax.status == 200) {
					array = JSON.parse(ajax.responseText);
					if (array.length == 0) {
						str = "<br>No matches for: " + "'" + name.value + "'";
						document.getElementById('divToChange').innerHTML = str;
					} else {
						var str = "";
						for (var i = 0; i < 12; i++) {
							var url = array[i].image_url;
							str += "<div class='onebook'>";
							if (url != 'undefined') {
								str += "<h5>" + array[i].product_name + "</h5>" + "<img src = '" + array[i].image_url
									+ "'id='" + array[i].product_name + "'onclick = 'showFood(this, " + i + ")'>";
							} else {
								str += "<h5>" + array[i].product_name + "</h5>" + "<img src = '"
									+ "https://toppng.com/uploads/preview/clipart-free-seaweed-clipart-draw-food-placeholder-11562968708qhzooxrjly.png"
									+ "'onclick = 'showFood(this, " + i + ")'>";
							}
							str += "</div>";
						}
						document.getElementById('divToChange').innerHTML = str;
					}
				}
			}
		}

		var product;
		var energy;
		var fat;
		var saturated_fat;
		var sugar;
		var salt;
		var sodium;
		var fiber;
		var calories;
		var proteins;
		var score;
		var str = "";
		function showFood(food, index) {
			var ajax = new XMLHttpRequest();
			var name = food.id;
			ajax.open("GET", 'controller.php?tableName=foodtb&substring =' + index + '&id=' + name, true);
			ajax.send();
			ajax.onreadystatechange = function () {
				if (ajax.readyState == 4 && ajax.status == 200) {
					array = JSON.parse(ajax.responseText);
				}
			}

			product = array[index].product_name;
			energy = array[index].energy_100g;
			fat = array[index].fat_100g;
			saturated_fat = array[index].saturated_fat_100g;
			sugar = array[index].sugars_100g;
			salt = array[index].salt_100g;
			sodium = array[index].sodium_100g;
			fiber = array[index].fiber_100g;
			calories = array[index].calories;
			proteins = array[index].proteins_100g;
			str += '<br>';
			str += 'Product_name: ' + product;
			document.getElementById('divToChange').innerHTML = str;
			google.charts.load("current", { packages: ["corechart"] });
			google.charts.setOnLoadCallback(drawChart);

		}


		function drawChart() {
			var data = google.visualization.arrayToDataTable([
				['Food info', 'number'],
				['Energy', energy],
				['Fat', fat],
				['Saturated fat', saturated_fat],
				['Sugar', sugar],
				['Salt', salt],
				['Sodium', sodium],
				['Fiber', fiber],
				['Calories', calories],
				['Proteins', proteins]
			]);

			var options = {
				backgroundColor: '#fefcf4',
				title: product,
				width: 600,
				height: 600,
			};
			var chart = new google.visualization.PieChart(document.getElementById('pie'));


			chart.draw(data, options);
		}

	</script>


</body>

</html>
```
## DatabaseAdaptor.php
```php
<?php

// Author: Zejun Li
class DatabaseAdaptor
{
    
    private $DB;
    public function __construct()
    {
        $dataBase = 'mysql:dbname=fooddb;charset=utf8;host=127.0.0.1';
        $user = 'root';
        $password = ''; // Empty string with XAMPP install
        try {
            $this->DB = new PDO($dataBase, $user, $password);
            $this->DB->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            echo ('Error establishing Connection');
            exit();
        }
    }
    
    public function getFood($input)
    {
        $stmt = $this->DB->prepare("SELECT product_name, image_url, calories, proteins_100g, categories_en FROM foodtbl WHERE categories_en LIKE'%".$input."%' ORDER BY Food_item_score DESC;");
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    
    public function getOneFood($input)
    {
        $stmt = $this->DB->prepare("SELECT product_name, image_url, calories, protein_100g FROM foodtbl WHERE product_name ='" . $input . "%';");
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    
}
```

## controller.php
```php
<?php
// Author: Zejun Li
include 'DatabaseAdaptor.php';
$theDBA = new DatabaseAdaptor();

if ( ( $_GET['tableName'] === "foodtbl" && is_string($_GET['substring'])) ) {
    echo json_encode($theDBA->getFood($_GET['substring']));
}
if ($_GET['tableName'] === "foodtb") {
    echo json_encode($theDBA->getOneFood($_GET['id']));
}
?>
```

## capstone.css
``` css
body {
	background-color: #fefcf4;
	margin: 0px;
}

.searchBar {
	width: 500px;
	margin: auto;
	font-family: cursive;
	text-align: center;
	font-size: 20pt;
}

.onebook {
	background-color: #f4f1eb;
	border-radius: 5px;
	box-shadow: 0 0 15px gray;
	float: left;
	margin: 40px;
	padding: 10px;
	width: 150px;
	height: 230px;
}


img {
	height: 150px;
	width: 150px;
	float: left;
	padding-top: -50px;
}

.thedetails {
	padding: 10px;
	margin: 10px;
	float: left;
	width: 900px;
	height: 300px;
}

.headerHome {
	border: #974455 solid 3px;
	bottom: 5px;
	color: #974455;
	font-size: 18pt;
	right: 10%;
	padding: 3px;
	position: absolute;
	margin: 20px;
}

.header {
	background-image: url("https://cdn.wallpapersafari.com/14/72/MBtfu9.jpg");
	box-shadow: 0 5px 5px rgb(58, 37, 37);
	height: 104px;
	position: relative;
}


.headerText {
	margin: 20px;
}

.header>div {
	bottom: 0px;
	color: #6f0218;
	font-family: Tahoma, sans-serif;
	font-size: 36pt;
	position: absolute;
	left: 10%;
}
```
