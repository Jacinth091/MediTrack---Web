export const getAllPatients = async(req, res) => {
  res.status(200).json({"message": "All patients data retrieved successfully!"});
};