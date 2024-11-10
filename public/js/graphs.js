    // const information = await fetch('https://backend.ichenglin.net/email_tracking/test').then(response => response.json());
    
    // let textLabels = information.foo;
    // let numbers = information.test;
    
// const param = new URLSearchParams();
// param.append("username", "test");
// param.append("password", "wtf");
// param.append("token", "1".repeat(500));

// (async() => {
//     const result = await fetch("https://backend.ichenglin.net/email_tracking/test", {
//         method: "POST",
//         headers: {
//             "Authorization": "Bearer <TOKEN>"
//         },
//         body: param
//     }).then(response => response.text());
//     console.log(result);
// })();
    
let uniqueLocations;
let uniqueBrowsers;
let uniqueGroups;
let uniqueTimes;
let timesOne = [];
let timesTwo = [];
let timesThree = [];
let timesZero = [];


let bCounts = []; // Now count number of entries with browsers[i] && opens > 1
let gCounts = []; // count number of entries with groups[i] && opens > 1
let locCounts = []; // same with location
let timeCounts = []; // count number of entries times[i] && opens > 1
let gUCounts = []; // count every groups[i] && opens < 2

getData = async () => {
    const information = await fetch('https://backend.ichenglin.net/email_tracking/user/emails', {
        headers: {
            "Authorization": `Bearer testing2${"_".repeat(492)}`
        }
    }).then(response => response.json());
    //console.log(information);

    // console.log(information);

    function getUniqueStrings(arr) {
        return [...new Set(arr)];
    }

    const allLoc = information.result.map(entry => entry.location_country)
    uniqueLocations = getUniqueStrings(allLoc);
    // console.log(uniqueLocations); 

    const allBrowsers = information.result.map(entry => entry.browser_name)
    uniqueBrowsers = getUniqueStrings(allBrowsers);
    // console.log(uniqueBrowsers);

    const allGroups = information.result.map(entry => entry.request_group)
    uniqueGroups = getUniqueStrings(allGroups);
    // console.log(uniqueGroups);
    
    
    const allOpens = information.result.map(entry => entry.request_count)
    // console.log(allOpens);
    
    const allTimes = information.result.map(entry => entry.request_date)
    uniqueTimes = getUniqueStrings(allTimes);

    for (let i = 0; i < uniqueTimes.length; i++) {
        timesOne.push(0);
        for (let j = 0; j < allTimes.length; j++) {
            if (uniqueTimes[i] == allTimes[j] && allOpens[j] > 0 && allGroups[j] == 1) {
                timesOne[i]++;
            }
        }
    }

    for (let i = 0; i < uniqueTimes.length; i++) {
        timesTwo.push(0);
        for (let j = 0; j < allTimes.length; j++) {
            if (uniqueTimes[i] == allTimes[j] && allOpens[j] > 0 && allGroups[j] == 2) {
                timesTwo[i]++;
            }
        }
    }

    for (let i = 0; i < uniqueTimes.length; i++) {
        timesThree.push(0);
        for (let j = 0; j < allTimes.length; j++) {
            if (uniqueTimes[i] == allTimes[j] && allOpens[j] > 0 && allGroups[j] == 3) {
                timesThree[i]++;
            }
        }
    }

    for (let i = 0; i < uniqueTimes.length; i++) {
        timesZero.push(0);
        for (let j = 0; j < allTimes.length; j++) {
            if (uniqueTimes[i] == allTimes[j] && allOpens[j] > 0 && allGroups[j] == 0) {
                timesZero[i]++;
            }
        }
    }


    // console.log(uniqueTimes);

    bCounts = []; // Now count number of entries with browsers[i] && opens > 1
    gCounts = []; // count number of entries with groups[i] && opens > 1
    locCounts = []; // same with location
    timeCounts = []; // count number of entries times[i] && opens > 1

    gUCounts = []; // count every groups[i] && opens < 2


    for (let i = 0; i < uniqueLocations.length; i++){
        locCounts.push(0);
        for (let j = 0; j < allLoc.length; j++){
            if(uniqueLocations[i] == allLoc[j] && allOpens[j] > 0){
                locCounts[i]++;
            }

        }
    }
    // console.log(locCounts);


    for (let i = 0; i < uniqueBrowsers.length; i++){
        bCounts.push(0);
        for (let j = 0; j < allBrowsers.length; j++){
            if(uniqueBrowsers[i] == allBrowsers[j] && allOpens[j] > 0){
                bCounts[i]++;
            }

        }
    }
    // console.log(bCounts);

    for (let i = 0; i < uniqueGroups.length; i++){
        gCounts.push(0);
        for (let j = 0; j < allGroups.length; j++){
            if(uniqueGroups[i] == allGroups[j] && allOpens[j] > 0){
                gCounts[i]++;
            }
        }
    }

    // console.log(gCounts);


    for (let i = 0; i < uniqueTimes.length; i++){
        timeCounts.push(0);
        for (let j = 0; j < allTimes.length; j++){
            if(uniqueTimes[i] == allTimes[j] && allOpens[j] > 0){
                timeCounts[i]++;
            }

        }
    }
    // console.log(timeCounts);


    for (let i = 0; i < uniqueGroups.length; i++){
        gUCounts.push(0);
        for (let j = 0; j < allGroups.length; j++){
            if(uniqueGroups[i] == allGroups[j] && allOpens[j] < 1){
                gUCounts[i]++;
            }
        }
    }
    // console.log(gUCounts);

    let maxNum = 0;
    let maxIndex = 0;

    for (let i = 0; i < bCounts.length; i++) {
        if (maxNum < bCounts[i]) {
            maxNum = bCounts[i];
            maxIndex = i;
        }
    }
    
    let bestBrowser = uniqueBrowsers[maxIndex];
    
    maxNum = 0;
    maxIndex = 0;
    for (let i = 0; i < gCounts.length; i++) {
        if (maxNum < gCounts[i]) {
            maxNum = gCounts[i];
            maxIndex = i;
        }
    }

    let bestGroup = uniqueGroups[maxIndex];

    maxNum = 0;
    maxIndex = 0;
    for (let i = 0; i < timeCounts.length; i++) {
        if (maxNum < timeCounts[i]) {
            maxNum = timeCounts[i];
            maxIndex = i;
        }
    }

    let bestTime = new Date(uniqueTimes[maxIndex]*1000).toString().split(" ")[4];
    
    maxNum = 0;
    maxIndex = 0;
    for (let i = 0; i < locCounts.length; i++) {
        if (maxNum < locCounts[i]) {
            maxNum = locCounts[i];
            maxIndex = i;
        }
    }

    let bestLocation = uniqueLocations[maxIndex];

    const writing = document.querySelector(".writing");
    writing.textContent = 
    `\nBrowser - ${bestBrowser},
    \nCampaign - ${bestGroup},
    \nTime - ${bestTime},
    Location - ${bestLocation}`
};


var canvasElement = document.getElementById("chart");
var menu = document.getElementById("chart-select");
const typeDrop = document.getElementById("type-select");
var chart = null;

let canvasWidth = canvasElement.width;
let canvasHeight = canvasElement.height;

const generateData = () => {
    if (chart) {
        chart.destroy();
    }
    let config;
    getData();
    canvasElement.width = canvasWidth;
    canvasElement.height = canvasHeight;

    const browserDrop = document.querySelector(".browser");
    const campaignDrop = document.querySelector(".campaign");
    const timeDrop = document.querySelector(".time");
    const locationDrop = document.querySelector(".location");
    const openedDrop = document.querySelector(".opened");

    if (menu.value == "bar") {
        if (typeDrop.selectedIndex != 0 && typeDrop.selectedIndex != 1) {
            typeDrop.selectedIndex = 0;
        }
        browserDrop.classList.remove("hidden");
        campaignDrop.classList.remove("hidden");
        timeDrop.classList.add("hidden");
        locationDrop.classList.add("hidden");
        openedDrop.classList.add("hidden");

        var textLabels;
        var numbers;
        if (typeDrop.value == "browser") {
            textLabels = uniqueBrowsers;
            numbers = bCounts;
        }
        else {
            textLabels = uniqueGroups;
            numbers = gCounts;
        }
        
        var title = `Number of opens per ${typeDrop.value}`;
        
        var colors = ["rgba(255,159,64,0.5)" , "rgba(255, 99, 132, 0.5)", "rgba(153, 102, 255, 0.5)"]; 
        var borders = ["rgba(255,159,64,1)" , "rgba(255, 99, 132, 1)", "rgba(153, 102, 255, 1)"];
        
        config = {
            type: "bar",
            data: {labels: textLabels, 
            datasets: [
                {label: title, 
                    data: numbers,
                    backgroundColor: colors,
                    borderColor: borders,
                    borderWidth: 6,
            }]},
            options: {
                layout: {
                    padding: {
                        bottom: 30,
                    }
                },
                responsive: false,
                plugins: {
                    legend: {
                        labels: {
                            color: "white",  // Set legend text color to white
                        }
                        
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            color: "white"  // Set x-axis labels color to white
                        },
                        grid: {
                            color: "rgba(255, 255, 255, 0.2)"  // Set y-axis grid lines to a subtle white
                        }
                    },
                    y: {
                        ticks: {
                            color: "white"  // Set y-axis labels color to white
                        },
                        grid: {
                            color: "rgba(255, 255, 255, 0.2)"  // Set y-axis grid lines to a subtle white
                        }
                    }
                }
            }
        }
    }
    else if (menu.value == "line") {
        typeDrop.selectedIndex = 2;
        browserDrop.classList.add("hidden");
        campaignDrop.classList.add("hidden");
        timeDrop.classList.remove("hidden");
        locationDrop.classList.add("hidden");
        openedDrop.classList.add("hidden");


        var numbers = timesOne;
        var numbers2 = timesTwo;
        var numbers3 = timesThree;
        var numbers4 = timesZero;
        uniqueTimes = uniqueTimes.map(time => new Date(time*1000).toString().split(" ")[4]);

        
        var textLabels = uniqueTimes;
        var email = ["Group 1" , "Group 2", "Group 3", "Group 0"];
        
        var colors = ["rgba(255,159,64,0.5)", "rgba(255, 99, 132, 0.5)", "rgba(153, 102, 255, 0.5)", "rgba(68,139,187,0.5)"]; 
        var borders = ["rgba(255,159,64, 1)", "rgba(255, 99, 132, 1)", "rgba(153, 102, 255, 1)", "rgba(68,139,187,1)"]; 

        config = {
            type: "line",
            data: {labels: textLabels, 
                datasets: [
                    {label: email[0], 
                        data: numbers,
                backgroundColor: colors[0],
                borderColor: borders[0],
                //borderWidth: 3,
                },
                
                {label: email[1], 
                    data: numbers2,
                    backgroundColor: colors[1],
                    borderColor: borders[1],
                    //borderWidth: 3,
                },
                {label: email[2], 
                    data: numbers3,
                    backgroundColor: colors[2],
                    borderColor: borders[2],
                    //borderWidth: 3,
                },
                {label: email[3], 
                    data: numbers4,
                    backgroundColor: colors[3],
                    borderColor: borders[3],
                    //borderWidth: 3,
                }
            ]},
            options: {
                responsive: false,
                plugins: {
                    legend: {
                        labels: {
                            color: "white"  // Set legend text color to white
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            color: "white"  // Set x-axis labels color to white
                        },
                        grid: {
                            color: "rgba(255, 255, 255, 0.2)"  // Set y-axis grid lines to a subtle white
                        }
                    },
                    y: {
                        ticks: {
                            color: "white"  // Set y-axis labels color to white
                        },
                        grid: {
                            color: "rgba(255, 255, 255, 0.2)"  // Set y-axis grid lines to a subtle white
                        }
                    }
                }
            }
        };
    }
    else if (menu.value == "pie") {
        if (typeDrop.selectedIndex != 0 && typeDrop.selectedIndex != 3) {
            typeDrop.selectedIndex = 0;
        }
        browserDrop.classList.remove("hidden");
        campaignDrop.classList.add("hidden");
        timeDrop.classList.add("hidden");
        locationDrop.classList.remove("hidden");
        openedDrop.classList.add("hidden");


        var textLabels;
        var numbers;
        if (typeDrop.value == "browser") {
            textLabels = uniqueBrowsers;
            numbers = bCounts;
        }
        else {
            textLabels = uniqueLocations;
            numbers = locCounts;
        }


        var title = `Number of Opens per ${typeDrop.value}`;
        var colors = ["rgba(255,159,64,0.5)" , "rgba(255, 99, 132, 0.5)", "rgba(153, 102, 255, 0.5)"]; 
        var borders = ["rgba(255,159,64,1)" , "rgba(255, 99, 132, 1)", "rgba(153, 102, 255, 1)"];

        config = {
            type: "pie",
            data: {labels: textLabels, 
            datasets: [
                {label: title, 
                data: numbers,
                backgroundColor: colors,
                borderColor: borders,
                borderWidth: 6,
            }]},
            options: {
                responsive: false,
                plugins: {
                    legend: {
                        labels: {
                            color: "white"  // Set legend text color to white
                        }
                    }
                },
            }
        };
    }
    else if (menu.value == "gauge") {
        typeDrop.selectedIndex = 4;
        browserDrop.classList.add("hidden");
        campaignDrop.classList.add("hidden");
        timeDrop.classList.add("hidden");
        locationDrop.classList.add("hidden");
        openedDrop.classList.remove("hidden");

        const dave = [gCounts.reduce((partialSum, a) => partialSum + a, 0), gUCounts.reduce((partialSum, a) => partialSum + a, 0)];
        const data = {
        labels: ['OPENED', 'UNOPENED'],
        datasets: [{
            label: 'Number of Emails',
            data: dave,
            backgroundColor: [
            'rgba(255, 26, 104, 0.5)',
            "rgba(255, 99, 132, 0.5)",
            ],
            borderColor: [
            'rgba(255, 26, 104, 1)',
            "rgba(255, 99, 132, 1)",
            ],
            borderWidth: 6,
            circumference: 180,
            rotation: 270,
            cutout: '70%',
            needleValue: dave[0]

        }]
        };

        const gaugeNeedle = {
            id: 'gaugeNeedle',
            afterDatasetDraw(chart, args, plugins) {
                const {ctx, data} = chart;

                ctx.save();
                const xCenter = chart.getDatasetMeta(0).data[0].x;
                const yCenter = chart.getDatasetMeta(0).data[0].y;
                const outerRadius = chart.getDatasetMeta(0).data[0].outerRadius;
                const innerRadius = chart.getDatasetMeta(0).data[0].innerRadius;
                const wSlice = (outerRadius - innerRadius) / 2;
                const radius = 15;
                const angle = Math.PI / 180;

                const needleValue = data.datasets[0].needleValue;

                const dataTotal = data.datasets[0].data.reduce((a,b) => a+b, 0);
                const circumference = ((chart.getDatasetMeta(0).data[0].circumference / Math.PI) / data.datasets[0].data[0]) * needleValue;

                ctx.translate(xCenter, yCenter);
                ctx.rotate(Math.PI * (circumference + 1.5));

                ctx.beginPath();
                ctx.strokeStyle = 'black';
                ctx.fillStyle = 'grey';
                ctx.lineWidth = 3;

                ctx.moveTo(0 - radius, 0);
                ctx.lineTo(0, 0 - innerRadius - wSlice);
                ctx.lineTo(0 + radius, 0);
                
                ctx.stroke();
                ctx.fill();
                
                
                ctx.beginPath();
                ctx.arc(0 , 0 , radius, 0, angle * 360, false);
                ctx.fill();
                
                ctx.lineWidth = 3;
                ctx.stroke();
                ctx.closePath();
                
                ctx.restore();
                
                
                const perVal = circumference * 100;

                ctx.font = 'bold 30px sans-serif';
                ctx.fillStyle = 'white';
                ctx.textAlign = 'center';

                ctx.restore();
                ctx.fillText(` ${perVal.toFixed(1)}%`, xCenter, yCenter/1.5);
                
            }
        }
        
        
        // config 
        const config = {
        type: 'doughnut',
        data,
        options: {
            aspectRatio: 1.5,
            animation: {
            duration: 3000  // Set to 2000 milliseconds for half-speed animation
            },
            plugins: {
                legend: {
                    display: false
                }
            },
            responsive: false
        },
        plugins: [gaugeNeedle]
        };
        
        chart = new Chart(canvasElement, config);
        // Instantly assign Chart.js version
        const chartVersion = document.getElementById('chartVersion');
        chartVersion.innerText = Chart.version;
    }

    if (menu.value != "gauge") chart = new Chart(canvasElement, config);
};

menu.addEventListener("change", generateData);
typeDrop.addEventListener("change", generateData);



document.addEventListener("DOMContentLoaded", async () => {
    generateData();
});
