import axios from "axios";

const baseUrl = "/api/persons";

const getPersons = async (req, res) => {
  return await axios.get(baseUrl);
};

const getOnePerson = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

const createPerson = async (body) => {
  await axios.post(baseUrl, body);
};

const deletePerson = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`);
  return response.data;
};

const updatePerson = async (id, newPerson) => {
  const response = await axios.patch(`${baseUrl}/${id}`, newPerson);
  return response.data;
};

export { getPersons, getOnePerson, createPerson, deletePerson, updatePerson };
