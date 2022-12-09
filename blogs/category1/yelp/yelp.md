---
title: Yelp Data Analysis project
date: 2022-05-16
tags:
 - Yelp
categories: 
 - Data Analysis
---
```python
import pandas as pd
from datetime import datetime
import numpy as np
import warnings
warnings.filterwarnings("ignore")
import seaborn as sns
import matplotlib.pyplot as plt
import folium
from folium import Choropleth, Circle, Marker
from folium.plugins import HeatMap, MarkerCluster
from yelpapi import YelpAPI
from pandas.io.json import json_normalize
from mpl_toolkits.basemap import Basemap
yelp_api = YelpAPI('cb0BcM2j1mJY8J7UGOGkrYy0KoMerRp6PM1zHhfbZjWLoAtbjeJtu84eYdTZ6wHa6zJkgyC4d7QXDeLWPU1AVLWt0RP5kArdH9q0DyHk4-0I-KdLw3mCDA2IO8n8YXYx')
```


```python
restaurants = yelp_api.search_query(location = 'Tucson, AZ',limit=50)
```


```python
restaurants = pd.json_normalize(restaurants['businesses'])
restaurants
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>id</th>
      <th>alias</th>
      <th>name</th>
      <th>image_url</th>
      <th>is_closed</th>
      <th>url</th>
      <th>review_count</th>
      <th>categories</th>
      <th>rating</th>
      <th>transactions</th>
      <th>...</th>
      <th>coordinates.latitude</th>
      <th>coordinates.longitude</th>
      <th>location.address1</th>
      <th>location.address2</th>
      <th>location.address3</th>
      <th>location.city</th>
      <th>location.zip_code</th>
      <th>location.country</th>
      <th>location.state</th>
      <th>location.display_address</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>UCMSWPqzXjd7QHq7v8PJjQ</td>
      <td>prep-and-pastry-tucson-7</td>
      <td>Prep and Pastry</td>
      <td>https://s3-media2.fl.yelpcdn.com/bphoto/vTw6zn...</td>
      <td>False</td>
      <td>https://www.yelp.com/biz/prep-and-pastry-tucso...</td>
      <td>2302</td>
      <td>[{'alias': 'breakfast_brunch', 'title': 'Break...</td>
      <td>4.5</td>
      <td>[delivery]</td>
      <td>...</td>
      <td>32.255528</td>
      <td>-110.943492</td>
      <td>2660 N Campbell Ave</td>
      <td>None</td>
      <td>None</td>
      <td>Tucson</td>
      <td>85719</td>
      <td>US</td>
      <td>AZ</td>
      <td>[2660 N Campbell Ave, Tucson, AZ 85719]</td>
    </tr>
    <tr>
      <th>1</th>
      <td>DVBJRvnCpkqaYl6nHroaMg</td>
      <td>tumerico-tucson</td>
      <td>Tumerico</td>
      <td>https://s3-media2.fl.yelpcdn.com/bphoto/B1SCus...</td>
      <td>False</td>
      <td>https://www.yelp.com/biz/tumerico-tucson?adjus...</td>
      <td>798</td>
      <td>[{'alias': 'vegan', 'title': 'Vegan'}, {'alias...</td>
      <td>5.0</td>
      <td>[delivery]</td>
      <td>...</td>
      <td>32.227705</td>
      <td>-110.934722</td>
      <td>2526 E 6th St</td>
      <td></td>
      <td>None</td>
      <td>Tucson</td>
      <td>85716</td>
      <td>US</td>
      <td>AZ</td>
      <td>[2526 E 6th St, Tucson, AZ 85716]</td>
    </tr>
    <tr>
      <th>2</th>
      <td>hyeo7JQr5uLp-St1MibYAA</td>
      <td>baja-cafe-tucson-2</td>
      <td>Baja Cafe</td>
      <td>https://s3-media3.fl.yelpcdn.com/bphoto/iu_wsA...</td>
      <td>False</td>
      <td>https://www.yelp.com/biz/baja-cafe-tucson-2?ad...</td>
      <td>1171</td>
      <td>[{'alias': 'breakfast_brunch', 'title': 'Break...</td>
      <td>4.5</td>
      <td>[delivery]</td>
      <td>...</td>
      <td>32.219760</td>
      <td>-110.843330</td>
      <td>7002 E Broadway Blvd</td>
      <td>None</td>
      <td></td>
      <td>Tucson</td>
      <td>85710</td>
      <td>US</td>
      <td>AZ</td>
      <td>[7002 E Broadway Blvd, Tucson, AZ 85710]</td>
    </tr>
    <tr>
      <th>3</th>
      <td>6Cs52T0ItZ5TQ5Qx-UGaMw</td>
      <td>baja-cafe-on-campbell-tucson</td>
      <td>Baja Cafe on Campbell</td>
      <td>https://s3-media3.fl.yelpcdn.com/bphoto/Pl4954...</td>
      <td>False</td>
      <td>https://www.yelp.com/biz/baja-cafe-on-campbell...</td>
      <td>789</td>
      <td>[{'alias': 'breakfast_brunch', 'title': 'Break...</td>
      <td>4.5</td>
      <td>[delivery]</td>
      <td>...</td>
      <td>32.260591</td>
      <td>-110.943850</td>
      <td>2970 N Campbell Ave</td>
      <td></td>
      <td></td>
      <td>Tucson</td>
      <td>85719</td>
      <td>US</td>
      <td>AZ</td>
      <td>[2970 N Campbell Ave, Tucson, AZ 85719]</td>
    </tr>
    <tr>
      <th>4</th>
      <td>WSx9-iYYyST_umny9sJBFg</td>
      <td>the-parish-tucson</td>
      <td>The Parish</td>
      <td>https://s3-media3.fl.yelpcdn.com/bphoto/At6VU7...</td>
      <td>False</td>
      <td>https://www.yelp.com/biz/the-parish-tucson?adj...</td>
      <td>1400</td>
      <td>[{'alias': 'gastropubs', 'title': 'Gastropubs'...</td>
      <td>4.5</td>
      <td>[pickup, delivery]</td>
      <td>...</td>
      <td>32.324500</td>
      <td>-110.975970</td>
      <td>6453 N Oracle Rd</td>
      <td></td>
      <td></td>
      <td>Tucson</td>
      <td>85704</td>
      <td>US</td>
      <td>AZ</td>
      <td>[6453 N Oracle Rd, Tucson, AZ 85704]</td>
    </tr>
    <tr>
      <th>5</th>
      <td>J-Go00lYW4f4a3lLLtoh_A</td>
      <td>bobos-restaurant-tucson-3</td>
      <td>Bobo's Restaurant</td>
      <td>https://s3-media1.fl.yelpcdn.com/bphoto/HxLqTk...</td>
      <td>False</td>
      <td>https://www.yelp.com/biz/bobos-restaurant-tucs...</td>
      <td>791</td>
      <td>[{'alias': 'breakfast_brunch', 'title': 'Break...</td>
      <td>4.5</td>
      <td>[delivery]</td>
      <td>...</td>
      <td>32.250080</td>
      <td>-110.927990</td>
      <td>2938 E Grant Rd</td>
      <td></td>
      <td></td>
      <td>Tucson</td>
      <td>85716</td>
      <td>US</td>
      <td>AZ</td>
      <td>[2938 E Grant Rd, Tucson, AZ 85716]</td>
    </tr>
    <tr>
      <th>6</th>
      <td>RHdEScVIAQ7xzFFMiQEnAQ</td>
      <td>the-quesadillas-tucson</td>
      <td>The Quesadillas</td>
      <td>https://s3-media2.fl.yelpcdn.com/bphoto/p2bfZE...</td>
      <td>False</td>
      <td>https://www.yelp.com/biz/the-quesadillas-tucso...</td>
      <td>544</td>
      <td>[{'alias': 'mexican', 'title': 'Mexican'}]</td>
      <td>4.5</td>
      <td>[delivery]</td>
      <td>...</td>
      <td>32.251377</td>
      <td>-110.874981</td>
      <td>2418 N Craycroft Rd</td>
      <td></td>
      <td></td>
      <td>Tucson</td>
      <td>85712</td>
      <td>US</td>
      <td>AZ</td>
      <td>[2418 N Craycroft Rd, Tucson, AZ 85712]</td>
    </tr>
    <tr>
      <th>7</th>
      <td>6OwxdpajDSJi3DkMqkr2sw</td>
      <td>barista-del-barrio-tucson-2</td>
      <td>Barista Del Barrio</td>
      <td>https://s3-media1.fl.yelpcdn.com/bphoto/KDAEvG...</td>
      <td>False</td>
      <td>https://www.yelp.com/biz/barista-del-barrio-tu...</td>
      <td>428</td>
      <td>[{'alias': 'breakfast_brunch', 'title': 'Break...</td>
      <td>5.0</td>
      <td>[delivery]</td>
      <td>...</td>
      <td>32.234870</td>
      <td>-110.989976</td>
      <td>1002 N Grande Ave</td>
      <td></td>
      <td>None</td>
      <td>Tucson</td>
      <td>85745</td>
      <td>US</td>
      <td>AZ</td>
      <td>[1002 N Grande Ave, Tucson, AZ 85745]</td>
    </tr>
    <tr>
      <th>8</th>
      <td>j8feOxyJqlIJWOi8su2qzw</td>
      <td>serial-grillers-tucson-4</td>
      <td>Serial Grillers</td>
      <td>https://s3-media1.fl.yelpcdn.com/bphoto/bJk3ZV...</td>
      <td>False</td>
      <td>https://www.yelp.com/biz/serial-grillers-tucso...</td>
      <td>1039</td>
      <td>[{'alias': 'pizza', 'title': 'Pizza'}, {'alias...</td>
      <td>4.5</td>
      <td>[pickup, delivery]</td>
      <td>...</td>
      <td>32.236675</td>
      <td>-110.865028</td>
      <td>5975 E Speedway Blvd</td>
      <td></td>
      <td></td>
      <td>Tucson</td>
      <td>85712</td>
      <td>US</td>
      <td>AZ</td>
      <td>[5975 E Speedway Blvd, Tucson, AZ 85712]</td>
    </tr>
    <tr>
      <th>9</th>
      <td>zwrgCMuZyFX46mL3piDyjg</td>
      <td>cup-cafe-tucson</td>
      <td>Cup Cafe</td>
      <td>https://s3-media1.fl.yelpcdn.com/bphoto/tjRkRk...</td>
      <td>False</td>
      <td>https://www.yelp.com/biz/cup-cafe-tucson?adjus...</td>
      <td>922</td>
      <td>[{'alias': 'newamerican', 'title': 'American (...</td>
      <td>4.0</td>
      <td>[delivery]</td>
      <td>...</td>
      <td>32.222249</td>
      <td>-110.966610</td>
      <td>311 E Congress St</td>
      <td></td>
      <td>Hotel Congress</td>
      <td>Tucson</td>
      <td>85701</td>
      <td>US</td>
      <td>AZ</td>
      <td>[311 E Congress St, Hotel Congress, Tucson, AZ...</td>
    </tr>
    <tr>
      <th>10</th>
      <td>jmwasbZfgj3honf79qKsnA</td>
      <td>street-taco-and-beer-co-tucson</td>
      <td>Street- Taco and Beer Co.</td>
      <td>https://s3-media4.fl.yelpcdn.com/bphoto/VOaRTn...</td>
      <td>False</td>
      <td>https://www.yelp.com/biz/street-taco-and-beer-...</td>
      <td>864</td>
      <td>[{'alias': 'mexican', 'title': 'Mexican'}, {'a...</td>
      <td>4.5</td>
      <td>[delivery]</td>
      <td>...</td>
      <td>32.222001</td>
      <td>-110.972225</td>
      <td>58 W Congress St</td>
      <td>None</td>
      <td></td>
      <td>Tucson</td>
      <td>85701</td>
      <td>US</td>
      <td>AZ</td>
      <td>[58 W Congress St, Tucson, AZ 85701]</td>
    </tr>
    <tr>
      <th>11</th>
      <td>MK0OMY_u9unl8xSqjPLtMw</td>
      <td>seis-kitchen-tucson-3</td>
      <td>Seis Kitchen</td>
      <td>https://s3-media3.fl.yelpcdn.com/bphoto/07-K3Z...</td>
      <td>False</td>
      <td>https://www.yelp.com/biz/seis-kitchen-tucson-3...</td>
      <td>748</td>
      <td>[{'alias': 'mexican', 'title': 'Mexican'}, {'a...</td>
      <td>4.5</td>
      <td>[delivery]</td>
      <td>...</td>
      <td>32.219930</td>
      <td>-110.985710</td>
      <td>130 S Avenida Del Convento</td>
      <td>Ste 100</td>
      <td></td>
      <td>Tucson</td>
      <td>85745</td>
      <td>US</td>
      <td>AZ</td>
      <td>[130 S Avenida Del Convento, Ste 100, Tucson, ...</td>
    </tr>
    <tr>
      <th>12</th>
      <td>5s7I0Khg7ReVzfO7niJtKg</td>
      <td>zayna-mediterranean-tucson-2</td>
      <td>Zayna Mediterranean</td>
      <td>https://s3-media1.fl.yelpcdn.com/bphoto/_k6Qvh...</td>
      <td>False</td>
      <td>https://www.yelp.com/biz/zayna-mediterranean-t...</td>
      <td>640</td>
      <td>[{'alias': 'mediterranean', 'title': 'Mediterr...</td>
      <td>4.5</td>
      <td>[delivery]</td>
      <td>...</td>
      <td>32.237320</td>
      <td>-110.896490</td>
      <td>1138 North Belvedere</td>
      <td></td>
      <td></td>
      <td>Tucson</td>
      <td>85712</td>
      <td>US</td>
      <td>AZ</td>
      <td>[1138 North Belvedere, Tucson, AZ 85712]</td>
    </tr>
    <tr>
      <th>13</th>
      <td>tkyHFPJ3dBsjE2hA_tk_sQ</td>
      <td>tito-and-pep-tucson-2</td>
      <td>Tito &amp; Pep</td>
      <td>https://s3-media4.fl.yelpcdn.com/bphoto/JZdDgP...</td>
      <td>False</td>
      <td>https://www.yelp.com/biz/tito-and-pep-tucson-2...</td>
      <td>455</td>
      <td>[{'alias': 'newamerican', 'title': 'American (...</td>
      <td>4.5</td>
      <td>[delivery]</td>
      <td>...</td>
      <td>32.235938</td>
      <td>-110.904670</td>
      <td>4122 E Speedway Blvd</td>
      <td></td>
      <td>None</td>
      <td>Tucson</td>
      <td>85712</td>
      <td>US</td>
      <td>AZ</td>
      <td>[4122 E Speedway Blvd, Tucson, AZ 85712]</td>
    </tr>
    <tr>
      <th>14</th>
      <td>jh8j-DWqgWkbRe_a2XtKFQ</td>
      <td>barrio-bread-tucson-2</td>
      <td>Barrio Bread</td>
      <td>https://s3-media1.fl.yelpcdn.com/bphoto/0AK1Du...</td>
      <td>False</td>
      <td>https://www.yelp.com/biz/barrio-bread-tucson-2...</td>
      <td>249</td>
      <td>[{'alias': 'bakeries', 'title': 'Bakeries'}]</td>
      <td>5.0</td>
      <td>[delivery]</td>
      <td>...</td>
      <td>32.220868</td>
      <td>-110.928007</td>
      <td>18 S Eastbourne Ave</td>
      <td></td>
      <td></td>
      <td>Tucson</td>
      <td>85716</td>
      <td>US</td>
      <td>AZ</td>
      <td>[18 S Eastbourne Ave, Tucson, AZ 85716]</td>
    </tr>
    <tr>
      <th>15</th>
      <td>muxda1cSVtplETqTfYVgZA</td>
      <td>hub-restaurant-and-ice-creamery-tucson</td>
      <td>HUB Restaurant &amp; Ice Creamery</td>
      <td>https://s3-media3.fl.yelpcdn.com/bphoto/8nZGMw...</td>
      <td>False</td>
      <td>https://www.yelp.com/biz/hub-restaurant-and-ic...</td>
      <td>1345</td>
      <td>[{'alias': 'tradamerican', 'title': 'American ...</td>
      <td>4.0</td>
      <td>[pickup, delivery]</td>
      <td>...</td>
      <td>32.221850</td>
      <td>-110.967560</td>
      <td>266 E Congress St</td>
      <td>None</td>
      <td></td>
      <td>Tucson</td>
      <td>85701</td>
      <td>US</td>
      <td>AZ</td>
      <td>[266 E Congress St, Tucson, AZ 85701]</td>
    </tr>
    <tr>
      <th>16</th>
      <td>zZ01WQlcpI1_n806WKV3bA</td>
      <td>culinary-dropout-tucson-2</td>
      <td>Culinary Dropout</td>
      <td>https://s3-media4.fl.yelpcdn.com/bphoto/LtBt2L...</td>
      <td>False</td>
      <td>https://www.yelp.com/biz/culinary-dropout-tucs...</td>
      <td>1407</td>
      <td>[{'alias': 'newamerican', 'title': 'American (...</td>
      <td>4.0</td>
      <td>[delivery]</td>
      <td>...</td>
      <td>32.250770</td>
      <td>-110.934330</td>
      <td>2543 E Grant Rd</td>
      <td>None</td>
      <td>None</td>
      <td>Tucson</td>
      <td>85716</td>
      <td>US</td>
      <td>AZ</td>
      <td>[2543 E Grant Rd, Tucson, AZ 85716]</td>
    </tr>
    <tr>
      <th>17</th>
      <td>CJoO4HYD0tZRXlZqA04wmw</td>
      <td>crave-coffee-bar-tucson</td>
      <td>Crave Coffee Bar</td>
      <td>https://s3-media4.fl.yelpcdn.com/bphoto/_xS2ig...</td>
      <td>False</td>
      <td>https://www.yelp.com/biz/crave-coffee-bar-tucs...</td>
      <td>468</td>
      <td>[{'alias': 'coffee', 'title': 'Coffee &amp; Tea'}]</td>
      <td>4.5</td>
      <td>[]</td>
      <td>...</td>
      <td>32.221020</td>
      <td>-110.895570</td>
      <td>4530 E Broadway</td>
      <td></td>
      <td></td>
      <td>Tucson</td>
      <td>85711</td>
      <td>US</td>
      <td>AZ</td>
      <td>[4530 E Broadway, Tucson, AZ 85711]</td>
    </tr>
    <tr>
      <th>18</th>
      <td>4QMIJJWQOh7zpEwOXhFJqw</td>
      <td>renees-tucson-tucson</td>
      <td>Renee's Tucson</td>
      <td>https://s3-media4.fl.yelpcdn.com/bphoto/FiASAj...</td>
      <td>False</td>
      <td>https://www.yelp.com/biz/renees-tucson-tucson?...</td>
      <td>695</td>
      <td>[{'alias': 'pizza', 'title': 'Pizza'}, {'alias...</td>
      <td>4.5</td>
      <td>[pickup, delivery]</td>
      <td>...</td>
      <td>32.252070</td>
      <td>-110.841710</td>
      <td>7065 E Tanque Verde Rd</td>
      <td>None</td>
      <td>None</td>
      <td>Tucson</td>
      <td>85715</td>
      <td>US</td>
      <td>AZ</td>
      <td>[7065 E Tanque Verde Rd, Tucson, AZ 85715]</td>
    </tr>
    <tr>
      <th>19</th>
      <td>KZA_HEOsBXf8dtrk9rqNJA</td>
      <td>prep-and-pastry-on-grant-tucson</td>
      <td>Prep &amp; Pastry on Grant</td>
      <td>https://s3-media1.fl.yelpcdn.com/bphoto/FoXlWz...</td>
      <td>False</td>
      <td>https://www.yelp.com/biz/prep-and-pastry-on-gr...</td>
      <td>714</td>
      <td>[{'alias': 'newamerican', 'title': 'American (...</td>
      <td>4.5</td>
      <td>[pickup, delivery]</td>
      <td>...</td>
      <td>32.250141</td>
      <td>-110.854983</td>
      <td>6450 E Grant Rd</td>
      <td>Ste 160</td>
      <td></td>
      <td>Tucson</td>
      <td>85715</td>
      <td>US</td>
      <td>AZ</td>
      <td>[6450 E Grant Rd, Ste 160, Tucson, AZ 85715]</td>
    </tr>
    <tr>
      <th>20</th>
      <td>gciMEyy9sIcwSMREEvNiXA</td>
      <td>roma-imports-tucson</td>
      <td>Roma Imports</td>
      <td>https://s3-media1.fl.yelpcdn.com/bphoto/7znil6...</td>
      <td>False</td>
      <td>https://www.yelp.com/biz/roma-imports-tucson?a...</td>
      <td>391</td>
      <td>[{'alias': 'italian', 'title': 'Italian'}, {'a...</td>
      <td>4.5</td>
      <td>[delivery]</td>
      <td>...</td>
      <td>32.214240</td>
      <td>-110.948870</td>
      <td>627 S Vine Ave</td>
      <td></td>
      <td></td>
      <td>Tucson</td>
      <td>85719</td>
      <td>US</td>
      <td>AZ</td>
      <td>[627 S Vine Ave, Tucson, AZ 85719]</td>
    </tr>
    <tr>
      <th>21</th>
      <td>Rv8bW3pkzpi5dZu5ckbgtA</td>
      <td>guadalajara-original-grill-tucson</td>
      <td>Guadalajara Original Grill</td>
      <td>https://s3-media4.fl.yelpcdn.com/bphoto/Z_TZvx...</td>
      <td>False</td>
      <td>https://www.yelp.com/biz/guadalajara-original-...</td>
      <td>1223</td>
      <td>[{'alias': 'mexican', 'title': 'Mexican'}, {'a...</td>
      <td>4.0</td>
      <td>[pickup, delivery]</td>
      <td>...</td>
      <td>32.271774</td>
      <td>-110.953235</td>
      <td>1220 E Prince Rd</td>
      <td></td>
      <td></td>
      <td>Tucson</td>
      <td>85719</td>
      <td>US</td>
      <td>AZ</td>
      <td>[1220 E Prince Rd, Tucson, AZ 85719]</td>
    </tr>
    <tr>
      <th>22</th>
      <td>WAInJdS3M-4JgUyzf_LoQg</td>
      <td>smokey-mo-tucson</td>
      <td>Smokey Mo</td>
      <td>https://s3-media2.fl.yelpcdn.com/bphoto/_eo6tp...</td>
      <td>False</td>
      <td>https://www.yelp.com/biz/smokey-mo-tucson?adju...</td>
      <td>516</td>
      <td>[{'alias': 'bbq', 'title': 'Barbeque'}, {'alia...</td>
      <td>4.5</td>
      <td>[pickup, delivery]</td>
      <td>...</td>
      <td>32.254343</td>
      <td>-110.961033</td>
      <td>2650 N 1st Ave</td>
      <td></td>
      <td>None</td>
      <td>Tucson</td>
      <td>85719</td>
      <td>US</td>
      <td>AZ</td>
      <td>[2650 N 1st Ave, Tucson, AZ 85719]</td>
    </tr>
    <tr>
      <th>23</th>
      <td>Bq0CQcwk5R8yhm-MGfHxCA</td>
      <td>chef-alisahs-tucson</td>
      <td>Chef Alisah's</td>
      <td>https://s3-media1.fl.yelpcdn.com/bphoto/uGrchN...</td>
      <td>False</td>
      <td>https://www.yelp.com/biz/chef-alisahs-tucson?a...</td>
      <td>510</td>
      <td>[{'alias': 'mediterranean', 'title': 'Mediterr...</td>
      <td>4.5</td>
      <td>[delivery]</td>
      <td>...</td>
      <td>32.314993</td>
      <td>-110.977809</td>
      <td>5931 N Oracle Rd</td>
      <td></td>
      <td></td>
      <td>Tucson</td>
      <td>85704</td>
      <td>US</td>
      <td>AZ</td>
      <td>[5931 N Oracle Rd, Tucson, AZ 85704]</td>
    </tr>
    <tr>
      <th>24</th>
      <td>UjQnH-pElJZ9jD51vOt5Rw</td>
      <td>wildflower-tucson</td>
      <td>Wildflower</td>
      <td>https://s3-media4.fl.yelpcdn.com/bphoto/zZbsoI...</td>
      <td>False</td>
      <td>https://www.yelp.com/biz/wildflower-tucson?adj...</td>
      <td>868</td>
      <td>[{'alias': 'newamerican', 'title': 'American (...</td>
      <td>4.5</td>
      <td>[]</td>
      <td>...</td>
      <td>32.335824</td>
      <td>-110.978137</td>
      <td>7037 N Oracle Rd</td>
      <td></td>
      <td></td>
      <td>Tucson</td>
      <td>85704</td>
      <td>US</td>
      <td>AZ</td>
      <td>[7037 N Oracle Rd, Tucson, AZ 85704]</td>
    </tr>
    <tr>
      <th>25</th>
      <td>3StNEgKAwpCFR1q0urmJrw</td>
      <td>raijin-ramen-tucson</td>
      <td>Raijin Ramen</td>
      <td>https://s3-media4.fl.yelpcdn.com/bphoto/H5QJMg...</td>
      <td>False</td>
      <td>https://www.yelp.com/biz/raijin-ramen-tucson?a...</td>
      <td>631</td>
      <td>[{'alias': 'ramen', 'title': 'Ramen'}]</td>
      <td>4.5</td>
      <td>[delivery]</td>
      <td>...</td>
      <td>32.236453</td>
      <td>-110.928394</td>
      <td>2995 E Speedway</td>
      <td></td>
      <td>None</td>
      <td>Tucson</td>
      <td>85716</td>
      <td>US</td>
      <td>AZ</td>
      <td>[2995 E Speedway, Tucson, AZ 85716]</td>
    </tr>
    <tr>
      <th>26</th>
      <td>LRr-aw58xVMkUu0OSL_BpQ</td>
      <td>the-little-one-tucson</td>
      <td>The Little One</td>
      <td>https://s3-media3.fl.yelpcdn.com/bphoto/DmLtSf...</td>
      <td>False</td>
      <td>https://www.yelp.com/biz/the-little-one-tucson...</td>
      <td>362</td>
      <td>[{'alias': 'mexican', 'title': 'Mexican'}]</td>
      <td>4.5</td>
      <td>[delivery]</td>
      <td>...</td>
      <td>32.223991</td>
      <td>-110.971878</td>
      <td>151 N Stone Ave</td>
      <td>None</td>
      <td></td>
      <td>Tucson</td>
      <td>85701</td>
      <td>US</td>
      <td>AZ</td>
      <td>[151 N Stone Ave, Tucson, AZ 85701]</td>
    </tr>
    <tr>
      <th>27</th>
      <td>q9HeBXQBnXgThOa9DPIhAw</td>
      <td>5-points-market-and-restaurant-tucson</td>
      <td>5 Points Market &amp; Restaurant</td>
      <td>https://s3-media4.fl.yelpcdn.com/bphoto/KOZ8zP...</td>
      <td>False</td>
      <td>https://www.yelp.com/biz/5-points-market-and-r...</td>
      <td>598</td>
      <td>[{'alias': 'newamerican', 'title': 'American (...</td>
      <td>4.5</td>
      <td>[delivery]</td>
      <td>...</td>
      <td>32.212200</td>
      <td>-110.969090</td>
      <td>756 S Stone Ave</td>
      <td></td>
      <td></td>
      <td>Tucson</td>
      <td>85701</td>
      <td>US</td>
      <td>AZ</td>
      <td>[756 S Stone Ave, Tucson, AZ 85701]</td>
    </tr>
    <tr>
      <th>28</th>
      <td>dOOvB4HW-b0mWDpcvY5h-g</td>
      <td>reilly-craft-pizza-and-drink-tucson</td>
      <td>Reilly Craft Pizza &amp; Drink</td>
      <td>https://s3-media4.fl.yelpcdn.com/bphoto/n4-xdK...</td>
      <td>False</td>
      <td>https://www.yelp.com/biz/reilly-craft-pizza-an...</td>
      <td>699</td>
      <td>[{'alias': 'italian', 'title': 'Italian'}, {'a...</td>
      <td>4.0</td>
      <td>[delivery]</td>
      <td>...</td>
      <td>32.223364</td>
      <td>-110.969710</td>
      <td>101 E Pennington St</td>
      <td></td>
      <td></td>
      <td>Tucson</td>
      <td>85701</td>
      <td>US</td>
      <td>AZ</td>
      <td>[101 E Pennington St, Tucson, AZ 85701]</td>
    </tr>
    <tr>
      <th>29</th>
      <td>elP0Xn9HyP6cRBuzbJdTpw</td>
      <td>urban-fresh-tucson</td>
      <td>Urban Fresh</td>
      <td>https://s3-media4.fl.yelpcdn.com/bphoto/ROa4XI...</td>
      <td>False</td>
      <td>https://www.yelp.com/biz/urban-fresh-tucson?ad...</td>
      <td>203</td>
      <td>[{'alias': 'vegan', 'title': 'Vegan'}, {'alias...</td>
      <td>5.0</td>
      <td>[pickup, delivery]</td>
      <td>...</td>
      <td>32.223080</td>
      <td>-110.970170</td>
      <td>73 E Pennington St</td>
      <td></td>
      <td></td>
      <td>Tucson</td>
      <td>85701</td>
      <td>US</td>
      <td>AZ</td>
      <td>[73 E Pennington St, Tucson, AZ 85701]</td>
    </tr>
    <tr>
      <th>30</th>
      <td>5YFqjdNj7HCkDwYjvwG50g</td>
      <td>noodleholics-tucson-3</td>
      <td>Noodleholics</td>
      <td>https://s3-media2.fl.yelpcdn.com/bphoto/Xr99MN...</td>
      <td>False</td>
      <td>https://www.yelp.com/biz/noodleholics-tucson-3...</td>
      <td>450</td>
      <td>[{'alias': 'noodles', 'title': 'Noodles'}]</td>
      <td>4.5</td>
      <td>[delivery]</td>
      <td>...</td>
      <td>32.250272</td>
      <td>-110.918089</td>
      <td>3502 E Grant Rd</td>
      <td></td>
      <td>None</td>
      <td>Tucson</td>
      <td>85716</td>
      <td>US</td>
      <td>AZ</td>
      <td>[3502 E Grant Rd, Tucson, AZ 85716]</td>
    </tr>
    <tr>
      <th>31</th>
      <td>u6P6I5PZnSlnILY5nFWBJA</td>
      <td>calle-tepa-tucson-2</td>
      <td>Calle Tepa</td>
      <td>https://s3-media1.fl.yelpcdn.com/bphoto/D0sXBJ...</td>
      <td>False</td>
      <td>https://www.yelp.com/biz/calle-tepa-tucson-2?a...</td>
      <td>764</td>
      <td>[{'alias': 'mexican', 'title': 'Mexican'}]</td>
      <td>4.0</td>
      <td>[pickup, delivery]</td>
      <td>...</td>
      <td>32.222050</td>
      <td>-110.860930</td>
      <td>6151 E Broadway</td>
      <td></td>
      <td></td>
      <td>Tucson</td>
      <td>85711</td>
      <td>US</td>
      <td>AZ</td>
      <td>[6151 E Broadway, Tucson, AZ 85711]</td>
    </tr>
    <tr>
      <th>32</th>
      <td>dh1C733vVNx7BaIBmwMwNQ</td>
      <td>cafe-a-la-cart-tucson-6</td>
      <td>Cafe A La Cart</td>
      <td>https://s3-media3.fl.yelpcdn.com/bphoto/3c3j9e...</td>
      <td>False</td>
      <td>https://www.yelp.com/biz/cafe-a-la-cart-tucson...</td>
      <td>395</td>
      <td>[{'alias': 'newamerican', 'title': 'American (...</td>
      <td>4.5</td>
      <td>[delivery]</td>
      <td>...</td>
      <td>32.223630</td>
      <td>-110.975401</td>
      <td>150 N Main Ave</td>
      <td></td>
      <td>Tucson Museum Of Art</td>
      <td>Tucson</td>
      <td>85701</td>
      <td>US</td>
      <td>AZ</td>
      <td>[150 N Main Ave, Tucson Museum Of Art, Tucson,...</td>
    </tr>
    <tr>
      <th>33</th>
      <td>U3aNQ5DsABPYyJQolsCbJg</td>
      <td>charro-steak-and-del-rey-tucson</td>
      <td>Charro Steak &amp; Del Rey</td>
      <td>https://s3-media2.fl.yelpcdn.com/bphoto/lervtB...</td>
      <td>False</td>
      <td>https://www.yelp.com/biz/charro-steak-and-del-...</td>
      <td>709</td>
      <td>[{'alias': 'steak', 'title': 'Steakhouses'}, {...</td>
      <td>4.0</td>
      <td>[restaurant_reservation, delivery, pickup]</td>
      <td>...</td>
      <td>32.220955</td>
      <td>-110.967354</td>
      <td>188 E Broadway Blvd</td>
      <td></td>
      <td></td>
      <td>Tucson</td>
      <td>85701</td>
      <td>US</td>
      <td>AZ</td>
      <td>[188 E Broadway Blvd, Tucson, AZ 85701]</td>
    </tr>
    <tr>
      <th>34</th>
      <td>IKMAgK2m6WRIViVFB2vAFQ</td>
      <td>miss-saigon-tucson</td>
      <td>Miss Saigon</td>
      <td>https://s3-media3.fl.yelpcdn.com/bphoto/L9APe_...</td>
      <td>False</td>
      <td>https://www.yelp.com/biz/miss-saigon-tucson?ad...</td>
      <td>745</td>
      <td>[{'alias': 'vietnamese', 'title': 'Vietnamese'...</td>
      <td>4.0</td>
      <td>[pickup, delivery]</td>
      <td>...</td>
      <td>32.235409</td>
      <td>-110.943627</td>
      <td>1072 N Campbell Ave</td>
      <td></td>
      <td></td>
      <td>Tucson</td>
      <td>85719</td>
      <td>US</td>
      <td>AZ</td>
      <td>[1072 N Campbell Ave, Tucson, AZ 85719]</td>
    </tr>
    <tr>
      <th>35</th>
      <td>9zlIJ7Q5W4AENjpGgaNSsQ</td>
      <td>roccos-little-chicago-tucson</td>
      <td>Rocco's Little Chicago</td>
      <td>https://s3-media3.fl.yelpcdn.com/bphoto/NrJZqj...</td>
      <td>False</td>
      <td>https://www.yelp.com/biz/roccos-little-chicago...</td>
      <td>668</td>
      <td>[{'alias': 'pizza', 'title': 'Pizza'}, {'alias...</td>
      <td>4.0</td>
      <td>[pickup, delivery]</td>
      <td>...</td>
      <td>32.222010</td>
      <td>-110.932110</td>
      <td>2707 E Broadway Blvd</td>
      <td></td>
      <td></td>
      <td>Tucson</td>
      <td>85716</td>
      <td>US</td>
      <td>AZ</td>
      <td>[2707 E Broadway Blvd, Tucson, AZ 85716]</td>
    </tr>
    <tr>
      <th>36</th>
      <td>JHxfEDW05_KSTfk-SLqXGw</td>
      <td>indian-twist-tucson</td>
      <td>Indian Twist</td>
      <td>https://s3-media2.fl.yelpcdn.com/bphoto/obII7C...</td>
      <td>False</td>
      <td>https://www.yelp.com/biz/indian-twist-tucson?a...</td>
      <td>456</td>
      <td>[{'alias': 'indpak', 'title': 'Indian'}, {'ali...</td>
      <td>4.5</td>
      <td>[pickup, delivery]</td>
      <td>...</td>
      <td>32.264990</td>
      <td>-110.893090</td>
      <td>4660 E Camp Lowell Dr</td>
      <td></td>
      <td>None</td>
      <td>Tucson</td>
      <td>85712</td>
      <td>US</td>
      <td>AZ</td>
      <td>[4660 E Camp Lowell Dr, Tucson, AZ 85712]</td>
    </tr>
    <tr>
      <th>37</th>
      <td>BJOGo_upuBElDT_xOaurIA</td>
      <td>fleming-s-prime-steakhouse-and-wine-bar-tucson-3</td>
      <td>Fleming’s Prime Steakhouse &amp; Wine Bar</td>
      <td>https://s3-media4.fl.yelpcdn.com/bphoto/PoLqnp...</td>
      <td>False</td>
      <td>https://www.yelp.com/biz/fleming-s-prime-steak...</td>
      <td>515</td>
      <td>[{'alias': 'steak', 'title': 'Steakhouses'}, {...</td>
      <td>4.5</td>
      <td>[delivery]</td>
      <td>...</td>
      <td>32.322079</td>
      <td>-110.927521</td>
      <td>6360 N Campbell Ave</td>
      <td>Ste 180</td>
      <td></td>
      <td>Tucson</td>
      <td>85718</td>
      <td>US</td>
      <td>AZ</td>
      <td>[6360 N Campbell Ave, Ste 180, Tucson, AZ 85718]</td>
    </tr>
    <tr>
      <th>38</th>
      <td>kjDXbqCihUxgDvQn1n57hA</td>
      <td>nook-tucson</td>
      <td>Nook</td>
      <td>https://s3-media3.fl.yelpcdn.com/bphoto/ZBchQG...</td>
      <td>False</td>
      <td>https://www.yelp.com/biz/nook-tucson?adjust_cr...</td>
      <td>579</td>
      <td>[{'alias': 'newamerican', 'title': 'American (...</td>
      <td>4.0</td>
      <td>[delivery]</td>
      <td>...</td>
      <td>32.222070</td>
      <td>-110.971070</td>
      <td>1 E Congress</td>
      <td>Ste 102</td>
      <td></td>
      <td>Tucson</td>
      <td>85701</td>
      <td>US</td>
      <td>AZ</td>
      <td>[1 E Congress, Ste 102, Tucson, AZ 85701]</td>
    </tr>
    <tr>
      <th>39</th>
      <td>OMnPtRGmbY8qH_wIILfYKA</td>
      <td>postino-grant-tucson-2</td>
      <td>Postino Grant</td>
      <td>https://s3-media2.fl.yelpcdn.com/bphoto/N8rFmf...</td>
      <td>False</td>
      <td>https://www.yelp.com/biz/postino-grant-tucson-...</td>
      <td>320</td>
      <td>[{'alias': 'wine_bars', 'title': 'Wine Bars'},...</td>
      <td>4.5</td>
      <td>[pickup, delivery]</td>
      <td>...</td>
      <td>32.249700</td>
      <td>-110.934989</td>
      <td>2500 E Grant Rd</td>
      <td>None</td>
      <td>None</td>
      <td>Tucson</td>
      <td>85716</td>
      <td>US</td>
      <td>AZ</td>
      <td>[2500 E Grant Rd, Tucson, AZ 85716]</td>
    </tr>
    <tr>
      <th>40</th>
      <td>Nggy_QUDxaLlrcQAQf7GnQ</td>
      <td>taqueria-juanitos-tucson-4</td>
      <td>Taqueria Juanito's</td>
      <td>https://s3-media1.fl.yelpcdn.com/bphoto/9dwZ5q...</td>
      <td>False</td>
      <td>https://www.yelp.com/biz/taqueria-juanitos-tuc...</td>
      <td>423</td>
      <td>[{'alias': 'mexican', 'title': 'Mexican'}]</td>
      <td>4.5</td>
      <td>[pickup, delivery]</td>
      <td>...</td>
      <td>32.250571</td>
      <td>-110.982543</td>
      <td>708 W Grant Rd</td>
      <td></td>
      <td></td>
      <td>Tucson</td>
      <td>85705</td>
      <td>US</td>
      <td>AZ</td>
      <td>[708 W Grant Rd, Tucson, AZ 85705]</td>
    </tr>
    <tr>
      <th>41</th>
      <td>JFteGsQlrJeJjur6cA1RhA</td>
      <td>rollies-mexican-patio-tucson-3</td>
      <td>Rollies Mexican Patio</td>
      <td>https://s3-media4.fl.yelpcdn.com/bphoto/Frp_tv...</td>
      <td>False</td>
      <td>https://www.yelp.com/biz/rollies-mexican-patio...</td>
      <td>416</td>
      <td>[{'alias': 'mexican', 'title': 'Mexican'}]</td>
      <td>4.5</td>
      <td>[pickup, delivery]</td>
      <td>...</td>
      <td>32.168260</td>
      <td>-110.977200</td>
      <td>4573 S 12th Ave</td>
      <td></td>
      <td>None</td>
      <td>Tucson</td>
      <td>85714</td>
      <td>US</td>
      <td>AZ</td>
      <td>[4573 S 12th Ave, Tucson, AZ 85714]</td>
    </tr>
    <tr>
      <th>42</th>
      <td>LZzDvgfpkd4nI3E4L9wF1w</td>
      <td>el-charro-cafe-tucson-4</td>
      <td>El Charro Cafe</td>
      <td>https://s3-media3.fl.yelpcdn.com/bphoto/47XFfS...</td>
      <td>False</td>
      <td>https://www.yelp.com/biz/el-charro-cafe-tucson...</td>
      <td>1722</td>
      <td>[{'alias': 'tacos', 'title': 'Tacos'}, {'alias...</td>
      <td>3.5</td>
      <td>[restaurant_reservation, pickup, delivery]</td>
      <td>...</td>
      <td>32.225710</td>
      <td>-110.974560</td>
      <td>311 N Court Ave</td>
      <td></td>
      <td></td>
      <td>Tucson</td>
      <td>85701</td>
      <td>US</td>
      <td>AZ</td>
      <td>[311 N Court Ave, Tucson, AZ 85701]</td>
    </tr>
    <tr>
      <th>43</th>
      <td>0ghzROkZWKWwQKDt1fkPAQ</td>
      <td>el-guero-canelo-tucson-7</td>
      <td>El Guero Canelo</td>
      <td>https://s3-media1.fl.yelpcdn.com/bphoto/1N58Rz...</td>
      <td>False</td>
      <td>https://www.yelp.com/biz/el-guero-canelo-tucso...</td>
      <td>717</td>
      <td>[{'alias': 'mexican', 'title': 'Mexican'}]</td>
      <td>4.0</td>
      <td>[pickup, delivery]</td>
      <td>...</td>
      <td>32.251880</td>
      <td>-110.977490</td>
      <td>2480 N Oracle Rd</td>
      <td></td>
      <td></td>
      <td>Tucson</td>
      <td>85705</td>
      <td>US</td>
      <td>AZ</td>
      <td>[2480 N Oracle Rd, Tucson, AZ 85705]</td>
    </tr>
    <tr>
      <th>44</th>
      <td>LQcGL4hfJAeK6bk2ZdhmXw</td>
      <td>aqui-con-el-nene-tucson</td>
      <td>Aqui Con El Nene</td>
      <td>https://s3-media2.fl.yelpcdn.com/bphoto/qTpH6Y...</td>
      <td>False</td>
      <td>https://www.yelp.com/biz/aqui-con-el-nene-tucs...</td>
      <td>357</td>
      <td>[{'alias': 'mexican', 'title': 'Mexican'}, {'a...</td>
      <td>4.5</td>
      <td>[pickup, delivery]</td>
      <td>...</td>
      <td>32.286826</td>
      <td>-110.995074</td>
      <td>4415 N Flowing Wells Rd</td>
      <td></td>
      <td></td>
      <td>Tucson</td>
      <td>85705</td>
      <td>US</td>
      <td>AZ</td>
      <td>[4415 N Flowing Wells Rd, Tucson, AZ 85705]</td>
    </tr>
    <tr>
      <th>45</th>
      <td>Tj-sKlbJR5M7Rpe9Cykk9w</td>
      <td>graze-premium-burgers-tucson-3</td>
      <td>Graze Premium Burgers</td>
      <td>https://s3-media2.fl.yelpcdn.com/bphoto/EadKm3...</td>
      <td>False</td>
      <td>https://www.yelp.com/biz/graze-premium-burgers...</td>
      <td>459</td>
      <td>[{'alias': 'burgers', 'title': 'Burgers'}]</td>
      <td>4.5</td>
      <td>[pickup, delivery]</td>
      <td>...</td>
      <td>32.236381</td>
      <td>-110.931478</td>
      <td>2721 E Speedway Blvd</td>
      <td></td>
      <td></td>
      <td>Tucson</td>
      <td>85716</td>
      <td>US</td>
      <td>AZ</td>
      <td>[2721 E Speedway Blvd, Tucson, AZ 85716]</td>
    </tr>
    <tr>
      <th>46</th>
      <td>43MDfrU28FYjfpamNfL9GA</td>
      <td>zinburger-tucson-3</td>
      <td>Zinburger</td>
      <td>https://s3-media4.fl.yelpcdn.com/bphoto/S1e7Sw...</td>
      <td>False</td>
      <td>https://www.yelp.com/biz/zinburger-tucson-3?ad...</td>
      <td>832</td>
      <td>[{'alias': 'burgers', 'title': 'Burgers'}, {'a...</td>
      <td>4.0</td>
      <td>[]</td>
      <td>...</td>
      <td>32.287746</td>
      <td>-110.944633</td>
      <td>1865 E River Rd</td>
      <td>Ste 101</td>
      <td></td>
      <td>Tucson</td>
      <td>85718</td>
      <td>US</td>
      <td>AZ</td>
      <td>[1865 E River Rd, Ste 101, Tucson, AZ 85718]</td>
    </tr>
    <tr>
      <th>47</th>
      <td>MfkMUNwur9huBERrx0k5lg</td>
      <td>zemams-tucson</td>
      <td>Zemam's</td>
      <td>https://s3-media1.fl.yelpcdn.com/bphoto/xsHf7-...</td>
      <td>False</td>
      <td>https://www.yelp.com/biz/zemams-tucson?adjust_...</td>
      <td>348</td>
      <td>[{'alias': 'ethiopian', 'title': 'Ethiopian'}]</td>
      <td>4.5</td>
      <td>[delivery]</td>
      <td>...</td>
      <td>32.221805</td>
      <td>-110.931167</td>
      <td>2731 E Broadway Blvd</td>
      <td></td>
      <td></td>
      <td>Tucson</td>
      <td>85716</td>
      <td>US</td>
      <td>AZ</td>
      <td>[2731 E Broadway Blvd, Tucson, AZ 85716]</td>
    </tr>
    <tr>
      <th>48</th>
      <td>no8Sj8Eflgka2LFdrYFG_Q</td>
      <td>beyond-bread-tucson-2</td>
      <td>Beyond Bread</td>
      <td>https://s3-media3.fl.yelpcdn.com/bphoto/BPO-Vh...</td>
      <td>False</td>
      <td>https://www.yelp.com/biz/beyond-bread-tucson-2...</td>
      <td>452</td>
      <td>[{'alias': 'bakeries', 'title': 'Bakeries'}, {...</td>
      <td>4.5</td>
      <td>[delivery]</td>
      <td>...</td>
      <td>32.261650</td>
      <td>-110.943640</td>
      <td>3026 N Campbell Ave</td>
      <td></td>
      <td></td>
      <td>Tucson</td>
      <td>85719</td>
      <td>US</td>
      <td>AZ</td>
      <td>[3026 N Campbell Ave, Tucson, AZ 85719]</td>
    </tr>
    <tr>
      <th>49</th>
      <td>8Mzu_wczdzv9dU_Gr6OR8A</td>
      <td>kazoku-tucson</td>
      <td>Kazoku</td>
      <td>https://s3-media3.fl.yelpcdn.com/bphoto/cLO3lW...</td>
      <td>False</td>
      <td>https://www.yelp.com/biz/kazoku-tucson?adjust_...</td>
      <td>459</td>
      <td>[{'alias': 'sushi', 'title': 'Sushi Bars'}, {'...</td>
      <td>4.5</td>
      <td>[delivery]</td>
      <td>...</td>
      <td>32.235890</td>
      <td>-110.903000</td>
      <td>4210 E Speedway Blvd</td>
      <td></td>
      <td></td>
      <td>Tucson</td>
      <td>85712</td>
      <td>US</td>
      <td>AZ</td>
      <td>[4210 E Speedway Blvd, Tucson, AZ 85712]</td>
    </tr>
  </tbody>
</table>
<p>50 rows × 24 columns</p>
</div>




```python
restaurants.columns
```




    Index(['id', 'alias', 'name', 'image_url', 'is_closed', 'url', 'review_count',
           'categories', 'rating', 'transactions', 'price', 'phone',
           'display_phone', 'distance', 'coordinates.latitude',
           'coordinates.longitude', 'location.address1', 'location.address2',
           'location.address3', 'location.city', 'location.zip_code',
           'location.country', 'location.state', 'location.display_address'],
          dtype='object')




```python
m_tucson = folium.Map(location=[32.231020, -110.949839], zoom_start=12)
for idx, row in restaurants.iterrows():
    Marker([row['coordinates.latitude'], row['coordinates.longitude']]).add_to(m_tucson)
m_tucson.save('map.html')
```
[](https://raw.githubusercontent.com/Jun7i/blog/main/blogs/category1/yelp/map.html)
<script>var map_7defead249c0a6e19fd933858950adb5 = L.map( "map_7defead249c0a6e19fd933858950adb5", { center: [32.23102, -110.949839], crs: L.CRS.EPSG3857, zoom: 12, zoomControl: true, preferCanvas: false, } ); var tile_layer_cd2a0633da7a605ce8bd9adba03788b5 = L.tileLayer( "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {"attribution": "Data by \u0026copy; \u003ca href=\"http://openstreetmap.org\"\u003eOpenStreetMap\u003c/a\u003e, under \u003ca href=\"http://www.openstreetmap.org/copyright\"\u003eODbL\u003c/a\u003e.", "detectRetina": false, "maxNativeZoom": 18, "maxZoom": 18, "minZoom": 0, "noWrap": false, "opacity": 1, "subdomains": "abc", "tms": false} ).addTo(map_7defead249c0a6e19fd933858950adb5); var marker_4d46f99e50339b08b804bfc70384e1ec = L.marker( [32.25552801, -110.94349236], {} ).addTo(map_7defead249c0a6e19fd933858950adb5); var marker_f7777dd838358d12e46092913be9a061 = L.marker( [32.2277054883809, -110.934722498059], {} ).addTo(map_7defead249c0a6e19fd933858950adb5); var marker_d22577cbb3bdfbd47b9419465a8e446d = L.marker( [32.21976, -110.84333], {} ).addTo(map_7defead249c0a6e19fd933858950adb5); var marker_e303b1b78de1cf30610a930b5536a8da = L.marker( [32.260591, -110.94385], {} ).addTo(map_7defead249c0a6e19fd933858950adb5); var marker_f5f77b876c1ac54f15bca3e65c22003a = L.marker( [32.3245, -110.97597], {} ).addTo(map_7defead249c0a6e19fd933858950adb5); var marker_d39330f4fea41f5f4f2967e744c09378 = L.marker( [32.2500799, -110.92799], {} ).addTo(map_7defead249c0a6e19fd933858950adb5); var marker_409530a0667904ace78b42b054fe3f9b = L.marker( [32.251377455959386, -110.87498140841916], {} ).addTo(map_7defead249c0a6e19fd933858950adb5); var marker_d86068bc8b6d6bb5d0751d998745efe1 = L.marker( [32.2348699739027, -110.989975703106], {} ).addTo(map_7defead249c0a6e19fd933858950adb5); var marker_63a4ab88db62c95ea1d90699e187abe4 = L.marker( [32.236675, -110.865028], {} ).addTo(map_7defead249c0a6e19fd933858950adb5); var marker_9848aaa0663761bfa41fe6cee54fe151 = L.marker( [32.22224931496368, -110.96661006561565], {} ).addTo(map_7defead249c0a6e19fd933858950adb5); var marker_ed3ce227f15ede986bfe2313baf2920e = L.marker( [32.222001, -110.972225], {} ).addTo(map_7defead249c0a6e19fd933858950adb5); var marker_d8667bcf413943077d6488007b1833df = L.marker( [32.21993, -110.98571], {} ).addTo(map_7defead249c0a6e19fd933858950adb5); var marker_72b9a9112ec9be7ff91cbd24b1f9117d = L.marker( [32.2373199, -110.89649], {} ).addTo(map_7defead249c0a6e19fd933858950adb5); var marker_10533b946690ff97ced190c5402182fc = L.marker( [32.2359378837897, -110.904669545616], {} ).addTo(map_7defead249c0a6e19fd933858950adb5); var marker_0e773e6c3721a2b0b87965e2cdd3b70c = L.marker( [32.220868, -110.928007], {} ).addTo(map_7defead249c0a6e19fd933858950adb5); var marker_1cd56f00e44c554a32db09c5a8d29341 = L.marker( [32.22185, -110.96756], {} ).addTo(map_7defead249c0a6e19fd933858950adb5); var marker_3e4aaeffa3e62b02d01bc20e5bce7a41 = L.marker( [32.25077, -110.93433], {} ).addTo(map_7defead249c0a6e19fd933858950adb5); var marker_3f69501ee1df8b52eb592e1455a85b66 = L.marker( [32.22102, -110.89557], {} ).addTo(map_7defead249c0a6e19fd933858950adb5); var marker_5e0a42ff95b0593748563b3866b03205 = L.marker( [32.25207, -110.84171], {} ).addTo(map_7defead249c0a6e19fd933858950adb5); var marker_0466127c370501a81df01b865f54697d = L.marker( [32.25014061, -110.85498292], {} ).addTo(map_7defead249c0a6e19fd933858950adb5); var marker_64bbd6d072c5a513947965933f9d0653 = L.marker( [32.2142399, -110.94887], {} ).addTo(map_7defead249c0a6e19fd933858950adb5); var marker_5e6dbe419b9271ef70f1904fec4cbaf3 = L.marker( [32.271774, -110.953235], {} ).addTo(map_7defead249c0a6e19fd933858950adb5); var marker_e02da3a3b2da4b357e5ab3f8da2e89e9 = L.marker( [32.2543430452397, -110.961033134281], {} ).addTo(map_7defead249c0a6e19fd933858950adb5); var marker_d6c92301634cf65b0b4b5bd38aa756e1 = L.marker( [32.314993, -110.977809], {} ).addTo(map_7defead249c0a6e19fd933858950adb5); var marker_7f6bff38b6efa01c6e1268b88b0e00ff = L.marker( [32.335824, -110.978137], {} ).addTo(map_7defead249c0a6e19fd933858950adb5); var marker_b178e388610f967e690712cbd4d8af9b = L.marker( [32.2364532419853, -110.928393783342], {} ).addTo(map_7defead249c0a6e19fd933858950adb5); var marker_08b500154c4f59e449464c5ab781733e = L.marker( [32.223991394043, -110.971878051758], {} ).addTo(map_7defead249c0a6e19fd933858950adb5); var marker_01e94cb99b200c579bb3aecd7cc8a4f7 = L.marker( [32.2122004, -110.9690903], {} ).addTo(map_7defead249c0a6e19fd933858950adb5); var marker_91892edf298caa97d99cd4c55b3963ef = L.marker( [32.22336397096192, -110.96970981062555], {} ).addTo(map_7defead249c0a6e19fd933858950adb5); var marker_1f56a5efe715fecdc65c2daa1f6f6efd = L.marker( [32.22308, -110.9701704], {} ).addTo(map_7defead249c0a6e19fd933858950adb5); var marker_6c68e85562d8e03e3a25d78c0edb1110 = L.marker( [32.25027210392705, -110.91808931779123], {} ).addTo(map_7defead249c0a6e19fd933858950adb5); var marker_da1f6f6017b82fb2b6f35e4d754bd414 = L.marker( [32.22205, -110.86093], {} ).addTo(map_7defead249c0a6e19fd933858950adb5); var marker_b972f1244e6283d56c1b8ab1b96bbede = L.marker( [32.22363, -110.975401], {} ).addTo(map_7defead249c0a6e19fd933858950adb5); var marker_30e00064ca3e60dda743e878cd3f40d9 = L.marker( [32.2209548950195, -110.967353820801], {} ).addTo(map_7defead249c0a6e19fd933858950adb5); var marker_76bba31193c2e15f9f9436819cfb2d47 = L.marker( [32.23540861141934, -110.94362726863311], {} ).addTo(map_7defead249c0a6e19fd933858950adb5); var marker_b7e0a2bd921f66f44706bf635bea133b = L.marker( [32.22201, -110.93211], {} ).addTo(map_7defead249c0a6e19fd933858950adb5); var marker_cb097fa5e777870f74c30a43d76b48b1 = L.marker( [32.26499, -110.89309], {} ).addTo(map_7defead249c0a6e19fd933858950adb5); var marker_56de83b6f594dca852360ad758674f7a = L.marker( [32.3220792365865, -110.927521139063], {} ).addTo(map_7defead249c0a6e19fd933858950adb5); var marker_38d46bcbebab4a29be18ce3824205e93 = L.marker( [32.22207, -110.97107], {} ).addTo(map_7defead249c0a6e19fd933858950adb5); var marker_6fcae17a266fe31c187fc74ca7b73a61 = L.marker( [32.24970023872713, -110.93498916869984], {} ).addTo(map_7defead249c0a6e19fd933858950adb5); var marker_ef924d7b53773d0c7b8b9dbf3bd2fe3c = L.marker( [32.250571, -110.982543], {} ).addTo(map_7defead249c0a6e19fd933858950adb5); var marker_1e7cd8db7cf0259119937cedbfdb1e3f = L.marker( [32.16826, -110.9772], {} ).addTo(map_7defead249c0a6e19fd933858950adb5); var marker_651e467d8fc03802494b1063d613091a = L.marker( [32.22571, -110.97456], {} ).addTo(map_7defead249c0a6e19fd933858950adb5); var marker_8b0c74baf4ab9df4c6f7f329e763e9fd = L.marker( [32.25188, -110.97749], {} ).addTo(map_7defead249c0a6e19fd933858950adb5); var marker_c5c0e619618504ff686034cf3fb59580 = L.marker( [32.2868263399889, -110.9950735], {} ).addTo(map_7defead249c0a6e19fd933858950adb5); var marker_831eaa61af9ab9223bc06f71ad763d17 = L.marker( [32.2363805022866, -110.93147803098], {} ).addTo(map_7defead249c0a6e19fd933858950adb5); var marker_63ec0a8b97f7d4032fbc494c90f1513c = L.marker( [32.2877464, -110.9446335], {} ).addTo(map_7defead249c0a6e19fd933858950adb5); var marker_c77752447f37e6224a84ae7eeb01c39a = L.marker( [32.221805, -110.931167], {} ).addTo(map_7defead249c0a6e19fd933858950adb5); var marker_e211566aa96a39427c97e10583f4e401 = L.marker( [32.26165, -110.94364], {} ).addTo(map_7defead249c0a6e19fd933858950adb5); var marker_f1d01cfe552d792d1e605d488bd7f24e = L.marker( [32.23589, -110.903], {} ).addTo(map_7defead249c0a6e19fd933858950adb5);</script>
```python
sns.heatmap(restaurants.corr(), annot=True,linewidths=.5)
```




    <AxesSubplot:>




    
![](https://raw.githubusercontent.com/Jun7i/blog/main/blogs/category1/yelp/output_5_1.png)
    



```python
title_lst = []
for i in range(50):
    for j in range(1):
        title_lst.append(restaurants['categories'][i][j]['title'])
title_dic = dict()
for i in title_lst:
  title_dic[i] = title_dic.get(i, 0) + 1
title_dic
```




    {'Breakfast & Brunch': 5,
     'Vegan': 2,
     'Gastropubs': 1,
     'Mexican': 10,
     'Pizza': 3,
     'American (New)': 8,
     'Mediterranean': 2,
     'Bakeries': 2,
     'American (Traditional)': 1,
     'Coffee & Tea': 1,
     'Italian': 2,
     'Barbeque': 1,
     'Ramen': 1,
     'Noodles': 1,
     'Steakhouses': 2,
     'Vietnamese': 1,
     'Indian': 1,
     'Wine Bars': 1,
     'Tacos': 1,
     'Burgers': 2,
     'Ethiopian': 1,
     'Sushi Bars': 1}




```python
plt.figure(figsize=(16,10), dpi= 80)
x = [i for i in title_dic.keys()]
y = [i for i in title_dic.values()]
ax= sns.barplot(x, y, alpha=1)
plt.xlabel("restaurants categories")
plt.yticks([i for i in range(11)])
plt.xticks(rotation=45)
plt.ylabel("number of categories")
```




    Text(0, 0.5, 'number of categories')




    
![](https://raw.githubusercontent.com/Jun7i/blog/main/blogs/category1/yelp/output_7_1.png)
    

