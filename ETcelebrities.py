
from bs4 import BeautifulSoup
import requests
from datetime import date, timedelta

class ExtractionTransformation:
    url = 'https://www.billboard.com/charts/artist-100/'
    currentWeek = date.today() + timedelta(days = -date.today().weekday() + 5)
    timePeriod = [currentWeek]
    for i in range(1,4):
        timePeriod.append(currentWeek - timedelta(days= +(i*7)))
 
    def fourWeekCelebrities(self):
        self.fourWeekList = []
        for week in self.timePeriod:
            self.weekList = []
            page = requests.get(self.url+str(week))
            soup = BeautifulSoup(page.content, 'html.parser')
            celtySections = soup.find_all('div', class_ = 'o-chart-results-list-row-container')
            for section in celtySections:
                celebrity = section.find('h3')
                self.weekList.append(celebrity.text.strip())
            self.fourWeekList.append(self.weekList)
        return self.fourWeekList    

    def top4WeekCelebrities(self):
        self.fourWeek = self.fourWeekCelebrities() 
        self.topFives = []
        for weeks in self.fourWeek:
            for celebrity in weeks[0:5]:
                if not celebrity in self.topFives:
                    self.topFives.append(celebrity)
        self.topFives = sorted(self.topFives)
        return self.topFives
           
        
    
