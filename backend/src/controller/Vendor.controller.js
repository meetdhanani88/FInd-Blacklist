const Vendor = require('../models/BlacklistVendersReq.model')
const moment = require('moment');
const fs = require('fs')
const Path = require('path')
exports.VendorPendingReq =async (req,res)=>{
    const {vendorName,Address,ReasonForUser} = req.body
    const vendorValues = {
        vendorName,Address,ReasonForUser,
        Requested_User : req.user.user,
        Requested_Status : 'Pending',
    }
    if(req.file){
        vendorValues.image = req.file.filename
    }
   
    try{
        const vendor = await Vendor(vendorValues)
        
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
        Vendor.find({Requested_Status:Requested_Status}).populate('Admin').exec((err,vendor)=>{
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
    const {vendorName,Address,ReasonForAdmin} = req.body
    const venderValues = {
        vendorName,Address,ReasonForAdmin,Admin : req.user.user,
        Requested_Status : 'Accept',
        dateOfBlackListed : moment()
    }
    
    if(req.file){
        venderValues.image = req.file.filename
    }
    
    try{
        
        const vendor = await Vendor(venderValues)
        
        await vendor.save((err,vendor)=>{
            if(err) return res.status(400).json(err)
            if(vendor){
                return res.status(200).json({
                    message : 'Successfully Added to Blacklist',
                    vendor : vendor
                })
            }
        })
    }catch(err){
        return res.status(400).json(err)
    }

}
exports.BlackListVendorUpdate =async (req,res)=>{
    const {vendorName,Address,ReasonForAdmin} = req.body
    const vendorValues = {
        vendorName,Address,ReasonForAdmin
    }
    console.log(vendorName,req.file.filename);
    if(req.file.filename){
        vendorValues.image = req.file.filename
    }
    const id = req.params.id
    try{

       const vendor = await Vendor.findById(id)
      
       const updatedVendor =  await Vendor.updateOne({_id:vendor._id},vendorValues,{new:true})
       
             if(updatedVendor){
                deletePicFromFolder(vendor.image)
                return res.status(200).json({
                    message : 'Vendor Updated',
                    vendor : updatedVendor
                })
             }
        
     }catch(err){
         return res.status(400).json(err)
     }
    

}

function deletePicFromFolder(imgPath){
    fs.unlink(
        `${Path.dirname(__dirname) + "/images/"}${imgPath}`,
        (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log("deleted");
          }
        }
      );

}