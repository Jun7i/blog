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
<script type="text/javascript"
	src="https://www.gstatic.com/charts/loader.js"></script>
<script type="text/javascript">
	
</script>
<style>
.imgout {
	height: 140px;
	width: 150px;
	float: left;
	margin-top: -10px;
}
.headerHome {
	border: rgb(0, 0, 0) solid 3px;
	bottom: -20px;
	color: rgb(0, 0, 0);
	font-size: 18pt;
	right: 10%;
	padding: 3px;
	position: relative;
	margin: 20px;
	float: right;
}

.header {
	background-image:
		url("https://media.istockphoto.com/id/1069944196/vector/the-abstract-vector-image-green-wave-on-white-background.jpg?s=612x612&w=0&k=20&c=-YGMrq4vYBxk17hRGenYvushzoJ9Pq_T2eXb2N250ic=");
	box-shadow: 0 5px 5px rgb(58, 37, 37);
	height: 104px;
	background-repeat: no-repeat;
	background-size: cover;
	position: relative;
}


.headerText {
	margin: 20px;
}


.header>div {
	bottom: -10px;
	color: black;
	font-family: Tahoma, sans-serif;
	font-size: 36pt;
	position: absolute;
	left: 10%;
}
</style>
</head>

<body>

	<div class="header">
		<div class="headerText">
			Better <span>Choice!</span>
			<img src = 'https://static.wixstatic.com/media/69e890_7ac3191467e244b3845421625a7f9e11~mv2.png/v1/fill/w_319,h_321,al_c,q_85,enc_auto/IMG_1596.png' width = 80px height = 80px>
			
		</div>
		<button class="headerHome" onclick="window.location.href='about.php'">About</button>
		<button class="headerHome" onclick="showAllFood()">Home</button>

	</div>
	<div class='searchBar'>
		<br> <label for="foodName">Food name:</label> <input type="text"
			id="name"> <br>
		<button type="button" id="search" onClick="showAllFood()">Search</button>
	</div>
	<div id='outer'>
		<div id='cardsID'></div>
		<div id='detailsID'></div>
		<div id='pieID'></div>
		<div id='tableID'></div>

	</div>


	<script type="text/javascript">
		function showAllFood() {
			var food = document.getElementById('name').value;
			var ajax = new XMLHttpRequest();
			ajax.open('GET', 'controller.php?tableName=foodtbl&substring='
					+ food, true);
			ajax.send();
			ajax.onreadystatechange = function() {
				if (ajax.readyState == 4 && ajax.status == 200) {
					array = JSON.parse(ajax.responseText);
					if (array.length == 0) {
						str = "<br>No matches for: " + "'" + name.value + "'";
						document.getElementById('cardsID').innerHTML = str;
					} else {
						var str = "";
						for (var i = 0; i < 12; i++) {
							var url = array[i].image_url;
							str += "<div class='onebook'>";
							if (url != 'undefined') {
								str += "<h5>" + array[i].brands + ": "
										+ array[i].product_name + "</h5>"
										+ "<img class ='imgout' src = '"
										+ array[i].image_url + "'id='"
										+ array[i].product_name
										+ "'onclick = 'showFood(this, " + i
										+ ")'>";
							} else {
								str += "<h5>"
										+ array[i].brands
										+ ": "
										+ array[i].product_name
										+ "</h5>"
										+ "<img class ='imgout' src = '"
										+ "https://toppng.com/uploads/preview/clipart-free-seaweed-clipart-draw-food-placeholder-11562968708qhzooxrjly.png"
										+ "'onclick = 'showFood(this, " + i
										+ ")'>";
							}
							str += "</div>";
						}
						document.getElementById('cardsID').innerHTML = str;
						document.getElementById('pieID').innerHTML = "";
						document.getElementById('tableID').innerHTML = "";
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
		var image;
		function showFood(food, index) {
			var ajax = new XMLHttpRequest();
			var name = food.id;
			var str = "";
			ajax.open("GET", 'controller.php?tableName=foodtb&substring ='
					+ index + '&id=' + name, true);
			ajax.send();
			ajax.onreadystatechange = function() {
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
			score = array[index].Food_item_score;
			var image = array[index].image_url;
			if (image == 'undefined'){
				image = "https://toppng.com/uploads/preview/clipart-free-seaweed-clipart-draw-food-placeholder-11562968708qhzooxrjly.png";
				}
			str += "<img class = 'imgin' src='"+image+"'>";
			str += '<span class="dot">';
			str += "<div class = 'score'> <h1>&nbsp&nbsp" + score
					+ '</div></h1>';
			str += '</span>';

			document.getElementById('cardsID').innerHTML = str;
			google.charts.load('current', {
				'packages' : [ 'table' ]
			});
			google.charts.load("current", {
				'packages' : [ "corechart" ]
			});
			google.charts.setOnLoadCallback(drawChart);

		}

		function drawChart() {
			var dataP = google.visualization.arrayToDataTable([
					[ 'Food info', 'number' ], [ 'Fat', fat ],
					[ 'Saturated fat', saturated_fat ], [ 'Sugar', sugar ],
					[ 'Salt', salt ], [ 'Sodium', sodium ], [ 'Fiber', fiber ],
					[ 'Proteins', proteins ] ]);
			var optionsP = {
				backgroundColor : '#fefcf4',
				title : product,
				width : 600,
				height : 600
			};
			var chart = new google.visualization.PieChart(document
					.getElementById('pieID'));
								var data = new google.visualization.DataTable();
	        data.addColumn('string', 'Nutrition facts');
	        data.addColumn('number', 'Number');
	        data.addRows([
	          ['Fat',  {v: fat}],
	          ['Saturated fat',   {v:saturated_fat}],
	          ['Sugar', {v: sugar}],
	          ['Salt',   {v: salt}],
	          ['Sodium', {v: sodium}],
	          ['Fiber', {v: fiber}],
	          ['Proteins', {v: proteins}],
	          ['Calories', {v: calories}],
	        ]);
	
	        var table = new google.visualization.Table(document.getElementById('tableID'));
	
	        table.draw(data, {showRowNumber: true, width: '100%', height: '100%'});
			chart.draw(dataP, optionsP);
			

		}
		
		function aboutPage(){
			
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
        $stmt = $this->DB->prepare("SELECT * FROM foodtbl WHERE categories_en LIKE'%".$input."%' ORDER BY Food_item_score DESC;");
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
   
    public function getOneFood($input)
    {
        $stmt = $this->DB->prepare("SELECT * FROM foodtbl WHERE product_name ='" . $input . "%';");
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
	margin: 30px;
	padding: 10px;
	width: 150px;
	height: 250px;
}



.imgin {
	height: 400px;
	width: 300px;
	float: right;
	margin-top: 100px;
	margin-right: 600px;
}

.score {
	margin-left: 30px;
	margin-top: 30px;
}

.dot {
	height: 100px;
	width: 100px;
	background-color: rgb(229, 255, 0);
	border-radius: 50%;
	display: inline-block;
	margin-left: 200px;
}



.header>div {
	bottom: -10px;
	color: black;
	font-family: Tahoma, sans-serif;
	font-size: 36pt;
	position: absolute;
	left: 10%;
}
```
