const path=require('path');
const fs=require('fs');

let types = {
    media: ["mp4", "mkv", "mp3"],
    archives: ["zip", "7z", "rar", "tar", "gz", "ar", "iso", "xz"],
    documents: [
      "docx",
      "doc",
      "pdf",
      "xlsx",
      "xls",
      "odt",
      "ods",
      "odp",
      "odg",
      "odf",
      "txt",
      "ps",
      "tex",
    ],
    app: ["exe", "dmg", "pkg", "deb"],
  };

function organizeFn(dirPath)
{
    let destPath;
    if(dirPath==undefined)
    {
        console.log("Please enter a valid directory path!!");
        return;
    }
    else
    {
        let ifExists=fs.existsSync(dirPath)
        console.log(ifExists)
        if(ifExists==true)
        {
            destPath=path.join(dirPath,"organized_files");
            if(fs.existsSync(destPath)==false)
            {
                fs.mkdirSync(destPath)
            }
            else
            {
                console.log("Folder already exists");
            }
        }
        else
        {
            console.log("Please Enter a valid Path!!")
        }
    }
    organizeHelper(dirPath,destPath);
}

function organizeHelper(src,dest)
{
    let childNames=fs.readdirSync(src);

    for(let i=0;i<childNames.length;i++)
    {
        let childAddress=path.join(src,childNames[i]);
        let isFile=fs.lstatSync(childAddress).isFile();
        //console.log(childAddress+" "+isFile);

        if(isFile==true)
        {
            let fileCategory=getCategory(childNames[i]);
            console.log(childNames[i]+" belongs to "+ fileCategory)
            sendFiles(childAddress,dest,fileCategory)
        }
    }
}

function getCategory(name)
{
    let ext=path.extname(name).slice(1);
    //console.log(ext)

    for(let type in types)
    {
        let cTypeArr=types[type];
        //console.log(cTypeArr)
        for(let i=0;i<cTypeArr.length;i++)
        {
            if(ext==cTypeArr[i])
            {
                return type;
            }
        }
    }
    return "others";
}

function sendFiles(src,dest,fileCategory)
{
    let catPath=path.join(dest,fileCategory);

    if(fs.existsSync(catPath)==false)
    {
        fs.mkdirSync(catPath);
    }

    let fileName=path.basename(src)
    let destFilePath=path.join(catPath,fileName);

    fs.copyFileSync(src,destFilePath);
    fs.unlinkSync(src);

    console.log(fileName+" is copied to "+ fileCategory);
}

module.exports={organize:organizeFn}