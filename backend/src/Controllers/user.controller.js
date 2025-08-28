export const getUserInfo = (req,res) =>{
  try {
    // console.log("REquest User: ", req.user)
    res.status(200).json({
      success: true,
      user: req.user
    })

  } catch (error) {
    console.error('Error in getting user info! ', error)
    res.status(500).json({success: false, message: "Internal Server Error!"})
  }
}