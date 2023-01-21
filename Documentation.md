# Project Automation

## content

- Data Extraction and Transformation
- Load data to a google sheet
- Scheduling
- Form Generation and Data summary

---

### **Data Exteraction and Transformation**

1- In this part names of artists from the Billboard Artist website will be extracted for the past 4 weeks. each week has 100 artist names and totally it will be 400 names.
the URL related to this website is

> https://www.billboard.com/charts/artist-100/

2- Collected data has to transform as follws:

- Combine the names of the top 5 artists from each of the Artist 100 lists of the past 4 weeks into one list.
- Make sure that every artist is present in the combined list once.
- The artists should be sorted alphabetically.

This two steps have been done in a file named: **ETcelebrities**

In this file a class named **ExtractionTransformation** defined with two method.

1. Method _fourWeekCelebrities_ extracts the four-week artist names and return two dimensional array that is the list of 100 artist nemes for every four week.

   > [ [100 artist names for week 1], [100 artist names for week 2], [100 artist names for week 3], [100 artist names for week 4] ]

   - This method used Beautifulsoup to extract data from the website.
   - The returned list for these 400 artistes is labeled _fourWeekList_

2. Method _top4WeekCelebrities_ transforms data according to the three requiered conditions of data transforming part.
   - The transformed data is returned with the name of _topFives_

---

### **Load data to a google sheet**

#### **_To load the transformed data we have to do as follows_**:

1. Create a google cloud project: to to this we have to go to the relate [web page](https://console.cloud.google.com/projectcreate) and follow the steps. My project name is **googleSheetReadWright**.
2. Enable the API: From the section **API & Services/Library** the **Google Sheets API** has to be enabled.
3. Authorize credentials for a desktop application:
   1. In the Google Cloud console, go to Menu menu > APIs & Services > Credentials.
   2. Click Create Credentials > OAuth client ID
   3. Click Application type > Desktop app.
   4. In the Name field, type a name for the credential.
   5. Click Create.
   6. Click OK. The newly created credential appears under OAuth 2.0 Client IDs.
   7. Save the downloaded JSON file, and move the file to your working directory. In my project the name is credentials.json
4. Install the Google client library by executing this command in the command line:

   > pip install --upgrade google-api-python-client google-auth-httplib2 google-auth-oauthlib

5. Configure the sample by the file named **Google.py** that is in the working directory and run it by this command:
   - python Google.py
6. Give the neccessary accesses by clicking on "**Accept**"

**_After doing these steps we can create googlesheet and load our data to it._**
In my project these steps are don by the file **LoadToGsheet.py.** This file consists of a class named "Load" whit two methods. One is for creating google sheet and the other is for importing data to the created google sheet.

1. Method "sheetCreator": This method creates a google sheet by using the service that is created in the body of class. This method creates a sheet whith the name of "_Billboard Celebrities_" and the worksheet with the name of "celebrity list" in it.
   This method also store the charecteristics of the sheet in a **Json** format in a file named "_sheetSpecification_" for further usage.
2. Method "ExporteDataToSheet": By getting the list of artists and sheet specification imports data to the related sheet. This method gets data(list of artists) as an input argument and reads sheet specification from the file that is created by "sheetCreator" method.

**_And finally the file labled "ETL.py"_** is in charge of running all steps for Data Extraction, Transformation, and Load.

---

### _Scheduling_

The above processes should be scheduled to run once a month. To fulfille this requirement we have to schedule ETL.py. The Crontab tool is used to schedule this program, which is often run on a server running Linux.

- Write this commands to schedule the file to be run once a month:
  > 0 0 1 \* \* python3 the address of python code/ETL.py
  >
  > crontab -e

---

### _Form Generation and Data summary_

In this part we have to accomplish two steps:

- Create a Google Apps Script that generates a Google Form that lists all artists from the uploaded Google Sheet, and allows users to rate each of them on a one-to-five scale

- Create a Google Apps Script that calculates the average rating of each artist from the form responses, and inserts the rating averages next to the artists’ names in the uploaded Google Sheet

to do this we have to

1. copy the codes from the file "_AppScript.gs.js_" and past to the created sheet(Billboard Celebrities) Extentions/Apps script.
2. After doing the previous part it is just needed to run the script and give the neccesary premissions.
   - the triggers are written in a way that by every change on the sheet a form will be created and with every submit on the form the average is calculated and inserted to the excell sheet.
   - codes are written in a way that voting to every artists are **not mandatory**
