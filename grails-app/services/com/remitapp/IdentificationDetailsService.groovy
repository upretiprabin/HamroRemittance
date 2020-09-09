package com.remitapp

import grails.converters.JSON
import grails.gorm.transactions.Transactional

@Transactional
class IdentificationDetailsService {
    def commonService

    def addIdentificationDetails(params){
        def returnMap = [:]
        IdentificationDetails identificationDetails = new IdentificationDetails()
        identificationDetails.customer = Customer.findByEmailAddress(params.emailAddress)
        identificationDetails.documentType = params.documentType
        identificationDetails.identityNumber = params.identityNumber
        identificationDetails.issuedBy = params.issuedBy
        identificationDetails.expiryDate = commonService.getFormattedDate(params?.expiryDate)
        identificationDetails.imageOfId = params.imageOfId
        identificationDetails.save(flush: true, failOnError: true)
        returnMap["message"] = "Identity image saved successfully."
        return returnMap
    }

    def saveDoc(saveLocalPath, image, imageId) {
        createDirectory(saveLocalPath)
        File uploadedImage = new File(saveLocalPath, "${imageId}");
        if (uploadedImage?.exists()) {
            uploadedImage.delete()
        }
        image.transferTo(uploadedImage);
    }

    def copyFileUsingStream(File source, File dest) throws IOException {
        InputStream is = null;
        OutputStream os = null;
        try {
            is = new FileInputStream(source);
            os = new FileOutputStream(dest);
            byte[] buffer = new byte[1024];
            int length;
            while ((length = is.read(buffer)) > 0) {
                os.write(buffer, 0, length);
            }
        }catch(e){
            log.info("Error while copying images",e)
        }finally {
            is?.close();
            os?.close();
        }
    }

    def getImage(params){
        Customer customer = Customer.findByEmailAddress(params?.emailAddress)
       def image = IdentificationDetails.findByCustomer(customer)
        if (image){
            return image
        }else{
            return [:]
        }
    }

    def copyImageFromExternalLocation(String sourcePath, String destinationPath){

        try{
            File src = new File(sourcePath)
            File dest = new File(destinationPath)

            if(src.isDirectory()){
                if(!dest.exists()){
                    dest.mkdir();
                }
                //list all the directory contents
                String[] files = src.list();

                for (String file : files) {
                    //construct the src and dest file structure
                    File srcFile = new File(src, file);
                    File destFile = new File(dest, file);

                    copyFileUsingStream(srcFile,destFile);
                }

            }
            log.info("Copied images from external location")
        }catch (e){
            log.info("Error while copying images from external location",e)
        }
    }

    def createDirectory(path){
        File directory = new File(path);
        if (!directory.exists()){
            directory.mkdir();
        }
    }
}
