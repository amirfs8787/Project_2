$(document).ready(function(){

    var clientLogin = "http://localhost/theschool/client/login.html";
    var clientSchool = "http://localhost/theschool/client/school.html";
    var clientAdmin = "http://localhost/theschool/client/administrators.html";

    var serverLogin = "http://localhost/theschool/server/api/login.php";
    var serverSchool = "http://localhost/theschool/server/api/school.php";
    var serverAdmin = "http://localhost/theschool/server/api/administrators.php";
    var serverLogout = "http://localhost/theschool/server/api/logout.php";

    var courseOrStudent = '';
    window.role = '';
    window.roleOfDisplayed = '';
    window.myImg = '';
    window.myImgA = '';
    window.hasBeenClicked = 'no';
    window.hasBeenClickedA = 'no';
    window.addNotUpdate = false;
    window.addNotUpdateA = false;
    window.OwnerExists = 'yes';
    window.fileNotImg = false;
    window.fileNotImgA = false;
    window.fileBig = false;
    window.fileBigA = false;
    window.emailOfDisplayed = '';
    window.emailOfDisplayedA = '';
    window.emailTaken = false;
    window.emailTakenA = false;
    window.nameOfDisplayed = '';
    window.nameTaken = false;

    if(window.location.href == clientSchool){
        var url = serverSchool;
    }
    else if(window.location.href == clientAdmin){
        var url = serverAdmin;
    }
    else{
        var url = serverLogin;
    }

    $.ajax({
        dataType: 'json',
        url: url,
        type: 'GET'
    }).then(function(data){
        if(url == serverLogin){
            if(data.sendToSchool == 'yes'){
              window.location.href = 'http://localhost/theschool/client/school.html';  
            }
        }
        else if(url == serverSchool){
            if(data.sales == 'yes'){
                $('.adminShow').css('display','none');
            }

            if(data.sendTo == 'login'){
                window.location.href = clientLogin;
            }
            else{
                $('.userAndRole').html(data.display);
                $('#usImg').attr("src","../uploads/" + data.img);

                for(var i = 0; i <data.courses.length; i++){
                    $('#courses_ul').append("<li id='c" + data.courses[i].ID +"' class='courselist'><img width = '50px' height = '50px' src='../uploads/" + data.courses[i].image + "'><p>" + data.courses[i].name + "<p></li>"); 
                }
                
                var studToCheck = [];
                studentList(data.students, studToCheck);

                $('.homeMain1').html('Total Courses: '+ data.courses.length);
                $('.homeMain2').html('Total Students: '+ studToCheck.length);
            }
        }
        else{
            if(data.sendTo == 'login'){
                window.location.href = clientLogin;
            }
            else{
                
                if(data.OwnerNum == 0){
                    window.OwnerExists = 'no';
                }
                else{
                    window.OwnerExists = 'yes';
                }
                $('.userAndRole').html(data.display);
                $('#usImg').attr("src","../uploads/" + data.img);
                
                if(data.role == 'Owner'){
                    for(var i = 0; i <data.admins.length; i++){
                        $('#admin_ul').append("<li id='a" + data.admins[i].ID +"' class='adminlist'><img width = '50px' height = '50px' src='../uploads/" + data.admins[i].image + "'><p>" + data.admins[i].name + ', ' + data.admins[i].role + '<br>' + data.admins[i].phone + '<br>' + data.admins[i].email + "</p></li>"); 
                    }

                }
                else{                    
                    for(var i = 0; i <data.admins.length; i++){
                        if(data.admins[i].role != 'Owner'){
                        $('#admin_ul').append("<li id='a" + data.admins[i].ID +"' class='adminlist'><img width = '50px' height = '50px' src='../uploads/" + data.admins[i].image + "'><p>" + data.admins[i].name + ', ' + data.admins[i].role + '<br>' + data.admins[i].phone + '<br>' + data.admins[i].email + "</p></li>"); 
                        }
                    }    
                    
                    
                }
                $('.adminMain').html('Total Administrators: '+ data.admins.length);
                window.role = data.role;
            }

        }    

    },function(err){
        alert('The error is '+ err);
        console.log(err);
    });
    
    
    $("#userlog").blur(function(){
        var user = $('#userlog').val();
        $.ajax({
            dataType: 'json',
            url: serverLogin,
            type: 'POST',
            data:{
                username: user
            }
        }).then(function(data){
            if(data.status == 'invalid'){
                $('#userMsg').css('display','inline');
            }
            else{
                $('#userMsg').css('display','none'); 
            }
        },function(err){
            alert('Please try again');
        });    
    });
    

    $('#logButton').click(function(){
        var user = $('#userlog').val();
        var pass = $('#passlog').val();
        $.ajax({
            dataType: 'json',
            url: serverLogin,
            type: 'POST',
            data:{
                username: user,
                password: pass
            }
        }).then(function(data){
            if(data.status == 'invalid'){
                $('#loginMsg').css('display','inline');
            }
            else{            
                window.location.href = clientSchool;            
            }
        },function(err){
            alert(err);
        });
    });
    
    
    
    $('.logOut').click(function(){
       $.ajax({
           dataType: 'json',
           url: serverLogout,
           type: 'GET'
       }).then(function(){
           window.location.href = clientLogin;
       }),function(err){
           alert('unable to log out');
       };
    });    
    
    
    $(document).on("click", ".courselist", function(e){
        var parID = $(e.target).parent().attr('id');
        if(parID != 'courses_ul'){
           displayFromList(parID,'Students','course','course'); 
        }
       
    });    
        
    
    $(document).on("click", ".studlist", function(e){
        var parID = $(e.target).parent().attr('id');
        if(parID != 'students_ul'){
            displayFromList(parID,'Courses','stud','student');    
        }
    });
    

    $(document).on("click", ".adminlist", function(e){        
        var parID = $(e.target).parent().attr('id');
        hasBeenClicked = 'no';
        $('#newImageA').val('');
        window.fileNotImgA = false;
        window.fileBigA = false;
        window.emailTakenA = false;
        var arrHide = ['.adminMain','.showOnClickAPlus', '#errMsgA'];
        displayNone(arrHide);
        $('.loader').css('display','block');
        
        $.ajax({
            dataType: 'json',
            url: "http://localhost/theschool/server/api/admindisp.php",//******VARIABLE***
            type: 'POST',
            data:{
                id: parID
            }
        }).then(function(data){
            $('.loader').css('display','none');
            $('.showOnClickA').css('display','block');
            if(data.allInfo[0].image == ''){
                $('.mainPicA').attr("src","../uploads/course.png");                
            }
            else{
                $('.mainPicA').attr("src","../uploads/" + data.allInfo[0].image);                
            }            
            $('#adHead').html(data.allInfo[0].name + ', ' + data.allInfo[0].role);
            $('#adDescription').html(data.allInfo[0].phone + '<br>' + data.allInfo[0].email);
            window.roleOfDisplayed = data.allInfo[0].role;
            window.emailOfDisplayedA = data.allInfo[0].email;
        }),function(err){
            alert('Can not display');
        }
    });
    
    
    $('#upload').on('click', function() {
        $('#errMsg').css('display','none');
        if($('#newImage').val() == ''){
            alert('Please choose an image and click upload');
        }
        else{
            window.hasBeenClicked = 'yes';
            var fileData = $('#newImage').prop('files')[0];
            var formData = new FormData();
            formData.append('file', fileData);
            if(fileData.size > 1000000){
                alert('Please choose a file that is smaller than 1mb');
                window.fileBig = true;
            }
            else if(fileData.type != 'image/png' && fileData.type && 'image/jpeg' && fileData.type != 'image/gif'){
                alert('You have to upload an image file, either a JPG, PNG, or GIF');
                window.fileNotImg = true;
            }
            else{
                window.fileBig = false; 
                window.fileNotImg = false;
                $.ajax({
                    type: 'post',
                    cache: false,
                    contentType: false,
                    processData: false,
                    url: "http://localhost/theschool/server/api/upload.php",
                    dataType: 'json',
                    data: formData
                }).then(function(data){
                        if(data.status === 'success'){
                            var path = window.location.href.split('/school.html')[0];
                            $('#addImage').attr('src',path + '../../uploads/' + data.fileName );
                            window.myImg = data.fileName;
                            return window.myImg;
                        }
                }),function(err){
                    alert('no img due to ' + err);
                }
            }
        }
    });
    
    
    $('#uploadA').on('click', function() {
        $('#errMsgA').css('display','none');
        if($('#newImageA').val() == ''){
            alert('Please choose an image and click upload');
        }
        else{
            window.hasBeenClickedA = 'yes';
            var fileData = $('#newImageA').prop('files')[0];
            var formData = new FormData();
            formData.append('file', fileData);

            if(fileData.size > 1000000){
                alert('Please choose a file that is smaller than 1mb');
                window.fileBigA = true;
            }
            else if(fileData.type != 'image/png' && fileData.type && 'image/jpeg' && fileData.type != 'image/gif'){
                alert('You have to upload an image file, either a JPG, PNG, or GIF');
                window.fileNotImgA = true;
            }
            else{
                window.fileBigA = false;
                window.fileNotImgA = false;
                $.ajax({
                    type: 'post',
                    cache: false,
                    contentType: false,
                    processData: false,
                    url: "http://localhost/theschool/server/api/upload.php",
                    dataType: 'json',
                    data: formData
                }).then(function(data){
                        if(data.status === 'success'){
                            var path = window.location.href.split('/administrators.html')[0];
                            $('#addImageA').attr('src',path + '../../uploads/' + data.fileName );
                            window.myImgA = data.fileName;
                            return window.myImgA;
                        }
                }),function(err){
                    alert('no img due to ' + err);
                }
            }
        }

    });
    

    $('.addThingsC').click(function(){
        mainConAddEdit()
        hasBeenClicked = 'no';
        addNotUpdate = true;
        $('#newImage').val('');
        $('#addImage').attr("src","../client/css/images/uploadimage.png");
        $('.showOnClickCorSPlus').css('display','block');
        $('.mhSpan').html('Add Course');
        $('#addName').val('');
        $('#addCDescription').val('');

        var arrHide = ['#deleteCButton','#numcourseOrStudInnerList','#updateCorSButton', '#phoneDiv', '#emailDiv', '#coursesDiv', '#errMsg'];
        displayNone(arrHide);

        $('#descDiv').css('display','block');
        $('#addCorSButton').css('display','block');

        courseOrStudent = 'course';
    });
    
    
    $('.addThingsS').click(function(){
        mainConAddEdit()
        hasBeenClicked = 'no';
        addNotUpdate = true;
        $('#newImage').val('');
        $('#addImage').attr("src","../client/css/images/uploadimage.png");
        $('.showOnClickCorSPlus').css('display','block');
        $('.mhSpan').html('Add Student');
        $('#addName').val('');
        $('#addPhone').val('');
        $('#addEmail').val('');
        $('#coursesDiv').html('');

        var arrHide = ['#deleteCButton','#numcourseOrStudInnerList','#updateCorSButton','#descDiv', '#errMsg'];
        displayNone(arrHide);
        var arrShow = ['#phoneDiv', '#emailDiv', '#coursesDiv'];
        displayBlock(arrShow);

        $('#addCorSButton').css('display','block');

        $.ajax({
            dataType: 'json',
            url: "http://localhost/theschool/server/api/coursesToAdd.php",
            type: 'GET'
        }).then(function(data){

            for(var i = 0; i<data.allCourses.length; i++){
                var text = data.allCourses[i]['name'];
                $('#coursesDiv').append("<input type = 'checkbox' name='" + text + "'value = '" + data.allCourses[i]['ID'] + "'>" + text + "<br>");
            }
        }),function(err){
            alert('Could not get courses due to ' + err);
        }
        
        courseOrStudent = 'student';
    });    
    
    
    $('.addThingsA').click(function(){
        var arrHide = ['.adminMain','.showOnClickA', '#deleteAButton', '#updateAButton', '#errMsgA'];
        displayNone(arrHide);
        hasBeenClickedA = 'no';
        addNotUpdateA = true;
        $('#newImageA').val('');
        $('#addImageA').attr("src","../client/css/images/uploadimage.png");
        $('.showOnClickaPlus').css('display','block');
        $('.mhSpanA').html('Add Administrator');
        $('#addNameA').val('');
        $('#addPhoneA').val('');
        $('#addEmailA').val('');
        $('#addPassword').val('');
        $('#deleteAButton').css('display', 'none');
        $('.showOnClickAPlus').css('display','block');
        $('#addAButton').css('display','block');
 
    });
        
    

    $('#mhCButton').click(function(){
        hasBeenClicked = 'no';
        window.fileNotImg = false;
        window.fileBig = false;
        addNotUpdate = false;
        
        mainConAddEdit();
        $('.loader').css('display','block');

        if(courseOrStudent == 'course'){
            $('.mhSpan').html('Edit Course');
            var arrHide = ['#phoneDiv', '#emailDiv', '#coursesDiv', '#addCorSButton', '#errMsg'];  
            displayNone(arrHide); 

            $.ajax({
                dataType: 'json',
                url: "http://localhost/theschool/server/api/editCourse.php",
                type: 'GET'    
            }).then(function(data){
                $('.loader').css('display','none');
                $('#addImage').attr("src","../client/css/images/uploadimage.png");
                
                var arrShow = ['#deleteCButton', '#numcourseOrStudInnerList', '#descDiv'];
                displayBlock(arrShow);
                $('#updateCorSButton').css('display','inline');
                $('.showOnClickCorSPlus').css('display','block');
                
                var name = data.allInfo[0]['name'];
                var desc = data.allInfo[0]['description'];
                var image = '../uploads/' + data.allInfo[0]['image'];
                $('#addName').val(name);    
                $('#addCDescription').val(desc);
                $('#addImage').attr("src",image);
                
                if(data.studentNum == 0){
                    $('#deleteCButton').css('display','inline');
                    $('#numcourseOrStudInnerList').html('There are no students in this course');
                }
                else{
                   $('#deleteCButton').css('display','none');
                    $('#numcourseOrStudInnerList').html('There are ' + data.studentNum + ' students in this course');
                }
                
                if(hasBeenClicked == 'no'){
                    window.myImg = data.allInfo[0]['image'];
                    return window.myImg;                    
                }
            }),function(err){
                alert('problem with editing' + err);
            }

        }
        else{
            $('.mhSpan').html('Edit Student');
            
            var arrHide = ['#descDiv', '#addCorSButton', '#numcourseOrStudInnerList'];  
            displayNone(arrHide);

            $('#coursesDiv').html('');

            $.ajax({
                dataType: 'json',
                url: "http://localhost/theschool/server/api/editstudent.php",
                type: 'GET'    
            }).then(function(data){
                hasBeenClicked = 'no';
                $('.loader').css('display','none');    
                var arrShow = ['#phoneDiv', '#emailDiv', '#coursesDiv','#deleteCButton'];
                displayBlock(arrShow);
                $('.showOnClickCorSPlus').css('display','block');
                $('#updateCorSButton').css('display','inline');

                for(var i = 0; i<data.allCourseNames.length; i++){
                    var text = data.allCourseNames[i]['name'];
                    if(courseExists(data.allCourseNames[i]['ID'])){
                        $('#coursesDiv').append("<input type = 'checkbox' name='" + text + "'value = '" + data.allCourseNames[i]['ID'] + "' checked>" + text + "<br>");                    
                    }
                    else{
                        $('#coursesDiv').append("<input type = 'checkbox' name='" + text + "'value = '" + data.allCourseNames[i]['ID'] + "'>" + text + "<br>");                   
                    }
                }

                function courseExists(course_ID) {
                  return data.courseOfStudNames.some(function(el) {
                    return el.ID === course_ID;
                  }); 
                }
                var name = data.allStudInfo[0]['name'];
                var phone = data.allStudInfo[0]['phone'];
                var email = data.allStudInfo[0]['email'];
                var image = '../uploads/' + data.allStudInfo[0]['image'];
                $('#addName').val(name);    
                $('#addPhone').val(phone);
                $('#addEmail').val(email);
                $('#addImage').attr("src",image);
                
                if(hasBeenClicked == 'no'){
                    window.myImg = data.allStudInfo[0]['image'];
                    return window.myImg;                    
                }
            }),function(err){
                alert('problem with editing' + err);
            }
        }
    });
    

    $('#mhCButtonA').click(function(){
        hasBeenClickedA = 'no';
        window.fileNotImgA = false;
        window.fileBigA = false;
        addNotUpdateA = false;
        
        var arrHide = ['.adminMain','.showOnClickA', '#addAButton', '#errMsgA'];
        displayNone(arrHide);
            
        $('.loader').css('display','block');
        $('.mhSpanA').html('Edit Administrator');
        if(window.role == 'Owner'){
            $('#roleDiv').css('display','block');
        }
        else{
            $('#roleDiv').css('display','hide');                
        }

        $.ajax({
            dataType: 'json',
            url: "http://localhost/theschool/server/api/editAdmin.php",
            type: 'GET'    
        }).then(function(data){
            $('.loader').css('display','none');
            $('#addImageA').attr("src","../client/css/images/uploadimage.png");

            if(window.roleOfDisplayed == 'Owner' || (window.role == 'Manager' && window.roleOfDisplayed == 'Manager')){
                $('#deleteAButton').css('display','none');
            }
            else{
                $('#deleteAButton').css('display','block');
            }

            $('#updateAButton').css('display','inline');
            $('.showOnClickAPlus').css('display','block');
            var name = data.allInfo[0]['name'];
            var phone = data.allInfo[0]['phone'];
            var email = data.allInfo[0]['email'];
            var role = data.allInfo[0]['role'];
            var image = '../uploads/' + data.allInfo[0]['image'];
            $('#addNameA').val(name);    
            $('#addPhoneA').val(phone);
            $('#addRole').val(role);    
            $('#addEmailA').val(email);
            $('#addPassword').val('');
            $('#addImageA').attr("src",image);

            if(hasBeenClickedA == 'no'){
                window.myImgA = data.allInfo[0]['image'];
                return window.myImgA;                    
            }
        }),function(err){
            alert('problem with editing due to' + err);
        }

    });
        
                 
    $('#addCorSButton').click(function(){
        $('#newImage').val('');
        $('#addImage').attr("src","../client/css/images/uploadimage.png");
        if(courseOrStudent == 'course'){            
            var name = $('#addName').val();            
            var desc = $('#addCDescription').val();
            if(validateCourse(name,desc)){
                $('#errMsg').css('display','none');
                $('.loader').css('display','block');
                $('.ulh2').html('Courses');

                $.ajax({
                    dataType: 'json',
                    url: "http://localhost/theschool/server/api/addCourse.php",
                    type: 'POST',
                    data:{
                        name: name,
                        description: desc,
                        image: myImg
                }
                }).then(function(data){
                    hasBeenClicked = 'no';
                    $('#addImage').attr("src","../client/css/images/uploadimage.png");
                    $('.loader').css('display','none');
                    $('.showOnClickCorSPlus').css('display','none');
                    $('.showOnClickCorS').css('display','block');
                    $('#courses_ul').append("<li id='c" + data.allInfo[0].ID +"' class='courselist'><img width = '50px' height = '50px' src='../uploads/" + data.allInfo[0].image + "'><p>" + data.allInfo[0].name + "</p></li>");

                    $('.mhSpan').html(data.allInfo[0].name);
                    var headText = data.allInfo[0].name + ', ' + data.studentNum[0] + ' Students';
                    $('#cndHead').html(headText);
                    $('#cndDescription').html(data.allInfo[0].description);
                    $('.mainPic').attr("src","../uploads/" + data.allInfo[0].image);

                    $('#courseOrStudInnerList').html('');
                    if(data.studNames.length == null){
                        $('#courseOrStudInnerList').html('No students in this course');
                    }
                    else{
                        for(var i = 0; i <data.studNames.length; i++){            
                            var textToAdd = data.studNames[i].name;
                            var srcToadd = data.studNames[i].image;
                            $('#courseOrStudInnerList').append("<li><img width = '50px' height = '50px' src='../uploads/" + srcToAdd + "'>" + textToAdd + "</li>"); 
                        }
                    }

                }),function(err){
                    alert('the course was not added');
                }
            }   
        }
        else{            
            if(validateStudent()[5]){
                var name = validateStudent()[0];
                var phone = validateStudent()[1];
                var email = validateStudent()[2];
                var courses = validateStudent()[3];
                var image = validateStudent()[4];
                $('#errMsg').css('height','40px');                
                $('#errMsg').css('display','none');
                $.ajax({
                    dataType: 'json',
                    url: "http://localhost/theschool/server/api/addstudent.php",
                    type: 'POST',
                    data:{
                        name: name,
                        phone: phone,
                        email: email,
                        courses: courses,
                        image: image
                    }
                }).then(function(data){
                    hasBeenClicked = 'no';
                    $('#addImage').attr("src","../client/css/images/uploadimage.png");
                    $('.showOnClickCorSPlus').css('display','none');
                    $('.showOnClickCorS').css('display','block');
                    $('#students_ul').append("<li id='s" + data.allStudInfo[0].ID +"' class='studlist'><img width = '50px' height = '50px' src='../uploads/" + data.allStudInfo[0].image + "'><p>" + data.allStudInfo[0].name + "<br>" + data.allStudInfo[0].phone + "</p></li>");
                    $('.mainPic').attr("src","../uploads/" + data.allStudInfo[0].image);

                    if(data.sales == 'yes'){
                        $('#mhCButton').css('display','none');
                    }
                    $('.mhSpan').html(data.allStudInfo[0].name);
                    var headText = data.allStudInfo[0].name;
                    $('#cndHead').html(headText);
                    $('#cndDescription').html(data.allStudInfo[0].phone + '<br>' + data.allStudInfo[0].email);
                    $('#courseOrStudInnerList').html('');

                    for(var i = 0; i <data.courseNameList.length; i++){            
                        var textToAdd = data.courseNameList[i][0].name;
                        var srcToAdd = data.courseNameList[i][0].image;
                        $('#courseOrStudInnerList').append("<li><img width = '50px' height = '50px' src='../uploads/" + srcToAdd + "'>" + textToAdd + "</li>"); 
                    }
                }),function(err){
                    alert('Can not add student due to ' + err);
                }                
            }
        }
    });                  

    
    $('#addAButton').click(function(){
        $('#newImageA').val('');

        if(validateAdmin()[6]){
            var name = validateAdmin()[0];
            var phone = validateAdmin()[1];
            var email = validateAdmin()[2];
            var password = validateAdmin()[3];
            var image = validateAdmin()[5];
            var role = validateAdmin()[4];           

            $('#errMsgA').css('display','none');
            $('.loader').css('display','block');
            $('.showOnClickAPlus').css('display','none');
            $.ajax({
                dataType: 'json',
                url: "http://localhost/theschool/server/api/addAdmin.php",
                type: 'POST',
                data:{
                    name: name,
                    role: role,
                    email: email,
                    phone: phone,
                    password: password,
                    image: myImgA
                }
            }).then(function(data){
                hasBeenClickedA = 'no';
                $('#addImageA').attr("src","../client/css/images/uploadimage.png");
                $('.loader').css('display','none');
                $('.showOnClickA').css('display','none');
                $('.adminMain').css('display','block');
                if(data.allInfo[0].role != 'Owner' || window.role == 'Owner'){
                    $('#admin_ul').append("<li id='a" + data.allInfo[0].ID +"' class='adminlist'><img width = '50px' height = '50px' src='../uploads/" + data.allInfo[0].image + "'><p>" + data.allInfo[0].name + ', ' + data.allInfo[0].role + '<br>' + data.allInfo[0].phone + '<br>' + data.allInfo[0].email + "</p></li>"); 
                    }

                $('.adminMain').html('Total Administrators: '+ data.adminNum);
            }),function(err){
                alert('the admin was not added due to ' + err);
            }
        }   
    });
    
                  
     $('#updateCorSButton').click(function(){
         addNotUpdate = false;
         $('#newImage').val('');
         $('#addImage').attr("src","../client/css/images/uploadimage.png");
         if(courseOrStudent == 'course') {
            var name = $('#addName').val();
            var desc = $('#addCDescription').val();
            if(validateCourse(name,desc)){
                $.ajax({
                    dataType: 'json',
                    url: "http://localhost/theschool/server/api/editCourse.php",
                    type: 'POST',
                    data:{
                        name: name,
                        description: desc,
                        image: window.myImg
                    }
                }).then(function(data){
                    hasBeenClicked = 'no';
                    $('.showOnClickCorSPlus').css('display','none');
                    $('.showOnClickCorS').css('display','block');
                    $('.mainPic').attr("src","../uploads/" + data.allInfo[0].image);
                    $('#c' + data.allInfo[0].ID).html('');
                    $('#c' + data.allInfo[0].ID).append("<img width = '50px' height = '50px' src='../uploads/" + data.allInfo[0].image + "'><p>" + data.allInfo[0].name + "</p>");
                    var headText = data.allInfo[0].name + ', ' + data.studentNum[0] + ' Students';
                    $('#cndHead').html(headText);
                    $('#cndDescription').html(data.allInfo[0].description);
                    courseOrSDisplay(data, data.studNames);
                }),function(err){
                    alert('the course was not added');
                }
            }
        }
        else{
            if(validateStudent()[5]){
                var name = validateStudent()[0];
                var phone = validateStudent()[1];
                var email = validateStudent()[2];
                var courses = validateStudent()[3];
                var image = validateStudent()[4];
                $('#errMsg').css('height','40px');                
                $('#errMsg').css('display','none');
                $.ajax({
                    dataType: 'json',
                    url: "http://localhost/theschool/server/api/editstudent.php",
                    type: 'POST',
                    data:{
                        name: name,
                        phone: phone,
                        email: email,
                        courses: courses,
                        image: window.myImg
                    }
                }).then(function(data){
                    hasBeenClicked = 'no';
                    $('.showOnClickCorSPlus').css('display','none');
                    $('.showOnClickCorS').css('display','block');
                    $('.mainPic').attr("src","../uploads/" + data.allInfo[0].image);                    
                    $('#s' + data.allInfo[0].ID).html('');                    
                    $('#s' + data.allInfo[0].ID).append("<img width = '50px' height = '50px' src='../uploads/" + data.allInfo[0].image + "'><p>" + data.allInfo[0].name + '<br>' + data.allInfo[0].phone + "</p>");

                    $('.ulh2').html('Courses');
                    var headText = data.allInfo[0].name;
                    $('#cndHead').html(headText);
                    $('#cndDescription').html(data.allInfo[0].phone + '<br>' + data.allInfo[0].email);

                    courseOrSDisplay(data, data.studCourses);
                }),function(err){
                    alert('Can not add student due to ' + err);
                }
            }
        }
    });
    
    
    $('#updateAButton').click(function(){
        $('#addImageA').attr("src","../client/css/images/uploadimage.png");
        if(validateAdmin()[6]){
            var name = validateAdmin()[0];
            var phone = validateAdmin()[1];
            var email = validateAdmin()[2];
            var password = validateAdmin()[3];
            var image = validateAdmin()[5];
            if(window.roleOfDisplayed == 'Owner'){
                var role = 'Owner';
            }
            else{
                var role = validateAdmin()[4];
            }

            if(window.roleOfDisplayed == 'Owner' && ($('#addRole').val() != 'Owner' && $('#addRole').val() != null)){
                alert('Any role change to an owner will not take effect');
            }
            $('#errMsgA').css('display','none');
            $('.loader').css('display','block');
            $('.showOnClickAPlus').css('display','none');
            $.ajax({
                dataType: 'json',
                url: "http://localhost/theschool/server/api/editadmin.php",
                type: 'POST',
                data:{
                    name: name,
                    phone: phone,
                    email: email,
                    password: password,
                    role: role,
                    image: window.myImgA
                }
            }).then(function(data){
                hasBeenClickedA = 'no';                    
                $('#a' + data.allInfo[0].ID).html('');                    
                $('#a' + data.allInfo[0].ID).append("<img width = '50px' height = '50px' src='../uploads/" + data.allInfo[0].image + "'><p>" + data.allInfo[0].name + ', ' + data.allInfo[0].role + '<br>' + data.allInfo[0].phone + '<br>' + data.allInfo[0].email + "</p>");
                $('.loader').css('display','none');
                $('.adminMain').css('display','block');
                $('.adminMain').html('Total Administrators: '+ data.adminNum); 
            }),function(err){
                alert('Can not add admin due to ' + err);
            }
        }        
    });
    

    $('#deleteCButton').click(function(){
        $('#newImage').val('');
        $('#addImage').attr("src","../client/css/images/uploadimage.png");
        if(courseOrStudent == 'course'){
            delCourseOrStud('course', 'c');
        }
        else{
            delCourseOrStud('student', 's');
        }    
    });
 
    $('#deleteAButton').click(function(){
        $('#newImageA').val('');
        $('#addImageA').attr("src","../client/css/images/uploadimage.png");
        if(confirm('You are about to delete an administrator')){
           if(confirm('Are you sure?')){
                $('.showOnClickAPlus').css('display','none');
                $('.showOnClickA').css('display','none');
                $('.loader').css('display','block');
                $.ajax({
                    dataType: 'json',
                    url: "http://localhost/theschool/server/api/deleteadmin.php",
                    type: 'GET'
                }).then(function(data){
                    hasBeenClickedA = 'no';
                    $('.loader').css('display','none');
                    var ID = 'a' + data['ID'];
                    $("#" + ID).remove();
                    $('.adminMain').html('Total Administrators: '+ data.adminNum);
                    $('.adminMain').css('display','block');
                }),function(err){
                    alert('the administrator was not added due to ' + err);
                }  
           } 

        }
    });

    $("#addEmail").blur(function(){        
        if(addNotUpdate || (!addNotUpdate && $('#addEmail').val() != window.emailOfDisplayed)){
            var email = $('#addEmail').val();
            $.ajax({
                dataType: 'json',
                url: "http://localhost/theschool/server/api/checkStudEmail.php",
                type: 'POST',
                data:{
                    email: email
                }
            }).then(function(data){
                if(data.exists == 'yes'){
                    $('#errMsg').css('display','block');
                    $('#errMsg').html('That email already exists');
                    window.emailTaken = true;
                }
                else{
                    $('#errMsg').css('display','none');
                    window.emailTaken = false; 
                }
            },function(err){
                alert('Please try again');
            });            
        }
        else if(!addNotUpdate && $('#addEmail').val() == window.emailOfDisplayed){
            window.emailTaken = false;
            $('#errMsg').css('display','none');
        }  
    });
    

    $("#addEmailA").blur(function(){        
        if(addNotUpdateA || (!addNotUpdateA && $('#addEmailA').val() != window.emailOfDisplayedA)){
            var email = $('#addEmailA').val();
            $.ajax({
                dataType: 'json',
                url: "http://localhost/theschool/server/api/checkAdminEmail.php",
                type: 'POST',
                data:{
                    email: email
                }
            }).then(function(data){
                if(data.exists == 'yes'){
                    $('#errMsgA').css('display','block');
                    $('#errMsgA').html('That email already exists');
                    window.emailTakenA = true;
                }
                else{
                    $('#errMsgA').css('display','none');
                    window.emailTakenA = false; 
                }
            },function(err){
                alert('Please try again');
            });            
        }
        else if(!addNotUpdateA && $('#addEmailA').val() == window.emailOfDisplayedA){
            $('#errMsgA').css('display','none');
            window.emailTakenA = false;            
        }  
    });
    
    
    $("#addName").blur(function(){
        if(courseOrStudent == 'course'){            
            if(addNotUpdate || (!addNotUpdate && $('#addName').val().toUpperCase() != window.nameOfDisplayed.toUpperCase())){
                
                var name = $('#addName').val();
                $.ajax({
                    dataType: 'json',
                    url: "http://localhost/theschool/server/api/checkCourseName.php",
                    type: 'POST',
                    data:{
                        name: name
                    }
                }).then(function(data){
                    if(data.exists == 'yes'){
                        $('#errMsg').css('display','block');
                        $('#errMsg').html('That course name already exists');
                        window.nameTaken = true;
                    }
                    else{
                        $('#errMsg').css('display','none');
                        window.nameTaken = false; 
                    }

                },function(err){
                    alert('Please try again');
                });
            }
            else if(!addNotUpdate && $('#addName').val() == window.nameOfDisplayed){
                $('#errMsg').css('display','none');
                window.nameTaken = false;
            }
        }  
    });    

    
    function displayBlock(arr){
        for(var i = 0; i<arr.length; i++){
            $(arr[i]).css('display','block');
        }
    }

    function displayInline(arr){
        for(var i = 0; i<arr.length; i++){
            $(arr[i]).css('display','inline');
        }
    }

    function displayNone(arr){
        for(var i = 0; i<arr.length; i++){
            $(arr[i]).css('display','none');
        }
    }

    function mainConAddEdit(){
        var arrHide = ['.homeMain1','.homeMain2','.showOnClickCorS'];
        displayNone(arrHide);
    }    

    function studentList(arr, emptyArr){
        for(var i = 0; i <arr.length; i++){                
            if(($.inArray(arr[i].ID, emptyArr))== -1){
               $('#students_ul').append("<li id='s" + arr[i].ID +"' class='studlist'><img width = '50px' height = '50px' src='../uploads/" + arr[i].image + "'><p>" + arr[i].name + "<br>" + arr[i].phone + "</p></li>");
                emptyArr.push(arr[i].ID);
            }
        }        
    }



    function delCourseOrStud(which, idLetter){
        if(confirm('You are about to delete a '+which)){
           if(confirm('Are you sure?')){
                $('.showOnClickCorSPlus').css('display','none');
                $('.showOnClickCorS').css('display','none');
                $('.loader').css('display','block');
                $.ajax({
                    dataType: 'json',
                    url: "http://localhost/theschool/server/api/delete" + which + ".php",
                    type: 'GET'
                }).then(function(data){
                    hasBeenClicked = 'no';
                    $('.loader').css('display','none');
                    var ID = idLetter + data['ID'];
                    $("#" + ID).remove();
                    var studToCheck = [];
                    for(var i = 0; i <data.students.length; i++){
                        if(($.inArray(data.students[i].ID, studToCheck))== -1){
                            studToCheck.push(data.students[i].ID);
                        }
                    }
                    $('.homeMain1').html('Total Courses: '+ data.courses.length);
                    $('.homeMain2').html('Total Students: '+ studToCheck.length);
                    $('.homeMain1').css('display','block');
                    $('.homeMain2').css('display','block');
                }),function(err){
                    alert('the ' + which + ' was not added');
                }  
           }
        }
    }

    function courseOrSDisplay(data, arrToMeasure){
        $('.mhSpan').html(data.allInfo[0].name);
        $('#courseOrStudInnerList').html('');
        if(arrToMeasure.length == null){
            $('#courseOrStudInnerList').html('No students in this course');
        }
        else{
            var srcToAdd = '';
            for(var i = 0; i < arrToMeasure.length; i++){            
                var textToAdd = arrToMeasure[i].name;
                if(arrToMeasure[i].image == ''){
                    srcToadd = 'studentAdmin.png';
                }
                else{
                    srcToAdd = arrToMeasure[i].image;
                }
                $('#courseOrStudInnerList').append("<li><img width = '50px' height = '50px' src='../uploads/" + srcToAdd + "'>" + textToAdd + "</li>");                   
            }
        }
    }
    

    function studentText(arr){
        var headText = arr[0].name;
        $('#cndHead').html(headText);
        $('#cndDescription').html(arr[0].phone + '<br>' + arr[0].email);
    }
    

    function courseText(arr, arrSNum){
        var headText = arr[0].name + ', ' + arrSNum[0] + ' Students';
        $('#cndHead').html(headText);
        $('#cndDescription').html(arr[0].description);
    }
    

    function displayFromList(id,head,urlText,which){
        hasBeenClicked = 'no';
        window.fileNotImg = false;
        window.fileBig = false;
        window.emailTaken = false;
        window.nameTaken = false;
        $('#newImage').val('');
        var arrHide = ['.homeMain1','.homeMain2','.showOnClickCorSPlus', '.showOnClickCorS', '#errMsg'];
        displayNone(arrHide);
        $('.loader').css('display','block');
        $.ajax({
            dataType: 'json',
            url: "http://localhost/theschool/server/api/" + urlText + "disp.php",
            type: 'POST',
            data:{
                id: id
            }
        }).then(function(data){
            if(data.sales == 'yes'){
                $('#mhCButton').css('display','none');
            }
            $('.loader').css('display','none');
            $('.showOnClickCorS').css('display','block');
            $('.ulh2').html(head);
            if(data.allInfo[0].image == ''){
                $('.mainPic').attr("src","../uploads/course.png");                
            }
            else{
                $('.mainPic').attr("src","../uploads/" + data.allInfo[0].image);                
            }
            if(which == 'student'){
                studentText(data.allInfo);
                courseOrSDisplay(data, data.courseNames);
                window.emailOfDisplayed = data.allInfo[0].email;
            }
            else{
                courseText(data.allInfo, data.studentNum);
                courseOrSDisplay(data, data.studNames);
                window.nameOfDisplayed = data.allInfo[0].name;
            }
            courseOrStudent = which;
            return courseOrStudent;
        }),function(err){
            alert('Can not display');
        }
    }
    
    
    function validateCourse(name,desc){
        if(name == ''){
            alert('Please enter a course name');
        }
        else if(desc == ''){
            alert('Please enter a description');
        }
        else if(!($('#newImage').val() == '') && hasBeenClicked == 'no'){
            alert('Do not forget to click \"upload \"');
        }
        else if(window.nameTaken){
            $('#errMsg').css('display','none');
            $('#errMsg').html('That name is taken');
        }
        else if(addNotUpdate && window.fileNotImg){
            $('#errMsg').css('display','block');
            $('#errMsg').html('The file type has to be either jpeg, png, or gif');                
        }
        else if(addNotUpdate && window.fileBig){
            $('#errMsg').css('display','block');
            $('#errMsg').html('The file has to be less than 1mb');               
        }
        else if(hasBeenClicked == 'no' && addNotUpdate){
            alert('Please choose an image and click \"upload\"');
        }
        else if((!($('#newImage').val() == '')) && hasBeenClicked == 'no'){
            alert('Do not forget to click \"upload \"');
        }
        else{
            return true;
        }
    }

    
    function validateStudent(){
        var name = $('#addName').val();
        var regName = /^[A-Za-z ]+$/;
        var nameOk = regName.test(name);

        var phone = $('#addPhone').val();
        var regPhone = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
        var phoneOk = regPhone.test(phone);

        var email = $('#addEmail').val();
        var regEmail = /\S+@\S+\.\S+/;
        var emailOk = regEmail.test(email);

        var image = window.myImg;      

        $('.ulh2').html('Courses');
        var coursesArr = $(":checkbox:checked");
        var coursesArrToSend = [];
        for(var i = 0; i<coursesArr.length; i++){
            coursesArrToSend.push(coursesArr[i].value);
        }
        if(name == '' || email == '' || phone == '' || coursesArr.length == 0){
            alert('Please do not leave anything blank');
        }
        else if(!nameOk){
            $('#errMsg').css('display','block');
            $('#errMsg').html('Please use only letters for your name');
        }
        else if(!phoneOk){
            $('#errMsg').css('display','block');
            $('#errMsg').css('height','58px');
            $('#errMsg').html('Valid phone formats: (123) 456-7890 || 123-456-7890 || 123.456.7890 || 1234567890');
        }
        else if(!emailOk){
            $('#errMsg').css('display','block');
            $('#errMsg').html('Please use a valid email address');
        }
        else if(hasBeenClicked == 'no' && addNotUpdate){
            alert('Please choose an image and click \"upload\"');
        }
        else if((!($('#newImage').val() == '')) && hasBeenClicked == 'no'){
            alert('Do not forget to click \"upload \"');
        }
        else if(window.fileBig){
            $('#errMsg').css('display','block');
            $('#errMsg').html('Please upload a file that is smaller than 1mb');
        }
        else if(window.fileNotImg){
            $('#errMsg').css('display','block');
            $('#errMsg').html('Please upload a file that is either a gif, jpg, or a png');
        }
        else if(window.emailTaken){
            $('#errMsgA').css('display','block');
            $('#errMsgA').html('That email is already taken');                
        }
        else{
            window.emailTaken = false;
            var validationArr = [name,phone,email,coursesArrToSend,image,true];
            return validationArr;
        }
    }
    
    
    function validateAdmin(){
        $('#newImageA').val('');
        $('#addImageA').attr("src","../client/css/images/uploadimage.png");
        
        var name = $('#addNameA').val();
        var regName = /^[A-Za-z ]+$/;
        var nameOk = regName.test(name);

        var phone = $('#addPhoneA').val();
        var regPhone = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
        var phoneOk = regPhone.test(phone);

        var email = $('#addEmailA').val();
        var regEmail = /\S+@\S+\.\S+/;
        var emailOk = regEmail.test(email);

        var password = $('#addPassword').val();
        var role = $('#addRole').find(":selected").text();
        var image = window.myImgA;                          

        if(name == '' || email == '' || phone == '' || (window.role != 'Owner' && role == '')){
            alert('Please do not leave anything blank');
        }
        else if(!nameOk){
            $('#errMsgA').css('display','block');
            $('#errMsgA').html('Please use only letters for your name');
        }
        else if(!phoneOk){
            $('#errMsgA').css('display','block');
            $('#errMsgA').css('height','58px');
            $('#errMsgA').html('Valid phone formats: (123) 456-7890 || 123-456-7890 || 123.456.7890 || 1234567890');
        }
        else if(!emailOk){
            $('#errMsgA').css('display','block');
            $('#errMsgA').html('Please use a valid email address');
        }
        else if(!addNotUpdateA && password != '' && password.length<6){
            $('#errMsgA').css('display','block');
            $('#errMsgA').html('Password needs to be at least 6 characters long');
        }
        else if(addNotUpdateA &&  password.length<6){
            $('#errMsgA').css('display','block');
            $('#errMsgA').html('Password needs to be at least 6 characters long');    
        }
        else if(hasBeenClickedA == 'no' && addNotUpdateA){
            alert('Please choose an image and click \"upload\"');
        }
        else if((!($('#newImageA').val() == '')) && hasBeenClickedA == 'no'){
            alert('Do not forget to click \"upload \"');
        }
        else if(window.fileBigA){
            $('#errMsgA').css('display','block');
            $('#errMsgA').html('Please upload a file that is smaller than 1mb');
        }
        else if(window.fileNotImgA){
            $('#errMsgA').css('display','block');
            $('#errMsgA').html('Please upload a file that is either a gif, jpg, or a png');
        }
        else if(!addNotUpdate && window.role == 'Manager' && role != window.roleOfDisplayed){
            $('#errMsgA').css('display','block');
            $('#errMsgA').html('You can not change the role, please change it back to '+ window.roleOfDisplayed);    
        }
        else if(role == 'Owner' && window.roleOfDisplayed != 'Owner'){
            $('#errMsgA').css('display','block');
            $('#errMsgA').html('There can only be one Owner');
        }
        else if(window.emailTakenA){
            $('#errMsgA').css('display','block');
            $('#errMsgA').html('That email is already taken');                
        }
        else{
            window.emailTakenA = false;
            var validationArr = [name,phone,email,password,role,image,true];
            return validationArr;
        }
    }

    
});