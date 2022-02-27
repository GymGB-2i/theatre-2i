import axios from "axios";
const qs = require("qs");

module.exports = {
  async getHeaderData() {
    const res = await axios.get(`${process.env.STRAPI_ADRESS}/api/header?populate=*`)
    console.log('Headerdata from function: ' + res.data.data.attributes)
    return res.data.data.attributes
  }
}
