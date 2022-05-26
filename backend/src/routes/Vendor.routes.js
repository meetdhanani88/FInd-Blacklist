const { VendorPendingReq, BlackListStatusUpdate, ListOfBlackListReq, AddToBlackList, BlackListVendorUpdate } = require('../controller/Vendor.controller')
const { requireSignIn } = require('../middleware')

const router = require('express').Router()

router.post('/vendor/VendorPendingReq',requireSignIn,VendorPendingReq)
router.post('/vendor/BlackListStatusUpdate/:id',requireSignIn,BlackListStatusUpdate)
router.get('/vendor/ListOfBlackListReq/:Requested_Status',requireSignIn,ListOfBlackListReq)
router.post('/vendor/AddToBlackList',requireSignIn,AddToBlackList)
router.post('/vendor/BlackListVendorUpdate/:id',requireSignIn,BlackListVendorUpdate)

module.exports = router