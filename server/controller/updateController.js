const asyncHandler = require('express-async-handler');
const User = require('../models/UserModel');


const updateCalorie = asyncHandler(async(req,res) => {

    try{
        const email = req.params.email
        let val = req.params.val
        let date = req.params.date

        // get user data by email
        const data = await User.findOne({email})

        const checkD = await User.findOne({
            userStats:{ $elemMatch :{
                date: date.toString()
            }}
        })

        console.log(checkD)

        if(checkD) {

            const deleteD = await User.updateOne({email},
                {
                    $pull:{
                        userStats:{
                            "date": date.toString()
                          }
                    }
                })

            let cal;
           data.userStats.forEach((stat) => {
            if(stat.date == date.toString()) {
                cal = stat.calories
            }
           })
        
           console.log(cal)
           cal = parseInt(cal) + parseInt(val);
           console.log(cal)

           

           const newD = await User.findOneAndUpdate({email},
            {
                $push:{
                    userStats:{
                        "date": date.toString(),
                        "calories": cal
                      }
                }
            },{
                new:true
            })

            res.json(newD)
        }

        else{
            const newD = await User.findOneAndUpdate({email},
                {
                    $push:{
                        userStats:{
                            "date": date.toString(),
                            "calories": val
                          }
                    }
                },{
                    new:true
                })
    
    
            res.json(newD)
        }
      
    }catch(error) {
        res.status(400);
        throw new Error('could not update time')
    }

})




const updateTime = asyncHandler(async(req,res) => {

    try{
        const email = req.params.email
        let val = req.params.val
        let date = req.params.date

        // get user data by email
        const data = await User.findOne({email})

        const checkD = await User.findOne({
            userTime:{ $elemMatch :{
                date: date.toString()
            }}
        })

        console.log(checkD)

        if(checkD) {

            const deleteD = await User.updateOne({email},
                {
                    $pull:{
                        userTime:{
                            "date": date.toString()
                          }
                    }
                })

            let cal;
           data.userTime.forEach((time) => {
            if(time.date == date.toString()) {
                cal = time.time
            }
           })
        
           console.log(cal)
           cal = parseInt(cal) + parseInt(val);
           console.log(cal)

           

           const newD = await User.findOneAndUpdate({email},
            {
                $push:{
                    userStats:{
                        "date": date.toString(),
                        "time": cal
                      }
                }
            },{
                new:true
            })

            res.json(newD)
        }

        else{
            const newD = await User.findOneAndUpdate({email},
                {
                    $push:{
                        userTime:{
                            "date": date.toString(),
                            "time": val
                          }
                    }
                },{
                    new:true
                })
    
    
            res.json(newD)
        }
      
    }catch(error) {
        res.status(400);
        throw new Error('could not update time')
    }

})



const updateCoins = asyncHandler(async(req,res) => {

    try{
        const email = req.params.email
        let val = req.params.val
        
        const data = await User.findOne({email})
        val = parseInt(val) + parseInt(data.coins)
        
        const newData = await User.findOneAndUpdate({email},{coins:val},{new:true})
    
        res.json(newData)
    }catch(error) {
        res.status(400);
        throw new Error('Error increasing coins')
    }

})


const getUserData = asyncHandler(async(req,res) => {
   
    try{
        const email = req.params.email
        const userData = await User.find({email})
        res.json(userData)
    }catch(error) {
        res.status(400);
        throw new Error('Error fetching user')
    }

})

module.exports = {
    updateCoins,
    getUserData,
    updateCalorie,
    updateTime
}