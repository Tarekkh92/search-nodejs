// var fs = require('fs');
// var found=false;
// var count = 0;
// var q=0;
// var explore= function (dir,ext,query) {
//     var path = path || require('path');
//     var fs = fs || require('fs'),
//         files = fs.readdirSync(dir);
//     count+=files.length;
//    var filelist = filelist || [];
//     files.forEach(function(file) {
//         if (fs.statSync(path.join(dir, file)).isDirectory()) {
//             filelist = explore(path.join(dir, file),ext,query);
//             count--;
//         }
//         else {
//           if( checkFile(path.join(dir, file),ext,query)==true){
//               filelist.push(path.join(dir, file));
//           }
//         }
//     });


// };

// if(process.argv.length<3 || process.argv.length>4){

//   console.log("USAGE: node search [EXT] [TXT]");
// }
// else{

//   explore(__dirname,process.argv[2],process.argv[3])
//     while(true){
//        if(found==true && q==count){
//            break;
//        }
//        else if(found==false && q==count){
//            console.log("File Not Found");
//            break;
//         }

//     }

// }


// function checkFile(file,ext,query) {
//     q++;
//     var extension = file.substr((file.lastIndexOf('.') +1));
//     if (extension==ext) {
//         fs.readFile(file, function (err, data) {
//             if (err) throw err;
//             if(data.indexOf(query) >= 0){
//                 found = true;
//                 console.log(file);
//                 return true;

//             }

//         });

//     }
//     else {

//         return false;


//     }


// }



var fs = require('fs');
var found=0;
var explore= function (dir,ext,query) {

    var path = path || require('path');
    var fs = fs || require('fs'),
        files = fs.readdirSync(dir);

   var filelist = filelist || [];
    files.forEach(function(file) {
        if (fs.statSync(path.join(dir, file)).isDirectory()) {
            filelist = explore(path.join(dir, file),ext,query);

        }
        else {


            var extension = path.join(dir, file).substr((path.join(dir, file).lastIndexOf('.') +1));
            if (extension==ext) {
               // console.log(found);

              var data =  fs.readFileSync(path.join(dir, file));
                if(data.indexOf(query) >= 0){
                    console.log(path.join(dir, file));
                    found=1;



                }

            }

        }
    });
return new Promise(function (resolve,reject) {
   //console.log(found)
    if(found==1) {

        resolve('found');

    }
    else if(found==0){
        resolve('not found');
    }

})

};

if(process.argv.length<3 || process.argv.length>4){

  console.log("USAGE: node search [EXT] [TXT]");
}
else{
    explore(__dirname,process.argv[2],process.argv[3]).then(data=>{
       if(data=='not found'){ console.log("File Not Found")}

    }).catch(err=>{
console.log(err);
    });



}

















