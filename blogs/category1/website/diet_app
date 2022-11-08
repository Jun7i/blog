---
title: Diet app project
date: 2022-09-01
tags:
 - diet app
categories: 
 - Data Analysis
---

##view html
```
<!DOCTYPE html>
<!-- Zejun Li -->
<html>
<head>
<link rel="stylesheet" href="capstone.css">
<title>view</title>
<style>

</style>
</head>
<body>
	<h1>Smarter Choice!</h1>
	<h3>Healthy Food Alternatives</h3>
	<hr>
	<br>
	<!--  
<input type="text" id='name'> Food name
<br>
<br>
<button type="button" id='search' onClick="showFood()">Search</button>
<div id='divToChange'></div>
-->
	<!--  -->
	<div class='searchBar'>
		<form>
			<label for="foodName">Food name:</label> <input type="text" id="name">
			<br> <br>
			<button type="button" id="search" onClick="showFood()">Search</button>
		</form>
		<div id='divToChange'></div>

	</div>
	<script>
		function showFood() {
			var food = document.getElementById('name').value;

			var ajax = new XMLHttpRequest();
			ajax.open('GET', 'controller.php?tableName=foodtbl&substring='
					+ (food), true);
			ajax.send();
			ajax.onreadystatechange = function() {
				if (ajax.readyState == 4 && ajax.status == 200) {
					array = JSON.parse(ajax.responseText);
					if (array.length == 0) {
						str = "<br>No matches for: " + "'" + name.value + "'";
						document.getElementById('divToChange').innerHTML = str;
					} else {
						var str = "<br><br><h3>Results:</h3><table>";
						for (var i = 1; i < 10; i++) {
							var url = array[i].image_url;
							str += "<tr>";
							str += "<td>"
									+ "<a href='foodView.html'>Product Name: "
									+ array[i].product_name
									+ "</a>";
							if (url != 'undefined'){			
									str += "<br><img src = "+url+" width = '100px' height='100px'>";
									} else {
									str += "<br><img src = "+"https://toppng.com/uploads/preview/clipart-free-seaweed-clipart-draw-food-placeholder-11562968708qhzooxrjly.png"+" width = '100px' height='100px'>";
									}
									 str += "</td>";
						}
						str += "</tr></table>";
						document.getElementById('divToChange').innerHTML = str;
					}
				}
			}
		}
	</script>
</body>
</html>
```
