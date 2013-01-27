var data;
var dataSpan;
var preCalcData;
var loreNames;
var armorNames;
var survivalNames;
var weaponNames;
var masteryNames = [];
var magicNames;
var rowstyle;

function drawTable(circleFirst, circleSecond) {
 var tableArea = document.getElementById('tableArea');

    circleFirst = parseInt(circleFirst);
    circleSecond = parseInt(circleSecond);
 rowstyle = 1;
    if ((circleSecond - circleFirst) > 50) {
        tableArea.innerHTML = "You cannot display more than 50 circles at a time";
        return;
    }
    if (circleFirst < 2 || isNaN(circleFirst))
        circleFirst = 2;
    if (circleFirst > circleSecond || isNaN(circleSecond))
        circleSecond = circleFirst;
    string = "<table id='circletable'>";
    for(circle = circleFirst; circle <= circleSecond; circle++) {
        if (circle % 10 == 0 || circle == circleFirst) {
            string += "<tr class='heading'><td>Circle</td>";
            for(i = 0; i < data.length; i++)
                string += "<td>" + data[i][0] + "</td>";
            string += "</tr>";
        }
        string += "<tr class='" + rowstyle +"'><td class='circle'>" + circle + "</td>";
        for(i = 0; i < data.length; i++) {
            string += "<td>" + circleAmount(circle, i) + "</td>";
        }
        string += "</tr>";
     if(rowstyle == 1){
         rowstyle = 0;
     }
     else{
         rowstyle= 1;
     }
    }
    string += "</table>";
    tableArea.innerHTML = string;
}

function circleAmount(circle, index) {
 for (spanIndex = dataSpan.length - 1; spanIndex >= 0; spanIndex--)
     if (dataSpan[spanIndex] < circle)
         return Math.floor(preCalcData[index][spanIndex] + data[index][spanIndex + 1] * (circle - dataSpan[spanIndex]));
 return 0;
}

function circleAllowed(skill, index) {
    for (spanIndex = dataSpan.length - 1; spanIndex >= 0; spanIndex--)
        if (preCalcData[index][spanIndex] <= skill) {
            circle = (dataSpan[spanIndex] + Math.floor((skill - preCalcData[index][spanIndex]) / data[index][spanIndex + 1]));
         if (circleAmount(circle + 1, index) == skill)
             circle++;
         nextCircleAmount = circleAmount(circle + 1, index) - skill;
         return circle + " " + nextCircleAmount;
        }
    return 0;
}

function populateList() {
 for(i = 0; i < data.length; i++)
     document.write("<option>" + data[i][0] + "</option>");
}


function clearForm() {
 document.getElementsByName("rank").value = "";
 document.getElementById('rankArea').innerHTML = "";
}


function calcCircle(number) {
    index = document.getElementsByName("list")[0].selectedIndex;
    reg = /(\d*) (\d*)/;
 reg.exec(circleAllowed(number, index));
 circle = parseInt(RegExp.$1);
 nextCircle = parseInt(RegExp.$2);
 string = "You have enough " + data[index][0] + " for " + circle + suffix(circle);
 string += " circle, and need " + nextCircle;
 string += ((nextCircle == 1) ? " rank" : " ranks");
 string += " for " + (circle + 1) + suffix(circle + 1) + ".";

    document.getElementById('rankArea').innerHTML = string;
}


function suffix(number) {
 number = number % 100;
    if (Math.floor(number / 10) == 1)
     return "th";
    else if (number % 10 == 1)
        return "st";
    else if (number % 10 == 2)
        return "nd";
    else if (number % 10 == 3)
        return "rd";
    else
        return "th";
}

function calcExp(information) {
 var armorSkillNames = new Array("Shield Usage", "Light Armor", "Chain Armor", "Brigandine", "Plate Armor",
                                 "Defending", "Endurance");

 var weaponSkillNames = new Array("Parry Ability", "Small Edged", "Heavy Edged", "Twohanded Edged", "Small Blunt",
                                  "Large Blunt", "Twohanded Blunt", "Large Edged", "Sling", "Bow", "Crossbow", "Staves",
                                     "Polearms", "Light Thrown", "Heavy Thrown", "Brawling", "Expertise", "Melee Mastery",
                                  "Missile Mastery");
	
 var masterySkillNames = new Array("Melee Mastery", "Missile Mastery");

 var magicSkillNames = new Array("Attunement", "Arcana", "Targeted Magic", "Astrology",
                                 "Utility", "Sorcery", "Elementalism", "Augmentation", "Debilitation", "Warding",
                                 "Inner Fire", "Summoning", "Theurgy", "Arcane Magic", "Elemental Magic", "Holy Magic",
                                 "Inner Magic", "Life Magic", "Lunar Magic");

 var survivalSkillNames = new Array("Evasion", "Athletics", "Perception", "Stealth", "Locksmithing", "Thievery",
                                    "First Aid", "Outdoorsmanship", "Backstab", "Skinning", "Thanatology", "Scouting");

 var loreSkillNames = new Array("Scholarship", "Outfitting", "Enchanting", "Forging", "Alchemy", "Bardic Lore",
                                "Appraisal", "Trading", "Performance", "Empathy", "Tactics", "Mechanical Lore",
                                "Engineering");

 var skillNames = armorSkillNames.concat(weaponSkillNames, magicSkillNames, survivalSkillNames, loreSkillNames);

 var armorRanks = new Array(armorNames.length);
 var weaponRanks = new Array(weaponNames.length);
 var masteryRanks = new Array(masteryNames.length);
 var loreRanks = new Array(loreNames.length);
 var survivalRanks = new Array(survivalNames.length);
 var magicRanks = new Array(magicNames.length);

    var skillValues = new Array(skillNames.length);
    for (i = 0; i < skillNames.length; i++) {
        reg = new RegExp(skillNames[i] + ":\\*?\\s*(\\d*)","i");
        if (reg.exec(information))
         skillValues[i] = parseInt(RegExp.$1);
     else
         skillValues[i] = 0;
    }

 for (i = 0; i < armorNames.length; i++)
            armorRanks[i] = skillValues[searchArray(skillNames, armorNames[i])];
 sortDesc(armorRanks, armorNames);

    for (i = 0; i < loreNames.length; i++)
        loreRanks[i] = skillValues[searchArray(skillNames, loreNames[i])];
 sortDesc(loreRanks, loreNames);

    for (i = 0; i < weaponNames.length; i++)
        weaponRanks[i] = skillValues[searchArray(skillNames, weaponNames[i])];
 sortDesc(weaponRanks, weaponNames);

    for (i = 0; i < masteryNames.length; i++)
        masteryRanks[i] = skillValues[searchArray(skillNames, masteryNames[i])];
 sortDesc(masteryRanks, masteryNames);
	
    for (i = 0; i < survivalNames.length; i++)
        survivalRanks[i] = skillValues[searchArray(skillNames, survivalNames[i])];
 sortDesc(survivalRanks, survivalNames);

    for (i = 0; i < magicNames.length; i++)
        magicRanks[i] = skillValues[searchArray(skillNames, magicNames[i])];
 sortDesc(magicRanks, magicNames);


 strings = new Array();
 circles = new Array();
    string ="";
    sum = 0;
    for (i = 0; i < skillValues.length; i++)
        sum += skillValues[i];
    string += "You have " + sum + " total ranks.<br>";
  sum = 0;
    for (i = 0; i < skillValues.length; i++)
        sum += skillValues[i] * (skillValues[i] + 1) / 400;
    string += "You have gained " + Math.floor(sum) + " total TDPs from ranks.<br>";
    sum = 0;
 for (i = 0; i < armorSkillNames.length; i++)
     sum += skillValues[searchArray(skillNames, armorSkillNames[i])];
 string += "You have " + sum + " total armor ranks.<br>";
 sum = 0;
 for (i = 0; i < weaponSkillNames.length; i++)
     sum += skillValues[searchArray(skillNames, weaponSkillNames[i])];
 string += "You have " + sum + " total weapon ranks.<br>";
 sum = 0;
 for (i = 0; i < survivalSkillNames.length; i++)
     sum += skillValues[searchArray(skillNames, survivalSkillNames[i])];
 string += "You have " + sum + " total survival ranks.<br>";
 sum = 0;
 for (i = 0; i < loreSkillNames.length; i++)
     sum += skillValues[searchArray(skillNames, loreSkillNames[i])];
 string += "You have " + sum + " total lore ranks.<br>";
 sum = 0;
 for (i = 0; i < magicSkillNames.length; i++)
     sum += skillValues[searchArray(skillNames, magicSkillNames[i])];
 string += "You have " + sum + " total magic ranks.<br>";
	
    for (i = 0; i < data.length; i++) {
        indexOfSkill = searchArray(skillNames, data[i][0]);
        if (indexOfSkill == -1) {
         reg = /General/i;
         if (reg.test(data[i][0])) {
             reg = /Magic/i;
             if (reg.test(data[i][0]))
                 generalRanks = magicRanks;
             reg = /Survival/i;
             if (reg.test(data[i][0]))
                 generalRanks = survivalRanks;
             reg = /Lore/i;
             if (reg.test(data[i][0]))
                 generalRanks = loreRanks;
             generalSum = 0;
             for (j = 0; j < generalRanks.length; j++)
                 generalSum += generalRanks[j];
             reg = /(\d*) (\d*)/;
             reg.exec(circleAllowed(generalSum, i));
             circle = parseInt(RegExp.$1);
             nextCircle = parseInt(RegExp.$2);
             circles[i] = circle;
             if (isNaN(circle))
                 circles[i] = 999;
             if (isNaN(circle))
                 strings[i] = "You have enough " + data[i][0] + " for any circle. <br>";
             else {
                 strings[i] = "You have enough " + data[i][0] + " for " + circle + suffix(circle);
                 strings[i] += " circle, and need " + nextCircle;
                 strings[i] += ((nextCircle == 1) ? " rank" : " ranks");
                 strings[i] += " for " + (circle + 1) + suffix(circle + 1) + ".<br>";
             }
         }

         number = -1;
         reg = /Primary/i;
         if (reg.test(data[i][0]))
             number = 0;
         reg = /Secondary/i;
         if (reg.test(data[i][0]))
             number = 1;
         reg = /Tertiary/i;
         if (reg.test(data[i][0]))
             number = 2;
         reg = /(\d)\w\w/i;
         if (reg.test(data[i][0]))
             number = RegExp.$1 - 1;
         if (number != -1) {
             reg = /Weapon/i;
             if (reg.test(data[i][0])) {
                 skillValue = weaponRanks[number];
                 skillName = weaponNames[number];
             }
             reg = /Mastery/i;
             if (reg.test(data[i][0])) {
                 skillValue = masteryRanks[number];
                 skillName = masteryNames[number];
             }
             reg = /Armor/i;
             if (reg.test(data[i][0])) {
                 skillValue = armorRanks[number];
                 skillName = armorNames[number];
             }
             reg = /Lore/i;
             if (reg.test(data[i][0])) {
                 skillValue = loreRanks[number];
                 skillName = loreNames[number];
             }
             reg = /Survival/i;
             if (reg.test(data[i][0])) {
                 skillValue = survivalRanks[number];
                 skillName = survivalNames[number];
             }
             reg = /Magic/i;
             if (reg.test(data[i][0])) {
                 skillValue = magicRanks[number];
                 skillName = magicNames[number];
             }
             reg = /Supernatural/i;
             if (reg.test(data[i][0])) {
                 skillValue = magicRanks[number];
                 skillName = magicNames[number];
             }
             reg = /(\d*) (\d*)/;
             reg.exec(circleAllowed(skillValue, i));
             circle = parseInt(RegExp.$1);
             nextCircle = parseInt(RegExp.$2);
             circles[i] = circle;
             if (isNaN(circle))
                 circles[i] = 999;
             if (isNaN(circle))
                 strings[i] = "You have enough " + data[i][0] + " (" + skillName + ") for any circle. <br>";
             else {
                 strings[i] = "You have enough " + data[i][0] + " (" + skillName + ") for " + circle + suffix(circle);
                 strings[i] += " circle, and need " + nextCircle;
                 strings[i] += ((nextCircle == 1) ? " rank" : " ranks");
                 strings[i] += " for " + (circle + 1) + suffix(circle + 1) + ".<br>";
             }
         }

         reg = /Highest/i;
         if (reg.test(data[i][0])) {
             reg = /(\d)/;
             reg.exec(data[i][0]);
             index = RegExp.$1 - 1;
             reg = /Lore/i;
             if (reg.test(data[i][0])) {
                 highestRanks = loreRanks;
                 highestNames = loreNames;
             }

             reg = /Survival/i;
             if (reg.test(data[i][0])) {
                 highestRanks = survivalRanks;
                 highestNames = survivalNames;
             }

             reg = /(\d*) (\d*)/;
             reg.exec(circleAllowed(highestRanks[index], i));
             circle = parseInt(RegExp.$1);
             nextCircle = parseInt(RegExp.$2);
             circles[i] = circle;
             if (isNaN(circle))
                 circles[i] = 999;
             if (isNaN(circle))
                 strings[i] = "You have enough " + data[i][0] + " for any circle. <br>";
             else {
                 strings[i] = "You have enough " + data[i][0] + " for " + circle + suffix(circle);
                 strings[i] += " circle, and need ";
                 startingIndex = index;
                 while (highestRanks[index] < circleAmount(circle + 1, i) && index >= 0) {
                     if (index != startingIndex)
                         strings[i] += " and ";
                     reg = /(\d*) (\d*)/;
                     reg.exec(circleAllowed(highestRanks[index], i));
                     nextCircle = parseInt(RegExp.$2);
                     strings[i] += nextCircle + ((nextCircle == 1) ? " rank" : " ranks");
                     strings[i] += " in " + highestNames[index];
                     index--;
                 }
                 strings[i] += " for " + (circle + 1) + suffix(circle + 1) + ".<br>";
             }
         }

        }
        else {
            reg = /(\d*) (\d*)/;
         reg.exec(circleAllowed(skillValues[indexOfSkill], i));
         circle = parseInt(RegExp.$1);
         nextCircle = parseInt(RegExp.$2);
         circles[i] = circle;
         if (isNaN(circle))
                 circles[i] = 999;
         if (isNaN(circle))
             strings[i] = "You have enough " + data[i][0] + " for any circle. <br>";
         else {
             strings[i] = "You have enough " + data[i][0] + " for " + circle + suffix(circle);
             strings[i] += " circle, and need " + nextCircle;
             strings[i] += ((nextCircle == 1) ? " rank" : " ranks");
             strings[i] += " for " + (circle + 1) + suffix(circle + 1) + ".<br>";
         }
     }
 }
 sortAsc(circles, strings);
 dataString = "<br>What you need for " + (circles[i] + 1) + suffix(circles[i] + 1) + " circle:<br>";
 i = 0;
 while (circles[i] == circles[0] && i < strings.length)
     dataString += strings[i++];
 dataString += "<br>";
 for (i; i < strings.length; i++)
     dataString += strings[i];

 var expArea = document.getElementById('expArea');
 expArea.innerHTML = string + dataString;
}
   
function sortAsc(arrayVals, arrayNames) {
 for (i = arrayVals.length - 1; i > 0; i--)
        for (j = 0; j < i; j++)
            if (arrayVals[j] > arrayVals[j + 1]) {
                temp = arrayVals[j];
                arrayVals[j] = arrayVals[j + 1];
                arrayVals[j + 1] = temp;
                temp = arrayNames[j];
                arrayNames[j] = arrayNames[j + 1];
                arrayNames[j + 1] = temp;
            }
}

function sortDesc(arrayVals, arrayNames) {
    for (i = arrayVals.length - 1; i > 0; i--)
        for (j = 0; j < i; j++)
            if (arrayVals[j] < arrayVals[j + 1]) {
                temp = arrayVals[j];
                arrayVals[j] = arrayVals[j + 1];
                arrayVals[j + 1] = temp;
                temp = arrayNames[j];
                arrayNames[j] = arrayNames[j + 1];
                arrayNames[j + 1] = temp;
            }
}

function searchArray(array, val) {
 for (loop = 0; loop < array.length; loop++)
     if (array[loop] == val) return loop;
 return -1;
}


