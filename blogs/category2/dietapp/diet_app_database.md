---
title: Diet app project database jupyter notebook
date: 2022-09-01
tags:
 - diet app
categories: 
 - Website
---

```python
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from scipy import stats
from pandas.core.api import notnull
import warnings


import MySQLdb
import csv
from pandas.io import sql
from sqlalchemy import create_engine
import pymysql

warnings.filterwarnings('ignore')
```


```python
food_data_1 = pd.read_csv('en.openfoodfacts.org.products.tsv',sep='\t')
food_df = food_data_1
```


```python
us_food = food_data_1.query('countries == "US"')
```


```python
names_1 = ['code', 'image_url','categories_en','product_name','brands', 'countries', 'ingredients_text', 'energy_100g', 'fat_100g', 'saturated-fat_100g','sugars_100g','salt_100g', 'sodium_100g','fiber_100g', 'proteins_100g', 'nutrition-score-fr_100g']
```


```python
food_df = food_df[names_1]
```


```python
food_df
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
      <th>code</th>
      <th>image_url</th>
      <th>categories_en</th>
      <th>product_name</th>
      <th>brands</th>
      <th>countries</th>
      <th>ingredients_text</th>
      <th>energy_100g</th>
      <th>fat_100g</th>
      <th>saturated-fat_100g</th>
      <th>sugars_100g</th>
      <th>salt_100g</th>
      <th>sodium_100g</th>
      <th>fiber_100g</th>
      <th>proteins_100g</th>
      <th>nutrition-score-fr_100g</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>3087</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>Farine de blé noir</td>
      <td>Ferme t'y R'nao</td>
      <td>en:FR</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>1</th>
      <td>4530</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>Banana Chips Sweetened (Whole)</td>
      <td>NaN</td>
      <td>US</td>
      <td>Bananas, vegetable oil (coconut oil, corn oil ...</td>
      <td>2243.0</td>
      <td>28.57</td>
      <td>28.57</td>
      <td>14.29</td>
      <td>0.00000</td>
      <td>0.000</td>
      <td>3.6</td>
      <td>3.57</td>
      <td>14.0</td>
    </tr>
    <tr>
      <th>2</th>
      <td>4559</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>Peanuts</td>
      <td>Torn &amp; Glasser</td>
      <td>US</td>
      <td>Peanuts, wheat flour, sugar, rice flour, tapio...</td>
      <td>1941.0</td>
      <td>17.86</td>
      <td>0.00</td>
      <td>17.86</td>
      <td>0.63500</td>
      <td>0.250</td>
      <td>7.1</td>
      <td>17.86</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>3</th>
      <td>16087</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>Organic Salted Nut Mix</td>
      <td>Grizzlies</td>
      <td>US</td>
      <td>Organic hazelnuts, organic cashews, organic wa...</td>
      <td>2540.0</td>
      <td>57.14</td>
      <td>5.36</td>
      <td>3.57</td>
      <td>1.22428</td>
      <td>0.482</td>
      <td>7.1</td>
      <td>17.86</td>
      <td>12.0</td>
    </tr>
    <tr>
      <th>4</th>
      <td>16094</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>Organic Polenta</td>
      <td>Bob's Red Mill</td>
      <td>US</td>
      <td>Organic polenta</td>
      <td>1552.0</td>
      <td>1.43</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>5.7</td>
      <td>8.57</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>356022</th>
      <td>99567453</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>Mint Melange Tea A Blend Of Peppermint, Lemon ...</td>
      <td>Trader Joe's</td>
      <td>US</td>
      <td>Organic peppermint, organic lemon grass, organ...</td>
      <td>0.0</td>
      <td>0.00</td>
      <td>0.00</td>
      <td>0.00</td>
      <td>0.00000</td>
      <td>0.000</td>
      <td>0.0</td>
      <td>0.00</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>356023</th>
      <td>9970229501521</td>
      <td>http://en.openfoodfacts.org/images/products/99...</td>
      <td>Salty snacks,Appetizers,Chips and fries,Crisps...</td>
      <td>乐吧泡菜味薯片</td>
      <td>乐吧</td>
      <td>China</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>356024</th>
      <td>9977471758307</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>Biscottes bio</td>
      <td>Leader Price</td>
      <td>France</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>356025</th>
      <td>9980282863788</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>Tomates aux Vermicelles</td>
      <td>Knorr</td>
      <td>en:FR</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>356026</th>
      <td>999990026839</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>Sugar Free Drink Mix, Peach Tea</td>
      <td>Market Pantry</td>
      <td>US</td>
      <td>Citric acid, maltodextrin, instant tea, aspart...</td>
      <td>2092.0</td>
      <td>0.00</td>
      <td>NaN</td>
      <td>0.00</td>
      <td>0.00000</td>
      <td>0.000</td>
      <td>NaN</td>
      <td>0.00</td>
      <td>NaN</td>
    </tr>
  </tbody>
</table>
<p>356027 rows × 16 columns</p>
</div>




```python
def label_race(row):
   if row['nutrition-score-fr_100g'] <= -10:
      return 10
   if row['nutrition-score-fr_100g'] > -10 and row['nutrition-score-fr_100g'] <= -5:
      return 9
   if row['nutrition-score-fr_100g'] >-5 and row['nutrition-score-fr_100g'] <= 0:
      return 8
   if row['nutrition-score-fr_100g'] > 0 and row['nutrition-score-fr_100g'] <= 5:
      return 7
   if row['nutrition-score-fr_100g'] > 5 and row['nutrition-score-fr_100g'] <= 10:
      return 6
   if row['nutrition-score-fr_100g'] > 10 and row['nutrition-score-fr_100g'] <= 15:
      return 5
   if row['nutrition-score-fr_100g'] > 15 and row['nutrition-score-fr_100g'] <= 20:
      return 4
   if row['nutrition-score-fr_100g'] > 20 and row['nutrition-score-fr_100g'] <= 25:
      return 3
   if row['nutrition-score-fr_100g'] > 25 and row['nutrition-score-fr_100g'] <= 30:
      return 2
   if row['nutrition-score-fr_100g'] > 30 and row['nutrition-score-fr_100g'] <= 35:
      return 1
   if row['nutrition-score-fr_100g'] > 35:
      return 0

food_df['Food_item_score'] = food_df.apply (lambda row: label_race(row), axis=1)
```


```python
food_df[['categories_en', 'brands']] = food_df[['categories_en', 'brands']].fillna('undefined')
food_df['Food_item_score'] = food_df['Food_item_score'].fillna(0)
food_df['calories'] = food_df['energy_100g'].apply(lambda x: x*.239006).round(1)
food_df['calories'] = food_df['calories'].replace([0],np.nan)
```


```python
food_df.columns
```




    Index(['code', 'image_url', 'categories_en', 'product_name', 'brands',
           'countries', 'ingredients_text', 'energy_100g', 'fat_100g',
           'saturated-fat_100g', 'sugars_100g', 'salt_100g', 'sodium_100g',
           'fiber_100g', 'proteins_100g', 'nutrition-score-fr_100g',
           'Food_item_score', 'calories'],
          dtype='object')




```python
for col in food_df.columns:
    if(food_df[col].dtype == np.float64 or food_df[col].dtype == np.int64):
          food_df[col] = food_df[col].fillna(0)
    else:
          food_df[col] = food_df[col].fillna('undefined')
```


```python
print(food_df.shape)
counter = 0
for i in food_df['categories_en']:
    if i != 'undefined':
        counter +=1
print(counter)
```

    (356027, 18)
    103301
    


```python
food_df.columns
```




    Index(['code', 'image_url', 'categories_en', 'product_name', 'brands',
           'countries', 'ingredients_text', 'energy_100g', 'fat_100g',
           'saturated-fat_100g', 'sugars_100g', 'salt_100g', 'sodium_100g',
           'fiber_100g', 'proteins_100g', 'nutrition-score-fr_100g',
           'Food_item_score', 'calories'],
          dtype='object')




```python
food_df.columns = ['code', 'image_url', 'categories_en', 'product_name', 'brands', 'countries',
       'ingredients_text', 'energy_100g', 'fat_100g', 'saturated_fat_100g',
       'sugars_100g', 'salt_100g', 'sodium_100g', 'fiber_100g',
       'proteins_100g', 'nutrition_score_fr_100g', 'Food_item_score', 'calories']
food_df.to_csv("all_food_data_clean.csv", index = False)
```


```python
with open ('all_food_data_clean.csv', encoding = "gb18030", errors = "ignore") as f:
    tbl_name = "foodtbl"
    reader = csv.reader(f)
    db = MySQLdb.connect("localhost", "root", "", "fooddb")
    tablechk = db.cursor()
    tablechk.execute("DROP table if exists foodtbl")
    columns  = next(reader)
    query = "CREATE TABLE " + tbl_name + "(" + columns[0] + " INT" #columns[0]: heading
    for head in columns[1:]:
        #columns[1]: rest of the headings
        query+= ", " + head + " TEXT" 
    query += ");"
    tablechk.execute(query)
    db.close()
```


```python
engine = create_engine("mysql+pymysql://{user}:{pw}@localhost/{db}"
                       .format(user="root",
                               pw="",
                               db="fooddb"))
food_df.to_sql(con=engine, name='foodtbl', if_exists='replace')
```


```python

```
