function celebritiesSurvey(){
  var celebritySpreadSheet = SpreadsheetApp.openById(getActiveID('Billboard Celebrities'));
  var existedTriggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < existedTriggers.length; i++) {
    ScriptApp.deleteTrigger(existedTriggers[i]);
  }

  ScriptApp.newTrigger("createSurveyQuestionaires")
    .forSpreadsheet(celebritySpreadSheet.getId())
    .onChange()
    .create();       
}

function createSurveyQuestionaires() {
  var celebritySpreadSheet = SpreadsheetApp.openById(getActiveID('Billboard Celebrities'));
  var celebrityWorkSheet = celebritySpreadSheet.getSheetByName('celebrity list');
  var values = celebrityWorkSheet.getDataRange().getValues();
  var celebrityList = values[1];
  celebrityList.shift();
  var form = FormApp.create('Rating Form');
  form.addGridItem()
    .setTitle('Rate celebrities from 1 to 5')
    .setRows(celebrityList)
    .setColumns(['1', '2', '3', '4', '5']);
  Logger.log('Published URL: ' + form.getPublishedUrl());
  Logger.log('Editor URL: ' + form.getEditUrl());
  
  ScriptApp.newTrigger("submitAverageRate")
  .forForm(form.getId())
  .onFormSubmit()
  .create();
}

function submitAverageRate(){
  rates = avgCalculation()
  averageRates = ['Average Rate'].concat(rates)
  var ss = SpreadsheetApp.openById(getActiveID('Billboard Celebrities'));
  var sheet = ss.getSheetByName("celebrity list");
  var lastRow = sheet.getLastRow()
  if (sheet.getRange(lastRow,1).getValue() == 'Average Rate'){
    for(var i = 1; i <= averageRates.length; i++ ){
      sheet.getRange(lastRow,i).setValue(averageRates[i-1]);
    }
  }
  else {
    for(var i = 1; i <= averageRates.length; i++ ){
    sheet.getRange(lastRow+1,i).setValue(averageRates[i-1]);  
  }
  } 
}

function extractFormsResults(){
  allFormResults = [];
  var form = FormApp.openById(getActiveID('Rating Form'));
  var formResponses = form.getResponses();
  for (var i = 0; i < formResponses.length; i++) {
    var formResponse = formResponses[i];
    var itemResponses = formResponse.getItemResponses();
    for (var j = 0; j < itemResponses.length; j++) {
      var itemResponse = itemResponses[j];
      allFormResults.push(itemResponse.getResponse())
    }
  }
return allFormResults;
} 
    
function avgCalculation() {
  var matrix = extractFormsResults();
  var numOfCelebrities = matrix[0].length 
  var numOfResponse = matrix.length
  var rateAvgList = [];
  Logger.log(matrix)
  for (var i = 0; i < numOfCelebrities; i++){
    var rateSum = 0;
    var rateCount = 0;
    for (var j = 0; j < numOfResponse; j++){
      if (matrix[j][i] != null){
        Logger.log(matrix[j][i])
        rateCount = rateCount + 1;
        rateSum = rateSum + parseInt(matrix[j][i], 10);
        Logger.log(rateCount)
        Logger.log(rateSum)
      }
    } 
    if (rateCount != 0){
      rateAvgList.push(rateSum/rateCount);
    }
    else {
      rateAvgList.push(0);
    } 
    
  }
  return rateAvgList;  
}

function getActiveID(fileName){
  var allFiles = DriveApp.getFiles();
  var fileID = "";
  while (allFiles.hasNext()) {
    var file = allFiles.next();
    if (file.getName() == fileName) fileID = file.getId();
    }  
  return fileID;
  }
  
