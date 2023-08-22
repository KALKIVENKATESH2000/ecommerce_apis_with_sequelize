const { where } = require('sequelize');
const model = require('../models');
const User = model.AuthUser
const UserProfile = model.UserProfile
const Useraddress = model.Useraddress


// USER PROFILE CRUD

exports.createUserProfile = async (req, res) => {
  try {
    const { gender, phone, image } = req.body;
    const user_id = req.user.userId

    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    } 
    const file = req.file;
    // res.send(file)
    if(!file) return res.status(400).send('No image in the request')
    
    const fileName = req.file.filename
    const basePath = `${req.protocol}://${req.get('host')}/media/uploads/users/`;

    const checkUser = await UserProfile.findOne({where:{user_id:user_id}})
    if (checkUser){
      checkUser.gender = gender;
      checkUser.phone = phone;
      checkUser.image =  `${basePath}${fileName}`;
      await checkUser.save();
      return res.status(201).json({ message : 'User profile updated.', user_profile:checkUser})
    }

    const userProfile = await UserProfile.create({ 
          gender, 
          phone, 
          image : `${basePath}${fileName}`, 
          user_id 
    });
    res.status(200).json({ message : 'User profile created sucefully.', userProfile});
  } catch (error) {
    console.error('Error creating userprofile:', error);
    res.status(500).json({ error: 'Failed to create userprofile.' });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const { user_id } = req.user.userId;
    const user_profile = await UserProfile.findOne({
        where:{
          user_id:req.user.userId,
        },
        // include:[
        //     {
        //         model:UserProfile,
        //         attributes:{exclude:['user_id']}
        //     }
        // ]
    })
    res.json({ user_profile });
  } catch (error) {
    console.error('Error retrieving user_profile:', error);
    res.status(500).json({ error: 'Failed to retrieve user_profile.' });
  }
};

// USER CRUD

exports.getCurrentUser = async (req, res) => {
  try {
    const { user_id } = req.user.userId;
    const user_details = await User.findOne({
        where:{
          id:req.user.userId,
        },
        attributes:['first_name', 'last_name', 'email'],
        include:[
            {
                model:UserProfile,
                attributes:{exclude:['user_id']}
            }
        ]
    })
    res.json({ user_details });
  } catch (error) {
    console.error('Error retrieving user:', error);
    res.status(500).json({ error: 'Failed to retrieve user.' });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error('Error retrieving users:', error);
    res.status(500).json({ error: 'Failed to retrieve users.' });
  }
};

exports.updateUser = async (req, res) => {
  try {
      const { id } = req.params;
      const { first_name, last_name, email } = req.body;
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      }
      

      user.first_name = first_name;
      user.last_name = last_name;
      user.email = email;
      await user.save();
    res.json(user);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Failed to update user.' });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }
    await user.destroy();
    res.json({success:`user '${user.firstName+user.lastName}' was deleted!`});
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Failed to delete user.' });
  }
};


// USER ADDRESS CRUD
exports.createUserAddress = async (req, res) => {
  try {
    const { name, mobile_no, address, pincode, country, state, city_district, city, type_of_address, is_default} = req.body;
    const user_id = req.user.userId

    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    const userAddress = await Useraddress.create(
        { 
          user_id, name, mobile_no, address, pincode, country, state, city_district, city, type_of_address, is_default:is_default ? req.body.is_default:false
        }
    );
    res.status(200).json({ message : 'User address added sucefully.', userAddress});
  } catch (error) {
    console.error('Error creating User address:', error);
    res.status(500).json({ error: 'Failed to create User address.' });
  }
};

exports.getUserAddresses = async (req, res) => {
    try {
        const user_id = req.user.userId

        const user = await User.findByPk(user_id);
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        const userAddress = await Useraddress.findAll({
            where:{ 
                user_id : user_id
            }
          });
        res.status(200).json({ message : 'User addresses.', userAddress});
    } catch (error) {
        console.error('Error creating User address:', error);
        res.status(500).json({ error: 'Failed to create User address.' });
    }
};

exports.updateUserAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, mobile_no, address, pincode, country, state, city_district, city, type_of_address } = req.body;
    const user_address = await Useraddress.findByPk(id);
    if (!user_address) {
      return res.status(404).json({ error: 'User address not found.' });
    }
    user_address.name = name;
    user_address.mobile_no = mobile_no;
    user_address.address = address;
    user_address.pincode = pincode;
    user_address.country = country;
    user_address.state = state;
    user_address.city_district = city_district;
    user_address.city = city;
    user_address.type_of_address = type_of_address;
    await user_address.save();
    res.status(200).json({message:"User address updated sucessfully.",updated_address:user_address});
  } catch (error) {
    console.error('Error updating user address:', error);
    res.status(500).json({ error: 'Failed to update user address.' });
  }
};

exports.deleteUserAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const user_address = await Useraddress.findByPk(id);
    if (!user_address) {
      return res.status(404).json({ error: 'User address not found.' });
    }
    await user_address.destroy();
    res.json({success:`user address '${user_address.id}' was deleted!`});
  } catch (error) {
    console.error('Error deleting user address:', error);
    res.status(500).json({ error: 'Failed to delete user address.' });
  }
};


// Set the default address for a user
exports.SetAsDefaultAddress = async (req, res) => {
  try {
    const user_id = req.user.userId
    const { address_id } = req.params;

    // Find the user by ID
    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(404).json({ error: `User not found for ID ${user_id}.` });
    }

    // Find the address by ID
    const address = await Useraddress.findByPk(address_id);

    if (!address) {
      return res.status(404).json({ error: `Address not found for ID ${address_id}.` });
    }

    // Set the default address for the user
    await Useraddress.update({ is_default: false }, { where: { user_id, is_default: true } }); // Unset any previous default address
    address.is_default = true;
    await address.save();

    res.status(200).json({ message: 'Default address set successfully.', address });
  } catch (error) {
    console.error('Error setting default address:', error);
    res.status(500).json({ error: 'Failed to set default address.' });
  }
};