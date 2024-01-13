import jwt from 'jsonwebtoken'

const generateToken = (res,userId) =>{
            //create a jwt token
            const accessToken = jwt.sign({userId},process.env.JWT_SECRET_ACCESS,{
                expiresIn:'1m'
            })

            const refreshToken = jwt.sign({userId},process.env.JWT_SECRET_REFRESH,{
                expiresIn:'1y'
            })
    
            // set jwt as http only cookie
           // 30*24*60*60*1000  30 days
            res.cookie('accessToken',accessToken,{
                maxAge:60000
            })

            res.cookie('refreshToken',refreshToken,{
                httpOnly:true,
                secure:process.env.NODE_ENV !== 'development',
                sameSite:'strict',
                maxAge:3.156e+10
            })
}

export default generateToken                                