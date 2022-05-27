const Vendor = require('../models/Vender.model')
const moment = require('moment');
exports.VendorPendingReq =async (req,res)=>{
    const {vendorName,Address,ReasonForUser,image} = req.body
    try{
        const vendor = await Vendor({
            vendorName,
            Address,
            ReasonForUser,
            Requested_User : req.user.user,
            Requested_Status : 'Pending'
        })
        
        await vendor.save((err,vendor)=>{
            if(err) return res.status(400).json(err)
            if(vendor){
                return res.status(200).json({
                    message : 'Successfully sent Request to Admin',
                    vendor : vendor
                })
            }
        })
    }catch(err){
        return res.status(400).json(err)
    }

}
exports.BlackListStatusUpdate =async (req,res)=>{
    const {Requested_Status,ReasonForAdmin} = req.body
    const updateValue = {
        Requested_Status,ReasonForAdmin
    }
    if(Requested_Status === 'Accept'){
        updateValue.dateOfBlackListed = moment().format('YYYY-MM-DD');
    }
    const id = req.params.id
    updateValue.Admin = req.user.user._id
   
    try{
       const updatedStatus = await Vendor.findByIdAndUpdate(id,
        updateValue
       , { new: true })
       
       if(updatedStatus){
        return res.status(200).json({
            message: "updated",
            vendor: updatedStatus,
        });
       }
    }catch(err){
        return res.status(400).json(err)
    }

}
exports.ListOfBlackListReq = (req,res)=>{
    let Requested_Status = req.params.Requested_Status
    try{
        Vendor.find({Requested_Status:Requested_Status}).populate('').exec((err,vendor)=>{
            if(err) return res.status(400).json(err)
            if(vendor){
                return res.status(200).json({
                    vendor : vendor
                })
            }
        })
    }catch(err){
        return res.status(400).json(err)
    }
}
exports.AddToBlackList =async (req,res)=>{
    const {vendorName,Address,ReasonForAdmin,image} = req.body
    try{
        const vendor = await Vendor({
            vendorName,
            Address,
            ReasonForAdmin,
            Admin : req.user.user,
            Requested_Status : 'Accept',
            dateOfBlackListed : moment()
        })
        
        await vendor.save((err,vendor)=>{
            if(err) return res.status(400).json(err)
            if(vendor){
                return res.status(200).json({
                    message : 'Successfully sent Request to Admin',
                    vendor : vendor
                })
            }
        })
    }catch(err){
        return res.status(400).json(err)
    }

}
exports.BlackListVendorUpdate =async (req,res)=>{
    const {vendorName,Address,ReasonForAdmin,image} = req.body
    const id = req.params.id
    console.log(vendorName,Address,ReasonForAdmin,id);
    try{
       const updatedVendor = await Vendor.findByIdAndUpdate(id,{
        vendorName,
        Address,
        ReasonForAdmin
       }, { new: true })
       if(updatedVendor){
        return res.status(200).json({
            message: "updated",
            vendor: updatedVendor,
        });
       }
    }catch(err){
        return res.status(400).json(err)
    }

}