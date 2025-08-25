import Patient from '../Models/Patient.js';

export const createPatient = async(req,res) =>{
  console.log('=== DEBUGGING START ===');
  console.log('1. Raw req.body:', req.body);
  console.log('2. Type of req.body:', typeof req.body);
  console.log('3. req.body exists:', !!req.body);
  console.log('4. Object.keys(req.body):', Object.keys(req.body || {}));
  console.log('5. firstName directly:', req.body.firstName);
  console.log('6. lastName directly:', req.body.lastName);
  console.log('7. address directly:', req.body.address);
  console.log('8. address exists:', !!req.body.address);
  if (req.body.address) {
    console.log('9. address.city:', req.body.address.city);
    console.log('10. address.province:', req.body.address.province);
  }
  console.log('=== DEBUGGING END ===');



  const {
    firstName,
    lastName,
    middleName,
    dateOfBirth,
    gender,
    email,
    contactNumber,
    alternateContactNumber,
    address,
    religion,
    nationality,
    maritalStatus,
    occupation,
  } = req.body;
  const { city, province, zipCode, country } = address || {}; 
  try{
    
    if(!firstName?.trim() || !lastName?.trim()){
      return res.status(400).json({message: "Bad Request. Required fields are missing!"})
    }
    const nameRegex = /^[A-Za-z\s'-]+$/;
    if(!nameRegex.test(firstName) || (middleName && !nameRegex.test(middleName) || !nameRegex.test(lastName))){
      return res.status(400).json({message: "Bad Request. Name fields contains invalid characters!"})
    }
    if(!dateOfBirth){
      return res.status(400).json({message: "Bad Request. Date of Birth field is missing!"})
    }

    if(!gender?.trim()){
      return res.status(400).json({message: "Bad Request. Gender field is missing!"})
    }
    // Validates the email address
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)){
      return res.status(400).json({message: "Bad Request. Invalid Email Address!"})
    }

    if(!occupation?.trim()){
      occupation = "Unemployed"
    }


    const phoneRegex = /^[\+]?[0-9\-\(\)\s]+$/

    if(!contactNumber?.trim()){
      return res.status(400).json({message: "Bad Request. Contact Number field is missing!"})
    }
    if(!phoneRegex.test(contactNumber)){
      return res.status(400).json({message: "Bad Request. Invalid Contact Number!"})
    }
    if(alternateContactNumber && !phoneRegex.test(alternateContactNumber)){
      return res.status(400).json({message: "Bad Request. Invalid Alternate Contact Number!"})
    }

    // Address Validations
    if(!city?.trim() || !province?.trim()){
      return res.status(400).json({message: "Bad Request. Required address fields are missing!"})
    }
    if(!country?.trim()){
      country = "Philippines"
    }
    if(!zipCode?.trim()){
      return res.status(400).json({message: "Bad Request. Zip Code field is missing!"})
    }

    //Validates the demographic information
    const ValidMaritalStatus =  [
        'Single',
        'Married',
        'Divorced',
        'Widowed',
        'Separated'
      ]
    const ValidReligion =[
        'Roman Catholic',
        'Protestant',
        'Iglesia ni Cristo',
        'Born Again Christian',
        'Islam',
        'Buddhism',
        'Hinduism',
        'Judaism',
        'None',
        'Other'
      ]
    const ValidNatiionality =[
        'Filipino',
        'American',
        'Canadian',
        'Chinese',
        'Japanese',
        'Korean',
        'Indian',
        'Australian',
        'British',
        'Other'
      ]
    if(maritalStatus && !ValidMaritalStatus.includes(maritalStatus)){
      return res.status(400).json({message: "Bad Request. Error getting marital status data!"})
    }
    if(religion && !ValidReligion.includes(religion)){
      return res.status(400).json({message: "Bad Request. Error getting religion data!"})
    }
    if(nationality && !ValidNatiionality.includes(nationality)){
      return res.status(400).json({message: "Bad Request. Error getting nationality data!"})
    }

    if(!maritalStatus){
      maritalStatus = "Single"
    }
    if(!religion){
      religion = "None"
    }
    
    // Generate Patient Id

    const currentYear = new Date().getFullYear().toString();
    const patientCount = await Patient.countDocuments();
    const sequentialNumber = (patientCount + 1).toString().padStart(7, '0');
    const patientId = `PAT-${currentYear}-${sequentialNumber}`;


  const newPatient = new Patient({
    patientId,
    personalInfo: {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      middleName: middleName ? middleName.trim() : '',
      dateOfBirth,
      gender // Don't forget gender!
    },
    contactInfo: {
      primaryPhone: contactNumber.trim(),
      alternatePhone: alternateContactNumber ? alternateContactNumber.trim() : '',
      email,
      address: {
        city: city.trim(),
        province: province.trim(), // Note: your schema uses 'state', not 'province'
        zipCode: zipCode.trim(),
        country: country.trim()
      }
    },
    demographics: {
      religion,
      nationality,
      maritalStatus // Fixed typo: was 'mariutalStatus'
    },
    medicalHistory: {
      socialHistory: {
        occupation: occupation ? occupation.trim() : 'Unemployed'
      }
    }
  })
    await newPatient.save();
    res.status(201).json({message: "Patient created successfully!", patient: newPatient})

  }catch(error){
    console.error("Error: ", error);
    if(error.name === "ValidationError"){
      return res.status(400).json({message: error.message})
    }
    if(error.code === 11000){
      return res.status(400).json({message: "Email address already exists!"})
    }
    return res.status(500).json({message: "Internal Server Error!"});
  }
}




export const getAllPatients = async(req, res) => {
  // res.status(200).json({"message": "All patients data retrieved successfully!"});
};

export const getPatientById = async(req,res) =>{
  
}


export const updatePatientById = async(req,res) =>{


}

export const deletePatientById = async (req,res) =>{

}

