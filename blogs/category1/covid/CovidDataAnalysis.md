---
title: Covid Data Analysis project
date: 2021-04-16
tags:
 - Covid
categories: 
 - Data Analysis
---


<!-- more -->

## ISTA131 Final project
This project contains 12 different functions to make 6 different graphs about the COVID 19 in Idaho <br>
[Source](https://covid.cdc.gov/covid-data-tracker/#trends_dailydeaths)

<br> Columns: State, Date, New Deaths, 7-Day Moving Avg, Current Hospitalized COVID-19 Patients

#### Import modules
```python
import pandas as pd, numpy as np, matplotlib.pyplot as plt
import matplotlib.dates as mdates
import datetime
import datetime as dt
```

#### This function is to get the dataframe from the csv file : data_table_for_daily_death_trends__idaho.csv
```python
def get_df():
    fname = "data_table_for_daily_death_trends__idaho.csv"
    df = pd.read_csv(fname,sep=',', skiprows = 2, engine='python')
    del df["State"]
    df["Dates"] = np.nan
    def date_convert(date_to_convert):
        return datetime.datetime.strptime(date_to_convert, '%b %d %Y').strftime('%m/%d/%Y')
    df['Dates'] = df['Date'].apply(date_convert)
    del df["Date"]
    return df
```


#### This function is to get all of the dates from the Dates column
```python
def get_date_lst():
    df = get_df()
    lst_dates = []
    for i in df['Dates']:
        lst_dates.append(i)
    return lst_dates
```

#### This function is to make a line graph with x axis of Dates and y axis of Current Hospitalized COVID-19 Patients.
```python
def fig1():
    df = get_df()
    lst_dates = get_date_lst()
    x = [dt.datetime.strptime(d,'%m/%d/%Y').date() for d in lst_dates]
    plt.gca().xaxis.set_major_formatter(mdates.DateFormatter('%m/%d/%Y'))
    plt.gca().xaxis.set_major_locator(mdates.DayLocator(interval=50))
    
    plt.plot(x,df['Current Hospitalized COVID-19 Patients'])
    plt.gcf().autofmt_xdate()
    plt.xlabel("Dates")
    plt.ylabel("Current Hospitalized COVID-19 Patients")
    plt.suptitle('Figure 1', fontsize=16)
```

#### This function is to make a bar chart with x axis of Dates and y axis of New Deaths
```python
def fig2():
    df = get_df()
    lst_dates = get_date_lst()
    plt.figure(figsize=(10,10))
    plt.style.use('ggplot')
    lst_dates = []
    for i in df['Dates']:
        lst_dates.append(i)
    x = [dt.datetime.strptime(d,'%m/%d/%Y').date() for d in lst_dates]
    lst = []
    for i in df['New Deaths']:
        lst.append(i)
    x_pos = [i for i, _ in enumerate(x)]
    plt.bar(x,lst,width=0.8, color='darkviolet')
    plt.xlabel("Dates")
    plt.ylabel("New Deaths")
    plt.suptitle('Figure 2', fontsize=16)
```

#### This function is to make a scatter plot with x axis of Dates and y axis of 7-Day Moving Avg
```python
def fig3():
    df = get_df()
    plt.figure(figsize=(16,10), dpi= 80)
    lst_dates = get_date_lst()
    lst = []
    for i in df["7-Day Moving Avg"]:
        lst.append(i)
    int_lst = []
    for i in range(len(lst_dates)):
        int_lst.append(i)
    x = np.array(lst_dates)
    y = np.array(lst)
    x1 = np.array(int_lst)
    m, b = np.polyfit(x1, y, 1)
    plt.plot(x, m*x1 + b)
    plt.scatter(x, y)
    plt.gca().xaxis.set_major_locator(mdates.DayLocator(interval=50))
    plt.xlabel("Dates")
    plt.ylabel("7-Day Moving Avg")
    plt.gca().invert_xaxis()
    plt.suptitle('Figure 3', fontsize=16)
```

#### Main function 1
```python
def main():   
    fig1()
    fig2()
    fig3()
    plt.show()
main()   
```

#### This function is to get two dataframes from the csv file; df: data_table_for_daily_case_trends__idaho1.csv; df2:data_table_for_daily_death_trends__idaho2.csv
```python
def csv(file):
    df = pd.read_csv(file, sep = ",", skiprows = 2)
    df2 = pd.read_csv("data_table_for_daily_death_trends__idaho2.csv", sep = "," , skiprows = 2)
    df["New Deaths"] = df2["New Deaths"]
    df["Doses Per Day"] = 0
    df["Dates"] = df["Date"].replace({"Jan":"01", "Feb":"02","Mar":"03","Apr":"04","May":"05","Jun":"06","Jul":"07","Aug":"08","Sep":"09","Oct":"10","Nov":"11","Dec":"12"}, regex = True)
    df["Total Doses Administered"] = df["Total Doses Administered"].fillna(0)
    for i in range(1, len(df["Total Doses Administered"])-1):
        a = pd.to_numeric(df["Total Doses Administered"])
        df.loc[i-1,"Doses Per Day"] = abs((int(a.iloc[i-1]) - int(a.iloc[i])))
        a.append(df["Doses Per Day"])

    df.drop(labels = [0], axis = 0)
    df.drop([0, 1, 2], axis = 0,inplace = True)
    del df["7-Day Moving Avg"]
    del df["State"]
    return df
```

#### This function is to delete the dates that don't have dose
```python
def clean_dose():
    df = csv("data_table_for_daily_case_trends__idaho1.csv")
    for i in range(626,670):
        df = df.drop(index=i)
    return df
```

#### This function is to make a line graph with x axis of Dates and y axis of New cases
```python
def fig4():
    df = csv("data_table_for_daily_case_trends__idaho1.csv")
    x = [dt.datetime.strptime(d,'%m %d %Y').date() for d in df["Dates"]]
    plt.gca().xaxis.set_major_formatter(mdates.DateFormatter('%m %d %Y'))
    plt.gca().xaxis.set_major_locator(mdates.DayLocator(interval=50))
    plt.plot(x,df['New Cases'])
    plt.gcf().autofmt_xdate()
    plt.xlabel("Dates")
    plt.ylabel("New Cases")
    plt.suptitle('Figure 4', fontsize=16)
```

#### This function is to make a bar chart with x axis of Dates and y axis of Doses Per Day 
```python
def fig5():
    df = clean_dose()
    plt.figure(figsize=(16,10), dpi= 80)
    lst = []
    for i in df["Doses Per Day"]:
        lst.append(i)
    x = np.array(df["Dates"])
    y = np.array(lst)
    plt.gca().xaxis.set_major_locator(mdates.DayLocator(interval=50))
    plt.bar(x,lst,width=0.8, color='navy')
    plt.xlabel("Dates")
    plt.ylabel("Doses Per Day")
    plt.gca().invert_xaxis()
    plt.suptitle('Figure 5', fontsize=16)
```

#### Main function 2
```python
def main2():
    fig4()
    fig5()
    plt.show()
main2()
```
[md-enhance]: https://vuepress-theme-hope.github.io/v2/md-enhance/zh/
