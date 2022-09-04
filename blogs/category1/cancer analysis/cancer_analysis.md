---
title: Cancer Data Analysis project
date: 2022-04-28
tags:
 - Cancer
categories: 
 - Data Analysis
---

```python
import time
from selenium import webdriver
import pandas as pd
import numpy as np
import statsmodels.api as sm
import matplotlib.pyplot as plt
import requests, gzip
from bs4 import BeautifulSoup
from selenium.webdriver.support.select import Select
```


```python
browser = webdriver.Chrome('C:\\Users\\15149\\Anaconda3\\chromedriver.exe')
```


```python
url = "https://gis.cdc.gov/Cancer/USCS/#/AtAGlance/"
page = browser.get(url)
time.sleep(10)
cancer_button = browser.find_element_by_id("dropdownMenuButton").click()
cancer_type = browser.find_element_by_xpath("//a[@data-value='28']").click()
table = browser.find_element_by_xpath("//button[@title='Table']").click()
#download_buttons = browser.find_element_by_xpath("//button[@title='Download']").click()
select = Select(browser.find_element_by_xpath("//select[@name='OverviewMap_table_length']"))
select.select_by_value('100')
data = browser.find_element_by_id("OverviewMap_table")
```


```python
soup = BeautifulSoup(browser.page_source, 'lxml')
table_body = soup.find('tbody')
rows = table_body.find_all('tr')
stomach_df = pd.DataFrame(rows, columns = ["Area","Cancer", "Year", "Sex", "Race", "Rate", "Cases", "Population"])
```


```python
for row in stomach_df.index:
    for col in stomach_df.columns:
        stomach_df.loc[row, col] = stomach_df.loc[row, col].text
stomach_df = stomach_df.iloc[1: , :]
```


```python
for row in stomach_df.index:
    if stomach_df.loc[row, "Rate"][0].isdigit():
        stomach_df.loc[row, "Rate"] = float(stomach_df.loc[row, "Rate"][:4])
    else:
        stomach_df.loc[row, "Rate"] = np.nan
    if stomach_df.loc[row, "Cases"][0].isdigit():
        stomach_df.loc[row, "Cases"] = int(stomach_df.loc[row, "Cases"].replace(",", ""))
    else:
        stomach_df.loc[row, "Cases"] = np.nan
        
    if stomach_df.loc[row, "Population"][0].isdigit():
        stomach_df.loc[row, "Population"] = float(stomach_df.loc[row, "Population"].replace(",", ""))
    else:
        stomach_df.loc[row, "Population"] = np.nan
```


```python
stomach_df = stomach_df.dropna()
stomach_df.Cases = stomach_df.Cases.astype(int)
stomach_df.Population = stomach_df.Population.astype(int)
stomach_df.Rate = stomach_df.Rate.astype(float)
```


```python
abb_dict = {
"Alabama": "AL",
"Alaska": "AK",
"Arizona": "AZ",
"Arkansas": "AR",
"California": "CA",
"Colorado": "CO",
"Connecticut": "CT",
"Delaware": "DE",
"Florida": "FL",
"Georgia": "GA",
"Hawaii": "HI",
"Idaho": "ID",
"Illinois": "IL",
"Indiana": "IN",
"Iowa": "IA",
"Kansas": "KS",
"Kentucky": "KY",
"Louisiana": "LA",
"Maine": "ME",
"Maryland": "MD",
"Massachusetts": "MA",
"Michigan": "MI",
"Minnesota": "MN",
"Mississippi": "MS",
"Missouri": "MO",
"Montana": "MT",
"Nebraska": "NE",
"Nevada": "NV",
"New Hampshire": "NH",
"New Jersey": "NJ",
"New Mexico": "NM",
"New York": "NY",
"North Carolina": "NC",
"North Dakota": "ND",
"Ohio": "OH",
"Oklahoma": "OK",
"Oregon": "OR",
"Pennsylvania": "PA",
"Rhode Island": "RI",
"South Carolina": "SC",
"South Dakota": "SD",
"Tennessee": "TN",
"Texas": "TX",
"Utah": "UT",
"Vermont": "VT",
"Virginia": "VA",
"Washington": "WA",
"West Virginia": "WV",
"Wisconsin": "WI",
"Wyoming": "WY",
"District of Columbia": "DC",
"American Samoa": "AS",
"Guam": "GU",
"Northern Mariana Islands": "MP",
"Puerto Rico": "PR",
"United States Minor Outlying Islands": "UM",
"U.S. Virgin Islands": "VI",
}
abb_lst = []
for i in stomach_df['Area']:
    abb_lst.append(abb_dict[i])
stomach_df['state_abbreviations'] = abb_lst
```


```python
stomach_df.head()
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
      <th>Area</th>
      <th>Cancer</th>
      <th>Year</th>
      <th>Sex</th>
      <th>Race</th>
      <th>Rate</th>
      <th>Cases</th>
      <th>Population</th>
      <th>state_abbreviations</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>1</th>
      <td>Iowa</td>
      <td>Stomach</td>
      <td>2018</td>
      <td>Male and Female</td>
      <td>All Races and Ethnicities</td>
      <td>4.2</td>
      <td>169</td>
      <td>3148618</td>
      <td>IA</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Vermont</td>
      <td>Stomach</td>
      <td>2018</td>
      <td>Male and Female</td>
      <td>All Races and Ethnicities</td>
      <td>4.3</td>
      <td>38</td>
      <td>624358</td>
      <td>VT</td>
    </tr>
    <tr>
      <th>3</th>
      <td>West Virginia</td>
      <td>Stomach</td>
      <td>2018</td>
      <td>Male and Female</td>
      <td>All Races and Ethnicities</td>
      <td>4.4</td>
      <td>115</td>
      <td>1804291</td>
      <td>WV</td>
    </tr>
    <tr>
      <th>4</th>
      <td>Oregon</td>
      <td>Stomach</td>
      <td>2018</td>
      <td>Male and Female</td>
      <td>All Races and Ethnicities</td>
      <td>4.5</td>
      <td>237</td>
      <td>4181886</td>
      <td>OR</td>
    </tr>
    <tr>
      <th>5</th>
      <td>Idaho</td>
      <td>Stomach</td>
      <td>2018</td>
      <td>Male and Female</td>
      <td>All Races and Ethnicities</td>
      <td>4.5</td>
      <td>92</td>
      <td>1750536</td>
      <td>ID</td>
    </tr>
  </tbody>
</table>
</div>




```python
def chart():
    labels = ['New York', 'Florida', 'Texas', 'California']
    sizes = []
    sizes.append(stomach_df["Population"].iloc[27])
    sizes.append(stomach_df['Population'].iloc[10])
    sizes.append(stomach_df['Population'].iloc[31])
    sizes.append(stomach_df['Population'].iloc[7])
    explode_lst = [0 for i in sizes]
    explode_lst[2] = 0.3
    explode = tuple(explode_lst)
    fig1, ax1 = plt.subplots()
    ax1.pie(sizes, explode=explode, labels=labels, autopct='%1.1f%%',
            shadow=True, startangle=90)
    ax1.axis('equal')  # Equal aspect ratio ensures that pie is drawn as a circle.
    plt.show()
```


```python
def fig1():
    plt.rcParams["figure.figsize"] = (15,5)
    x = [i for i in stomach_df['state_abbreviations']]
    y = [i for i in stomach_df['Cases']]
    fig, ax = plt.subplots()
    ax.plot(x, y)
    plt.xlabel('States', fontsize=20)
    plt.ylabel('Cases', fontsize=20)
    plt.title('stomach Population And Cases', color='black')
    plt.show()
fig1()
```


    
![](https://raw.githubusercontent.com/Jun7i/blog-reco-theme/main/blogs/category1/cancer%20analysis/output_10_0.png)
    



```python
url = "https://gis.cdc.gov/Cancer/USCS/#/AtAGlance/"
page = browser.get(url)
time.sleep(10)
cancer_button = browser.find_element_by_id("dropdownMenuButton").click()
cancer_type = browser.find_element_by_xpath("//a[@data-value='21']").click()
table = browser.find_element_by_xpath("//button[@title='Table']").click()
#download_buttons = browser.find_element_by_xpath("//button[@title='Download']").click()
select = Select(browser.find_element_by_xpath("//select[@name='OverviewMap_table_length']"))
select.select_by_value('100')
data = browser.find_element_by_id("OverviewMap_table")
```


```python
soup = BeautifulSoup(browser.page_source, 'lxml')
table_body = soup.find('tbody')
rows = table_body.find_all('tr')
myeloma_df = pd.DataFrame(rows, columns = ["Area","Cancer", "Year", "Sex", "Race", "Rate", "Cases", "Population"])
```


```python
for row in myeloma_df.index:
    for col in myeloma_df.columns:
        myeloma_df.loc[row, col] = myeloma_df.loc[row, col].text
myeloma_df = myeloma_df.iloc[1: , :]
```


```python
abb_dict = {
"Alabama": "AL",
"Alaska": "AK",
"Arizona": "AZ",
"Arkansas": "AR",
"California": "CA",
"Colorado": "CO",
"Connecticut": "CT",
"Delaware": "DE",
"Florida": "FL",
"Georgia": "GA",
"Hawaii": "HI",
"Idaho": "ID",
"Illinois": "IL",
"Indiana": "IN",
"Iowa": "IA",
"Kansas": "KS",
"Kentucky": "KY",
"Louisiana": "LA",
"Maine": "ME",
"Maryland": "MD",
"Massachusetts": "MA",
"Michigan": "MI",
"Minnesota": "MN",
"Mississippi": "MS",
"Missouri": "MO",
"Montana": "MT",
"Nebraska": "NE",
"Nevada": "NV",
"New Hampshire": "NH",
"New Jersey": "NJ",
"New Mexico": "NM",
"New York": "NY",
"North Carolina": "NC",
"North Dakota": "ND",
"Ohio": "OH",
"Oklahoma": "OK",
"Oregon": "OR",
"Pennsylvania": "PA",
"Rhode Island": "RI",
"South Carolina": "SC",
"South Dakota": "SD",
"Tennessee": "TN",
"Texas": "TX",
"Utah": "UT",
"Vermont": "VT",
"Virginia": "VA",
"Washington": "WA",
"West Virginia": "WV",
"Wisconsin": "WI",
"Wyoming": "WY",
"District of Columbia": "DC",
"American Samoa": "AS",
"Guam": "GU",
"Northern Mariana Islands": "MP",
"Puerto Rico": "PR",
"United States Minor Outlying Islands": "UM",
"U.S. Virgin Islands": "VI",
}
abb_lst = []
for i in myeloma_df['Area']:
    abb_lst.append(abb_dict[i])
myeloma_df['state_abbreviations'] = abb_lst
```


```python
for row in myeloma_df.index:
    if myeloma_df.loc[row, "Rate"][0].isdigit():
        myeloma_df.loc[row, "Rate"] = float(myeloma_df.loc[row, "Rate"][:4])
    else:
        myeloma_df.loc[row, "Rate"] = np.nan
    if myeloma_df.loc[row, "Cases"][0].isdigit():
        myeloma_df.loc[row, "Cases"] = int(myeloma_df.loc[row, "Cases"].replace(",", ""))
    else:
        myeloma_df.loc[row, "Cases"] = np.nan
        
    if myeloma_df.loc[row, "Population"][0].isdigit():
        myeloma_df.loc[row, "Population"] = float(myeloma_df.loc[row, "Population"].replace(",", ""))
    else:
        myeloma_df.loc[row, "Population"] = np.nan
```


```python
myeloma_df = myeloma_df.dropna()
myeloma_df.Cases = myeloma_df.Cases.astype(int)
myeloma_df.Population = myeloma_df.Population.astype(int)
myeloma_df.Rate = myeloma_df.Rate.astype(float)
```


```python
myeloma_df.head()
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
      <th>Area</th>
      <th>Cancer</th>
      <th>Year</th>
      <th>Sex</th>
      <th>Race</th>
      <th>Rate</th>
      <th>Cases</th>
      <th>Population</th>
      <th>state_abbreviations</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>1</th>
      <td>Wyoming</td>
      <td>Myeloma</td>
      <td>2018</td>
      <td>Male and Female</td>
      <td>All Races and Ethnicities</td>
      <td>4.0</td>
      <td>30</td>
      <td>577601</td>
      <td>WY</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Hawaii</td>
      <td>Myeloma</td>
      <td>2018</td>
      <td>Male and Female</td>
      <td>All Races and Ethnicities</td>
      <td>4.0</td>
      <td>76</td>
      <td>1420593</td>
      <td>HI</td>
    </tr>
    <tr>
      <th>3</th>
      <td>North Dakota</td>
      <td>Myeloma</td>
      <td>2018</td>
      <td>Male and Female</td>
      <td>All Races and Ethnicities</td>
      <td>4.3</td>
      <td>39</td>
      <td>758080</td>
      <td>ND</td>
    </tr>
    <tr>
      <th>4</th>
      <td>Rhode Island</td>
      <td>Myeloma</td>
      <td>2018</td>
      <td>Male and Female</td>
      <td>All Races and Ethnicities</td>
      <td>4.4</td>
      <td>66</td>
      <td>1058287</td>
      <td>RI</td>
    </tr>
    <tr>
      <th>5</th>
      <td>Oregon</td>
      <td>Myeloma</td>
      <td>2018</td>
      <td>Male and Female</td>
      <td>All Races and Ethnicities</td>
      <td>4.6</td>
      <td>263</td>
      <td>4181886</td>
      <td>OR</td>
    </tr>
  </tbody>
</table>
</div>




```python
def fig2():
    plt.figure(figsize=(16,10), dpi= 80)
    plt.style.use('ggplot')
    x = [i for i in myeloma_df['state_abbreviations']]
    y = [i for i in myeloma_df['Cases']]
    plt.bar(x,y,width=0.8, color='darkviolet')
    plt.xlabel("States")
    plt.ylabel("Cases")
    plt.title('Myeloma states and cases', color='black')
fig2()
```


    
![](https://raw.githubusercontent.com/Jun7i/blog-reco-theme/main/blogs/category1/cancer%20analysis/output_18_0.png)
    



```python
y = myeloma_df['Cases']
x = myeloma_df['Population']
y = y.to_numpy()
x = x.to_numpy()
x = x.reshape((-1, 1))
```


```python
from sklearn.linear_model import LinearRegression
model = LinearRegression().fit(x, y)
r_sq = model.score(x, y)
intercept = model.intercept_
slope = model.coef_
```


```python
myeloma_df["Population"] = pd.to_numeric(myeloma_df["Population"])
myeloma_df.plot(kind='scatter', x='Population', y='Cases')
plt.xlabel('Population', fontsize=20)
plt.ylabel('Cases', fontsize=20)
plt.plot(x, slope*x+intercept)
plt.ticklabel_format(style = 'plain')

plt.title('Myeloma Population AND Cases', color='black')
plt.show()
```


    
![](https://raw.githubusercontent.com/Jun7i/blog-reco-theme/main/blogs/category1/cancer%20analysis/output_21_0.png)
    

