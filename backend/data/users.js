import bcrypt from "bcryptjs";

const users= [
    {
        name:'Admin user',
        email:'Adminuser@gmaee.com',
        password:bcrypt.hashSync("1235655",10),
        isAdmin:true,
    },
    {
        name:'george lebastin',
        email:'georgelebas@gmaee.com',
        password:bcrypt.hashSync("1235655",10),
        isAdmin:false,
    },
    {
        name:'stefan user',
        email:'stefanuser@email.com',
        password:bcrypt.hashSync("1235655",10),
        isAdmin:false,
    },
]

export default users