const BlacklistedVendors = require('../models/BlacklistedVendors.model')

exports.AddToBlacklist =  async(req,res)=>{
    const {vendorName, address, reason} = req.body
    const venderValues = {
        vendorName, address, reason,adminId:req.user.user
    }
    if(req.file){
        venderValues.image = req.file.filename
    }
    try{
        const vendor = await BlacklistedVendors(venderValues)
        vendor.save((err,vendor)=>{
            if(err) return res.status(400).json(err)
            if(vendor){
                return res.status(201).json({
                    message : 'Vendor Added to Blacklist',
                    vendor:vendor
                })
            } 
        })
    }catch(err){
        return res.status(400).json(err)
    }
}

exports.ListOfBlackListVendor = async(req,res)=>{
    try{
        const blacklistedVendors = await BlacklistedVendors.find()
        if(blacklistedVendors){
            return res.status(404).json(blacklistedVendors)
        }else{
            return res.status(404).json({
                message : "Vendor Not Found"
            })
        }
    }catch(err){
        return res.status(400).json(err)
    }
}

exports.updateVendor = async (req,res)=>{
    const {vendorName, address, reason} = req.body
    const id = req.params.id;

    try {
        const { roleId:{_id} } = req.user.user;
        if (_id === 1) {

            const updatedBlacklistedVendors = await BlacklistedVendors.findByIdAndUpdate(
                id,
                {
                    vendorName, address, reason
                },
                { new: true }
            );
            if (updatedBlacklistedVendors) {
                return res.status(200).json({
                    message: "Vendor Updated",
                    user: updatedBlacklistedVendors,
                });
            }
        } else {
            return res.status(400).json({
                message: "Required Authorization",
            });
        }
    } catch (err) {
        return res.status(400).json(err);
    }
}
exports.removeToBlacklist = async (req,res)=>{
    
}