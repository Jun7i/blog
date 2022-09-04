---
title: Covid Data Analysis project
date: 2022-05-16
tags:
 - college ranking
categories: 
 - Data Analysis
---

Author: Zejun Li

Goal: The goal of the project is to merge two college datasets to find out the colleges that exist in both datasets in a dataframe. The dataframe will be US colleges in both datasets with more information. It would determine the relationship between the national information and detailed information.

Final plan document: https://docs.google.com/document/d/1B6rueITy7G_qoBPgmWMn5vlgvVJfaP9geXjB9Ni159o/edit?usp=sharing

## Import modules


```python
import pandas as pd
from datetime import datetime
import seaborn as sns
import matplotlib.pyplot as plt
import numpy as np
import psycopg2
```

    /usr/local/lib/python3.7/dist-packages/psycopg2/__init__.py:144: UserWarning: The psycopg2 wheel package will be renamed from release 2.8; in order to keep installing from binary please use "pip install psycopg2-binary" instead. For details see: <http://initd.org/psycopg/docs/install.html#binary-install-from-pypi>.
      """)
    

## Extract
Datasets:
World college: [cwurData.csv](https://docs.google.com/spreadsheets/d/e/2PACX-1vQxraSdxNz5sU8AT7RheilUPzOTfhsj8ReNyugWgkxrVnoRgXwEQmZJQeVqgTeRfrPaC6lTomgvjYAv/pub?output=csv)

columns :world_rank;	institution; country; national_rank; quality_of_education	alumni_employment; quality_of_faculty; publications; influence; citations; broad_impact	patents; score; year

Citation: [kaggle](https://www.kaggle.com/datasets/mylesoneill/world-university-rankings?select=cwurData.csv)

U.S. college: [College.csv](https://docs.google.com/spreadsheets/d/e/2PACX-1vQRISoqdeDiQJgulQ56qqtcL_xQpSMCy_PJL4AeNbvOzhJ7X1bdTv3o2OSr_wA_rSTnJa9_bPbl1EuH/pub?output=csv)

Colleges (unnamed), Private; Apps; Accept; Enroll; Top10perc; Top25perc; F.Undergrad; P.Undergrad	Outstate; Room.Board; Books; Personal; PhD; Terminal; S.F.Ratio; perc.alumni; Expend; Grad.Rate


Citation: [kaggle](https://www.kaggle.com/datasets/flyingwombat/us-news-and-world-reports-college-data)


```python
#Extract information from cwurData.csv
url1 = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQxraSdxNz5sU8AT7RheilUPzOTfhsj8ReNyugWgkxrVnoRgXwEQmZJQeVqgTeRfrPaC6lTomgvjYAv/pub?output=csv'
world_colleges_df = pd.read_csv(url1)
```


```python
#Filling NA values 
world_colleges_df['broad_impact'] = world_colleges_df['broad_impact'].fillna(0)
world_colleges_df
```





  <div id="df-ab92956b-1b86-4852-abdd-1ff0118469c0">
    <div class="colab-df-container">
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
      <th>world_rank</th>
      <th>institution</th>
      <th>country</th>
      <th>national_rank</th>
      <th>quality_of_education</th>
      <th>alumni_employment</th>
      <th>quality_of_faculty</th>
      <th>publications</th>
      <th>influence</th>
      <th>citations</th>
      <th>broad_impact</th>
      <th>patents</th>
      <th>score</th>
      <th>year</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1</td>
      <td>Harvard University</td>
      <td>USA</td>
      <td>1</td>
      <td>7</td>
      <td>9</td>
      <td>1</td>
      <td>1</td>
      <td>1</td>
      <td>1</td>
      <td>0.0</td>
      <td>5</td>
      <td>100.00</td>
      <td>2012</td>
    </tr>
    <tr>
      <th>1</th>
      <td>2</td>
      <td>Massachusetts Institute of Technology</td>
      <td>USA</td>
      <td>2</td>
      <td>9</td>
      <td>17</td>
      <td>3</td>
      <td>12</td>
      <td>4</td>
      <td>4</td>
      <td>0.0</td>
      <td>1</td>
      <td>91.67</td>
      <td>2012</td>
    </tr>
    <tr>
      <th>2</th>
      <td>3</td>
      <td>Stanford University</td>
      <td>USA</td>
      <td>3</td>
      <td>17</td>
      <td>11</td>
      <td>5</td>
      <td>4</td>
      <td>2</td>
      <td>2</td>
      <td>0.0</td>
      <td>15</td>
      <td>89.50</td>
      <td>2012</td>
    </tr>
    <tr>
      <th>3</th>
      <td>4</td>
      <td>University of Cambridge</td>
      <td>United Kingdom</td>
      <td>1</td>
      <td>10</td>
      <td>24</td>
      <td>4</td>
      <td>16</td>
      <td>16</td>
      <td>11</td>
      <td>0.0</td>
      <td>50</td>
      <td>86.17</td>
      <td>2012</td>
    </tr>
    <tr>
      <th>4</th>
      <td>5</td>
      <td>California Institute of Technology</td>
      <td>USA</td>
      <td>4</td>
      <td>2</td>
      <td>29</td>
      <td>7</td>
      <td>37</td>
      <td>22</td>
      <td>22</td>
      <td>0.0</td>
      <td>18</td>
      <td>85.21</td>
      <td>2012</td>
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
    </tr>
    <tr>
      <th>2195</th>
      <td>996</td>
      <td>University of the Algarve</td>
      <td>Portugal</td>
      <td>7</td>
      <td>367</td>
      <td>567</td>
      <td>218</td>
      <td>926</td>
      <td>845</td>
      <td>812</td>
      <td>969.0</td>
      <td>816</td>
      <td>44.03</td>
      <td>2015</td>
    </tr>
    <tr>
      <th>2196</th>
      <td>997</td>
      <td>Alexandria University</td>
      <td>Egypt</td>
      <td>4</td>
      <td>236</td>
      <td>566</td>
      <td>218</td>
      <td>997</td>
      <td>908</td>
      <td>645</td>
      <td>981.0</td>
      <td>871</td>
      <td>44.03</td>
      <td>2015</td>
    </tr>
    <tr>
      <th>2197</th>
      <td>998</td>
      <td>Federal University of Ceará</td>
      <td>Brazil</td>
      <td>18</td>
      <td>367</td>
      <td>549</td>
      <td>218</td>
      <td>830</td>
      <td>823</td>
      <td>812</td>
      <td>975.0</td>
      <td>824</td>
      <td>44.03</td>
      <td>2015</td>
    </tr>
    <tr>
      <th>2198</th>
      <td>999</td>
      <td>University of A Coruña</td>
      <td>Spain</td>
      <td>40</td>
      <td>367</td>
      <td>567</td>
      <td>218</td>
      <td>886</td>
      <td>974</td>
      <td>812</td>
      <td>975.0</td>
      <td>651</td>
      <td>44.02</td>
      <td>2015</td>
    </tr>
    <tr>
      <th>2199</th>
      <td>1000</td>
      <td>China Pharmaceutical University</td>
      <td>China</td>
      <td>83</td>
      <td>367</td>
      <td>567</td>
      <td>218</td>
      <td>861</td>
      <td>991</td>
      <td>812</td>
      <td>981.0</td>
      <td>547</td>
      <td>44.02</td>
      <td>2015</td>
    </tr>
  </tbody>
</table>
<p>2200 rows × 14 columns</p>
</div>
      <button class="colab-df-convert" onclick="convertToInteractive('df-ab92956b-1b86-4852-abdd-1ff0118469c0')"
              title="Convert this dataframe to an interactive table."
              style="display:none;">

  <svg xmlns="http://www.w3.org/2000/svg" height="24px"viewBox="0 0 24 24"
       width="24px">
    <path d="M0 0h24v24H0V0z" fill="none"/>
    <path d="M18.56 5.44l.94 2.06.94-2.06 2.06-.94-2.06-.94-.94-2.06-.94 2.06-2.06.94zm-11 1L8.5 8.5l.94-2.06 2.06-.94-2.06-.94L8.5 2.5l-.94 2.06-2.06.94zm10 10l.94 2.06.94-2.06 2.06-.94-2.06-.94-.94-2.06-.94 2.06-2.06.94z"/><path d="M17.41 7.96l-1.37-1.37c-.4-.4-.92-.59-1.43-.59-.52 0-1.04.2-1.43.59L10.3 9.45l-7.72 7.72c-.78.78-.78 2.05 0 2.83L4 21.41c.39.39.9.59 1.41.59.51 0 1.02-.2 1.41-.59l7.78-7.78 2.81-2.81c.8-.78.8-2.07 0-2.86zM5.41 20L4 18.59l7.72-7.72 1.47 1.35L5.41 20z"/>
  </svg>
      </button>

  <style>
    .colab-df-container {
      display:flex;
      flex-wrap:wrap;
      gap: 12px;
    }

    .colab-df-convert {
      background-color: #E8F0FE;
      border: none;
      border-radius: 50%;
      cursor: pointer;
      display: none;
      fill: #1967D2;
      height: 32px;
      padding: 0 0 0 0;
      width: 32px;
    }

    .colab-df-convert:hover {
      background-color: #E2EBFA;
      box-shadow: 0px 1px 2px rgba(60, 64, 67, 0.3), 0px 1px 3px 1px rgba(60, 64, 67, 0.15);
      fill: #174EA6;
    }

    [theme=dark] .colab-df-convert {
      background-color: #3B4455;
      fill: #D2E3FC;
    }

    [theme=dark] .colab-df-convert:hover {
      background-color: #434B5C;
      box-shadow: 0px 1px 3px 1px rgba(0, 0, 0, 0.15);
      filter: drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.3));
      fill: #FFFFFF;
    }
  </style>

      <script>
        const buttonEl =
          document.querySelector('#df-ab92956b-1b86-4852-abdd-1ff0118469c0 button.colab-df-convert');
        buttonEl.style.display =
          google.colab.kernel.accessAllowed ? 'block' : 'none';

        async function convertToInteractive(key) {
          const element = document.querySelector('#df-ab92956b-1b86-4852-abdd-1ff0118469c0');
          const dataTable =
            await google.colab.kernel.invokeFunction('convertToInteractive',
                                                     [key], {});
          if (!dataTable) return;

          const docLinkHtml = 'Like what you see? Visit the ' +
            '<a target="_blank" href=https://colab.research.google.com/notebooks/data_table.ipynb>data table notebook</a>'
            + ' to learn more about interactive tables.';
          element.innerHTML = '';
          dataTable['output_type'] = 'display_data';
          await google.colab.output.renderOutput(dataTable, element);
          const docLink = document.createElement('div');
          docLink.innerHTML = docLinkHtml;
          element.appendChild(docLink);
        }
      </script>
    </div>
  </div>





```python
#Extract information from College.csv
url2 = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQRISoqdeDiQJgulQ56qqtcL_xQpSMCy_PJL4AeNbvOzhJ7X1bdTv3o2OSr_wA_rSTnJa9_bPbl1EuH/pub?output=csv'
us_college_df = pd.read_csv(url2)
```


```python
#make a column name for the uname colleges column
us_college_df.columns = us_college_df.columns.str.replace('Unnamed: 0','institution')
```


```python
us_college_df
```





  <div id="df-454b3b81-2862-4963-93cb-f004532ba71a">
    <div class="colab-df-container">
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
      <th>institution</th>
      <th>Private</th>
      <th>Apps</th>
      <th>Accept</th>
      <th>Enroll</th>
      <th>Top10perc</th>
      <th>Top25perc</th>
      <th>F.Undergrad</th>
      <th>P.Undergrad</th>
      <th>Outstate</th>
      <th>Room.Board</th>
      <th>Books</th>
      <th>Personal</th>
      <th>PhD</th>
      <th>Terminal</th>
      <th>S.F.Ratio</th>
      <th>perc.alumni</th>
      <th>Expend</th>
      <th>Grad.Rate</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>Abilene Christian University</td>
      <td>Yes</td>
      <td>1660</td>
      <td>1232</td>
      <td>721</td>
      <td>23</td>
      <td>52</td>
      <td>2885</td>
      <td>537</td>
      <td>7440</td>
      <td>3300</td>
      <td>450</td>
      <td>2200</td>
      <td>70</td>
      <td>78</td>
      <td>18.1</td>
      <td>12</td>
      <td>7041</td>
      <td>60</td>
    </tr>
    <tr>
      <th>1</th>
      <td>Adelphi University</td>
      <td>Yes</td>
      <td>2186</td>
      <td>1924</td>
      <td>512</td>
      <td>16</td>
      <td>29</td>
      <td>2683</td>
      <td>1227</td>
      <td>12280</td>
      <td>6450</td>
      <td>750</td>
      <td>1500</td>
      <td>29</td>
      <td>30</td>
      <td>12.2</td>
      <td>16</td>
      <td>10527</td>
      <td>56</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Adrian College</td>
      <td>Yes</td>
      <td>1428</td>
      <td>1097</td>
      <td>336</td>
      <td>22</td>
      <td>50</td>
      <td>1036</td>
      <td>99</td>
      <td>11250</td>
      <td>3750</td>
      <td>400</td>
      <td>1165</td>
      <td>53</td>
      <td>66</td>
      <td>12.9</td>
      <td>30</td>
      <td>8735</td>
      <td>54</td>
    </tr>
    <tr>
      <th>3</th>
      <td>Agnes Scott College</td>
      <td>Yes</td>
      <td>417</td>
      <td>349</td>
      <td>137</td>
      <td>60</td>
      <td>89</td>
      <td>510</td>
      <td>63</td>
      <td>12960</td>
      <td>5450</td>
      <td>450</td>
      <td>875</td>
      <td>92</td>
      <td>97</td>
      <td>7.7</td>
      <td>37</td>
      <td>19016</td>
      <td>59</td>
    </tr>
    <tr>
      <th>4</th>
      <td>Alaska Pacific University</td>
      <td>Yes</td>
      <td>193</td>
      <td>146</td>
      <td>55</td>
      <td>16</td>
      <td>44</td>
      <td>249</td>
      <td>869</td>
      <td>7560</td>
      <td>4120</td>
      <td>800</td>
      <td>1500</td>
      <td>76</td>
      <td>72</td>
      <td>11.9</td>
      <td>2</td>
      <td>10922</td>
      <td>15</td>
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
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>772</th>
      <td>Worcester State College</td>
      <td>No</td>
      <td>2197</td>
      <td>1515</td>
      <td>543</td>
      <td>4</td>
      <td>26</td>
      <td>3089</td>
      <td>2029</td>
      <td>6797</td>
      <td>3900</td>
      <td>500</td>
      <td>1200</td>
      <td>60</td>
      <td>60</td>
      <td>21.0</td>
      <td>14</td>
      <td>4469</td>
      <td>40</td>
    </tr>
    <tr>
      <th>773</th>
      <td>Xavier University</td>
      <td>Yes</td>
      <td>1959</td>
      <td>1805</td>
      <td>695</td>
      <td>24</td>
      <td>47</td>
      <td>2849</td>
      <td>1107</td>
      <td>11520</td>
      <td>4960</td>
      <td>600</td>
      <td>1250</td>
      <td>73</td>
      <td>75</td>
      <td>13.3</td>
      <td>31</td>
      <td>9189</td>
      <td>83</td>
    </tr>
    <tr>
      <th>774</th>
      <td>Xavier University of Louisiana</td>
      <td>Yes</td>
      <td>2097</td>
      <td>1915</td>
      <td>695</td>
      <td>34</td>
      <td>61</td>
      <td>2793</td>
      <td>166</td>
      <td>6900</td>
      <td>4200</td>
      <td>617</td>
      <td>781</td>
      <td>67</td>
      <td>75</td>
      <td>14.4</td>
      <td>20</td>
      <td>8323</td>
      <td>49</td>
    </tr>
    <tr>
      <th>775</th>
      <td>Yale University</td>
      <td>Yes</td>
      <td>10705</td>
      <td>2453</td>
      <td>1317</td>
      <td>95</td>
      <td>99</td>
      <td>5217</td>
      <td>83</td>
      <td>19840</td>
      <td>6510</td>
      <td>630</td>
      <td>2115</td>
      <td>96</td>
      <td>96</td>
      <td>5.8</td>
      <td>49</td>
      <td>40386</td>
      <td>99</td>
    </tr>
    <tr>
      <th>776</th>
      <td>York College of Pennsylvania</td>
      <td>Yes</td>
      <td>2989</td>
      <td>1855</td>
      <td>691</td>
      <td>28</td>
      <td>63</td>
      <td>2988</td>
      <td>1726</td>
      <td>4990</td>
      <td>3560</td>
      <td>500</td>
      <td>1250</td>
      <td>75</td>
      <td>75</td>
      <td>18.1</td>
      <td>28</td>
      <td>4509</td>
      <td>99</td>
    </tr>
  </tbody>
</table>
<p>777 rows × 19 columns</p>
</div>
      <button class="colab-df-convert" onclick="convertToInteractive('df-454b3b81-2862-4963-93cb-f004532ba71a')"
              title="Convert this dataframe to an interactive table."
              style="display:none;">

  <svg xmlns="http://www.w3.org/2000/svg" height="24px"viewBox="0 0 24 24"
       width="24px">
    <path d="M0 0h24v24H0V0z" fill="none"/>
    <path d="M18.56 5.44l.94 2.06.94-2.06 2.06-.94-2.06-.94-.94-2.06-.94 2.06-2.06.94zm-11 1L8.5 8.5l.94-2.06 2.06-.94-2.06-.94L8.5 2.5l-.94 2.06-2.06.94zm10 10l.94 2.06.94-2.06 2.06-.94-2.06-.94-.94-2.06-.94 2.06-2.06.94z"/><path d="M17.41 7.96l-1.37-1.37c-.4-.4-.92-.59-1.43-.59-.52 0-1.04.2-1.43.59L10.3 9.45l-7.72 7.72c-.78.78-.78 2.05 0 2.83L4 21.41c.39.39.9.59 1.41.59.51 0 1.02-.2 1.41-.59l7.78-7.78 2.81-2.81c.8-.78.8-2.07 0-2.86zM5.41 20L4 18.59l7.72-7.72 1.47 1.35L5.41 20z"/>
  </svg>
      </button>

  <style>
    .colab-df-container {
      display:flex;
      flex-wrap:wrap;
      gap: 12px;
    }

    .colab-df-convert {
      background-color: #E8F0FE;
      border: none;
      border-radius: 50%;
      cursor: pointer;
      display: none;
      fill: #1967D2;
      height: 32px;
      padding: 0 0 0 0;
      width: 32px;
    }

    .colab-df-convert:hover {
      background-color: #E2EBFA;
      box-shadow: 0px 1px 2px rgba(60, 64, 67, 0.3), 0px 1px 3px 1px rgba(60, 64, 67, 0.15);
      fill: #174EA6;
    }

    [theme=dark] .colab-df-convert {
      background-color: #3B4455;
      fill: #D2E3FC;
    }

    [theme=dark] .colab-df-convert:hover {
      background-color: #434B5C;
      box-shadow: 0px 1px 3px 1px rgba(0, 0, 0, 0.15);
      filter: drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.3));
      fill: #FFFFFF;
    }
  </style>

      <script>
        const buttonEl =
          document.querySelector('#df-454b3b81-2862-4963-93cb-f004532ba71a button.colab-df-convert');
        buttonEl.style.display =
          google.colab.kernel.accessAllowed ? 'block' : 'none';

        async function convertToInteractive(key) {
          const element = document.querySelector('#df-454b3b81-2862-4963-93cb-f004532ba71a');
          const dataTable =
            await google.colab.kernel.invokeFunction('convertToInteractive',
                                                     [key], {});
          if (!dataTable) return;

          const docLinkHtml = 'Like what you see? Visit the ' +
            '<a target="_blank" href=https://colab.research.google.com/notebooks/data_table.ipynb>data table notebook</a>'
            + ' to learn more about interactive tables.';
          element.innerHTML = '';
          dataTable['output_type'] = 'display_data';
          await google.colab.output.renderOutput(dataTable, element);
          const docLink = document.createElement('div');
          docLink.innerHTML = docLinkHtml;
          element.appendChild(docLink);
        }
      </script>
    </div>
  </div>





```python
#merge two dataset to get the colleges that appear in both datasets
merged_df = pd.merge(world_colleges_df,us_college_df,on='institution',how='outer',indicator=False)
```

## Transform



*   Extract the useful columns
*   Rename columns
*   Drop colleges with no world rank
*   Drop duplicates of colleges
*   Aggregating
*   Datatype conversions

There will be 5 dataframes: influence_df, colleges_df, tuitions_df, application_df, rankings_df






```python
#filter out the colleges with no ranking, drop duplicates of colleges, rename column names to make more sense
merged_df = merged_df.dropna(axis=0)
merged_df = merged_df.drop_duplicates(subset=['institution'])
merged_df = merged_df.rename(columns={'institution': 'college_names', 'Apps': 'Applications', 'Room.Board': 'Room_Board'})
merged_df
```





  <div id="df-55c254c1-bb88-4a13-80b7-f278cbd5bd91">
    <div class="colab-df-container">
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
      <th>world_rank</th>
      <th>college_names</th>
      <th>country</th>
      <th>national_rank</th>
      <th>quality_of_education</th>
      <th>alumni_employment</th>
      <th>quality_of_faculty</th>
      <th>publications</th>
      <th>influence</th>
      <th>citations</th>
      <th>...</th>
      <th>Outstate</th>
      <th>Room_Board</th>
      <th>Books</th>
      <th>Personal</th>
      <th>PhD</th>
      <th>Terminal</th>
      <th>S.F.Ratio</th>
      <th>perc.alumni</th>
      <th>Expend</th>
      <th>Grad.Rate</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1.0</td>
      <td>Harvard University</td>
      <td>USA</td>
      <td>1.0</td>
      <td>7.0</td>
      <td>9.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>...</td>
      <td>18485.0</td>
      <td>6410.0</td>
      <td>500.0</td>
      <td>1920.0</td>
      <td>97.0</td>
      <td>97.0</td>
      <td>9.9</td>
      <td>52.0</td>
      <td>37219.0</td>
      <td>100.0</td>
    </tr>
    <tr>
      <th>4</th>
      <td>2.0</td>
      <td>Massachusetts Institute of Technology</td>
      <td>USA</td>
      <td>2.0</td>
      <td>9.0</td>
      <td>17.0</td>
      <td>3.0</td>
      <td>12.0</td>
      <td>4.0</td>
      <td>4.0</td>
      <td>...</td>
      <td>20100.0</td>
      <td>5975.0</td>
      <td>725.0</td>
      <td>1600.0</td>
      <td>99.0</td>
      <td>99.0</td>
      <td>10.1</td>
      <td>35.0</td>
      <td>33541.0</td>
      <td>94.0</td>
    </tr>
    <tr>
      <th>20</th>
      <td>6.0</td>
      <td>Princeton University</td>
      <td>USA</td>
      <td>5.0</td>
      <td>8.0</td>
      <td>14.0</td>
      <td>2.0</td>
      <td>53.0</td>
      <td>33.0</td>
      <td>26.0</td>
      <td>...</td>
      <td>19900.0</td>
      <td>5910.0</td>
      <td>675.0</td>
      <td>1575.0</td>
      <td>91.0</td>
      <td>96.0</td>
      <td>8.4</td>
      <td>54.0</td>
      <td>28320.0</td>
      <td>99.0</td>
    </tr>
    <tr>
      <th>28</th>
      <td>8.0</td>
      <td>Yale University</td>
      <td>USA</td>
      <td>6.0</td>
      <td>14.0</td>
      <td>31.0</td>
      <td>12.0</td>
      <td>14.0</td>
      <td>6.0</td>
      <td>15.0</td>
      <td>...</td>
      <td>19840.0</td>
      <td>6510.0</td>
      <td>630.0</td>
      <td>2115.0</td>
      <td>96.0</td>
      <td>96.0</td>
      <td>5.8</td>
      <td>49.0</td>
      <td>40386.0</td>
      <td>99.0</td>
    </tr>
    <tr>
      <th>32</th>
      <td>9.0</td>
      <td>Columbia University</td>
      <td>USA</td>
      <td>7.0</td>
      <td>23.0</td>
      <td>21.0</td>
      <td>10.0</td>
      <td>13.0</td>
      <td>12.0</td>
      <td>14.0</td>
      <td>...</td>
      <td>18624.0</td>
      <td>6664.0</td>
      <td>550.0</td>
      <td>300.0</td>
      <td>97.0</td>
      <td>98.0</td>
      <td>5.9</td>
      <td>21.0</td>
      <td>30639.0</td>
      <td>99.0</td>
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
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>1922</th>
      <td>864.0</td>
      <td>Oakland University</td>
      <td>USA</td>
      <td>223.0</td>
      <td>355.0</td>
      <td>478.0</td>
      <td>210.0</td>
      <td>883.0</td>
      <td>842.0</td>
      <td>800.0</td>
      <td>...</td>
      <td>9114.0</td>
      <td>4030.0</td>
      <td>400.0</td>
      <td>650.0</td>
      <td>88.0</td>
      <td>90.0</td>
      <td>19.7</td>
      <td>13.0</td>
      <td>6637.0</td>
      <td>53.0</td>
    </tr>
    <tr>
      <th>1928</th>
      <td>867.0</td>
      <td>University of North Carolina at Greensboro</td>
      <td>USA</td>
      <td>224.0</td>
      <td>355.0</td>
      <td>478.0</td>
      <td>210.0</td>
      <td>936.0</td>
      <td>849.0</td>
      <td>609.0</td>
      <td>...</td>
      <td>8677.0</td>
      <td>3505.0</td>
      <td>600.0</td>
      <td>1300.0</td>
      <td>75.0</td>
      <td>94.0</td>
      <td>15.5</td>
      <td>17.0</td>
      <td>7392.0</td>
      <td>53.0</td>
    </tr>
    <tr>
      <th>1942</th>
      <td>874.0</td>
      <td>University of North Dakota</td>
      <td>USA</td>
      <td>225.0</td>
      <td>355.0</td>
      <td>478.0</td>
      <td>210.0</td>
      <td>935.0</td>
      <td>647.0</td>
      <td>800.0</td>
      <td>...</td>
      <td>5634.0</td>
      <td>2703.0</td>
      <td>450.0</td>
      <td>1200.0</td>
      <td>97.0</td>
      <td>97.0</td>
      <td>15.9</td>
      <td>16.0</td>
      <td>9424.0</td>
      <td>49.0</td>
    </tr>
    <tr>
      <th>2020</th>
      <td>913.0</td>
      <td>University of Southern Mississippi</td>
      <td>USA</td>
      <td>227.0</td>
      <td>355.0</td>
      <td>478.0</td>
      <td>210.0</td>
      <td>903.0</td>
      <td>840.0</td>
      <td>800.0</td>
      <td>...</td>
      <td>4652.0</td>
      <td>2470.0</td>
      <td>500.0</td>
      <td>500.0</td>
      <td>78.0</td>
      <td>99.0</td>
      <td>18.7</td>
      <td>23.0</td>
      <td>5917.0</td>
      <td>45.0</td>
    </tr>
    <tr>
      <th>2130</th>
      <td>969.0</td>
      <td>Western Michigan University</td>
      <td>USA</td>
      <td>229.0</td>
      <td>355.0</td>
      <td>478.0</td>
      <td>210.0</td>
      <td>962.0</td>
      <td>815.0</td>
      <td>800.0</td>
      <td>...</td>
      <td>6940.0</td>
      <td>4100.0</td>
      <td>500.0</td>
      <td>1700.0</td>
      <td>80.0</td>
      <td>84.0</td>
      <td>24.7</td>
      <td>11.0</td>
      <td>5983.0</td>
      <td>55.0</td>
    </tr>
  </tbody>
</table>
<p>93 rows × 32 columns</p>
</div>
      <button class="colab-df-convert" onclick="convertToInteractive('df-55c254c1-bb88-4a13-80b7-f278cbd5bd91')"
              title="Convert this dataframe to an interactive table."
              style="display:none;">

  <svg xmlns="http://www.w3.org/2000/svg" height="24px"viewBox="0 0 24 24"
       width="24px">
    <path d="M0 0h24v24H0V0z" fill="none"/>
    <path d="M18.56 5.44l.94 2.06.94-2.06 2.06-.94-2.06-.94-.94-2.06-.94 2.06-2.06.94zm-11 1L8.5 8.5l.94-2.06 2.06-.94-2.06-.94L8.5 2.5l-.94 2.06-2.06.94zm10 10l.94 2.06.94-2.06 2.06-.94-2.06-.94-.94-2.06-.94 2.06-2.06.94z"/><path d="M17.41 7.96l-1.37-1.37c-.4-.4-.92-.59-1.43-.59-.52 0-1.04.2-1.43.59L10.3 9.45l-7.72 7.72c-.78.78-.78 2.05 0 2.83L4 21.41c.39.39.9.59 1.41.59.51 0 1.02-.2 1.41-.59l7.78-7.78 2.81-2.81c.8-.78.8-2.07 0-2.86zM5.41 20L4 18.59l7.72-7.72 1.47 1.35L5.41 20z"/>
  </svg>
      </button>

  <style>
    .colab-df-container {
      display:flex;
      flex-wrap:wrap;
      gap: 12px;
    }

    .colab-df-convert {
      background-color: #E8F0FE;
      border: none;
      border-radius: 50%;
      cursor: pointer;
      display: none;
      fill: #1967D2;
      height: 32px;
      padding: 0 0 0 0;
      width: 32px;
    }

    .colab-df-convert:hover {
      background-color: #E2EBFA;
      box-shadow: 0px 1px 2px rgba(60, 64, 67, 0.3), 0px 1px 3px 1px rgba(60, 64, 67, 0.15);
      fill: #174EA6;
    }

    [theme=dark] .colab-df-convert {
      background-color: #3B4455;
      fill: #D2E3FC;
    }

    [theme=dark] .colab-df-convert:hover {
      background-color: #434B5C;
      box-shadow: 0px 1px 3px 1px rgba(0, 0, 0, 0.15);
      filter: drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.3));
      fill: #FFFFFF;
    }
  </style>

      <script>
        const buttonEl =
          document.querySelector('#df-55c254c1-bb88-4a13-80b7-f278cbd5bd91 button.colab-df-convert');
        buttonEl.style.display =
          google.colab.kernel.accessAllowed ? 'block' : 'none';

        async function convertToInteractive(key) {
          const element = document.querySelector('#df-55c254c1-bb88-4a13-80b7-f278cbd5bd91');
          const dataTable =
            await google.colab.kernel.invokeFunction('convertToInteractive',
                                                     [key], {});
          if (!dataTable) return;

          const docLinkHtml = 'Like what you see? Visit the ' +
            '<a target="_blank" href=https://colab.research.google.com/notebooks/data_table.ipynb>data table notebook</a>'
            + ' to learn more about interactive tables.';
          element.innerHTML = '';
          dataTable['output_type'] = 'display_data';
          await google.colab.output.renderOutput(dataTable, element);
          const docLink = document.createElement('div');
          docLink.innerHTML = docLinkHtml;
          element.appendChild(docLink);
        }
      </script>
    </div>
  </div>





```python
#make influence_df
influence_df = merged_df[['publications', 'influence', 'citations', 'broad_impact', 'patents', 'PhD']].copy()
#calculate the total influence
influence_df['total_influence'] = influence_df['publications'] + influence_df['influence'] + influence_df['citations'] + influence_df['broad_impact'] + influence_df['patents']+ influence_df['PhD']
#reset index
influence_df = influence_df.reset_index(drop=True)
#create the foreign key influence_id for total_influence
influence_df['influence_id'] = pd.factorize(influence_df['total_influence'])[0].astype(str)
influence_df
```





  <div id="df-9761572a-c8b1-4411-82d7-d67903b60b75">
    <div class="colab-df-container">
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
      <th>publications</th>
      <th>influence</th>
      <th>citations</th>
      <th>broad_impact</th>
      <th>patents</th>
      <th>PhD</th>
      <th>total_influence</th>
      <th>influence_id</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>0.0</td>
      <td>5.0</td>
      <td>97.0</td>
      <td>105.0</td>
      <td>0</td>
    </tr>
    <tr>
      <th>1</th>
      <td>12.0</td>
      <td>4.0</td>
      <td>4.0</td>
      <td>0.0</td>
      <td>1.0</td>
      <td>99.0</td>
      <td>120.0</td>
      <td>1</td>
    </tr>
    <tr>
      <th>2</th>
      <td>53.0</td>
      <td>33.0</td>
      <td>26.0</td>
      <td>0.0</td>
      <td>101.0</td>
      <td>91.0</td>
      <td>304.0</td>
      <td>2</td>
    </tr>
    <tr>
      <th>3</th>
      <td>14.0</td>
      <td>6.0</td>
      <td>15.0</td>
      <td>0.0</td>
      <td>66.0</td>
      <td>96.0</td>
      <td>197.0</td>
      <td>3</td>
    </tr>
    <tr>
      <th>4</th>
      <td>13.0</td>
      <td>12.0</td>
      <td>14.0</td>
      <td>0.0</td>
      <td>5.0</td>
      <td>97.0</td>
      <td>141.0</td>
      <td>4</td>
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
    </tr>
    <tr>
      <th>88</th>
      <td>883.0</td>
      <td>842.0</td>
      <td>800.0</td>
      <td>783.0</td>
      <td>737.0</td>
      <td>88.0</td>
      <td>4133.0</td>
      <td>88</td>
    </tr>
    <tr>
      <th>89</th>
      <td>936.0</td>
      <td>849.0</td>
      <td>609.0</td>
      <td>800.0</td>
      <td>552.0</td>
      <td>75.0</td>
      <td>3821.0</td>
      <td>89</td>
    </tr>
    <tr>
      <th>90</th>
      <td>935.0</td>
      <td>647.0</td>
      <td>800.0</td>
      <td>832.0</td>
      <td>426.0</td>
      <td>97.0</td>
      <td>3737.0</td>
      <td>90</td>
    </tr>
    <tr>
      <th>91</th>
      <td>903.0</td>
      <td>840.0</td>
      <td>800.0</td>
      <td>849.0</td>
      <td>737.0</td>
      <td>78.0</td>
      <td>4207.0</td>
      <td>91</td>
    </tr>
    <tr>
      <th>92</th>
      <td>962.0</td>
      <td>815.0</td>
      <td>800.0</td>
      <td>937.0</td>
      <td>737.0</td>
      <td>80.0</td>
      <td>4331.0</td>
      <td>92</td>
    </tr>
  </tbody>
</table>
<p>93 rows × 8 columns</p>
</div>
      <button class="colab-df-convert" onclick="convertToInteractive('df-9761572a-c8b1-4411-82d7-d67903b60b75')"
              title="Convert this dataframe to an interactive table."
              style="display:none;">

  <svg xmlns="http://www.w3.org/2000/svg" height="24px"viewBox="0 0 24 24"
       width="24px">
    <path d="M0 0h24v24H0V0z" fill="none"/>
    <path d="M18.56 5.44l.94 2.06.94-2.06 2.06-.94-2.06-.94-.94-2.06-.94 2.06-2.06.94zm-11 1L8.5 8.5l.94-2.06 2.06-.94-2.06-.94L8.5 2.5l-.94 2.06-2.06.94zm10 10l.94 2.06.94-2.06 2.06-.94-2.06-.94-.94-2.06-.94 2.06-2.06.94z"/><path d="M17.41 7.96l-1.37-1.37c-.4-.4-.92-.59-1.43-.59-.52 0-1.04.2-1.43.59L10.3 9.45l-7.72 7.72c-.78.78-.78 2.05 0 2.83L4 21.41c.39.39.9.59 1.41.59.51 0 1.02-.2 1.41-.59l7.78-7.78 2.81-2.81c.8-.78.8-2.07 0-2.86zM5.41 20L4 18.59l7.72-7.72 1.47 1.35L5.41 20z"/>
  </svg>
      </button>

  <style>
    .colab-df-container {
      display:flex;
      flex-wrap:wrap;
      gap: 12px;
    }

    .colab-df-convert {
      background-color: #E8F0FE;
      border: none;
      border-radius: 50%;
      cursor: pointer;
      display: none;
      fill: #1967D2;
      height: 32px;
      padding: 0 0 0 0;
      width: 32px;
    }

    .colab-df-convert:hover {
      background-color: #E2EBFA;
      box-shadow: 0px 1px 2px rgba(60, 64, 67, 0.3), 0px 1px 3px 1px rgba(60, 64, 67, 0.15);
      fill: #174EA6;
    }

    [theme=dark] .colab-df-convert {
      background-color: #3B4455;
      fill: #D2E3FC;
    }

    [theme=dark] .colab-df-convert:hover {
      background-color: #434B5C;
      box-shadow: 0px 1px 3px 1px rgba(0, 0, 0, 0.15);
      filter: drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.3));
      fill: #FFFFFF;
    }
  </style>

      <script>
        const buttonEl =
          document.querySelector('#df-9761572a-c8b1-4411-82d7-d67903b60b75 button.colab-df-convert');
        buttonEl.style.display =
          google.colab.kernel.accessAllowed ? 'block' : 'none';

        async function convertToInteractive(key) {
          const element = document.querySelector('#df-9761572a-c8b1-4411-82d7-d67903b60b75');
          const dataTable =
            await google.colab.kernel.invokeFunction('convertToInteractive',
                                                     [key], {});
          if (!dataTable) return;

          const docLinkHtml = 'Like what you see? Visit the ' +
            '<a target="_blank" href=https://colab.research.google.com/notebooks/data_table.ipynb>data table notebook</a>'
            + ' to learn more about interactive tables.';
          element.innerHTML = '';
          dataTable['output_type'] = 'display_data';
          await google.colab.output.renderOutput(dataTable, element);
          const docLink = document.createElement('div');
          docLink.innerHTML = docLinkHtml;
          element.appendChild(docLink);
        }
      </script>
    </div>
  </div>





```python
#make colleges_df
colleges_df = merged_df[['college_names','Private']].copy()
#add the foreign key influence_id from influence_df to colleges_df
colleges_df['influence_id'] = influence_df['influence_id'].values
colleges_df = colleges_df.reset_index(drop=True)
#make foreign key college_id for college_names
colleges_df['college_id'] = pd.factorize(colleges_df['college_names'])[0].astype(str)
colleges_df
```





  <div id="df-d5309afa-2ded-4333-8409-1eb00eabde04">
    <div class="colab-df-container">
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
      <th>college_names</th>
      <th>Private</th>
      <th>influence_id</th>
      <th>college_id</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>Harvard University</td>
      <td>Yes</td>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <th>1</th>
      <td>Massachusetts Institute of Technology</td>
      <td>Yes</td>
      <td>1</td>
      <td>1</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Princeton University</td>
      <td>Yes</td>
      <td>2</td>
      <td>2</td>
    </tr>
    <tr>
      <th>3</th>
      <td>Yale University</td>
      <td>Yes</td>
      <td>3</td>
      <td>3</td>
    </tr>
    <tr>
      <th>4</th>
      <td>Columbia University</td>
      <td>Yes</td>
      <td>4</td>
      <td>4</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>88</th>
      <td>Oakland University</td>
      <td>No</td>
      <td>88</td>
      <td>88</td>
    </tr>
    <tr>
      <th>89</th>
      <td>University of North Carolina at Greensboro</td>
      <td>No</td>
      <td>89</td>
      <td>89</td>
    </tr>
    <tr>
      <th>90</th>
      <td>University of North Dakota</td>
      <td>No</td>
      <td>90</td>
      <td>90</td>
    </tr>
    <tr>
      <th>91</th>
      <td>University of Southern Mississippi</td>
      <td>No</td>
      <td>91</td>
      <td>91</td>
    </tr>
    <tr>
      <th>92</th>
      <td>Western Michigan University</td>
      <td>No</td>
      <td>92</td>
      <td>92</td>
    </tr>
  </tbody>
</table>
<p>93 rows × 4 columns</p>
</div>
      <button class="colab-df-convert" onclick="convertToInteractive('df-d5309afa-2ded-4333-8409-1eb00eabde04')"
              title="Convert this dataframe to an interactive table."
              style="display:none;">

  <svg xmlns="http://www.w3.org/2000/svg" height="24px"viewBox="0 0 24 24"
       width="24px">
    <path d="M0 0h24v24H0V0z" fill="none"/>
    <path d="M18.56 5.44l.94 2.06.94-2.06 2.06-.94-2.06-.94-.94-2.06-.94 2.06-2.06.94zm-11 1L8.5 8.5l.94-2.06 2.06-.94-2.06-.94L8.5 2.5l-.94 2.06-2.06.94zm10 10l.94 2.06.94-2.06 2.06-.94-2.06-.94-.94-2.06-.94 2.06-2.06.94z"/><path d="M17.41 7.96l-1.37-1.37c-.4-.4-.92-.59-1.43-.59-.52 0-1.04.2-1.43.59L10.3 9.45l-7.72 7.72c-.78.78-.78 2.05 0 2.83L4 21.41c.39.39.9.59 1.41.59.51 0 1.02-.2 1.41-.59l7.78-7.78 2.81-2.81c.8-.78.8-2.07 0-2.86zM5.41 20L4 18.59l7.72-7.72 1.47 1.35L5.41 20z"/>
  </svg>
      </button>

  <style>
    .colab-df-container {
      display:flex;
      flex-wrap:wrap;
      gap: 12px;
    }

    .colab-df-convert {
      background-color: #E8F0FE;
      border: none;
      border-radius: 50%;
      cursor: pointer;
      display: none;
      fill: #1967D2;
      height: 32px;
      padding: 0 0 0 0;
      width: 32px;
    }

    .colab-df-convert:hover {
      background-color: #E2EBFA;
      box-shadow: 0px 1px 2px rgba(60, 64, 67, 0.3), 0px 1px 3px 1px rgba(60, 64, 67, 0.15);
      fill: #174EA6;
    }

    [theme=dark] .colab-df-convert {
      background-color: #3B4455;
      fill: #D2E3FC;
    }

    [theme=dark] .colab-df-convert:hover {
      background-color: #434B5C;
      box-shadow: 0px 1px 3px 1px rgba(0, 0, 0, 0.15);
      filter: drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.3));
      fill: #FFFFFF;
    }
  </style>

      <script>
        const buttonEl =
          document.querySelector('#df-d5309afa-2ded-4333-8409-1eb00eabde04 button.colab-df-convert');
        buttonEl.style.display =
          google.colab.kernel.accessAllowed ? 'block' : 'none';

        async function convertToInteractive(key) {
          const element = document.querySelector('#df-d5309afa-2ded-4333-8409-1eb00eabde04');
          const dataTable =
            await google.colab.kernel.invokeFunction('convertToInteractive',
                                                     [key], {});
          if (!dataTable) return;

          const docLinkHtml = 'Like what you see? Visit the ' +
            '<a target="_blank" href=https://colab.research.google.com/notebooks/data_table.ipynb>data table notebook</a>'
            + ' to learn more about interactive tables.';
          element.innerHTML = '';
          dataTable['output_type'] = 'display_data';
          await google.colab.output.renderOutput(dataTable, element);
          const docLink = document.createElement('div');
          docLink.innerHTML = docLinkHtml;
          element.appendChild(docLink);
        }
      </script>
    </div>
  </div>





```python
#make tuitions_df
tuitions_df = merged_df[['Outstate', 'Room_Board', 'Personal', 'Expend']].copy()
#calculate total cost
tuitions_df['sum_cost'] = tuitions_df['Outstate'] + tuitions_df['Room_Board'] + tuitions_df['Personal'] + tuitions_df['Expend']
#add the foreign key college_id from colleges_df to tuitions_df
tuitions_df['college_id'] = colleges_df['college_id'].values
#sort the sum_cost
tuitions_df = tuitions_df.sort_values(by=['sum_cost'], ascending=False)
#reset index
tuitions_df = tuitions_df.reset_index(drop=True)
#make foregin key tuition_id for sum_cost
tuitions_df['tuition_id'] = pd.factorize(tuitions_df['sum_cost'])[0].astype(str)
tuitions_df
```





  <div id="df-4d159952-ab10-4a46-b271-36d6f455e32b">
    <div class="colab-df-container">
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
      <th>Outstate</th>
      <th>Room_Board</th>
      <th>Personal</th>
      <th>Expend</th>
      <th>sum_cost</th>
      <th>college_id</th>
      <th>tuition_id</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>18800.0</td>
      <td>6740.0</td>
      <td>1040.0</td>
      <td>56233.0</td>
      <td>82813.0</td>
      <td>7</td>
      <td>0</td>
    </tr>
    <tr>
      <th>1</th>
      <td>19840.0</td>
      <td>6510.0</td>
      <td>2115.0</td>
      <td>40386.0</td>
      <td>68851.0</td>
      <td>3</td>
      <td>1</td>
    </tr>
    <tr>
      <th>2</th>
      <td>18485.0</td>
      <td>6410.0</td>
      <td>1920.0</td>
      <td>37219.0</td>
      <td>64034.0</td>
      <td>0</td>
      <td>2</td>
    </tr>
    <tr>
      <th>3</th>
      <td>18930.0</td>
      <td>6380.0</td>
      <td>1254.0</td>
      <td>36854.0</td>
      <td>63418.0</td>
      <td>5</td>
      <td>3</td>
    </tr>
    <tr>
      <th>4</th>
      <td>13850.0</td>
      <td>4360.0</td>
      <td>1250.0</td>
      <td>41766.0</td>
      <td>61226.0</td>
      <td>31</td>
      <td>4</td>
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
    </tr>
    <tr>
      <th>88</th>
      <td>6995.0</td>
      <td>3120.0</td>
      <td>2000.0</td>
      <td>6122.0</td>
      <td>18237.0</td>
      <td>50</td>
      <td>88</td>
    </tr>
    <tr>
      <th>89</th>
      <td>4104.0</td>
      <td>5376.0</td>
      <td>1200.0</td>
      <td>4329.0</td>
      <td>15009.0</td>
      <td>46</td>
      <td>89</td>
    </tr>
    <tr>
      <th>90</th>
      <td>4422.0</td>
      <td>2780.0</td>
      <td>2850.0</td>
      <td>4696.0</td>
      <td>14748.0</td>
      <td>79</td>
      <td>90</td>
    </tr>
    <tr>
      <th>91</th>
      <td>4652.0</td>
      <td>2470.0</td>
      <td>500.0</td>
      <td>5917.0</td>
      <td>13539.0</td>
      <td>91</td>
      <td>91</td>
    </tr>
    <tr>
      <th>92</th>
      <td>3957.0</td>
      <td>2325.0</td>
      <td>1656.0</td>
      <td>4546.0</td>
      <td>12484.0</td>
      <td>75</td>
      <td>92</td>
    </tr>
  </tbody>
</table>
<p>93 rows × 7 columns</p>
</div>
      <button class="colab-df-convert" onclick="convertToInteractive('df-4d159952-ab10-4a46-b271-36d6f455e32b')"
              title="Convert this dataframe to an interactive table."
              style="display:none;">

  <svg xmlns="http://www.w3.org/2000/svg" height="24px"viewBox="0 0 24 24"
       width="24px">
    <path d="M0 0h24v24H0V0z" fill="none"/>
    <path d="M18.56 5.44l.94 2.06.94-2.06 2.06-.94-2.06-.94-.94-2.06-.94 2.06-2.06.94zm-11 1L8.5 8.5l.94-2.06 2.06-.94-2.06-.94L8.5 2.5l-.94 2.06-2.06.94zm10 10l.94 2.06.94-2.06 2.06-.94-2.06-.94-.94-2.06-.94 2.06-2.06.94z"/><path d="M17.41 7.96l-1.37-1.37c-.4-.4-.92-.59-1.43-.59-.52 0-1.04.2-1.43.59L10.3 9.45l-7.72 7.72c-.78.78-.78 2.05 0 2.83L4 21.41c.39.39.9.59 1.41.59.51 0 1.02-.2 1.41-.59l7.78-7.78 2.81-2.81c.8-.78.8-2.07 0-2.86zM5.41 20L4 18.59l7.72-7.72 1.47 1.35L5.41 20z"/>
  </svg>
      </button>

  <style>
    .colab-df-container {
      display:flex;
      flex-wrap:wrap;
      gap: 12px;
    }

    .colab-df-convert {
      background-color: #E8F0FE;
      border: none;
      border-radius: 50%;
      cursor: pointer;
      display: none;
      fill: #1967D2;
      height: 32px;
      padding: 0 0 0 0;
      width: 32px;
    }

    .colab-df-convert:hover {
      background-color: #E2EBFA;
      box-shadow: 0px 1px 2px rgba(60, 64, 67, 0.3), 0px 1px 3px 1px rgba(60, 64, 67, 0.15);
      fill: #174EA6;
    }

    [theme=dark] .colab-df-convert {
      background-color: #3B4455;
      fill: #D2E3FC;
    }

    [theme=dark] .colab-df-convert:hover {
      background-color: #434B5C;
      box-shadow: 0px 1px 3px 1px rgba(0, 0, 0, 0.15);
      filter: drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.3));
      fill: #FFFFFF;
    }
  </style>

      <script>
        const buttonEl =
          document.querySelector('#df-4d159952-ab10-4a46-b271-36d6f455e32b button.colab-df-convert');
        buttonEl.style.display =
          google.colab.kernel.accessAllowed ? 'block' : 'none';

        async function convertToInteractive(key) {
          const element = document.querySelector('#df-4d159952-ab10-4a46-b271-36d6f455e32b');
          const dataTable =
            await google.colab.kernel.invokeFunction('convertToInteractive',
                                                     [key], {});
          if (!dataTable) return;

          const docLinkHtml = 'Like what you see? Visit the ' +
            '<a target="_blank" href=https://colab.research.google.com/notebooks/data_table.ipynb>data table notebook</a>'
            + ' to learn more about interactive tables.';
          element.innerHTML = '';
          dataTable['output_type'] = 'display_data';
          await google.colab.output.renderOutput(dataTable, element);
          const docLink = document.createElement('div');
          docLink.innerHTML = docLinkHtml;
          element.appendChild(docLink);
        }
      </script>
    </div>
  </div>





```python
#make application_df
application_df = merged_df[['Applications', 'Accept', 'Enroll']].copy()
#calculate the acceptance_rate
application_df['acceptance_rate'] = round(application_df['Accept'] / application_df['Applications'], 2)*100
#add the foreign key college_id from colleges_df to application_df
application_df['college_id'] = colleges_df['college_id'].values
#sort dataframe for applications
application_df = application_df.sort_values(by=['Applications'], ascending=False)
#reset index
application_df = application_df.reset_index(drop=True)
#make foreign key application_id
application_df['application_id'] = pd.factorize(application_df['Enroll'])[0].astype(str)
application_df
```





  <div id="df-814249b1-68d8-4e35-b8ef-851e87d53a04">
    <div class="colab-df-container">
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
      <th>Applications</th>
      <th>Accept</th>
      <th>Enroll</th>
      <th>acceptance_rate</th>
      <th>college_id</th>
      <th>application_id</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>20192.0</td>
      <td>13007.0</td>
      <td>3810.0</td>
      <td>64.0</td>
      <td>20</td>
      <td>0</td>
    </tr>
    <tr>
      <th>1</th>
      <td>18114.0</td>
      <td>15096.0</td>
      <td>6180.0</td>
      <td>83.0</td>
      <td>28</td>
      <td>1</td>
    </tr>
    <tr>
      <th>2</th>
      <td>15849.0</td>
      <td>5384.0</td>
      <td>2678.0</td>
      <td>34.0</td>
      <td>24</td>
      <td>2</td>
    </tr>
    <tr>
      <th>3</th>
      <td>14752.0</td>
      <td>9572.0</td>
      <td>5329.0</td>
      <td>65.0</td>
      <td>10</td>
      <td>3</td>
    </tr>
    <tr>
      <th>4</th>
      <td>14596.0</td>
      <td>5985.0</td>
      <td>3331.0</td>
      <td>41.0</td>
      <td>12</td>
      <td>4</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>88</th>
      <td>1947.0</td>
      <td>1580.0</td>
      <td>523.0</td>
      <td>81.0</td>
      <td>87</td>
      <td>88</td>
    </tr>
    <tr>
      <th>89</th>
      <td>1879.0</td>
      <td>1216.0</td>
      <td>483.0</td>
      <td>65.0</td>
      <td>78</td>
      <td>89</td>
    </tr>
    <tr>
      <th>90</th>
      <td>1797.0</td>
      <td>1260.0</td>
      <td>938.0</td>
      <td>70.0</td>
      <td>32</td>
      <td>90</td>
    </tr>
    <tr>
      <th>91</th>
      <td>1756.0</td>
      <td>1360.0</td>
      <td>478.0</td>
      <td>77.0</td>
      <td>68</td>
      <td>91</td>
    </tr>
    <tr>
      <th>92</th>
      <td>528.0</td>
      <td>403.0</td>
      <td>186.0</td>
      <td>76.0</td>
      <td>59</td>
      <td>92</td>
    </tr>
  </tbody>
</table>
<p>93 rows × 6 columns</p>
</div>
      <button class="colab-df-convert" onclick="convertToInteractive('df-814249b1-68d8-4e35-b8ef-851e87d53a04')"
              title="Convert this dataframe to an interactive table."
              style="display:none;">

  <svg xmlns="http://www.w3.org/2000/svg" height="24px"viewBox="0 0 24 24"
       width="24px">
    <path d="M0 0h24v24H0V0z" fill="none"/>
    <path d="M18.56 5.44l.94 2.06.94-2.06 2.06-.94-2.06-.94-.94-2.06-.94 2.06-2.06.94zm-11 1L8.5 8.5l.94-2.06 2.06-.94-2.06-.94L8.5 2.5l-.94 2.06-2.06.94zm10 10l.94 2.06.94-2.06 2.06-.94-2.06-.94-.94-2.06-.94 2.06-2.06.94z"/><path d="M17.41 7.96l-1.37-1.37c-.4-.4-.92-.59-1.43-.59-.52 0-1.04.2-1.43.59L10.3 9.45l-7.72 7.72c-.78.78-.78 2.05 0 2.83L4 21.41c.39.39.9.59 1.41.59.51 0 1.02-.2 1.41-.59l7.78-7.78 2.81-2.81c.8-.78.8-2.07 0-2.86zM5.41 20L4 18.59l7.72-7.72 1.47 1.35L5.41 20z"/>
  </svg>
      </button>

  <style>
    .colab-df-container {
      display:flex;
      flex-wrap:wrap;
      gap: 12px;
    }

    .colab-df-convert {
      background-color: #E8F0FE;
      border: none;
      border-radius: 50%;
      cursor: pointer;
      display: none;
      fill: #1967D2;
      height: 32px;
      padding: 0 0 0 0;
      width: 32px;
    }

    .colab-df-convert:hover {
      background-color: #E2EBFA;
      box-shadow: 0px 1px 2px rgba(60, 64, 67, 0.3), 0px 1px 3px 1px rgba(60, 64, 67, 0.15);
      fill: #174EA6;
    }

    [theme=dark] .colab-df-convert {
      background-color: #3B4455;
      fill: #D2E3FC;
    }

    [theme=dark] .colab-df-convert:hover {
      background-color: #434B5C;
      box-shadow: 0px 1px 3px 1px rgba(0, 0, 0, 0.15);
      filter: drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.3));
      fill: #FFFFFF;
    }
  </style>

      <script>
        const buttonEl =
          document.querySelector('#df-814249b1-68d8-4e35-b8ef-851e87d53a04 button.colab-df-convert');
        buttonEl.style.display =
          google.colab.kernel.accessAllowed ? 'block' : 'none';

        async function convertToInteractive(key) {
          const element = document.querySelector('#df-814249b1-68d8-4e35-b8ef-851e87d53a04');
          const dataTable =
            await google.colab.kernel.invokeFunction('convertToInteractive',
                                                     [key], {});
          if (!dataTable) return;

          const docLinkHtml = 'Like what you see? Visit the ' +
            '<a target="_blank" href=https://colab.research.google.com/notebooks/data_table.ipynb>data table notebook</a>'
            + ' to learn more about interactive tables.';
          element.innerHTML = '';
          dataTable['output_type'] = 'display_data';
          await google.colab.output.renderOutput(dataTable, element);
          const docLink = document.createElement('div');
          docLink.innerHTML = docLinkHtml;
          element.appendChild(docLink);
        }
      </script>
    </div>
  </div>





```python
#make rankings_df
rankings_df = merged_df[['world_rank', 'score', 'national_rank']].copy()
#add the foreign key college_id from colleges_df to application_df
rankings_df['college_id'] = colleges_df['college_id'].values
#add the foreign key application_id from application_df to rankings_df
rankings_df['application_id'] = application_df['application_id'].values
#sort the rankings_df by world_rank
rankings_df = rankings_df.sort_values(by=['world_rank'], ascending=True)
#reset index
rankings_df = rankings_df.reset_index(drop=True)
#make foreign key ranking_id for world_rank
rankings_df['ranking_id'] = pd.factorize(rankings_df['world_rank'])[0].astype(str)
rankings_df
```





  <div id="df-a03542ff-a6c9-448b-ae7e-4748d6af699f">
    <div class="colab-df-container">
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
      <th>world_rank</th>
      <th>score</th>
      <th>national_rank</th>
      <th>college_id</th>
      <th>application_id</th>
      <th>ranking_id</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1.0</td>
      <td>100.00</td>
      <td>1.0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <th>1</th>
      <td>2.0</td>
      <td>91.67</td>
      <td>2.0</td>
      <td>1</td>
      <td>1</td>
      <td>1</td>
    </tr>
    <tr>
      <th>2</th>
      <td>6.0</td>
      <td>82.50</td>
      <td>5.0</td>
      <td>2</td>
      <td>2</td>
      <td>2</td>
    </tr>
    <tr>
      <th>3</th>
      <td>8.0</td>
      <td>79.14</td>
      <td>6.0</td>
      <td>3</td>
      <td>3</td>
      <td>3</td>
    </tr>
    <tr>
      <th>4</th>
      <td>9.0</td>
      <td>78.86</td>
      <td>7.0</td>
      <td>4</td>
      <td>4</td>
      <td>4</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>88</th>
      <td>864.0</td>
      <td>44.44</td>
      <td>223.0</td>
      <td>88</td>
      <td>88</td>
      <td>88</td>
    </tr>
    <tr>
      <th>89</th>
      <td>867.0</td>
      <td>44.43</td>
      <td>224.0</td>
      <td>89</td>
      <td>89</td>
      <td>89</td>
    </tr>
    <tr>
      <th>90</th>
      <td>874.0</td>
      <td>44.43</td>
      <td>225.0</td>
      <td>90</td>
      <td>90</td>
      <td>90</td>
    </tr>
    <tr>
      <th>91</th>
      <td>913.0</td>
      <td>44.38</td>
      <td>227.0</td>
      <td>91</td>
      <td>91</td>
      <td>91</td>
    </tr>
    <tr>
      <th>92</th>
      <td>969.0</td>
      <td>44.30</td>
      <td>229.0</td>
      <td>92</td>
      <td>92</td>
      <td>92</td>
    </tr>
  </tbody>
</table>
<p>93 rows × 6 columns</p>
</div>
      <button class="colab-df-convert" onclick="convertToInteractive('df-a03542ff-a6c9-448b-ae7e-4748d6af699f')"
              title="Convert this dataframe to an interactive table."
              style="display:none;">

  <svg xmlns="http://www.w3.org/2000/svg" height="24px"viewBox="0 0 24 24"
       width="24px">
    <path d="M0 0h24v24H0V0z" fill="none"/>
    <path d="M18.56 5.44l.94 2.06.94-2.06 2.06-.94-2.06-.94-.94-2.06-.94 2.06-2.06.94zm-11 1L8.5 8.5l.94-2.06 2.06-.94-2.06-.94L8.5 2.5l-.94 2.06-2.06.94zm10 10l.94 2.06.94-2.06 2.06-.94-2.06-.94-.94-2.06-.94 2.06-2.06.94z"/><path d="M17.41 7.96l-1.37-1.37c-.4-.4-.92-.59-1.43-.59-.52 0-1.04.2-1.43.59L10.3 9.45l-7.72 7.72c-.78.78-.78 2.05 0 2.83L4 21.41c.39.39.9.59 1.41.59.51 0 1.02-.2 1.41-.59l7.78-7.78 2.81-2.81c.8-.78.8-2.07 0-2.86zM5.41 20L4 18.59l7.72-7.72 1.47 1.35L5.41 20z"/>
  </svg>
      </button>

  <style>
    .colab-df-container {
      display:flex;
      flex-wrap:wrap;
      gap: 12px;
    }

    .colab-df-convert {
      background-color: #E8F0FE;
      border: none;
      border-radius: 50%;
      cursor: pointer;
      display: none;
      fill: #1967D2;
      height: 32px;
      padding: 0 0 0 0;
      width: 32px;
    }

    .colab-df-convert:hover {
      background-color: #E2EBFA;
      box-shadow: 0px 1px 2px rgba(60, 64, 67, 0.3), 0px 1px 3px 1px rgba(60, 64, 67, 0.15);
      fill: #174EA6;
    }

    [theme=dark] .colab-df-convert {
      background-color: #3B4455;
      fill: #D2E3FC;
    }

    [theme=dark] .colab-df-convert:hover {
      background-color: #434B5C;
      box-shadow: 0px 1px 3px 1px rgba(0, 0, 0, 0.15);
      filter: drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.3));
      fill: #FFFFFF;
    }
  </style>

      <script>
        const buttonEl =
          document.querySelector('#df-a03542ff-a6c9-448b-ae7e-4748d6af699f button.colab-df-convert');
        buttonEl.style.display =
          google.colab.kernel.accessAllowed ? 'block' : 'none';

        async function convertToInteractive(key) {
          const element = document.querySelector('#df-a03542ff-a6c9-448b-ae7e-4748d6af699f');
          const dataTable =
            await google.colab.kernel.invokeFunction('convertToInteractive',
                                                     [key], {});
          if (!dataTable) return;

          const docLinkHtml = 'Like what you see? Visit the ' +
            '<a target="_blank" href=https://colab.research.google.com/notebooks/data_table.ipynb>data table notebook</a>'
            + ' to learn more about interactive tables.';
          element.innerHTML = '';
          dataTable['output_type'] = 'display_data';
          await google.colab.output.renderOutput(dataTable, element);
          const docLink = document.createElement('div');
          docLink.innerHTML = docLinkHtml;
          element.appendChild(docLink);
        }
      </script>
    </div>
  </div>




## Load

load influence_df, colleges_df, tuitions_df, application_df, rankings_df to sql




```python
def get_conn_cur(): # define function name and arguments (there aren't any)
  # Make a connection
  conn = psycopg2.connect(
    host="final-db.chokchf2fd2l.us-east-1.rds.amazonaws.com",
    database="hw_final",
    user="postgres",
    password="my_passowrd",
    port='5432')

  cur = conn.cursor()   # Make a cursor after

  return(conn, cur)   # Return both the connection and the cursor
conn, cur = get_conn_cur()
conn
```




    <connection object at 0x7f3b53c1a410; dsn: 'user=postgres password=xxx dbname=hw_final host=final-db.chokchf2fd2l.us-east-1.rds.amazonaws.com port=5432', closed: 0>




```python
def run_query(query_string):

  conn, cur = get_conn_cur() # get connection and cursor

  cur.execute(query_string) # executing string as before

  my_data = cur.fetchall() # fetch query data as before

  # here we're extracting the 0th element for each item in cur.description
  colnames = [desc[0] for desc in cur.description]

  cur.close() # close
  conn.close() # close

  return(colnames, my_data) # return column names AND data

# Column name function for checking out what's in a table
def get_column_names(table_name): # arguement of table_name
  conn, cur = get_conn_cur() # get connection and cursor

  # Now select column names while inserting the table name into the WERE
  column_name_query =  """SELECT column_name FROM information_schema.columns
       WHERE table_name = '%s' """ %table_name

  cur.execute(column_name_query) # exectue
  my_data = cur.fetchall() # store

  cur.close() # close
  conn.close() # close

  return(my_data) # return

# Check table_names
def get_table_names():
  conn, cur = get_conn_cur() # get connection and cursor

  # query to get table names
  table_name_query = """SELECT table_name FROM information_schema.tables
       WHERE table_schema = 'public' """

  cur.execute(table_name_query) # execute
  my_data = cur.fetchall() # fetch results

  cur.close() #close cursor
  conn.close() # close connection

  return(my_data) # return your fetched results

def sql_head(table_name):
  conn, cur = get_conn_cur()
  column_name_query =  """SELECT column_name FROM information_schema.columns
       WHERE table_name = '%s' """ %table_name

  cur.execute(column_name_query)
  my_data = cur.fetchall()

  cur.close()
  conn.close()

  return(my_data)
```


```python
# Drop table
# *** Only run this code if you've already created your table and want to delete it to start from scratch again. 
#     Note that I'll be running this when I grade your assignments
conn, cur = get_conn_cur()
table_name = 'influence' # what table to drop
drop_table_statement = "DROP TABLE %s;"%table_name # make your statement
cur.execute(drop_table_statement) # execute it
conn.commit()
cur.close() # close your cursor
```


```python
#create influence table
conn, cur = get_conn_cur()
tq = """CREATE TABLE influence (
          publications INTEGER NOT NULL,
          influence INTEGER NOT NULL,
          citations INTEGER NOT NULL,
          broad_impact INTEGER NOT NULL,
          patents INTEGER NOT NULL,
          PhD INTEGER NOT NULL,
          total_influence INTEGER NOT NULL,
          influence_id INT PRIMARY KEY
          );"""
cur.execute(tq)
conn.commit()
```


```python
#insert the information from influence_df to influence table
influence_tups = [tuple(x) for x in influence_df.to_numpy()]
iq = """INSERT INTO influence (publications, influence, citations, broad_impact, patents, PhD, total_influence, influence_id) VALUES(%s, %s, %s, %s, %s, %s, %s, %s);"""
conn, cur = get_conn_cur()
cur.executemany(iq, influence_tups)
conn.commit()
conn.close()
```


```python
#check the table
sq = """ SELECT * FROM influence LIMIT 5;"""
run_query(sq)
```




    (['publications',
      'influence',
      'citations',
      'broad_impact',
      'patents',
      'phd',
      'total_influence',
      'influence_id'],
     [(1, 1, 1, 0, 5, 97, 105, 0),
      (12, 4, 4, 0, 1, 99, 120, 1),
      (53, 33, 26, 0, 101, 91, 304, 2),
      (14, 6, 15, 0, 66, 96, 197, 3),
      (13, 12, 14, 0, 5, 97, 141, 4)])




```python
# Drop table
# *** Only run this code if you've already created your table and want to delete it to start from scratch again. 
#     Note that I'll be running this when I grade your assignments
conn, cur = get_conn_cur()
table_name = 'college' # what table to drop
drop_table_statement = "DROP TABLE %s;"%table_name # make your statement
cur.execute(drop_table_statement) # execute it
conn.commit()
cur.close() # close your cursor
```


```python
#create college table
conn, cur = get_conn_cur()
tq = """CREATE TABLE college (
          college_names VARCHAR(255) NOT NULL, 
          Private VARCHAR(255) NOT NULL,
          college_id INT PRIMARY KEY,
          influence_id INT
          );"""
cur.execute(tq)
conn.commit()
```


```python
#insert the information from colleges_df to college table
college_tups = [tuple(x) for x in colleges_df.to_numpy()]
iq = """INSERT INTO college (college_names, Private, college_id, influence_id) VALUES(%s, %s, %s, %s);"""
conn, cur = get_conn_cur()
cur.executemany(iq, college_tups)
conn.commit()
conn.close()
```


```python
#check table
sq = """ SELECT * FROM college LIMIT 5;"""
run_query(sq)
```




    (['college_names', 'private', 'college_id', 'influence_id'],
     [('Harvard University', 'Yes', 0, 0),
      ('Massachusetts Institute of Technology', 'Yes', 1, 1),
      ('Princeton University', 'Yes', 2, 2),
      ('Yale University', 'Yes', 3, 3),
      ('Columbia University', 'Yes', 4, 4)])




```python
# Drop table
# *** Only run this code if you've already created your table and want to delete it to start from scratch again. 
#     Note that I'll be running this when I grade your assignments
conn, cur = get_conn_cur()
table_name = 'tuition' # what table to drop
drop_table_statement = "DROP TABLE %s;"%table_name # make your statement
cur.execute(drop_table_statement) # execute it
conn.commit()
cur.close() # close your cursor
```


```python
#create tuition table
conn, cur = get_conn_cur()
tq = """CREATE TABLE tuition (
          Outstate REAL, 
          Room_Board REAL,
          Personal REAL,
          Expend REAL,
          sum_cost REAL,
          college_id INT,
          tuition_id INT PRIMARY KEY
          );"""
cur.execute(tq)
conn.commit()
```


```python
#insert the information from tuitions_df to tuition table
tuition_tups = tuitions_df.to_records(index=False)
for tuitions in tuition_tups:
  query = "INSERT INTO tuition VALUES(%s, %s, %s, %s, %s, %s, %s)"
  cur.execute(query, tuple(tuitions))
cur.close()
conn.commit()
conn.close()
```


```python
#check table
sq = """ SELECT * FROM tuition LIMIT 5;"""
run_query(sq)
```




    (['outstate',
      'room_board',
      'personal',
      'expend',
      'sum_cost',
      'college_id',
      'tuition_id'],
     [(18800.0, 6740.0, 1040.0, 56233.0, 82813.0, 7, 0),
      (19840.0, 6510.0, 2115.0, 40386.0, 68851.0, 3, 1),
      (18485.0, 6410.0, 1920.0, 37219.0, 64034.0, 0, 2),
      (18930.0, 6380.0, 1254.0, 36854.0, 63418.0, 5, 3),
      (13850.0, 4360.0, 1250.0, 41766.0, 61226.0, 31, 4)])




```python
# Drop table
# *** Only run this code if you've already created your table and want to delete it to start from scratch again. 
#     Note that I'll be running this when I grade your assignments
conn, cur = get_conn_cur()
table_name = 'application' # what table to drop
drop_table_statement = "DROP TABLE %s;"%table_name # make your statement
cur.execute(drop_table_statement) # execute it
conn.commit()
cur.close() # close your cursor
```


```python
#create application table
conn, cur = get_conn_cur()
tq = """CREATE TABLE application (
          Applications REAL, 
          Accept REAL,
          Enroll REAL,
          acceptance_rate REAL,
          college_id INT,
          application_id INT PRIMARY KEY
          );"""
cur.execute(tq)
conn.commit()
```


```python
#insert the information from application_df to application table
application_tups = application_df.to_records(index=False)
for applications in application_tups:
  query = "INSERT INTO application VALUES(%s, %s, %s, %s, %s, %s)"
  cur.execute(query, tuple(applications))
cur.close()
conn.commit()
conn.close()
```


```python
#check table
sq = """ SELECT * FROM application LIMIT 5;"""
run_query(sq)
```




    (['applications',
      'accept',
      'enroll',
      'acceptance_rate',
      'college_id',
      'application_id'],
     [(20192.0, 13007.0, 3810.0, 64.0, 20, 0),
      (18114.0, 15096.0, 6180.0, 83.0, 28, 1),
      (15849.0, 5384.0, 2678.0, 34.0, 24, 2),
      (14752.0, 9572.0, 5329.0, 65.0, 10, 3),
      (14596.0, 5985.0, 3331.0, 41.0, 12, 4)])




```python
# Drop table
# *** Only run this code if you've already created your table and want to delete it to start from scratch again. 
#     Note that I'll be running this when I grade your assignments
conn, cur = get_conn_cur()
table_name = 'ranking' # what table to drop
drop_table_statement = "DROP TABLE %s;"%table_name # make your statement
cur.execute(drop_table_statement) # execute it
conn.commit()
cur.close() # close your cursor
```


```python
#create ranking table
conn, cur = get_conn_cur()
tq = """CREATE TABLE ranking (
          world_rank REAL, 
          score REAL,
          national_rank REAL,
          college_id INT,
          application_id INT,
          ranking_id INT PRIMARY KEY
          );"""
cur.execute(tq)
conn.commit()
```


```python
##insert the information from rankings_df to ranking table
ranking_tups = rankings_df.to_records(index=False)
for rankings in ranking_tups:
  query = "INSERT INTO ranking VALUES(%s, %s, %s, %s, %s, %s)"
  cur.execute(query, tuple(rankings))
cur.close()
conn.commit()
conn.close()
```


```python
#check table
sq = """ SELECT * FROM ranking LIMIT 5;"""
run_query(sq)
```




    (['world_rank',
      'score',
      'national_rank',
      'college_id',
      'application_id',
      'ranking_id'],
     [(1.0, 100.0, 1.0, 0, 0, 0),
      (2.0, 91.67, 2.0, 1, 1, 1),
      (6.0, 82.5, 5.0, 2, 2, 2),
      (8.0, 79.14, 6.0, 3, 3, 3),
      (9.0, 78.86, 7.0, 4, 4, 4)])



## Questions:
Examples:

q1: Which top100 US colleges' total cost is less than 30000?

q2: What is the relationship between acceptance rate and score?

q3: What is the relationship between school influence and school type?



```python
query_q1 = ("""SELECT college.college_names, sum_cost,ranking.world_rank FROM tuition 
    INNER JOIN ranking 
    ON tuition.college_id = ranking.college_id
    INNER JOIN college
    ON ranking.college_id = college.college_id
    WHERE ranking.world_rank < 100.0 AND tuition.sum_cost < 30000;""")
run_query(query_q1)
#University of Texas at Austin, University of North Carolina at Chapel Hill, University of Florida, Georgia Institute of Technology
```




    (['college_names', 'sum_cost', 'world_rank'],
     [('University of Texas at Austin', 19416.0, 30.0),
      ('University of North Carolina at Chapel Hill', 29693.0, 36.0),
      ('University of Utah', 23200.0, 38.0),
      ('University of Florida', 27537.0, 55.0),
      ('Georgia Institute of Technology', 23362.0, 87.0)])




```python
query_q2 = ("""SELECT acceptance_rate, score, college_names FROM application 
    INNER JOIN ranking 
    ON application.application_id = ranking.application_id
    INNER JOIN college
    ON ranking.college_id = college.college_id
    LIMIT 30;""")
run_query(query_q2)
#does not exactly follow what people usually think: lower acceptance_rate, higher score
```




    (['acceptance_rate', 'score', 'college_names'],
     [(64.0, 100.0, 'Harvard University'),
      (83.0, 91.67, 'Massachusetts Institute of Technology'),
      (34.0, 82.5, 'Princeton University'),
      (65.0, 79.14, 'Yale University'),
      (41.0, 78.86, 'Columbia University'),
      (73.0, 73.82, 'University of Chicago'),
      (16.0, 73.64, 'University of Pennsylvania'),
      (28.0, 66.94, 'Johns Hopkins University'),
      (53.0, 60.55, 'New York University'),
      (15.0, 58.37, 'Duke University'),
      (26.0, 56.18, 'University of Texas at Austin'),
      (71.0, 54.4, 'Northwestern University'),
      (42.0, 53.09, 'University of North Carolina at Chapel Hill'),
      (42.0, 52.64, 'University of Utah'),
      (69.0, 51.6, 'Carnegie Mellon University'),
      (71.0, 51.38, 'University of Southern California'),
      (75.0, 49.51, 'University of Rochester'),
      (70.0, 48.8, 'University of Florida'),
      (26.0, 48.5, 'Dartmouth College'),
      (75.0, 48.44, 'Vanderbilt University'),
      (67.0, 48.31, 'Boston University'),
      (79.0, 54.25, 'University of Notre Dame'),
      (23.0, 47.91, 'Brown University'),
      (69.0, 46.11, 'Case Western Reserve University'),
      (78.0, 45.47, 'Emory University'),
      (80.0, 45.2, 'University of Virginia'),
      (75.0, 44.71, 'Georgia Institute of Technology'),
      (69.0, 43.89, 'Williams College'),
      (78.0, 50.69, 'Michigan State University'),
      (63.0, 50.28, 'Georgetown University')])




```python
query_q3 = ("""SELECT college_names, total_influence, private FROM influence 
    INNER JOIN college 
    ON influence.influence_id = college.influence_id
    ORDER BY total_influence DESC
    LIMIT 30;""")
run_query(query_q3)
#does not have a strong connection, public school can have great influence, private school may have low influence
```




    (['college_names', 'total_influence', 'private'],
     [('Western Michigan University', 4331, 'No'),
      ('University of Southern Mississippi', 4207, 'No'),
      ('Marquette University', 4192, 'Yes'),
      ('Oakland University', 4133, 'No'),
      ('Clarkson University', 4125, 'Yes'),
      ('University of North Carolina at Greensboro', 3821, 'No'),
      ('Illinois Institute of Technology', 3818, 'Yes'),
      ('University of Dayton', 3812, 'Yes'),
      ('Wesleyan University', 3792, 'Yes'),
      ('Louisiana Tech University', 3773, 'No'),
      ('Bowling Green State University', 3743, 'No'),
      ('University of North Dakota', 3737, 'No'),
      ('Florida Institute of Technology', 3648, 'Yes'),
      ('University of North Carolina at Charlotte', 3461, 'No'),
      ('New Jersey Institute of Technology', 3420, 'No'),
      ('East Carolina University', 3407, 'No'),
      ('Northern Arizona University', 3279, 'No'),
      ('Michigan Technological University', 3240, 'No'),
      ('Southern Methodist University', 3154, 'Yes'),
      ('University of Denver', 3150, 'Yes'),
      ('Mississippi State University', 3103, 'No'),
      ('University of Rhode Island', 2877, 'No'),
      ('Concordia University', 2871, 'Yes'),
      ('Northern Illinois University', 2832, 'No'),
      ('University of Texas at Arlington', 2816, 'No'),
      ('Lehigh University', 2815, 'Yes'),
      ('Creighton University', 2757, 'Yes'),
      ('Loyola University Chicago', 2741, 'Yes'),
      ('College of William and Mary', 2640, 'No'),
      ('Florida International University', 2636, 'No')])


