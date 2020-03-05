//Survey.StylesManager.applyTheme("modern");
Survey.StylesManager.applyTheme("orange");

var url_string = window.location.href;
var url = new URL(url_string);
//console.log(url.href);
var product = url.searchParams.get("product");
var webtoCasePartialUrl;  // url to create web to case form according to product selected

faqCreator = (surveyJSON, webtoCasePartialUrl) => {
  window.survey = new Survey.Model(surveyJSON);
  survey.showTitle = false;
  survey.onComplete.add(function (result) {
      var jsonDataLastValue = Object.values(result.data).pop();
      if (jsonDataLastValue == "other_query") {
          console.log("recieved other query");
          location.assign("./webtoCase.html" + webtoCasePartialUrl);
      }
      // document.querySelector("#surveyResult").textContent =
      // "Result JSON:\n" + JSON.stringify(result.data, null, 3);
  });
  $("#surveyElement").Survey({ model: survey });
}


var surveyJSON;
if (product == "enterceptor") {
    const request = async () => {
        const response = await fetch("./json/enterceptorFaq.json");
        const json = await response.json();
        surveyJSON = JSON.stringify(json);
        //console.log(surveyJSON);
        webtoCasePartialUrl = '?product=enterceptor';
        faqCreator(surveyJSON, webtoCasePartialUrl);
    };
    request();
}

else if(product == "gokarma"){
    const request = async () => {
        const response = await fetch("./json/gokarmaFaq.json");
        const json = await response.json();
        surveyJSON = JSON.stringify(json);
        //console.log(surveyJSON);
        webtoCasePartialUrl = '?product=gokarma';
        faqCreator(surveyJSON, webtoCasePartialUrl);
    };
    request();
}

else if(product == "ufht"){
    const request = async () => {
        const response = await fetch("./json/ufht.json");
        const json = await response.json();
        surveyJSON = JSON.stringify(json);
        //console.log(surveyJSON);
        webtoCasePartialUrl = '?product=ufht';
        faqCreator(surveyJSON, webtoCasePartialUrl);
    };
    request();
}

else if(product == "ecowork"){
    const request = async () => {
        const response = await fetch("./json/ecoworkFaq.json");
        const json = await response.json();
        surveyJSON = JSON.stringify(json);
        //console.log(surveyJSON);
        webtoCasePartialUrl = '?product=ecowork';
        faqCreator(surveyJSON, webtoCasePartialUrl);
    };
    request();
}

else{
surveyJSON = {
    pages: [
      {
        name: "homepage",
        elements: [
          {
            type: "html",
            name: "question1",
            html:
              "<center>\n<h2>Welcome to Eternus Solutions Products Section</h2>\n</center>\n"
          },

          {
            type: "radiogroup",
            name: "homepage_question",
            title: "Which Product you are looking for?",
            isRequired: true,
            choices: [
              {
                value: "enterceptor",
                text: "Enterceptor"
              },
              {
                value: "gokarma",
                text: "GoKarma"
              },
              {
                value: "ufht",
                text: "UFHT"
              },
              {
                value: "cowork",
                text: "CoWork"
              }
            ],
            colCount: 2
          }
        ]
      },

      {
        name: "enterceptor_page",
        elements: [
          {
            type: "html",
            name: "enterceptor_question",
            html: "<h3><center>Welcome to Enterceptor FAQ's Section</center></h3>"
          },
          {
            type: "radiogroup",
            name: "enterceptor_questions",
            title: "Which kind of queries you have?",
            isRequired: true,
            choices: [
              {
                value: "power_bi_report",
                text: "Power Bi Reports"
              },
              {
                value: "dashboard",
                text: "Dashboard"
              },
              {
                value: "software_issue",
                text: "Software Issues"
              }
            ]
          }
        ],
        visibleIf: '{homepage_question} = "enterceptor"'
      },

      {
        name: "gokarma_page",
        elements: [
          {
            type: "html",
            name: "question2",
            html: "<h3><center>Welcome to Enterceptor FAQ's Section</center></h3>"
          },
          {
            type: "radiogroup",
            name: "question3",
            title: "What Kind of queries/ problems you are facing in GoKarma?",
            isRequired: true,
            choices: [
              {
                value: "data_not_load",
                text: "Data is not Loading Properly"
              },
              {
                value: "no_field_mapping",
                text: "Fields are not Mapped Properly"
              }
            ]
          }
        ],
        visibleIf: '{homepage_question} = "gokarma"'
      },

      {
        name: "ufht_page",
        elements: [
          {
            type: "html",
            name: "question4",
            html: "<h3><center>Welcome to UFHT FAQ's Section</center></h3>"
          },
          {
            type: "radiogroup",
            name: "question5",
            title: "What kind of Queries/ Problems are you facing in UFHT?",
            isRequired: true,
            choices: [
              {
                value: "not_portable_android",
                text: "website is not portable for android mobile phones"
              },
              {
                value: "user_cant_map_field",
                text: "User is not able to map the fields properly"
              }
            ]
          }
        ],
        visibleIf: '{homepage_question} = "ufht"'
      },

      {
        name: "enterceptor_power_bi_page",
        elements: [
          {
            type: "html",
            name: "power_bi_head",
            html:
              "<center><h2>Power Bi head</h2></center>"
          },
          {
            type: "html",
            name: "power_bi_body_que",
            html:
              '<h3>Problem you may face-<h3>\n<h4>\nPower Bi Question\n</h4>\n'
          },
          {
            type: "html",
            name: "power_bi_body_ans",
            html:
              "<h3>Solution-<h3>\n<h4>\nPower Bi answer\n</h4>"
          }
        ],
        visibleIf: '{enterceptor_questions} = "power_bi_report"',
      },



      {
        name: "enterceptor_dashboard_page",
        elements: [
          {
            type: "html",
            name: "question6",
            html:
              "<h3><center>Sorry for inconvenience you are facing while using Dashboards </center></h3>"
          },
          {
            type: "radiogroup",
            name: "dashboard_problem_question",
            title: "what kind of problems you are facing in dashboards?",
            isRequired: true,
            choices: [
              {
                value: "dashboard_not_show_data",
                text: "Dashboard is not showing Report/Data properly"
              },
              {
                value: "dashboard_not_start",
                text: "Dashboard does not start"
              },
              {
                value: "dashboard_hanged",
                text: "Dashboard is getting hanged regularly"
              },
              {
                value: "dashboard_ui_not_work",
                text: "User Interface of Dashboard is not Working"
              },
              {
                value: "other_query",
                text: "Other Queries"
              }
            ]
          }
        ],
        visibleIf: '{enterceptor_questions} = "dashboard"'
      },

      {
        name: "enterceptor_software_issues_page",
        elements: [
          {
            type: "html",
            name: "software_issues_head",
            html:
              "<center><h2>Software Issues head</h2></center>"
          },
          {
            type: "html",
            name: "software_issues_body_que",
            html:
              '<h3>Problem you may face-<h3>\n<h4>\n Software Isssues Question\n</h4>\n'
          },
          {
            type: "html",
            name: "software_issues_body_ans",
            html:
              "<h3>Solution-<h3>\n<h4>\nSodftware Issues answer\n</h4>"
          }
        ],
        visibleIf: '{enterceptor_questions} = "software_issue"'
      },

      {
        name: "enterceptor_dashboard_data_not_show_data_page",
        elements: [
          {
            type: "html",
            name: "dashboard_data_not_show_body_head",
            html:
              "<center><h2>Hope below Solution can solve your problem</h2></center>"
          },
          {
            type: "html",
            name: "dashboard_not_show_data_body_que",
            html:
              '<h3>Problem you may face-<h3>\n<h4>\nI am having a very weird problem.  I have condensed my data down to 7 records (each record has multiple lines of data). I can see all the records in the Query Editor, but when I go to the visualization page, 1 of the records will not show up. All of the records have the same type of information, as well as some "Null" cells - and all the rest have all shown up perfectly.  \n<br/><br/>\nI isolated the one record, and again, I can see it in the Query Editor, but when I open it in "Modeling" the table is blank.\n<br/><br/>\nI have tried: Correcting errors and enabling "Show items with no data" - nothing works.\n<br/><br/>\nAny ideas?\n</h4>\n'
          },
          {
            type: "html",
            name: "dashboard_not_show_data_body_ans",
            html:
              "<h3>Solution-<h3>\n<h4>\nPlease open a IE 11 inprivate mode, then sign in Power BI service again to see if contents display. \n</h4>"
          }
        ],
        visibleIf: '{dashboard_problem_question} = "dashboard_not_show_data"'
      }


    ],
    
    showQuestionNumbers: "on",
    showProgressBar: "bottom",
    goNextPageAutomatic: true,
    completedHtml: "<meta http-equiv='refresh' content='0; url = http://192.168.100.61:5500/index.html'/>"
  };

faqCreator(surveyJSON);
}


