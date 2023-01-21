from Google import Create_Service 
from ETcelebrities import *
import json
from datetime import date


class Load:
    clientSecretFile = 'credentials.json'
    apiName = 'sheets'
    apiVersion = 'v4'
    scops = ["https://www.googleapis.com/auth/spreadsheets"]
    service = Create_Service(clientSecretFile, apiName, apiVersion, scops) 
  
    
    def sheetCreator(self):
        
        sheet_body = {
            'properties': { 'title' : 'Billboard Celebrities'},
            'sheets':
            [{'properties': {'title':'celebrity list' }}]
            }

        exportSheet = self.service.spreadsheets().create(body = sheet_body).execute()
        
        sheetSpec = {
            'sheetUrl': exportSheet['spreadsheetUrl'],
            'sheetID': exportSheet['spreadsheetId'],
            'workSheetName': exportSheet['sheets'][0]['properties']['title']+'!'
        }
        jsnObj = json.dumps(sheetSpec)
        with open('sheetSpecification.json', 'w') as outfile:
            outfile.write(jsnObj)
        

    def ExporteDataToSheet(self, celebrity):
        with open('sheetSpecification.json', 'r') as openfile:
            sheet = json.load(openfile) 
        self.spreadsheet_id  = sheet['sheetID'] 
        self.range_ = sheet['workSheetName'] + 'A1'
        exportDate = str(date.today())
        self.valueRangeBody = {
            'majorDimension': 'ROWS',
            'values': [['Date: ', 'Top Celebrities: '],[exportDate]+celebrity,]
        }
        self.service.spreadsheets().values().append(spreadsheetId=self.spreadsheet_id, 
                                                range=self.range_, 
                                                valueInputOption='USER_ENTERED', 
                                                body=self.valueRangeBody).execute()                                        
        print('*****************************************************************************')
        print(sheet['sheetUrl'])
        print('*****************************************************************************')
