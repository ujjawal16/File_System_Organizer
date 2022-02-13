const path=require('path');
const fs=require('fs');

function treeFn(dirPath)
{
    if(dirPath==undefined)
    {
        console.log("Please enter a valid Path!!");
    }
    else 
    {
        let doesExist=fs.existsSync(dirPath);
        if(doesExist==true)
        {
            treeHelper(dirPath,"    ")
        }
    }
}

function treeHelper(dirPath,indent)
{
    let isFile=fs.lstatSync(dirPath).isFile();

    if(isFile==true)
    {
        let fileName=path.basename(dirPath);
        console.log(indent,"├──", fileName)
    }
    else{
        let dirName=path.basename(dirPath);
        console.log(indent,"└──", dirName)

        let children=fs.readdirSync(dirPath);

        for(let i=0;i<children.length;i++)
        {
            let childPath=path.join(dirPath,children[i]);
            treeHelper(childPath,indent+'\t')
        }
    }
}

module.exports={tree:treeFn}