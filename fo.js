let inputArr=process.argv.slice(2);
let command=inputArr[0];

const help=require('./commands/help');
const organize=require('./commands/organize');
const tree=require('./commands/tree');

switch(command)
{
    case "tree":
        tree.tree(inputArr[1])
        break;

    case "organize":
        organize.organize(inputArr[1]);
        //console.log("organize");
        break;

    case "help":
        help.help()
        break;

    default:
        console.log("Please enter a valid command!!");
        break;
}
