from ETcelebrities import *
from LoadToGsheet import *
import os

et = ExtractionTransformation()
extractedData = et.top4WeekCelebrities()

etl = Load()

if not os.path.exists('sheetSpecification.json'):
    etl.sheetCreator()     

etl.ExporteDataToSheet(extractedData)