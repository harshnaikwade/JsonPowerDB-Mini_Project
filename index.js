var jpdbBaseURL="http://api.login2explore.com:5577";
var jpdbIRL="/api/irl";
var jpdbIML="/api/iml";
var stdDBName="SCHOOL-DB";
var stdRelationName="STUDENT-TABLE";
var connToken="90938340|-31949270450391826|90955015";

$("#rollNo").focus();

            function getrollNoAsJsonObj(){
                var rollNo = $("#rollNo").val();
                var jsonStr = { id: rollNo};
                return JSON.stringify(jsonStr);
            }

              function getstd(){
                var rollNoJsonObj = getrollNoAsJsonObj();
                var getRequest = createGET_BY_KEYRequest(connToken,stdDBName,stdRelationName,rollNoJsonObj);
            jQuery.ajaxSetup({async: false});
            var resJsonObj=executeCommandAtGivenBaseUrl(getRequest,jpdbBaseURL,jpdbIRL);
            jQuery.ajaxSetup({async: true});
            if(resJsonObj.status === 400){
                $("#save").prop("disabled",false);
                $("#reset").prop("disabled",false);
                $("#fullName").focus();
            
            }else if (resJsonObj.status === 200) {

                
                fillData(resJsonObj);
                $("#rollNo").prop("disabled",true);
                $("#change").prop("disabled",false);
                $("#reset").prop("disabled",false);
                $("#fullName").focus();
            }
            }
            
            function fillData(jsonObj){
                saveRecNo2LS(jsonObj);
                var record = JSON.parse(jsonObj.data).record;
                $("#rollNo").val(record.id);
                $("#fullName").val(record.fullName); 
                $("#section").val(record.section);
                $("#birthDate").val(record.birthDate);
                $("#address").val(record.address);
                $("#enrollmentDate").val(record.enrollmentDate);
            }

            function validateAndGetFormData() {
                var rollNo = $("#rollNo").val();
                if (rollNo === "") {
                    alert("Roll No Required Value");
                    $("#rollNo").focus();
                    return "";
                }
                var fullName = $("#fullName").val();
                if (fullName === "") {
                    alert("Full Name is Required Value");
                    $("#fullName").focus();
                    return "";
                }
                var section = $("#section").val();
                if (section === "") {
                    alert("Class is Required Value");
                    $("#section").focus();
                    return "";
                }
                var birthDate = $("#birthDate").val();
                if (birthDate === "") {
                    alert("Birth-Date is Required Value");
                    $("#birthDate").focus();
                    return "";
                }
                var address = $("#address").val();
                if (address === "") {
                    alert("Address is Required Value");
                    $("#address").focus();
                    return "";
                }
                var stdEnrollmentDate = $("#enrollmentDate").val();
                if (stdEnrollmentDate === "") {
                    alert("Enrollment Date is Required Value");
                    $("#enrollmentDate").focus();
                    return "";
                }
                var jsonStrObj = {
                    id: rollNo,
                    fullName: fullName,
                    section: section,
                    birthDate: birthDate,
                    address: address,
                    enrollmentDate: stdEnrollmentDate
                };
                return JSON.stringify(jsonStrObj);
            }

            function resetForm() {
                $("#rollNo").prop("disabled",false);
                $("#rollNo").val("")
                $("#fullName").val("");
                $("#section").val("");
                $("#birthDate").val("");
                $("#address").val("");
                $("#enrollmentDate").val("");
                $("#rollNo").focus();
            }
            function saveData() {
                var jsonStrOb = validateAndGetFormData();
                if (jsonStrOb === "") {
                    return;
                }
                var putReqStr = createPUTRequest(connToken,
                        jsonStrOb,stdDBName,stdRelationName);
                jQuery.ajaxSetup({async: false});
                var resJsonObj = executeCommandAtGivenBaseUrl(putReqStr,jpdbBaseURL, jpdbIML);
                jQuery.ajaxSetup({async: true});
                alert("Data Saved");
                resetForm();
            }

            function changeData(){
                $("#change").prop("disabled",true); 
                jsonChg=validateAndGetFormData();
                var updateRequest=createUPDATERecordRequest(connToken,jsonChg,stdDBName,stdRelationName,localStorage.getItem('recno'));
                jQuery.ajaxSetup({async:false});
                var resJsonObj=executeCommandAtGivenBaseUrl(updateRequest,jpdbBaseURL,jpdbIML);
                jQuery.ajaxSetup({async:true});
                console.log(resJsonObj);
                alert("Data Changed");
                resetForm();
                 $("#rollNo").focus();
            }


            function saveRecNo2LS(jsonObj){
                var lvData=JSON.parse(jsonObj.data);
                localStorage.setItem('recno',lvData.rec_no);
            }

            